let products = [
    { name: 'Nasi Goreng Spesial', category: 'm', price: 29000, desc: 'Diskon spesial', extra: 'Pedas dan gurih' },
    { name: 'Sate Ayam', category: 'n', price: 15000, desc: 'Produk terdekat', extra: 'Daging empuk' },
    { name: 'Bakso Malang', category: 'x', price: 18000, desc: 'Top pilihan', extra: 'Kuah segar' },
    { name: 'Mie Ayam Komplit', category: 'm', price: 17000, desc: 'Diskon menarik', extra: 'Topping banyak' },
    { name: 'Ayam Geprek', category: 'n', price: 20000, desc: 'Produk baru terdekat', extra: 'Level pedas bisa pilih' },
    { name: 'Rendang Padang', category: 'x', price: 23000, desc: 'Best seller', extra: 'Empuk dan berbumbu' },
  ];
  let currentIndex = 0;
  let maxItems = 15;
  let selectedCategory = 'all';
  let currentSort = 'default';
  
  function loadProducts() {
    const list = document.getElementById('productList');
    let added = 0;
  
    while (added < maxItems && currentIndex < maxItems) {
      const p = products[currentIndex % products.length];
      if (selectedCategory === 'all' || p.category === selectedCategory) {
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
      }
      currentIndex++;
    }
  }
  
  function showModal(p) {
    document.getElementById('modalImg').src = `https://source.unsplash.com/400x300/?food,${encodeURIComponent(p.name)}`;
    document.getElementById('modalPrice').textContent = `Rp. ${p.price}`;
    document.getElementById('modalDesc').textContent = p.name;
    document.getElementById('modalExtra').textContent = `${p.desc} - ${p.extra}`;
    document.getElementById('productModal').style.display = 'flex';
  }
  
  function closeModal() {
    document.getElementById('productModal').style.display = 'none';
  }
  
  function searchProducts() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const products = document.querySelectorAll('.product');
    products.forEach(p => {
      const name = p.getAttribute('data-name');
      p.style.display = name.includes(keyword) ? 'flex' : 'none';
    });
  }
  
  function filterCategory(cat) {
    selectedCategory = cat;
    currentIndex = 0;
    document.getElementById('productList').innerHTML = '';
    loadProducts();
  }
  
  function sortProducts() {
    currentSort = document.getElementById('sortSelect').value;
    if (currentSort === 'priceLowHigh') {
      products.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'priceHighLow') {
      products.sort((a, b) => b.price - a.price);
    } else {
      products = products.sort(() => Math.random() - 0.5);
    }
    currentIndex = 0;
    document.getElementById('productList').innerHTML = '';
    loadProducts();
  }
  
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  window.addEventListener('scroll', () => {
    const scrollTopBtn = document.getElementById('backToTopBtn');
    scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 && currentIndex < maxItems) {
      loadProducts();
    }
  });
  
  window.onload = () => {
    loadProducts();
  };
  
