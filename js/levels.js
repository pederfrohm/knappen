/* --- DIFFICULTY SETTINGS --- */
export const TIME_SETTINGS = {
    easy: { default: 6, long: 10, stress: 3, short: 2.5 },
    normal: { default: 5, long: 8, stress: 2, short: 1.5 },
    hard: { default: 4, long: 6, stress: 1.5, short: 1.0 },
    madness: { default: 3, long: 5, stress: 1.0, short: 0.5 }
};

/* --- DATA: LEVELS --- */
export const LEVELS = [
    { lvl: 1, text: "TRYCK", sub: "1 gång", type: "click", target: 1, time: "default", color: "#bb86fc" },
    { lvl: 2, text: "RÖR EJ!", sub: "Vänta...", type: "wait", target: 0, time: "stress", color: "#ff0033", icon: "✋" },
    { lvl: 3, text: "VIKTIGT:", sub: "🐶 = FARA ALLTID. Lita inte på någon.", type: "wait", target: 0, time: "long", color: "#ff9e00", icon: "🐶" },
    { lvl: 4, text: "1 + 1 GÅNGER", sub: "Matte", type: "click", target: 2, time: "default", color: "#00ff41" },
    { lvl: 5, text: "???", sub: "Minns du regeln?", type: "wait", target: 0, time: "stress", color: "#ff0033", icon: "🐶" },
    { lvl: 6, text: "TRYCK PÅ GRÖNT", sub: "Reflex", type: "click", target: 1, time: "stress", color: "#00ff41" },
    { lvl: 7, text: "UPDATE:", sub: "🐶 är säker nu. Klicka.", type: "wait", target: 0, time: "default", color: "#bb86fc", icon: "🐶" },
    { lvl: 8, text: "SIMON SÄGER:", sub: "Tryck 1 gång", type: "click", target: 1, time: "default", color: "#007AFF" },
    { lvl: 9, text: "SIMON SÄGER:", sub: "Tryck 2 gånger", type: "click", target: 2, time: "default", color: "#007AFF" },
    { lvl: 10, text: "TRYCK", sub: "Snabbt!", type: "wait", target: 0, time: "stress", color: "#007AFF" },
    { lvl: 11, text: "HÅLL IN", sub: "Släpp inte!", type: "hold", target: 2000, time: "default", color: "#bb86fc", icon: "⏳" },
    { lvl: 12, text: "NY REGEL:", sub: "RÖTT = GRÖNT. (Minns detta)", type: "wait", target: 0, time: "long", color: "#fff" },
    { lvl: 13, text: "TRYCK PÅ GRÖNT", sub: "Använd nya regeln", type: "click", target: 1, time: "default", color: "#ff0033" },
    { lvl: 14, text: "SPAMMA!!", sub: "15 ggr", type: "click", target: 15, time: "long", color: "#bb86fc", icon: "🔥", effect: "pulse" },
    { lvl: 15, text: "FÅNGA MIG", sub: "Rörlig knapp!", type: "click", target: 1, time: "default", color: "#bb86fc", icon: "👻", effect: "floating" },
    { lvl: 16, text: "GRATTIS!", sub: "Du vann! Klicka för meny.", type: "wait", target: 0, time: "long", color: "#FFD700", icon: "🏆" }
];
