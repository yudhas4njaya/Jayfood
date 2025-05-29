const wallpapers = [
    'Nature Wallpaper', 'Abstract Art', 'City Lights', 'Ocean Waves',
    'Mountain View', 'Space Galaxy', 'Flower Garden', 'Sunset Beach',
    'Forest Path', 'Neon Lights', 'Geometric Patterns', 'Animal Wildlife'
];

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    if (query.length > 0) {
        const filtered = wallpapers.filter(item =>
            item.toLowerCase().includes(query)
        );
        if (filtered.length > 0) {
            searchResults.innerHTML = filtered.map(item =>
                `<div class="search-item">${item}</div>`
            ).join('');
            searchResults.style.display = 'block';
        } else {
            searchResults.style.display = 'none';
        }
    } else {
        searchResults.style.display = 'none';
    }
});

document.addEventListener('click', function (e) {
    if (!e.target.closest('.header-container')) {
        searchResults.style.display = 'none';
    }
});

searchResults.addEventListener('click', function (e) {
    if (e.target.classList.contains('search-item')) {
        searchInput.value = e.target.textContent;
        searchResults.style.display = 'none';
        filterProducts(e.target.textContent);
        console.log('Searched for:', e.target.textContent);
    }
});

function filterProducts(query) {
    const allCards = document.querySelectorAll('.product-card, .promo-card');
    allCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '0.5';
    });

    const randomCards = Array.from(allCards).sort(() => 0.5 - Math.random()).slice(0, 3);
    randomCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1.05)';
        setTimeout(() => {
            card.style.transform = '';
        }, 500);
    });

    setTimeout(() => {
        allCards.forEach(card => {
            card.style.opacity = '1';
        });
    }, 2000);
}

const discountTabs = document.querySelectorAll('.discount-tab');
const productCards = document.querySelectorAll('.product-card');
const promoCards = document.querySelectorAll('.promo-card');

discountTabs.forEach(tab => {
    tab.addEventListener('click', function () {
        discountTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        const discount = parseInt(this.dataset.discount);
        applyDiscount(discount);
        console.log(`Applied ${discount}% discount`);
    });
});

function applyDiscount(percentage) {
    [...productCards, ...promoCards].forEach(card => {
        const originalPrice = parseInt(card.dataset.price);
        const discountedPrice = originalPrice - (originalPrice * percentage / 100);
        const priceElement = card.querySelector('.product-price');
        if (priceElement) {
            priceElement.textContent = 'Rp.' + discountedPrice.toLocaleString();
        }
    });
}
