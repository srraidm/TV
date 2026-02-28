/**
 * SERVERS_DB - Base de datos de reproductores 2026
 * Este archivo centraliza todos los enlaces para evitar errores de formato.
 */

const SERVERS_DB = {
    // Generador de enlaces para Anime (utiliza el ID de MyAnimeList)
    anime: (id, ep) => ({
        "Vidsrc.me": `https://vidsrc.me/embed/anime?mal=${id}&ep=${ep}`,
        "Vidsrc.to": `https://vidsrc.to/embed/anime/${id}/${ep}`,
        "Vidsrc.xyz": `https://vidsrc.xyz/embed/anime?mal=${id}&ep=${ep}`,
        "Magi": `https://vidsrc.to/embed/anime/${id}/${ep}`,
        "SuperEmbed": `https://multiembed.mov/?video_id=${id}&s=${ep}&type=anime`,
        "Embed.su": `https://embed.su/embed/anime/${id}/${ep}`,
        "Vidhide": `https://vidhide.online/v/${id}`,
        "VOE.sx": `https://voe.sx/e/${id}`,
        "Okru": `https://ok.ru/videoembed/${id}`,
        "Streamwish": `https://awish.pro/e/${id}`,
        "Filemoon": `https://filemoon.sx/e/${id}`
    }),

    // Generador de enlaces para Cine & Series (utiliza el ID de TMDB)
    cine: (id) => ({
        "Vidsrc.xyz": `https://vidsrc.xyz/embed/movie?tmdb=${id}`,
        "Vidsrc.me": `https://vidsrc.me/embed/movie?tmdb=${id}`,
        "Embed.su": `https://embed.su/embed/movie/${id}`,
        "Vidhide": `https://vidhide.online/v/${id}`,
        "Cuevana": `https://api.cuevana.biz/embed/${id}`,
        "AutoEmbed": `https://autoembed.to/movie/tmdb/${id}`,
        "Viper": `https://vidsrc.me/embed/movie?tmdb=${id}`,
        "Uqload": `https://uqload.com/embed/${id}`,
        "Mixdrop": `https://mixdrop.co/e/${id}`
    }),

    // Canales de TV (Enlaces directos HLS)
    tv: [
        { 
            n: "Canal 13 Chile", 
            u: "https://rudo.video/live/c13", 
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Canal_13_Chile_logo.svg/1200px-Canal_13_Chile_logo.svg.png" 
        },
        { 
            n: "Mega HD", 
            u: "https://rudo.video/live/megatv", 
            img: "https://upload.wikimedia.org/wikipedia/commons/2/22/Mega_logo_2020.png" 
        },
        { 
            n: "Chilevisión", 
            u: "https://rudo.video/live/chv", 
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chilevisi%C3%B3n_logo_2018.svg/1024px-Chilevisi%C3%B3n_logo_2018.svg.png" 
        },
        { 
            n: "TVN Chile", 
            u: "https://rudo.video/live/tvn", 
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/TVN_Chile_logo_2020.svg/1200px-TVN_Chile_logo_2020.svg.png" 
        },
        { 
            n: "TNT Sports", 
            u: "https://rudo.video/live/tntsports", 
            img: "https://logodownload.org/wp-content/uploads/2019/11/tnt-sports-logo-0.png" 
        }
    ]
};
