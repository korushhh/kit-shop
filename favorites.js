document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Cart Functionality
    const cartModal = document.getElementById('cart-modal');
    const cartBtn = document.getElementById('cart-btn');
    const closeCart = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCartBtn = document.getElementById('clear-cart');

    function updateCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <p>${item.title} (${item.size}, ${item.sleeve === 'long' ? 'آستین‌دار' : 'بدون آستین'})</p>
                <p>${item.price.toLocaleString()} تومان</p>
            `;
            cartItems.appendChild(itemElement);
            total += item.price;
        });
        cartTotal.textContent = `جمع: ${total.toLocaleString()} تومان`;
    }

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            cartModal.style.display = 'flex';
            updateCart();
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', () => {
            cartModal.style.display = 'none';
        });
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            localStorage.setItem('cart', JSON.stringify([]));
            updateCart();
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Favorites Functionality
    const favoritesList = document.getElementById('favorites-list');
    const clearFavoritesBtn = document.getElementById('clear-favorites');

    function updateFavorites() {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favoritesList.innerHTML = '';
        if (favorites.length === 0) {
            favoritesList.innerHTML = '<p>هیچ محصولی در علاقه‌مندی‌ها نیست!</p>';
        } else {
            favorites.forEach(item => {
                const favoriteElement = document.createElement('div');
                favoriteElement.classList.add('favorite-item');
                favoriteElement.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <h3>${item.title}</h3>
                    <p class="price">${item.discountedPrice.toLocaleString()} تومان</p>
                    <button class="remove-btn" data-kit="${item.kit}">حذف</button>
                `;
                favoritesList.appendChild(favoriteElement);
            });
        }
    }

    favoritesList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const kit = e.target.getAttribute('data-kit');
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            favorites = favorites.filter(item => item.kit !== kit);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavorites();
            alert('محصول از علاقه‌مندی‌ها حذف شد!');
        }
    });

    if (clearFavoritesBtn) {
        clearFavoritesBtn.addEventListener('click', () => {
            localStorage.setItem('favorites', JSON.stringify([]));
            updateFavorites();
            alert('علاقه‌مندی‌ها خالی شد!');
        });
    }

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    updateFavorites();
    const favoriteItems = document.querySelectorAll('.favorite-item');
    favoriteItems.forEach(item => observer.observe(item));
});
