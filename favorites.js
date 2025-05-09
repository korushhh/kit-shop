document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });


    const favoritesList = document.getElementById('favorites-list');
    const noFavorites = document.getElementById('no-favorites');
    const favoritesModal = document.getElementById('favorites-modal');
    const favoritesBtn = document.getElementById('favorites-btn');
    const closeFavorites = document.getElementById('close-favorites');
    const favoritesItems = document.getElementById('favorites-items');
    const clearFavoritesBtn = document.getElementById('clear-favorites');
    const favoritesCount = document.getElementById('favorites-count');

    function updateFavorites() {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favoritesList.innerHTML = '';
        favoritesItems.innerHTML = '';
        if (favorites.length === 0) {
            noFavorites.style.display = 'block';
            favoritesList.style.display = 'none';
        } else {
            noFavorites.style.display = 'none';
            favoritesList.style.display = 'grid';
            favorites.forEach(fav => {

                const favItem = document.createElement('div');
                favItem.classList.add('favorite-item');
                favItem.dataset.kit = fav.kit; 
                favItem.innerHTML = `
                    <img src="${fav.image}" alt="${fav.title}">
                    <div class="favorite-info">
                        <h3>${fav.title}</h3>
                        <p>${fav.discountedPrice.toLocaleString()} تومان</p>
                    </div>
                    <button class="remove-favorite-btn" data-kit="${fav.kit}">
                        حذف
                    </button>
                `;
                favoritesList.appendChild(favItem);


                favItem.addEventListener('click', (e) => {

                    if (e.target.classList.contains('remove-favorite-btn') || e.target.closest('.remove-favorite-btn')) {
                        return;
                    }
                    window.location.href = `product.html?kit=${fav.kit}`;
                });

                const modalItem = document.createElement('div');
                modalItem.classList.add('favorites-item');
                modalItem.innerHTML = `
                    <p>${fav.title}</p>
                    <p>${fav.discountedPrice.toLocaleString()} تومان</p>
                `;
                favoritesItems.appendChild(modalItem);
            });

            document.querySelectorAll('.remove-favorite-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation(); 
                    const kit = button.dataset.kit;
                    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                    favorites = favorites.filter(item => item.kit !== kit);
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                    updateFavorites();
                });
            });
        }
        if (favoritesCount) {
            favoritesCount.textContent = favorites.length;
        }
    }

    if (favoritesBtn) {
        favoritesBtn.addEventListener('click', () => {
            favoritesModal.style.display = 'flex';
            updateFavorites();
        });
    }

    if (closeFavorites) {
        closeFavorites.addEventListener('click', () => {
            favoritesModal.style.display = 'none';
        });
    }

    if (clearFavoritesBtn) {
        clearFavoritesBtn.addEventListener('click', () => {
            localStorage.setItem('favorites', JSON.stringify([]));
            updateFavorites();
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === favoritesModal) {
            favoritesModal.style.display = 'none';
        }
    });

    updateFavorites();
});
