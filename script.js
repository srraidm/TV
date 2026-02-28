/* --- SrRaid TVGHOST: CORE ENGINE 2026 --- */

const TMDB_KEY = 'cfdc75b5370b04c34395eda1f63989b4';
let currentMode = 'tv', currentId = '', currentEp = 1;
let favorites = JSON.parse(localStorage.getItem('srraid_favs')) || [];

// --- INICIALIZACIÓN ---
window.onload = () => {
    renderTVGrid(); // Carga los +200 canales al inicio
    setupNavigation();
    setupSearch();
};

// --- NAVEGACIÓN ENTRE SECCIONES ---
function setupNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            document.querySelectorAll('.content-tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            
            document.getElementById(target).classList.add('active');
            btn.classList.add('active');
            currentMode = target.split('-')[0]; // tv, anime, cine
        });
    });
}

// --- RENDERIZAR TV (EL MONSTRUO DE ICONOS ROJOS) ---
function renderTVGrid(filter = "") {
    const grid = document.getElementById('grid-tv');
    if (!grid) return;
    grid.innerHTML = "";

    const filteredChannels = SERVERS_DB.tv.filter(ch => 
        ch.n.toLowerCase().includes(filter.toLowerCase())
    );

    filteredChannels.forEach(ch => {
        const card = document.createElement('div');
        card.className = 'card-tv';
        card.innerHTML = `
            <i class="fas ${ch.ico}"></i>
            <span>${ch.n}</span>
        `;
        card.onclick = () => playTV(ch.u);
        grid.appendChild(card);
    });
}

// --- REPRODUCTOR DE TV (HLS) ---
function playTV(url) {
    const iframe = document.getElementById('media-iframe');
    const hlsPlayer = document.getElementById('hls-player');
    
    // Reset de contenedores
    iframe.style.display = 'none';
    iframe.src = "";
    hlsPlayer.style.display = 'block';
    document.getElementById('anime-controls').style.display = 'none';

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(hlsPlayer);
        hls.on(Hls.Events.MANIFEST_PARSED, () => hlsPlayer.play());
    } else if (hlsPlayer.canPlayType('application/vnd.apple.mpegurl')) {
        hlsPlayer.src = url;
        hlsPlayer.addEventListener('loadedmetadata', () => hlsPlayer.play());
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- BUSCADOR GLOBAL ---
function setupSearch() {
    const input = document.getElementById('global-search');
    input.addEventListener('input', (e) => {
        const q = e.target.value;
        if (currentMode === 'tv') {
            renderTVGrid(q); // Filtrado instantáneo de canales
        }
    });
}

async function executeSearch() {
    const q = document.getElementById('global-search').value;
    if (!q || currentMode === 'tv') return;

    if (currentMode === 'anime') {
        const r = await fetch(`https://api.jikan.moe/v4/anime?q=${q}&limit=24`);
        const { data } = await r.json();
        renderMainGrid('grid-anime', data, 'anime');
    } else {
        const r = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_KEY}&query=${q}&language=es-MX`);
        const { results } = await r.json();
        renderMainGrid('grid-cine', results, 'cine');
    }
}

// --- RENDERIZAR GRIDS (ANIME / CINE) ---
function renderMainGrid(containerId, items, type) {
    const grid = document.getElementById(containerId);
    grid.innerHTML = "";
    
    items.forEach(item => {
        const id = item.mal_id || item.id;
        const title = item.title || item.name;
        const img = item.images?.jpg?.large_image_url || `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        
        if (!img || img.includes('null')) return;

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${img}" loading="lazy">
            <div class="card-title">${title}</div>
        `;
        card.onclick = () => type === 'anime' ? openDetails(id) : loadMedia(id, 'cine');
        grid.appendChild(card);
    });
}

// --- REPRODUCTOR MULTI-SERVIDOR ---
function loadMedia(id, type) {
    currentId = id; currentMode = type;
    const iframe = document.getElementById('media-iframe');
    const hls = document.getElementById('hls-player');
    
    hls.pause();
    hls.style.display = 'none';
    iframe.style.display = 'block';
    
    if (type === 'anime') {
        document.getElementById('anime-controls').style.display = 'flex';
        document.getElementById('ep-indicator').innerText = `GHOST EP: ${currentEp}`;
    }

    renderServerButtons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderServerButtons() {
    const container = document.getElementById('srv-list');
    const iframe = document.getElementById('media-iframe');
    container.innerHTML = "";

    const sources = currentMode === 'anime' ? SERVERS_DB.anime(currentId, currentEp) : SERVERS_DB.cine(currentId);

    Object.entries(sources).forEach(([name, url], index) => {
        const btn = document.createElement('button');
        btn.className = "btn-srv";
        btn.innerText = name;
        btn.onclick = () => {
            iframe.src = "about:blank"; // Limpia buffer
            setTimeout(() => { iframe.src = url; }, 100);
            document.querySelectorAll('.btn-srv').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
        container.appendChild(btn);
        if (index === 0) btn.click(); // Carga el servidor Ghost Principal por defecto
    });
}

// --- LÓGICA DE EPISODIOS ---
function changeEp(dir) {
    currentEp = Math.max(1, currentEp + dir);
    loadMedia(currentId, 'anime');
}

// --- DETALLES DE ANIME ---
async function openDetails(id) {
    currentId = id; currentEp = 1;
    document.querySelectorAll('.content-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('details-view').classList.add('active');

    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
    const { data } = await res.json();

    document.getElementById('detail-title').innerText = data.title;
    document.getElementById('detail-img').src = data.images.jpg.large_image_url;
    document.getElementById('detail-desc').innerText = data.synopsis || "Sin descripción disponible.";

    // Generar Episodios Grid
    const epGrid = document.getElementById('episode-grid');
    epGrid.innerHTML = "";
    const total = data.episodes || 12;
    for (let i = 1; i <= total; i++) {
        const ep = document.createElement('div');
        ep.className = "ep-card";
        ep.innerText = i;
        ep.onclick = () => { currentEp = i; loadMedia(id, 'anime'); };
        epGrid.appendChild(ep);
    }
}
