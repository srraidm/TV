// --- ESTADO GLOBAL DE LA APP ---
let currentMode = 'tv';
let currentId = '';
let currentEp = 1;
let currentSrv = 'Vidsrc.me';

// --- ELEMENTOS DEL DOM ---
const hlsPlayer = document.getElementById('hls-player');
const iframePlayer = document.getElementById('media-iframe');
const srvList = document.getElementById('srv-list');
const globalSearch = document.getElementById('global-search');

// --- 1. GESTIÓN DE PESTAÑAS (TABS) ---
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.onclick = () => {
        const target = btn.getAttribute('data-target');
        
        // UI: Activar botón y sección
        document.querySelectorAll('.nav-btn, .content-tab').forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(target).classList.add('active');
        
        // Lógica: Cambiar modo
        currentMode = target.split('-')[0];
        console.log("Modo cambiado a:", currentMode);
    };
});

// --- 2. CARGA DE MEDIOS (ANIME / CINE) ---
function loadMedia(id, type) {
    currentId = id;
    currentMode = type;
    currentEp = 1; // Reiniciar episodio al cambiar de anime

    // Limpiar reproductores
    hlsPlayer.style.display = 'none';
    iframePlayer.style.display = 'block';
    iframePlayer.src = ""; 

    renderServerButtons();
    autoLoadFirstServer();
    
    // Scroll suave hacia arriba para ver el video
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 3. RENDERIZADO DE SERVIDORES ---
function renderServerButtons() {
    srvList.innerHTML = "";
    const servers = currentMode === 'anime' 
        ? SERVERS_DB.anime(currentId, currentEp) 
        : SERVERS_DB.cine(currentId);

    Object.keys(servers).forEach(name => {
        const btn = document.createElement('button');
        btn.className = 'btn-srv';
        btn.innerText = name;
        if(name === currentSrv) btn.classList.add('active');

        btn.onclick = () => {
            // UI: Activar botón
            document.querySelectorAll('.btn-srv').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Lógica: Cambiar Source
            currentSrv = name;
            iframePlayer.src = servers[name];
        };
        srvList.appendChild(btn);
    });
}

function autoLoadFirstServer() {
    const servers = currentMode === 'anime' 
        ? SERVERS_DB.anime(currentId, currentEp) 
        : SERVERS_DB.cine(currentId);
    
    const firstUrl = Object.values(servers)[0];
    iframePlayer.src = firstUrl;
}

// --- 4. TV EN VIVO (HLS MOTOR) ---
let hls = new Hls();
function playTV(url) {
    iframePlayer.style.display = 'none';
    hlsPlayer.style.display = 'block';
    srvList.innerHTML = "<p style='font-size:0.7rem; color:gray;'>Streaming Directo HLS</p>";

    if (Hls.isSupported()) {
        hls.destroy();
        hls = new Hls();
        hls.loadSource(url + "?ext=m3u8");
        hls.attachMedia(hlsPlayer);
        hls.on(Hls.Events.MANIFEST_PARSED, () => hlsPlayer.play());
    } else if (hlsPlayer.canPlayType('application/vnd.apple.mpegurl')) {
        hlsPlayer.src = url;
        hlsPlayer.play();
    }
}

// --- 5. BUSCADOR (APIS REALES) ---
async function performSearch() {
    const query = globalSearch.value.trim();
    if (!query) return;

    if (currentMode === 'anime') {
        const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=15`);
        const { data } = await res.json();
        renderResults('grid-anime', data, 'anime');
    } else {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=ace288544d732899479e96e944733e8f&query=${query}&language=es-MX`);
        const { results } = await res.json();
        renderResults('grid-cine', results, 'cine');
    }
}

function renderResults(containerId, items, type) {
    const grid = document.getElementById(containerId);
    grid.innerHTML = "";

    items.forEach(item => {
        const id = item.mal_id || item.id;
        const title = item.title || item.name;
        const img = item.images?.jpg.large_image_url || `https://image.tmdb.org/t/p/w500${item.poster_path}`;

        if (img && !img.includes('null')) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${img}" alt="${title}" loading="lazy">
                <div class="card-title">${title}</div>
            `;
            card.onclick = () => loadMedia(id, type);
            grid.appendChild(card);
        }
    });
}

// --- 6. EVENTOS DE INICIO ---
globalSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

// Cargar Canales de TV al inicio
function initTV() {
    const tvGrid = document.getElementById('grid-tv');
    SERVERS_DB.tv.forEach(ch => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${ch.img}" style="object-fit:contain; padding:15px; background:#000;">
            <div class="card-title">${ch.n}</div>
        `;
        card.onclick = () => playTV(ch.u);
        tvGrid.appendChild(card);
    });
}

// Ejecutar al cargar la página
window.onload = initTV;
