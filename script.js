document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.textContent = nav.classList.contains('active') ? '×' : '☰';
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

    function updateCart() {
        try {
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
            cartCount.textContent = cart.length;
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log('Cart updated:', cart);
        } catch (error) {
            console.error('خطا در آپدیت سبد خرید:', error);
        }
    }

    cartBtn.addEventListener('click', () => {
        cartModal.style.display = 'flex';
        updateCart();
    });

    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    clearCartBtn.addEventListener('click', () => {
        cart = [];
        updateCart();
    });

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

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    products.forEach(product => observer.observe(product));

    // Expose addToCart
    window.addToCart = function(title, size, sleeve, price) {
        try {
            console.log('addToCart called with:', { title, size, sleeve, price });
            cart.push({ title, size, sleeve, price });
            localStorage.setItem('cart', JSON.stringify(cart));
            cartCount.textContent = cart.length;
            alert('محصول به سبد خرید اضافه شد!');
        } catch (error) {
            console.error('خطا در اضافه کردن به سبد خرید:', error);
            alert('خطا: نمی‌توان محصول را به سبد خرید اضافه کرد.');
        }
    };
});
