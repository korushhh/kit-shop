document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('پیام شما با موفقیت ارسال شد!');
            contactForm.reset();
        });
    }

    // Cart Functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartModal = document.getElementById('cart-modal');
    const cartBtn = document.getElementById('cart-btn');
    const closeCart = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCartBtn = document.getElementById('clear-cart');
    const cartCount = document.getElementById('cart-count');

    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    function updateCart() {
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
        updateCartCount();
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
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            products.forEach(product => {
                const category = product.getAttribute('data-category');
                const price = parseInt(product.getAttribute('data-price'));

                if (filter === 'all') {
                    product.style.display = 'flex';
                } else if (filter === 'european' && category === 'european') {
                    product.style.display = 'flex';
                } else if (filter === 'iranian' && category === 'iranian') {
                    product.style.display = 'flex';
                } else if (filter === 'cheapest') {
                    product.style.display = price <= 680000 ? 'flex' : 'none';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });

    // Favorite Functionality
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    const productsData = {
        'barca': {
            kit: 'barca',
            title: 'کیت بارسلونا',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/barca.jpg',
            discountedPrice: 765000
        },
        'real': {
            kit: 'real',
            title: 'کیت رئال مادرید',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/real.jpg',
            discountedPrice: 765000
        },
        'esteghlal': {
            kit: 'esteghlal',
            title: 'کیت استقلال',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/es.jpeg',
            discountedPrice: 680000
        },
        'perspolis': {
            kit: 'perspolis',
            title: 'کیت پرسپولیس',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/pers.jpeg',
            discountedPrice: 680000
        },
        'chelsea': {
            kit: 'chelsea',
            title: 'کیت چلسی',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/chelsea.jpg',
            discountedPrice: 765000
        },
        'man-utd': {
            kit: 'man-utd',
            title: 'کیت منچستر یونایتد',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/MUN.jpg',
            discountedPrice: 765000
        },
        'ACM': {
            kit: 'ACM',
            title: 'کیت آث میلان',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/ACM.jpg',
            discountedPrice: 765000
        },
        'classic-inter-milan': {
            kit: 'classic-inter-milan',
            title: 'کیت اینتر میلان',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/ClassicInter.webp',
            discountedPrice: 800000
        }
    };

    function toggleFavorite(kit) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const favoriteBtn = document.querySelector(`.favorite-btn[data-kit="${kit}"]`);
        const isFavorited = favorites.some(item => item.kit === kit);

        console.log(`Toggling favorite for kit: ${kit}, isFavorited: ${isFavorited}`); // Debug

        if (isFavorited) {
            favorites = favorites.filter(item => item.kit !== kit);
            favoriteBtn.classList.remove('active');
            alert('محصول از علاقه‌مندی‌ها حذف شد!');
        } else {
            if (productsData[kit]) {
                favorites.push(productsData[kit]);
                favoriteBtn.classList.add('active');
                alert('محصول به علاقه‌مندی‌ها اضافه شد!');
            } else {
                console.error(`Product data for kit ${kit} not found`);
            }
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    favoriteButtons.forEach(button => {
        const kit = button.getAttribute('data-kit');
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favorites.some(item => item.kit === kit)) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            console.log(`Favorite button clicked for kit: ${kit}`); // Debug
            toggleFavorite(kit);
        });
    });

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    products.forEach(product => observer.observe(product));
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => observer.observe(item));

    // Initialize cart count
    updateCartCount();
});

// Expose addToCart globally
window.addToCart = function(title, size, sleeve, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ title, size, sleeve, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
    alert('محصول به سبد خرید اضافه شد!');
};
