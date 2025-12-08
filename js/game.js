import { sfx } from './audio.js';
import { LEVELS } from './data.js';
import { TIME_SETTINGS } from './config.js';
import { setupAdmin } from './admin.js';

/* --- DEBUGger --- */
function log(msg) {
    const c = document.getElementById('debugConsole');
    if (c) {
        c.innerHTML += `> ${msg}<br>`;
        c.scrollTop = c.scrollHeight;
    }
    console.log(msg);
}

window.onerror = function (msg, url, line) {
    log(`ERROR: ${msg} (${line})`);
    return false;
};

/* --- STATE --- */
let gameState = 'START';
let levelIndex = 0;
let currentTask = {};
let timeLeft = 0;
let timeMax = 0;
let clicksNeeded = 0;
let gameLoop;
let holdStartTime = 0;
let currentDifficulty = 'normal';
let godMode = false;

/* --- UI REFS --- */
const uiLvl = document.getElementById('lvlText');
const uiMain = document.getElementById('mainText');
const uiSub = document.getElementById('subText');
const uiIcon = document.getElementById('iconArea');
const uiBtn = document.getElementById('gameBtn');
const fxLayer = document.getElementById('fxLayer');
const flashOverlay = document.getElementById('flashOverlay');
const ringBg = document.getElementById('ringBg');
const ringFg = document.getElementById('ringFg');

/* --- ADMIN --- */
const adminInterface = setupAdmin({
    onGodMode: (val) => { godMode = val; log('GodMode: ' + val); },
    onSetDifficulty: (diff) => { currentDifficulty = diff; log('Diff: ' + diff); },
    onLoadLevel: (idx) => { levelIndex = idx; loadLevel(); },
    onWin: () => nextLevel()
});

/* --- GAME LOOP --- */
function initGame() {
    log("initGame called");
    try {
        sfx.init();
        log("Audio initialized");
    } catch (e) {
        log("Audio Init Fail: " + e);
    }
    levelIndex = 0;
    gameState = 'PLAYING';
    startGame();
}

function startGame() {
    log("Starting Level " + levelIndex);
    loadLevel();
}

function loadLevel() {
    if (levelIndex >= LEVELS.length) { victory(); return; }

    let data = LEVELS[levelIndex];
    currentTask = data;

    let timeKey = data.time || 'default';
    let actualTime = TIME_SETTINGS[currentDifficulty][timeKey];
    if (typeof data.time === 'number') actualTime = data.time;

    timeMax = actualTime;
    timeLeft = timeMax;
    clicksNeeded = data.target;

    // Reset effects
    uiBtn.className = 'game-btn';
    document.body.classList.remove('mirror-mode');

    if (data.effect) {
        if (data.effect === 'mirror') document.body.classList.add('mirror-mode');
        else uiBtn.classList.add(data.effect);
    }

    uiLvl.innerText = `LVL ${data.lvl}`;
    uiMain.innerText = data.text;
    uiSub.innerText = data.sub;
    uiIcon.innerText = data.icon || "";

    document.documentElement.style.setProperty('--accent-color', data.color);

    clearInterval(gameLoop);
    setupRing(timeMax);
    updateRing(timeMax, timeLeft);

    gameLoop = setInterval(() => {
        timeLeft -= 0.05;
        updateRing(timeMax, timeLeft);

        if (timeLeft > 0.5 && Math.abs(timeLeft % 1) < 0.06) sfx.play('tick');
        if (timeLeft <= 0) { clearInterval(gameLoop); checkTimeout(); }
    }, 50);
}

/* --- INPUT --- */
function inputStart(e) {
    log(`InputStart: ${e.type}`);
    if (gameState !== 'PLAYING') {
        if (gameState === 'START' || gameState === 'GAMEOVER') initGame();
        return;
    }

    if (currentTask.type === 'wait') { failLevel("DU GICK I FÄLLAN!"); return; }
    if (currentTask.type === 'hold') {
        holdStartTime = Date.now();
        uiBtn.classList.add('holding');
        uiSub.innerText = "HÅLL...";
        return;
    }
    if (currentTask.type === 'click') {
        sfx.play('click');
        // Handle coordinates safely
        let clientX = e.clientX;
        let clientY = e.clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }

        spawnParticles(clientX || window.innerWidth / 2,
            clientY || window.innerHeight / 2,
            currentTask.color);

        uiBtn.style.transform = "scale(0.92)";
        setTimeout(() => uiBtn.style.transform = "", 100);
        clicksNeeded--;
        if (clicksNeeded > 0) uiSub.innerText = `${clicksNeeded} kvar`;
        else winLevel();
    }
}

function inputEnd(e) {
    if (gameState !== 'PLAYING') return;
    if (currentTask.type !== 'hold') return;
    uiBtn.classList.remove('holding');
    const holdDuration = Date.now() - holdStartTime;
    if (holdDuration >= currentTask.target) winLevel();
    else failLevel("SLÄPPTE FÖR TIDIGT!");
}

/* --- CORE LOGIC --- */
function winLevel() {
    log("Level Won");
    clearInterval(gameLoop);
    sfx.play('win');
    triggerFlash('green');
    spawnConfetti();
    setTimeout(nextLevel, 250);
}

function failLevel(reason) {
    log("Level Failed: " + reason);
    if (godMode) {
        sfx.play('lose'); triggerFlash('gold');
        uiSub.innerText = "GOD MODE SAVED YOU"; uiSub.style.color = "#FFD700";
        clearInterval(gameLoop); setTimeout(nextLevel, 500); return;
    }
    sfx.play('lose'); triggerFlash('red'); gameOver(reason);
}

function checkTimeout() {
    if (currentTask.type === 'wait') {
        winLevel();
        return;
    }
    // If holding when time runs out, check if we held long enough
    if (currentTask.type === 'hold' && uiBtn.classList.contains('holding')) {
        const holdDuration = Date.now() - holdStartTime;
        if (holdDuration >= currentTask.target) {
            winLevel();
            return;
        }
    }
    failLevel("TIDEN GICK UT!");
}

function nextLevel() { levelIndex++; loadLevel(); }

function gameOver(reason) {
    gameState = 'GAMEOVER';
    clearInterval(gameLoop);
    uiBtn.className = 'game-btn shake';
    uiLvl.innerText = "GAME OVER";
    uiIcon.innerText = "💀";
    uiMain.innerText = `LVL ${levelIndex + 1}`;
    uiSub.innerHTML = `${reason}<br><br><span style="font-size:1.5rem; color:#fff; animation: pulse 1s infinite;">EN GÅNG TILL</span>`;
    document.documentElement.style.setProperty('--accent-color', '#e0e0e0');
}

function victory() {
    gameState = 'VICTORY';
    uiLvl.innerText = "GRATTIS!";
    uiIcon.innerText = "🏆";
    uiMain.innerText = "ALLA KLARADE";
    uiSub.innerText = `Du överlevde.`;
    document.documentElement.style.setProperty('--accent-color', '#FFD700');
    spawnConfetti();
}

/* --- GRAPHICS --- */
/* --- GRAPHICS --- */
let ringParams = { dash: 0, gap: 0, circumference: 0 };

function setupRing(max) {
    const r = 85;
    const c = 2 * Math.PI * r;
    let sliceCount = Math.ceil(max);
    let gapSize = 3;
    if (sliceCount > 10) gapSize = 1.5;
    const dashLength = (c / sliceCount) - gapSize;

    ringParams = { dash: dashLength, gap: gapSize, circumference: c };

    const fullArray = `${dashLength} ${gapSize}`;
    ringBg.style.strokeDasharray = fullArray;
    ringBg.style.strokeDashoffset = 0;

    // Initialize Fg identical to Bg
    ringFg.style.strokeDasharray = fullArray;
    ringFg.style.strokeDashoffset = 0;
}

function updateRing(max, current) {
    if (current < 0) current = 0;

    // Calculate how many slices should be visible
    let count = Math.ceil(current);

    // Construct dasharray: "dash gap dash gap ... 0 fullGap"
    // This ensures only 'count' dashes are drawn
    let arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(`${ringParams.dash} ${ringParams.gap}`);
    }
    // Fill the rest with empty space
    arr.push(`0 ${ringParams.circumference}`);

    ringFg.style.strokeDasharray = arr.join(' ');
    ringFg.style.strokeDashoffset = 0; // Fix offset
}

function triggerFlash(color) {
    let rgba = 'rgba(255,0,0,0.3)';
    if (color === 'green') rgba = 'rgba(0,255,0,0.2)';
    if (color === 'gold') rgba = 'rgba(255, 215, 0, 0.4)';
    flashOverlay.style.background = rgba; flashOverlay.style.opacity = 1;
    setTimeout(() => flashOverlay.style.opacity = 0, 150);
}

function spawnParticles(x, y, color) {
    if (!x) x = window.innerWidth / 2; if (!y) y = window.innerHeight / 2;
    for (let i = 0; i < 8; i++) {
        const p = document.createElement('div'); p.className = 'particle';
        p.style.backgroundColor = color; p.style.left = x + 'px'; p.style.top = y + 'px';
        const angle = Math.random() * Math.PI * 2; const v = Math.random() * 60 + 20;
        const tx = Math.cos(angle) * v; const ty = Math.sin(angle) * v;
        p.style.transition = 'transform 0.5s ease-out, opacity 0.5s';
        fxLayer.appendChild(p);
        requestAnimationFrame(() => { p.style.transform = `translate(${tx}px, ${ty}px) scale(0)`; p.style.opacity = 0; });
        setTimeout(() => p.remove(), 500);
    }
}
function spawnConfetti() { spawnParticles(null, null, '#FFD700'); spawnParticles(null, null, '#ffffff'); }

/* --- LISTENERS --- */
function setupListeners() {
    log("Setting up listeners (Pointer Events)...");

    // Use Pointer Events for broader compatibility
    // pointerdown covers mouse and touch start
    uiBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault(); // Stop mouse emulation
        uiBtn.setPointerCapture(e.pointerId); // Capture tracking
        inputStart(e);
    });

    uiBtn.addEventListener('pointerup', (e) => {
        e.preventDefault();
        uiBtn.releasePointerCapture(e.pointerId);
        inputEnd(e);
    });

    log("Listeners attached.");
}

setupListeners();
