document.querySelectorAll('.input-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('input');
        const visible = input.type === 'password';
        input.type = visible ? 'text' : 'password';
        btn.classList.toggle('is-visible', visible);
        btn.setAttribute('aria-label', visible ? 'Ocultar contraseña' : 'Mostrar contraseña');
    });
});

function showCard(id) {
    document.querySelectorAll('.auth-container .card').forEach(card => {
        card.hidden = card.id !== id;
    });
}

document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-goto]');
    if (!trigger) return;
    e.preventDefault();
    showCard(trigger.dataset.goto);
});

// Llevar a la página principal                

function showScreen(id) {
    document.getElementById('authScreen').hidden = id !== 'authScreen';
    document.getElementById('mainScreen').hidden = id !== 'mainScreen';
}

document.getElementById('login').addEventListener('submit', (e) => {
    e.preventDefault();          // evita que el form recargue la página
    showScreen('mainScreen');
});


//sidebar

/* ---------- Sidebar: contraer / expandir ---------- */
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle-btn');

sidebarToggle.addEventListener('click', () => {
    const collapsed = sidebar.classList.toggle('collapsed');
    sidebarToggle.setAttribute('aria-expanded', String(!collapsed));
    sidebarToggle.setAttribute('aria-label', collapsed ? 'Expandir menú' : 'Contraer menú');
});

/* ---------- Sidebar: opción activa y título de la vista ---------- */
const navButtons = document.querySelectorAll('.sidebar-nav button[data-view]');
const topbarTitle = document.querySelector('.topbar-title');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        topbarTitle.textContent = btn.dataset.title;
    });
});

/* ---------- Cerrar sesión ---------- */
document.querySelector('[data-action="logout"]').addEventListener('click', () => {
    document.getElementById('login').reset();   // limpia correo y contraseña
    showCard('loginCard');                      // asegura que se vea el login, no una card de recuperación
    showScreen('authScreen');
});