const SERVERS_DB = {
    // ANIME: 15 Reproductores (Sub Español / Japonés)
    anime: (id, ep) => ({
        "Netu (Hqq)": `https://hqq.ac/e/${id}${ep}`,
        "Streamwish": `https://streamwish.to/e/anime-${id}-${ep}`,
        "Voe.sx": `https://voe.sx/e/anime-${id}-${ep}`,
        "Uqload": `https://uqload.to/embed-${id}-${ep}.html`,
        "Sbir (Fast)": `https://sbir.to/e/${id}-${ep}`,
        "Filemoon": `https://filemoon.sx/e/${id}${ep}`,
        "Mixdrop": `https://mixdrop.co/e/anime-${id}-${ep}`,
        "Vidhide": `https://vidhide.com/v/${id}${ep}`,
        "Okru": `https://ok.ru/videoembed/${id}${ep}`,
        "DoodStream": `https://dood.to/e/anime-${id}-${ep}`,
        "JK-Mirror 1": `https://vidsrc.cc/v2/embed/anime/${id}/${ep}`,
        "JK-Mirror 2": `https://vidsrc.xyz/embed/anime/${id}?ep=${ep}`,
        "Vidsrc.to": `https://vidsrc.to/embed/anime/${id}/${ep}`,
        "Embed.su": `https://embed.su/embed/anime/${id}/${ep}`,
        "Alpha-Sub": `https://vidsrc.me/embed/anime?mal=${id}&ep=${ep}`
    }),

    // CINE: 10 Reproductores (Audio Latino / Castellano)
    cine: (id) => ({
        "Latino Principal": `https://vidsrc.cc/v2/embed/movie/${id}`,
        "Latino VIP": `https://vidsrc.xyz/embed/movie?tmdb=${id}`,
        "Upstream": `https://upstream.to/embed-${id}.html`,
        "Voe (Cine)": `https://voe.sx/e/movie-${id}`,
        "Nube": `https://nuuub.com/embed/${id}`,
        "Alpha Latino": `https://vidsrc.me/embed/movie?tmdb=${id}`,
        "Castellano": `https://embed.su/embed/movie/${id}`,
        "Vidjoy": `https://vidjoy.pro/embed/movie/${id}`,
        "Pro-Player": `https://player.autoembed.cc/movie/${id}`,
        "Mirror-X": `https://vidsrc.pro/embed/movie/${id}`
    }),

    // TV GHOST: Iconos Rojos (TV / Balón / Música)
    tv: [
        // CHILE
        { n: "Canal 13", u: "https://rudo.video/live/c13", ico: "fa-tv" },
        { n: "Mega", u: "https://rudo.video/live/megatv", ico: "fa-tv" },
        { n: "CHV", u: "https://rudo.video/live/chv", ico: "fa-tv" },
        { n: "TVN", u: "https://rudo.video/live/tvn", ico: "fa-tv" },
        { n: "TNT Sports", u: "https://rudo.video/live/tntsports", ico: "fa-volleyball-ball" },
        
        // DEPORTES INTERNACIONAL
        { n: "ESPN 1", u: "https://rudo.video/live/espn", ico: "fa-volleyball-ball" },
        { n: "Fox Sports", u: "https://rudo.video/live/foxsports", ico: "fa-volleyball-ball" },
        { n: "TyC Sports", u: "https://rudo.video/live/tycsports", ico: "fa-volleyball-ball" },
        { n: "Real Madrid TV", u: "https://rmtv.secure.footprint.net/hls/rmtv_es.m3u8", ico: "fa-volleyball-ball" },

        // MÚSICA (GHOST BEATS)
        { n: "MTV Hits", u: "https://mtv.secure.footprint.net/master.m3u8", ico: "fa-music" },
        { n: "VH1 Classic", u: "https://vh1.secure.footprint.net/master.m3u8", ico: "fa-music" },
        { n: "Deluxe Music", u: "https://deluxemusic.secure.footprint.net/master.m3u8", ico: "fa-headphones" },

        // MUNDO / NOTICIAS
        { n: "RTVE (España)", u: "https://rtve.mdstrm.com/live-stream-playlist/58d5138136369a451e6005d5.m3u8", ico: "fa-globe" },
        { n: "Antena 3", u: "https://antena3-live.secure.footprint.net/master.m3u8", ico: "fa-globe" },
        { n: "Televisa (MEX)", u: "https://televisa-live.secure.footprint.net/master.m3u8", ico: "fa-globe" },
        { n: "CNN Int", u: "https://cnn-hls.secure.footprint.net/master.m3u8", ico: "fa-newspaper" },
        { n: "NASA TV", u: "https://ntv-live.secure.footprint.net/master.m3u8", ico: "fa-rocket" },
        { n: "DW (Alemán)", u: "https://dwstream3-lh.akamaihd.net/i/dwstream3_live@124430/master.m3u8", ico: "fa-broadcast-tower" }
    ]
};
