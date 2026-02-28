// --- CONFIGURACIÓN DE APIS Y ESTADO ---
const TMDB_KEY = 'ace288544d732899479e96e944733e8f';
let currentMode = 'tv';
let currentId = '';
let currentEp = 1;
let currentSrv = 'Vidsrc';

// --- BASE DE DATOS TV (M3U8 Directo) ---
const TV_CHANNELS = [
    { n: "Canal 13 HD", u: "https://rudo.video/live/c13", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Canal_13_Chile_logo.svg/1200px-Canal_13_Chile_logo.svg.png" },
    { n: "Mega HD", u: "https://rudo.video/live/megatv", img: "https://upload.wikimedia.org/wikipedia/commons/2/22/Mega_logo_2020.png" },
    { n: "Chilevisión", u: "https://rudo.video/live/chv", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chilevisi%C3%B3n_logo_2018.svg/1024px-Chilevisi%C3%B3n_logo_2018.svg.png" },
    { n: "TVN Chile", u: "https://rudo.video/live/tvn", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/TVN_Chile_logo_2020.svg/1200px-TVN_Chile_logo_2020.svg.png" },
    { n: "TNT Sports", u: "https://rudo.video/live/tntsports", img: "https://logodownload.org/wp-content/uploads/2019/11/tnt-sports-logo-0.png" }
];

// --- SELECTORES ---
const hlsVid = document.getElementById('hls-player');
const ifr = document.getElementById('media-iframe');
const srvPanel = document.getElementById('srv-panel');
const srvList = document.getElementById('srv-list');
const animeCtrl = document.getElementById('anime-controls');
let hls = new Hls();

// --- NAVEGACIÓN DE PESTAÑAS ---
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.nav-btn, .content-tab').forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.target).classList.add('active');
        currentMode = btn.dataset.target.split('-')[0];
        if (currentMode === 'tv') stopMedia();
    };
});

// --- LÓGICA DE REPRODUCTORES (ANTI-BLOQUEO) ---
const getServers = (id, ep) => {
    if (currentMode === 'anime') {
        return {
            "Vidsrc": `https://vidsrc.me/embed/anime?mal=${id}&ep=${ep}`,
            "Magi": `https://vidsrc.to/embed/anime/${id}/${ep}`,
            "Desu": `https://anime.vidsrc.xyz/embed/anime?mal=${id}&ep=${ep}`,
            "SuperE": `https://multiembed.mov/?video_id=${id}&s=${ep}&type=anime`,
            "VOE": `https://voe.sx/e/${id}`,
            "Vidhide": `https://vidhide.online/v/${id}`
        };
    } else {
        return {
            "Vidsrc": `https://vidsrc.xyz/embed/movie?tmdb=${id}`,
            "EmbedSu": `https://embed.su/embed/movie/${id}`,
            "Cuevana": `https://api.cuevana.biz/embed/${id}`,
            "Vidhide": `https://vidhide.online/v/${id}`,
            "AutoE": `https://autoembed.to/movie/tmdb/${id}`
        };
    }
};

// --- FUNCIÓN CARGAR CONTENIDO ---
function loadMedia(id, type) {
    currentId = id;
    currentMode = type;
    srvPanel.classList.add('active');
    hlsVid.style.display = 'none';
    ifr.style.display = 'block';
    animeCtrl.style.display = (type === 'anime') ? 'flex' : 'none';
    
    renderServers();
    updateIframe();
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function updateIframe() {
    const srvs = getServers(currentId, currentEp);
    ifr.src = srvs[currentSrv] || Object.values(srvs)[0];
    document.getElementById('current-ep-display').innerText = `EPISODIO ${currentEp}`;
}

function renderServers() {
    const srvs = getServers(currentId, currentEp);
    srvList.innerHTML = "";
    Object.keys(srvs).forEach(key => {
        const btn = document.createElement('button');
        btn.className = `btn-server ${currentSrv === key ? 'active' : ''}`;
        btn.innerText = key;
        btn.onclick = () => {
            currentSrv = key;
            renderServers();
            updateIframe();
        };
        srvList.appendChild(btn);
    });
}

// --- CANALES EN VIVO ---
function playTV(url) {
    srvPanel.classList.remove('active');
    ifr.style.display = 'none';
    hlsVid.style.display = 'block';
    
    let streamUrl = url + "?ext=m3u8";
    if (Hls.isSupported()) {
        hls.destroy();
        hls = new Hls();
        hls.loadSource(streamUrl);
        hls.attachMedia(hlsVid);
        hls.on(Hls.Events.MANIFEST_PARSED, () => hlsVid.play());
    }
}

function stopMedia() {
    hls.destroy();
    ifr.src = "";
    srvPanel.classList.remove('active');
}

// --- BUSCADORES Y APIS ---
async function searchA(q = "Dragon Ball") {
    const r = await fetch(`https://api.jikan.moe/v4/anime?q=${q}&limit=12`);
    const {data} = await r.json();
    const g = document.getElementById('grid-anime'); g.innerHTML = "";
    data.forEach(a => {
        g.innerHTML += `<div class="card" onclick="loadMedia('${a.mal_id}','anime')">
            <img src="${a.images.jpg.large_image_url}">
            <div class="card-overlay"><div class="card-title">${a.title}</div></div>
        </div>`;
    });
}

async function searchC(q = "") {
    const url = q ? `search/movie?query=${q}` : `movie/popular?`;
    const r = await fetch(`https://api.themoviedb.org/3/${url}&api_key=${TMDB_KEY}&language=es-MX`);
    const {results} = await r.json();
    const g = document.getElementById('grid-cine'); g.innerHTML = "";
    results.forEach(m => {
        if(!m.poster_path) return;
        g.innerHTML += `<div class="card" onclick="loadMedia('${m.id}','cine')">
            <img src="https://image.tmdb.org/t/p/w500${m.poster_path}">
            <div class="card-overlay"><div class="card-title">${m.title}</div></div>
        </div>`;
    });
}

// --- NAVEGACIÓN EPISODIOS ---
function changeEpisode(val) {
    currentEp += val;
    if (currentEp < 1) currentEp = 1;
    updateIframe();
}

// --- BUSQUEDA GLOBAL ---
document.getElementById('global-search').onkeyup = (e) => {
    if(e.key === 'Enter') {
        const val = e.target.value;
        if(currentMode === 'anime') searchA(val);
        else if(currentMode === 'cine') searchC(val);
    }
};

// --- INICIALIZACIÓN ---
const init = () => {
    TV_CHANNELS.forEach(c => {
        document.getElementById('grid-tv').innerHTML += `<div class="card" onclick="playTV('${c.u}')">
            <img src="${c.img}" style="object-fit: contain; padding: 20px; background: #000;">
            <div class="card-overlay"><div class="card-title">${c.n}</div></div>
        </div>`;
    });
    searchA(); searchC();
};

init();
