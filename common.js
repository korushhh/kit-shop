document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }

    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            console.log('Hamburger clicked'); // Debug log
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    } else {
        console.error('Hamburger or Mobile Menu not found');
    }

    window.toggleMenu = function() {
        if (hamburger && mobileMenu) {
            console.log('Closing menu'); // Debug log
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    };

    // Cart Count Sync
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.length;
    }
});
