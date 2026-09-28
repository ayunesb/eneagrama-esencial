window.EEPages = {};
(function (P) {
  const $ = (sel, el = document) => el.querySelector(sel);
  const fmt = (n) => n === 0 ? 'Gratis' : '$' + n.toLocaleString('es-MX') + ' MXN';
  const store = {
    get user() { try { return JSON.parse(localStorage.getItem('ee_user') || 'null'); } catch { return null; } },
    set user(v) { localStorage.setItem('ee_user', JSON.stringify(v)); },
    get result() { try { return JSON.parse(localStorage.getItem('ee_result') || 'null'); } catch { return null; } },
    enrolls() { try { return JSON.parse(localStorage.getItem('ee_enrolls') || '[]'); } catch { return []; } },
  };
  P.viewPerfil = function() {
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

  P.viewLogin = function() {
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

  P.viewRegistro = function() {
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

  P.viewNosotros = function() {
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

  P.viewFaq = function() {
    return `
      <div class="page">
        <h2>Preguntas frecuentes</h2>
        <div class="faq" style="margin-top:16px">
          ${EE.faq.map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join("")}
        </div>
      </div>`;
  }

  P.viewLegal = function(kind) {
    const titles = { terminos: "Términos y condiciones", privacidad: "Política de privacidad" };
    return `
      <div class="page prose">
        <h2>${titles[kind]}</h2>
        <p>Documento de plantilla para la plataforma. Sustituye esta página por el texto legal de tu entidad antes de cobrar de verdad.</p>
        <p>Recopilamos nombre, email y resultados del test solo en tu navegador (localStorage) en esta versión demo. No vendemos datos. El pago real deberá pasar por un procesador (p. ej. Stripe) y un aviso de privacidad conforme a la LFPDPPP.</p>
        <p>El eneagrama es un marco de desarrollo, no un diagnóstico clínico.</p>
      </div>`;
  }

})(window.EEPages);
