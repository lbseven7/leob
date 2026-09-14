// ============================================================
// LEILÕES LEOB — Backend Google Apps Script (Google Sheets)
// ------------------------------------------------------------
// 1) Crie uma planilha e conecte ESTE script a ela
//    (Extensões > Apps Script > colar este código).
// 2) Implante como Web App: Executar como "Eu",
//    Acesso: "Qualquer pessoa" (Web app mode).
// 3) Copie a URL /exec para js/config-leiloes.js (api).
// ============================================================

var ABA_LOTES = 'Lotes';
var ABA_PARTICIPANTES = 'Participantes';
var ABA_LANCES = 'Lances';
var ABA_CONFIG = 'Config';

var CACHE_TTL_SEG = 3;
var EXTENSAO_MS = 120000; // anti-rajada: lance nos 2 min finais estende +2 min
var PREFIXO_CACHE = 'leob_';
// Cabeçalhos/colunas mudam raramente — cache longo evita reler planilha em toda chamada
var TTL_SETUP = 21600; // 6h (máx. do ScriptCache)
var TTL_CAMPOS = 21600;
var SETUP_OK_KEY = PREFIXO_CACHE + 'setup_ok';
var CAMPOS_KEY = PREFIXO_CACHE + 'campos';

var _planilhaCache = null;
function planilha() {
  if (!_planilhaCache) _planilhaCache = SpreadsheetApp.getActiveSpreadsheet();
  return _planilhaCache;
}

// Marca de versão injetada em toda resposta — permite confirmar no ar qual build está publicado.
var VERSAO_CODIGO = '2.1-cache';

// ---------- Estrutura da planilha ----------
var CABECALHOS = {
  Lotes: ['id', 'titulo_pt', 'titulo_en', 'imagem_url', 'tecnica', 'dimensoes',
    'descricao_pt', 'descricao_en', 'lance_inicial', 'incremento', 'inicio', 'fim',
    'estado', 'vencedor_id', 'valor_final', 'status_pagamento', 'obs', 'youtube_id'],
  Participantes: ['id', 'nome', 'whatsapp', 'cidade', 'uf', 'aceitou_regras', 'criado_em'],
  Lances: ['id', 'lote_id', 'participante_id', 'valor', 'criado_em'],
  Config: ['chave', 'valor']
};

function ensureSetup() {
  var cache = CacheService.getScriptCache();
  if (cache.get(SETUP_OK_KEY)) return;
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    // Reconfere depois do lock: outra chamada pode ter feito o setup.
    if (cache.get(SETUP_OK_KEY)) return;
    var ss = planilha();
    Object.keys(CABECALHOS).forEach(function (nome) {
      var sh = ss.getSheetByName(nome);
      if (!sh) sh = ss.insertSheet(nome);
      if (sh.getLastRow() < 1) {
        sh.appendRow(CABECALHOS[nome]);
      } else {
        // Garante colunas novas adicionadas em versões futuras do script
        var headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(function (v) { return String(v).trim(); });
        var adicionadas = CABECALHOS[nome].filter(function (h) { return headers.indexOf(h) === -1; });
        if (adicionadas.length) {
          sh.getRange(1, sh.getLastColumn() + 1, 1, adicionadas.length).setValues([adicionadas]);
          // Cabeçalhos mudaram: invalida o mapa de colunas em cache
          cache.remove(CAMPOS_KEY);
        }
      }
      if (nome === ABA_LANCES && sh.getLastRow() === 1) {
        // Índice simples para busca mais rápida (coluna B = lote_id)
        sh.getRange('A1').setNote('ID x lote_id x participante_id');
      }
    });
    cache.put(SETUP_OK_KEY, '1', TTL_SETUP);
  } finally {
    lock.releaseLock();
  }
}

// ---------- Utilitários ----------
function json(obj) {
  var out = obj;
  if (obj && typeof obj === 'object' && !obj.versao) {
    out = {};
    for (var k in obj) out[k] = obj[k];
    out.versao = VERSAO_CODIGO;
  }
  return ContentService
    .createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}

function toNum(v) {
  if (v === '' || v === null || v === undefined) return null;
  if (typeof v === 'number') return isFinite(v) ? v : null;
  var s = String(v).trim();
  if (s.indexOf(',') !== -1) {
    s = s.replace(/\./g, '').replace(',', '.'); // "1.200,50" -> 1200.5
  }
  var n = parseFloat(s);
  return isNaN(n) ? null : n;
}

function parseMs(v) {
  var d = new Date(v);
  return isNaN(d.getTime()) ? null : d.getTime();
}

function isoMs(ms) {
  return new Date(ms).toISOString();
}

function novoId(prefixo) {
  return prefixo + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function lerLinhas(nome) {
  var sh = planilha().getSheetByName(nome);
  if (!sh) return [];
  var ult = sh.getLastRow();
  if (ult < 2) return [];
  var range = sh.getRange(1, 1, ult, sh.getLastColumn());
  var vals = range.getValues();
  var headers = vals[0];
  var out = [];
  for (var i = 1; i < vals.length; i++) {
    var linha = {};
    var vazia = true;
    for (var c = 0; c < headers.length; c++) {
      var h = String(headers[c] === null || headers[c] === undefined ? '' : headers[c]).trim();
      var cel = vals[i][c];
      linha[h] = cel;
      if (cel !== '' && cel !== null && cel !== undefined) vazia = false;
    }
    if (!vazia) out.push(linha);
  }
  return out;
}

function appendLinha(nome, obj) {
  var sh = planilha().getSheetByName(nome);
  var linha = CABECALHOS[nome].map(function (h) {
    var v = obj[h];
    return (v === null || v === undefined) ? '' : v;
  });
  sh.appendRow(linha);
}

function acharIndiceLinha(nome, campo, valor) {
  var sh = planilha().getSheetByName(nome);
  var ult = sh.getLastRow();
  if (ult < 2) return -1;
  var col = CAMPO_COLUNA[nome][campo];
  if (!col) return -1;
  var vals = sh.getRange(2, col, ult - 1, 1).getValues();
  for (var i = 0; i < vals.length; i++) {
    if (String(vals[i][0]) === String(valor)) return i + 2; // linha real
  }
  return -1;
}

function atualizarCampo(nome, id, campo, valor) {
  var lin = acharIndiceLinha(nome, 'id', id);
  if (lin < 0) return false;
  var sh = planilha().getSheetByName(nome);
  var col = CAMPO_COLUNA[nome][campo];
  if (!col) return false;
  sh.getRange(lin, col).setValue(valor);
  return true;
}

var CAMPO_COLUNA = {}; // preenchido abaixo, após ensureSetup
function montarColunas(forcar) {
  var cache = CacheService.getScriptCache();
  if (!forcar) {
    var cacheado = cache.get(CAMPOS_KEY);
    if (cacheado) {
      try { CAMPO_COLUNA = JSON.parse(cacheado); return; } catch (e) { /* recria abaixo */ }
    }
  }
  var ss = planilha();
  Object.keys(CABECALHOS).forEach(function (nome) {
    var sh = ss.getSheetByName(nome);
    CAMPO_COLUNA[nome] = {};
    if (!sh) return;
    var ult = sh.getLastColumn();
    if (ult < 1) return;
    var headers = sh.getRange(1, 1, 1, ult).getValues()[0];
    for (var c = 0; c < headers.length; c++) {
      var h = String(headers[c]).trim();
      if (h) CAMPO_COLUNA[nome][h] = c + 1;
    }
  });
  cache.put(CAMPOS_KEY, JSON.stringify(CAMPO_COLUNA), TTL_CAMPOS);
}

function buscarLote(id) {
  var linhas = lerLinhas(ABA_LOTES);
  for (var i = 0; i < linhas.length; i++) {
    if (String(linhas[i].id) === String(id)) return linhas[i];
  }
  return null;
}

function buscarParticipante(id) {
  var linhas = lerLinhas(ABA_PARTICIPANTES);
  for (var i = 0; i < linhas.length; i++) {
    if (String(linhas[i].id) === String(id)) return linhas[i];
  }
  return null;
}

function lancesDoLote(loteId) {
  var linhas = lerLinhas(ABA_LANCES);
  var out = [];
  for (var i = 0; i < linhas.length; i++) {
    if (String(linhas[i].lote_id) === String(loteId)) {
      out.push({
        particid: linhas[i].participante_id,
        valor: toNum(linhas[i].valor),
        criado_em: linhas[i].criado_em
      });
    }
  }
  out.sort(function (a, b) {
    if (b.valor !== a.valor) return b.valor - a.valor;
    return (parseMs(a.criado_em) || 0) - (parseMs(b.criado_em) || 0);
  });
  return out;
}

function estadoDerivado(lote, agora) {
  var inicio = parseMs(lote.inicio);
  var fim = parseMs(lote.fim);
  if (inicio === null || fim === null) return lote.estado || 'agendado';
  if (agora < inicio) return 'agendado';
  if (agora <= fim) return 'aberto';
  return 'encerrado';
}

function apurarVencedor(loteId) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var lote = buscarLote(loteId);
    if (!lote) return null;
    if (lote.vencedor_id && lote.valor_final) {
      return { vencedor_id: lote.vencedor_id, valor_final: toNum(lote.valor_final), status_pagamento: lote.status_pagamento || 'aguardando_pagamento' };
    }
    var lances = lancesDoLote(loteId);
    if (!lances.length) return null;
    var topo = lances[0];
    atualizarCampo(ABA_LOTES, loteId, 'vencedor_id', topo.particid);
    atualizarCampo(ABA_LOTES, loteId, 'valor_final', topo.valor);
    atualizarCampo(ABA_LOTES, loteId, 'status_pagamento', 'aguardando_pagamento');
    limparCachesPublicos();
    return { vencedor_id: topo.particid, valor_final: topo.valor, status_pagamento: 'aguardando_pagamento' };
  } finally {
    lock.releaseLock();
  }
}

function refreshCacheDeLote(loteId, estadoObj) {
  var cache = CacheService.getScriptCache();
  cache.put(PREFIXO_CACHE + 'estado_' + loteId, JSON.stringify(estadoObj), CACHE_TTL_SEG);
}

// ---------- Endpoints (GET) ----------
function doGet(e) {
  ensureSetup();
  montarColunas();
  var p = (e && e.parameter) || {};
  var action = p.action || 'estado';
  try {
    if (action === 'estado') return json(loteEstado(p.lote));
    if (action === 'lance') return json(fazerLance(p));
    if (action === 'registrar') return json(registrar(p));
    if (action === 'lotes') return json(listarLotes());
    if (action === 'admin') return json(adminData());
    return json({ ok: false, motivo: 'Ação desconhecida' });
  } catch (err) {
    return json({ ok: false, motivo: 'Erro: ' + err.message });
  }
}

// ---------- Endpoints (POST - admin, no-cors) ----------
function doPost(e) {
  ensureSetup();
  montarColunas();
  try {
    var dados = JSON.parse(e.postData.getDataAsString('UTF-8'));
    var action = dados.action;
    if (action === 'addLote') return json(addEditLote(dados, false));
    if (action === 'editLote') return json(addEditLote(dados, true));
    if (action === 'setStatus') return json(setStatus(dados));
    if (action === 'deleteLote') return json(deleteLote(dados));
    if (action === 'deleteLance') return json(deleteLance(dados));
    if (action === 'deleteParticipante') return json(deleteParticipante(dados));
    if (action === 'limparCache') return json(limparCache());
    return json({ ok: false, motivo: 'Ação desconhecida' });
  } catch (err) {
    return json({ ok: false, motivo: 'Erro: ' + err.message });
  }
}

// ---------- Estado do lote (polling público) ----------
function loteEstado(loteId) {
  var key = PREFIXO_CACHE + 'estado_' + loteId;
  var cache = CacheService.getScriptCache();
  var cacheado = cache.get(key);
  if (cacheado) return JSON.parse(cacheado);

  var lote = buscarLote(loteId);
  if (!lote) return { ok: false, motivo: 'Lote não encontrado' };

  var agora = Date.now();
  var inicioMs = parseMs(lote.inicio);
  var fimMs = parseMs(lote.fim);
  var estado = estadoDerivado(lote, agora);

  // Se encerrado e ainda sem vencedor, apura automaticamente.
  var apurado = null;
  if (estado === 'encerrado') {
    apurado = apurarVencedor(loteId);
    if (apurado) {
      lote = buscarLote(loteId);
    }
  }

  var lances = lancesDoLote(loteId);
  var lanceMaximo = lances.length ? lances[0].valor : null;
  var ultimos = lances.slice(0, 20);
  var participantesUtil = {};
  lances.forEach(function (x) { participantesUtil[x.particid] = 1; });

  var resultado = {
    ok: true,
    horaServidor: agora,
    lote: {
      id: lote.id,
      titulo_pt: lote.titulo_pt,
      titulo_en: lote.titulo_en,
      imagem_url: lote.imagem_url,
      tecnica: lote.tecnica,
      dimensoes: lote.dimensoes,
      descricao_pt: lote.descricao_pt,
      descricao_en: lote.descricao_en,
      lance_inicial: toNum(lote.lance_inicial),
      incremento: toNum(lote.incremento),
      inicio: inicioMs,
      fim: fimMs,
      estado: estado,
      status_pagamento: apurado ? apurado.status_pagamento : (lote.status_pagamento || ''),
      obs: lote.obs,
      youtube_id: lote.youtube_id || ''
    },
    lanceMaximo: lanceMaximo,
    lancamentos: ultimos.map(function (x) { return { valor: x.valor, criado_em: parseMs(x.criado_em) }; }),
    totalLances: lances.length,
    participantes: Object.keys(participantesUtil).length,
    terminaEm: fimMs,
    vencedor: null
  };

  if (estado === 'encerrado') {
    var v = apurado;
    if (v && v.vencedor_id) {
      var p = buscarParticipante(v.vencedor_id);
      resultado.vencedor = p ? {
        id: p.id,
        nome: p.nome,
        cidade: p.cidade,
        uf: p.uf
      } : { id: v.vencedor_id, nome: 'Participante', cidade: '', uf: '' };
      resultado.lote.valor_final = v.valor_final;
      resultado.lote.status_pagamento = v.status_pagamento;
    }
  }

  refreshCacheDeLote(loteId, resultado);
  return resultado;
}

// ---------- Registrar participante ----------
function registrar(p) {
  var nome = (p.nome || '').toString().trim();
  var whatsappDig = String(p.whatsapp || '').replace(/[^0-9]/g, '');
  var cidade = (p.cidade || '').toString().trim();
  var uf = (p.uf || '').toString().trim().toUpperCase();
  var aceitou = String(p.aceitou) === '1' || String(p.aceitou).toLowerCase() === 'true';

  if (!nome) return { ok: false, motivo: 'Informe seu nome.' };
  // Celular brasileiro: DDD (2) + 9 + 8 dígitos = 11 dígitos
  if (!/^[1-9]{2}9[0-9]{8}$/.test(whatsappDig)) {
    return { ok: false, motivo: 'WhatsApp inválido. Informe um celular com DDD (ex: 73999112233).' };
  }
  if (!cidade) return { ok: false, motivo: 'Informe sua cidade.' };
  if (!uf) return { ok: false, motivo: 'Informe seu estado (UF).' };
  if (!aceitou) return { ok: false, motivo: 'Você precisa aceitar as regras do leilão.' };

  // Não permite cadastrar dois participantes com o mesmo número
  var existentes = lerLinhas(ABA_PARTICIPANTES);
  for (var i = 0; i < existentes.length; i++) {
    if (String(existentes[i].whatsapp || '').replace(/[^0-9]/g, '') === whatsappDig) {
      return { ok: false, motivo: 'Este WhatsApp já está cadastrado. Use outro número.' };
    }
  }

  var id = novoId('P');
  appendLinha(ABA_PARTICIPANTES, {
    id: id,
    nome: nome,
    whatsapp: whatsappDig,
    cidade: cidade,
    uf: uf,
    aceitou_regras: 'sim',
    criado_em: isoMs(Date.now())
  });
  limparCachesPublicos();
  return { ok: true, id: id, nome: nome };
}

// ---------- Fazer lance ----------
function fazerLance(p) {
  var loteId = String(p.lote || '');
  var participanteId = String(p.participante || '');
  var valor = toNum(p.valor);

  if (!loteId) return { ok: false, motivo: 'Lote inválido.' };
  if (!participanteId) return { ok: false, motivo: 'Cadastre-se antes de dar lance.' };
  if (valor === null || valor <= 0) return { ok: false, motivo: 'Valor de lance inválido.' };

  if (!buscarParticipante(participanteId)) {
    return { ok: false, motivo: 'Participante não encontrado. Cadastre-se novamente.' };
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var lote = buscarLote(loteId);
    if (!lote) return { ok: false, motivo: 'Lote não encontrado.' };

    var agora = Date.now();
    var inicio = parseMs(lote.inicio);
    var fim = parseMs(lote.fim);
    if (inicio === null || fim === null) return { ok: false, motivo: 'Lote sem datas válidas.' };
    if (agora < inicio) return { ok: false, motivo: 'Este leilão ainda não começou.' };
    if (agora > fim) return { ok: false, motivo: 'Este leilão já foi encerrado.' };

    var lancamentos = lancesDoLote(loteId);
    var maxi = lancamentos.length ? lancamentos[0].valor : null;
    var lanceInicial = toNum(lote.lance_inicial);
    var incremento = toNum(lote.incremento);
    var minimoAceito = (maxi === null) ? lanceInicial : (maxi + incremento);

    if (valor < minimoAceito) {
      return { ok: false, motivo: 'Lance mínimo para este momento: ' + minimoAceito + '.', minimoNecessario: minimoAceito };
    }

    appendLinha(ABA_LANCES, {
      id: novoId('B'),
      lote_id: loteId,
      participante_id: participanteId,
      valor: valor,
      criado_em: isoMs(agora)
    });

    // Anti-rajada: estende o prazo se o lance entrar nos 2 min finais.
    var novoFim = parseMs(lote.fim);
    if (fim - agora < EXTENSAO_MS) {
      novoFim = agora + EXTENSAO_MS;
      atualizarCampo(ABA_LOTES, loteId, 'fim', isoMs(novoFim));
    }

    var cache = CacheService.getScriptCache();
    cache.remove(PREFIXO_CACHE + 'estado_' + loteId);
    limparCachesPublicos();

    return { ok: true, valor: valor, novoMaximo: valor, terminaEm: novoFim };
  } finally {
    lock.releaseLock();
  }
}

// ---------- Lista de lotes (vitrine) ----------
function listarLotes() {
  var key = PREFIXO_CACHE + 'lista_lotes';
  var cache = CacheService.getScriptCache();
  var cacheado = cache.get(key);
  if (cacheado) return JSON.parse(cacheado);

  var linhas = lerLinhas(ABA_LOTES);
  var agora = Date.now();
  var lances = lerLinhas(ABA_LANCES);
  var porLote = {};
  lances.forEach(function (l) {
    var k = String(l.lote_id);
    var v = toNum(l.valor);
    if (!(k in porLote)) porLote[k] = { maxi: v, qtd: 0, partic: {} };
    var rec = porLote[k];
    if (v > rec.maxi) rec.maxi = v;
    rec.qtd += 1;
    rec.partic[String(l.participante_id)] = 1;
  });

  // Mapa de participantes carregado UMA vez
  var participantePorId = {};
  lerLinhas(ABA_PARTICIPANTES).forEach(function (p) {
    if (p.id) participantePorId[String(p.id)] = p;
  });

  var out = linhas.filter(function (l) { return l.id; }).map(function (l) {
    var inicioMs = parseMs(l.inicio);
    var fimMs = parseMs(l.fim);
    var k = String(l.id);
    var info = porLote[k] || { maxi: null, qtd: 0, partic: {} };
    var vencedor = null;
    if (l.vencedor_id) {
      var p = participantePorId[String(l.vencedor_id)] || null;
      vencedor = { id: l.vencedor_id, nome: p ? p.nome : null, cidade: p ? p.cidade : null };
    }
    return {
      id: l.id,
      titulo_pt: l.titulo_pt,
      titulo_en: l.titulo_en,
      tecnica: l.tecnica,
      dimensoes: l.dimensoes,
      imagem_url: l.imagem_url,
      lance_inicial: toNum(l.lance_inicial),
      incremento: toNum(l.incremento),
      inicio: inicioMs,
      fim: fimMs,
      estado: estadoDerivado(l, agora),
      lanceMaximo: info.maxi,
      totalLances: info.qtd,
      participantes: Object.keys(info.partic || {}).length,
      valorFinal: toNum(l.valor_final),
      status_pagamento: l.status_pagamento || '',
      vencedor: vencedor,
      descricao_pt: l.descricao_pt,
      descricao_en: l.descricao_en,
      youtube_id: l.youtube_id || ''
    };
  });
  out.sort(function (a, b) { return (a.inicio || 0) - (b.inicio || 0); });
  var resultado = { ok: true, lotes: out };
  cache.put(key, JSON.stringify(resultado), 6);
  return resultado;
}

// ---------- Admin ----------
function adminData() {
  var key = PREFIXO_CACHE + 'admin';
  var cache = CacheService.getScriptCache();
  var cacheado = cache.get(key);
  if (cacheado) return JSON.parse(cacheado);

  var lotes = lerLinhas(ABA_LOTES);
  var participantes = lerLinhas(ABA_PARTICIPANTES);
  var lances = lerLinhas(ABA_LANCES);
  var agora = Date.now();

  // Mapa de participantes carregado UMA vez
  var participantePorId = {};
  participantes.forEach(function (p) {
    if (p.id) participantePorId[String(p.id)] = p;
  });

  var lotesApi = lotes.filter(function (l) { return l.id; }).map(function (l) {
    var lancesLote = lances.filter(function (x) { return String(x.lote_id) === String(l.id); });
    var maxi = null;
    lancesLote.forEach(function (x) { var v = toNum(x.valor); if (maxi === null || (v !== null && v > maxi)) maxi = v; });
    return {
      id: l.id,
      titulo_pt: l.titulo_pt,
      titulo_en: l.titulo_en,
      imagem_url: l.imagem_url,
      tecnica: l.tecnica,
      dimensoes: l.dimensoes,
      descricao_pt: l.descricao_pt,
      descricao_en: l.descricao_en,
      lance_inicial: toNum(l.lance_inicial),
      incremento: toNum(l.incremento),
      inicio: parseMs(l.inicio),
      fim: parseMs(l.fim),
      estado: estadoDerivado(l, agora),
      lanceMaximo: maxi,
      totalLances: lancesLote.length,
      vencedor_id: l.vencedor_id || '',
      valor_final: toNum(l.valor_final),
      status_pagamento: l.status_pagamento || 'aguardando_pagamento',
      obs: l.obs,
      youtube_id: (l.youtube_id || '')
    };
  });

  var lancesApi = lances.map(function (l) {
    var p = participantePorId[String(l.participante_id)] || null;
    return {
      id: l.id,
      lote_id: l.lote_id,
      participante_id: l.participante_id,
      nome: p ? p.nome : '?',
      whatsapp: p ? p.whatsapp : '',
      cidade: p ? p.cidade : '',
      uf: p ? p.uf : '',
      valor: toNum(l.valor),
      criado_em: parseMs(l.criado_em)
    };
  });

  var resultado = { ok: true, lotes: lotesApi, participantes: participantes, lances: lancesApi };
  cache.put(key, JSON.stringify(resultado), 6);
  return resultado;
}

function addEditLote(dados, isEdit) {
  var titulo = (dados.titulo_pt || dados.titulo || '').toString().trim();
  var lanceInicial = toNum(dados.lance_inicial);
  var incremento = toNum(dados.incremento);
  var inicio = parseMs(dados.inicio);
  var fim = parseMs(dados.fim);

  if (!titulo) return { ok: false, motivo: 'Informe o título do lote.' };
  if (lanceInicial === null || lanceInicial <= 0) return { ok: false, motivo: 'Informe um lance inicial válido.' };
  if (incremento === null || incremento <= 0) return { ok: false, motivo: 'Informe um incremento mínimo válido.' };
  if (inicio === null || fim === null) return { ok: false, motivo: 'Informe datas de início e fim.' };
  if (fim <= inicio) return { ok: false, motivo: 'O fim deve ser depois do início.' };

  var linha = {
    id: isEdit ? dados.id : novoId('L'),
    titulo_pt: titulo,
    titulo_en: (dados.titulo_en || '').toString().trim(),
    imagem_url: (dados.imagem_url || '').toString().trim(),
    tecnica: (dados.tecnica || '').toString().trim(),
    dimensoes: (dados.dimensoes || '').toString().trim(),
    descricao_pt: (dados.descricao_pt || '').toString().trim(),
    descricao_en: (dados.descricao_en || '').toString().trim(),
    lance_inicial: lanceInicial,
    incremento: incremento,
    inicio: isoMs(inicio),
    fim: isoMs(fim),
    estado: dados.estado || '',
    vencedor_id: isEdit ? (dados.vencedor_id || '') : '',
    valor_final: isEdit ? (dados.valor_final || '') : '',
    status_pagamento: isEdit ? (dados.status_pagamento || 'aguardando_pagamento') : 'aguardando_pagamento',
    obs: (dados.obs || '').toString().trim(),
    youtube_id: (dados.youtube_id || '').toString().trim()
  };

  if (isEdit) {
    var lin = acharIndiceLinha(ABA_LOTES, 'id', dados.id);
    if (lin < 0) return { ok: false, motivo: 'Lote não encontrado.' };
    CABECALHOS[ABA_LOTES].forEach(function (h, i) {
      planilha().getSheetByName(ABA_LOTES)
        .getRange(lin, i + 1).setValue(linha[h]);
    });
    var cache = CacheService.getScriptCache();
    cache.remove(PREFIXO_CACHE + 'estado_' + dados.id);
    limparCachesPublicos();
    return { ok: true, id: dados.id };
  }

  appendLinha(ABA_LOTES, linha);
  limparCachesPublicos();
  return { ok: true, id: linha.id };
}

function setStatus(dados) {
  var loteId = String(dados.lote_id || '');
  var status = String(dados.status_pagamento || '');
  if (!loteId || !status) return { ok: false, motivo: 'Parâmetros inválidos.' };
  atualizarCampo(ABA_LOTES, loteId, 'status_pagamento', status);
  var cache = CacheService.getScriptCache();
  cache.remove(PREFIXO_CACHE + 'estado_' + loteId);
  limparCachesPublicos();
  return { ok: true };
}

function deleteLote(dados) {
  var lin = acharIndiceLinha(ABA_LOTES, 'id', String(dados.lote_id || ''));
  if (lin < 0) return { ok: false, motivo: 'Lote não encontrado.' };
  planilha().getSheetByName(ABA_LOTES).deleteRow(lin);
  var cache = CacheService.getScriptCache();
  cache.remove(PREFIXO_CACHE + 'estado_' + String(dados.lote_id || ''));
  limparCachesPublicos();
  return { ok: true };
}

function deleteLance(dados) {
  var sh = planilha().getSheetByName(ABA_LANCES);
  var lin = acharIndiceLinha(ABA_LANCES, 'id', String(dados.lance_id || ''));
  if (lin < 0) return { ok: false, motivo: 'Lance não encontrado.' };
  var colLote = CAMPO_COLUNA[ABA_LANCES]['lote_id'];
  var loteId = colLote ? String(sh.getRange(lin, colLote).getValue()) : '';
  sh.deleteRow(lin);
  var cache = CacheService.getScriptCache();
  cache.remove(PREFIXO_CACHE + 'estado_' + loteId);
  limparCachesPublicos();
  return { ok: true };
}

function deleteParticipante(dados) {
  var partId = String(dados.participante_id || '');
  var lin = acharIndiceLinha(ABA_PARTICIPANTES, 'id', partId);
  if (lin < 0) return { ok: false, motivo: 'Participante não encontrado.' };

  // Remove o participante
  planilha().getSheetByName(ABA_PARTICIPANTES).deleteRow(lin);

  // Remove TODOS os lances do participante em uma única leitura e de baixo para
  // cima — evita índices deslocados entre deleteRow() e o "?" órfão no admin.
  var shLances = planilha().getSheetByName(ABA_LANCES);
  var col = CAMPO_COLUNA[ABA_LANCES]['participante_id'];
  var ult = shLances.getLastRow();
  if (col && ult > 1) {
    var vals = shLances.getRange(2, col, ult - 1, 1).getValues();
    var inds = [];
    for (var i = 0; i < vals.length; i++) {
      if (String(vals[i][0]) === partId) inds.push(i + 2);
    }
    inds.sort(function (a, b) { return b - a; }); // de baixo para cima
    for (var j = 0; j < inds.length; j++) shLances.deleteRow(inds[j]);
  }

  var cache = CacheService.getScriptCache();
  cache.removeAll([]);
  return { ok: true };
}

function limparCache() {
  var cache = CacheService.getScriptCache();
  cache.removeAll([]);
  return { ok: true };
}

function limparCachesPublicos() {
  var cache = CacheService.getScriptCache();
  cache.remove(PREFIXO_CACHE + 'admin');
  cache.remove(PREFIXO_CACHE + 'lista_lotes');
}

// ---------- Menu no editor do Apps Script ----------
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Leilões leob.')
    .addItem('Limpar cache', 'limparCache')
    .addToUi();
}

function teste() {
  // Chamado manualmente no editor para validar o setup.
  ensureSetup();
  montarColunas();
  return 'Setup ok!';
}