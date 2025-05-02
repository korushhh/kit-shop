function addToCart(productName, button) {
    const sleeve = button.parentElement.querySelector('input[name^="sleeve"]:checked').value;
    const sleeveText = sleeve === 'long' ? 'آستین‌دار' : 'بدون آستین';
    alert(`${productName} (${sleeveText}) به سبد خرید اضافه شد!`);
}

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('پیام شما با موفقیت ارسال شد!');
    this.reset();
});