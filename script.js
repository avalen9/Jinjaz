/**
 * Jinja E-Commerce Platform Client Logic
 */

// Utility Helpers
const $ = s => document.querySelector(s);
const peso = n => '₱' + n.toLocaleString();

// Product Data
const P = [
  {
    n: "CeraVe SA Body Wash",
    p: 149,
    t: "Bestseller",
    img: "image1.png",
    d: "Cleanses & exfoliates rough and bumpy skin.",
    f: ["Salicylic acid", "3 Essential ceramides"],
    b: "Smooth skin without disrupting the skin barrier.",
    c: 2
  },
  {
    n: "Dove Deep Moisture",
    p: 229,
    t: "Popular",
    img: "image2.png",
    d: "Nourishing shower cleanser for instant 24hr lotion-soft skin.",
    f: ["24hr lotion-soft skin", "Micro-moisture formula"],
    b: "Deeply hydrates and restores dry skin.",
    c: 1
  },
  {
    n: "Dove Glow Recharge",
    p: 249,
    t: "Radiance",
    img: "image3.png",
    d: "Energizes and illuminates dull skin with active serum.",
    f: ["3% brightening serum", "Vitamin C enriched"],
    b: "Restores a fresh, healthy radiance all day.",
    c: 3
  },
  {
    n: "Dove Pampering Wash",
    p: 219,
    t: "Gentle",
    img: "image4.png",
    d: "Warm vanilla and nourishing shea butter comforting cleanser.",
    f: ["Shea butter", "Warm vanilla extract"],
    b: "Softens dry skin and leaves a relaxing scent.",
    c: 2
  }
];

// Bundle Packages
const B = [
  { n: "Starter Pack", p: 249, d: "CeraVe SA Wash + Dove Deep Moisture" },
  { n: "Family Pack", p: 599, d: "All 4 body washes included" },
  { n: "Dorm Pack", p: 1099, d: "3 sets of all products, best bulk value" }
];

// Render 5 W's / Business Concept Cards (2-column balanced grid)
$('#five').innerHTML = [
  ["What problem are we solving?", "Hygiene products that are harsh or too expensive."],
  ["Who are our customers?", "Students, young professionals and families."],
  ["What do we provide?", "Gentle hand wash, body wash, shampoo and sanitizer."],
  ["Why choose us?", "Skin-tested formulas, student prices, 24-hour delivery."],
  ["How will they find us?", "Social media, search engines and word of mouth."]
].map(x => `
  <div class="card rv">
    <h3 style="color:var(--g2);margin-bottom:6px">${x[0]}</h3>
    <p style="margin:0;font-size:.85rem">${x[1]}</p>
  </div>
`).join('');

// Render Product Grid with Real Product Images
$('#grid').innerHTML = P.map((x, i) => `
  <article class="card prod rv">
    <div class="art" role="img" aria-label="${x.n}">
      <img src="${x.img}" alt="${x.n}" class="prod-img">
    </div>
    <span class="tag">${x.t} · In stock</span>
    <h3 style="margin-top:10px">${x.n}</h3>
    <p style="font-size:.82rem;margin:6px 0 0">${x.d}</p>
    <ul>${x.f.map(f => `<li>${f}</li>`).join('')}</ul>
    <p style="font-size:.82rem"><strong>Benefit:</strong> ${x.b}</p>
    <div class="price">
      <span>${peso(x.p)}</span>
      <button class="btn" data-i="${i}" style="padding:10px 16px">Order Today</button>
    </div>
  </article>
`).join('');

// Render Bundles
$('#bundles').innerHTML = B.map((x, i) => `
  <div class="card rv">
    <h3>${x.n}</h3>
    <div class="big g" style="margin:8px 0">${peso(x.p)}</div>
    <p>${x.d}</p>
    <button class="btn" data-b="${i}" style="margin-top:6px">Add to cart</button>
  </div>
`).join('');

// Render Gallery with Real Product Images
const galleryImages = [
  { src: "image1.png", title: "CeraVe SA Body Wash" },
  { src: "image2.png", title: "Dove Deep Moisture" },
  { src: "image3.png", title: "Dove Glow Recharge" },
  { src: "image4.png", title: "Dove Pampering Shea Butter" }
];

$('#gal').innerHTML = galleryImages.map((item, i) => `
  <div class="art rv" role="img" aria-label="${item.title}">
    <img src="${item.src}" alt="${item.title}" class="prod-img">
  </div>
`).join('');

// Render Color Palette with Contrast Lock & Jitter-Free Grid[cite: 6, 24]
$('#pal').innerHTML = [
  { h: '#050d1f', n: 'Midnight', text: '#ffffff' },
  { h: '#2a4fd6', n: 'Royal',    text: '#ffffff' },
  { h: '#4f8dff', n: 'Azure',    text: '#ffffff' },
  { h: '#7fd3ff', n: 'Aqua',     text: '#061c42' }
].map(x => `
  <div tabindex="0" role="button" aria-label="Copy ${x.n}" class="pal-item" style="background:${x.h};--sw-text:${x.text};" data-h="${x.h}" data-n="${x.n}">
    <b>${x.n}</b>
  </div>
`).join('');

const copyColor = d => {
  try { navigator.clipboard.writeText(d.dataset.h); } catch (_) {}
  d.classList.add('copied');
  setTimeout(() => d.classList.remove('copied'), 1400);
  toast(d.dataset.n + ' copied');
};
$('#pal').onclick = e => { const d = e.target.closest('[data-h]'); if (d) copyColor(d); };
$('#pal').onkeydown = e => { const d = e.target.closest('[data-h]'); if (d && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); copyColor(d); } };

// Form Input Builders
const F = (l, t, ty) => `
  <div class="f">
    ${t === 'a' ? '<textarea rows="3" required placeholder=" "></textarea>' : `<input required type="${ty || 'text'}" placeholder=" ">`}
    <label>${l}</label>
    <s></s>
  </div>
`;
$('#cfF').innerHTML = F('Name') + F('Email', 'i', 'email') + F('How can we help?', 'a');
$('#orF').innerHTML = F('Full name') + F('Mobile number', 'i', 'tel') + F('Delivery address');

// Strategy Tabs Engine[cite: 6]
const chip = a => a.map(x => `<span class="chip">${x}</span>`).join('');

const T = {
  "Business Model Canvas": () => `
    <div class="cv">
      <div class="card">
        <h3>Key Partners</h3>
        <p><strong>Local suppliers</strong>, reliable riders, and <strong>GCash</strong> payment network.</p>
      </div>
      <div class="card">
        <h3>Key Activities</h3>
        <p><strong>Batch packaging</strong>, real-time dispatch, and <strong>social growth campaigns</strong>.</p>
      </div>
      <div class="card">
        <h3>Key Resources</h3>
        <p><strong>pH-balanced formulas</strong>, digital storefront, and <strong>eco packaging</strong>.</p>
      </div>
      <div class="card vp-card">
        <h3>Value Proposition</h3>
        <p><strong>Skin-safe</strong>, student-budget essentials delivered in <strong>under 24 hours</strong>.</p>
      </div>
      <div class="card">
        <h3>Customer Relationships</h3>
        <p><strong>Prompt Messenger support</strong>, verified reviews, and <strong>loyalty refills</strong>.</p>
      </div>
      <div class="card">
        <h3>Channels</h3>
        <p><strong>Direct website ordering</strong>, Facebook Store, Instagram, and <strong>TikTok Shop</strong>.</p>
      </div>
      <div class="card">
        <h3>Customer Segments</h3>
        <p><strong>University students</strong>, dormers, young professionals, and <strong>local households</strong>.</p>
      </div>
      <div class="card">
        <h3>Cost Structure</h3>
        <p><strong>Raw ingredient sourcing</strong>, sanitary bottling, <strong>local delivery riders</strong>, and ad spend.</p>
      </div>
      <div class="card">
        <h3>Revenue Streams</h3>
        <p><strong>Direct product sales</strong>, bundled value packs, and <strong>monthly bulk dorm subscriptions</strong>.</p>
      </div>
    </div>
  `,

  "Customer & Sitemap": () => `
    <div class="split">
      <div class="card">
        <h3 style="font-size:1.15rem;font-weight:800;margin-bottom:6px">Customer persona</h3>
        <p style="font-size:.82rem;color:var(--mute)">Target audience profile for digital campaigns.</p>
        <div class="kv">
          <div class="kv-row"><b>Target Name</b><span><strong>Angela</strong></span></div>
          <div class="kv-row"><b>Age & Role</b><span><strong>21 years old</strong> · Nursing Student</span></div>
          <div class="kv-row"><b>Core Needs</b><span><strong>Gentle, non-drying hygiene</strong> that fits an allowance</span></div>
          <div class="kv-row"><b>Daily Channels</b><span>Heavy use of <strong>TikTok, Facebook & GCash</strong></span></div>
          <div class="kv-row"><b>Buying Habit</b><span>Prefers <strong>1-click mobile ordering</strong> & Cash on Delivery</span></div>
        </div>
      </div>
      <div class="card">
        <h3 style="font-size:1.15rem;font-weight:800;margin-bottom:6px">Website sitemap</h3>
        <p style="font-size:.82rem;color:var(--mute)">Interactive site architecture. Tap any link to jump to the section.</p>
        <div class="chips">
          ${[
            ["Home", "home"],
            ["About Concept", "about"],
            ["Products", "products"],
            ["Bundle Pricing", "pricing"],
            ["Visual Gallery", "gallery"],
            ["Brand Kit", "brand"],
            ["Strategy Matrix", "plan"],
            ["Customer FAQ", "faq"],
            ["Direct Contact", "contact"]
          ].map(x => `<a class="chip" href="#${x[1]}">${x[0]}</a>`).join('')}
        </div>
      </div>
    </div>
  `,

  "Marketing": () => `
    <p style="font-size:.88rem;color:var(--mute)">
      Our target customer spends peak mobile hours on <strong>Facebook, Instagram, and TikTok</strong>, so our weekly content schedule targets these touchpoints directly.
    </p>
    <div class="cal" id="cal">
      ${[
        ["Monday", "<strong>Product spotlight:</strong> Gentle barrier protection"],
        ["Tuesday", "<strong>Skincare guide:</strong> Why harsh soap strips skin"],
        ["Wednesday", "<strong>Social proof:</strong> Real customer reviews & unboxing"],
        ["Thursday", "<strong>Behind the scenes:</strong> Hygienic packaging routine"],
        ["Friday", "<strong>Flash promo:</strong> Free local Tuguegarao delivery"],
        ["Saturday", "<strong>TikTok demo:</strong> Rich foam and lather showcase"],
        ["Sunday", "<strong>Engagement poll:</strong> Which scent do you prefer?"]
      ].map(x => `
        <div class="card">
          <strong>${x[0]}</strong>
          <p>${x[1]}</p>
        </div>
      `).join('')}
    </div>
    <p style="margin-top:10px;font-size:.78rem;color:var(--mute)">Tap any day to check off scheduled posts.</p>
    
    <div class="card" style="margin-top:20px">
      <h3 style="font-size:1.1rem;font-weight:800">Promotional framework (AIDA Campaign)</h3>
      <div class="aida-grid">
        <div class="aida-item">
          <div class="aida-badge"><span class="aida-pill">A</span> Attention</div>
          <div class="aida-text">Tired of body washes and hand soaps that leave your skin <strong>dry and irritated</strong>?</div>
        </div>
        <div class="aida-item">
          <div class="aida-badge"><span class="aida-pill">I</span> Interest</div>
          <div class="aida-text">Jinja formulas feature <strong>skin-tested ceramides and soothing aloe</strong> at student-friendly prices.</div>
        </div>
        <div class="aida-item">
          <div class="aida-badge"><span class="aida-pill">D</span> Desire</div>
          <div class="aida-text">Enjoy <strong>healthy, moisturized skin all day long</strong> starting at just <strong>₱149</strong>.</div>
        </div>
        <div class="aida-item">
          <div class="aida-badge"><span class="aida-pill">A</span> Action</div>
          <div class="aida-text"><strong>Order today</strong> to lock in <strong>same-day delivery within Tuguegarao</strong>!</div>
        </div>
      </div>
    </div>
  `,

  "SEO & Ads": () => `
    <div class="split">
      <div class="card">
        <h3 style="font-size:1.15rem;font-weight:800;margin-bottom:6px">High-intent SEO keywords</h3>
        <p style="font-size:.82rem;color:var(--mute)">Indexed search terms targeting local and national buyers.</p>
        <div class="chips" style="margin:14px 0 18px">
          ${chip([
            "hygiene products Philippines",
            "affordable body wash",
            "gentle shower gel",
            "cerave sa wash delivery",
            "dove body wash online",
            "hygiene products Tuguegarao",
            "skin-safe soap",
            "sulfate-free essentials"
          ])}
        </div>
        <div class="kv">
          <div class="kv-row"><b>Meta Page Title</b><span><strong>Jinja</strong> | Gentle Hygiene Essentials Delivered</span></div>
          <div class="kv-row"><b>Meta Description</b><span><strong>Gentle, skin-tested</strong> hygiene essentials delivered fast in Tuguegarao.</span></div>
          <div class="kv-row"><b>Target Canonical</b><span><strong>/products/body-wash</strong></span></div>
          <div class="kv-row"><b>Image Alt Index</b><span><strong>Jinja foaming cleanser & hydrating body wash</strong></span></div>
        </div>
      </div>

      <div class="card">
        <h3 style="font-size:1.15rem;font-weight:800;margin-bottom:6px">Digital advertising blueprint</h3>
        <p style="font-size:.82rem;color:var(--mute)">Targeted Meta Ads campaign parameters.</p>
        <div class="kv" style="margin-top:14px">
          <div class="kv-row"><b>Campaign Goal</b><span>Acquire <strong>100 first-time customer orders</strong></span></div>
          <div class="kv-row"><b>Demographic</b><span><strong>Ages 18 to 35</strong> in Cagayan Valley interested in skincare</span></div>
          <div class="kv-row"><b>Core Hook</b><span><strong>"Clean feels effortless"</strong> — premium feel, student budget</span></div>
          <div class="kv-row"><b>Call To Action</b><span><strong>Order Today</strong> (Direct Checkout landing page)</span></div>
          <div class="kv-row"><b>Budget & Window</b><span><strong>₱5,000</strong> simulated ad spend over <strong>14 days</strong></span></div>
          <div class="kv-row"><b>Ad Placements</b><span><strong>Facebook Feed, Instagram Reels, Stories</strong></span></div>
        </div>
      </div>
    </div>
  `,

  "Analytics": () => `
    <p style="font-size:.88rem;color:var(--mute)">
      Fulfillment tracking follows the customer journey from discovery to repeat purchases. Monthly targets:
    </p>
    ${[
      ["Monthly Unique Visitors", 1200, "", "", 100],
      ["Engagement Rate (2+ pages per visit)", 62, "%", "", 62],
      ["Order Conversions (completed checkouts)", 45, "", "", 30],
      ["Customer Retention (repeat buyers)", 28, "%", "", 28]
    ].map(x => `
      <div style="display:flex;justify-content:space-between;margin-top:10px">
        <strong style="color:var(--hi)">${x[0]}</strong>
        <span class="cnt" data-n="${x[1]}" data-s="${x[2]}" style="font-weight:700;color:var(--g2)">0</span>
      </div>
      <div class="bar"><i data-w="${x[4]}"></i></div>
    `).join('')}
    <div class="chips" style="margin-top:20px">
      ${chip([
        "How many visitors landed?",
        "Top discovery traffic sources",
        "Most viewed body wash variants",
        "Cart checkout completion rate",
        "Best converting social ad angle"
      ])}
    </div>
    <p style="margin-top:18px;font-size:.82rem;color:var(--mute)">
      Integrated telemetry: <strong>Google Analytics 4</strong> for on-site behavior and <strong>Meta Business Suite</strong> for ad attribution.
    </p>
  `
};

// Tabs Controller
const tabs = $('#tabs');
const ks = Object.keys(T);

tabs.innerHTML = ks.map((k, i) => `<button data-k="${k}" class="${i ? '' : 'on'}">${k}</button>`).join('');

function show(k) {
  const p = $('#panel');
  p.innerHTML = T[k]();
  p.style.animation = 'none';
  p.offsetHeight;
  p.style.animation = '';

  p.querySelectorAll('.cnt').forEach(el => {
    const n = +el.dataset.n;
    const t0 = performance.now();
    (function s(t) {
      const r = Math.min((t - t0) / 1400, 1);
      el.textContent = Math.round(n * (1 - Math.pow(1 - r, 3))).toLocaleString() + el.dataset.s;
      if (r < 1) requestAnimationFrame(s);
    })(t0);
  });

  setTimeout(() => p.querySelectorAll('.bar i').forEach(b => b.style.width = b.dataset.w + '%'), 60);
  p.querySelectorAll('.cal .card').forEach(c => c.onclick = () => c.classList.toggle('done'));
}

tabs.onclick = e => {
  const b = e.target.closest('button');
  if (!b) return;
  tabs.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
  show(b.dataset.k);
};
show(ks[0]);

// Bubbles & 3D Interactive Tilt on Logo Stage
const st = $('#stage');
for (let i = 0; i < 8; i++) {
  const b = document.createElement('i');
  b.className = 'bub';
  const s = 8 + Math.random() * 20;
  b.style.cssText = `width:${s}px;height:${s}px;left:${15 + Math.random() * 70}%;bottom:${5 + Math.random() * 30}%;animation-delay:${Math.random() * 9}s`;
  st.appendChild(b);
}

st.addEventListener('pointermove', e => {
  const r = st.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5;
  const y = (e.clientY - r.top) / r.height - .5;
  $('#hb').style.transform = `rotateY(${x * 24}deg) rotateX(${-y * 18}deg)`;
});

st.addEventListener('pointerleave', () => $('#hb').style.transform = '');

// Intersection Observer for Scroll Reveals
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add('in');
    setTimeout(() => e.target.style.transitionDelay = '', 1300);
    io.unobserve(e.target);
  }
}), { threshold: .12 });

document.querySelectorAll('.rv').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 80 + 'ms';
  io.observe(el);
});

// Cart State Management
let cart = {};

const toast = m => {
  const t = $('#toast');
  t.textContent = m;
  t.classList.add('show');
  clearTimeout(toast.h);
  toast.h = setTimeout(() => t.classList.remove('show'), 2200);
};

const open = v => {
  $('#drawer').classList.toggle('open', v);
  $('#veil').classList.toggle('open', v);
};

const item = k => k[0] === 'b' ? B[k.slice(1)] : P[k];

function draw() {
  const cartKeys = Object.keys(cart);
  $('#cnt').textContent = cartKeys.reduce((a, k) => a + cart[k], 0);

  $('#items').innerHTML = cartKeys.length
    ? cartKeys.map(k => `
        <div class="line">
          <span>${item(k).n}<br><small style="color:var(--mute)">${peso(item(k).p)}</small></span>
          <span class="q">
            <button data-d="-1" data-k="${k}" aria-label="Less">−</button>
            ${cart[k]}
            <button data-d="1" data-k="${k}" aria-label="More">+</button>
          </span>
        </div>
      `).join('')
    : '<p>Your cart is empty. Add a product to start your order.</p>';

  $('#total').innerHTML = `<span>Total</span><span>${peso(cartKeys.reduce((a, k) => a + cart[k] * item(k).p, 0))}</span>`;
  $('#cnt').style.transform = 'scale(1.4)';
  setTimeout(() => $('#cnt').style.transform = '', 250);
}

const add = k => {
  cart[k] = (cart[k] || 0) + 1;
  draw();
  toast(item(k).n + ' added to cart');
};

$('#grid').onclick = e => {
  const b = e.target.closest('button');
  if (b) add(b.dataset.i);
};

$('#bundles').onclick = e => {
  const b = e.target.closest('button');
  if (b) add('b' + b.dataset.b);
};

$('#items').onclick = e => {
  const b = e.target.closest('button');
  if (!b) return;
  const k = b.dataset.k;
  cart[k] += +b.dataset.d;
  if (cart[k] < 1) delete cart[k];
  draw();
};

$('#cartBtn').onclick = () => open(true);
$('#close').onclick = $('#veil').onclick = () => open(false);

$('#order').onsubmit = e => {
  e.preventDefault();
  if (!Object.keys(cart).length) {
    toast('Add a product before ordering');
    return;
  }
  cart = {};
  draw();
  e.target.reset();
  open(false);
  toast('Order placed. We will message you shortly.');
};

$('#cf').onsubmit = e => {
  e.preventDefault();
  e.target.reset();
  toast('Message sent. We will reply soon.');
};

$('#menu').onclick = () => $('#links').classList.toggle('open');
$('#links').onclick = () => $('#links').classList.remove('open');

// Theme Switcher & Animated View Transition
const sw = $('#sw');
const order = ['dark', 'light', 'pink'];

function mark(t) {
  sw.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.t === t));
  sw.querySelector('u').style.transform = `translateX(${order.indexOf(t) * 32}px)`;
}

function setTheme(t, e) {
  const R = document.documentElement;
  const go = () => {
    R.dataset.theme = t;
    mark(t);
  };

  try {
    localStorage.setItem('jinja-theme', t);
  } catch (_) {}

  if (!document.startViewTransition || !e || matchMedia('(prefers-reduced-motion:reduce)').matches) {
    R.classList.add('tt');
    go();
    setTimeout(() => R.classList.remove('tt'), 700);
    return;
  }

  const x = e.clientX;
  const y = e.clientY;
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  document.startViewTransition(go).ready.then(() => {
    R.animate(
      { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 750, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
    );
  });
}

sw.onclick = e => {
  const b = e.target.closest('button');
  if (b) setTheme(b.dataset.t, e);
};

// Initialize Theme
let initialTheme = 'dark';
try {
  initialTheme = localStorage.getItem('jinja-theme') || 'dark';
} catch (_) {}
document.documentElement.dataset.theme = initialTheme;
mark(initialTheme);

// Brand Synchronization & Initial Render
const BRAND = "Jinja";
document.querySelectorAll('.brand').forEach(el => el.textContent = BRAND);
draw();

/* ==========================================================================
   Elevation: spotlight + tilt, magnetic buttons, ripple
   ========================================================================== */
(() => {
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (fine) {
    const SEL = '.card, .banner, details, .who div';
    const TILT = '.card:not(form), .banner';
    let cur = null, curBtn = null;
    const reset = el => ['--rx', '--ry', '--bx', '--by'].forEach(v => el.style.removeProperty(v));

    document.addEventListener('pointermove', e => {
      const el = e.target.closest(SEL);
      if (cur && cur !== el) reset(cur);
      cur = el;
      if (el) {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', px * 100 + '%');
        el.style.setProperty('--my', py * 100 + '%');
        if (el.matches(TILT)) {
          el.style.setProperty('--rx', (.5 - py) * 5 + 'deg');
          el.style.setProperty('--ry', (px - .5) * 6 + 'deg');
        }
      }
      const b = e.target.closest('.btn');
      if (curBtn && curBtn !== b) reset(curBtn);
      curBtn = b;
      if (b) {
        const r = b.getBoundingClientRect();
        b.style.setProperty('--bx', ((e.clientX - r.left) / r.width - .5) * 8 + 'px');
        b.style.setProperty('--by', ((e.clientY - r.top) / r.height - .5) * 6 + 'px');
      }
    });
    document.addEventListener('pointerout', e => {
      if (!e.relatedTarget) { if (cur) reset(cur); if (curBtn) reset(curBtn); cur = curBtn = null; }
    });
  }

  document.addEventListener('pointerdown', e => {
    const b = e.target.closest('.btn');
    if (!b) return;
    const r = b.getBoundingClientRect();
    const d = document.createElement('span');
    d.className = 'rip';
    d.style.left = e.clientX - r.left + 'px';
    d.style.top = e.clientY - r.top + 'px';
    b.appendChild(d);
    setTimeout(() => d.remove(), 700);
  });
})();

/* ==========================================================================
   Full-Screen Slow-Motion Fluid Silk Wave Canvas Engine
   ========================================================================== */
(() => {
  const cv = document.getElementById('waves');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  let W, H, dpr;
  let t = 0;
  let last = performance.now();
  let mx = 0.5, my = 0.5, sx = 0.5, sy = 0.5;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.width = window.innerWidth * dpr;
    H = cv.height = window.innerHeight * dpr;
  };
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('pointermove', e => {
    mx = e.clientX / window.innerWidth;
    my = e.clientY / window.innerHeight;
  });

  const hex = v => {
    const s = getComputedStyle(document.documentElement).getPropertyValue(v).trim().replace('#', '');
    const n = parseInt(s.length === 3 ? s.replace(/./g, '$&$&') : s, 16);
    return [n >> 16 & 255, n >> 8 & 255, n & 255];
  };

  const layers = [
    { v: '--g1', a: 0.38, amp: 75, freq: 1.1, sp: 0.7,  y: 0.22 },
    { v: '--g2', a: 0.34, amp: 85, freq: 1.5, sp: -0.5, y: 0.46 },
    { v: '--g3', a: 0.30, amp: 65, freq: 2.1, sp: 0.4,  y: 0.72 },
    { v: '--g1', a: 0.26, amp: 95, freq: 0.9, sp: -0.3, y: 0.92 }
  ];

  const updateColors = () => layers.forEach(l => {
    l.target = hex(l.v);
    l.cur = l.cur || l.target.slice();
  });
  updateColors();
  new MutationObserver(updateColors).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  const render = now => {
    const dt = Math.min(now - last, 50);
    last = now;
    t += dt * 0.00035;

    sx += (mx - sx) * 0.03;
    sy += (my - sy) * 0.03;

    ctx.clearRect(0, 0, W, H);

    const isLight = document.documentElement.dataset.theme !== 'dark';

    layers.forEach((l, i) => {
      for (let k = 0; k < 3; k++) {
        l.cur[k] += (l.target[k] - l.cur[k]) * 0.06;
      }
      const rgb = l.cur.map(Math.round).join(',');
      const alpha = l.a * (isLight ? 0.85 : 1);

      const base = H * l.y - (sy - 0.5) * 45 * dpr;
      const A = l.amp * dpr;

      ctx.beginPath();
      ctx.moveTo(0, H);

      for (let x = 0; x <= W + 16; x += 16 * dpr) {
        const u = x / W;
        const offset = Math.sin(u * Math.PI * 2 * l.freq + t * l.sp * 3 + i) * A
                     + Math.cos(u * Math.PI * 2 * (l.freq * 1.8) + t * (l.sp * 2)) * (A * 0.4);
        const y = base + offset;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(W, H);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, base - A, 0, H);
      grad.addColorStop(0, `rgba(${rgb}, ${alpha})`);
      grad.addColorStop(1, `rgba(${rgb}, ${alpha * 0.12})`);

      ctx.fillStyle = grad;
      ctx.fill();
    });

    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
})();