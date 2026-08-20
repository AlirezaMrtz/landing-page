/**
 * VOYA GLOBAL EXPEDITIONS — INTERACTIVE LOGIC & CONTROLLER
 * Pure JS, No external libraries required
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentCurrency = 'USD';
  const currencyRates = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
    AUD: { symbol: 'A$', rate: 1.52 },
    JPY: { symbol: '¥', rate: 155.0 }
  };

  let favorites = JSON.parse(localStorage.getItem('voya_favs') || '[]');

  // Destination Database with Rich Vector Scenery Generator
  const destinations = [
    {
      id: 'dest-maldives',
      title: 'Bora Bora Overwater Sanctuary',
      region: 'French Polynesia',
      category: 'tropical',
      rating: 4.98,
      reviewsCount: 142,
      priceUSD: 3450,
      durationDays: 7,
      weather: '29°C Sunny',
      badge: 'Bestseller',
      badgeType: 'badge',
      description: 'Exclusive glass-floor overwater villas surrounded by endless sapphire lagoons and coral reefs.',
      highlights: [
        'Private catamaran lagoon cruises',
        'Direct coral reef lagoon access',
        'Polynesian sunset feast & fire show',
        'Private seaplane charter transfers'
      ],
      amenities: ['Private Pool', 'Overwater Deck', 'Butler Service', '5-Star Spa'],
      svgScene: `
        <svg viewBox="0 0 400 240" class="svg-vector-scene" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="sky-maldives" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0ea5e9" />
              <stop offset="60%" stop-color="#38bdf8" />
              <stop offset="100%" stop-color="#fdba74" />
            </linearGradient>
            <linearGradient id="ocean-maldives" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#00f2c3" />
              <stop offset="50%" stop-color="#0284c7" />
              <stop offset="100%" stop-color="#082f49" />
            </linearGradient>
          </defs>
          <rect width="400" height="150" fill="url(#sky-maldives)" />
          <circle cx="200" cy="140" r="45" fill="#fed7aa" opacity="0.8" />
          <rect y="130" width="400" height="110" fill="url(#ocean-maldives)" />
          <!-- Overwater Villa Vectors -->
          <polygon points="120,120 180,95 240,120 180,128" fill="#78350f" />
          <polygon points="120,120 180,128 180,150 120,140" fill="#92400e" />
          <polygon points="240,120 180,128 180,150 240,140" fill="#b45309" />
          <!-- Stilts -->
          <line x1="135" y1="140" x2="135" y2="180" stroke="#451a03" stroke-width="4" />
          <line x1="165" y1="148" x2="165" y2="185" stroke="#451a03" stroke-width="4" />
          <line x1="195" y1="148" x2="195" y2="185" stroke="#451a03" stroke-width="4" />
          <line x1="225" y1="140" x2="225" y2="180" stroke="#451a03" stroke-width="4" />
          <!-- Palm Leaves -->
          <path d="M-20,130 Q40,60 100,80 Q50,110 -20,130" fill="#047857" opacity="0.9" />
          <path d="M-10,140 Q60,90 120,120 Q60,135 -10,140" fill="#059669" opacity="0.9" />
          <path d="M420,130 Q360,60 300,80 Q350,110 420,130" fill="#047857" opacity="0.9" />
        </svg>
      `
    },
    {
      id: 'dest-swiss',
      title: 'Zermatt Alpine Pinnacle Retreat',
      region: 'Swiss Alps',
      category: 'mountain',
      rating: 4.96,
      reviewsCount: 188,
      priceUSD: 2890,
      durationDays: 6,
      weather: '16°C Crisp',
      badge: 'Popular',
      badgeType: 'badge-purple',
      description: 'Ultra-luxury wooden chalets facing the iconic Matterhorn with private heated infinity whirlpools.',
      highlights: [
        'Gornergrat glacier cogwheel railway VIP pass',
        'Private heli-glacier sightseeing tour',
        'Michelin-starred Alpine dining',
        'Unlimited mountain bike & spa access'
      ],
      amenities: ['Matterhorn View', 'Heated Jacuzzi', 'Chalet Chef', 'Ski-in/Ski-out'],
      svgScene: `
        <svg viewBox="0 0 400 240" class="svg-vector-scene" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="sky-swiss" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0284c7" />
              <stop offset="70%" stop-color="#bae6fd" />
              <stop offset="100%" stop-color="#f0f9ff" />
            </linearGradient>
            <linearGradient id="meadow-swiss" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#16a34a" />
              <stop offset="100%" stop-color="#14532d" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#sky-swiss)" />
          <!-- Matterhorn Mountain Silhouette -->
          <polygon points="80,180 200,40 260,180" fill="#334155" />
          <polygon points="180,65 200,40 220,75 205,85 195,78" fill="#f8fafc" />
          <polygon points="0,200 110,90 220,200" fill="#475569" />
          <polygon points="210,200 320,80 400,200" fill="#1e293b" />
          <!-- Green Alpine Meadow -->
          <path d="M0,170 Q120,150 240,175 T400,165 L400,240 L0,240 Z" fill="url(#meadow-swiss)" />
          <!-- Swiss Chalet -->
          <polygon points="280,195 330,165 380,195" fill="#78350f" />
          <rect x="290" y="195" width="80" height="35" fill="#92400e" />
          <rect x="305" y="202" width="16" height="16" fill="#fef08a" />
          <rect x="345" y="202" width="16" height="16" fill="#fef08a" />
          <!-- Pine trees -->
          <polygon points="40,210 55,175 70,210" fill="#064e3b" />
          <polygon points="65,220 80,180 95,220" fill="#022c22" />
        </svg>
      `
    },
    {
      id: 'dest-kyoto',
      title: 'Kyoto Imperial Zen Sanctum',
      region: 'Kyoto, Japan',
      category: 'heritage',
      rating: 4.95,
      reviewsCount: 165,
      priceUSD: 2450,
      durationDays: 5,
      weather: '22°C Gentle',
      badge: 'Cultural Highlight',
      badgeType: 'badge-orange',
      description: 'Immerse in ancient bamboo groves, private tea master rituals, and historic heritage ryokans.',
      highlights: [
        'Private after-hours Golden Pavilion tour',
        'Master tea ceremony in 400-yr garden',
        'Private Onsen natural hot spring bath',
        'Kyoto Kaiseki culinary journey'
      ],
      amenities: ['Private Onsen', 'Zen Garden', 'Kaiseki Meals', 'Tea Master Guide'],
      svgScene: `
        <svg viewBox="0 0 400 240" class="svg-vector-scene" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="sky-kyoto" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#4c1d95" />
              <stop offset="50%" stop-color="#be185d" />
              <stop offset="100%" stop-color="#fbcfe8" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#sky-kyoto)" />
          <!-- Japanese Sun -->
          <circle cx="120" cy="110" r="55" fill="#f43f5e" opacity="0.85" />
          <!-- Pagoda Silhouette -->
          <polygon points="260,70 300,50 340,70" fill="#0f172a" />
          <rect x="285" y="70" width="30" height="15" fill="#1e293b" />
          <polygon points="250,100 300,80 350,100" fill="#0f172a" />
          <rect x="280" y="100" width="40" height="20" fill="#1e293b" />
          <polygon points="240,135 300,110 360,135" fill="#0f172a" />
          <rect x="270" y="135" width="60" height="30" fill="#1e293b" />
          <!-- Japanese Torii Gate -->
          <rect x="50" y="170" width="10" height="50" fill="#dc2626" />
          <rect x="110" y="170" width="10" height="50" fill="#dc2626" />
          <rect x="40" y="165" width="90" height="10" rx="3" fill="#dc2626" />
          <rect x="35" y="153" width="100" height="10" rx="3" fill="#b91c1c" />
          <!-- Ground & Bamboo Silhouettes -->
          <rect y="210" width="400" height="30" fill="#090d16" />
          <line x1="380" y1="240" x2="375" y2="100" stroke="#047857" stroke-width="5" />
          <line x1="395" y1="240" x2="390" y2="80" stroke="#065f46" stroke-width="6" />
        </svg>
      `
    },
    {
      id: 'dest-safari',
      title: 'Serengeti Golden Savanna Expedition',
      region: 'Tanzania',
      category: 'wildlife',
      rating: 4.99,
      reviewsCount: 110,
      priceUSD: 4100,
      durationDays: 8,
      weather: '28°C Sunset',
      badge: 'Unmatched Wildlife',
      badgeType: 'badge-orange',
      description: 'Follow the Great Migration with luxury canvas glamping, open 4x4 safaris, and sunrise balloon flights.',
      highlights: [
        'Exclusive Big Five game drive safaris',
        'Sunrise hot-air balloon over Serengeti',
        'Luxury canvas lodge with plunge pool',
        'Maasai cultural astronomy experience'
      ],
      amenities: ['4x4 Vehicle', 'Glamping Suites', 'Field Guides', 'All Meals & Wine'],
      svgScene: `
        <svg viewBox="0 0 400 240" class="svg-vector-scene" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="sky-safari" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#7c2d12" />
              <stop offset="40%" stop-color="#ea580c" />
              <stop offset="80%" stop-color="#facc15" />
              <stop offset="100%" stop-color="#fef08a" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#sky-safari)" />
          <circle cx="280" cy="120" r="50" fill="#ffffff" opacity="0.9" />
          <!-- Acacia Tree Silhouettes -->
          <path d="M70,220 Q75,170 85,150 Q50,140 30,120 Q60,110 85,130 Q95,95 120,115 Q140,80 160,110 Q145,135 110,150 Q90,170 85,220 Z" fill="#1c1917" />
          <!-- Savannah Horizon & Elephants -->
          <path d="M0,200 Q200,195 400,200 L400,240 L0,240 Z" fill="#1c1917" />
          <!-- Giraffe silhouette -->
          <path d="M220,190 L223,140 L230,135 L232,142 L227,150 L228,190 Z" fill="#1c1917" />
        </svg>
      `
    },
    {
      id: 'dest-amalfi',
      title: 'Amalfi Coast Villa & Yacht Escape',
      region: 'Positano, Italy',
      category: 'tropical',
      rating: 4.94,
      reviewsCount: 174,
      priceUSD: 3100,
      durationDays: 6,
      weather: '27°C Breeze',
      badge: 'Romantic',
      badgeType: 'badge-purple',
      description: 'Cliffside lemon groves, private Riva speedboat cruising to Capri, and vintage convertible drives.',
      highlights: [
        'Private Riva speedboat day in Capri',
        'Cliffside Michelin dinner in Positano',
        'Ravello historic villa private access',
        'Limoncello masterclass in lemon orchard'
      ],
      amenities: ['Cliffside Sea View', 'Private Yacht Day', 'Concierge', 'Wine Cellar'],
      svgScene: `
        <svg viewBox="0 0 400 240" class="svg-vector-scene" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="sky-amalfi" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0369a1" />
              <stop offset="60%" stop-color="#38bdf8" />
              <stop offset="100%" stop-color="#fde047" />
            </linearGradient>
          </defs>
          <rect width="400" height="160" fill="url(#sky-amalfi)" />
          <rect y="160" width="400" height="80" fill="#0369a1" />
          <!-- Cliffside Hill -->
          <polygon points="0,60 180,180 0,180" fill="#78350f" />
          <polygon points="0,80 140,180 0,180" fill="#9a3412" />
          <!-- Pastel Colored Cliff Houses -->
          <rect x="20" y="90" width="22" height="20" fill="#fca5a5" />
          <rect x="45" y="105" width="25" height="22" fill="#fef08a" />
          <rect x="15" y="115" width="26" height="24" fill="#fed7aa" />
          <rect x="50" y="130" width="30" height="25" fill="#bae6fd" />
          <rect x="85" y="140" width="28" height="22" fill="#fca5a5" />
          <!-- Speedboat -->
          <polygon points="260,195 320,195 300,205 250,205" fill="#ffffff" />
          <polygon points="280,190 300,190 305,195 275,195" fill="#0284c7" />
        </svg>
      `
    },
    {
      id: 'dest-aurora',
      title: 'Tromsø Arctic Aurora Igloo Dome',
      region: 'Norway',
      category: 'arctic',
      rating: 4.97,
      reviewsCount: 130,
      priceUSD: 2950,
      durationDays: 5,
      weather: '-3°C Aurora Visible',
      badge: 'Winter Magic',
      badgeType: 'badge',
      description: 'Sleep under dancing Northern Lights inside heated 360-degree glass igloos with husky sledding adventures.',
      highlights: [
        'Guaranteed private Aurora hunt chase',
        'Husky dog-sledding through fjords',
        'Reindeer feeding & Sámi tent dinner',
        'Nordic sauna & ice plunge experience'
      ],
      amenities: ['360° Glass Roof', 'Heated Floors', 'Sauna Access', 'Aurora Alert System'],
      svgScene: `
        <svg viewBox="0 0 400 240" class="svg-vector-scene" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="sky-aurora" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#020617" />
              <stop offset="60%" stop-color="#0f172a" />
              <stop offset="100%" stop-color="#0369a1" />
            </linearGradient>
            <linearGradient id="aurora-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#00f2c3" stop-opacity="0.1" />
              <stop offset="40%" stop-color="#00f2c3" stop-opacity="0.8" />
              <stop offset="70%" stop-color="#a855f7" stop-opacity="0.7" />
              <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.1" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#sky-aurora)" />
          <!-- Aurora Ribbon -->
          <path d="M-20,50 Q100,10 200,60 T420,30 Q300,110 200,80 T-20,50" fill="url(#aurora-glow)" />
          <path d="M-20,80 Q120,40 240,90 T420,60 Q320,130 180,110 T-20,80" fill="url(#aurora-glow)" opacity="0.6" />
          <!-- Snowy Hills -->
          <path d="M0,180 Q150,140 300,170 T400,160 L400,240 L0,240 Z" fill="#e2e8f0" />
          <!-- Glass Igloo Dome -->
          <ellipse cx="200" cy="195" rx="40" ry="25" fill="#38bdf8" opacity="0.4" stroke="#00f2c3" stroke-width="2" />
          <circle cx="200" cy="190" r="8" fill="#fef08a" opacity="0.9" />
        </svg>
      `
    }
  ];

  // Hotspot Coordinate Points on Map
  const hotspots = [
    { name: 'Reykjavik Geysers', region: 'Iceland', x: '45%', y: '26%', temp: '11°C', tag: 'Volcanic Springs' },
    { name: 'Kyoto Bamboo Sanctum', region: 'Japan', x: '82%', y: '42%', temp: '22°C', tag: 'Cultural Wonder' },
    { name: 'Serengeti Plains', region: 'Tanzania', x: '58%', y: '65%', temp: '28°C', tag: 'Great Migration' },
    { name: 'Bora Bora Lagoon', region: 'Polynesia', x: '18%', y: '72%', temp: '29°C', tag: 'Coral Atoll' },
    { name: 'Swiss Zermatt Peak', region: 'Switzerland', x: '50%', y: '35%', temp: '16°C', tag: 'Alpine Pinnacle' },
    { name: 'Patagonia Torres', region: 'Chile', x: '32%', y: '86%', temp: '8°C', tag: 'Glacier Fjords' }
  ];

  // Price Formatter
  function formatPrice(usdPrice) {
    const { symbol, rate } = currencyRates[currentCurrency];
    const converted = Math.round(usdPrice * rate);
    return `${symbol}${converted.toLocaleString()}`;
  }

  // Toast Notification System
  function showToast(message, icon = 'check') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div style="color: var(--accent-teal);">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // Render Destinations Grid
  const gridContainer = document.getElementById('destinations-grid');
  let currentCategory = 'all';
  let searchQuery = '';

  function renderDestinations() {
    if (!gridContainer) return;

    const filtered = destinations.filter(item => {
      const matchCat = currentCategory === 'all' || item.category === currentCategory;
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
          <h3 style="margin-bottom: 10px; color: var(--text-secondary);">No destinations found</h3>
          <p style="color: var(--text-muted);">Try adjusting your category filter or search keywords.</p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = filtered.map(item => {
      const isFav = favorites.includes(item.id);
      return `
        <div class="destination-card" data-id="${item.id}">
          <div class="card-art-scene">
            ${item.svgScene}
            <span class="badge ${item.badgeType} card-badge">${item.badge}</span>
            <button class="card-fav-btn ${isFav ? 'active' : ''}" onclick="window.toggleFav('${item.id}', this)" aria-label="Save to favorites">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <div class="card-weather-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
              </svg>
              ${item.weather}
            </div>
          </div>

          <div class="card-body">
            <div class="card-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              ${item.region} • ${item.durationDays} Days
            </div>

            <h3 class="card-title">${item.title}</h3>
            <p class="card-desc">${item.description}</p>

            <div class="card-features">
              <div class="feature-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" color="var(--accent-gold)">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <strong>${item.rating}</strong> (${item.reviewsCount})
              </div>
              <div class="feature-pill">•</div>
              <div class="feature-pill">All-Inclusive Luxury</div>
            </div>

            <div class="card-footer">
              <div class="price-box">
                <span class="price-sub">Starting from</span>
                <div class="price-amount">${formatPrice(item.priceUSD)} <span>/ person</span></div>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="window.openQuickView('${item.id}')">
                Explore
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Filter Buttons Handler
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderDestinations();
    });
  });

  // Hero Search Widget Integration
  const searchInput = document.getElementById('search-dest-input');
  const searchStyle = document.getElementById('search-style-select');
  const searchForm = document.getElementById('hero-search-form');

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (searchInput) searchQuery = searchInput.value.trim();
      if (searchStyle && searchStyle.value !== 'all') {
        currentCategory = searchStyle.value;
        filterBtns.forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-category') === currentCategory);
        });
      }
      renderDestinations();
      document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Currency Switcher Handler
  const currencySelect = document.getElementById('currency-select');
  if (currencySelect) {
    currencySelect.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      renderDestinations();
      updatePlannerEstimate();
      showToast(`Currency updated to ${currentCurrency}`);
    });
  }

  // Toggle Favorite
  window.toggleFav = function(id, btn) {
    if (favorites.includes(id)) {
      favorites = favorites.filter(f => f !== id);
      btn.classList.remove('active');
      btn.querySelector('svg').setAttribute('fill', 'none');
      showToast('Removed from saved list');
    } else {
      favorites.push(id);
      btn.classList.add('active');
      btn.querySelector('svg').setAttribute('fill', 'currentColor');
      showToast('Saved to your dream bucket list ❤️');
    }
    localStorage.setItem('voya_favs', JSON.stringify(favorites));
  };

  // Quick View Modal Controller
  const modalOverlay = document.getElementById('quick-modal');
  const modalContent = document.getElementById('modal-dynamic-content');

  window.openQuickView = function(destId) {
    const item = destinations.find(d => d.id === destId);
    if (!item || !modalOverlay || !modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-vector-banner">
        ${item.svgScene}
      </div>
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
        <div>
          <span class="badge ${item.badgeType}" style="margin-bottom: 8px;">${item.badge}</span>
          <h2 style="font-size: 1.8rem;">${item.title}</h2>
          <p style="color: var(--accent-teal); font-weight: 600; font-size: 0.9rem;">${item.region} • ${item.durationDays} Days / ${item.durationDays - 1} Nights</p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 0.8rem; color: var(--text-muted);">From</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: var(--accent-teal);">${formatPrice(item.priceUSD)}</div>
        </div>
      </div>

      <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">${item.description}</p>

      <h4 style="margin-bottom: 12px; font-size: 1.1rem;">Curated Itinerary Highlights</h4>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px;">
        ${item.highlights.map((h, i) => `
          <div style="display: flex; align-items: center; gap: 10px; font-size: 0.9rem; color: var(--text-primary);">
            <div style="width: 20px; height: 20px; border-radius: 50%; background: rgba(0, 242, 195, 0.15); color: var(--accent-teal); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800;">${i + 1}</div>
            <span>${h}</span>
          </div>
        `).join('')}
      </div>

      <h4 style="margin-bottom: 12px; font-size: 1.1rem;">Included Amenities</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px;">
        ${item.amenities.map(a => `
          <span style="background: rgba(255,255,255,0.05); border: 1px solid var(--border-subtle); padding: 6px 12px; border-radius: var(--radius-sm); font-size: 0.8rem; color: var(--text-secondary);">
            ✓ ${a}
          </span>
        `).join('')}
      </div>

      <div style="display: flex; gap: 12px; justify-content: flex-end;">
        <button class="btn btn-secondary" onclick="window.closeModal()">Close</button>
        <button class="btn btn-primary" onclick="window.openBookingModal('${item.id}')">
          Reserve Expedition
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    `;

    modalOverlay.classList.add('active');
  };

  window.closeModal = function() {
    if (modalOverlay) modalOverlay.classList.remove('active');
    const bookModal = document.getElementById('booking-modal');
    if (bookModal) bookModal.classList.remove('active');
  };

  // Booking Modal Controller
  let selectedDestination = null;
  let guestCount = 2;

  window.openBookingModal = function(destId) {
    window.closeModal();
    selectedDestination = destinations.find(d => d.id === destId) || destinations[0];
    const bookModal = document.getElementById('booking-modal');
    const bookContent = document.getElementById('booking-dynamic-content');
    if (!bookModal || !bookContent) return;

    updateBookingModalView();
    bookModal.classList.add('active');
  };

  function updateBookingModalView() {
    const bookContent = document.getElementById('booking-dynamic-content');
    if (!bookContent || !selectedDestination) return;

    const baseCost = selectedDestination.priceUSD * guestCount;

    bookContent.innerHTML = `
      <div style="margin-bottom: 20px;">
        <span class="badge" style="margin-bottom: 6px;">Expedition Reservation</span>
        <h2>${selectedDestination.title}</h2>
        <p style="color: var(--text-muted); font-size: 0.9rem;">${selectedDestination.region} • ${selectedDestination.durationDays} Days</p>
      </div>

      <form id="expedition-booking-form" onsubmit="window.submitBooking(event)" style="display: flex; flex-direction: column; gap: 18px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">Departure Date</label>
            <input type="date" required style="width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--border-card); border-radius: var(--radius-sm); padding: 10px; color: var(--text-primary); margin-top: 6px; font-family: var(--font-main);" value="2026-09-15" />
          </div>
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">Number of Guests</label>
            <div style="display: flex; align-items: center; gap: 12px; margin-top: 6px;">
              <button type="button" class="btn btn-secondary btn-sm" onclick="window.changeGuests(-1)">-</button>
              <span style="font-weight: 700; font-size: 1.1rem; min-width: 24px; text-align: center;">${guestCount}</span>
              <button type="button" class="btn btn-secondary btn-sm" onclick="window.changeGuests(1)">+</button>
            </div>
          </div>
        </div>

        <div>
          <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">Traveler Full Name</label>
          <input type="text" placeholder="e.g. Alexandra Bennett" required style="width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--border-card); border-radius: var(--radius-sm); padding: 10px; color: var(--text-primary); margin-top: 6px;" />
        </div>

        <div>
          <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">Email for Concierge Confirmation</label>
          <input type="email" placeholder="alexandra@luxurytravel.com" required style="width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--border-card); border-radius: var(--radius-sm); padding: 10px; color: var(--text-primary); margin-top: 6px;" />
        </div>

        <div style="background: rgba(6, 9, 19, 0.6); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem;">
            <span style="color: var(--text-secondary);">${guestCount}x Luxury Package</span>
            <span>${formatPrice(baseCost)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem;">
            <span style="color: var(--text-secondary);">VIP Concierge & Taxes</span>
            <span style="color: var(--accent-teal);">Included</span>
          </div>
          <div style="border-top: 1px solid var(--border-subtle); padding-top: 10px; display: flex; justify-content: space-between; font-weight: 800; font-size: 1.15rem;">
            <span>Estimated Total:</span>
            <span style="color: var(--accent-teal);">${formatPrice(baseCost)}</span>
          </div>
        </div>

        <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 10px;">
          <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">
            Confirm VIP Booking
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
        </div>
      </form>
    `;
  }

  window.changeGuests = function(delta) {
    const next = guestCount + delta;
    if (next >= 1 && next <= 10) {
      guestCount = next;
      updateBookingModalView();
    }
  };

  window.submitBooking = function(e) {
    e.preventDefault();
    const confCode = 'VOYA-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const bookContent = document.getElementById('booking-dynamic-content');
    if (bookContent) {
      bookContent.innerHTML = `
        <div style="text-align: center; padding: 30px 10px;">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(0,242,195,0.15); border: 2px solid var(--accent-teal); color: var(--accent-teal); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span class="badge" style="margin-bottom: 12px;">Reservation Confirmed</span>
          <h2 style="margin-bottom: 10px;">You're Embarking to ${selectedDestination.title}!</h2>
          <p style="color: var(--text-secondary); max-width: 440px; margin: 0 auto 24px; font-size: 0.95rem;">
            Your dedicated Voya private concierge has received your itinerary details. A personalized dossier has been dispatched to your email.
          </p>
          <div style="background: rgba(255,255,255,0.03); border: 1px dashed var(--accent-teal); border-radius: var(--radius-md); padding: 14px; max-width: 320px; margin: 0 auto 28px;">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Booking Reference ID</div>
            <div style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; color: var(--accent-teal); letter-spacing: 0.05em;">${confCode}</div>
          </div>
          <button class="btn btn-primary" onclick="window.closeModal()">Back to Explorations</button>
        </div>
      `;
    }
    showToast('Reservation confirmed! Dossier sent to your email.');
  };

  // Close modals on Escape key or backdrop click
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeModal();
  });

  [modalOverlay, document.getElementById('booking-modal')].forEach(overlay => {
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) window.closeModal();
      });
    }
  });

  // AI ITINERARY GENERATOR WIZARD
  let plannerStyle = 'alpine';
  let plannerDays = 6;
  let plannerPace = 'balanced';

  const styleChoices = document.querySelectorAll('.style-choice');
  styleChoices.forEach(choice => {
    choice.addEventListener('click', () => {
      styleChoices.forEach(c => c.classList.remove('active'));
      choice.classList.add('active');
      plannerStyle = choice.getAttribute('data-style');
      updatePlannerEstimate();
    });
  });

  const durationSlider = document.getElementById('planner-duration-slider');
  const durationDisplay = document.getElementById('planner-duration-val');
  if (durationSlider && durationDisplay) {
    durationSlider.addEventListener('input', (e) => {
      plannerDays = parseInt(e.target.value);
      durationDisplay.textContent = `${plannerDays} Days`;
      updatePlannerEstimate();
    });
  }

  const plannerItineraryBox = document.getElementById('planner-itinerary-output');
  const plannerCostBox = document.getElementById('planner-cost-output');

  const itineraryDataStore = {
    alpine: [
      { day: 1, title: 'Arrival & Private Glacier Helicopter Transfer', desc: 'Touch down at Zurich and scenic heli-lift straight to Zermatt luxury chalet.' },
      { day: 2, title: 'Matterhorn Alpine Ridge Trek & Fondue', desc: 'Guided panoramic ridge exploration followed by high-altitude artisan fondue lunch.' },
      { day: 3, title: 'Glacier Cave Exploration & Thermal Spa', desc: 'Private entry into natural ice palaces and twilight thermal mineral baths.' },
      { day: 4, title: 'High-Altitude Cogwheel Scenic Railway', desc: 'Ascend to Gornergrat observatory with panoramic view of 29 alpine peaks.' },
      { day: 5, title: 'Wildflower Valleys & Artisan Cheese Workshop', desc: 'Hike through secluded Swiss pastures and meet master cheesemakers.' },
      { day: 6, title: 'Farewell Gala & Private Stargazing Deck', desc: 'Private five-course degustation menu prepared by private mountain chef.' }
    ],
    tropical: [
      { day: 1, title: 'Seaplane Arrival over Atolls', desc: 'Panoramic aerial flight landing directly at your luxury overwater villa.' },
      { day: 2, title: 'Manta Ray Coral Lagoon Dive', desc: 'Private marine biologist guided excursion across bioluminescent reefs.' },
      { day: 3, title: 'Deserted Sandbank Champagne Picnic', desc: 'Speedboat drop-off on an uninhabited sandbar for a private gourmet lunch.' },
      { day: 4, title: 'Sunset Traditional Catamaran Sail', desc: 'Catch the golden hour across the open Pacific with freshly caught sashimi.' },
      { day: 5, title: 'Polynesian Botanical Spa Journey', desc: 'Traditional coconut oil and monoi holistic therapy in an open-air pavilion.' },
      { day: 6, title: 'Starlit Beachfire Farewell Dinner', desc: 'Private chef barbecue right on the water’s edge beneath the Southern Cross.' }
    ],
    cultural: [
      { day: 1, title: 'Imperial Ryokan Welcome & Onsen', desc: 'Check in to a 300-year-old preserved cedar estate with natural volcanic springs.' },
      { day: 2, title: 'Private Bamboo Forest & Temple Access', desc: 'Exclusive sunrise access to Arashiyama groves before public hours.' },
      { day: 3, title: 'Master Tea Ceremony & Kimono Craft', desc: 'One-on-one session with 15th-generation Urasenke tea masters.' },
      { day: 4, title: 'Nara Ancient Deer & Wooden Shrine Walk', desc: 'Stroll ancient cedar paths and historical UNESCO wooden structures.' },
      { day: 5, title: 'Kaiseki 9-Course Culinary Masterclass', desc: 'Shop local Nishiki market with master chef and cook seasonal delicacies.' },
      { day: 6, title: 'Zen Meditation & Monastic Gardens', desc: 'Guided contemplation session inside Daitoku-ji rock gardens.' }
    ],
    wildlife: [
      { day: 1, title: 'Bush Plane Landing in Serengeti', desc: 'Direct airstrip arrival and immediate afternoon savanna game drive.' },
      { day: 2, title: 'The Great Migration River Crossing', desc: 'Witness thousands of wildebeest and predator river action from a private 4x4.' },
      { day: 3, title: 'Sunrise Hot-Air Balloon over the Plains', desc: 'Floating silently over waking lion prides followed by champagne bush breakfast.' },
      { day: 4, title: 'Maasai Warrior Trackers Bush Walk', desc: 'Learn medicinal plants, animal tracking, and traditional survival skills.' },
      { day: 5, title: 'Ngorongoro Crater Deep Descent', desc: 'Full-day safari in the volcanic caldera looking for the rare Black Rhino.' },
      { day: 6, title: 'Campfire Astronomy & Wilderness Farewell', desc: 'Listen to lion calls beneath the equatorial Milky Way with fine South African wine.' }
    ]
  };

  function updatePlannerEstimate() {
    if (!plannerItineraryBox) return;

    const list = itineraryDataStore[plannerStyle] || itineraryDataStore.alpine;
    const activeDays = list.slice(0, Math.min(plannerDays, list.length));

    // Dynamic cost multiplier
    const baseDaily = plannerStyle === 'wildlife' ? 520 : plannerStyle === 'tropical' ? 490 : 440;
    const totalEst = baseDaily * plannerDays;

    if (plannerCostBox) {
      plannerCostBox.textContent = formatPrice(totalEst);
    }

    plannerItineraryBox.innerHTML = activeDays.map(item => `
      <div class="day-timeline-item">
        <div class="day-bullet">${item.day}</div>
        <div class="day-content">
          <div class="day-title">Day ${item.day}: ${item.title}</div>
          <div class="day-desc">${item.desc}</div>
        </div>
      </div>
    `).join('');
  }

  // Interactive Hotspot Map Pins
  const mapHotspotContainer = document.getElementById('map-hotspots-container');
  const hotspotInfoName = document.getElementById('hotspot-name');
  const hotspotInfoRegion = document.getElementById('hotspot-region');
  const hotspotInfoTemp = document.getElementById('hotspot-temp');
  const hotspotInfoTag = document.getElementById('hotspot-tag');

  if (mapHotspotContainer) {
    mapHotspotContainer.innerHTML = hotspots.map((spot, index) => `
      <div class="map-pin ${index === 0 ? 'active' : ''}" style="left: ${spot.x}; top: ${spot.y};" onclick="window.selectHotspot(${index}, this)">
        <div class="pin-pulse"></div>
        <div class="pin-core"></div>
        <div class="pin-tooltip">${spot.name} (${spot.temp})</div>
      </div>
    `).join('');
  }

  window.selectHotspot = function(index, pinElem) {
    document.querySelectorAll('.map-pin').forEach(p => p.classList.remove('active'));
    if (pinElem) pinElem.classList.add('active');

    const spot = hotspots[index];
    if (spot) {
      if (hotspotInfoName) hotspotInfoName.textContent = spot.name;
      if (hotspotInfoRegion) hotspotInfoRegion.textContent = spot.region;
      if (hotspotInfoTemp) hotspotInfoTemp.textContent = spot.temp;
      if (hotspotInfoTag) hotspotInfoTag.textContent = spot.tag;
    }
  };

  // Newsletter Form & VIP Voucher
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = 'VOYA-VIP-' + Math.floor(1000 + Math.random() * 9000);
      showToast(`Welcome to Voya Elite! Voucher applied: ${code}`);
      const btn = newsletterForm.querySelector('button');
      if (btn) btn.innerHTML = 'Claimed ✓';
    });
  }

  // Navbar scroll background effect
  const siteHeader = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (siteHeader) {
      if (window.scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('open'));
    });
  }

  // Theme Switcher Controller (Dark / Light Sanctuary Mode)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const iconSun = document.getElementById('theme-icon-sun');
  const iconMoon = document.getElementById('theme-icon-moon');

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (iconSun) iconSun.style.display = 'block';
      if (iconMoon) iconMoon.style.display = 'none';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (iconSun) iconSun.style.display = 'none';
      if (iconMoon) iconMoon.style.display = 'block';
    }
  }

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('voya_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isCurrentlyLight = document.documentElement.getAttribute('data-theme') === 'light';
      const newTheme = isCurrentlyLight ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('voya_theme', newTheme);
      showToast(newTheme === 'light' ? 'Switched to Light Daylight Mode ☀️' : 'Switched to Dark Luxury Mode 🌙');
    });
  }

  // Initial render
  renderDestinations();
  updatePlannerEstimate();
});
