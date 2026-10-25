/* Semua konten dibaca dari data.js — kamu tidak perlu mengubah file ini. */
(function () {
  const D = PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (t = "") => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- placeholder otomatis jika gambar tidak ada ---------- */
  const palettes = [["#7c5cff", "#22d3ee"], ["#ff5c9d", "#ff9a5c"], ["#22d3ee", "#34d399"], ["#f59e0b", "#ef4444"], ["#6366f1", "#ec4899"]];
  function placeholder(label = "", seed = 0) {
    const [a, b] = palettes[seed % palettes.length];
    const txt = esc(label.slice(0, 26));
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="560" viewBox="0 0 800 560">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
      <rect width="800" height="560" fill="url(#g)"/>
      <circle cx="660" cy="90" r="150" fill="#fff" opacity=".12"/><circle cx="120" cy="500" r="120" fill="#fff" opacity=".1"/>
      <text x="400" y="290" font-family="Arial,sans-serif" font-size="40" font-weight="700" fill="#fff" text-anchor="middle">${txt}</text>
      <text x="400" y="335" font-family="Arial,sans-serif" font-size="22" fill="#fff" opacity=".8" text-anchor="middle">tambahkan gambar di folder images/</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  function img(src, label, seed, extra = "") {
    const fb = placeholder(label, seed);
    return `<img src="${esc(src || fb)}" alt="${esc(label)}" loading="lazy" ${extra} onerror="this.onerror=null;this.src='${fb.replace(/'/g, "%27")}'">`;
  }
  const resolve = (src, label, seed) => src || placeholder(label, seed);

  /* ---------- lightbox ---------- */
  const lb = $("#lightbox"); let lbItems = [], lbIndex = 0;
  function openLB(items, i) { lbItems = items; lbIndex = i; showLB(); lb.hidden = false; document.body.style.overflow = "hidden"; }
  function showLB() {
    const it = lbItems[lbIndex], im = $("#lbImg");
    im.onerror = () => { im.onerror = null; im.src = placeholder(it.caption, lbIndex); };
    im.src = it.src; im.alt = it.caption || ""; $("#lbCap").textContent = it.caption || "";
    const multi = lbItems.length > 1; $("#lbPrev").style.display = $("#lbNext").style.display = multi ? "" : "none";
  }
  const step = d => { lbIndex = (lbIndex + d + lbItems.length) % lbItems.length; showLB(); };
  const closeLB = () => { lb.hidden = true; document.body.style.overflow = ""; };
  $("#lbClose").onclick = closeLB; $("#lbPrev").onclick = () => step(-1); $("#lbNext").onclick = () => step(1);
  lb.addEventListener("click", e => { if (e.target === lb) closeLB(); });
  document.addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLB(); if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1);
  });

  /* ---------- profil ---------- */
  const P = D.profile;
  document.title = `${P.name} — Portofolio`;
  $("#logo").textContent = (P.name.split(" ")[0] || "●") + ".";
  $("#heroName").textContent = P.name;
  $("#heroTagline").textContent = P.tagline;
  $("#heroPhoto").outerHTML = img(P.photo, P.name, 0, 'id="heroPhoto"');
  if (P.cv) { const b = $("#cvBtn"); b.href = P.cv; b.hidden = false; }
  $("#aboutText").innerHTML = P.about.map(p => `<p>${esc(p)}</p>`).join("");
  $("#mailBtn").href = "mailto:" + P.email;
  $("#socials").innerHTML = P.socials.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join("");
  $("#location").textContent = P.location ? "📍 " + P.location : "";
  $("#footerText").textContent = `© ${new Date().getFullYear()} ${P.name}. Dibuat dengan ♥`;

  /* ---------- efek mengetik ---------- */
  (function typing() {
    const el = $("#typed"), words = P.roles.length ? P.roles : [""]; let w = 0, c = 0, del = false;
    (function tick() {
      const word = words[w];
      el.textContent = word.slice(0, c);
      if (!del && c === word.length) { del = true; return setTimeout(tick, 1400); }
      if (del && c === 0) { del = false; w = (w + 1) % words.length; }
      c += del ? -1 : 1; setTimeout(tick, del ? 45 : 90);
    })();
  })();

  /* ---------- statistik ---------- */
  const stats = [
    [D.projects.length, "Proyek"],
    [D.certificates.length, "Sertifikat"],
    [D.organizations.length, "Organisasi"]
  ];
  $("#stats").innerHTML = stats.map(([n, l]) => `<div class="stat"><b data-n="${n}">0</b><span>${l}</span></div>`).join("");

  /* ---------- skill ---------- */
  $("#skills").innerHTML = D.skills.map(s => `
    <div class="skill"><div class="skill-top"><span>${esc(s.name)}</span><span>${+s.level}%</span></div>
    <div class="bar"><i data-w="${+s.level}"></i></div></div>`).join("");

  /* ---------- filter helper ---------- */
  function makeFilters(box, values, onChange, allLabel = "Semua") {
    const list = [allLabel, ...values]; let cur = allLabel;
    box.innerHTML = list.map(v => `<button class="pill ${v === cur ? "on" : ""}" data-v="${esc(v)}">${esc(v)}</button>`).join("");
    box.onclick = e => {
      const b = e.target.closest(".pill"); if (!b) return;
      cur = b.dataset.v; box.querySelectorAll(".pill").forEach(p => p.classList.toggle("on", p === b));
      onChange(cur === allLabel ? null : cur);
    };
  }
  const uniq = a => [...new Set(a.filter(Boolean))];

  /* ---------- proyek ---------- */
  function renderProjects(filter) {
    const list = D.projects.filter(p => !filter || p.type === filter);
    $("#projectGrid").innerHTML = list.map((p, i) => `
      <article class="card" style="animation-delay:${i * 70}ms">
        <div class="thumb" data-i="${D.projects.indexOf(p)}">
          ${img(p.image, p.title, D.projects.indexOf(p))}
          <span class="badge ${esc((p.type || "").toLowerCase())}">${p.type === "Game" ? "🎮" : "🌐"} ${esc(p.type)}</span>
        </div>
        <div class="body">
          <div class="meta"><span></span><span>${esc(p.year || "")}</span></div>
          <h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
          <div class="tags">${(p.tags || []).map(t => `<span>${esc(t)}</span>`).join("")}</div>
          <div class="actions">
            ${p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">${p.type === "Game" ? "▶ Mainkan" : "↗ Kunjungi"}</a>` : ""}
            ${p.repo ? `<a href="${esc(p.repo)}" target="_blank" rel="noopener">{ } Kode</a>` : ""}
          </div>
        </div>
      </article>`).join("");
  }
  makeFilters($("#projectFilters"), uniq(D.projects.map(p => p.type)), renderProjects);
  renderProjects(null);
  $("#projectGrid").addEventListener("click", e => {
    const t = e.target.closest(".thumb"); if (!t) return;
    const p = D.projects[+t.dataset.i];
    openLB([{ src: resolve(p.image, p.title, +t.dataset.i), caption: p.title }], 0);
  });

  /* ---------- sertifikat ---------- */
  let certCat = null, certQ = "", certShown = [];
  function renderCerts() {
    certShown = D.certificates.map((c, i) => ({ c, i })).filter(({ c }) =>
      (!certCat || c.category === certCat) &&
      (!certQ || (c.title + " " + c.issuer + " " + c.category).toLowerCase().includes(certQ)));
    $("#certGrid").innerHTML = certShown.map(({ c, i }, n) => `
      <article class="card cert" style="animation-delay:${n * 50}ms">
        <div class="thumb" data-n="${n}">${img(c.image, c.title, i + 2)}<span class="badge">${esc(c.category || "")}</span></div>
        <div class="body">
          <h3>${esc(c.title)}</h3>
          <div class="meta"><span>${esc(c.issuer)}</span><span>${esc(c.date)}</span></div>
          ${c.link ? `<a class="verify" href="${esc(c.link)}" target="_blank" rel="noopener">Verifikasi ↗</a>` : ""}
        </div>
      </article>`).join("");
    $("#certEmpty").hidden = certShown.length > 0;
  }
  makeFilters($("#certFilters"), uniq(D.certificates.map(c => c.category)), v => { certCat = v; renderCerts(); });
  $("#certSearch").addEventListener("input", e => { certQ = e.target.value.trim().toLowerCase(); renderCerts(); });
  renderCerts();
  $("#certGrid").addEventListener("click", e => {
    const t = e.target.closest(".thumb"); if (!t) return;
    const items = certShown.map(({ c, i }) => ({ src: resolve(c.image, c.title, i + 2), caption: `${c.title} — ${c.issuer}` }));
    openLB(items, +t.dataset.n);
  });

  /* ---------- organisasi ---------- */
  $("#timeline").innerHTML = D.organizations.map((o, oi) => `
    <div class="org reveal">
      <div class="org-card">
        <span class="org-period">${esc(o.period)}</span>
        <h3>${esc(o.name)}</h3><div class="org-role">${esc(o.role)}</div><p>${esc(o.desc)}</p>
        ${(o.photos || []).length ? `<div class="gallery">${o.photos.map((ph, pi) =>
          `<button data-o="${oi}" data-p="${pi}" aria-label="Lihat foto ${pi + 1}">${img(ph, o.name + " " + (pi + 1), oi + pi)}</button>`).join("")}</div>` : ""}
      </div>
    </div>`).join("");
  $("#timeline").addEventListener("click", e => {
    const b = e.target.closest("button[data-o]"); if (!b) return;
    const o = D.organizations[+b.dataset.o];
    openLB(o.photos.map((ph, i) => ({ src: resolve(ph, o.name, +b.dataset.o + i), caption: `${o.name} — ${o.role} (${i + 1}/${o.photos.length})` })), +b.dataset.p);
  });

  /* ---------- tema ---------- */
  const root = document.documentElement, themeBtn = $("#themeBtn");
  const saved = (() => { try { return localStorage.getItem("theme"); } catch (e) { return null; } })();
  function setTheme(t) { root.dataset.theme = t; themeBtn.textContent = t === "dark" ? "🌙" : "☀️"; try { localStorage.setItem("theme", t); } catch (e) { } }
  setTheme(saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
  themeBtn.onclick = () => setTheme(root.dataset.theme === "dark" ? "light" : "dark");

  /* ---------- menu mobile ---------- */
  const links = $("#links");
  $("#burger").onclick = () => links.classList.toggle("open");
  links.addEventListener("click", e => { if (e.target.tagName === "A") links.classList.remove("open"); });

  /* ---------- animasi muncul + counter + skill bar ---------- */
  function countUp(el) {
    const n = +el.dataset.n; let v = 0; const inc = Math.max(1, Math.ceil(n / 30));
    const t = setInterval(() => { v = Math.min(n, v + inc); el.textContent = v + (n >= 5 ? "+" : ""); if (v >= n) clearInterval(t); }, 40);
  }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    e.target.querySelectorAll(".bar i").forEach(b => b.style.width = b.dataset.w + "%");
    e.target.querySelectorAll(".stat b").forEach(countUp);
    io.unobserve(e.target);
  }), { threshold: .15 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* ---------- scroll: progress, nav aktif, tombol atas, glow kursor ---------- */
  const sections = [...document.querySelectorAll("main section[id]")];
  addEventListener("scroll", () => {
    const h = document.documentElement, y = h.scrollTop;
    $("#progress").style.width = (y / (h.scrollHeight - h.clientHeight) * 100) + "%";
    $("#nav").classList.toggle("scrolled", y > 20);
    $("#toTop").classList.toggle("show", y > 600);
    let cur = sections[0].id; sections.forEach(s => { if (y + 140 >= s.offsetTop) cur = s.id; });
    links.querySelectorAll("a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
  }, { passive: true });
  $("#toTop").onclick = () => scrollTo({ top: 0, behavior: "smooth" });
  addEventListener("pointermove", e => { const g = $("#glow"); g.style.left = e.clientX + "px"; g.style.top = e.clientY + "px"; });
})();
