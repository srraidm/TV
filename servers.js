/* --- BASE DE DATOS DE SERVIDORES (MIRRORS) --- */
const SERVERS_DB = {
    // REPRODUCTORES DE ANIME (Basados en ID de MyAnimeList)
    anime: (id, ep) => ({
        "JK-Mirror 1": `https://vidsrc.cc/v2/embed/anime/${id}/${ep}`,
        "JK-Mirror 2": `https://vidsrc.xyz/embed/anime/${id}?ep=${ep}`,
        "Vidsrc.to": `https://vidsrc.to/embed/anime/${id}/${ep}`,
        "Vidsrc.pro": `https://vidsrc.pro/embed/anime/${id}/${ep}`,
        "Embed.su": `https://embed.su/embed/anime/${id}/${ep}`,
        "2Embed": `https://www.2embed.cc/embedanime/${id}/${ep}`,
        "AnimeFenix": `https://multiembed.mov/?video_id=${id}&s=${ep}&type=anime`,
        "AutoEmbed": `https://autoembed.to/anime/mal/${id}/${ep}`,
        "Alpha-Stream": `https://vidsrc.me/embed/anime?mal=${id}&ep=${ep}`
    }),

    // REPRODUCTORES DE CINE Y SERIES (Basados en ID de TMDB)
    cine: (id) => ({
        "Latino 1": `https://vidsrc.cc/v2/embed/movie/${id}`,
        "Latino 2": `https://vidsrc.xyz/embed/movie?tmdb=${id}`,
        "Castellano": `https://embed.su/embed/movie/${id}`,
        "Subtitulado": `https://vidsrc.to/embed/movie/${id}`,
        "Pro-Player": `https://player.autoembed.cc/movie/${id}`,
        "Nube": `https://nuuub.com/embed/${id}`,
        "Multi-Mirror": `https://vidsrc.me/embed/movie?tmdb=${id}`
    }),

    // CANALES DE TV (HLS / M3U8)
    tv: [
        { 
            n: "Canal 13", 
            u: "https://rudo.video/live/c13", 
            img: "https://upload.wikimedia.org/wikipedia/commons/4/40/Canal_13_Chile_logo.svg" 
        },
        { 
            n: "Mega", 
            u: "https://rudo.video/live/megatv", 
            img: "https://upload.wikimedia.org/wikipedia/commons/2/22/Mega_logo_2020.png" 
        },
        { 
            n: "CHV", 
            u: "https://rudo.video/live/chv", 
            img: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Chilevisi%C3%B3n_logo_2018.svg" 
        },
        { 
            n: "TNT Sports", 
            u: "https://rudo.video/live/tntsports", 
            img: "https://logodownload.org/wp-content/uploads/2019/11/tnt-sports-logo-0.png" 
        },
        { 
            n: "TVN", 
            u: "https://rudo.video/live/tvn", 
            img: "https://upload.wikimedia.org/wikipedia/commons/2/22/TVN_Logo.svg" 
        },
        { 
            n: "CNN Chile", 
            u: "https://rudo.video/live/cnnchile", 
            img: "https://upload.wikimedia.org/wikipedia/commons/6/66/CNN_Chile_logo.svg" 
        }
    ]
};
