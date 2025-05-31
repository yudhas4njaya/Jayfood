// Sample wallpaper data for search
const wallpapers = [
  'Nature Wallpaper', 'Abstract Art', 'City Lights', 'Ocean Waves', 
  'Mountain View', 'Space Galaxy', 'Flower Garden', 'Sunset Beach',
  'Forest Path', 'Neon Lights', 'Geometric Patterns', 'Animal Wildlife'
];

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', function() {
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

// Close search results when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.header-container')) {
      searchResults.style.display = 'none';
  }
});

// Account icon click handler
document.getElementById('accountIcon').addEventListener('click', function() {
  alert('Account menu opened!');
  console.log('Account icon clicked');
});

// Handle search item clicks
searchResults.addEventListener('click', function(e) {
  if (e.target.classList.contains('search-item')) {
      searchInput.value = e.target.textContent;
      searchResults.style.display = 'none';
      filterProducts(e.target.textContent);
      console.log('Searched for:', e.target.textContent);
  }
});

// Filter products function
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

// Discount tab functionality
const discountTabs = document.querySelectorAll('.discount-tab');
const productCards = document.querySelectorAll('.product-card');
const promoCards = document.querySelectorAll('.promo-card');

discountTabs.forEach(tab => {
  tab.addEventListener('click', function() {
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
          priceElement.innerHTML = `<s style="opacity:0.6">Rp.${originalPrice.toLocaleString()}</s><br>Rp.${Math.round(discountedPrice).toLocaleString()}`;
      }
      
      card.style.transform = 'scale(1.05)';
      setTimeout(() => {
          card.style.transform = '';
      }, 300);
  });
}

// Product card click handlers
document.querySelectorAll('.product-card, .promo-card').forEach(card => {
  card.addEventListener('click', function() {
      const ripple = document.createElement('div');
      ripple.style.cssText = `
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.6);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
      `;
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
      
      this.appendChild(ripple);
      
      setTimeout(() => {
          ripple.remove();
      }, 600);
      
      console.log('Product clicked:', this.dataset.price || 'promo item');
      
      const productName = this.classList.contains('product-card') ? 'Wallpaper Premium' : 'Wallpaper Promo';
      alert(`${productName} - ${this.querySelector('.product-price')?.textContent || 'Special Price'}`);
  });
});

// Large promo button click handler
document.querySelector('.promo-button').addEventListener('click', function() {
  alert('Promo code applied: PASTIADAJALAN');
  console.log('Large promo button clicked');
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
      to {
          transform: scale(4);
          opacity: 0;
      }
  }
`;
document.head.appendChild(style);

// Dot indicator functionality
const productGrid = document.getElementById('productGrid');
const dotIndicator = document.getElementById('dotIndicator');
const dots = dotIndicator.querySelectorAll('.dot');

let currentPage = 0;

function updateDots(page, dotContainer) {
  const containerDots = dotContainer.querySelectorAll('.dot');
  containerDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === page);
  });
}

function scrollToPage(page, grid, dotContainer) {
  const containerWidth = grid.offsetWidth;
  const scrollPosition = page * containerWidth;
  
  grid.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
  });
  updateDots(page, dotContainer);
}

// Handle dot clicks for product grid
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
      scrollToPage(index, productGrid, dotIndicator);
      currentPage = index;
      console.log('Product page:', index + 1);
  });
});

// Handle scroll detection for product grid
productGrid.addEventListener('scroll', () => {
  const containerWidth = productGrid.offsetWidth;
  const scrollLeft = productGrid.scrollLeft;
  const newPage = Math.round(scrollLeft / containerWidth);
  
  if (newPage !== currentPage && newPage >= 0 && newPage < dots.length) {
      updateDots(newPage, dotIndicator);
      currentPage = newPage;
  }
});

// Dot indicator functionality for promo grid
const promoGrid = document.getElementById('promoGrid');
const promoDotIndicator = document.getElementById('promoDotIndicator');
const promoDots = promoDotIndicator.querySelectorAll('.dot');

let currentPromoPage = 0;

promoDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
      scrollToPage(index, promoGrid, promoDotIndicator);
      currentPromoPage = index;
      console.log('Promo page:', index + 1);
  });
});

promoGrid.addEventListener('scroll', () => {
  const containerWidth = promoGrid.offsetWidth;
  const scrollLeft = promoGrid.scrollLeft;
  const newPage = Math.round(scrollLeft / containerWidth);
  
  if (newPage !== currentPromoPage && newPage >= 0 && newPage < promoDots.length) {
      updateDots(newPage, promoDotIndicator);
      currentPromoPage = newPage;
  }
});

// Initialize with default discount
applyDiscount(35);
