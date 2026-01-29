document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// Gestion burger
function initMenuBurger() {
    const burgerMenu = document.getElementById('burgerMenu');
    const navMenu = document.querySelector('.nav');  // Ton menu ?
    
    if (!burgerMenu || !navMenu) return;

    burgerMenu.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        burgerMenu.classList.toggle('active');       // Transforme en croix
        navMenu.classList.toggle('menu-open');       // Ouvre menu
    });

    // Clic lien → ferme
    const navLinks = navMenu.querySelectorAll('a');  // Tous liens nav
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('menu-open');
        });
    });

    // Clic dehors → ferme
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !burgerMenu.contains(e.target) && navMenu.classList.contains('menu-open')) {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('menu-open');
        }
    });
}

// Lance au chargement
document.addEventListener('DOMContentLoaded', initMenuBurger);
