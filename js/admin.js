import { LEVELS } from './levels.js';
import { sfx } from './audio.js';

export function setupAdmin(callbacks) {
    const panel = document.getElementById('adminPanel');
    const toggleBtn = document.querySelector('.admin-toggle');
    const closeBtn = panel.querySelector('.config-btn');
    const godModeCheck = document.getElementById('godModeCheck');
    const diffButtons = ['Easy', 'Normal', 'Hard', 'Mad'].map(d => panel.querySelector(`#diff${d === 'Madness' ? 'Mad' : d}`));

    // Toggle
    const toggle = () => panel.classList.toggle('open');
    toggleBtn.addEventListener('click', () => {
        toggle();
        renderLevelList();
    });
    closeBtn.addEventListener('click', toggle);

    // God Mode
    godModeCheck.addEventListener('change', (e) => {
        callbacks.onGodMode(e.target.checked);
    });

    // Difficulty
    panel.querySelectorAll('.config-btn[id^="diff"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const diff = btn.id.replace('diff', '').toLowerCase().replace('mad', 'madness');
            callbacks.onSetDifficulty(diff);

            // UI Update
            panel.querySelectorAll('.config-btn[id^="diff"]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Tools
    panel.querySelector('button[onclick*="sfx"]').removeAttribute('onclick');
    panel.querySelector('button[onclick*="sfx"]').addEventListener('click', () => sfx.play('click'));

    panel.querySelector('button[onclick*="nextLevel"]').removeAttribute('onclick');
    panel.querySelector('button[onclick*="nextLevel"]').addEventListener('click', () => callbacks.onWin());

    function renderLevelList() {
        const list = document.getElementById('levelListUI');
        list.innerHTML = '';
        LEVELS.forEach((l, i) => {
            const div = document.createElement('div'); div.className = 'lvl-item';
            div.innerHTML = `<span>#${l.lvl} ${l.text}</span> <span style="font-size:0.6rem; opacity:0.5">${l.type}</span>`;
            div.onclick = () => {
                callbacks.onLoadLevel(i);
                toggle();
            };
            list.appendChild(div);
        });
    }

    // Return an interface to update standard UI if needed, though we handled classes manually inside
    return {
        updateDiffUI: (currentDifficulty) => {
            // Already handled by click, but good for atomic sync
            panel.querySelectorAll('.config-btn[id^="diff"]').forEach(b => b.classList.remove('active'));
            let prefix = 'diff' + currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1);
            if (currentDifficulty === 'madness') prefix = 'diffMad';
            const b = document.getElementById(prefix);
            if (b) b.classList.add('active');
        }
    };
}
