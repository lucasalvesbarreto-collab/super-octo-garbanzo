const routes = {
  "/": `
    <section class="hero" aria-labelledby="titulo-principal">
      <div>
        <span class="hero-label">Transformando vidas</span>
        <h1 id="titulo-principal">Juntos construímos um futuro melhor</h1>
        <p>
          Trabalhamos para transformar a comunidade por meio de projetos
          sociais e educacionais.
        </p>
        <a href="/projetos.html" data-link class="button">
          Conheça nossos projetos
        </a>
      </div>

      <img
        src="imagens/apresentacao.jpg"
        alt="Voluntários da ONG sorrindo durante uma ação social"
      >
    </section>
  `,

  "/index.html": `
    <section class="hero" aria-labelledby="titulo-principal">
      <div>
        <span class="hero-label">Transformando vidas</span>
        <h1 id="titulo-principal">Juntos construímos um futuro melhor</h1>
        <p>
          Trabalhamos para transformar a comunidade por meio de projetos
          sociais e educacionais.
        </p>
        <a href="/projetos.html" data-link class="button">
          Conheça nossos projetos
        </a>
      </div>

      <img
        src="imagens/apresentacao.jpg"
        alt="Voluntários da ONG sorrindo durante uma ação social"
      >
    </section>
  `,

  "/projetos.html": `
    <section aria-labelledby="titulo-projetos">
      <h1 id="titulo-projetos">Nossos projetos</h1>
      <p>
        Conheça nossas iniciativas sociais e descubra como colaborar.
      </p>
      <a href="/cadastro.html" data-link class="button">
        Quero colaborar
      </a>
    </section>
  `,

  "/cadastro.html": `
  <section id="formulario-cadastro" aria-labelledby="titulo-cadastro">
    <h1 id="titulo-cadastro">Formulário de cadastro</h1>

    <form data-spa-form>
      <label for="nome">Nome:</label>
      <input type="text" id="nome" name="nome" required>

      <label for="email">E-mail:</label>
      <input type="email" id="email" name="email" required>

      <button type="submit">Enviar cadastro</button>
    </form>
  </section>
`
};

function getAppContainer() {
  return document.querySelector("#app") || document.querySelector("main");
}

function normalizePath(path) {
  if (path === "/" || path.endsWith("/")) {
    return "/";
  }

  return path.replace(/\/+$/, "");
}

function renderView(path = window.location.pathname) {
  const app = getAppContainer();

  if (!app) {
    console.error("Nenhum elemento #app ou main foi encontrado.");
    return;
  }

  const normalizedPath = normalizePath(path);
  const view = routes[normalizedPath];

  app.innerHTML = view || `
    <section aria-labelledby="titulo-erro">
      <h1 id="titulo-erro">Página não encontrada</h1>
      <a href="/" data-link class="button">Voltar para o início</a>
    </section>
  `;
}

function navigateTo(url) {
  const destination = new URL(url, window.location.origin);

  window.history.pushState({}, "", destination.href);
  renderView(destination.pathname);
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-link]");

  if (!link || link.origin !== window.location.origin) {
    return;
  }

  event.preventDefault();
  navigateTo(link.href);
});

window.addEventListener("popstate", () => {
  renderView();
});

document.addEventListener("DOMContentLoaded", () => {
  renderView();
});

document.addEventListener('submit', (event) => {
  const form = event.target.closest('form[data-spa-form]');
  if (!form) return;

  event.preventDefault(); // Impede o reload do navegador

  // Coleta dados de forma declarativa via FormData
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  // Lógica dinâmica: exibe indicador de carregamento
  setFormLoadingState(form, true);

  // Simulação/Execução de requisição assíncrona
  submitDataToApi(payload)
    .then((response) => {
      showToast('Dados salvos com sucesso!', 'success');
      form.reset();
    })
    .catch((err) => showToast('Erro ao processar requisição', 'error'))
    .finally(() => setFormLoadingState(form, false));
});
