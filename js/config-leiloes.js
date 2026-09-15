// ============================================================
// CONFIGURAÇÃO DOS LEILÕES — leob.
// Preencha estes dados após criar o Web App no Apps Script.
// ============================================================
window.LEILOES = {
  // URL do Web App do Google Apps Script (termina em /exec)
  api: 'https://script.google.com/macros/s/AKfycbyAXZHCTM1WvMjuedOL9guwDRZVQwE-5sf4fkYwuHVtXUxEyW-jYQSyyS6aapu6gF4/exec',

  // Dados PIX (geração do BR Code / copia-e-cola)
  pix: {
    chave: '01642647527',       // chave PIX (CPF)
    nome: 'ALEXSANDRO B DOS SANTOS', // nome do recebedor (máx. 25 caracteres)
    cidade: 'JAGUAQUARA'        // cidade do recebedor (até 15 caracteres)
  },

  // WhatsApp de contato do leiloeiro (só números, com DDD)
  whatsapp: '5573991182932',

  // Cidade/região de origem (para as regras de frete)
  cidadeLeiloeiro: 'Jaguaquara',

  // Ajustes
  extensaoMs: 120000,       // anti-rajada: +2 min nos min finais
  pollMs: 4000,             // intervalo de polling em ms

  // Chaves de localStorage
  storageParticipante: 'leob_participante'
};