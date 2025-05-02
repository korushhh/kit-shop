const kits = {
    'barca': {
        title: 'کیت بارسلونا',
        description: 'لباس اصلی فصل 2024-2025، جنس: پلی‌استر، برند: نایک',
        img: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/barca.jpg',
        originalPriceLong: '900,000 تومان',
        discountedPriceLong: '765,000 تومان',
        originalPriceShort: '850,000 تومان',
        discountedPriceShort: '722,500 تومان'
    },
    'real': {
        title: 'کیت رئال مادرید',
        description: 'لباس خانگی فصل 2024-2025، جنس: پلی‌استر، برند: آدیداس',
        img: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/real.jpg',
        originalPriceLong: '900,000 تومان',
        discountedPriceLong: '765,000 تومان',
        originalPriceShort: '850,000 تومان',
        discountedPriceShort: '722,500 تومان'
    },
    'esteghlal': {
        title: 'کیت استقلال',
        description: 'لباس خانگی فصل 1404-1405، جنس: پلی‌استر، برند: مجید',
        img: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/es.jpeg',
        originalPriceLong: '800,000 تومان',
        discountedPriceLong: '680,000 تومان',
        originalPriceShort: '750,000 تومان',
        discountedPriceShort: '637,500 تومان'
    },
    'perspolis': {
        title: 'کیت پرسپولیس',
        description: 'لباس اصلی فصل 1404-1405، جنس: پلی‌استر، برند: آل‌اشپرت',
        img: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/pers.jpg',
        originalPriceLong: '800,000 تومان',
        discountedPriceLong: '680,000 تومان',
        originalPriceShort: '750,000 تومان',
        discountedPriceShort: '637,500 تومان'
    },
    'chelsea': {
        title: 'کیت چلسی',
        description: 'لباس اصلی فصل 2024-2025، جنس: پلی‌استر، برند: نایک',
        img: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/chelsea.jfif',
        originalPriceLong: '900,000 تومان',
        discountedPriceLong: '765,000 تومان',
        originalPriceShort: '850,000 تومان',
        discountedPriceShort: '722,500 تومان'
    },
    'man-utd': {
        title: 'کیت منچستر یونایتد',
        description: 'لباس خانگی فصل 2024-2025، جنس: پلی‌استر، برند: آدیداس',
        img: 'https://raw.githubusercontent.com/korushhh/kit-shop/main/images/MUN.jpg',
        originalPriceLong: '900,000 تومان',
        discountedPriceLong: '765,000 تومان',
        originalPriceShort: '850,000 تومان',
        discountedPriceShort: '722,500 تومان'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const kitId = urlParams.get('kit');
    const kit = kits[kitId];

    const productImg = document.getElementById('product-img');
    const productTitle = document.getElementById('product-title');
    const productDescription = document.getElementById('product-description');

    if (kit) {
        productImg.src = kit.img;
        productImg.alt = kit.title;
        productTitle.textContent = kit.title;
        productDescription.textContent = kit.description;
        updatePrice();
        // چک کردن لود شدن تصویر
        productImg.onerror = () => {
            productImg.src = 'https://via.placeholder.com/400x300?text=تصویر+یافت+نشد';
            productImg.alt = 'تصویر در دسترس نیست';
        };
    } else {
        document.querySelector('.product-container').innerHTML = '<p>کیت یافت نشد! لطفاً از صفحه اصلی یک کیت انتخاب کنید.</p>';
    }

    document.querySelectorAll('input[name="sleeve"]').forEach(input => {
        input.addEventListener('change', updatePrice);
    });
});

function updatePrice() {
    const urlParams = new URLSearchParams(window.location.search);
    const kitId = urlParams.get('kit');
    const kit = kits[kitId];
    const sleeve = document.querySelector('input[name="sleeve"]:checked').value;

    if (kit) {
        document.getElementById('original-price').textContent = sleeve === 'long' ? kit.originalPriceLong : kit.originalPriceShort;
        document.getElementById('discounted-price').textContent = sleeve === 'long' ? kit.discountedPriceLong : kit.discountedPriceShort;
    }
}

function addToCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const kitId = urlParams.get('kit');
    const kit = kits[kitId];
    const sleeve = document.querySelector('input[name="sleeve"]:checked').value;
    const sleeveText = sleeve === 'long' ? 'آستین‌دار' : 'بدون آستین';
    const size = document.querySelector('input[name="size"]:checked').value;

    alert(`${kit.title} (${sleeveText}, سایز ${size}) به سبد خرید اضافه شد!`);
}