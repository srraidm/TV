/* --- CONFIGURACIÓN Y ESTADO --- */
const TMDB_KEY = 'cfdc75b5370b04c34395eda1f63989b4';
let currentMode = 'tv';
let currentId = '';
let currentEp = 1;

/* --- 1. NAVEGACIÓN ENTRE SECCIONES --- */
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.onclick = () => {
        const target = btn.getAttribute('data-target');
        document.querySelectorAll('.nav-btn, .content-tab').forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(target).classList.add('active');
        currentMode = target.split('-')[0];
        
        // Detener reproducciones al cambiar
        if(currentMode === 'tv') {
            document.getElementById('media-iframe').src = "";
        }
    };
});

/* --- 2. MOTOR DE BÚSQUEDA --- */
async function search() {
    const q = document.getElementById('global-search').value;
    if(!q) return;

    if(currentMode === 'anime') {
        const r = await fetch(`https://api.jikan.moe/v4/anime?q=${q}&limit=20`);
        const { data } = await r.json();
        renderGrid('grid-anime', data, 'anime');
    } else {
        // Usa tu API KEY de TMDB
        const r = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_KEY}&query=${q}&language=es-MX`);
        const { results } = await r.json();
        renderGrid('grid-cine', results, 'cine');
    }
}

// Escuchar tecla Enter en el buscador
document.getElementById('global-search').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') search();
});

/* --- 3. RENDERIZADO DE GRIDS --- */
function renderGrid(containerId, items, type) {
    const grid = document.getElementById(containerId);
    grid.innerHTML = "";
    
    items.forEach(item => {
        const id = item.mal_id || item.id;
        const title = item.title || item.name;
        const img = item.images?.jpg.large_image_url || 
                    (item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/210x300?text=No+Image');

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${img}" alt="${title}">
            <div class="card-title">${title}</div>
        `;
        
        card.onclick = () => type === 'anime' ? openDetails(id) : loadMedia(id, 'cine');
        grid.appendChild(card);
    });
}

/* --- 4. VISTA DE DETALLES (ESTILO JKANIME) --- */
async function openDetails(id) {
    currentId = id;
    currentEp = 1; // Reset de episodio al abrir nuevo anime
    
    document.querySelectorAll('.content-tab').forEach(el => el.classList.remove('active'));
    document.getElementById('details-view').classList.add('active');

    try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
        const { data } = await res.json();

        document.getElementById('detail-title').innerText = data.title;
        document.getElementById('detail-img').src = data.images.jpg.large_image_url;
        document.getElementById('detail-desc').innerText = data.synopsis || "Sin descripción.";

        // Cargar Relaciones (Secuelas/Precuelas)
        const relCont = document.getElementById('relations-container');
        relCont.innerHTML = "";
        data.relations.forEach(rel => {
            rel.entry.forEach(entry => {
                if(entry.type === 'anime') {
                    const btn = document.createElement('button');
                    btn.className = "btn-srv";
                    btn.innerText = `${rel.relation}: ${entry.name}`;
                    btn.onclick = () => openDetails(entry.mal_id);
                    relCont.appendChild(btn);
                }
            });
        });

        // Crear Grid de Episodios
        const epGrid = document.getElementById('episode-grid');
        epGrid.innerHTML = "";
        const totalEps = data.episodes || 12; 
        for(let i=1; i<=totalEps; i++) {
            const epCard = document.createElement('div');
            epCard.className = "ep-card";
            epCard.innerText = `EP ${i}`;
            epCard.onclick = () => {
                currentEp = i;
                loadMedia(id, 'anime');
            };
            epGrid.appendChild(epCard);
        }
    } catch (e) { console.error("Error en detalles:", e); }
}

/* --- 5. REPRODUCTOR Y SERVIDORES --- */
function loadMedia(id, type) {
    currentId = id;
    currentMode = type;
    
    const iframe = document.getElementById('media-iframe');
    const hls = document.getElementById('hls-player');
    
    // Switch de reproductores
    hls.style.display = 'none';
    iframe.style.display = 'block';
    
    // Controles de Jkanime
    if(type === 'anime') {
        document.getElementById('anime-controls').style.display = 'flex';
        document.getElementById('ep-indicator').innerText = `EPISODIO ${currentEp}`;
    } else {
        document.getElementById('anime-controls').style.display = 'none';
    }

    renderServers();
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function renderServers() {
    const srvList = document.getElementById('srv-list');
    const iframe = document.getElementById('media-iframe');
    srvList.innerHTML = "";

    const sources = currentMode === 'anime' 
        ? SERVERS_DB.anime(currentId, currentEp) 
        : SERVERS_DB.cine(currentId);

    Object.entries(sources).forEach(([name, url], index) => {
        const btn = document.createElement('button');
        btn.className = "btn-srv";
        btn.innerText = name;
        
        btn.onclick = () => {
            iframe.src = "about:blank"; // Limpiar rastro
            setTimeout(() => { iframe.src = url; }, 100);
            document.querySelectorAll('.btn-srv').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };

        srvList.appendChild(btn);
        if(index === 0) btn.click(); // Auto-play primer mirror
    });
}

/* --- 6. CONTROLES EXTRAS --- */
function changeEp(step) {
    currentEp += step;
    if(currentEp < 1) currentEp = 1;
    loadMedia(currentId, 'anime');
}

function backToGrid() {
    document.getElementById('details-view').classList.remove('active');
    document.getElementById(`${currentMode}-section`).classList.add('active');
}

// TV en vivo
let hlsInstance = new Hls();
function playTV(url) {
    const video = document.getElementById('hls-player');
    const iframe = document.getElementById('media-iframe');
    
    iframe.style.display = 'none';
    video.style.display = 'block';
    document.getElementById('anime-controls').style.display = 'none';
    document.getElementById('srv-list').innerHTML = "";

    if (Hls.isSupported()) {
        hlsInstance.loadSource(url);
        hlsInstance.attachMedia(video);
        hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => video.play());
    }
}

/* --- 7. CARGA INICIAL (TV) --- */
window.onload = () => {
    const tvGrid = document.getElementById('grid-tv');
    SERVERS_DB.tv.forEach(ch => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="${ch.img}" style="object-fit:contain; padding:10px;"><div class="card-title">${ch.n}</div>`;
        card.onclick = () => playTV(ch.u);
        tvGrid.appendChild(card);
    });
};
