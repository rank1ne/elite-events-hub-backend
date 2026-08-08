// Elite Events Hub - Web App (Hardcoded 45 Events)
// ================================================
// No backend API needed - all data is local

let currentView = 'feed';
let currentCategory = 'all';

// ===== 45 LUXURY EVENTS (Same as Extension) =====
const EVENTS = [
  { id: "1", title: "Christie's Important Watches", date: "Jun 12, 2026", location: "New York", price: "Est. $800K-$1.6M", category: "auctions", tags: ["Watches", "Patek Philippe"], ticketUrl: "https://christies.com/en/auction/important-watches-26076" },
  { id: "2", title: "Sotheby's High Jewelry", date: "Sep 17, 2026", location: "Hong Kong", price: "Est. $2M+", category: "auctions", tags: ["Jewelry", "Cartier"], ticketUrl: "https://sothebys.com/en/auctions/high-jewelry" },
  { id: "3", title: "Monaco Grand Prix 2026", date: "Jun 5-7, 2026", location: "Monte Carlo", price: "EUR 4,000+", category: "sports", tags: ["F1", "Yacht Viewing"], ticketUrl: "https://monaco-grandprix.com" },
  { id: "4", title: "Wimbledon Championships", date: "Jun 29 - Jul 12, 2026", location: "London", price: "GBP 3,395pp", category: "sports", tags: ["Tennis", "Debenture"], ticketUrl: "https://eventsinternational.co.uk/wimbledon" },
  { id: "5", title: "Monaco Yacht Show 2026", date: "Sep 23-26, 2026", location: "Port Hercule", price: "EUR 400-EUR 2,070", category: "yachts", tags: ["Superyachts", "VIP"], ticketUrl: "https://monacoyachtshow.com" },
  { id: "6", title: "RM Sotheby's Monterey", date: "Aug 14, 2026", location: "California", price: "Est. $5M+", category: "auctions", tags: ["Cars", "Ferrari"], ticketUrl: "https://rmsothebys.com" },
  { id: "7", title: "Polo Gold Cup", date: "Jul 18-24, 2026", location: "St. Moritz", price: "CHF 2,500+", category: "sports", tags: ["Polo", "Snow"], ticketUrl: "#" },
  { id: "8", title: "Sotheby's Contemporary Evening HK", date: "Sep 29, 2026", location: "Hong Kong", price: "Est. $10M+", category: "auctions", tags: ["Art", "Contemporary"], ticketUrl: "https://sothebys.com" },
  { id: "9", title: "Art Basel Miami Beach", date: "Dec 3-6, 2026", location: "Miami", price: "$75-$500", category: "auctions", tags: ["Art", "Contemporary"], ticketUrl: "https://artbasel.com" },
  { id: "10", title: "Dubai World Cup", date: "Mar 28, 2027", location: "Dubai", price: "AED 2,500+", category: "sports", tags: ["Horse Racing", "VIP"], ticketUrl: "#" },
  { id: "11", title: "Cannes Film Festival", date: "May 12-23, 2027", location: "Cannes", price: "EUR 3,000+", category: "sports", tags: ["Film", "VIP"], ticketUrl: "#" },
  { id: "12", title: "Singapore Yacht Show", date: "Apr 23-26, 2027", location: "Singapore", price: "S$500+", category: "yachts", tags: ["Superyachts", "Asia"], ticketUrl: "#" },
  { id: "13", title: "Bonhams Bond Street Jewels", date: "Mar 15, 2027", location: "London", price: "Est. £800K+", category: "auctions", tags: ["Jewelry", "Bonhams"], ticketUrl: "https://bonhams.com" },
  { id: "14", title: "Bonhams Quail Lodge Auction", date: "Aug 14, 2026", location: "Carmel Valley, CA", price: "Est. $12M+", category: "auctions", tags: ["Cars", "Bonhams"], ticketUrl: "https://bonhams.com/quail-lodge" },
  { id: "15", title: "Phillips New York Watch Auction XI", date: "Jun 7, 2026", location: "New York", price: "Est. $3M+", category: "auctions", tags: ["Watches", "Phillips"], ticketUrl: "https://phillips.com" },
  { id: "16", title: "Phillips Geneva Watch Auction XVIII", date: "Nov 8, 2026", location: "Geneva", price: "Est. CHF 8M+", category: "auctions", tags: ["Watches", "Phillips"], ticketUrl: "https://phillips.com" },
  { id: "17", title: "Heritage Luxury Accessories", date: "Sep 12, 2026", location: "Dallas", price: "Est. $1.5M+", category: "auctions", tags: ["Bags", "Hermès"], ticketUrl: "https://heritageauctions.com" },
  { id: "18", title: "Heritage Fine Art & Antiques", date: "May 22, 2026", location: "New York", price: "Est. $4M+", category: "auctions", tags: ["Art", "Antiques"], ticketUrl: "https://heritageauctions.com" },
  { id: "19", title: "Art Basel Hong Kong", date: "Mar 25, 2027", location: "Hong Kong", price: "$75-$500", category: "auctions", tags: ["Art", "Contemporary"], ticketUrl: "https://artbasel.com/hong-kong" },
  { id: "20", title: "Art Basel Basel", date: "Jun 18, 2026", location: "Basel", price: "$75-$500", category: "auctions", tags: ["Art", "Contemporary"], ticketUrl: "https://artbasel.com/basel" },
  { id: "21", title: "TEFAF Maastricht", date: "Mar 12, 2027", location: "Maastricht", price: "EUR 50+", category: "auctions", tags: ["Art", "Fine Art"], ticketUrl: "https://tefaf.com" },
  { id: "22", title: "TEFAF New York", date: "May 6, 2026", location: "New York", price: "$50+", category: "auctions", tags: ["Art", "Fine Art"], ticketUrl: "https://tefaf.com" },
  { id: "23", title: "Concours d'Elegance Pebble Beach", date: "Aug 16, 2026", location: "Pebble Beach, CA", price: "$750+", category: "auctions", tags: ["Cars", "Classic"], ticketUrl: "https://pebblebeachconcours.net" },
  { id: "24", title: "Met Gala 2027", date: "May 3, 2027", location: "New York", price: "$35K+", category: "auctions", tags: ["Fashion", "Charity"], ticketUrl: "#" },
  { id: "25", title: "Venice Biennale 2026", date: "Apr 18 - Nov 22, 2026", location: "Venice", price: "EUR 25+", category: "auctions", tags: ["Art", "Contemporary"], ticketUrl: "https://labiennale.org" },
  { id: "26", title: "Art Basel Paris", date: "Oct 16, 2026", location: "Paris", price: "$75-$500", category: "auctions", tags: ["Art", "Contemporary"], ticketUrl: "https://artbasel.com/paris" },
  { id: "27", title: "Christie's Magnificent Jewels", date: "Dec 8, 2026", location: "New York", price: "Est. $8M+", category: "auctions", tags: ["Jewelry", "Diamonds"], ticketUrl: "https://christies.com" },
  { id: "28", title: "Sotheby's Contemporary Evening NY", date: "Nov 18, 2026", location: "New York", price: "Est. $20M+", category: "auctions", tags: ["Art", "Contemporary"], ticketUrl: "https://sothebys.com" },
  { id: "29", title: "F1 Singapore Grand Prix", date: "Oct 4, 2026", location: "Singapore", price: "S$1,500+", category: "sports", tags: ["F1", "Night Race"], ticketUrl: "https://singaporegp.sg" },
  { id: "30", title: "F1 Abu Dhabi Grand Prix", date: "Dec 6, 2026", location: "Yas Marina", price: "AED 2,500+", category: "sports", tags: ["F1", "Season Finale"], ticketUrl: "https://yasmarinacircuit.com" },
  { id: "31", title: "F1 British Grand Prix", date: "Jul 5, 2026", location: "Silverstone", price: "GBP 350+", category: "sports", tags: ["F1", "Historic"], ticketUrl: "https://silverstone.co.uk" },
  { id: "32", title: "US Open Tennis Championships", date: "Aug 31 - Sep 13, 2026", location: "New York", price: "$600+", category: "sports", tags: ["Tennis", "Grand Slam"], ticketUrl: "https://usopen.org" },
  { id: "33", title: "Australian Open", date: "Jan 18 - Jan 31, 2027", location: "Melbourne", price: "AUD 500+", category: "sports", tags: ["Tennis", "Grand Slam"], ticketUrl: "https://ausopen.com" },
  { id: "34", title: "The Masters Tournament", date: "Apr 5, 2027", location: "Augusta, GA", price: "$3,000+", category: "sports", tags: ["Golf", "Major"], ticketUrl: "https://masters.com" },
  { id: "35", title: "The Open Championship", date: "Jul 12, 2026", location: "St Andrews", price: "GBP 250+", category: "sports", tags: ["Golf", "Major"], ticketUrl: "https://theopen.com" },
  { id: "36", title: "Winter Olympics 2026", date: "Feb 6-22, 2026", location: "Milan-Cortina", price: "EUR 150+", category: "sports", tags: ["Winter Olympics", "Italy"], ticketUrl: "https://milanocortina2026.org" },
  { id: "37", title: "FIFA World Cup 2026", date: "Jun 11 - Jul 19, 2026", location: "USA/Canada/Mexico", price: "$600+", category: "sports", tags: ["Football", "World Cup"], ticketUrl: "https://fifa.com/worldcup" },
  { id: "38", title: "Canelo vs Bivol II", date: "Sep 19, 2026", location: "Las Vegas", price: "$1,200+", category: "sports", tags: ["Boxing", "Title Fight"], ticketUrl: "#" },
  { id: "39", title: "Kentucky Derby", date: "May 2, 2027", location: "Louisville, KY", price: "$2,000+", category: "sports", tags: ["Horse Racing", "VIP"], ticketUrl: "https://kentuckyderby.com" },
  { id: "40", title: "Royal Ascot", date: "Jun 16, 2027", location: "Ascot", price: "GBP 500+", category: "sports", tags: ["Horse Racing", "Royal"], ticketUrl: "https://ascot.co.uk" },
  { id: "41", title: "Monaco Historic Grand Prix", date: "May 10, 2027", location: "Monaco", price: "EUR 500+", category: "sports", tags: ["Motorsport", "Historic"], ticketUrl: "https://acm.mc" },
  { id: "42", title: "Dubai International Boat Show", date: "Mar 10, 2027", location: "Dubai", price: "AED 150+", category: "yachts", tags: ["Superyachts", "Middle East"], ticketUrl: "https://dubaiboatshow.com" },
  { id: "43", title: "Fort Lauderdale Boat Show", date: "Oct 28, 2026", location: "Fort Lauderdale", price: "$150+", category: "yachts", tags: ["Superyachts", "Americas"], ticketUrl: "https://flibs.com" },
  { id: "44", title: "Cannes Yachting Festival", date: "Sep 8, 2026", location: "Cannes", price: "EUR 75+", category: "yachts", tags: ["Superyachts", "Mediterranean"], ticketUrl: "https://cannesyachtingfestival.com" },
  { id: "45", title: "Superyacht Miami", date: "Feb 12, 2027", location: "Miami", price: "$250+", category: "yachts", tags: ["Superyachts", "Americas"], ticketUrl: "https://superyachtmiami.com" }
];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  renderFeed();
});

// ===== EVENT LISTENERS =====
function setupEventListeners() {
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
        <span style="color:var(--text-primary);font-size:16px;font-weight:500;">Events Calendar</span>
        <span style="color:var(--text-muted);font-size:12px;">${EVENTS.length} events</span>
      </div>
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:16px;">
        <div style="color:var(--gold);font-size:14px;font-weight:600;margin-bottom:12px;text-align:center;">2026 - 2027</div>
        <div style="display:flex;flex-direction:column;gap:8px;max-height:400px;overflow-y:auto;">
  `;

  html += EVENTS.map(event => `
    <div class="cal-event-item" data-event-id="${event.id}" style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--bg-elevated);border-radius:var(--radius-sm);border:1px solid var(--border);cursor:pointer;">
      <div>
        <span style="color:var(--text-primary);font-size:13px;display:block;font-weight:500;">${event.title}</span>
        <span style="color:var(--text-muted);font-size:11px;">${event.location} - ${event.price}</span>
      </div>
      <span style="color:var(--gold);font-size:11px;font-weight:500;white-space:nowrap;margin-left:8px;">${event.date}</span>
    </div>
  `).join('');

  html += `
        </div>
      </div>
    </div>
  `;

  main.innerHTML = html;

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

  main.innerHTML = `
    <div class="view-section">
      <div style="color:var(--text-primary);font-size:16px;font-weight:500;margin-bottom:20px;">Preferences</div>

      <div class="settings-row">
        <span class="settings-label">Auctions & Collectibles</span>
        <div class="toggle active" data-pref="auctions"><div class="toggle-knob"></div></div>
      </div>

      <div class="settings-row">
        <span class="settings-label">Luxury Sports</span>
        <div class="toggle active" data-pref="sports"><div class="toggle-knob"></div></div>
      </div>

      <div class="settings-row">
        <span class="settings-label">Yacht Shows & Maritime</span>
        <div class="toggle active" data-pref="yachts"><div class="toggle-knob"></div></div>
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
        <div style="color:var(--gold);font-size:13px;font-weight:600;margin-bottom:4px;">Current plan: Free</div>
        <div style="color:var(--text-muted);font-size:12px;line-height:1.4;">
          You are viewing all ${EVENTS.length} events. Upgrade for VIP alerts and exclusive perks.
        </div>
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
          This exclusive event is curated for Elite Events Hub members. Join us for an unforgettable luxury experience with world-class amenities and VIP access.
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

// ===== UTILITIES =====
function openTicket(url) {
  if (url === '#') {
    showToast('Tickets available soon');
    return;
  }
  window.open(url, '_blank');
}

function setReminder(eventId) {
  const event = EVENTS.find(e => e.id === eventId);
  if (!event) return;
  showToast('Reminder set for ' + event.title);
}

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
