import { LEVELS } from './data.js';
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
    const btnSound = document.getElementById('btnSoundTest');
    if (btnSound) btnSound.addEventListener('click', () => sfx.play('click'));

    const btnWin = document.getElementById('btnWinLevel');
    if (btnWin) btnWin.addEventListener('click', () => callbacks.onWin());

    /* --- THEME EDITOR --- */
    const inputs = {
        font: document.getElementById('themeFont'),
        radius: document.getElementById('themeRadius'),
        glow: document.getElementById('themeGlow'),
        color: document.getElementById('themeColor'),
        export: document.getElementById('btnExportTheme')
    };

    function updateTheme() {
        if (!inputs.font) return;
        const root = document.documentElement;

        // Font
        root.style.setProperty('--font-stack', inputs.font.value);

        // Radius
        root.style.setProperty('--radius', inputs.radius.value + '%');

        // Glow (Shadow)
        const g = inputs.glow.value;
        root.style.setProperty('--btn-shadow', `0 4px ${g}px ${inputs.color.value}`);

        // Color override
        root.style.setProperty('--accent-color', inputs.color.value);
    }

    if (inputs.font) {
        inputs.font.addEventListener('change', updateTheme);
        inputs.radius.addEventListener('input', updateTheme);
        inputs.glow.addEventListener('input', updateTheme);
        inputs.color.addEventListener('input', updateTheme);

        inputs.export.addEventListener('click', () => {
            const config = {
                font: inputs.font.value,
                radius: inputs.radius.value + '%',
                glow: inputs.glow.value,
                color: inputs.color.value
            };
            const json = JSON.stringify(config, null, 2);
            console.log("THEME JSON:", json);

            // Try copy to clipboard
            navigator.clipboard.writeText(json).then(() => {
                alert("Theme JSON copied to clipboard!");
            }).catch(e => {
                prompt("Copy this JSON:", json);
            });
        });
    }

    /* --- LEVEL BROWSER / TABLE --- */

    // Helper to render TABLE
    function renderLevelTable() {
        let html = '<table style="width:100%; border-collapse:collapse; font-size:10px; color:#aaa;">';
        html += '<thead><tr style="border-bottom:1px solid #555; text-align:left;"><th>#</th><th>Text</th><th>Type</th><th>Time</th></tr></thead><tbody>';
        LEVELS.forEach(l => {
            html += `<tr style="border-bottom:1px solid #333;"><td>${l.lvl}</td><td>${l.text}</td><td>${l.type}</td><td>${l.time}</td></tr>`;
        });
        html += '</tbody></table>';
        html += '<button id="copyTableBtn" class="config-btn" style="width:100%; margin-top:5px;">Copy HTML Table</button>';
        return html;
    }

    // LIST RENDER
    function renderLevelList(mode = 'list') {
        const list = document.getElementById('levelListUI');
        list.innerHTML = '';

        // Header Controls
        const hDiv = document.createElement('div');
        hDiv.style.display = 'flex'; hDiv.style.justifyContent = 'space-between'; hDiv.style.marginBottom = '5px';
        hDiv.innerHTML = `
            <button class="config-btn" id="viewList" ${mode === 'list' ? 'disabled' : ''}>List</button>
            <button class="config-btn" id="viewTable" ${mode === 'table' ? 'disabled' : ''}>Table</button>
        `;
        list.appendChild(hDiv);

        // Listeners for toggle
        list.querySelector('#viewList').onclick = () => renderLevelList('list');
        list.querySelector('#viewTable').onclick = () => renderLevelList('table');

        if (mode === 'table') {
            const tableDiv = document.createElement('div');
            tableDiv.innerHTML = renderLevelTable();
            list.appendChild(tableDiv);

            // Allow copy
            const copyBtn = tableDiv.querySelector('#copyTableBtn');
            if (copyBtn) copyBtn.onclick = () => {
                const tbl = tableDiv.querySelector('table').outerHTML;
                navigator.clipboard.writeText(tbl).then(() => alert("Table HTML copied!"));
            };
            return;
        }

        // List Mode
        const container = document.createElement('div');
        LEVELS.forEach((l, i) => {
            const div = document.createElement('div'); div.className = 'lvl-item';
            div.innerHTML = `<span>#${l.lvl} ${l.text}</span> <span style="font-size:0.6rem; opacity:0.5">${l.type}</span>`;
            div.onclick = () => {
                callbacks.onLoadLevel(i);
                toggle();
            };
            container.appendChild(div);
        });
        list.appendChild(container);
    }

    return {
        updateDiffUI: (currentDifficulty) => {
            panel.querySelectorAll('.config-btn[id^="diff"]').forEach(b => b.classList.remove('active'));
            let prefix = 'diff' + currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1);
            if (currentDifficulty === 'madness') prefix = 'diffMad';
            const b = document.getElementById(prefix);
            if (b) b.classList.add('active');
        }
    };
}
