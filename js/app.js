(function () {
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const root = $("#app");
  const fmt = (n) =>
    n === 0 ? "Gratis" : "$" + n.toLocaleString("es-MX") + " MXN";

  const store = {
    get user() {
      try { return JSON.parse(localStorage.getItem("ee_user") || "null"); }
      catch { return null; }
    },
    set user(v) { localStorage.setItem("ee_user", JSON.stringify(v)); },
    get result() {
      try { return JSON.parse(localStorage.getItem("ee_result") || "null"); }
      catch { return null; }
    },
    set result(v) { localStorage.setItem("ee_result", JSON.stringify(v)); },
    enrolls() {
      try { return JSON.parse(localStorage.getItem("ee_enrolls") || "[]"); }
      catch { return []; }
    },
    addEnroll(item) {
      const list = this.enrolls();
      if (!list.find((x) => x.id === item.id)) list.push(item);
      localStorage.setItem("ee_enrolls", JSON.stringify(list));
    },
  };

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2400);
  }

  function typeById(id) { return EE.types.find((t) => t.id === Number(id)); }

  function headerActive(path) {
    $$(".nav-desk a, .tabbar a, .nav-mobile a").forEach((a) => {
      const href = a.getAttribute("href") || "";
      a.classList.toggle("active", href === "#" + path || (path.startsWith("/tipo/") && href === "#/tipos"));
    });
  }

  function circleSvg(size = 280, linked = true) {
    const cx = 140, cy = 140, r = 108;
    const pts = EE.types.map((t) => {
      const ang = (-90 + (t.id % 9) * 40) * Math.PI / 180;
      return { t, x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang) };
    });
    const pos = Object.fromEntries(pts.map((p) => [p.t.id, p]));
    const lines = [[9,3],[3,6],[6,9],[1,4],[4,2],[2,8],[8,5],[5,7],[7,1]];
    const segs = lines.map(([a,b]) => {
      const p = pos[a], q = pos[b];
      return `<line x1="${p.x}" y1="${p.y}" x2="${q.x}" y2="${q.y}" stroke="rgba(212,165,116,.45)" stroke-width="1.2"/>`;
    }).join("");
    const nodes = pts.map(({ t, x, y }) => {
      const inner = `<circle cx="${x}" cy="${y}" r="14" fill="${t.color}"/><text x="${x}" y="${y+4}" text-anchor="middle" fill="#fff" font-size="12" font-family="Sora,sans-serif">${t.id}</text>`;
      return linked
        ? `<a href="#/tipo/${t.id}">${inner}</a>`
        : inner;
    }).join("");
    return `<svg viewBox="0 0 280 280" width="${size}" height="${size}" role="img" aria-label="Símbolo del eneagrama">${segs}<circle cx="140" cy="140" r="108" fill="none" stroke="rgba(212,165,116,.35)" stroke-width="1.4"/>${nodes}</svg>`;
  }

  function viewHome() {
    const types = EE.types.map((t) => `
      <a class="type-tile" href="#/tipo/${t.id}" style="--accent:${t.color}">
        <div class="type-num" style="background:${t.color}">${t.id}</div>
        <h3>${t.name}</h3>
        <p>${t.summary}</p>
      </a>`).join("");
    const courses = EE.courses.map(courseCard).join("");
    const events = EE.events.map((e) => `
      <article class="card event-card">
        <div class="event-kind">${e.kind}</div>
        <div>
          <h3>${e.title}</h3>
          <p class="muted">${e.place} · ${e.date}</p>
          <p class="muted">${e.text}</p>
        </div>
        <div style="text-align:right">
          <div class="price">${fmt(e.price)}</div>
          <div class="seats">${e.seats} lugares</div>
          <button class="btn btn-navy" style="margin-top:8px" data-buy='${JSON.stringify({id:e.id,title:e.title,price:e.price})}'>Reservar</button>
        </div>
      </article>`).join("");
    const quotes = EE.testimonials.map((q) => `
      <article class="card card-body">
        <p>“${q.text}”</p>
        <p class="muted" style="margin-top:10px">${q.name} · ${q.type}</p>
      </article>`).join("");

    return `
      <section class="hero">
        <div class="hero-inner">
          <div>
            <p class="kicker">ENNEA · @lupe_naredo</p>
            <h1>Me conozco, me transformo</h1>
            <p class="lead">Eneagrama con Lupe Naredo: coach y docente certificada por EANT / UAB / Oxford. Nueve estrategias. Un mapa para ver el motor —no solo la conducta.</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="#/test">Comenzar test gratis</a>
              <a class="btn btn-ghost" href="#/tipos">Leer los 9 tipos</a>
            </div>
            <div class="meta-row">
              <span>40 preguntas · 12–18 min</span>
              <span>Tipo + ala + flechas</span>
              <span>Sin cuenta obligatoria</span>
            </div>
          </div>
          <div class="circle-wrap">${circleSvg(300)}</div>
        </div>
      </section>
      <div class="page">
        <section class="section">
          <p class="kicker">El mapa</p>
          <div class="section-head">
            <div>
              <h2>Los nueve tipos</h2>
              <p class="muted">No es una etiqueta. Es la pregunta que te haces cuando nadie mira.</p>
            </div>
            <a class="btn btn-line" href="#/tipos">Ver enciclopedia</a>
          </div>
          <div class="grid-9">${types}</div>
        </section>
        <section class="section">
          <h2>¿Por qué Eneagrama?</h2>
          <p class="muted" style="margin-bottom:16px">Autoconocimiento, transformación y relaciones —el mismo eje de la home original, ahora con sustancia.</p>
          <div class="why">
            <article><p class="kicker">01</p><h3>Autoconocimiento</h3><p>Descubre patrones de comportamiento y creencias limitantes: el miedo y el deseo que organizan tu carácter.</p></article>
            <article><p class="kicker">02</p><h3>Transformación</h3><p>Desarrolla tu potencial y crece hacia tu mejor versión usando flechas, alas y niveles de salud.</p></article>
            <article><p class="kicker">03</p><h3>Relaciones</h3><p>Mejora la comunicación y la comprensión con los demás: cada tipo oye una amenaza distinta.</p></article>
          </div>
        </section>
        <section class="section">
          <div class="section-head">
            <h2>Cursos destacados</h2>
            <a class="btn btn-line" href="#/cursos">Todos los cursos</a>
          </div>
          <div class="grid-3">${courses}</div>
        </section>
        <section class="section">
          <h2>Próximos eventos</h2>
          <div style="display:grid;gap:12px;margin-top:16px">${events}</div>
        </section>
        <section class="section">
          <h2>Quién ya pasó por aquí</h2>
          <div class="grid-3" style="margin-top:16px">${quotes}</div>
        </section>
      </div>`;
  }

  function courseCard(c) {
    const colors = {
      Principiante: ["#3d6b6b", "#d4a574"],
      Intermedio: ["#1b3348", "#c9a227"],
      Avanzado: ["#8b2e2e", "#d4a574"],
    };
    const [c1, c2] = colors[c.level] || colors.Principiante;
    return `
      <article class="card">
        <div class="card-cover" style="--c1:${c1};--c2:${c2}"></div>
        <div class="card-body">
          <div class="row-between"><span class="badge">${c.level}</span><span class="muted">★ ${c.rating}</span></div>
          <h3 style="margin:8px 0 4px">${c.title}</h3>
          <p class="muted">${c.instructor}</p>
          <p class="muted" style="margin:8px 0">${c.weeks} semanas · ${c.seats} cupos</p>
          <div class="row-between" style="margin-top:12px">
            <span class="price">${fmt(c.price)}</span>
            <a class="btn btn-navy" href="#/curso/${c.id}">Ver programa</a>
          </div>
        </div>
      </article>`;
  }

  function viewCursos() {
    return `
      <div class="page">
        <p class="kicker">Formación</p>
        <h2>Cursos</h2>
        <p class="muted">Transforma tu vida con el Eneagrama. Tres niveles, mismos docentes.</p>
        <input class="search" id="q-cursos" placeholder="Buscar cursos…" style="margin:16px 0 8px">
        <div class="chips" id="chips-level">
          <button class="chip active" data-lv="Todos">Todos</button>
          <button class="chip" data-lv="Principiante">Principiante</button>
          <button class="chip" data-lv="Intermedio">Intermedio</button>
          <button class="chip" data-lv="Avanzado">Avanzado</button>
        </div>
        <div class="grid-3" id="list-cursos">${EE.courses.map(courseCard).join("")}</div>
      </div>`;
  }

  function viewCurso(id) {
    const c = EE.courses.find((x) => x.id === id);
    if (!c) return viewCursos();
    const inst = EE.instructors[c.instructor] || {};
    return `
      <div class="page prose">
        <p class="kicker">${c.level} · ${c.weeks} semanas</p>
        <h2>${c.title}</h2>
        <p>${c.tagline}</p>
        <p class="muted">${c.hours} · ${c.seats} cupos · ★ ${c.rating}</p>
        <p class="price" style="margin:12px 0">${fmt(c.price)}</p>
        <button class="btn btn-primary" data-buy='${JSON.stringify({id:c.id,title:c.title,price:c.price})}'>Inscribirme</button>
        <h3 style="margin-top:28px">Qué incluye</h3>
        <ul>${c.includes.map((i) => `<li>${i}</li>`).join("")}</ul>
        <h3>Temario</h3>
        <ul>${c.syllabus.map((i) => `<li>${i}</li>`).join("")}</ul>
        <h3>Docente</h3>
        <p><strong>${c.instructor}</strong> — ${inst.role || ""}</p>
        <p>${inst.bio || ""}</p>
        <p><a href="#/cursos">← Todos los cursos</a></p>
      </div>`;
  }

  function viewSesiones() {
    const cards = EE.sessions.map((s) => sessionCard(s)).join("");
    return `
      <div class="page">
        <p class="kicker">Acompañamiento</p>
        <h2>Sesiones</h2>
        <p class="muted">Reserva tu espacio de transformación.</p>
        <div class="chips" id="chips-ses">
          <button class="chip active" data-k="Todos">Todos</button>
          <button class="chip" data-k="Individual">Individual</button>
          <button class="chip" data-k="Grupal">Grupal</button>
        </div>
        <div id="list-ses">${cards}</div>
      </div>`;
  }
  function sessionCard(s) {
    return `
      <article class="card list-card" data-kind="${s.kind}">
        <div>
          <span class="badge">${s.kind}</span>
          <h3 style="margin-top:8px">${s.date}</h3>
          <p>${s.time} · ${s.instructor}</p>
          <p>${s.text}</p>
        </div>
        <div>
          <div class="price">${fmt(s.price)}</div>
          <button class="btn btn-navy" style="margin-top:8px" data-buy='${JSON.stringify({id:s.id,title:"Sesión "+s.kind+" · "+s.date,price:s.price})}'>Reservar</button>
        </div>
      </article>`;
  }

  function viewBiblioteca() {
    const cards = EE.library.map((l) => `
      <article class="card list-card" data-kind="${l.kind}">
        <div>
          <span class="badge">${l.kind}${l.price === 0 ? " · muestra gratis" : ""}</span>
          <h3 style="margin-top:8px">${l.title}</h3>
          <p>${l.text}</p>
          <p class="muted">${l.meta}</p>
        </div>
        <div>
          <div class="price">${fmt(l.price)}</div>
          <button class="btn ${l.price === 0 ? "btn-primary" : "btn-navy"}" style="margin-top:8px" data-buy='${JSON.stringify({id:l.id,title:l.title,price:l.price})}'>${l.price === 0 ? "Descargar" : "Adquirir"}</button>
        </div>
      </article>`).join("");
    return `
      <div class="page">
        <p class="kicker">Recursos</p>
        <h2>Biblioteca</h2>
        <p class="muted">Recursos para tu transformación. Empieza por el mapa de bolsillo, que es gratis.</p>
        <div class="chips" id="chips-lib">
          <button class="chip active" data-k="Todos">Todos</button>
          <button class="chip" data-k="PDF">PDF</button>
          <button class="chip" data-k="Audio">Audio</button>
          <button class="chip" data-k="eBook">eBook</button>
        </div>
        <div id="list-lib">${cards}</div>
      </div>`;
  }

  function viewTipos() {
    const list = EE.types.map((t) => `
      <a class="type-tile" href="#/tipo/${t.id}" style="--accent:${t.color}">
        <div class="type-num" style="background:${t.color}">${t.id}</div>
        <h3>${t.name}</h3>
        <p>${t.aka} · Centro ${t.center}</p>
      </a>`).join("");
    const centers = EE.centers.map((c) => `
      <article class="card card-body">
        <h3>${c.name}</h3>
        <p class="muted">Tipos ${c.types.join(", ")}</p>
        <p>${c.text}</p>
      </article>`).join("");
    const inst = EE.instincts.map((i) => `
      <article class="card card-body"><h3>${i.name}</h3><p>${i.text}</p></article>`).join("");
    return `
      <div class="page">
        <p class="kicker">Enciclopedia</p>
        <h2>Los 9 tipos, alas, flechas e instintos</h2>
        <p class="muted">Lee los retratos. El test orienta; tú confirmas.</p>
        <div class="circle-wrap" style="margin:20px 0">${circleSvg(260)}</div>
        <div class="grid-9">${list}</div>
        <h2 style="margin-top:36px">Tres centros</h2>
        <div class="grid-3" style="margin-top:12px">${centers}</div>
        <h2 style="margin-top:36px">Tres instintos (subtipos)</h2>
        <p class="muted">Cada tipo se colorea de conservación, social o sexual. 9 × 3 = 27.</p>
        <div class="grid-3" style="margin-top:12px">${inst}</div>
      </div>`;
  }

  function viewTipo(id) {
    const t = typeById(id);
    if (!t) return viewTipos();
    const wl = typeById(t.wingLeft), wr = typeById(t.wingRight);
    const st = typeById(t.stress), gr = typeById(t.growth);
    return `
      <div class="page split">
        <aside class="side">
          ${EE.types.map((x) => `<a href="#/tipo/${x.id}" class="${x.id===t.id?"active":""}">${x.id}. ${x.name}</a>`).join("")}
        </aside>
        <article class="prose">
          <p class="kicker">Tipo ${t.id} · ${t.center}</p>
          <h2>${t.name}</h2>
          <p class="muted">${t.aka} · Pasión: ${t.passion} · Virtud: ${t.virtue}</p>
          <p>${t.body}</p>
          <p><strong>Deseo básico:</strong> ${t.desire}<br><strong>Miedo básico:</strong> ${t.fear}</p>
          <div class="taglist">${t.strengths.map((s)=>`<span class="tag">${s}</span>`).join("")}</div>
          <h3>Sombras</h3>
          <ul>${t.shadows.map((s)=>`<li>${s}</li>`).join("")}</ul>
          <h3>Alas</h3>
          <p><a href="#/tipo/${wl.id}">${t.id}w${wl.id} ${wl.name}</a> o <a href="#/tipo/${wr.id}">${t.id}w${wr.id} ${wr.name}</a>. El ala tiñe el tipo; no lo sustituye.</p>
          <h3>Flechas</h3>
          <p>En estrés se mueve hacia el <a href="#/tipo/${st.id}">${st.id} ${st.name}</a>. En crecimiento, hacia el <a href="#/tipo/${gr.id}">${gr.id} ${gr.name}</a>.</p>
          <h3>Cómo crecer</h3>
          <ul>${t.growthTips.map((s)=>`<li>${s}</li>`).join("")}</ul>
          <h3>Trabajo</h3><p>${t.work}</p>
          <h3>Relaciones</h3><p>${t.relations}</p>
          <p><a class="btn btn-primary" href="#/test">Contrastar con el test</a></p>
        </article>
      </div>`;
  }

  const TEST = {
    phase: "intro", i: 0, likert: [], situ: [],
    reset() { this.phase = "intro"; this.i = 0; this.likert = []; this.situ = []; },
  };

  function viewTest() {
    if (TEST.phase === "intro") {
      return `
        <div class="page prose">
          <p class="kicker">Instrumento de orientación</p>
          <h2>Test de Eneagrama</h2>
          <p>40 preguntas: 36 afirmaciones (4 por tipo) y 4 situaciones —incluida la original de «cuando las cosas no salen según lo planeado».</p>
          <p>Responde cómo has sido <strong>la mayor parte de tu vida</strong>, no como te gustaría ser ni como fuiste el mes pasado.</p>
          <p class="muted">12–18 minutos · resultado con ranking de los 9, ala y flechas · se guarda en este navegador.</p>
          <button class="btn btn-primary" id="start-test">Empezar</button>
        </div>`;
    }
    if (TEST.phase === "likert") {
      const item = EE.likert[TEST.i];
      const total = EE.likert.length + EE.situational.length;
      const step = TEST.i + 1;
      const labels = ["Muy en desacuerdo", "En desacuerdo", "Neutral", "De acuerdo", "Muy de acuerdo"];
      return `
        <div class="page">
          <p class="muted">Pregunta ${step} de ${total}</p>
          <div class="test-progress"><span style="width:${(step-1)/total*100}%"></span></div>
          <h2 class="test-q">${item.q}</h2>
          <div class="likert-wrap">
            ${labels.map((lb, idx) => `<button data-val="${idx+1}">${idx+1}<br><small>${lb}</small></button>`).join("")}
          </div>
        </div>`;
    }
    if (TEST.phase === "situ") {
      const item = EE.situational[TEST.i];
      const total = EE.likert.length + EE.situational.length;
      const step = EE.likert.length + TEST.i + 1;
      return `
        <div class="page">
          <p class="muted">Pregunta ${step} de ${total}</p>
          <div class="test-progress"><span style="width:${(step-1)/total*100}%"></span></div>
          <h2 class="test-q">${item.q}</h2>
          ${item.opts.map((o) => `<button class="opt" data-t="${o.t}">${o.a}</button>`).join("")}
        </div>`;
    }
    return viewResult();
  }

  function scoreTest() {
    const s = { 1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0 };
    EE.likert.forEach((item, i) => { s[item.t] += TEST.likert[i] || 0; });
    TEST.situ.forEach((t) => { s[t] += 4; });
    const ranked = Object.entries(s).map(([id, pts]) => ({ id: +id, pts }))
      .sort((a, b) => b.pts - a.pts);
    const top = ranked[0];
    const t = typeById(top.id);
    const wing = [t.wingLeft, t.wingRight]
      .map((id) => ranked.find((r) => r.id === id))
      .sort((a, b) => b.pts - a.pts)[0];
    const max = ranked[0].pts || 1;
    const result = { ranked, top: top.id, wing: wing.id, at: Date.now(), max };
    store.result = result;
    return result;
  }

  function viewResult() {
    const res = store.result || scoreTest();
    const t = typeById(res.top);
    const w = typeById(res.wing);
    const bars = res.ranked
      .slice()
      .sort((a, b) => a.id - b.id)
      .map((r) => {
        const pct = Math.round((r.pts / res.max) * 100);
        const tt = typeById(r.id);
        return `<div class="bar-row">
          <strong>${r.id}</strong>
          <div class="bar"><i style="width:${pct}%;background:${tt.color}"></i></div>
          <span>${pct}%</span>
        </div>`;
      }).join("");
    return `
      <div class="page">
        <p class="kicker">Tu orientación</p>
        <h2>Tipo ${t.id} · ${t.name}</h2>
        <p class="muted">Ala probable ${t.id}w${w.id} (${w.name}). Flecha de estrés → ${t.stress}. Crecimiento → ${t.growth}.</p>
        <p>${t.body}</p>
        <h3 style="margin:18px 0 8px">Puntuación de los nueve</h3>
        ${bars}
        <p class="muted" style="margin-top:12px">Si el segundo tipo está cerca, léelo también. El número es la motivación, no un diagnóstico.</p>
        <div class="hero-actions" style="margin-top:18px">
          <a class="btn btn-primary" href="#/tipo/${t.id}">Leer el retrato completo</a>
          <a class="btn btn-line" href="#/tipo/${res.ranked[1].id}">Ver el segundo (${res.ranked[1].id})</a>
          <button class="btn btn-line" id="retake">Repetir test</button>
        </div>
      </div>`;
  }

  function viewPerfil() {
    const u = store.user;
    const res = store.result;
    const ens = store.enrolls();
    if (!u) {
      return `
        <div class="page">
          <div class="hero" style="border-radius:20px;margin:0 0 20px;padding:36px 24px;text-align:center">
            <h2 style="color:var(--sand)">Bienvenido</h2>
            <p>Inicia sesión para acceder a todos los beneficios</p>
            <div class="hero-actions" style="justify-content:center;margin-top:16px">
              <a class="btn btn-primary" href="#/login">Iniciar sesión</a>
              <a class="btn btn-ghost" href="#/registro">Crear cuenta</a>
            </div>
          </div>
          <h3>Con tu cuenta podrás</h3>
          <div class="grid-2" style="margin-top:12px">
            <article class="card card-body">Acceder a cursos completos de Eneagrama</article>
            <article class="card card-body">Reservar sesiones personalizadas</article>
            <article class="card card-body">Descargar recursos y materiales</article>
            <article class="card card-body">Obtener certificados de finalización</article>
          </div>
        </div>`;
    }
    return `
      <div class="page">
        <p class="kicker">Cuenta</p>
        <h2>Hola, ${u.name}</h2>
        <p class="muted">${u.email}</p>
        ${res ? `<p style="margin:12px 0">Último test: Tipo ${res.top} · ala ${res.wing}. <a href="#/test">Ver resultado</a></p>` : `<p><a href="#/test">Aún no haces el test</a></p>`}
        <h3 style="margin-top:24px">Reservas e inscripciones</h3>
        ${ens.length ? ens.map((e) => `<article class="card card-body" style="margin-top:8px"><strong>${e.title}</strong><p class="muted">${fmt(e.price)} · guardado en este dispositivo</p></article>`).join("") : `<p class="muted">Todavía no hay reservas.</p>`}
        <p style="margin-top:20px"><button class="btn btn-line" id="logout">Cerrar sesión</button></p>
      </div>`;
  }

  function viewLogin() {
    return `
      <div class="page">
        <div class="form">
          <p class="kicker">Cuenta</p>
          <h2>Inicia sesión para continuar tu viaje</h2>
          <form id="form-login">
            <label>Email</label>
            <input type="email" name="email" required placeholder="tu@email.com">
            <label>Contraseña</label>
            <input type="password" name="pass" required placeholder="••••••••">
            <p class="muted" style="text-align:right;margin-top:6px">¿Olvidaste tu contraseña?</p>
            <button class="btn btn-primary btn-wide" style="margin-top:16px">Iniciar sesión</button>
          </form>
          <p class="or">o continúa con</p>
          <div class="oauth">
            <button class="btn btn-line" data-demo="1">Apple</button>
            <button class="btn btn-line" data-demo="1">Google</button>
          </div>
          <p style="text-align:center;margin-top:16px">¿No tienes cuenta? <a href="#/registro">Regístrate</a></p>
          <p class="notice">Demo local: cualquier email/contraseña crea sesión en este navegador. No hay servidor todavía.</p>
        </div>
      </div>`;
  }

  function viewRegistro() {
    return `
      <div class="page">
        <div class="form">
          <p class="kicker">Cuenta</p>
          <h2>Únete a nosotros</h2>
          <p class="muted">Comienza tu viaje de autoconocimiento</p>
          <form id="form-reg">
            <label>Nombre completo</label>
            <input type="text" name="name" required placeholder="Tu nombre">
            <label>Email</label>
            <input type="email" name="email" required placeholder="tu@email.com">
            <label>Contraseña</label>
            <input type="password" name="pass" required minlength="6">
            <label>Confirmar contraseña</label>
            <input type="password" name="pass2" required>
            <label class="check"><input type="checkbox" required> Acepto los <a href="#/terminos">Términos y Condiciones</a> y la <a href="#/privacidad">Política de Privacidad</a></label>
            <button class="btn btn-primary btn-wide">Crear cuenta</button>
          </form>
          <p style="text-align:center;margin-top:16px">¿Ya tienes cuenta? <a href="#/login">Inicia sesión</a></p>
        </div>
      </div>`;
  }

  function viewNosotros() {
    return `
      <div class="page prose">
        <p class="kicker">ENNEA</p>
        <h2>Lupe Naredo</h2>
        <p>Coach y teacher de eneagrama certificada por <strong>EANT / UAB / Oxford</strong>. Instructora de yoga RYT 200+. Autora. Eneatipo <strong>4w5</strong>, en entrenamiento permanente —como dice en su bio: still learning.</p>
        <p>Más de una década estudiando y practicando autoconocimiento a través del eneagrama. En Instagram comparte el mapa con el tono de quien no te encasilla: «en eneagrama nadie puede decirte quién eres». Hashtag de casa: <strong>#meconozcometransformo</strong>.</p>
        <p>El libro introduce los 9 eneatipos con claridad: si ya conoces el tema es gía de consulta; si llegas nueva, es el piso para empezar sin drama teórico.</p>
        <p>Esta plataforma es el aula: test de orientación, retratos de los nueve, cursos, sesiones y biblioteca. Lo vivo —historias, Casa de los Famosos, apego, reconexión— está en su cuenta.</p>
        <p><a class="btn btn-primary" href="https://www.instagram.com/lupe_naredo/" target="_blank" rel="noopener">Instagram @lupe_naredo</a>
           <a class="btn btn-line" href="#/test">Hacer el test</a></p>
        <p class="muted">14.7 K en Instagram · 498 publicaciones · ENNEA</p>
      </div>`;
  }

  function viewFaq() {
    return `
      <div class="page">
        <h2>Preguntas frecuentes</h2>
        <div class="faq" style="margin-top:16px">
          ${EE.faq.map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join("")}
        </div>
      </div>`;
  }

  function viewLegal(kind) {
    const titles = { terminos: "Términos y condiciones", privacidad: "Política de privacidad" };
    return `
      <div class="page prose">
        <h2>${titles[kind]}</h2>
        <p>Documento de plantilla para la plataforma. Sustituye esta página por el texto legal de tu entidad antes de cobrar de verdad.</p>
        <p>Recopilamos nombre, email y resultados del test solo en tu navegador (localStorage) en esta versión demo. No vendemos datos. El pago real deberá pasar por un procesador (p. ej. Stripe) y un aviso de privacidad conforme a la LFPDPPP.</p>
        <p>El eneagrama es un marco de desarrollo, no un diagnóstico clínico.</p>
      </div>`;
  }

  function render() {
    const hash = location.hash.replace(/^#/, "") || "/";
    const path = hash.startsWith("/") ? hash : "/" + hash;
    headerActive(path);
    $("#nav-mobile").classList.remove("open");

    if (path === "/" || path === "/home") root.innerHTML = viewHome();
    else if (path === "/cursos") root.innerHTML = viewCursos();
    else if (path.startsWith("/curso/")) root.innerHTML = viewCurso(path.split("/")[2]);
    else if (path === "/sesiones") root.innerHTML = viewSesiones();
    else if (path === "/biblioteca") root.innerHTML = viewBiblioteca();
    else if (path === "/tipos") root.innerHTML = viewTipos();
    else if (path.startsWith("/tipo/")) root.innerHTML = viewTipo(path.split("/")[2]);
    else if (path === "/test") root.innerHTML = viewTest();
    else if (path === "/perfil") root.innerHTML = viewPerfil();
    else if (path === "/login") root.innerHTML = viewLogin();
    else if (path === "/registro") root.innerHTML = viewRegistro();
    else if (path === "/nosotros") root.innerHTML = viewNosotros();
    else if (path === "/faq") root.innerHTML = viewFaq();
    else if (path === "/terminos") root.innerHTML = viewLegal("terminos");
    else if (path === "/privacidad") root.innerHTML = viewLegal("privacidad");
    else root.innerHTML = viewHome();

    bind();
    window.scrollTo(0, 0);
  }

  function filterList(container, attr, val) {
    $$("#" + container + " [data-kind]").forEach((el) => {
      el.style.display = val === "Todos" || el.dataset.kind === val ? "" : "none";
    });
  }

  function bind() {
    $$("[data-buy]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = JSON.parse(btn.getAttribute("data-buy"));
        store.addEnroll(item);
        if (item.price === 0) toast("Listo. En la versión demo el PDF queda marcado en tu perfil.");
        else toast("Reservado en este dispositivo. Te llevamos al perfil.");
        location.hash = "/perfil";
      });
    });

    const chipsLv = $("#chips-level");
    if (chipsLv) {
      chipsLv.addEventListener("click", (e) => {
        const b = e.target.closest(".chip"); if (!b) return;
        $$(".chip", chipsLv).forEach((c) => c.classList.toggle("active", c === b));
        const lv = b.dataset.lv;
        const q = ($("#q-cursos")?.value || "").toLowerCase();
        const list = EE.courses.filter((c) => (lv === "Todos" || c.level === lv) && (c.title + c.instructor).toLowerCase().includes(q));
        $("#list-cursos").innerHTML = list.map(courseCard).join("") || "<p class='muted'>Sin resultados.</p>";
        bind();
      });
      $("#q-cursos")?.addEventListener("input", () => {
        chipsLv.querySelector(".active")?.click();
      });
    }
    const chipsSes = $("#chips-ses");
    if (chipsSes) chipsSes.addEventListener("click", (e) => {
      const b = e.target.closest(".chip"); if (!b) return;
      $$(".chip", chipsSes).forEach((c) => c.classList.toggle("active", c === b));
      filterList("list-ses", "kind", b.dataset.k);
    });
    const chipsLib = $("#chips-lib");
    if (chipsLib) chipsLib.addEventListener("click", (e) => {
      const b = e.target.closest(".chip"); if (!b) return;
      $$(".chip", chipsLib).forEach((c) => c.classList.toggle("active", c === b));
      filterList("list-lib", "kind", b.dataset.k);
    });

    $("#start-test")?.addEventListener("click", () => {
      TEST.phase = "likert"; TEST.i = 0; TEST.likert = []; TEST.situ = [];
      root.innerHTML = viewTest(); bind();
    });
    $$(".likert-wrap button").forEach((b) => {
      b.addEventListener("click", () => {
        TEST.likert[TEST.i] = +b.dataset.val;
        TEST.i += 1;
        if (TEST.i >= EE.likert.length) { TEST.phase = "situ"; TEST.i = 0; }
        root.innerHTML = viewTest(); bind();
      });
    });
    $$(".opt").forEach((b) => {
      b.addEventListener("click", () => {
        TEST.situ[TEST.i] = +b.dataset.t;
        TEST.i += 1;
        if (TEST.i >= EE.situational.length) { TEST.phase = "done"; scoreTest(); }
        root.innerHTML = viewTest(); bind();
      });
    });
    $("#retake")?.addEventListener("click", () => {
      TEST.reset(); root.innerHTML = viewTest(); bind();
    });

    $("#form-login")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      store.user = { name: String(fd.get("email")).split("@")[0], email: fd.get("email") };
      location.hash = "/perfil";
    });
    $("#form-reg")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      if (fd.get("pass") !== fd.get("pass2")) return toast("Las contraseñas no coinciden");
      store.user = { name: fd.get("name"), email: fd.get("email") };
      location.hash = "/perfil";
    });
    $("[data-demo]")?.parentElement?.addEventListener("click", (e) => {
      if (!e.target.closest("[data-demo]")) return;
      store.user = { name: "Invitado", email: "hola@ennea.mx" };
      location.hash = "/perfil";
    });
    $("#logout")?.addEventListener("click", () => { store.user = null; render(); });
  }

  $("#burger")?.addEventListener("click", () => $("#nav-mobile").classList.toggle("open"));
  window.addEventListener("hashchange", render);
  render();
})();
