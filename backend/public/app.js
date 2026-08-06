// Elite Events Hub - Web App Controller
// ==========================================
const API_BASE = 'https://elite-events-hub-backend-production.up.railway.app/api';
let currentUser = null;
let currentView = 'feed';
let currentCategory = 'all';

// ===== MOCK EVENTS DATA =====
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
    category: 'auctions',
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
    category: 'sports',
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

// ===== WEB STORAGE (Replaces chrome.storage) =====
const webStorage = {
  async get(keys) {
    const result = {};
    keys.forEach(key => {
      try {
        const val = localStorage.getItem(key);
        result[key] = val ? JSON.parse(val) : null;
      } catch (e) {
        result[key] = null;
      }
    });
    return result;
  },
  async set(items) {
    Object.entries(items).forEach(([key, val]) => {
      localStorage.setItem(key, JSON.stringify(val));
    });
  },
  async remove(keys) {
    keys.forEach(key => localStorage.removeItem(key));
  }
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
  await loadUserState();
  setupEventListeners();
  setupNotifications();
});

// ===== AUTH & USER STATE =====
async function loadUserState() {
  try {
    const result = await webStorage.get(['user', 'token', 'preferences']);

    if (result.token) {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: { 'Authorization': 'Bearer ' + result.token }
        });
        if (res.ok) {
          const data = await res.json();
          currentUser = data.user;
          await webStorage.set({ user: currentUser });
          updateTierBadge();
          showMainApp();
          renderFeed();
          return;
        } else {
          await webStorage.remove(['token', 'user']);
        }
      } catch (e) {
        await webStorage.remove(['token', 'user']);
      }
    }

    currentUser = null;
    showAuthScreen();
  } catch (e) {
    currentUser = null;
    showAuthScreen();
  }
}

function updateTierBadge() {
  const badge = document.getElementById('tier-badge');
  if (!badge) return;

  if (!currentUser) {
    badge.textContent = 'FREE';
    badge.style.background = '';
    badge.style.color = '';
    return;
  }

  if (currentUser.tier === 'premium') {
    badge.textContent = 'PREMIUM';
    badge.style.background = 'linear-gradient(135deg, rgba(201,162,39,0.2), rgba(201,162,39,0.1))';
    badge.style.color = '#f0d878';
  } else {
    badge.textContent = 'FREE';
    badge.style.background = '';
    badge.style.color = '';
  }
}

function showAuthScreen() {
  document.getElementById('auth-screen').style.display = 'block';
  document.getElementById('main-app').style.display = 'none';
}

function showMainApp() {
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('main-app').style.display = 'flex';
}

async function handleLogout() {
  await webStorage.remove(['user', 'token']);
  currentUser = null;
  showAuthScreen();
  showToast('Logged out successfully');
}

// ===== LOGIN =====
async function handleLogin() {
  const emailInput = document.getElementById('auth-email');
  const passwordInput = document.getElementById('auth-password');
  const btn = document.getElementById('btn-login');

  const email = emailInput ? emailInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value : '';

  if (!email || !password) {
    showToast('Please enter email and password');
    return;
  }

  if (!validateEmail(email)) {
    showToast('Please enter a valid email address');
    return;
  }

  setButtonLoading(btn, 'Signing in...');

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.success) {
      await webStorage.set({ user: data.user, token: data.token });
      currentUser = data.user;
      showMainApp();
      updateTierBadge();
      renderFeed();
      showToast('Welcome back!');
      if (emailInput) emailInput.value = '';
      if (passwordInput) passwordInput.value = '';
    } else {
      showToast(data.error || 'Login failed');
    }
  } catch (err) {
    showToast('Network error. Please try again.');
  } finally {
    resetButton(btn);
  }
}

// ===== REGISTER =====
async function handleRegister() {
  const nameInput = document.getElementById('reg-name');
  const emailInput = document.getElementById('reg-email');
  const passwordInput = document.getElementById('reg-password');
  const btn = document.getElementById('btn-register');

  const name = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value : '';

  if (!name || !email || !password) {
    showToast('Please fill all fields');
    return;
  }

  if (!validateEmail(email)) {
    showToast('Please enter a valid email address');
    return;
  }

  if (password.length < 6) {
    showToast('Password must be at least 6 characters');
    return;
  }

  setButtonLoading(btn, 'Creating account...');

  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });

    const data = await res.json();
    if (data.success) {
      await webStorage.set({ user: data.user, token: data.token });
      currentUser = data.user;
      showMainApp();
      updateTierBadge();
      renderFeed();
      showToast('Account created successfully!');
      if (nameInput) nameInput.value = '';
      if (emailInput) emailInput.value = '';
      if (passwordInput) passwordInput.value = '';
    } else {
      showToast(data.error || 'Registration failed');
    }
  } catch (err) {
    showToast('Network error. Please try again.');
  } finally {
    resetButton(btn);
  }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  const btnLogin = document.getElementById('btn-login');
  if (btnLogin) btnLogin.addEventListener('click', handleLogin);

  const btnRegister = document.getElementById('btn-register');
  if (btnRegister) btnRegister.addEventListener('click', handleRegister);

  const btnShowRegister = document.getElementById('btn-show-register');
  if (btnShowRegister) {
    btnShowRegister.addEventListener('click', () => {
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('register-form').style.display = 'block';
    });
  }

  const btnShowLogin = document.getElementById('btn-show-login');
  if (btnShowLogin) {
    btnShowLogin.addEventListener('click', () => {
      document.getElementById('register-form').style.display = 'none';
      document.getElementById('login-form').style.display = 'block';
    });
  }

  document.getElementById('auth-password')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
  });
  document.getElementById('reg-password')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleRegister();
  });

  document.getElementById('btn-logout')?.addEventListener('click', handleLogout);

  document.querySelectorAll('.category-tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.category-tabs .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category || 'all';
      if (currentView === 'feed') renderFeed();
    });
  });

  document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.bottom-nav .nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      switchView(item.dataset.view || 'feed');
    });
  });
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

// ===== RENDER FEED =====
function renderFeed() {
  const main = document.getElementById('main-content');
  if (!main) return;

  const userTier = currentUser ? currentUser.tier : 'free';
  const filtered = currentCategory === 'all'
    ? EVENTS
    : EVENTS.filter(e => e.category === currentCategory);

  const showBanner = userTier === 'free';
  const freeLimit = 5;
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

  if (userTier === 'free' && filtered.length > freeLimit) {
    html += `
      <div style="text-align:center;padding:16px 0;color:var(--text-muted);font-size:12px;">
        +${filtered.length - freeLimit} more events - <span style="color:var(--gold);cursor:pointer;" id="btn-upgrade-link">Upgrade to see all</span>
      </div>
    `;
  }

  html += '</div>';
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

// ===== CALENDAR =====
function renderCalendar() {
  const main = document.getElementById('main-content');
  if (!main) return;
  const eventDays = [5, 12, 14, 23, 26, 28, 29];

  let html = `
    <div class="view-section">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <span style="color:var(--text-primary);font-size:16px;font-weight:500;">August 2026</span>
        <span style="color:var(--text-muted);font-size:12px;">7 events</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:4px;">
        ${['M','T','W','T','F','S','S'].map(d => `<span style="text-align:center;font-size:11px;color:var(--text-muted);font-weight:500;">${d}</span>`).join('')}
      </div>
      <div class="calendar-grid">
  `;

  for (let i = 1; i <= 31; i++) {
    const hasEvent = eventDays.includes(i);
    html += `<div class="cal-day ${hasEvent ? 'has-event' : ''}" ${hasEvent ? `data-day="${i}"` : ''}>${i}</div>`;
  }

  html += `
      </div>
      <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border);">
        <div style="color:var(--text-secondary);font-size:13px;margin-bottom:12px;font-weight:500;">Upcoming this month</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div class="cal-event-item" data-event-id="1" style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--bg-card);border-radius:var(--radius-sm);border:1px solid var(--border);cursor:pointer;">
            <div>
              <span style="color:var(--text-primary);font-size:13px;display:block;">Sotheby's Important Watches</span>
              <span style="color:var(--text-muted);font-size:11px;">New York - Est. $800K+</span>
            </div>
            <span style="color:var(--gold);font-size:12px;font-weight:500;">Aug 12</span>
          </div>
          <div class="cal-event-item" data-event-id="6" style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--bg-card);border-radius:var(--radius-sm);border:1px solid var(--border);cursor:pointer;">
            <div>
              <span style="color:var(--text-primary);font-size:13px;display:block;">RM Sotheby's Monterey</span>
              <span style="color:var(--text-muted);font-size:11px;">California - Est. $5M+</span>
            </div>
            <span style="color:var(--gold);font-size:12px;font-weight:500;">Aug 14</span>
          </div>
        </div>
      </div>
    </div>
  `;

  main.innerHTML = html;

  document.querySelectorAll('.cal-day.has-event').forEach(day => {
    day.addEventListener('click', () => {
      showToast('Events on August ' + day.dataset.day);
    });
  });

  document.querySelectorAll('.cal-event-item').forEach(item => {
    item.addEventListener('click', () => {
      const eventId = item.dataset.eventId;
      if (eventId) showEventDetail(eventId);
    });
  });
}

// ===== SETTINGS =====
function renderSettings() {
  const main = document.getElementById('main-content');
  if (!main) return;

  const prefs = (currentUser && currentUser.preferences) || {};
  const userTier = currentUser ? currentUser.tier : 'free';

  main.innerHTML = `
    <div class="view-section">
      <div style="color:var(--text-primary);font-size:16px;font-weight:500;margin-bottom:20px;">Preferences</div>

      <div class="settings-row">
        <span class="settings-label">Auctions & Collectibles</span>
        <div class="toggle ${prefs.auctions ? 'active' : ''}" data-pref="auctions"><div class="toggle-knob"></div></div>
      </div>

      <div class="settings-row">
        <span class="settings-label">Luxury Sports</span>
        <div class="toggle ${prefs.sports ? 'active' : ''}" data-pref="sports"><div class="toggle-knob"></div></div>
      </div>

      <div class="settings-row">
        <span class="settings-label">Yacht Shows & Maritime</span>
        <div class="toggle ${prefs.yachts ? 'active' : ''}" data-pref="yachts"><div class="toggle-knob"></div></div>
      </div>

      <div class="settings-row">
        <span class="settings-label">Push notifications</span>
        <div class="toggle active" data-pref="notifications"><div class="toggle-knob"></div></div>
      </div>

      <div class="settings-row">
        <span class="settings-label">Dark mode</span>
        <div class="toggle active" data-pref="darkmode"><div class="toggle-knob"></div></div>
      </div>

      <div style="margin-top:24px;padding:14px;background:linear-gradient(135deg, rgba(201,162,39,0.06), rgba(201,162,39,0.02));border-radius:var(--radius-sm);border:1px solid rgba(201,162,39,0.12);">
        <div style="color:var(--gold);font-size:13px;font-weight:600;margin-bottom:4px;">Current plan: ${userTier === 'premium' ? 'Premium' : 'Free'}</div>
        <div style="color:var(--text-muted);font-size:12px;line-height:1.4;">
          ${userTier === 'premium'
            ? 'You have unlimited access to all events and VIP alerts.'
            : 'Limited to 5 events per category. Upgrade for full access to all 12+ events.'}
        </div>
        ${userTier === 'free' ? '<button class="upgrade-btn" style="margin-top:10px;" id="btn-settings-upgrade">Upgrade to Premium</button>' : ''}
      </div>

      <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border);">
        <div style="color:var(--text-muted);font-size:11px;text-align:center;">
          Elite Events Hub v1.0.0<br>
          <span style="color:var(--gold);">Exclusive Luxury Experiences</span>
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll('.toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      const pref = toggle.dataset.pref;
      if (pref && ['auctions', 'sports', 'yachts'].includes(pref) && currentUser) {
        currentUser.preferences = currentUser.preferences || {};
        currentUser.preferences[pref] = toggle.classList.contains('active');
        try { webStorage.set({ user: currentUser }); } catch (e) {}
      }
    });
  });

  const settingsUpgrade = document.getElementById('btn-settings-upgrade');
  if (settingsUpgrade) {
    settingsUpgrade.addEventListener('click', () => renderSubscribe());
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

      <div style="text-align:center;margin-bottom:16px;">
        <div style="color:var(--gold);font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;">${event.category}</div>
        <div style="color:var(--text-primary);font-size:18px;font-weight:600;line-height:1.3;">${event.title}</div>
        <div style="color:var(--gold);font-size:20px;font-weight:600;margin-top:8px;">${event.price}</div>
      </div>

      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:14px;margin-bottom:14px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;color:var(--text-secondary);font-size:13px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          ${event.date}
        </div>
        <div style="display:flex;align-items:center;gap:8px;color:var(--text-secondary);font-size:13px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          ${event.location}
        </div>
      </div>

      <div style="margin-bottom:14px;">
        ${event.tags.map(t => `<span class="event-tag tag-${event.category}">${t}</span>`).join('')}
      </div>

      <div class="cta-row" style="margin-bottom:14px;">
        <button class="btn btn-primary btn-ticket" data-url="${event.ticketUrl}" style="padding:12px;">Get tickets now</button>
        <button class="btn btn-secondary btn-remind" data-id="${event.id}" style="padding:12px;">Set reminder</button>
      </div>

      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:14px;">
        <div style="color:var(--text-secondary);font-size:12px;font-weight:500;margin-bottom:8px;">About this event</div>
        <div style="color:var(--text-muted);font-size:12px;line-height:1.5;">
          This exclusive event is curated for Elite Events Hub members. Premium subscribers receive direct booking links, VIP early access, and personalized concierge support for this and all other luxury events worldwide.
        </div>
      </div>
    </div>
  `;

  document.getElementById('btn-detail-back')?.addEventListener('click', () => switchView('feed'));

  document.querySelectorAll('.btn-ticket').forEach(btn => {
    btn.addEventListener('click', () => openTicket(btn.dataset.url));
  });

  document.querySelectorAll('.btn-remind').forEach(btn => {
    btn.addEventListener('click', () => setReminder(btn.dataset.id));
  });
}

// ===== PAYMENT FLOW =====
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
      const gateway = btn.dataset.gateway;
      processPayment(plan, gateway);
    });
  });
}

async function processPayment(plan, gateway) {
  const btn = document.querySelector('.btn-pay[data-gateway="' + gateway + '"]');
  if (btn) {
    btn.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;gap:6px;">Processing...</span>';
    btn.disabled = true;
    btn.style.opacity = '0.7';
  }

  try {
    await simulatePaymentProcessing();

    if (currentUser) {
      currentUser.tier = 'premium';
      currentUser.subscription = {
        plan: plan,
        startedAt: new Date().toISOString(),
        gateway: gateway
      };
    }

    try {
      await webStorage.set({ user: currentUser });
    } catch (e) {}

    showPaymentSuccess();

  } catch (err) {
    console.error('Payment error:', err);
    showToast('Payment failed. Please try again.');
    if (btn) {
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;gap:6px;">Pay with Razorpay</span>';
    }
  }
}

function simulatePaymentProcessing() {
  return new Promise(resolve => setTimeout(resolve, 1500));
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

  updateTierBadge();

  document.getElementById('btn-success-continue')?.addEventListener('click', () => {
    switchView('feed');
  });
}

// ===== UTILITIES =====
function setReminder(eventId) {
  const event = EVENTS.find(e => e.id === eventId);
  if (!event) return;

  // Web: Use setTimeout instead of chrome.alarms
  setTimeout(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Elite Events Hub', {
        body: event.title + ' is coming up!',
        icon: 'assets/logo.png'
      });
    } else {
      showToast('🔔 ' + event.title + ' is coming up!');
    }
  }, 5000);

  // Store reminder in localStorage
  try {
    const reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    reminders.push({ eventId, date: event.date, title: event.title });
    localStorage.setItem('reminders', JSON.stringify(reminders));
  } catch (e) {}

  showToast('Reminder set for ' + event.title);
}

function setupNotifications() {
  // Web: Request notification permission
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

function openTicket(url) {
  if (url === '#') {
    showToast('Tickets available soon');
    return;
  }
  window.open(url, '_blank');
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
