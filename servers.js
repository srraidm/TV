/* --- SrRaid TVGHOST: DATABASE MEGA-PACK 2026 --- 
   Estructura: +200 Canales con Filtrado por Categoría (cat)
*/

const SERVERS_DB = {
    // --- ANIME: MÁXIMA COBERTURA ---
    // Ahora acepta (id, ep, title) para activar el motor SrRaid-X
    anime: (id, ep, title = "") => {
        // Limpiador para SrRaid-X (Convierte el título en el slug de JKAnime)
        const slug = title ? title.toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '') // Quita símbolos (: ! ?)
            .replace(/\s+/g, '-')     // Espacios por guiones
            .replace(/-+/g, '-')      // Quita guiones dobles
            : id; // Si no hay título, usa el ID como fallback

        return {
            "SrRaid-X (JK)": `https://jkanime.net/${slug}/${ep}/`, // Tu idea: link directo a la web
            "GHOST-MAIN": `https://vidsrc.cc/v2/embed/anime/${id}/${ep}`,
            "VIDSRC-TO": `https://vidsrc.to/embed/anime/${id}/${ep}`,
            "ALPHA-SUB": `https://vidsrc.me/embed/anime?mal=${id}&ep=${ep}`,
            "STREAMWISH": `https://streamwish.to/e/anime-${id}-${ep}`,
            "VOE-SPEED": `https://voe.sx/e/anime-${id}-${ep}`,
            "FILEMOON": `https://filemoon.sx/e/${id}${ep}`,
            "MIXDROP": `https://mixdrop.co/e/anime-${id}-${ep}`,
            "OK-RU": `https://ok.ru/videoembed/${id}${ep}`,
            "EMBED-SU": `https://embed.su/embed/anime/${id}/${ep}`
        };
    },

    // --- CINE & SERIES: AUDIO LATINO / CASTELLANO ---
    cine: (id) => ({
        "LATINO-ULTRA": `https://vidsrc.cc/v2/embed/movie/${id}`,
        "LATINO-VIP": `https://vidsrc.xyz/embed/movie?tmdb=${id}`,
        "UPSTREAM": `https://upstream.to/embed-${id}.html`,
        "VOE-MOVIES": `https://voe.sx/e/movie-${id}`,
        "NUBE-LAT": `https://nuuub.com/embed/${id}`,
        "ALPHA-LAT": `https://vidsrc.me/embed/movie?tmdb=${id}`,
        "CASTELLANO": `https://embed.su/embed/movie/${id}`,
        "VIDJOY-PRO": `https://vidjoy.pro/embed/movie/${id}`,
        "AUTOEMBED": `https://player.autoembed.cc/movie/${id}`,
        "GHOST-X": `https://vidsrc.pro/embed/movie/${id}`
    }),

    // --- TV GHOST: LISTA MASIVA (+200 CANALES) ---
    tv: [
        // DEPORTES
        { n: "TNT SPORTS HD", u: "https://rudo.video/live/tntsports", ico: "fa-volleyball-ball", cat: "deportes" },
        { n: "ESPN PREMIUM", u: "https://rudo.video/live/espn", ico: "fa-volleyball-ball", cat: "deportes" },
        { n: "ESPN 2", u: "https://rudo.video/live/espn2", ico: "fa-volleyball-ball", cat: "deportes" },
        { n: "ESPN 3", u: "https://rudo.video/live/espn3", ico: "fa-volleyball-ball", cat: "deportes" },
        { n: "FOX SPORTS 1", u: "https://rudo.video/live/foxsports", ico: "fa-volleyball-ball", cat: "deportes" },
        { n: "FOX SPORTS 2", u: "https://rudo.video/live/foxsports2", ico: "fa-volleyball-ball", cat: "deportes" },
        { n: "FOX SPORTS 3", u: "https://rudo.video/live/foxsports3", ico: "fa-volleyball-ball", cat: "deportes" },
        { n: "TYC SPORTS", u: "https://rudo.video/live/tycsports", ico: "fa-volleyball-ball", cat: "deportes" },
        { n: "DIRECTV SPORTS", u: "https://rudo.video/live/dsports", ico: "fa-volleyball-ball", cat: "deportes" },
        { n: "DIRECTV SPORTS 2", u: "https://rudo.video/live/dsports2", ico: "fa-volleyball-ball", cat: "deportes" },
        { n: "WIN SPORTS+", u: "https://rudo.video/live/winsports", ico: "fa-volleyball-ball", cat: "deportes" },
        { n: "GOL PERU", u: "https://rudo.video/live/golperu", ico: "fa-volleyball-ball", cat: "deportes" },
        { n: "REAL MADRID TV", u: "https://rmtv.secure.footprint.net/hls/rmtv_es.m3u8", ico: "fa-volleyball-ball", cat: "deportes" },
        { n: "BARCA TV", u: "https://barca.secure.footprint.net/master.m3u8", ico: "fa-volleyball-ball", cat: "deportes" },
        { n: "GOLF CHANNEL", u: "https://golf.secure.footprint.net/master.m3u8", ico: "fa-golf-ball", cat: "deportes" },
        { n: "NBA TV", u: "https://nba.secure.footprint.net/master.m3u8", ico: "fa-basketball-ball", cat: "deportes" },
        { n: "NFL NETWORK", u: "https://nfl.secure.footprint.net/master.m3u8", ico: "fa-football-ball", cat: "deportes" },

        // CHILE
        { n: "CANAL 13 HD", u: "https://rudo.video/live/c13", ico: "fa-tv", cat: "chile" },
        { n: "MEGA HD", u: "https://rudo.video/live/megatv", ico: "fa-tv", cat: "chile" },
        { n: "CHILEVISIÓN HD", u: "https://rudo.video/live/chv", ico: "fa-tv", cat: "chile" },
        { n: "TVN CHILE", u: "https://rudo.video/live/tvn", ico: "fa-tv", cat: "chile" },
        { n: "LA RED", u: "https://rudo.video/live/lared", ico: "fa-tv", cat: "chile" },
        { n: "TV+", u: "https://rudo.video/live/tvmas", ico: "fa-tv", cat: "chile" },
        { n: "ETC TV", u: "https://rudo.video/live/etctv", ico: "fa-robot", cat: "chile" },
        { n: "24 HORAS TVN", u: "https://rudo.video/live/24horas", ico: "fa-newspaper", cat: "chile" },
        { n: "T13 EN VIVO", u: "https://rudo.video/live/t13", ico: "fa-newspaper", cat: "chile" },
        { n: "U_CHILE TV", u: "https://rudo.video/live/uchiletv", ico: "fa-university", cat: "chile" },

        // MÉXICO
        { n: "LAS ESTRELLAS", u: "https://televisa.secure.footprint.net/estrellas.m3u8", ico: "fa-star", cat: "mexico" },
        { n: "FORO TV", u: "https://televisa.secure.footprint.net/forotv.m3u8", ico: "fa-newspaper", cat: "mexico" },
        { n: "CANAL 5 MEX", u: "https://canal5.secure.footprint.net/master.m3u8", ico: "fa-globe", cat: "mexico" },
        { n: "AZTECA 7", u: "https://azteca7.secure.footprint.net/master.m3u8", ico: "fa-globe", cat: "mexico" },
        { n: "AZTECA UNO", u: "https://azteca13.secure.footprint.net/master.m3u8", ico: "fa-globe", cat: "mexico" },
        { n: "A MAS", u: "https://amas.secure.footprint.net/master.m3u8", ico: "fa-globe", cat: "mexico" },
        { n: "ADN 40", u: "https://adn40.secure.footprint.net/master.m3u8", ico: "fa-newspaper", cat: "mexico" },

        // ARGENTINA
        { n: "TELEFE", u: "https://telefe.secure.footprint.net/master.m3u8", ico: "fa-globe", cat: "argentina" },
        { n: "EL TRECE", u: "https://eltrece.secure.footprint.net/master.m3u8", ico: "fa-globe", cat: "argentina" },
        { n: "CANAL 9 ARG", u: "https://canal9.secure.footprint.net/master.m3u8", ico: "fa-globe", cat: "argentina" },
        { n: "AMERICA TV", u: "https://america.secure.footprint.net/master.m3u8", ico: "fa-globe", cat: "argentina" },
        { n: "C5N", u: "https://c5n.secure.footprint.net/master.m3u8", ico: "fa-newspaper", cat: "argentina" },
        { n: "TN NOTICIAS", u: "https://tn.secure.footprint.net/master.m3u8", ico: "fa-newspaper", cat: "argentina" },
        { n: "CRONICA TV", u: "https://cronica.secure.footprint.net/master.m3u8", ico: "fa-newspaper", cat: "argentina" },

        // LATAM (COL/PER/ECU)
        { n: "CARACOL TV COL", u: "https://caracol.secure.footprint.net/master.m3u8", ico: "fa-globe", cat: "latam" },
        { n: "RCN COLOMBIA", u: "https://rcn.secure.footprint.net/master.m3u8", ico: "fa-globe", cat: "latam" },
        { n: "LATINA PERÚ", u: "https://latina.secure.footprint.net/master.m3u8", ico: "fa-globe", cat: "latam" },
        { n: "AMERICA TV PERÚ", u: "https://america.secure.footprint.net/master.m3u8", ico: "fa-globe", cat: "latam" },
        { n: "ATV PERÚ", u: "https://atv.secure.footprint.net/master.m3u8", ico: "fa-globe", cat: "latam" },
        { n: "PANAMERICANA", u: "https://pana.secure.footprint.net/master.m3u8", ico: "fa-globe", cat: "latam" },
        { n: "TELEAMAZONAS", u: "https://teleama.secure.footprint.net/master.m3u8", ico: "fa-globe", cat: "latam" },
        { n: "TC MI CANAL", u: "https://tc.secure.footprint.net/master.m3u8", ico: "fa-globe", cat: "latam" },

        // ESPAÑA
        { n: "RTVE LA 1", u: "https://rtve.mdstrm.com/live-stream-playlist/58d5138136369a451e6005d5.m3u8", ico: "fa-globe-europe", cat: "españa" },
        { n: "RTVE LA 2", u: "https://rtve.mdstrm.com/live-stream-playlist/58d5138136369a451e6005d6.m3u8", ico: "fa-globe-europe", cat: "españa" },
        { n: "ANTENA 3", u: "https://antena3-live.secure.footprint.net/master.m3u8", ico: "fa-globe-europe", cat: "españa" },
        { n: "LA SEXTA", u: "https://lasexta-live.secure.footprint.net/master.m3u8", ico: "fa-globe-europe", cat: "españa" },
        { n: "CUATRO", u: "https://cuatro.secure.footprint.net/master.m3u8", ico: "fa-globe-europe", cat: "españa" },
        { n: "TELECINCO", u: "https://t5.secure.footprint.net/master.m3u8", ico: "fa-globe-europe", cat: "españa" },
        { n: "TELEMADRID", u: "https://telemadrid.secure.footprint.net/master.m3u8", ico: "fa-globe-europe", cat: "españa" },
        { n: "CANAL SUR", u: "https://canalsur.secure.footprint.net/master.m3u8", ico: "fa-globe-europe", cat: "españa" },

        // MÚSICA
        { n: "MTV HITS", u: "https://mtv.secure.footprint.net/master.m3u8", ico: "fa-music", cat: "musica" },
        { n: "MTV LIVE HD", u: "https://mtvlive.secure.footprint.net/master.m3u8", ico: "fa-music", cat: "musica" },
        { n: "MTV 00s", u: "https://mtv00s.secure.footprint.net/master.m3u8", ico: "fa-music", cat: "musica" },
        { n: "VH1 CLASSIC", u: "https://vh1.secure.footprint.net/master.m3u8", ico: "fa-music", cat: "musica" },
        { n: "VH1 ADRIATIC", u: "https://vh1a.secure.footprint.net/master.m3u8", ico: "fa-music", cat: "musica" },
        { n: "DELUXE MUSIC", u: "https://deluxemusic.secure.footprint.net/master.m3u8", ico: "fa-headphones", cat: "musica" },
        { n: "BEAT TV", u: "https://beattv.secure.footprint.net/master.m3u8", ico: "fa-compact-disc", cat: "musica" },
        { n: "ROCK ANTENNE", u: "https://rock.secure.footprint.net/master.m3u8", ico: "fa-guitar", cat: "musica" },
        { n: "STINGRAY JAZZ", u: "https://jazz.secure.footprint.net/master.m3u8", ico: "fa-sax-hot", cat: "musica" },
        { n: "TROPICANA TV", u: "https://tropicana.secure.footprint.net/master.m3u8", ico: "fa-drum", cat: "musica" },
        { n: "K-POP TV", u: "https://kpop.secure.footprint.net/master.m3u8", ico: "fa-microphone-alt", cat: "musica" },

        // NIÑOS
        { n: "CARTOON NETWORK", u: "https://cn-live.secure.footprint.net/master.m3u8", ico: "fa-robot", cat: "niños" },
        { n: "NICKELODEON", u: "https://nick-live.secure.footprint.net/master.m3u8", ico: "fa-smile", cat: "niños" },
        { n: "DISNEY CHANNEL", u: "https://disney.secure.footprint.net/master.m3u8", ico: "fa-magic", cat: "niños" },
        { n: "DISNEY JUNIOR", u: "https://djunior.secure.footprint.net/master.m3u8", ico: "fa-baby", cat: "niños" },

        // NOTICIAS
        { n: "CNN EN ESPAÑOL", u: "https://cnn-hls.secure.footprint.net/master.m3u8", ico: "fa-newspaper", cat: "noticias" },
        { n: "DW ESPAÑOL", u: "https://dwstream3-lh.akamaihd.net/i/dwstream3_live@124430/master.m3u8", ico: "fa-broadcast-tower", cat: "noticias" },

        // CINE 24/7
        { n: "GHOST HORROR", u: "https://horror.secure.footprint.net/master.m3u8", ico: "fa-ghost", cat: "cine24" },
        { n: "GHOST ACTION", u: "https://action.secure.footprint.net/master.m3u8", ico: "fa-fire", cat: "cine24" },
        { n: "GHOST COMEDY", u: "https://comedy.secure.footprint.net/master.m3u8", ico: "fa-grin-squint", cat: "cine24" },
        { n: "GHOST MARVEL", u: "https://marvel.secure.footprint.net/master.m3u8", ico: "fa-mask", cat: "cine24" },
        { n: "HBO 24/7", u: "https://hbo.secure.footprint.net/master.m3u8", ico: "fa-film", cat: "cine24" }
    ]
};
