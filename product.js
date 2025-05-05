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
    const cartCount = document.getElementById('cart-count');

    function updateCart() {
        console.log('Updating cart display'); // Debug
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
        // Update cart count
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            console.log('Cart button clicked'); // Debug
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
            console.log('Clearing cart'); // Debug
            localStorage.setItem('cart', JSON.stringify([]));
            updateCart();
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Product Details
    const urlParams = new URLSearchParams(window.location.search);
    const kit = urlParams.get('kit');
    const products = {
        'barca': {
            title: 'کیت بارسلونا',
            description: 'لباس اصلی فصل 2024-2025',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/barca.jpg',
            originalPrice: 900000,
            discountedPrice: 765000,
            sleevePrices: { long: 900000, short: 850000 }
        },
        'real': {
            title: 'کیت رئال مادرید',
            description: 'لباس خانگی فصل 2024-2025',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/real.jpg',
            originalPrice: 900000,
            discountedPrice: 765000,
            sleevePrices: { long: 900000, short: 850000 }
        },
        'esteghlal': {
            title: 'کیت استقلال',
            description: 'لباس خانگی فصل 1404-1405',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/es.jpeg',
            originalPrice: 800000,
            discountedPrice: 680000,
            sleevePrices: { long: 800000, short: 750000 }
        },
        'perspolis': {
            title: 'کیت پرسپولیس',
            description: 'لباس اصلی فصل 1404-1405',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/pers.jpeg',
            originalPrice: 800000,
            discountedPrice: 680000,
            sleevePrices: { long: 800000, short: 750000 }
        },
        'chelsea': {
            title: 'کیت چلسی',
            description: 'لباس اصلی فصل 2024-2025',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/chelsea.jpg',
            originalPrice: 900000,
            discountedPrice: 765000,
            sleevePrices: { long: 900000, short: 850000 }
        },
        'man-utd': {
            title: 'کیت منچستر یونایتد',
            description: 'لباس خانگی فصل 2024-2025',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/MUN.jpg',
            originalPrice: 900000,
            discountedPrice: 765000,
            sleevePrices: { long: 900000, short: 850000 }
        },
        'ACM': {
            title: 'کیت آث میلان',
            description: 'لباس خانگی فصل 2024-2025',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/ACM.jpg',
            originalPrice: 900000,
            discountedPrice: 765000,
            sleevePrices: { long: 900000, short: 850000 }
        },
        'classic-inter-milan': {
            title: 'کیت اینتر میلان',
            description: 'لباس خانگی کلاسیک',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/ClassicInter.webp',
            originalPrice: 950000,
            discountedPrice: 800000,
            sleevePrices: { long: 950000, short: 900000 }
        }
    };

    if (products[kit]) {
        document.getElementById('product-title').textContent = products[kit].title;
        document.getElementById('product-description').textContent = products[kit].description;
        document.getElementById('product-img').src = products[kit].image;
        document.getElementById('original-price').textContent = `${products[kit].originalPrice.toLocaleString()} تومان`;
        document.getElementById('discounted-price').textContent = `${products[kit].discountedPrice.toLocaleString()} تومان`;

        const sleeveOptions = document.querySelectorAll('input[name="sleeve"]');
        sleeveOptions.forEach(option => {
            option.addEventListener('change', () => {
                const sleeve = option.value;
                document.getElementById('original-price').textContent = `${products[kit].sleevePrices[sleeve].toLocaleString()} تومان`;
                document.getElementById('discounted-price').textContent = `${(products[kit].sleevePrices[sleeve] * 0.85).toLocaleString()} تومان`;
            });
        });

        // Favorite Button State
        const favoriteBtn = document.getElementById('favorite-btn');
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favorites.some(item => item.kit === kit)) {
            favoriteBtn.textContent = 'حذف از علاقه‌مندی‌ها';
            favoriteBtn.classList.add('favorited');
        }
    } else {
        document.querySelector('.product-container').innerHTML = '<p>محصول یافت نشد!</p>';
    }

    // Add to Cart
    window.addToCart = function() {
        console.log(`Adding to cart for kit: ${kit}`); // Debug
        const size = document.querySelector('input[name="size"]:checked');
        const sleeve = document.querySelector('input[name="sleeve"]:checked');
        if (!size || !sleeve || !products[kit]) {
            console.error('Invalid size, sleeve, or product data');
            alert('خطا: لطفاً سایز و نوع آستین را انتخاب کنید.');
            return;
        }
        const price = products[kit].sleevePrices[sleeve.value] * 0.85;
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({
            title: products[kit].title,
            size: size.value,
            sleeve: sleeve.value,
            price: price
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        // Update cart count
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
        alert('محصول به سبد خرید اضافه شد!');
    };

    // Toggle Favorite
    window.toggleFavorite = function() {
        console.log(`Toggling favorite for kit: ${kit}`); // Debug
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const favoriteBtn = document.getElementById('favorite-btn');
        const isFavorited = favorites.some(item => item.kit === kit);

        if (isFavorited) {
            favorites = favorites.filter(item => item.kit !== kit);
            favoriteBtn.textContent = 'افزودن به علاقه‌مندی‌ها';
            favoriteBtn.classList.remove('favorited');
            alert('محصول از علاقه‌مندی‌ها حذف شد!');
        } else {
            favorites.push({
                kit,
                title: products[kit].title,
                image: products[kit].image,
                discountedPrice: products[kit].discountedPrice
            });
            favoriteBtn.textContent = 'حذف از علاقه‌مندی‌ها';
            favoriteBtn.classList.add('favorited');
            alert('محصول به علاقه‌مندی‌ها اضافه شد!');
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    // Scroll Animation for Product
    const productContainer = document.querySelector('.product-container');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    observer.observe(productContainer);

    // Initialize cart count
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
});
