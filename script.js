let products = [
  { name: 'Nasi Goreng Spesial', category: 'm', price: 29000, desc: 'Diskon spesial', extra: 'Pedas dan gurih' },
  { name: 'Sate Ayam', category: 'n', price: 15000, desc: 'Produk terdekat', extra: 'Daging empuk' },
  { name: 'Bakso Malang', category: 'x', price: 18000, desc: 'Top pilihan', extra: 'Kuah segar' },
  { name: 'Mie Ayam Komplit', category: 'm', price: 17000, desc: 'Diskon menarik', extra: 'Topping banyak' },
  { name: 'Ayam Geprek', category: 'n', price: 20000, desc: 'Produk baru terdekat', extra: 'Level pedas bisa pilih' },
  { name: 'Rendang Padang', category: 'x', price: 23000, desc: 'Best seller', extra: 'Empuk dan berbumbu' },
];

let filteredProducts = [...products];  // produk setelah filter dan pencarian
let currentIndex = 0;
const maxItems = 15;
let selectedCategory = 'all';
let currentSort = 'default';
let currentKeyword = '';

const list = document.getElementById('productList');

function applyFilters() {
  // Filter kategori
  filteredProducts = products.filter(p => selectedCategory === 'all' || p.category === selectedCategory);

  // Filter pencarian
  if (currentKeyword.trim() !== '') {
    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(currentKeyword));
  }

  // Sort
  if (currentSort === 'priceLowHigh') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'priceHighLow') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'random') {
    filteredProducts = filteredProducts.sort(() => Math.random() - 0.5);
  }

  currentIndex = 0;
  list.innerHTML = '';
}

function loadProducts() {
  let added = 0;
  while (added < maxItems && currentIndex < filteredProducts.length) {
    const p = filteredProducts[currentIndex];
    const el = document.createElement('div');
    el.className = 'product';
    el.setAttribute('data-category', p.category);
    el.setAttribute('data-name', p.name.toLowerCase());
    el.innerHTML = `
      <img src="https://source.unsplash.com/80x80/?food,${encodeURIComponent(p.name)}" alt="${p.name}" />
      <div class="product-info">
        <h3>${p.name}</h3>
        <div class="price">Rp. ${p.price}</div>
        <div>${p.desc}</div>
        <div>${p.extra}</div>
      </div>
    `;
    el.onclick = () => showModal(p);
    list.appendChild(el);
    added++;
    currentIndex++;
  }
}

function showModal(p) {
  document.getElementById('modalImg').src = `https://source.unsplash.com/400x300/?food,${encodeURIComponent(p.name)}`;
  document.getElementById('modalPrice').textContent = `Rp. ${p.price}`;
  document.getElementById('modalDesc').textContent = p.name;
  document.getElementById('modalExtra').textContent = `${p.desc} - ${p.extra}`;
  document.getElementById('productModal').classList.add('show');
}

function closeModal() {
  document.getElementById('productModal').classList.remove('show');
}

function searchProducts() {
  currentKeyword = document.getElementById('searchInput').value.toLowerCase();
  applyFilters();
  loadProducts();
}

function filterCategory(cat) {
  selectedCategory = cat;
  applyFilters();
  loadProducts();
}

function sortProducts() {
  currentSort = document.getElementById('sortSelect').value;
  applyFilters();
  loadProducts();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  const scrollTopBtn = document.getElementById('backToTopBtn');
  if (!scrollTopBtn) return;

  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }

  // Load lebih banyak produk saat scroll ke bawah
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
    if (currentIndex < filteredProducts.length) {
      loadProducts();
    }
  }
});

// Event listener kategori tabs dan tab dots (pastikan elemen ada)
const categoryTabs = document.getElementById('categoryTabs');
const tabDots = document.querySelectorAll('#tabDots .tab-dot');

if (categoryTabs && tabDots.length > 0) {
  categoryTabs.addEventListener('scroll', () => {
    const scrollLeft = categoryTabs.scrollLeft;
    const maxScroll = categoryTabs.scrollWidth - categoryTabs.clientWidth;
    const index = Math.round((scrollLeft / maxScroll) * (tabDots.length - 1));

    tabDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  });
}

// Inisialisasi halaman
window.onload = () => {
  applyFilters();
  loadProducts();
};
