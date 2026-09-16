const CHAVE_RASCUNHO = "ong-esperanca-viva:cadastro:rascunho";
const CHAVE_HISTORICO = "ong-esperanca-viva:cadastro:historico";
const LIMITE_HISTORICO = 10;

function lerStorage(chave, valorPadrao) {
  try {
    const valor = localStorage.getItem(chave);
    return valor ? JSON.parse(valor) : valorPadrao;
  } catch {
    return valorPadrao;
  }
}

function gravarStorage(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
}

export function carregarRascunho() {
  const dados = lerStorage(CHAVE_RASCUNHO, {});

  if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
    return {};
  }

  return dados;
}

export function salvarRascunho(dados) {
  return gravarStorage(CHAVE_RASCUNHO, dados);
}

export function removerRascunho() {
  try {
    localStorage.removeItem(CHAVE_RASCUNHO);
  } catch {
    return false;
  }

  return true;
}

export function registrarCadastro(dados) {
  const historico = lerStorage(CHAVE_HISTORICO, []);

  if (!Array.isArray(historico)) {
    return false;
  }

  historico.push({
    ...dados,
    enviadoEm: new Date().toISOString()
  });

  return gravarStorage(
    CHAVE_HISTORICO,
    historico.slice(-LIMITE_HISTORICO)
  );
}
