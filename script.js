// --- DADOS (Simulando uma API de Futebol) ---
const brasileiraoData = [
    { pos: 1, name: "Flamengo", p: 28, j: 12, v: 9, sg: 15, pct: 77 },
    { pos: 2, name: "Palmeiras", p: 26, j: 12, v: 8, sg: 12, pct: 72 },
    { pos: 3, name: "Botafogo", p: 25, j: 12, v: 8, sg: 10, pct: 69 },
    { pos: 4, name: "São Paulo", p: 23, j: 12, v: 7, sg: 8, pct: 63 },
    { pos: 5, name: "Atlético-MG", p: 21, j: 12, v: 6, sg: 5, pct: 58 },
    { pos: 17, name: "Criciúma", p: 10, j: 12, v: 2, sg: -8, pct: 27 },
    { pos: 18, name: "Atlético-GO", p: 9, j: 12, v: 2, sg: -10, pct: 25 },
];

const libertadoresData = [
    { pos: 1, name: "Flamengo", p: 13, j: 5, sg: 8 },
    { pos: 2, name: "River Plate", p: 10, j: 5, sg: 4 },
    { pos: 3, name: "Millonarios", p: 6, j: 5, sg: -2 },
    { pos: 4, name: "Deportivo Táchira", p: 1, j: 5, sg: -10 },
];

const copaGroupsData = [
    { group: "A", teams: "🇧🇷 Brasil, 🇷🇸 Sérvia, 🇨🇲 Camarões, 🇦🇱 Albânia" },
    { group: "B", teams: "🇦🇷 Argentina, 🇵🇹 Portugal, 🇯🇵 Japão, 🇦🇴 Angola" },
    { group: "C", teams: "🇫🇷 França, 🇺🇸 EUA, 🇲🇽 México, 🇦🇺 Austrália" },
    { group: "D", teams: "🇪🇸 Espanha, 🇩🇪 Alemanha, 🇨🇦 Canadá, 🇳🇿 Nova Zelândia" }
];

const myTeamData = [
    { name: "Alisson", team: "Liverpool", pos: "GOL", rating: 7.8, pts: 8.2, statVal: 4, statLabel: "Defesas" },
    { name: "Vini Jr.", team: "Real Madrid", pos: "ATA", rating: 8.5, pts: 12.5, statVal: 1, statLabel: "Gols" },
    { name: "Endrick", team: "Real Madrid", pos: "ATA", rating: 7.9, pts: 9.0, statVal: 1, statLabel: "Gols" },
    { name: "Fabrício Bruno", team: "Flamengo", pos: "ZAG", rating: 7.2, pts: 6.5, statVal: 5, statLabel: "Cortes" }
];

// --- FUNÇÕES DE RENDERIZAÇÃO (JS Puro) ---

function renderTable(data, elementId, isLibertadores = false) {
    const tbody = document.getElementById(elementId);
    tbody.innerHTML = ''; // Limpa antes de renderizar

    data.forEach(team => {
        let posClass = '';
        if (team.pos <= 4) posClass = 'libertadores';
        if (team.pos >= 17) posClass = 'rebaixamento';

        const row = `
            <tr>
                <td class="pos ${posClass}">${team.pos}</td>
                <td>
                    <div class="team-cell">
                        <div class="team-logo">${team.name.substring(0,2).toUpperCase()}</div>
                        ${team.name}
                    </div>
                </td>
                <td class="hide-mobile"><strong>${team.p}</strong></td>
                <td class="hide-mobile">${team.j}</td>
                ${!isLibertadores ? `<td class="hide-mobile">${team.v}</td>` : ''}
                <td class="hide-mobile">${team.sg}</td>
                ${!isLibertadores ? `<td>${team.pct}%</td>` : ''}
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function renderCopaGroups() {
    const container = document.getElementById('copa-groups');
    container.innerHTML = '';
    copaGroupsData.forEach(g => {
        container.innerHTML += `
            <div class="card">
                <h3 style="color: var(--primary); margin-bottom: 10px; font-size: 1.1rem;">Grupo ${g.group}</h3>
                <p style="color: var(--text-muted); line-height: 1.8; font-size: 0.95rem;">${g.teams}</p>
            </div>
        `;
    });
}

function renderMyTeam() {
    const container = document.getElementById('my-team');
    container.innerHTML = '';
    myTeamData.forEach(player => {
        container.innerHTML += `
            <div class="card player-card">
                <div class="player-rating">${player.rating}</div>
                <div class="player-pos">${player.pos}</div>
                <div class="player-name">${player.name}</div>
                <div class="player-team"><i class="fas fa-shield-alt"></i> ${player.team}</div>
                <div class="player-stats">
                    <div class="stat">
                        <div class="stat-val">${player.pts}</div>
                        <div class="stat-label">Pontos</div>
                    </div>
                    <div class="stat">
                        <div class="stat-val">${player.statVal}</div>
                        <div class="stat-label">${player.statLabel}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-val" style="color: var(--accent);">€ ${(Math.random() * 10 + 2).toFixed(1)}M</div>
                        <div class="stat-label">Valor</div>
                    </div>
                </div>
            </div>
        `;
    });
}

// --- LÓGICA DE NAVEGAÇÃO (TABS) ---
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe 'active' de todos os botões e seções
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

        // Adiciona 'active' no botão clicado e na seção correspondente
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// --- INICIALIZAÇÃO DO SITE ---
window.addEventListener('DOMContentLoaded', () => {
    renderTable(brasileiraoData, 'brasileirao-body');
    renderTable(libertadoresData, 'libertadores-body', true);
    renderCopaGroups();
    renderMyTeam();
});
