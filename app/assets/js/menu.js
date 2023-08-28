const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
            document.body.classList.toggle('overflow-hidden');
        })
    }
};

showMenu('nav-toggle', 'nav-menu');
