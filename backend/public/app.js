// Elite Events Hub - Web App (Hardcoded 45 Events)
// ================================================
// No backend API needed - all data is local

let currentView = 'feed';
let currentCategory = 'all';
let currentUser = null;
let autoLogoutTimer = null;
const AUTO_LOGOUT_MS = 25 * 60 * 1000; // 25 minutes

// ===== HARDCODED 45 EVENTS =====
const EVENTS = [
  {
    id: '1',
    title: "Christie's Important Watches",
    date: 'Jun 12, 2026',
    location: 'New York',
    price: 'Est. $800K-$1.6M',
    category: 'auctions',
    tags: ['Watches', 'Patek Philippe'],
    ticketUrl: 'https://christies.com/en/auction/important-watches-26076'
  },
  {
    id: '2',
    title: "Sotheby's High Jewelry",
    date: 'Sep 17, 2026',
    location: 'Hong Kong',
    price: 'Est. $2M+',
    category: 'auctions',
    tags: ['Jewelry', 'Cartier'],
    ticketUrl: 'https://sothebys.com/en/auctions/high-jewelry'
  },
  {
    id: '3',
    title: 'Monaco Grand Prix 2026',
    date: 'Jun 5-7, 2026',
    location: 'Monte Carlo',
    price: 'EUR 4,000+',
    category: 'sports',
    tags: ['F1', 'Yacht Viewing'],
    ticketUrl: 'https://monaco-grandprix.com'
  },
  {
    id: '4',
    title: 'Wimbledon Championships',
    date: 'Jun 29 - Jul 12, 2026',
    location: 'London',
    price: 'GBP 3,395pp',
    category: 'sports',
    tags: ['Tennis', 'Debenture'],
    ticketUrl: 'https://eventsinternational.co.uk/wimbledon'
  },
  {
    id: '5',
    title: 'Monaco Yacht Show 2026',
    date: 'Sep 23-26, 2026',
    location: 'Port Hercule',
    price: 'EUR 400-EUR 2,070',
    category: 'yachts',
    tags: ['Superyachts', 'VIP'],
    ticketUrl: 'https://monacoyachtshow.com'
  },
  {
    id: '6',
    title: "RM Sotheby's Monterey",
    date: 'Aug 14, 2026',
    location: 'California',
    price: 'Est. $5M+',
    category: 'auctions',
    tags: ['Cars', 'Ferrari'],
    ticketUrl: 'https://rmsothebys.com'
  },
  {
    id: '7',
    title: 'Polo Gold Cup',
    date: 'Jul 18-24, 2026',
    location: 'St. Moritz',
    price: 'CHF 2,500+',
    category: 'sports',
    tags: ['Polo', 'Snow'],
    ticketUrl: '#'
  },
  {
    id: '8',
    title: "Sotheby's Contemporary Evening",
    date: 'Sep 29, 2026',
    location: 'Hong Kong',
    price: 'Est. $10M+',
    category: 'auctions',
    tags: ['Art', 'Contemporary'],
    ticketUrl: 'https://sothebys.com'
  },
  {
    id: '9',
    title: 'Art Basel Miami Beach',
    date: 'Dec 3-6, 2026',
    location: 'Miami',
    price: '$75-$500',
    category: 'arts',
    tags: ['Art', 'Contemporary'],
    ticketUrl: 'https://artbasel.com'
  },
  {
    id: '10',
    title: 'Dubai World Cup',
    date: 'Mar 28, 2027',
    location: 'Dubai',
    price: 'AED 2,500+',
    category: 'sports',
    tags: ['Horse Racing', 'VIP'],
    ticketUrl: '#'
  },
  {
    id: '11',
    title: 'Cannes Film Festival',
    date: 'May 12-23, 2027',
    location: 'Cannes',
    price: 'EUR 3,000+',
    category: 'experiences',
    tags: ['Film', 'VIP'],
    ticketUrl: '#'
  },
  {
    id: '12',
    title: 'Singapore Yacht Show',
    date: 'Apr 23-26, 2027',
    location: 'Singapore',
    price: 'S$500+',
    category: 'yachts',
    tags: ['Superyachts', 'Asia'],
    ticketUrl: '#'
  },
  {
    id: '13',
    title: 'US Open Tennis Championships',
    date: 'Aug 31 - Sep 13, 2026',
    location: 'New York',
    price: '$600+',
    category: 'sports',
    tags: ['Tennis', 'Grand Slam'],
    ticketUrl: 'https://usopen.org'
  },
  {
    id: '14',
    title: 'Cannes Yachting Festival',
    date: 'Sep 8-13, 2026',
    location: 'Cannes',
    price: 'EUR 75+',
    category: 'yachts',
    tags: ['Superyachts', 'Mediterranean'],
    ticketUrl: 'https://cannesyachtingfestival.com'
  },
  {
    id: '15',
    title: 'Canelo vs Bivol II',
    date: 'Sep 19, 2026',
    location: 'Las Vegas',
    price: '$1,200+',
    category: 'sports',
    tags: ['Boxing', 'Title Fight'],
    ticketUrl: '#'
  },
  {
    id: '16',
    title: 'Bonhams Quail Lodge Auction',
    date: 'Aug 15, 2026',
    location: 'Carmel Valley',
    price: 'Est. $12M+',
    category: 'auctions',
    tags: ['Cars', 'Bonhams'],
    ticketUrl: 'https://bonhams.com/quail-lodge'
  },
  {
    id: '17',
    title: "Concours d'Elegance Pebble Beach",
    date: 'Aug 16, 2026',
    location: 'Pebble Beach',
    price: '$750+',
    category: 'experiences',
    tags: ['Cars', 'Classic'],
    ticketUrl: 'https://pebblebeachconcours.net'
  },
  {
    id: '18',
    title: 'Phillips New York Watch Auction XI',
    date: 'Aug 22, 2026',
    location: 'New York',
    price: 'Est. $3M+',
    category: 'auctions',
    tags: ['Watches', 'Phillips'],
    ticketUrl: 'https://phillips.com'
  },
  {
    id: '19',
    title: 'Heritage Luxury Accessories',
    date: 'Aug 25, 2026',
    location: 'Dallas',
    price: 'Est. $1.5M+',
    category: 'auctions',
    tags: ['Bags', 'Hermès'],
    ticketUrl: 'https://heritageauctions.com'
  },
  {
    id: '20',
    title: 'Antiquorum Geneva Watch Auction',
    date: 'Sep 26, 2026',
    location: 'Geneva',
    price: 'Est. CHF 2M+',
    category: 'auctions',
    tags: ['Watches', 'Vintage'],
    ticketUrl: 'https://antiquorum.swiss'
  },
  {
    id: '21',
    title: 'F1 Singapore Grand Prix',
    date: 'Oct 4, 2026',
    location: 'Singapore',
    price: 'S$1,500+',
    category: 'sports',
    tags: ['F1', 'Night Race'],
    ticketUrl: 'https://singaporegp.sg'
  },
  {
    id: '22',
    title: 'Frieze London',
    date: 'Oct 8-11, 2026',
    location: 'London',
    price: '£40+',
    category: 'arts',
    tags: ['Art', 'Contemporary'],
    ticketUrl: 'https://frieze.com'
  },
  {
    id: '23',
    title: 'Art Basel Paris',
    date: 'Oct 16-19, 2026',
    location: 'Paris',
    price: '$75-$500',
    category: 'arts',
    tags: ['Art', 'Contemporary'],
    ticketUrl: 'https://artbasel.com/paris'
  },
  {
    id: '24',
    title: 'Fort Lauderdale Boat Show',
    date: 'Oct 28 - Nov 1, 2026',
    location: 'Fort Lauderdale',
    price: '$150+',
    category: 'yachts',
    tags: ['Superyachts', 'Americas'],
    ticketUrl: 'https://flibs.com'
  },
  {
    id: '25',
    title: "Christie's Hong Kong Autumn Auctions",
    date: 'Oct 24, 2026',
    location: 'Hong Kong',
    price: 'Est. $15M+',
    category: 'auctions',
    tags: ['Art', 'Asia'],
    ticketUrl: 'https://christies.com'
  },
  {
    id: '26',
    title: 'Paris Fashion Week SS27',
    date: 'Oct 1-9, 2026',
    location: 'Paris',
    price: 'EUR 500+',
    category: 'experiences',
    tags: ['Fashion', 'Haute Couture'],
    ticketUrl: '#'
  },
  {
    id: '27',
    title: 'Phillips Geneva Watch Auction XVIII',
    date: 'Nov 8, 2026',
    location: 'Geneva',
    price: 'Est. CHF 8M+',
    category: 'auctions',
    tags: ['Watches', 'Phillips'],
    ticketUrl: 'https://phillips.com'
  },
  {
    id: '28',
    title: "Sotheby's Contemporary Evening NY",
    date: 'Nov 18, 2026',
    location: 'New York',
    price: 'Est. $20M+',
    category: 'auctions',
    tags: ['Art', 'Contemporary'],
    ticketUrl: 'https://sothebys.com'
  },
  {
    id: '29',
    title: 'Abu Dhabi Grand Prix',
    date: 'Nov 29, 2026',
    location: 'Yas Marina',
    price: 'AED 2,500+',
    category: 'sports',
    tags: ['F1', 'Season Finale'],
    ticketUrl: 'https://yasmarinacircuit.com'
  },
  {
    id: '30',
    title: 'Milan Fashion Week SS27',
    date: 'Nov 18-24, 2026',
    location: 'Milan',
    price: 'EUR 400+',
    category: 'experiences',
    tags: ['Fashion', 'Luxury'],
    ticketUrl: '#'
  },
  {
    id: '31',
    title: 'Wine Spectator Auction',
    date: 'Nov 12, 2026',
    location: 'New York',
    price: 'Est. $500K+',
    category: 'auctions',
    tags: ['Wine', 'Bordeaux'],
    ticketUrl: 'https://zachys.com'
  },
  {
    id: '32',
    title: "Christie's Magnificent Jewels",
    date: 'Dec 8, 2026',
    location: 'New York',
    price: 'Est. $8M+',
    category: 'auctions',
    tags: ['Jewelry', 'Diamonds'],
    ticketUrl: 'https://christies.com'
  },
  {
    id: '33',
    title: "Nobu Miami New Year's Eve",
    date: 'Dec 31, 2026',
    location: 'Miami',
    price: '$2,500+',
    category: 'experiences',
    tags: ['Dining', 'NYE'],
    ticketUrl: '#'
  },
  {
    id: '34',
    title: 'Frieze Los Angeles',
    date: 'Dec 10-13, 2026',
    location: 'Los Angeles',
    price: '$50+',
    category: 'arts',
    tags: ['Art', 'Contemporary'],
    ticketUrl: 'https://frieze.com'
  },
  {
    id: '35',
    title: 'Australian Open',
    date: 'Jan 18-31, 2027',
    location: 'Melbourne',
    price: 'AUD 500+',
    category: 'sports',
    tags: ['Tennis', 'Grand Slam'],
    ticketUrl: 'https://ausopen.com'
  },
  {
    id: '36',
    title: 'Superyacht Miami',
    date: 'Jan 15-18, 2027',
    location: 'Miami',
    price: '$250+',
    category: 'yachts',
    tags: ['Superyachts', 'Americas'],
    ticketUrl: 'https://superyachtmiami.com'
  },
  {
    id: '37',
    title: 'Davos World Economic Forum',
    date: 'Jan 20-24, 2027',
    location: 'Davos',
    price: 'Invitation Only',
    category: 'experiences',
    tags: ['Business', 'Networking'],
    ticketUrl: '#'
  },
  {
    id: '38',
    title: 'New York Fashion Week FW27',
    date: 'Feb 12-18, 2027',
    location: 'New York',
    price: '$300+',
    category: 'experiences',
    tags: ['Fashion', 'NYFW'],
    ticketUrl: '#'
  },
  {
    id: '39',
    title: 'NBA All-Star Weekend',
    date: 'Feb 14-16, 2027',
    location: 'Indianapolis',
    price: '$800+',
    category: 'sports',
    tags: ['Basketball', 'All-Star'],
    ticketUrl: 'https://nba.com'
  },
  {
    id: '40',
    title: 'Dubai International Boat Show',
    date: 'Mar 10-14, 2027',
    location: 'Dubai',
    price: 'AED 150+',
    category: 'yachts',
    tags: ['Superyachts', 'Middle East'],
    ticketUrl: 'https://dubaiboatshow.com'
  },
  {
    id: '41',
    title: 'TEFAF Maastricht',
    date: 'Mar 12-21, 2027',
    location: 'Maastricht',
    price: 'EUR 50+',
    category: 'arts',
    tags: ['Art', 'Fine Art'],
    ticketUrl: 'https://tefaf.com'
  },
  {
    id: '42',
    title: 'Bonhams Bond Street Jewels',
    date: 'Mar 15, 2027',
    location: 'London',
    price: 'Est. £800K+',
    category: 'auctions',
    tags: ['Jewelry', 'Bonhams'],
    ticketUrl: 'https://bonhams.com'
  },
  {
    id: '43',
    title: 'Art Basel Hong Kong',
    date: 'Mar 25-27, 2027',
    location: 'Hong Kong',
    price: '$75-$500',
    category: 'arts',
    tags: ['Art', 'Contemporary'],
    ticketUrl: 'https://artbasel.com/hong-kong'
  },
  {
    id: '44',
    title: 'The Masters Tournament',
    date: 'Apr 5-11, 2027',
    location: 'Augusta',
    price: '$3,000+',
    category: 'sports',
    tags: ['Golf', 'Major'],
    ticketUrl: 'https://masters.com'
  },
  {
    id: '45',
    title: 'Coachella VIP Weekend 1',
    date: 'Apr 10-12, 2027',
    location: 'Indio',
    price: '$3,500+',
    category: 'experiences',
    tags: ['Music', 'Festival'],
    ticketUrl: 'https://coachella.com'
  }
];

const RAZORPAY_KEY_ID = 'rzp_test_YOUR_KEY_HERE';

// ===== HELPERS =====
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setButtonLoading(btn, text) {
  btn.dataset.originalText = btn.innerHTML;
  btn.innerHTML = `<span style="display:flex;align-items:center;justify-content:center;gap:6px;">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite;">
      <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
    </svg>
    ${text}
  </span>`;
  btn.disabled = true;
}

function resetButton(btn) {
  if (btn.dataset.originalText) {
    btn.innerHTML = btn.dataset.originalText;
  }
  btn.disabled = false;
}

// ===== AUTO LOGOUT =====
function startAutoLogoutTimer() {
  clearTimeout(autoLogoutTimer);
  autoLogoutTimer = setTimeout(() => {
    showToast('Session expired. Logging out...');
    setTimeout(() => handleLogout(true), 2000);
  }, AUTO_LOGOUT_MS);
}

function resetAutoLogoutTimer() {
  startAutoLogoutTimer();
}

function setupActivityListeners() {
  const events = ['click', 'keypress', 'scroll', 'touchstart', 'mousemove'];
  events.forEach(evt => {
    document.addEventListener(evt, resetAutoLogoutTimer, { passive: true });
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  setupActivityListeners();
  startAutoLogoutTimer();
  renderFeed();
  updateTierBadge();
});

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Category tabs
  document.querySelectorAll('.category-tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.category-tabs .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category || 'all';
      if (currentView === 'feed') renderFeed();
    });
  });

  // Bottom nav
  document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.bottom-nav .nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      switchView(item.dataset.view || 'feed');
    });
  });

  // Logout button
  document.getElementById('btn-logout')?.addEventListener('click', () => handleLogout(false));
}

// ===== VIEW SWITCHING =====
function switchView(view) {
  currentView = view;
  const main = document.getElementById('main-content');
  if (!main) return;
  main.innerHTML = '';
  main.scrollTop = 0;
  switch(view) {
    case 'feed': renderFeed(); break;
    case 'calendar': renderCalendar(); break;
    case 'settings': renderSettings(); break;
    default: renderFeed();
  }
}

// ===== AUTH SCREEN =====
function showAuthScreen() {
  const authScreen = document.getElementById('auth-screen');
  const mainApp = document.getElementById('main-app');
  if (authScreen) authScreen.style.display = 'block';
  if (mainApp) mainApp.style.display = 'none';
}

function showMainApp() {
  const authScreen = document.getElementById('auth-screen');
  const mainApp = document.getElementById('main-app');
  if (authScreen) authScreen.style.display = 'none';
  if (mainApp) mainApp.style.display = 'flex';
}

// ===== RENDER FEED =====
function renderFeed() {
  const main = document.getElementById('main-content');
  if (!main) return;

  const userTier = localStorage.getItem('tier') || 'free';
  const filtered = currentCategory === 'all'
    ? EVENTS
    : EVENTS.filter(e => e.category === currentCategory);

  const freeLimit = 5;
  const showBanner = userTier === 'free';
  const displayEvents = userTier === 'free' ? filtered.slice(0, freeLimit) : filtered;

  let html = '<div class="view-section">';

  if (showBanner) {
    html += `
      <div class="upgrade-banner">
        <div class="upgrade-text">
          Unlock <strong>all ${EVENTS.length} premium events</strong><br>and VIP early access alerts
        </div>
        <button class="upgrade-btn" id="btn-upgrade-banner">Upgrade</button>
      </div>
    `;
  }

  html += displayEvents.map(event => `
    <div class="event-card" data-event-id="${event.id}">
      <div class="event-header">
        <div class="event-title">${event.title}</div>
        <div class="event-price">${event.price}</div>
      </div>
      <div class="event-meta">
        <span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          ${event.date}
        </span>
        <span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          ${event.location}
        </span>
      </div>
      <div>
        ${event.tags.map(t => `<span class="event-tag tag-${event.category}">${t}</span>`).join('')}
      </div>
      <div class="cta-row">
        <button class="btn btn-primary btn-ticket" data-url="${event.ticketUrl}">Get tickets</button>
        <button class="btn btn-secondary btn-remind" data-id="${event.id}">Remind me</button>
      </div>
    </div>
  `).join('');

  html += '</div>';

  if (userTier === 'free' && filtered.length > freeLimit) {
    html += `
      <div style="text-align:center;padding:20px 0 40px;color:var(--text-muted);font-size:13px;">
        <div style="margin-bottom:8px;font-size:16px;color:var(--gold);font-weight:600;">+${filtered.length - freeLimit} more events</div>
        <span style="color:var(--gold);cursor:pointer;text-decoration:underline;" id="btn-upgrade-link">Upgrade to see all</span>
      </div>
    `;
  }

  main.innerHTML = html;
  attachButtonListeners();
}

function attachButtonListeners() {
  document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn')) return;
      const eventId = card.dataset.eventId;
      if (eventId) showEventDetail(eventId);
    });
  });

  document.querySelectorAll('.btn-ticket').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openTicket(btn.dataset.url);
    });
  });

  document.querySelectorAll('.btn-remind').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setReminder(btn.dataset.id);
    });
  });

  const upgradeBanner = document.getElementById('btn-upgrade-banner');
  if (upgradeBanner) {
    upgradeBanner.addEventListener('click', (e) => {
      e.stopPropagation();
      renderSubscribe();
    });
  }

  const upgradeLink = document.getElementById('btn-upgrade-link');
  if (upgradeLink) {
    upgradeLink.addEventListener('click', (e) => {
      e.stopPropagation();
      renderSubscribe();
    });
  }
}

// ===== SUBSCRIBE / PRICING =====
function renderSubscribe() {
  const main = document.getElementById('main-content');
  if (!main) return;

  main.innerHTML = `
    <div class="view-section">
      <button class="back-btn" id="btn-sub-back">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to events
      </button>

      <div style="text-align:center;margin-bottom:20px;">
        <img src="assets/logo.png" style="width:48px;height:48px;border-radius:10px;margin-bottom:10px;border:1px solid rgba(201,162,39,0.3);" alt="EEH">
        <div style="color:var(--text-primary);font-size:18px;font-weight:600;margin-bottom:4px;">Go Premium</div>
        <div style="color:var(--text-muted);font-size:12px;">Unlock exclusive events, VIP alerts, and direct booking links</div>
      </div>

      <div class="price-row">
        <div class="price-card">
          <div style="color:var(--text-muted);font-size:12px;">Monthly</div>
          <div class="price-amount">Rs.999</div>
          <div class="price-period">per month</div>
          <button class="btn btn-secondary btn-choose-plan" data-plan="monthly" style="margin-top:12px;width:100%;">Choose</button>
        </div>
        <div class="price-card featured">
          <div style="color:var(--gold);font-size:12px;font-weight:600;">Yearly</div>
          <div class="price-amount">Rs.9,988</div>
          <div class="price-period">per year</div>
          <div class="price-save">Save Rs.2,000</div>
          <button class="btn btn-primary btn-choose-plan" data-plan="yearly" style="margin-top:8px;width:100%;">Choose</button>
        </div>
      </div>

      <div style="margin-top:24px;display:flex;flex-direction:column;gap:12px;">
        ${[
          'Unlimited event access across all categories',
          'Instant official ticket purchase links',
          'VIP early access alerts (24h before public)',
          'Personalized concierge recommendations',
          'WhatsApp/SMS alerts for flash sales',
          'Ad-free premium experience'
        ].map(f => `
          <div style="display:flex;align-items:center;gap:10px;color:var(--text-secondary);font-size:12px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            ${f}
          </div>
        `).join('')}
      </div>

      <div style="margin-top:24px;padding:12px;background:rgba(255,255,255,0.02);border-radius:var(--radius-sm);border:1px solid var(--border);text-align:center;">
        <div style="color:var(--text-muted);font-size:11px;">Secure payment powered by</div>
        <div style="display:flex;justify-content:center;gap:16px;margin-top:8px;">
          <span style="color:var(--gold);font-size:12px;font-weight:600;">Razorpay</span>
          <span style="color:var(--text-muted);">|</span>
          <span style="color:#6772e5;font-size:12px;font-weight:600;">Stripe</span>
        </div>
      </div>
    </div>
  `;

  document.getElementById('btn-sub-back')?.addEventListener('click', () => switchView('feed'));

  document.querySelectorAll('.btn-choose-plan').forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.dataset.plan;
      initiatePayment(plan);
    });
  });
}

function initiatePayment(plan) {
  const main = document.getElementById('main-content');
  if (!main) return;

  const planName = plan === 'yearly' ? 'Yearly Premium' : 'Monthly Premium';
  const amount = plan === 'yearly' ? '9,988' : '999';

  main.innerHTML = `
    <div class="view-section">
      <button class="back-btn" id="btn-pay-back">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </button>

      <div style="text-align:center;margin-bottom:20px;">
        <div style="color:var(--text-primary);font-size:16px;font-weight:600;margin-bottom:4px;">Complete payment</div>
        <div style="color:var(--text-muted);font-size:12px;">Secure 256-bit SSL encrypted</div>
      </div>

      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:16px;margin-bottom:16px;">
        <div style="color:var(--text-muted);font-size:11px;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.5px;">Selected plan</div>
        <div style="color:var(--text-primary);font-size:20px;font-weight:600;">${planName}</div>
        <div style="color:var(--gold);font-size:24px;font-weight:600;margin-top:6px;">Rs.${amount}</div>
        <div style="color:var(--text-muted);font-size:11px;margin-top:4px;">${plan === 'yearly' ? 'Billed annually. Cancel anytime.' : 'Billed monthly. Cancel anytime.'}</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:10px;">
        <button class="btn btn-primary btn-pay" data-plan="${plan}" data-gateway="razorpay" style="padding:12px;font-size:13px;">
          <span style="display:flex;align-items:center;justify-content:center;gap:6px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            Pay with Razorpay
          </span>
        </button>
      </div>

      <div style="margin-top:16px;text-align:center;color:var(--text-muted);font-size:10px;">
        By completing this payment, you agree to our Terms of Service and Privacy Policy.
      </div>
    </div>
  `;

  document.getElementById('btn-pay-back')?.addEventListener('click', () => renderSubscribe());

  document.querySelectorAll('.btn-pay').forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.dataset.plan;
      processPayment(plan);
    });
  });
}

async function processPayment(plan) {
  const btn = document.querySelector('.btn-pay');
  if (btn) {
    btn.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;gap:6px;">Processing...</span>';
    btn.disabled = true;
    btn.style.opacity = '0.7';
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 1500));

    localStorage.setItem('tier', 'premium');
    showPaymentSuccess();

  } catch (err) {
    showToast('Payment failed. Please try again.');
    if (btn) {
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;gap:6px;">Pay with Razorpay</span>';
    }
  }
}

function showPaymentSuccess() {
  const main = document.getElementById('main-content');
  if (!main) return;

  main.innerHTML = `
    <div class="view-section" style="text-align:center;padding-top:40px;">
      <div style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#34d399,#10b981);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <div style="color:var(--text-primary);font-size:20px;font-weight:600;margin-bottom:8px;">Welcome to Premium!</div>
      <div style="color:var(--text-secondary);font-size:13px;margin-bottom:24px;">Your payment was successful. You now have unlimited access to all exclusive events.</div>

      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:16px;margin-bottom:24px;text-align:left;">
        <div style="color:var(--gold);font-size:12px;font-weight:600;margin-bottom:8px;">What's included:</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="color:var(--text-secondary);font-size:12px;display:flex;align-items:center;gap:8px;">
            <span style="color:#34d399;">✓</span> Unlimited event access
          </div>
          <div style="color:var(--text-secondary);font-size:12px;display:flex;align-items:center;gap:8px;">
            <span style="color:#34d399;">✓</span> VIP early access alerts
          </div>
          <div style="color:var(--text-secondary);font-size:12px;display:flex;align-items:center;gap:8px;">
            <span style="color:#34d399;">✓</span> Direct ticket links
          </div>
          <div style="color:var(--text-secondary);font-size:12px;display:flex;align-items:center;gap:8px;">
            <span style="color:#34d399;">✓</span> Ad-free experience
          </div>
        </div>
      </div>

      <button class="btn btn-primary" id="btn-success-continue" style="padding:12px 32px;">Continue to Events</button>
    </div>
  `;

  document.getElementById('btn-success-continue')?.addEventListener('click', () => {
    updateTierBadge();
    switchView('feed');
  });
}

// ===== CALENDAR =====
function renderCalendar() {
  const main = document.getElementById('main-content');
  if (!main) return;

  let html = `
    <div class="view-section">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <span style="color:var(--text-primary);font-size:16px;font-weight:600;">Event Calendar</span>
        <span style="color:var(--text-muted);font-size:11px;">${EVENTS.length} events</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;">
  `;

  EVENTS.forEach(event => {
    html += `
      <div class="event-card" data-event-id="${event.id}" style="padding:12px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            <div style="color:var(--text-primary);font-size:13px;font-weight:600;">${event.title}</div>
            <div style="color:var(--text-muted);font-size:11px;margin-top:2px;">${event.date} · ${event.location}</div>
          </div>
          <div style="color:var(--gold);font-size:12px;font-weight:600;">${event.price}</div>
        </div>
      </div>
    `;
  });

  html += '</div></div>';
  main.innerHTML = html;

  document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', () => {
      const eventId = card.dataset.eventId;
      if (eventId) showEventDetail(eventId);
    });
  });
}

// ===== SETTINGS =====
function renderSettings() {
  const main = document.getElementById('main-content');
  if (!main) return;

  const tier = localStorage.getItem('tier') || 'free';
  const isPremium = tier === 'premium';

  main.innerHTML = `
    <div class="view-section">
      <div style="color:var(--text-primary);font-size:16px;font-weight:600;margin-bottom:16px;">Settings</div>

      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:16px;margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <div>
            <div style="color:var(--text-primary);font-size:14px;font-weight:600;">Current Plan</div>
            <div style="color:var(--text-muted);font-size:11px;margin-top:2px;">${isPremium ? 'Premium - Unlimited access' : 'Free - Limited access'}</div>
          </div>
          <span class="badge" style="background:${isPremium ? 'linear-gradient(135deg,rgba(201,162,39,0.2),rgba(201,162,39,0.1))' : ''};color:${isPremium ? '#f0d878' : ''};">${isPremium ? 'PREMIUM' : 'FREE'}</span>
        </div>
        ${!isPremium ? `<button class="btn btn-primary" id="btn-settings-upgrade" style="width:100%;">Upgrade to Premium</button>` : ''}
      </div>

      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:16px;margin-bottom:16px;">
        <div style="color:var(--text-primary);font-size:14px;font-weight:600;margin-bottom:12px;">Preferences</div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <label style="display:flex;justify-content:space-between;align-items:center;cursor:pointer;">
            <span style="color:var(--text-secondary);font-size:13px;">Push Notifications</span>
            <input type="checkbox" id="pref-notifications" checked style="accent-color:var(--gold);">
          </label>
          <label style="display:flex;justify-content:space-between;align-items:center;cursor:pointer;">
            <span style="color:var(--text-secondary);font-size:13px;">Email Alerts</span>
            <input type="checkbox" id="pref-email" style="accent-color:var(--gold);">
          </label>
          <label style="display:flex;justify-content:space-between;align-items:center;cursor:pointer;">
            <span style="color:var(--text-secondary);font-size:13px;">Dark Mode</span>
            <input type="checkbox" id="pref-darkmode" checked disabled style="accent-color:var(--gold);">
          </label>
        </div>
      </div>

      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:16px;">
        <div style="color:var(--text-primary);font-size:14px;font-weight:600;margin-bottom:12px;">Account</div>
        <button class="btn btn-secondary" id="btn-settings-logout" style="width:100%;">Logout</button>
      </div>
    </div>
  `;

  document.getElementById('btn-settings-upgrade')?.addEventListener('click', renderSubscribe);
  document.getElementById('btn-settings-logout')?.addEventListener('click', () => handleLogout(false));
}

// ===== EVENT DETAIL =====
function showEventDetail(eventId) {
  const event = EVENTS.find(e => e.id === eventId);
  if (!event) return;

  const main = document.getElementById('main-content');
  if (!main) return;

  main.innerHTML = `
    <div class="view-section">
      <button class="back-btn" id="btn-detail-back">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </button>

      <div style="margin-bottom:16px;">
        <div style="color:var(--text-primary);font-size:20px;font-weight:600;margin-bottom:8px;">${event.title}</div>
        <div style="color:var(--gold);font-size:18px;font-weight:600;margin-bottom:12px;">${event.price}</div>
      </div>

      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:16px;margin-bottom:16px;">
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;align-items:center;gap:8px;color:var(--text-secondary);font-size:13px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            ${event.date}
          </div>
          <div style="display:flex;align-items:center;gap:8px;color:var(--text-secondary);font-size:13px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            ${event.location}
          </div>
        </div>
      </div>

      <div style="margin-bottom:16px;">
        ${event.tags.map(t => `<span class="event-tag tag-${event.category}">${t}</span>`).join('')}
      </div>

      <div style="display:flex;flex-direction:column;gap:10px;">
        <button class="btn btn-primary btn-ticket" data-url="${event.ticketUrl}">Get tickets</button>
        <button class="btn btn-secondary btn-remind" data-id="${event.id}">Remind me</button>
      </div>
    </div>
  `;

  document.getElementById('btn-detail-back')?.addEventListener('click', () => switchView('feed'));

  document.querySelector('.btn-ticket')?.addEventListener('click', (e) => {
    e.stopPropagation();
    openTicket(event.ticketUrl);
  });

  document.querySelector('.btn-remind')?.addEventListener('click', (e) => {
    e.stopPropagation();
    setReminder(event.id);
  });
}

// ===== TICKET & REMINDER =====
function openTicket(url) {
  if (url && url !== '#') {
    window.open(url, '_blank');
  } else {
    showToast('Tickets coming soon!');
  }
}

function setReminder(eventId) {
  const event = EVENTS.find(e => e.id === eventId);
  if (!event) return;
  showToast(`Reminder set for ${event.title}`);
}

// ===== LOGOUT =====
function handleLogout(isAuto = false) {
  clearTimeout(autoLogoutTimer);
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('tier');
  currentUser = null;

  if (isAuto) {
    showToast('Session expired. Please log in again.');
  } else {
    showToast('Logged out successfully');
  }

  updateTierBadge();
  showAuthScreen();
}

// ===== TIER BADGE =====
function updateTierBadge() {
  const badge = document.getElementById('tier-badge');
  if (!badge) return;
  const tier = localStorage.getItem('tier') || 'free';
  if (tier === 'premium') {
    badge.textContent = 'PREMIUM';
    badge.style.background = 'linear-gradient(135deg, rgba(201,162,39,0.2), rgba(201,162,39,0.1))';
    badge.style.color = '#f0d878';
  } else {
    badge.textContent = 'FREE';
    badge.style.background = '';
    badge.style.color = '';
  }
}

// ===== TOAST =====
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
