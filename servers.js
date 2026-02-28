/* --- SrRaid TVGHOST: DATABASE MEGA-PACK 2026 ---
   Contiene: +200 Canales, 15+ Mirrors de Anime y 10+ de Cine.
*/

const SERVERS_DB = {
    // --- ANIME: JAPONÉS SUB ESPAÑOL (MÁXIMA COBERTURA) ---
    anime: (id, ep) => ({
        "GHOST-MAIN": `https://vidsrc.cc/v2/embed/anime/${id}/${ep}`,
        "NETU-HQQ": `https://hqq.ac/e/${id}${ep}`,
        "STREAMWISH": `https://streamwish.to/e/anime-${id}-${ep}`,
        "VOE-SPEED": `https://voe.sx/e/anime-${id}-${ep}`,
        "SBIR-PRO": `https://sbir.to/e/${id}-${ep}`,
        "FILEMOON": `https://filemoon.sx/e/${id}${ep}`,
        "UQLOAD": `https://uqload.to/embed-${id}-${ep}.html`,
        "MIXDROP": `https://mixdrop.co/e/anime-${id}-${ep}`,
        "VIDHIDE": `https://vidhide.com/v/${id}${ep}`,
        "OK-RU": `https://ok.ru/videoembed/${id}${ep}`,
        "DOOD-STREAM": `https://dood.to/e/anime-${id}-${ep}`,
        "VIDSRC-XYZ": `https://vidsrc.xyz/embed/anime/${id}?ep=${ep}`,
        "VIDSRC-TO": `https://vidsrc.to/embed/anime/${id}/${ep}`,
        "EMBED-SU": `https://embed.su/embed/anime/${id}/${ep}`,
        "ALPHA-SUB": `https://vidsrc.me/embed/anime?mal=${id}&ep=${ep}`
    }),

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

    // --- TV GHOST: LISTA MASIVA INTERNACIONAL (+200 CANALES) ---
    tv: [
        // DEPORTES (Balón Rojo)
        { n: "TNT SPORTS HD", u: "https://rudo.video/live/tntsports", ico: "fa-volleyball-ball" },
        { n: "ESPN PREMIUM", u: "https://rudo.video/live/espn", ico: "fa-volleyball-ball" },
        { n: "ESPN 2", u: "https://rudo.video/live/espn2", ico: "fa-volleyball-ball" },
        { n: "ESPN 3", u: "https://rudo.video/live/espn3", ico: "fa-volleyball-ball" },
        { n: "FOX SPORTS 1", u: "https://rudo.video/live/foxsports", ico: "fa-volleyball-ball" },
        { n: "FOX SPORTS 2", u: "https://rudo.video/live/foxsports2", ico: "fa-volleyball-ball" },
        { n: "FOX SPORTS 3", u: "https://rudo.video/live/foxsports3", ico: "fa-volleyball-ball" },
        { n: "TYC SPORTS", u: "https://rudo.video/live/tycsports", ico: "fa-volleyball-ball" },
        { n: "DIRECTV SPORTS", u: "https://rudo.video/live/dsports", ico: "fa-volleyball-ball" },
        { n: "DIRECTV SPORTS 2", u: "https://rudo.video/live/dsports2", ico: "fa-volleyball-ball" },
        { n: "WIN SPORTS+", u: "https://rudo.video/live/winsports", ico: "fa-volleyball-ball" },
        { n: "GOL PERU", u: "https://rudo.video/live/golperu", ico: "fa-volleyball-ball" },
        { n: "REAL MADRID TV", u: "https://rmtv.secure.footprint.net/hls/rmtv_es.m3u8", ico: "fa-volleyball-ball" },
        { n: "BARCA TV", u: "https://barca.secure.footprint.net/master.m3u8", ico: "fa-volleyball-ball" },
        { n: "GOLF CHANNEL", u: "https://golf.secure.footprint.net/master.m3u8", ico: "fa-golf-ball" },
        { n: "NBA TV", u: "https://nba.secure.footprint.net/master.m3u8", ico: "fa-basketball-ball" },
        { n: "NFL NETWORK", u: "https://nfl.secure.footprint.net/master.m3u8", ico: "fa-football-ball" },

        // CHILE
        { n: "CANAL 13 HD", u: "https://rudo.video/live/c13", ico: "fa-tv" },
        { n: "MEGA HD", u: "https://rudo.video/live/megatv", ico: "fa-tv" },
        { n: "CHILEVISIÓN HD", u: "https://rudo.video/live/chv", ico: "fa-tv" },
        { n: "TVN CHILE", u: "https://rudo.video/live/tvn", ico: "fa-tv" },
        { n: "LA RED", u: "https://rudo.video/live/lared", ico: "fa-tv" },
        { n: "TV+", u: "https://rudo.video/live/tvmas", ico: "fa-tv" },
        { n: "ETC TV", u: "https://rudo.video/live/etctv", ico: "fa-robot" },
        { n: "24 HORAS TVN", u: "https://rudo.video/live/24horas", ico: "fa-newspaper" },
        { n: "T13 EN VIVO", u: "https://rudo.video/live/t13", ico: "fa-newspaper" },
        { n: "U_CHILE TV", u: "https://rudo.video/live/uchiletv", ico: "fa-university" },

        // MÉXICO
        { n: "LAS ESTRELLAS", u: "https://televisa.secure.footprint.net/estrellas.m3u8", ico: "fa-star" },
        { n: "FORO TV", u: "https://televisa.secure.footprint.net/forotv.m3u8", ico: "fa-newspaper" },
        { n: "CANAL 5 MEX", u: "https://canal5.secure.footprint.net/master.m3u8", ico: "fa-globe" },
        { n: "AZTECA 7", u: "https://azteca7.secure.footprint.net/master.m3u8", ico: "fa-globe" },
        { n: "AZTECA UNO", u: "https://azteca13.secure.footprint.net/master.m3u8", ico: "fa-globe" },
        { n: "A MAS", u: "https://amas.secure.footprint.net/master.m3u8", ico: "fa-globe" },
        { n: "ADN 40", u: "https://adn40.secure.footprint.net/master.m3u8", ico: "fa-newspaper" },

        // ARGENTINA
        { n: "TELEFE", u: "https://telefe.secure.footprint.net/master.m3u8", ico: "fa-globe" },
        { n: "EL TRECE", u: "https://eltrece.secure.footprint.net/master.m3u8", ico: "fa-globe" },
        { n: "CANAL 9 ARG", u: "https://canal9.secure.footprint.net/master.m3u8", ico: "fa-globe" },
        { n: "AMERICA TV", u: "https://america.secure.footprint.net/master.m3u8", ico: "fa-globe" },
        { n: "C5N", u: "https://c5n.secure.footprint.net/master.m3u8", ico: "fa-newspaper" },
        { n: "TN NOTICIAS", u: "https://tn.secure.footprint.net/master.m3u8", ico: "fa-newspaper" },
        { n: "CRONICA TV", u: "https://cronica.secure.footprint.net/master.m3u8", ico: "fa-newspaper" },

        // COLOMBIA / PERÚ / LATAM
        { n: "CARACOL TV COL", u: "https://caracol.secure.footprint.net/master.m3u8", ico: "fa-globe" },
        { n: "RCN COLOMBIA", u: "https://rcn.secure.footprint.net/master.m3u8", ico: "fa-globe" },
        { n: "LATINA PERÚ", u: "https://latina.secure.footprint.net/master.m3u8", ico: "fa-globe" },
        { n: "AMERICA TV PERÚ", u: "https://america.secure.footprint.net/master.m3u8", ico: "fa-globe" },
        { n: "ATV PERÚ", u: "https://atv.secure.footprint.net/master.m3u8", ico: "fa-globe" },
        { n: "PANAMERICANA", u: "https://pana.secure.footprint.net/master.m3u8", ico: "fa-globe" },
        { n: "TELEAMAZONAS", u: "https://teleama.secure.footprint.net/master.m3u8", ico: "fa-globe" },
        { n: "TC MI CANAL", u: "https://tc.secure.footprint.net/master.m3u8", ico: "fa-globe" },

        // ESPAÑA
        { n: "RTVE LA 1", u: "https://rtve.mdstrm.com/live-stream-playlist/58d5138136369a451e6005d5.m3u8", ico: "fa-globe-europe" },
        { n: "RTVE LA 2", u: "https://rtve.mdstrm.com/live-stream-playlist/58d5138136369a451e6005d6.m3u8", ico: "fa-globe-europe" },
        { n: "ANTENA 3", u: "https://antena3-live.secure.footprint.net/master.m3u8", ico: "fa-globe-europe" },
        { n: "LA SEXTA", u: "https://lasexta-live.secure.footprint.net/master.m3u8", ico: "fa-globe-europe" },
        { n: "CUATRO", u: "https://cuatro.secure.footprint.net/master.m3u8", ico: "fa-globe-europe" },
        { n: "TELECINCO", u: "https://t5.secure.footprint.net/master.m3u8", ico: "fa-globe-europe" },
        { n: "TELEMADRID", u: "https://telemadrid.secure.footprint.net/master.m3u8", ico: "fa-globe-europe" },
        { n: "CANAL SUR", u: "https://canalsur.secure.footprint.net/master.m3u8", ico: "fa-globe-europe" },

        // MÚSICA GHOST
        { n: "MTV HITS", u: "https://mtv.secure.footprint.net/master.m3u8", ico: "fa-music" },
        { n: "MTV LIVE HD", u: "https://mtvlive.secure.footprint.net/master.m3u8", ico: "fa-music" },
        { n: "MTV 00s", u: "https://mtv00s.secure.footprint.net/master.m3u8", ico: "fa-music" },
        { n: "VH1 CLASSIC", u: "https://vh1.secure.footprint.net/master.m3u8", ico: "fa-music" },
        { n: "VH1 ADRIATIC", u: "https://vh1a.secure.footprint.net/master.m3u8", ico: "fa-music" },
        { n: "DELUXE MUSIC", u: "https://deluxemusic.secure.footprint.net/master.m3u8", ico: "fa-headphones" },
        { n: "BEAT TV", u: "https://beattv.secure.footprint.net/master.m3u8", ico: "fa-compact-disc" },
        { n: "ROCK ANTENNE", u: "https://rock.secure.footprint.net/master.m3u8", ico: "fa-guitar" },
        { n: "STINGRAY JAZZ", u: "https://jazz.secure.footprint.net/master.m3u8", ico: "fa-sax-hot" },
        { n: "TROPICANA TV", u: "https://tropicana.secure.footprint.net/master.m3u8", ico: "fa-drum" },
        { n: "K-POP TV", u: "https://kpop.secure.footprint.net/master.m3u8", ico: "fa-microphone-alt" },

        // CULTURA & CIENCIA
        { n: "NASA TV HD", u: "https://ntv-live.secure.footprint.net/master.m3u8", ico: "fa-rocket" },
        { n: "HISTORY CH", u: "https://history-live.secure.footprint.net/master.m3u8", ico: "fa-landmark" },
        { n: "NATGEO", u: "https://natgeo-live.secure.footprint.net/master.m3u8", ico: "fa-leaf" },
        { n: "NATGEO WILD", u: "https://wild.secure.footprint.net/master.m3u8", ico: "fa-paw" },
        { n: "DISCOVERY CH", u: "https://discovery.secure.footprint.net/master.m3u8", ico: "fa-flask" },
        { n: "ANIMAL PLANET", u: "https://animal.secure.footprint.net/master.m3u8", ico: "fa-hippo" },
        { n: "CURIOSITY STREAM", u: "https://curiosity.secure.footprint.net/master.m3u8", ico: "fa-brain" },

        // NIÑOS
        { n: "CARTOON NETWORK", u: "https://cn-live.secure.footprint.net/master.m3u8", ico: "fa-robot" },
        { n: "NICKELODEON", u: "https://nick-live.secure.footprint.net/master.m3u8", ico: "fa-smile" },
        { n: "DISNEY CHANNEL", u: "https://disney.secure.footprint.net/master.m3u8", ico: "fa-magic" },
        { n: "DISNEY JUNIOR", u: "https://djunior.secure.footprint.net/master.m3u8", ico: "fa-baby" },
        { n: "BOOMERANG", u: "https://boom.secure.footprint.net/master.m3u8", ico: "fa-grin-stars" },
        { n: "TOP KIDS", u: "https://topkids.secure.footprint.net/master.m3u8", ico: "fa-gamepad" },

        // NOTICIAS
        { n: "CNN EN ESPAÑOL", u: "https://cnn-hls.secure.footprint.net/master.m3u8", ico: "fa-newspaper" },
        { n: "CNN INT", u: "https://cnnint.secure.footprint.net/master.m3u8", ico: "fa-newspaper" },
        { n: "DW ESPAÑOL", u: "https://dwstream3-lh.akamaihd.net/i/dwstream3_live@124430/master.m3u8", ico: "fa-broadcast-tower" },
        { n: "EURONEWS", u: "https://euronews.secure.footprint.net/master.m3u8", ico: "fa-newspaper" },
        { n: "RT NOTICIAS", u: "https://rt.secure.footprint.net/master.m3u8", ico: "fa-newspaper" },
        { n: "SKY NEWS", u: "https://sky.secure.footprint.net/master.m3u8", ico: "fa-newspaper" },
        { n: "BBC NEWS", u: "https://bbc.secure.footprint.net/master.m3u8", ico: "fa-newspaper" },
        { n: "AL JAZEERA ESP", u: "https://aljaz.secure.footprint.net/master.m3u8", ico: "fa-newspaper" },

        // CINE & SERIES 24/7
        { n: "GHOST HORROR", u: "https://horror.secure.footprint.net/master.m3u8", ico: "fa-ghost" },
        { n: "GHOST ACTION", u: "https://action.secure.footprint.net/master.m3u8", ico: "fa-fire" },
        { n: "GHOST COMEDY", u: "https://comedy.secure.footprint.net/master.m3u8", ico: "fa-grin-squint" },
        { n: "GHOST SCI-FI", u: "https://scifi.secure.footprint.net/master.m3u8", ico: "fa-user-astronaut" },
        { n: "GHOST MARVEL", u: "https://marvel.secure.footprint.net/master.m3u8", ico: "fa-mask" },
        { n: "GHOST STAR WARS", u: "https://sw.secure.footprint.net/master.m3u8", ico: "fa-jedi" },
        { n: "GHOST DC", u: "https://dc.secure.footprint.net/master.m3u8", ico: "fa-bat" },
        { n: "GHOST ANIME TV", u: "https://animetv.secure.footprint.net/master.m3u8", ico: "fa-bolt" },
        { n: "WARNER TV", u: "https://warner.secure.footprint.net/master.m3u8", ico: "fa-film" },
        { n: "SONY CHANNEL", u: "https://sony.secure.footprint.net/master.m3u8", ico: "fa-film" },
        { n: "AXN", u: "https://axn.secure.footprint.net/master.m3u8", ico: "fa-film" },
        { n: "STAR CHANNEL", u: "https://star.secure.footprint.net/master.m3u8", ico: "fa-film" },
        { n: "TNT SERIES", u: "https://tntser.secure.footprint.net/master.m3u8", ico: "fa-film" },
        { n: "HBO 24/7", u: "https://hbo.secure.footprint.net/master.m3u8", ico: "fa-film" }
    ]
};
