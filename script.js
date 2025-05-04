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

// Expose addToCart for product.js
function addToCart(title, size, sleeve, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ title, size, sleeve, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
    alert('محصول به سبد خرید اضافه شد!');
}
