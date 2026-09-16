import {
  carregarRascunho,
  salvarRascunho,
  registrarCadastro,
  removerRascunho
} from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form[data-spa-form]");

  if (!form) return;

  const campos = form.querySelectorAll("input, select");
  const feedback = document.querySelector("#form-feedback");

  function coletarDados() {
    const dados = {};

    campos.forEach((campo) => {
      if (campo.type === "checkbox") {
        if (!Array.isArray(dados[campo.name])) {
          dados[campo.name] = [];
        }

        if (campo.checked) {
          dados[campo.name].push(campo.value);
        }
        return;
      }

      dados[campo.name] = campo.value;
    });

    return dados;
  }

function restaurarDados() {
  try {
    // Garante um objeto válido (fallback) caso o retorno seja null/undefined
    const dados = carregarRascunho() || {};

    campos.forEach((campo) => {
      const valorRascunho = dados[campo.name];

      if (campo.type === "checkbox") {
        // Valida se é um Array antes de chamar o método .includes()
        campo.checked = Array.isArray(valorRascunho) && valorRascunho.includes(campo.value);
        return;
      }

      if (Object.prototype.hasOwnProperty.call(dados, campo.name) && valorRascunho !== undefined) {
        campo.value = valorRascunho;
      }
    });
  } catch (erro) {
    console.warn("Falha ao restaurar rascunho. O formulário será inicializado limpo:", erro);
  }
}

  function obterMensagem(campo) {
    if (campo.validity.valueMissing) {
      return "Este campo é obrigatório.";
    }

    if (campo.validity.typeMismatch) {
      return "Digite um formato válido.";
    }

    if (campo.validity.patternMismatch) {
      return campo.title || "Digite o formato correto.";
    }

    return "";
  }

function obterElementoMensagem(campo) {
  // 1. Gera um ID dinâmico se o elemento não possuir ID no HTML
  const campoId = campo.id || `campo-${campo.name}`;
  if (!campo.id) {
    campo.id = campoId;
  }

  let mensagem = document.getElementById(`${campoId}-mensagem`);

  if (!mensagem) {
    mensagem = document.createElement("small");
    mensagem.id = `${campoId}-mensagem`;
    mensagem.className = "mensagem-campo";

    // 2. Fallback: se não houver container <p>, anexa no elemento pai direto
    const container = campo.closest("p") || campo.parentElement;
    container.appendChild(mensagem);
  }

  return mensagem;
}

  function validarCampo(campo) {
    const mensagem = obterElementoMensagem(campo);

    campo.setCustomValidity("");

    const texto = obterMensagem(campo);

    if (texto) {
      campo.setCustomValidity(texto);
    }

    const invalido = !campo.validity.valid;
    campo.classList.toggle("campo-invalido", invalido);
    campo.classList.toggle("campo-valido", !invalido && campo.value !== "");
    campo.setAttribute("aria-invalid", String(invalido));
    campo.setAttribute("aria-describedby", mensagem.id);
    mensagem.textContent = texto;
    mensagem.hidden = !texto;
  }

  restaurarDados();
  campos.forEach(validarCampo);

  campos.forEach((campo) => {
    campo.addEventListener("input", () => {
      validarCampo(campo);
      salvarRascunho(coletarDados());
    });
    campo.addEventListener("change", () => {
      validarCampo(campo);
      salvarRascunho(coletarDados());
    });
  });

  form.addEventListener("submit", (event) => {
    campos.forEach(validarCampo);

    if (!form.checkValidity()) {
      event.preventDefault();

      const primeiroInvalido = form.querySelector(":invalid");

      if (feedback) {
        feedback.textContent = "Revise os campos destacados antes de concluir o cadastro.";
        feedback.className = "form-feedback form-feedback-erro";
        feedback.hidden = false;
      }

      primeiroInvalido?.focus();
      form.reportValidity();
      return;
    }

    event.preventDefault();

    const cadastroSalvo = registrarCadastro(coletarDados());
    removerRascunho();

    if (feedback) {
      feedback.textContent = cadastroSalvo
        ? "Cadastro salvo neste navegador com sucesso."
        : "Cadastro validado, mas não foi possível persistir os dados neste navegador.";
      feedback.className = "form-feedback form-feedback-sucesso";
      feedback.hidden = false;
    }
  });
});