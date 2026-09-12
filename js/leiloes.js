// ============================================================
// LEILÕES LEOB — Lógica do cliente (páginas públicas)
// ============================================================
(function () {
  var CFG = window.LEILOES;

  // ---------- i18n específico dos leilões ----------
  var TEX = {
    pt: {
      participantes: 'Participantes',
      agendado: 'Em breve',
      aberto: 'AO VIVO',
      encerrado: 'Encerrado',
      lanceInicial: 'Lance inicial',
      lanceMaximo: 'Lance mais alto',
      incremento: 'Incremento mínimo',
      totalLances: 'Lances',
      terminara: 'Encerra em',
      comecaEm: 'Começa em',
      regrasFrete: 'Frete: para vencedores fora de ' + (CFG.cidadeLeiloeiro || 'minha cidade') + ', as despesas de envio ficam por conta do comprador.',
      participar: 'Participar do leilão',
      acompanhar: 'Acompanhar',
      verResultado: 'Ver resultado',
      seuCadastro: 'Cadastro realizado',
      darLance: 'Dar lance',
      valorLance: 'Valor do lance (R$)',
      agoraPodeLance: 'Está aberto! Dê o seu lance.',
      aguardando: 'Ainda não abriu. Volte na hora marcada para participar ao vivo.',
      fechou: 'Este leilão chegou ao fim.',
      venceu: 'LANCE VENCEDOR',
      semLances: 'Nenhum lance até o momento.',
      seuLanceMax: 'Seu lance mais alto',
      voceVenceu: 'Você venceu este leilão!',
      pagarPix: 'Para finalizar, pague via PIX o valor do lance e envie o comprovante.',
      copiaEcola: 'Copia e cola (PIX)',
      copiar: 'Copiar código',
      copiado: 'Código copiado!',
      enviarComprovante: 'Enviar comprovante no WhatsApp',
      lanceEnviado: 'Lance registrado com sucesso!',
      erroLance: 'Não foi possível registrar o lance.',
      motivo: '',
      regras: 'Regras do leilão',
      usaPix: 'Pagamento exclusivo via PIX',
      fimExtensao: 'Últimos minutos! Lance agora e o prazo estende +2 min.',
      historia: 'História do leilão',
      dataEvento: 'Data do evento',
      carregandoImagem: 'Carregando imagem...',
      relacionados: 'Leilões ao vivo — leob.',
      enviarRegistro: 'Cadastrar e participar',
      regErroAceite: 'Você precisa aceitar as regras do leilão.',
      valorInvalido: 'Informe um valor válido.',
      semLeiloes: 'Nenhum leilão agendado no momento.',
      aceiteRegras: 'Ao participar, aceito as regras do leilão.',
      regrasFreteOk: 'Vencedores fora da região arcam com o frete de envio.'
    },
    en: {
      participantes: 'Bidders',
      agendado: 'Upcoming',
      aberto: 'LIVE',
      encerrado: 'Ended',
      lanceInicial: 'Opening bid',
      lanceMaximo: 'Highest bid',
      incremento: 'Min. increment',
      totalLances: 'Bids',
      terminara: 'Ends in',
      comecaEm: 'Starts in',
      regrasFrete: 'Shipping: winners outside ' + (CFG.cidadeLeiloeiro || 'my city') + ' pay the shipping costs.',
      participar: 'Join this auction',
      acompanhar: 'Follow along',
      verResultado: 'See result',
      seuCadastro: 'Registration complete',
      darLance: 'Place bid',
      valorLance: 'Bid amount (BRL)',
      agoraPodeLance: 'It\'s live! Place your bid.',
      aguardando: 'Not open yet. Come back at the scheduled time to bid live.',
      fechou: 'This auction has ended.',
      venceu: 'WINNING BID',
      semLances: 'No bids so far.',
      seuLanceMax: 'Your highest bid',
      voceVenceu: 'You won this auction!',
      pagarPix: 'To finish, pay the bid amount via PIX and send the receipt.',
      copiaEcola: 'PIX copy & paste code',
      copiar: 'Copy code',
      copiado: 'Code copied!',
      enviarComprovante: 'Send receipt on WhatsApp',
      lanceEnviado: 'Bid placed successfully!',
      erroLance: 'Could not place bid.',
      motivo: '',
      regras: 'Auction rules',
      usaPix: 'Payment exclusively via PIX',
      fimExtensao: 'Final minutes! Bid now and the deadline extends +2 min.',
      historia: 'Auction history',
      dataEvento: 'Event date',
      carregandoImagem: 'Loading image...',
      relacionados: 'Live auctions — leob.',
      enviarRegistro: 'Register and join',
      regErroAceite: 'You must accept the auction rules.',
      valorInvalido: 'Enter a valid amount.',
      semLeiloes: 'No auctions scheduled right now.',
      aceiteRegras: 'By joining, I accept the auction rules.',
      regrasFreteOk: 'Winners outside the region pay the shipping costs.'
    }
  };

  var L = function (k) {
    return (TEX[_lang()] || TEX.pt)[k] !== undefined ? (TEX[_lang()] || TEX.pt)[k] : k;
  };
  function _lang() {
    return (localStorage.getItem('lang') || 'pt');
  }

  // ---------- Utilidades ----------
  function $(id) { return document.getElementById(id); }

  // ---------- Loading da imagem do lote ----------
  function mostrarLoadingImg() {
    var l = $('leilao-img-loading');
    if (l) l.classList.remove('hidden');
  }
  function ocultarLoadingImg() {
    var l = $('leilao-img-loading');
    if (l) l.classList.add('hidden');
  }

  function formatarMoeda(v) {
    if (v === null || v === undefined || isNaN(v)) return '—';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
  }

  function formatarData(ms) {
    if (!ms) return '—';
    var d = new Date(ms);
    return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  function pad2(n) { return String(n).padStart(2, '0'); }

  function tempoRestante(ms) {
    if (ms <= 0) return null;
    var d = Math.floor(ms / 86400000);
    var h = Math.floor((ms % 86400000) / 3600000);
    var m = Math.floor((ms % 3600000) / 60000);
    var s = Math.floor((ms % 60000) / 1000);
    if (d > 0) return d + 'd ' + h + 'h ' + pad2(m) + 'm';
    return h + 'h ' + pad2(m) + 'm ' + pad2(s) + 's';
  }

  function apiGet(params) {
    var qs = Object.keys(params).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
    }).join('&');
    return fetch(CFG.api + '?' + qs).then(function (r) { return r.json(); });
  }

  function apiPost(dados) {
    return fetch(CFG.api, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(dados)
    });
  }

  // ---------- Participante local ----------
  function getParticipante() {
    try { return JSON.parse(localStorage.getItem(CFG.storageParticipante)) || null; }
    catch (e) { return null; }
  }
  function setParticipante(p) {
    if (p) localStorage.setItem(CFG.storageParticipante, JSON.stringify(p));
    else localStorage.removeItem(CFG.storageParticipante);
  }
  function meuId() {
    var p = getParticipante();
    return p ? p.id : null;
  }

  // ---------- Lances locais (para mostrar "seu lance") ----------
  function meusLancesLocais(loteId) {
    try {
      var raw = localStorage.getItem('leob_meus_lances') || '{}';
      var obj = JSON.parse(raw);
      return Array.isArray(obj[loteId]) ? obj[loteId] : [];
    } catch (e) { return []; }
  }
  function registrarLanceLocal(loteId, valor) {
    var raw = localStorage.getItem('leob_meus_lances') || '{}';
    var obj = {};
    try { obj = JSON.parse(raw); } catch (e) { obj = {}; }
    obj[loteId] = obj[loteId] || [];
    obj[loteId].push(valor);
    localStorage.setItem('leob_meus_lances', JSON.stringify(obj));
  }
  function meuMaximoLocal(loteId) {
    var v = meusLancesLocais(loteId);
    return v.length ? Math.max.apply(null, v) : null;
  }

  // ---------- PIX (BR Code estático) ----------
  function crc16(payload) {
    var crc = 0xFFFF;
    for (var i = 0; i < payload.length; i++) {
      crc ^= payload.charCodeAt(i) << 8;
      for (var j = 0; j < 8; j++) {
        crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
        crc &= 0xFFFF;
      }
    }
    return crc;
  }

  function montarBrcode(valor) {
    var cfg = CFG.pix;
    function campo(id, v) {
      var s = String(v);
      var tam = String(s.length).padStart(2, '0');
      return id + tam + s;
    }
    var valorStr = (+valor).toFixed(2);
    var ps = '';
    ps += campo('00', '01');
    ps += campo('26', '00' + 'br.gov.bcb.pix' + campo('01', cfg.chave));
    ps += campo('52', '0000');
    ps += campo('53', '986');
    ps += campo('54', valorStr);
    ps += campo('58', 'BR');
    ps += campo('59', cfg.nome.slice(0, 25).toUpperCase());
    ps += campo('60', cfg.cidade.slice(0, 15).toUpperCase());
    ps += campo('62', campo('05', '***'));
    ps += '6304';
    var crc = crc16(ps).toString(16).toUpperCase().padStart(4, '0');
    return ps + crc;
  }

  function renderizarPix(valor) {
    var payload = montarBrcode(valor);
    window.__pixValor = valor;
    var qr = $('pix-qr-img');
    if (qr) qr.src = 'https://api.qrserver.com/v1/create-qr-code/?size=320x320&qzone=1&data=' + encodeURIComponent(payload);
    var copia = $('pix-copia-cola');
    if (copia) copia.value = payload;
    var valorEl = $('pix-valor');
    if (valorEl) valorEl.innerText = formatarMoeda(valor);
  }

  window.copiarPix = function () {
    var el = $('pix-copia-cola');
    if (!el) return;
    var text = el.value;
    function done() {
      var b = $('copiar-pix-btn');
      if (b) {
        var antes = b.innerText;
        b.innerText = L('copiado');
        setTimeout(function () { b.innerText = antes; }, 2000);
      }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        el.select(); document.execCommand('copy'); done();
      });
    } else {
      el.select(); document.execCommand('copy'); done();
    }
  };

  window.abrirWhatsComprovante = function () {
    var valor = window.__pixValor;
    if (valor === undefined || valor === null) return;
    var msg = 'Olá Leo! Acabei de enviar o PIX do lote ' + formatarMoeda(valor) + '. Segue o comprovante:';
    window.open('https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent(msg), '_blank');
  };

  window.abrirWhatsLeiloeiro = function () {
    window.open('https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent('Olá Leo! Tenho interesse no leilão.'), '_blank');
  };

  // ---------- Registro ----------
  window.abrirRegistro = function () {
    if (!CFG.api) { alert('Leilões ainda não configurados. Verifique js/config-leiloes.js.'); return; }
    var p = getParticipante();
    if (p) { window.registradoPara = p; fecharRegistro(); atualizarUsuario(); return; }
    var m = $('modal-registro');
    if (m) m.classList.remove('hidden');
  };

  window.fecharRegistro = function () {
    var m = $('modal-registro');
    if (m) m.classList.add('hidden');
  };

  window.enviarRegistro = function () {
    var nome = ($('reg-nome') && $('reg-nome').value || '').trim();
    var whatsapp = ($('reg-whatsapp') && $('reg-whatsapp').value || '').trim();
    var cidade = ($('reg-cidade') && $('reg-cidade').value || '').trim();
    var uf = ($('reg-uf') && $('reg-uf').value || '').trim();
    var aceito = $('reg-aceito') && $('reg-aceito').checked;

    var erro = $('reg-erro');
    function msgErro(t) { if (erro) { erro.innerText = t; erro.classList.remove('hidden'); } }

    if (!aceito) { msgErro(L('regErroAceite') || 'Você precisa aceitar as regras do leilão.'); return; }
    if (uf && uf.length === 2) uf = uf.toUpperCase();
    var btn = $('reg-enviar-btn');

    if (btn) { btn.disabled = true; btn.innerText = '...'; }
    apiGet({ action: 'registrar', nome: nome, whatsapp: whatsapp, cidade: cidade, uf: uf, aceitou: '1' })
      .then(function (d) {
        if (!d.ok) {
          if (btn) { btn.disabled = false; btn.innerText = L('enviarRegistro'); }
          msgErro(d.motivo || 'Erro ao cadastrar.');
          return;
        }
        setParticipante({ id: d.id, nome: d.nome, cidade: cidade, uf: uf });
        var m = $('modal-registro');
        if (m) m.classList.add('hidden');
        atualizarUsuario();
      })
      .catch(function () {
        if (btn) { btn.disabled = false; btn.innerText = L('enviarRegistro'); }
        msgErro('Erro de conexão. Tente novamente.');
      });
  };

  window.sair = function () {
    setParticipante(null);
    atualizarUsuario();
  };

  function atualizarUsuario() {
    var p = getParticipante();
    var areaLogado = $('area-logado');
    var areaAnonimo = $('area-anonimo');
    var nomeEl = $('participante-nome');
    if (areaLogado) {
      areaLogado.classList.toggle('hidden', !p);
      if (areaAnonimo) areaAnonimo.classList.toggle('hidden', !!p);
      if (nomeEl) nomeEl.innerText = p ? p.nome : '';
    }
    // No leilão aberto, atualiza valor mínimo sugerido
    atualizarInputLance();
  }

  // ---------- Página da vitrine ----------
  function initVitrine() {
    var grid = $('vitrine-grid');
    if (!grid) return;
    if (!CFG.api) {
      grid.innerHTML = '<p class="text-center text-zinc-500 py-16">Leilões ainda não configurados.</p>';
      return;
    }
    apiGet({ action: 'lotes' })
      .then(function (d) {
        if (!d.ok || !d.lotes) {
          grid.innerHTML = '<p class="text-center text-zinc-500 py-16">' + (d.motivo || 'Erro') + '</p>';
          return;
        }
        grid.innerHTML = d.lotes.map(function (l) { return cardVitrine(l); }).join('') || emptyVitrine();
        // Coloca os cronômetros ativos
        d.lotes.forEach(atribuirCronometro);
      })
      .catch(function () {
        grid.innerHTML = '<p class="text-center text-zinc-500 py-16">Erro de conexão com o servidor.</p>';
      });
  }

  function emptyVitrine() {
    return '<p class="text-center text-zinc-500 py-16 col-span-full">' + (L('semLeiloes') || 'Nenhum leilão agendado no momento.') + '</p>';
  }

  function badgeEstado(estado) {
    if (estado === 'aberto') return '<span class="inline-flex items-center gap-1 px-3 py-1 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest"><span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>' + L('aberto') + '</span>';
    if (estado === 'agendado') return '<span class="inline-flex px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold uppercase tracking-widest">' + L('agendado') + '</span>';
    return '<span class="inline-flex px-3 py-1 bg-zinc-500 text-white text-[10px] font-bold uppercase tracking-widest">' + L('encerrado') + '</span>';
  }

  // Fallback em cascata das imagens dos cards: webp → miniatura original → imagem cheia
  window.leilaoThumb = function (img) {
    function esconderPlaceholder() {
      var prev = img.previousElementSibling;
      if (prev && prev.classList) prev.classList.add('hidden');
    }
    var fila = (img.getAttribute('data-fb') || '').split('|');
    if (!fila.length) { img.onerror = null; esconderPlaceholder(); return; }
    img.removeAttribute('onerror');
    var prox = fila.shift();
    if (prox) {
      img.setAttribute('data-fb', fila.join('|'));
      img.src = prox;
      if (fila.length) img.onerror = function () { window.leilaoThumb(img); };
    } else {
      esconderPlaceholder();
    }
  };

  function cardVitrine(l) {
    var href = 'leilao.html?id=' + encodeURIComponent(l.id);
    var titulo = (_lang() === 'en' && l.titulo_en) ? l.titulo_en : l.titulo_pt;
    var media = l.lanceMaximo !== null ? L('lanceMaximo') + ': <span class="text-brand-orange font-bold">' + formatarMoeda(l.lanceMaximo) + '</span>'
      : L('lanceInicial') + ': <span class="font-bold">' + formatarMoeda(l.lance_inicial) + '</span>';

    // Miniatura para a vitrine: prioriza WebP (mais leve); se faltar, tenta a miniatura
    // original e, por fim, a imagem cheia (que por padrão é a fonte dos download).
    var urlCheia = l.imagem_url || '';
    var urlThumbWebp = urlCheia.replace(/\.(jpe?g|png|webp)(\?.*)?$/i, '-thumb.webp$2');
    var urlThumbOrig = urlCheia
      .replace(/\.jpe?g(\?.*)?$/i, '-thumb.jpg$1')
      .replace(/\.png(\?.*)?$/i, '-thumb.png$1')
      .replace(/\.webp(\?.*)?$/i, '-thumb.webp$1');
    var imgSrc = 'src="' + urlThumbWebp + '" data-fb="' + urlThumbOrig + '|' + urlCheia + '" onerror="window.leilaoThumb(this)"';

    var rodape = '';
    if (l.estado === 'encerrado') {
      rodape = '<div class="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">' +
        '<span class="text-xs text-zinc-500">' + (l.vencedor ? 'Vencedor: <b>' + (l.vencedor.nome || '—') + '</b>' : L('semLances')) + '</span>' +
        '<a href="' + href + '" class="text-[11px] font-bold uppercase tracking-widest text-brand-orange hover:text-black dark:hover:text-white transition">' + L('verResultado') + ' →</a></div>';
    } else {
      rodape = '<div class="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-2">' +
        '<div class="text-[11px] text-zinc-500"><span data-count-' + l.id + '></span></div>' +
        '<a href="' + href + '" class="text-[11px] font-bold uppercase tracking-widest text-brand-orange hover:text-black dark:hover:text-white transition">' +
        (l.estado === 'aberto' ? L('acompanhar') : L('agendado')) + ' →</a></div>';
    }

    var destaque = l.estado === 'aberto' ? ' border-brand-orange/60 ring-2 ring-brand-orange/40 shadow-lg' : '';

    return '<article class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden transition-all duration-300 hover:shadow-xl' + destaque + '">' +
      '<a href="' + href + '"><div class="aspect-[4/5] overflow-hidden bg-zinc-100 dark:bg-zinc-900 relative">' +
      '<div class="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900"><div class="w-8 h-8 rounded-full border-2 border-zinc-200 dark:border-zinc-800 border-t-brand-orange animate-spin"></div></div>' +
      '<img ' + imgSrc + ' alt="' + titulo + '" loading="lazy" decoding="async" onload="this.previousElementSibling.classList.add(\'hidden\')" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105' + (l.estado === 'aberto' ? ' opacity-95' : '') + '">' +
      '<div class="absolute top-3 left-3">' + badgeEstado(l.estado) + '</div>' +
      (l.estado === 'aberto' && l.youtube_id ? '<a href="https://www.youtube.com/watch?v=' + l.youtube_id + '" target="_blank" rel="noopener" title="AO VIVO no YouTube" class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-full hover:scale-110 transition"><i class="fa-brands fa-youtube"></i></a>' : '') +
      (l.estado === 'aberto' ? '<div class="absolute inset-x-0 bottom-0 h-1 bg-brand-orange animate-pulse"></div>' : '') +
      '</div></a>' +
      '<div class="p-5">' +
      '<div class="flex items-start justify-between gap-3 mb-2">' +
      '<h3 class="text-lg serif font-medium leading-tight">' + titulo + '</h3>' +
      '</div>' +
      '<p class="text-[10px] uppercase tracking-widest opacity-50 mb-3">' + (l.tecnica || '') + ' ' + (l.dimensoes ? '· ' + l.dimensoes : '') + '</p>' +
      '<div class="mb-4">' + media + '<div class="text-[10px] text-zinc-400 mt-1">' + l.totalLances + ' ' + L('totalLances') + '</div></div>' +
      rodape +
      '</div></article>';
  }

  function atribuirCronometro(l) {
    var el = document.querySelector('[data-count-' + l.id + ']');
    if (!el || l.estado === 'encerrado') return;
    var alvo = l.estado === 'aberto' ? l.fim : l.inicio;
    var rotulo = l.estado === 'aberto' ? L('terminara') : L('comecaEm');
    function tick() {
      var rest = alvo - Date.now();
      if (rest <= 0) { el.innerHTML = rotulo + ': 0s'; window.location.reload(); return; }
      el.innerHTML = rotulo + ': <b>' + tempoRestante(rest) + '</b>';
    }
    tick();
    setInterval(tick, 1000);
  }

  // ---------- Página do lote ----------
  function initLeilao() {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    var tituloEl = $('leilao-titulo');
    if (!id || !tituloEl) return;
    if (!CFG.api) {
      $('leilao-erro').innerText = 'Leilões ainda não configurados.';
      $('leilao-erro').classList.remove('hidden');
      return;
    }
    window.loteAtual = { id: id, estado: 'carregando' };
    atualizarUsuario();

    buscarEstado();
    setInterval(buscarEstado, CFG.pollMs);
    setInterval(tickCronometro, 1000);
    if (window._leilaoLangHook) return;
  }

  var estadoAtual = null;
  var offsetServidor = 0;

  function buscarEstado() {
    return apiGet({ action: 'estado', lote: window.loteAtual.id })
      .then(function (d) {
        if (d && d.ok) {
          if (d.horaServidor) offsetServidor = d.horaServidor - Date.now();
          // detecta troca de estado (re-renderiza)
          var novoEstado = d.lote.estado;
          if (window.loteAtual.estado !== novoEstado) {
            window.loteAtual.estado = novoEstado;
            estadoAtual = d;
            renderLeilao(d);
          } else {
            estadoAtual = d;
            atualizarLeve(d);
          }
          $('leilao-erro') && $('leilao-erro').classList.add('hidden');
        } else if (d && !d.ok) {
          var erroEl = $('leilao-erro');
          if (erroEl) { erroEl.innerText = d.motivo || 'Erro'; erroEl.classList.remove('hidden'); }
        }
      })
      .catch(function () { });
  }

  function agoraServidor() { return Date.now() + offsetServidor; }

  function renderLeilao(d) {
    var l = d.lote;
    var titulo = (_lang() === 'en' && l.titulo_en) ? l.titulo_en : l.titulo_pt;
    document.title = titulo + ' | Leilão leob.';

    var img = $('leilao-img');
    var u0 = l.imagem_url || '';
    // Prioriza a miniatura WebP (leve); se faltar, tenta a miniatura original e só
    // então a imagem cheia — mesma cascata usada nos cards da vitrine, evitando
    // baixar o arquivo original antes de a página precisar dele.
    if (img && u0) {
      var urlThumbWebp = u0.replace(/\.(jpe?g|png|webp)(\?.*)?$/i, '-thumb.webp$2');
      var urlThumbOrig = u0
        .replace(/\.jpe?g(\?.*)?$/i, '-thumb.jpg$1')
        .replace(/\.png(\?.*)?$/i, '-thumb.png$1')
        .replace(/\.webp(\?.*)?$/i, '-thumb.webp$1');
      img.removeAttribute('srcset');
      img.src = urlThumbWebp;
      img.setAttribute('data-fb', urlThumbOrig + '|' + u0);
      img.loading = 'eager';
      img.fetchPriority = 'high';
      img.decoding = 'async';
      img.alt = titulo;
      if (img.complete && img.naturalWidth > 0) {
        ocultarLoadingImg();
      } else {
        mostrarLoadingImg();
        img.onload = function () { ocultarLoadingImg(); };
        img.onerror = function () { window.leilaoThumb(img); };
      }
    }
    $('leilao-titulo').innerText = titulo;
    if ($('leilao-tecnica')) $('leilao-tecnica').innerText = l.tecnica || '—';
    if ($('leilao-dimensoes')) $('leilao-dimensoes').innerText = l.dimensoes || '—';
    if ($('leilao-descricao')) $('leilao-descricao').innerText = (_lang() === 'en' && l.descricao_en) ? l.descricao_en : (l.descricao_pt || '');

    // Live no YouTube
    var yt = l.youtube_id ? String(l.youtube_id).trim() : '';
    var liveBox = $('leilao-live-box');
    if (liveBox) {
      liveBox.classList.toggle('hidden', !yt);
      if (yt) {
        var ifr = $('youtube-iframe');
        if (ifr) ifr.src = 'https://www.youtube.com/embed/' + yt + '?rel=0&modestbranding=1';
        var link = $('youtube-link');
        if (link) link.href = 'https://www.youtube.com/watch?v=' + yt;
      }
    }

    var badge = $('leilao-badge');
    badge.innerHTML = badgeEstado(l.estado);

    // Valor inicial / máximo
    $('leilao-lance-inicial').innerText = formatarMoeda(l.lance_inicial);
    if ($('leilao-incremento')) $('leilao-incremento').innerText = formatarMoeda(l.incremento);
    $('leilao-lance-maximo').innerText = formatarMoeda(d.lanceMaximo);
    if ($('leilao-total-lances')) $('leilao-total-lances').innerText = d.totalLances + ' ' + L('totalLances');

    // Áreas por estado
    $('area-agendado').classList.toggle('hidden', l.estado !== 'agendado');
    $('area-aberto').classList.toggle('hidden', l.estado !== 'aberto');
    $('area-encerrado').classList.toggle('hidden', l.estado !== 'encerrado');

    // Cronômetro só faz sentido enquanto há contagem
    var cronoBox = $('cronometro-box');
    if (cronoBox) cronoBox.classList.toggle('hidden', l.estado === 'encerrado');

    if ($('area-agendado-detalhe')) $('area-agendado-detalhe').classList.toggle('hidden', l.estado !== 'agendado');
    if ($('area-aberto-detalhe')) $('area-aberto-detalhe').classList.toggle('hidden', l.estado !== 'aberto');
    if ($('area-encerrado-detalhe')) $('area-encerrado-detalhe').classList.toggle('hidden', l.estado !== 'encerrado');

    // Informações de agenda
    $('leilao-inicio').innerText = formatarData(l.inicio);
    $('leilao-fim').innerText = formatarData(l.fim);

    // Histórico
    renderHistorico(d);
    atualizarInputLance();

    if (l.estado === 'encerrado') renderEncerrado(d);
    window.leilaoContinuo = true; // libera o cronômetro leve
  }

  function atualizarLeve(d) {
    // atualiza histórico e lances sem re-render pesado
    streamHistorico(d);
    atualizarLanceMaximo(d);
    atualizarInputLance();
  }

  function atualizarLanceMaximo(d) {
    var el = $('leilao-lance-maximo');
    if (el) {
      var novoTxt = formatarMoeda(d.lanceMaximo);
      if (el.innerText !== novoTxt) {
        el.innerText = novoTxt;
        el.classList.remove('animate-urgent');
        void el.offsetWidth;
        el.classList.add('text-brand-orange');
      }
    }
    var n = $('leilao-total-lances');
    if (n) n.innerText = d.totalLances + ' ' + L('totalLances');
  }

  function renderHistorico(d) {
    var box = $('historico-lances');
    if (!box) return;
    var linhas = d.lancamentos || [];
    box.innerHTML = linhas.length ? linhas.map(function (b) {
      return '<div class="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0">' +
        '<span class="text-sm text-zinc-500">' + (b.criado_em ? new Date(b.criado_em).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '') + '</span>' +
        '<span class="font-bold">' + formatarMoeda(b.valor) + '</span></div>';
    }).join('') : '<p class="text-sm text-zinc-400 py-2">' + L('semLances') + '</p>';
  }

  function streamHistorico(d) {
    var box = $('historico-lances');
    if (!box) return;
    var linhas = (d.lancamentos || []).slice(0, 5).map(function (b) {
      return '<div class="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0">' +
        '<span class="text-sm text-zinc-500">' + (b.criado_em ? new Date(b.criado_em).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '') + '</span>' +
        '<span class="font-bold">' + formatarMoeda(b.valor) + '</span></div>';
    }).join('');
    if (linhas) box.innerHTML = linhas;
  }

  function atualizarInputLance() {
    var input = $('lance-valor');
    if (!input) return;
    var d = estadoAtual;
    if (!d) return;
    var el = $('seu-lance-info');
    var meuMax = meuMaximoLocal(window.loteAtual.id);
    if (el) {
      el.classList.toggle('hidden', meuMax === null);
      $('seu-lance-valor') && ($('seu-lance-valor').innerText = formatarMoeda(meuMax));
    }
    if (d.lote.estado !== 'aberto') { input.disabled = true; return; }
    input.disabled = false;
    var minimo = d.lanceMaximo !== null ? d.lanceMaximo + d.lote.incremento : d.lote.lance_inicial;
    input.placeholder = formatarMoeda(minimo) + ' ou mais';
    $('lance-msg').innerText = '';
    $('lance-hint') ? $('lance-hint').innerText = L('agoraPodeLance') + ' ' + L('lanceInicial') + ': ' + formatarMoeda(minimo) : '';
  }

  function renderEncerrado(d) {
    var v = d.vencedor;
    var vencedorBox = $('vencedor-info');
    if (vencedorBox) {
      if (v) {
        var eu = getParticipante();
        var souEu = eu && String(eu.id) === String(v.id);
        $('vencedor-nome') ? $('vencedor-nome').innerText = v.nome || '—' : null;
        $('vencedor-cidade') ? $('vencedor-cidade').innerText = (v.cidade || '') + (v.uf ? ' / ' + v.uf : '') : null;
        $('vencedor-valor') ? $('vencedor-valor').innerText = formatarMoeda(d.lote.valor_final || d.lanceMaximo) : null;
        $('vencedor-status') ? $('vencedor-status').innerText = statusLabel(d.lote.status_pagamento) : null;
        $('vencedor-pix-area') ? $('vencedor-pix-area').classList.remove('hidden') : null;
        $('voce-venceu-area') ? $('voce-venceu-area').classList.toggle('hidden', !souEu) : null;
        $('venceu-prazo') ? setTimeout(function () { $('venceu-prazo').innerText = L('pagarPix'); }, 0) : null;
        renderizarPix(d.lote.valor_final || d.lanceMaximo);
      } else {
        $('vencedor-nome') ? $('vencedor-nome').innerText = L('semLances') : null;
      }
    }
  }

  function statusLabel(s) {
    var m = {
      'aguardando_pagamento': 'Aguardando Pagamento',
      'pago': 'Pago',
      'enviado': 'Enviado',
      'entregue': 'Entregue',
      'cancelado': 'Cancelado'
    };
    return m[s] || s || '—';
  }

  window.darLance = function () {
    var input = $('lance-valor');
    if (!input) return;
    var valorNum = parseFloat(String(input.value).replace(',', '.'));
    var msgEl = $('lance-msg');

    if (!valorNum || isNaN(valorNum)) {
      if (msgEl) { msgEl.classList.remove('hidden'); msgEl.classList.add('text-red-500'); msgEl.innerText = L('valorInvalido') || 'Informe um valor válido.'; }
      return;
    }
    var p = getParticipante();
    if (!p) { abrirRegistro(); return; }

    var btn = $('dar-lance-btn');
    if (btn) { btn.disabled = true; btn.innerText = '...'; }

    apiGet({ action: 'lance', lote: window.loteAtual.id, participante: p.id, valor: valorNum })
      .then(function (d) {
        if (msgEl) { msgEl.classList.remove('hidden'); }
        if (d.ok) {
          if (msgEl) { msgEl.classList.remove('text-red-500'); msgEl.classList.add('text-green-600'); msgEl.innerText = L('lanceEnviado'); }
          registrarLanceLocal(window.loteAtual.id, d.valor);
          input.value = '';
          atualizarInputLance();
          buscarEstado();
        } else {
          if (msgEl) { msgEl.classList.add('text-red-500'); msgEl.classList.remove('text-green-600'); msgEl.innerText = d.motivo || L('erroLance'); }
          if (d.minimoNecessario) input.placeholder = formatarMoeda(d.minimoNecessario) + ' ou mais';
          if (d.motivo && d.motivo.indexOf('Cadastre') !== -1) abrirRegistro();
        }
      })
      .catch(function () {
        if (msgEl) { msgEl.classList.remove('hidden'); msgEl.classList.add('text-red-500'); msgEl.innerText = L('erroLance'); }
      })
      .finally(function () {
        if (btn) { btn.disabled = false; btn.innerText = L('darLance'); }
      });
  };

  function tickCronometro() {
    var d = estadoAtual;
    if (!d) return;
    var l = d.lote;
    var alvo;
    if (l.estado === 'aberto') alvo = l.fim;
    else if (l.estado === 'agendado') alvo = l.inicio;
    else { return; }

    var rotuloEl = $('cronometro-rotulo');
    if (rotuloEl) rotuloEl.innerText = l.estado === 'aberto' ? L('terminara') : L('comecaEm');

    var rest = alvo - agoraServidor();
    var el = $('cronometro');
    if (el) {
      if (rest <= 0) { el.innerHTML = '0s'; buscarEstado(); }
      else el.innerHTML = tempoRestante(rest) || '0s';
    }
    var extEl = $('extensao-aviso');
    if (extEl && l.estado === 'aberto') {
      extEl.classList.toggle('hidden', rest > LEILOES.extensaoMs);
    }
  }

  // ---------- Aplicação da linguagem ----------
  function aplicarLingua(lang) {
    document.querySelectorAll('[data-lel]').forEach(function (el) {
      var dir = lang === 'en' ? 'data-lel-en' : 'data-lel-pt';
      var inline = el.getAttribute(dir);
      if (inline) { el.innerText = inline; return; }
      var k = el.getAttribute('data-lel');
      var txt = (TEX[lang] || TEX.pt)[k];
      if (typeof txt === 'string') el.innerText = txt;
    });
    // Texto das regras de frete (preenchido com a cidade do leiloeiro)
    document.querySelectorAll('[data-lel-frete]').forEach(function (el) {
      el.innerText = L('regrasFrete');
    });
    document.querySelectorAll('[data-lel-frete-aceite]').forEach(function (el) {
      el.innerText = L('aceiteRegras') || ('Ao participar, aceito as regras do leilão. ' + L('regrasFrete'));
    });
    if (window.loteAtual && estadoAtual) renderLeilao(estadoAtual);
    atualizarUsuario();
  }
  window.leiloesAplicarLingua = aplicarLingua;

  // Hook no changeLanguage do site (js/script.js)
  var _orig = window.changeLanguage || function () { };
  window.changeLanguage = function (l) {
    if (_orig) _orig(l);
    aplicarLingua(l);
  };

  // ---------- Boot ----------
  document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('vitrine-grid')) initVitrine();
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('id') && document.getElementById('leilao-img')) initLeilao();
    atualizarUsuario();
    // Fecha modal-registro ao clicar fora
    var modal = $('modal-registro');
    if (modal) modal.addEventListener('click', function (e) {
      if (e.target === modal) fecharRegistro();
    });
  });
})();