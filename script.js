document.addEventListener('DOMContentLoaded', () => {
    console.log('صفحه لود شد، شروع اسکریپت...');

    // Header Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    } else {
        console.error('هدر پیدا نشد!');
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('پیام شما با موفقیت ارسال شد!');
            contactForm.reset();
        });
    } else {
        console.warn('فرم تماس پیدا نشد!');
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
            console.log('آپدیت سبد خرید:', cart);
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
        } catch (error) {
            console.error('خطا در آپدیت سبد خرید:', error);
            alert('خطا در آپدیت سبد خرید!');
        }
    }

    if (cartBtn && cartModal && closeCart && clearCartBtn) {
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
    } else {
        console.error('المان‌های سبد خرید پیدا نشدند!');
    }

    // Initialize cart count
    if (cartCount) {
        cartCount.textContent = cart.length;
    } else {
        console.error('المان cart-count پیدا نشد!');
    }

    // Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product');

    console.log('تعداد محصولات پیدا شده:', products.length);
    if (products.length === 0) {
        console.error('هیچ محصولی پیدا نشد! چک کنید که کلاس .product درست استفاده شده باشه.');
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('فیلتر کلیک شد:', button.getAttribute('data-filter'));
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
                } else if (filter === 'cheapest' && price <= 680000) {
                    product.style.display = 'flex';
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
                console.log('محصول در دید:', entry.target);
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    products.forEach(product => {
        observer.observe(product);
        product.style.display = 'flex'; // مطمئن می‌شیم محصولات از اول نمایش داده می‌شن
    });

    // Expose addToCartGlobal
    window.addToCartGlobal = function(title, size, sleeve, price) {
        try {
            console.log('addToCartGlobal called with:', { title, size, sleeve, price });
            cart.push({ title, size, sleeve, price });
            localStorage.setItem('cart', JSON.stringify(cart));
            cartCount.textContent = cart.length;
            updateCart();
            alert('محصول با موفقیت به سبد خرید اضافه شد!');
        } catch (error) {
            console.error('خطا در اضافه کردن به سبد خرید:', error);
            alert('خطا: نمی‌توان محصول را به سبد خرید اضافه کرد!');
        }
    };
});
