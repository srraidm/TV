// --- ESTADO GLOBAL ---
let currentMode = 'tv';
let currentId = '';
let currentEp = 1;
let currentSrv = 'Vidsrc.me';

// --- SELECTORES ---
const hlsVid = document.getElementById('hls-player');
const iframeVid = document.getElementById('media-iframe');
const srvList = document.getElementById('srv-list');
const epIndicator = document.getElementById('ep-indicator');
const animeControls = document.getElementById('anime-controls');

// --- 1. NAVEGACIÓN ENTRE SECCIONES ---
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.onclick = () => {
        const target = btn.getAttribute('data-target');
        document.querySelectorAll('.nav-btn, .content-tab').forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(target).classList.add('active');
        currentMode = target.split('-')[0];
        
        // Si volvemos a TV, paramos otros reproductores
        if(currentMode === 'tv') stopAllMedia();
    };
});

// --- 2. VISTA DE DETALLES (ANIME) ---
async function openDetails(id) {
    currentId = id;
    // Ocultar grids y mostrar pantalla de detalles
    document.querySelectorAll('.content-tab').forEach(el => el.classList.remove('active'));
    document.getElementById('details-view').classList.add('active');

    // Consultar API Jikan para info completa
    try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
        const { data } = await res.json();

        // Llenar Interfaz
        document.getElementById('detail-title').innerText = data.title;
        document.getElementById('detail-img').src = data.images.jpg.large_image_url;
        document.getElementById('detail-desc').innerText = data.synopsis || "Sin descripción disponible.";

        // Relaciones (Temporadas / Secuelas)
        const relCont = document.getElementById('relations-container');
        relCont.innerHTML = "";
        if (data.relations) {
            data.relations.forEach(rel => {
                rel.entry.forEach(entry => {
                    if (entry.type === 'anime') {
                        const btn = document.createElement('button');
                        btn.className = "btn-srv";
                        btn.innerText = `${rel.relation}: ${entry.name}`;
                        btn.onclick = () => openDetails(entry.mal_id);
                        relCont.appendChild(btn);
                    }
                });
            });
        }

        // Generar Lista de Episodios
        const epGrid = document.getElementById('episode-grid');
        epGrid.innerHTML = "";
        const totalEps = data.episodes || 12; // 12 por defecto si es emisión continua
        for (let i = 1; i <= totalEps; i++) {
            const epCard = document.createElement('div');
            epCard.className = "ep-card";
            epCard.innerText = `EP ${i}`;
            epCard.onclick = () => {
                currentEp = i;
                loadMedia(id, 'anime');
            };
            epGrid.appendChild(epCard);
        }
    } catch (err) {
        console.error("Error cargando detalles:", err);
    }
}

// --- 3. CARGA DE REPRODUCTOR ---
function loadMedia(id, type) {
    currentId = id;
    currentMode = type;
    
    // Limpiar y mostrar iframe
    hlsVid.style.display = 'none';
    iframeVid.style.display = 'block';
    
    // Mostrar controles de episodios solo si es Anime
    if(type === 'anime') {
        animeControls.style.display = 'flex';
        epIndicator.innerText = `EPISODIO ${currentEp}`;
    } else {
        animeControls.style.display = 'none';
    }

    renderServers();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderServers() {
    srvList.innerHTML = "";
    const servers = currentMode === 'anime' 
        ? SERVERS_DB.anime(currentId, currentEp) 
        : SERVERS_DB.cine(currentId);

    Object.entries(servers).forEach(([name, url], index) => {
        const btn = document.createElement('button');
        btn.className = `btn-srv ${index === 0 ? 'active' : ''}`;
        btn.innerText = name;
        btn.onclick = () => {
            document.querySelectorAll('.btn-srv').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            iframeVid.src = url;
        };
        srvList.appendChild(btn);
        // Cargar el primero automáticamente
        if(index === 0) iframeVid.src = url;
    });
}

// --- 4. CONTROLES DE EPISODIO (ANTERIOR/SIGUIENTE) ---
function changeEp(delta) {
    currentEp += delta;
    if(currentEp < 1) currentEp = 1;
    // Aquí podrías añadir un límite máximo basado en data.episodes si lo guardas globalmente
    epIndicator.innerText = `EPISODIO ${currentEp}`;
    renderServers();
}

// --- 5. BÚSQUEDA ---
async function searchMedia() {
    const q = document.getElementById('global-search').value;
    if(!q) return;

    if(currentMode === 'anime') {
        const res = await fetch(`https://api.jikan.moe/v4/anime?q=${q}`);
        const { data } = await res.json();
        renderGrid('grid-anime', data, 'anime');
    } else {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=ace288544d732899479e96e944733e8f&query=${q}&language=es-MX`);
        const { results } = await res.json();
        renderGrid('grid-cine', results, 'cine');
    }
}

function renderGrid(containerId, items, type) {
    const grid = document.getElementById(containerId);
    grid.innerHTML = "";
    items.forEach(item => {
        const id = item.mal_id || item.id;
        const img = item.images?.jpg.large_image_url || `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        const title = item.title || item.name;

        if(!img || img.includes('null')) return;

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="${img}"><div class="card-title">${title}</div>`;
        card.onclick = () => type === 'anime' ? openDetails(id) : loadMedia(id, 'cine');
        grid.appendChild(card);
    });
}

// --- 6. TV EN VIVO ---
let hls = new Hls();
function playTV(url) {
    stopAllMedia();
    iframeVid.style.display = 'none';
    hlsVid.style.display = 'block';
    animeControls.style.display = 'none';
    
    if (Hls.isSupported()) {
        hls.loadSource(url + "?ext=m3u8");
        hls.attachMedia(hlsVid);
        hls.on(Hls.Events.MANIFEST_PARSED, () => hlsVid.play());
    }
}

function stopAllMedia() {
    if(hls) hls.destroy();
    hls = new Hls();
    iframeVid.src = "";
}

function backToGrid() {
    document.getElementById('details-view').classList.remove('active');
    document.getElementById(`${currentMode}-section`).classList.add('active');
}

// --- EVENTOS ---
document.getElementById('global-search').onkeypress = (e) => { if(e.key === 'Enter') searchMedia(); };

// Inicializar TV
window.onload = () => {
    const tvGrid = document.getElementById('grid-tv');
    SERVERS_DB.tv.forEach(ch => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="${ch.img}" style="object-fit:contain; padding:15px;"><div class="card-title">${ch.n}</div>`;
        card.onclick = () => playTV(ch.u);
        tvGrid.appendChild(card);
    });
};
