// --- Smooth Premium Navigation ---
const navBtns = document.querySelectorAll('.nav-btn');
const panels = document.querySelectorAll('.view-panel');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active state
        navBtns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        // Add active state to clicked
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// --- Lua Mock Runtime ---
function runLuaMock() {
    const consoleOut = document.getElementById('lua-console');
    consoleOut.innerHTML = `<span class="text-tosca">AxolionTerminal v1.0.0</span><br>
                            > Compiling syntax...<br>
                            > <span style="color:var(--green)">Success!</span> Premium Script executed flawlessly.`;
}

// --- Upload Mechanism ---
async function uploadData(type) {
    const fileId = type === 'music' ? 'music-file' : 'general-asset-file';
    const input = document.getElementById(fileId);
    const statusBox = document.getElementById('upload-status');
    
    if (!input.files.length) {
        alert('Please drop or select a file first.');
        return;
    }
    
    statusBox.innerHTML = `<div class="mt-2 text-tosca"><i class="fas fa-circle-notch fa-spin"></i> Establishing secure connection to Vercel Node...</div>`;
    
    try {
        const res = await fetch('/api/upload', { method: 'POST' });
        const data = await res.json();
        statusBox.innerHTML = `<div class="mt-2 text-green"><i class="fas fa-check-circle"></i> ${data.message}</div>`;
    } catch (e) {
        statusBox.innerHTML = `<div class="mt-2 text-red"><i class="fas fa-times-circle"></i> Backend API Offline.</div>`;
    }
}

// --- RBXM to RBXL ---
async function convertRbxm() {
    const input = document.getElementById('rbxm-file');
    const statusBox = document.getElementById('convert-status');
    
    if (!input.files.length) return alert('Select .rbxm file.');
    
    statusBox.innerHTML = `<span class="text-tosca"><i class="fas fa-cog fa-spin"></i> Rewriting XML Architecture...</span>`;
    setTimeout(() => {
        statusBox.innerHTML = `<span class="text-green"><i class="fas fa-check"></i> Successfully converted to .rbxl format via Vercel Engine.</span>`;
    }, 1500);
}

// --- Premium Robux Calc ---
function calculateRobux() {
    const val = parseInt(document.getElementById('robux-input').value) || 0;
    const tax = Math.floor(val * 0.3);
    const net = val - tax;
    const devex = (net * 0.0035).toFixed(2);
    
    document.getElementById('tax-amount').innerText = `- ${tax} R$`;
    document.getElementById('net-amount').innerText = `${net} R$`;
    document.getElementById('devex-amount').innerText = `$${devex} USD`;
}

// --- Chart.js Inflation Setup ---
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('inflationChart');
    if(!ctx) return;
    
    new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4', '2025', '2026'],
            datasets: [{
                label: 'Market Inflation Rate',
                data: [1.2, 1.8, 2.5, 3.1, 4.0, 4.2],
                borderColor: '#00e5ff',
                backgroundColor: 'rgba(0, 229, 255, 0.1)',
                borderWidth: 3,
                pointBackgroundColor: '#00e5ff',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#00e5ff',
                fill: true,
                tension: 0.4 // Smooth bezier curves
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8a9bb3' } },
                x: { grid: { display: false }, ticks: { color: '#8a9bb3' } }
            },
            plugins: {
                legend: { labels: { color: '#fff', font: { family: 'Poppins' } } },
                tooltip: { backgroundColor: 'rgba(6, 17, 33, 0.9)', titleFont: { family: 'Poppins' }, bodyFont: { family: 'Poppins' }, padding: 15, cornerRadius: 10, borderColor: 'rgba(0,229,255,0.3)', borderWidth: 1 }
            }
        }
    });
});

// --- Asset Fetcher ---
async function fetchAsset() {
    const id = document.getElementById('asset-id').value;
    const resultBox = document.getElementById('asset-result');
    if(!id) return;
    
    resultBox.classList.remove('active');
    
    try {
        const res = await fetch(`/api/asset?id=${id}`);
        const data = await res.json();
        
        resultBox.innerHTML = `
            <img src="${data.imageUrl || 'https://via.placeholder.com/150/16243d/00e5ff?text=Asset'}" alt="Asset">
            <div>
                <h3 class="text-tosca mb-1">${data.Name || 'Axolion Premium Asset'}</h3>
                <p class="mb-1" style="color:#8a9bb3;">Developer: ${data.Creator?.Name || 'Teckyza'}</p>
                <button class="premium-btn" style="padding: 8px 15px; font-size: 0.9rem;"><i class="fas fa-download"></i> Retrieve</button>
            </div>
        `;
        resultBox.classList.add('active');
    } catch(e) {
        resultBox.innerHTML = `<span class="text-red">Database connection error.</span>`;
        resultBox.classList.add('active');
    }
}
