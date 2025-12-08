/* --- DATA: LEVELS --- */
export const LEVELS = [
    { lvl: 1, text: "TRYCK", sub: "1 gång", type: "click", target: 1, time: "default", color: "#bb86fc" },
    { lvl: 2, text: "RÖR EJ!", sub: "Vänta...", type: "wait", target: 0, time: "stress", color: "#ff0033", icon: "✋" },
    { lvl: 3, text: "HUNDEN", sub: "Han är alltid lugn, du behöver aldrig trycka oavsett vad nån annan säger.", type: "wait", target: 0, time: "long", color: "#ff9e00", icon: "🐶" },
    { lvl: 4, text: "1 + 1 GÅNGER", sub: "Matte", type: "click", target: 2, time: "default", color: "#00ff41" },

    /* NEW LEVEL 1 */
    { lvl: 5, text: "TRYCK 0 GÅNGER", sub: "Lurad?", type: "wait", target: 0, time: "stress", color: "#ff0033" },

    { lvl: 6, text: "HUNDEN LJUGEr", sub: "Eller?", type: "wait", target: 0, time: "stress", color: "#ff0033", icon: "🐶" },
    { lvl: 7, text: "TRYCK PÅ GRÖNT", sub: "Reflex", type: "click", target: 1, time: "stress", color: "#00ff41" },
    { lvl: 8, text: "KLAPPA HONOM", sub: "Han är snäll nu.", type: "wait", target: 0, time: "default", color: "#bb86fc", icon: "🐶" },
    { lvl: 9, text: "LÅT INTE BLI ATT INTE TRYCKA", sub: "Eller?", type: "wait", target: 0, time: "stress", color: "#007AFF" },
    { lvl: 10, text: "HÅLL IN", sub: "Släpp inte!", type: "hold", target: 2000, time: "default", color: "#bb86fc", icon: "⏳" },
    { lvl: 11, text: "NY REGEL:", sub: "RÖTT = GRÖNT. (Minns detta)", type: "wait", target: 0, time: "long", color: "#fff" },
    { lvl: 12, text: "TRYCK PÅ GRÖNT", sub: "Använd nya regeln", type: "click", target: 1, time: "default", color: "#ff0033" },
    { lvl: 13, text: "SPAMMA!!", sub: "15 ggr", type: "click", target: 15, time: "long", color: "#bb86fc", icon: "🔥", effect: "pulse" },
    { lvl: 14, text: "FÅNGA MIG", sub: "Rörlig knapp!", type: "click", target: 1, time: "default", color: "#bb86fc", icon: "👻", effect: "floating" },
    { lvl: 15, text: "TRYCK 5 GGR", sub: "Snabbare!", type: "click", target: 5, time: "stress", color: "#bb86fc" },
    { lvl: 16, text: "MINNS:", sub: "Rör ej kaktusen", type: "wait", target: 0, time: "default", color: "#ff9e00", icon: "🌵" },
    { lvl: 17, text: "VÄNTA PÅ 0...", sub: "Tryck 1 gång", type: "click", target: 1, time: "default", color: "#bb86fc" },

    /* NEW LEVEL 2 */
    { lvl: 18, text: "TRYCK… MEN INTE NU", sub: "Vänta...", type: "click", target: 1, time: "default", color: "#bb86fc" },

    { lvl: 19, text: "2 x 3 - 2 GGR", sub: "Matte", type: "click", target: 4, time: "default", color: "#00ff41" },
    { lvl: 20, text: "TRYCK EJ PÅ RÖTT", sub: "Kolla färgen!", type: "click", target: 1, time: "stress", color: "#007AFF" },

    /* NEW LEVEL 8 */
    { lvl: 21, text: "MINNS: 💀 = FARA", sub: "Minns detta.", type: "wait", target: 0, time: "long", color: "#ff9e00", icon: "💀" },

    /* NEW LEVEL 9 */
    { lvl: 22, text: "💀???", sub: "Vad var regeln?", type: "wait", target: 0, time: "stress", color: "#ff0033", icon: "💀" },

    { lvl: 23, text: "TRYCK 🌵 GÅNGER", sub: "Kaktus är säker", type: "click", target: 1, time: "stress", color: "#00ff41", icon: "🌵" },
    { lvl: 24, text: "HÅLL INTE IN", sub: "Klicka bara", type: "click", target: 1, time: "stress", color: "#ff0033" },

    /* NEW LEVEL 4 */
    { lvl: 25, text: "HÅLL — SLÄPP VID 1", sub: "Tajming", type: "hold", target: 1000, time: "default", color: "#bb86fc" },

    { lvl: 26, text: "2+2-1+3", sub: "Stress", type: "click", target: 6, time: 8, color: "#00ff41" },
    { lvl: 27, text: "SÄG DITT NAMN", sub: "Och tryck...", type: "click", target: 1, time: "stress", color: "#bb86fc", icon: "😵‍💫" },

    /* NEW LEVEL 10 */
    { lvl: 28, text: "RÖR EJ (OM DET ÄR TISDAG)", sub: "Kolla kalendern", type: "wait", target: 0, time: "stress", color: "#bb86fc" },

    { lvl: 29, text: "SPAMMA TILL 5", sub: "Inte mer!", type: "click", target: 5, time: "default", color: "#bb86fc" },

    /* NEW LEVEL 5 */
    { lvl: 30, text: "VARNING: SPEGLAT LÄGE", sub: "Upp och ner?", type: "click", target: 1, time: "default", color: "#ff0033", effect: "mirror" },

    /* NEW LEVEL 6 */
    { lvl: 31, text: "TRYCK I RÄTTA VÄRLDEN", sub: "Inget spegelvänt", type: "click", target: 1, time: "stress", color: "#00ff41" },

    { lvl: 32, text: "TRYCK INTE", sub: "Lita på mig", type: "wait", target: 0, time: "stress", color: "#00ff41", icon: "🤥" },
    { lvl: 33, text: "TRYCK INOM 0.5s", sub: "Reflex!", type: "click", target: 1, time: 0.8, color: "#ff0033", icon: "⚡" },
    { lvl: 34, text: "MJAU?", sub: "Vänta...", type: "wait", target: 0, time: "stress", color: "#bb86fc", icon: "🐱" },
    { lvl: 35, text: "SIMON SÄGER:", sub: "Tryck 1 gång", type: "click", target: 1, time: "default", color: "#007AFF" },
    { lvl: 36, text: "SIMON SÄGER:", sub: "Tryck 2 gånger", type: "click", target: 2, time: "default", color: "#007AFF" },

    /* NEW LEVEL 7 */
    { lvl: 37, text: "😐", sub: "...", type: "wait", target: 0, time: "default", color: "#888", icon: "😐" },

    /* NEW LEVEL 11 */
    { lvl: 38, text: "SYSTEMFEL…", sub: "Startar om...", type: "wait", target: 0, time: "long", color: "#000", icon: "⚠️" },

    { lvl: 39, text: "GRATTIS!", sub: "Klicka om du tror att du kommer få ett pris", type: "wait", target: 0, time: "long", color: "#FFD700", icon: "🏆" },

    /* NEW LEVEL 12 */
    { lvl: 40, text: "FÖRSÖK IGEN", sub: "Du var så nära", type: "click", target: 1, time: "stress", color: "#bb86fc" },

    /* MOVED FROM 26 */
    { lvl: 41, text: "TRYCK EFTER PIP", sub: "Lyssna noga", type: "click", target: 1, time: "default", color: "#00ff41", icon: "🔊" }
];
