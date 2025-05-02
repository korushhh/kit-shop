document.addEventListener('DOMContentLoaded', () => {
    // Cart Count Update
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;

    // Product Data
    const products = {
        barca: {
            title: 'کیت بارسلونا',
            description: 'لباس اصلی فصل 2024-2025',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/barca.jpg',
            originalPrice: 900000,
            discountedPrice: 765000,
            shortSleevePrice: 850000
        },
        real: {
            title: 'کیت رئال مادرید',
            description: 'لباس خانگی فصل 2024-2025',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/real.jpg',
            originalPrice: 900000,
            discountedPrice: 765000,
            shortSleevePrice: 850000
        },
        esteghlal: {
            title: 'کیت استقلال',
            description: 'لباس خانگی فصل 1404-1405',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/es.jpeg',
            originalPrice: 800000,
            discountedPrice: 680000,
            shortSleevePrice: 750000
        },
        perspolis: {
            title: 'کیت پرسپولیس',
            description: 'لباس اصلی فصل 1404-1405',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/pers.jpg',
            originalPrice: 800000,
            discountedPrice: 680000,
            shortSleevePrice: 750000
        },
        chelsea: {
            title: 'کیت چلسی',
            description: 'لباس اصلی فصل 2024-2025',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/chelsea.jfif',
            originalPrice: 900000,
            discountedPrice: 765000,
            shortSleevePrice: 850000
        },
        'man-utd': {
            title: 'کیت منچستر یونایتد',
            description: 'لباس خانگی فصل 2024-2025',
            image: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/MUN.jpg',
            originalPrice: 900000,
            discountedPrice: 765000,
            shortSleevePrice: 850000
        }
    };

    // Get Product from URL
    const urlParams = new URLSearchParams(window.location.search);
    const kit = urlParams.get('kit');
    const product = products[kit];

    if (product) {
        document.getElementById('product-img').src = product.image;
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('original-price').textContent = `${product.originalPrice.toLocaleString()} تومان`;
        document.getElementById('discounted-price').textContent = `${product.discountedPrice.toLocaleString()} تومان`;

        // Update Price Based on Sleeve
        const sleeveOptions = document.querySelectorAll('input[name="sleeve"]');
        sleeveOptions.forEach(option => {
            option.addEventListener('change', () => {
                const price = option.value === 'long' ? product.discountedPrice : product.shortSleevePrice;
                document.getElementById('discounted-price').textContent = `${price.toLocaleString()} تومان`;
            });
        });

        // Animation
        const productContainer = document.querySelector('.product-container');
        setTimeout(() => {
            productContainer.classList.add('visible');
        }, 100);
    } else {
        console.error('محصول یافت نشد:', kit);
        document.querySelector('.product-container').innerHTML = '<p>محصول یافت نشد!</p>';
    }

    // Add to Cart Function
    window.addToCart = function() {
        try {
            const size = document.querySelector('input[name="size"]:checked').value;
            const sleeve = document.querySelector('input[name="sleeve"]:checked').value;
            const price = sleeve === 'long' ? product.discountedPrice : product.shortSleevePrice;

            console.log('Adding to cart:', {
                title: product.title,
                size: size,
                sleeve: sleeve,
                price: price
            });

            // Call addToCart from script.js
            if (typeof addToCart === 'function') {
                addToCart(product.title, size, sleeve, price);
            } else {
                console.error('تابع addToCart تعریف نشده است');
                alert('خطا: نمی‌توان محصول را به سبد خرید اضافه کرد. لطفاً دوباره امتحان کنید.');
            }
        } catch (error) {
            console.error('خطا در اضافه کردن به سبد خرید:', error);
            alert('خطا: مشکلی در اضافه کردن محصول به سبد خرید وجود دارد.');
        }
    };
});
