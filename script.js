// Elementos do resumo da conta
const saldoElement = document.getElementById("saldo");
const entradasElement = document.getElementById("entradas");
const saidasElement = document.getElementById("saidas");

// Elementos da área PIX
const pixArea = document.getElementById("pix-area");
const areaPixButton = document.getElementById("area-pix");
const tabReceberButton = document.getElementById("tab-receber");
const tabTransferirButton = document.getElementById("tab-transferir");
const formReceber = document.getElementById("form-receber");
const formTransferir = document.getElementById("form-transferir");

// Inputs dos formulários PIX
const receberCnpjInput = document.getElementById("receber-cnpj");
const receberValorInput = document.getElementById("receber-valor");
const transferirChaveInput = document.getElementById("transferir-chave");
const transferirValorInput = document.getElementById("transferir-valor");

// Botões de ação
const receberSubmitButton = document.getElementById("receber-submit");
const transferirSubmitButton = document.getElementById("transferir-submit");
const pagarButton = document.getElementById("pagar");
const investirButton = document.getElementById("investir");

// Elementos de transações
const listaTransacoes = document.getElementById("lista-transacoes");

// Dados de exemplo
let saldo = 0.00; // Saldo inicial
let entradas = 0.00;
let saidas = 0.00;

// Atualiza os valores no resumo da conta
function atualizarResumo() {
  saldoElement.textContent = saldo.toFixed(2);
  entradasElement.textContent = entradas.toFixed(2);
  saidasElement.textContent = saidas.toFixed(2);
}

// Gera um ID único para cada transação
function gerarIdTransacao() {
  const now = new Date();
  const ano = now.getFullYear();
  const mes = String(now.getMonth() + 1).padStart(2, "0");
  const dia = String(now.getDate()).padStart(2, "0");
  const hora = String(now.getHours()).padStart(2, "0");
  const minuto = String(now.getMinutes()).padStart(2, "0");
  const segundo = String(now.getSeconds()).padStart(2, "0");
  return `${ano}${mes}${dia}${hora}${minuto}${segundo}`;
}

// Adiciona uma transação à lista
function adicionarTransacao(titulo, tipo, valor) {
  const id = gerarIdTransacao();
  const data = new Date();
  const dataFormatada = data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const li = document.createElement("li");
  li.innerHTML = `
    <span class="transacao-titulo">${titulo}</span> 
    <span class="transacao-tipo">${tipo}</span>
    <span class="transacao-data">${dataFormatada}</span>
    <span class="transacao-valor">R$ ${valor.toFixed(2)}</span>
    <span class="transacao-id">ID: ${id}</span>
  `;

  listaTransacoes.appendChild(li);
}

// Alterna entre as abas "Receber" e "Transferir" na área PIX
function alternarPixTab(aba) {
  if (aba === "receber") {
    formReceber.style.display = "block";
    formTransferir.style.display = "none";
  } else if (aba === "transferir") {
    formReceber.style.display = "none";
    formTransferir.style.display = "block";
  }
}

// Exibe ou oculta a área PIX
areaPixButton.addEventListener("click", () => {
  pixArea.style.display = pixArea.style.display === "none" ? "block" : "none";
});

// Eventos de alternância de abas na área PIX
tabReceberButton.addEventListener("click", () => alternarPixTab("receber"));
tabTransferirButton.addEventListener("click", () => alternarPixTab("transferir"));

// Lógica para "Receber" dinheiro via PIX
receberSubmitButton.addEventListener("click", () => {
  const valor = parseFloat(receberValorInput.value);

  if (!isNaN(valor) && valor > 0) {
    entradas += valor;
    saldo += valor;

    // Atualiza o resumo
    atualizarResumo();

    // Adiciona a transação à lista
    adicionarTransacao("Entrada", "Transferência recebida", valor);

    // Feedback visual
    alert(`Você recebeu R$ ${valor.toFixed(2)} via PIX!`);
  } else {
    alert("Por favor, insira um valor válido para receber.");
  }

  // Limpa os campos
  receberCnpjInput.value = "";
  receberValorInput.value = "";
});

// Lógica para "Transferir" dinheiro via PIX
transferirSubmitButton.addEventListener("click", () => {
  const valor = parseFloat(transferirValorInput.value);

  if (!isNaN(valor) && valor > 0 && valor <= saldo) {
    saidas += valor;
    saldo -= valor;

    // Atualiza o resumo
    atualizarResumo();

    // Adiciona a transação à lista
    adicionarTransacao("Saída", "Transferência enviada", valor);

    // Feedback visual
    alert(`Você transferiu R$ ${valor.toFixed(2)} via PIX!`);
  } else if (valor > saldo) {
    alert("Saldo insuficiente para realizar a transferência.");
  } else {
    alert("Por favor, insira um valor válido para transferir.");
  }

  // Limpa os campos
  transferirChaveInput.value = "";
  transferirValorInput.value = "";
});

// Eventos para botões Pagar e Investir
pagarButton.addEventListener("click", () => {
  alert("Sistema indisponível. Tente novamente mais tarde.");
});

investirButton.addEventListener("click", () => {
  alert("Sistema indisponível. Tente novamente mais tarde.");
});

// Inicializa os valores no resumo da conta ao carregar a página
atualizarResumo();
