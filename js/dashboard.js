// ── Data ──────────────────────────────────────────────────────────────
  const escalaCinza = [
    { valor:0,  hex:'#FFFFFF', branco:10, preto:0,  nome:'Branco Puro'       },
    { valor:1,  hex:'#E6E6E6', branco:9,  preto:1,  nome:'Cinza Claro 1'     },
    { valor:2,  hex:'#CCCCCC', branco:8,  preto:2,  nome:'Cinza Claro 2'     },
    { valor:3,  hex:'#B3B3B3', branco:7,  preto:3,  nome:'Cinza Claro 3'     },
    { valor:4,  hex:'#999999', branco:6,  preto:4,  nome:'Cinza Médio Claro' },
    { valor:5,  hex:'#808080', branco:5,  preto:5,  nome:'Cinza Médio'       },
    { valor:6,  hex:'#666666', branco:4,  preto:6,  nome:'Cinza Médio Escuro'},
    { valor:7,  hex:'#4D4D4D', branco:3,  preto:7,  nome:'Cinza Escuro 1'    },
    { valor:8,  hex:'#333333', branco:2,  preto:8,  nome:'Cinza Escuro 2'    },
    { valor:9,  hex:'#191919', branco:1,  preto:9,  nome:'Cinza Escuro 3'    },
    { valor:10, hex:'#000000', branco:0,  preto:10, nome:'Preto Puro'        },
  ];

  const dicas = [
    'Comece sempre com a cor mais clara (branco) e adicione o preto aos poucos.',
    'Use uma espessura limpa para cada mistura — contamina altera o valor.',
    'Teste o tom sobre um papel de papel branco para avaliar corretamente.',
    'O olho se adapta rapidamente: observe cada mistura por no máximo 5 segundos.',
    'Prepare todos os 11 valores de uma vez para ter a escala completa.',
  ];

  const pigmentos = {
    branco: { nome: 'Branco de Titónio', codigo: 'PW6', desc: 'O branco mais opaco e usado em pintura hiper realista; cobertura míxima e neutralidade de tom.' },
    preto:  { nome: 'Negro de Marfim',   codigo: 'PBk9', desc: 'Preto neutro e levemente amadeirado, não puxa a mistura para o azul ou o marrom como outros pretos.' },
  };
  const pigmentosAlternativos = [
    { nome: 'Branco de Zinco',  codigo: 'PW4',  papel: 'Alternativa ao Branco de Titónio', desc: 'Mais transparente e frio; produz cinzas ligeiramente mais suaves.' },
    { nome: 'Preto Marte',      codigo: 'PBk11', papel: 'Alternativa ao Negro de Marfim', desc: 'Preto opaco levemente avermelhado, seca mais rípido em óleo.' },
    { nome: 'Negro Fumo',       codigo: 'PBk6/7', papel: 'Alternativa ao Negro de Marfim', desc: 'Muito intenso e frio; cobre bem, mas domina a mistura em pequenas quantidades.' },
  ];

  // ── Router ────────────────────────────────────────────────────────────
  function navigate(page) {
    const map = { home: renderHome, escala: renderEscala, treino: renderTreino, misturas: renderEscala, converter: renderConverter, posterizar: renderPosterizar, zonas: renderZonas, riscoLinear: renderRiscoLinear, isolador: renderLocalizador, janela: renderJanela, quadricular: renderQuadricular, comparador: renderComparador, ilusao: renderIlusao, localizador: renderLocalizador, paleta: renderPaleta, camadas: renderCamadas, exercicios: renderExercicios, luz: renderLuz };
    document.getElementById('app').innerHTML = '';
    (map[page] || renderHome)();
    document.querySelectorAll('.sidebar-link').forEach(el => {
      el.classList.toggle('text-accent', el.dataset.sidebar === page);
      el.classList.toggle('text-muted',  el.dataset.sidebar !== page);
    });
    window.scrollTo(0, 0);
  }

  // ── Home ──────────────────────────────────────────────────────────────
  function renderHome() {
    const app = document.getElementById('app');
    const strip = escalaCinza.map(v => `<div class="flex-1 swatch-grow" style="background-color:${v.hex};animation-delay:${0.05*v.valor}s"></div>`).join('');
    const modulos = [
      { id:'escala',   icon:'▮', title:'Escala de Cinzas',    desc:'Estude a escala completa de 11 valores, do branco puro ao preto absoluto. Guia de misturas incluído.' },
      { id:'treino',   icon:'▤', title:'Treino de Valores',   desc:'Pratique identificar valores tonais e avalie sua precisão visual.' },
      { id:'converter',icon:'⊑', title:'Converter para Cinzas', desc:'Transforme qualquer imagem de referência em escala de cinzas para estudar valores tonais.' },
      { id:'posterizar',icon:'◧', title:'Posterizar',           desc:'Reduza a imagem a poucos tons para enxergar as regiões de valor como blocos distintos.' },
      { id:'zonas',     icon:'▦', title:'Mapear Zonas',          desc:'Divida a imagem em zonas e identifique o valor dominante de cada regiãão — como um mapa tonal.' },
      { id:'riscoLinear',icon:'◐', title:'Risco Linear',          desc:'Extraia o contorno da imagem como um desenho de linha — ideal para estudar formas e preparar a tela.' },
      { id:'janela',    icon:'⊞', title:'Janela Física',        desc:'Isole uma írea da imagem com uma míscara — como um cartãão vazado. Arraste e redimensione para estudar detalhes.' },
      { id:'quadricular',icon:'#', title:'Quadricular Imagem',   desc:'Sobreponha uma grade na imagem para copiar quadrado por quadrado — técnica clássica para desenhar com precisão.' },
      { id:'comparador',icon:'⊕', title:'Comparar Amostras',   desc:'Clique em um ponto da referência e no mesmo ponto da sua pintura para comparar valores tonais com precisão.' },
      { id:'ilusao',    icon:'◐', title:'Ilusão de Óptica',    desc:'Veja como o cérebro engana — o mesmo cinza parece diferente conforme o fundo. Contraste simultâneo na prática.' },
    ].map(m => `
      <button onclick="navigate('${m.id}')" class="group text-left block h-full p-8 rounded-2xl border border-white/10 hover:border-accent/40 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
        <div class="text-accent mb-6 text-2xl">${m.icon}</div>
        <h3 class="font-display text-2xl mb-3">${m.title}</h3>
        <p class="text-muted text-sm leading-relaxed mb-6 font-light">${m.desc}</p>
        <span class="inline-flex items-center gap-2 text-sm text-accent group-hover:gap-3 transition-all">Acessar →</span>
      </button>`).join('');

    app.innerHTML = `
      <div style="min-height:calc(100vh - 4rem)">
        <section class="relative flex flex-col items-center justify-center px-6 py-24 md:py-40 text-center overflow-hidden">
          <div class="absolute top-0 left-0 right-0 flex" style="height:6px">${strip}</div>
          <div class="fade-in relative z-10 max-w-3xl">
            <p class="text-accent text-xs md:text-sm tracking-[0.3em] uppercase mb-6">Método LEOB</p>
            <h1 class="font-display text-4xl md:text-7xl leading-[1.05] mb-8">Dashboard de<br>Análise Realista</h1>
            <p class="text-muted text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto font-light">
              Aprenda a enxergar, classificar e misturar cada nuance de cinza. A base de toda pintura hiper realista começa no domínio dos valores.
            </p>
            <button onclick="navigate('escala')" class="inline-flex items-center gap-2 px-8 py-4 bg-fg text-bg rounded-full text-sm tracking-wide hover:bg-accent transition-colors">
              Quero Aprender Agora!
            </button>
          </div>
        </section>
        <section class="px-6 pb-16">
          <div class="max-w-6xl mx-auto flex rounded-xl overflow-hidden border border-white/10" style="height:5rem">${strip}</div>
        </section>
        <section class="px-6 pb-24">
          <div class="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5 fade-in">${modulos}</div>
        </section>
      </div>`;
  }

  // ── Escala ────────────────────────────────────────────────────────────
  let selecionadoIdx = 5;

  function renderEscala() {
    const app = document.getElementById('app');
    const rows = escalaCinza.map((v,i) => `
      <div class="grid items-center p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors fade-in" style="grid-template-columns:auto auto 1fr;gap:0.75rem 1rem;animation-delay:${i*0.04}s">
        <div><p class="font-display text-3xl">${v.valor}</p></div>
        <div class="rounded-lg border border-white/10" style="width:3.5rem;height:3rem;background-color:${v.hex}"></div>
        <div>
          <p class="text-sm font-medium">${v.nome}</p>
          <p class="text-xs text-muted font-mono">${v.hex}</p>
        </div>
        <div class="col-span-3 flex items-center gap-2 text-xs mt-2">
          <span class="text-right w-8 text-muted" title="${pigmentos.branco.nome}">${v.branco}B</span>
          <div class="flex-1 h-6 rounded overflow-hidden flex" style="box-shadow:0 0 0 1px hsl(0 0% 14%)">
            ${v.branco > 0 ? `<div class="bg-white" style="width:${v.branco*10}%"></div>` : ''}
            ${v.preto  > 0 ? `<div class="bg-black" style="width:${v.preto*10}%"></div>`  : ''}
          </div>
          <span class="w-8 text-muted" title="${pigmentos.preto.nome}">${v.preto}P</span>
          <span class="text-muted ml-1">${v.branco===0?'100% preto':v.preto===0?'100% branco':`${v.branco}:${v.preto}`}</span>
        </div>
      </div>`).join('');
    const tips = dicas.map(d => `<li>— ${d}</li>`).join('');
    const alternativas = pigmentosAlternativos.map(p => `
      <div class="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-medium">${p.nome}</p>
          <span class="text-xs font-mono text-muted">${p.codigo}</span>
        </div>
        <p class="text-xs text-accent mb-1">${p.papel}</p>
        <p class="text-xs text-muted leading-relaxed">${p.desc}</p>
      </div>`).join('');

    app.innerHTML = `
      <div style="min-height:calc(100vh - 4rem)" class="px-6 py-12 md:py-16">
        <div class="max-w-6xl mx-auto">
          <div class="fade-in mb-12">
            <h1 class="font-display text-4xl md:text-5xl mb-4">Escala de Cinzas</h1>
            <p class="text-muted max-w-2xl font-light">A escala de valores é a espinha dorsal da pintura hiper realista. Toque em qualquer tom para explorar suas propriedades e misturas.</p>
          </div>
          <div id="escala-preview" class="mb-8"></div>
          <div id="escala-strip"   class="mb-8"></div>
          <div id="escala-details"></div>

          <div class="mt-16 p-8 rounded-2xl border border-white/10 bg-white/[0.02] fade-in">
            <h3 class="font-display text-xl mb-1">Guia de Misturas</h3>
            <p class="text-sm text-muted mb-5 font-light">Cada valor tonal é obtido misturando ${pigmentos.branco.nome} e ${pigmentos.preto.nome} em proporções precisas.</p>
            <div class="space-y-3">${rows}</div>
          </div>

          <div class="mt-6 p-8 rounded-2xl border border-accent/20 bg-accent/[0.03] fade-in">
            <div class="flex items-start gap-4">
              <span class="text-accent flex-shrink-0 mt-1 text-2xl">◇</span>
              <div>
                <h3 class="font-display text-xl mb-4">Dicas de Mistura</h3>
                <ul class="space-y-2 text-sm text-muted">${tips}</ul>
              </div>
            </div>
          </div>

          <div class="mt-6 p-8 rounded-2xl border border-white/10 bg-white/[0.02] fade-in">
            <h3 class="font-display text-xl mb-1">Pigmentos Alternativos</h3>
            <p class="text-sm text-muted mb-5 font-light">Caso não tenha os pigmentos de referência, estas são substituições comuns — o resultado tonal muda ligeiramente de temperatura.</p>
            <div class="grid md:grid-cols-3 gap-4">${alternativas}</div>
          </div>
        </div>
      </div>`;
    renderEscalaStrip();
    renderEscalaPreview();
    renderEscalaDetails();
  }

  function renderEscalaStrip() {
    const el = document.getElementById('escala-strip');
    el.className = 'flex rounded-xl overflow-hidden border border-white/10';
    el.style.height = '5rem';
    el.innerHTML = escalaCinza.map((v,i) => `
      <button onclick="selectEscala(${i})" class="flex-1 relative transition-all" style="background-color:${v.hex};${i===selecionadoIdx?'outline:2px solid #d88800;outline-offset:-2px;z-index:10':''}">
        <span class="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[10px] font-mono" style="color:${v.valor>5?'#999':'#333'}">${v.valor}</span>
      </button>`).join('');
  }

  function selectEscala(i) { selecionadoIdx = i; renderEscalaStrip(); renderEscalaPreview(); renderEscalaDetails(); }

  function renderEscalaPreview() {
    const v = escalaCinza[selecionadoIdx];
    const txt = v.valor > 5 ? 'hsl(0 0% 60%)' : 'hsl(0 0% 20%)';
    document.getElementById('escala-preview').innerHTML = `
      <div class="fade-in relative rounded-2xl overflow-hidden border border-white/10" style="background-color:${v.hex};height:16rem">
        <div class="absolute inset-0 flex items-end justify-between p-6 md:p-8">
          <div>
            <p class="text-xs uppercase mb-1 opacity-60 tracking-[0.2em]" style="color:${txt}">Valor</p>
            <p class="font-display leading-none" style="font-size:clamp(3.5rem,10vw,6rem);color:${txt}">${v.valor}</p>
          </div>
          <div class="text-right">
            <p class="text-sm" style="color:${txt}">${v.nome}</p>
            <p class="text-xs font-mono mt-1 opacity-70" style="color:${txt}">${v.hex}</p>
          </div>
        </div>
      </div>`;
  }

  function renderEscalaDetails() {
    const v = escalaCinza[selecionadoIdx];
    document.getElementById('escala-details').innerHTML = `
      <div class="grid md:grid-cols-3 gap-4 fade-in">
        <div class="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <p class="text-xs tracking-[0.2em] uppercase text-accent mb-2">Cor</p>
          <p class="font-display text-2xl">${v.nome}</p>
          <p class="text-sm text-muted font-mono mt-1">${v.hex}</p>
        </div>
        <div class="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <p class="text-xs tracking-[0.2em] uppercase text-accent mb-2">Branco</p>
          <p class="font-display text-2xl">${v.branco} <span class="text-sm text-muted">partes</span></p>
          <div class="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
            <div class="h-full bg-fg rounded-full transition-all duration-300" style="width:${v.branco*10}%"></div>
          </div>
        </div>
        <div class="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <p class="text-xs tracking-[0.2em] uppercase text-accent mb-2">Preto</p>
          <p class="font-display text-2xl">${v.preto} <span class="text-sm text-muted">partes</span></p>
          <div class="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
            <div class="h-full bg-black rounded-full transition-all duration-300" style="width:${v.preto*10}%"></div>
          </div>
        </div>
      </div>`;
  }

  // ── Treino ────────────────────────────────────────────────────────────
  const TOTAL_RODADAS = 10;
  let treinoState = { rodada:1, acertos:0, alvo:null, resposta:null, fase:'jogando' };

  function sortearValor(excluirValor) {
    let v;
    do { v = escalaCinza[Math.floor(Math.random() * escalaCinza.length)]; }
    while (excluirValor !== undefined && v.valor === excluirValor);
    return v;
  }

  function renderTreino() {
    treinoState = { rodada:1, acertos:0, alvo: sortearValor(), resposta:null, fase:'jogando' };
    renderTreinoView();
  }

  function renderTreinoView() {
    const app = document.getElementById('app');
    const { rodada, acertos, alvo, resposta, fase } = treinoState;

    // ── Resultado final
    if (fase === 'resultado') {
      const pct  = Math.round((acertos / TOTAL_RODADAS) * 100);
      const msg  = pct >= 80 ? 'Excelente percepção tonal!' : pct >= 50 ? 'Bom progresso, continue praticando.' : 'Revise a escala de cinzas e tente novamente.';
      app.innerHTML = `
        <div style="min-height:calc(100vh - 4rem)" class="flex items-center justify-center px-6 py-12">
          <div class="max-w-lg w-full text-center fade-in">
            <div class="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-accent mb-8">
              <span class="text-accent text-3xl">⊑</span>
            </div>
            <h1 class="font-display text-5xl md:text-6xl mb-3">${pct}%</h1>
            <p class="text-muted mb-2">Vocã acertou <span class="text-fg">${acertos}</span> de ${TOTAL_RODADAS} valores</p>
            <p class="text-accent text-sm mb-12">${msg}</p>
            <button onclick="navigate('treino')" class="inline-flex items-center gap-2 px-8 py-4 bg-fg text-bg rounded-full text-sm hover:bg-accent transition-colors">→ Tentar novamente</button>
          </div>
        </div>`;
      return;
    }

    // ── Botções de resposta (11 em linha, com bolinha colorida)
    const botoesHtml = escalaCinza.map(cor => {
      let bg = 'hsl(0 0% 6%)', border = 'hsl(0 0% 14%)', numColor = 'hsl(40 10% 94%)', opacity = '1';
      if (resposta !== null) {
        if (cor.valor === alvo.valor) { bg = '#d8880026'; border = '#d88800'; numColor = '#d88800'; }
        else if (cor.valor === resposta) { bg = 'hsl(0 72% 51% / 0.15)'; border = 'hsl(0 72% 51%)'; numColor = 'hsl(0 72% 51%)'; }
        else opacity = '0.35';
      }
      const disabled = resposta !== null ? 'disabled' : '';
      const onclick  = resposta !== null ? '' : `onclick="responderTreino(${cor.valor})"`;
      return `
        <button ${disabled} ${onclick}
          class="flex flex-col items-center justify-center gap-2 py-3 rounded-xl transition-all"
          style="background:${bg};border:1px solid ${border};opacity:${opacity};cursor:${resposta!==null?'default':'pointer'}"
          ${resposta===null?`onmouseenter="this.style.borderColor='#d8880099'" onmouseleave="this.style.borderColor='hsl(0 0% 14%)'"`:''}>
          <span class="font-mono text-sm font-medium" style="color:${numColor}">${cor.valor}</span>
          <div class="w-5 h-5 rounded-full" style="background-color:${cor.hex};box-shadow:0 0 0 1px hsl(0 0% 25%)"></div>
        </button>`;
    }).join('');

    // ── Feedback
    let feedbackHtml = '';
    if (resposta !== null) {
      const ok = resposta === alvo.valor;
      feedbackHtml = `
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-xl border border-white/10 bg-white/[0.02] fade-in">
          <span style="color:${ok?'#d88800':'hsl(0 72% 51%)'}">
            ${ok ? `✔ Correto! Valor ${alvo.valor} — ${alvo.nome}` : `✘ Incorreto. Correto: ${alvo.valor} — ${alvo.nome}`}
          </span>
          <button onclick="proximaRodadaTreino()" class="px-6 py-3 bg-fg text-bg rounded-full text-sm whitespace-nowrap hover:bg-accent transition-colors">
            ${rodada >= TOTAL_RODADAS ? 'Ver resultado' : 'Próximo →'}
          </button>
        </div>`;
    }

    const progresso = ((rodada - 1) / TOTAL_RODADAS) * 100;

    app.innerHTML = `
      <div style="min-height:calc(100vh - 4rem)" class="px-6 py-12 md:py-16 fade-in">
        <div class="max-w-6xl mx-auto">
          <!-- Header -->
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-0 mb-8">
            <div>
              <h1 class="font-display text-4xl md:text-5xl mb-1">Treino de Valores</h1>
              <p class="text-sm font-light text-muted">Identifique o valor tonal correto da amostra</p>
            </div>
            <div class="text-right sm:ml-8">
              <p class="text-sm text-muted">Rodada ${rodada}/${TOTAL_RODADAS}</p>
              <p class="text-sm font-medium text-accent">Acertos: ${acertos}</p>
            </div>
          </div>
          <!-- Barra de progresso -->
          <div class="w-full rounded-full mb-10" style="height:3px;background:hsl(0 0% 14%)">
            <div class="h-full rounded-full transition-all duration-500" style="width:${progresso}%;background:#d88800"></div>
          </div>
          <!-- Swatch largo -->
          <div class="w-full rounded-2xl mb-10 fade-in" style="background-color:${alvo.hex};height:220px;border:1px solid hsl(0 0% 14%)"></div>
          <!-- Botções de resposta -->
          <div class="grid grid-cols-5 md:grid-cols-11 mb-8" style="gap:0.5rem">
            ${botoesHtml}
          </div>
          <!-- Feedback -->
          ${feedbackHtml}
        </div>
      </div>`;
  }

  function responderTreino(valor) {
    if (treinoState.resposta !== null) return;
    treinoState.resposta = valor;
    if (valor === treinoState.alvo.valor) treinoState.acertos++;
    renderTreinoView();
  }

  function proximaRodadaTreino() {
    if (treinoState.rodada >= TOTAL_RODADAS) { treinoState.fase = 'resultado'; renderTreinoView(); return; }
    treinoState.rodada++;
    treinoState.alvo = sortearValor(treinoState.alvo.valor);
    treinoState.resposta = null;
    renderTreinoView();
  }

  // ── Misturas ──────────────────────────────────────────────────────────
  function renderMisturas() {
    const app = document.getElementById('app');
    const rows = escalaCinza.map((v,i) => `
      <div class="grid items-center p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors fade-in" style="grid-template-columns:auto auto 1fr;gap:0.75rem 1rem;animation-delay:${i*0.04}s">
        <div><p class="font-display text-3xl">${v.valor}</p></div>
        <div class="rounded-lg border border-white/10" style="width:3.5rem;height:3rem;background-color:${v.hex}"></div>
        <div>
          <p class="text-sm font-medium">${v.nome}</p>
          <p class="text-xs text-muted font-mono">${v.hex}</p>
        </div>
        <div class="col-span-3 flex items-center gap-2 text-xs mt-2">
          <span class="text-right w-8 text-muted" title="${pigmentos.branco.nome}">${v.branco}B</span>
          <div class="flex-1 h-6 rounded overflow-hidden flex" style="box-shadow:0 0 0 1px hsl(0 0% 14%)">
            ${v.branco > 0 ? `<div class="bg-white" style="width:${v.branco*10}%"></div>` : ''}
            ${v.preto  > 0 ? `<div class="bg-black" style="width:${v.preto*10}%"></div>`  : ''}
          </div>
          <span class="w-8 text-muted" title="${pigmentos.preto.nome}">${v.preto}P</span>
          <span class="text-muted ml-1">${v.branco===0?'100% preto':v.preto===0?'100% branco':`${v.branco}:${v.preto}`}</span>
        </div>
      </div>`).join('');
    const tips = dicas.map(d => `<li>— ${d}</li>`).join('');
    const alternativas = pigmentosAlternativos.map(p => `
      <div class="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-medium">${p.nome}</p>
          <span class="text-xs font-mono text-muted">${p.codigo}</span>
        </div>
        <p class="text-xs text-accent mb-1">${p.papel}</p>
        <p class="text-xs text-muted leading-relaxed">${p.desc}</p>
      </div>`).join('');

    app.innerHTML = `
      <div style="min-height:calc(100vh - 4rem)" class="px-6 py-12 md:py-16">
        <div class="max-w-6xl mx-auto">
          <div class="fade-in mb-12">
            <h1 class="font-display text-4xl md:text-5xl mb-4">Guia de Misturas</h1>
            <p class="text-muted max-w-2xl font-light">Cada valor tonal é obtido misturando ${pigmentos.branco.nome} e ${pigmentos.preto.nome} em proporções precisas. Use este guia como referência ao preparar suas tintas.</p>
          </div>

          <!-- Pigmentos de referência -->
          <div class="grid md:grid-cols-2 gap-4 mb-10 fade-in">
            <div class="p-6 rounded-xl border border-white/10 bg-white/[0.02] flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg flex-shrink-0 border border-white/10" style="background-color:#FFFFFF"></div>
              <div>
                <div class="flex items-center gap-2">
                  <p class="font-display text-lg">${pigmentos.branco.nome}</p>
                  <span class="text-xs font-mono text-accent">${pigmentos.branco.codigo}</span>
                </div>
                <p class="text-xs text-muted mt-1 leading-relaxed">${pigmentos.branco.desc}</p>
              </div>
            </div>
            <div class="p-6 rounded-xl border border-white/10 bg-white/[0.02] flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg flex-shrink-0 border border-white/10" style="background-color:#000000"></div>
              <div>
                <div class="flex items-center gap-2">
                  <p class="font-display text-lg">${pigmentos.preto.nome}</p>
                  <span class="text-xs font-mono text-accent">${pigmentos.preto.codigo}</span>
                </div>
                <p class="text-xs text-muted mt-1 leading-relaxed">${pigmentos.preto.desc}</p>
              </div>
            </div>
          </div>

          <div class="space-y-3">${rows}</div>

          <div class="mt-16 p-8 rounded-2xl border border-accent/20 bg-accent/[0.03] fade-in">
            <div class="flex items-start gap-4">
              <span class="text-accent flex-shrink-0 mt-1 text-2xl">◇</span>
              <div>
                <h3 class="font-display text-xl mb-4">Dicas de Mistura</h3>
                <ul class="space-y-2 text-sm text-muted">${tips}</ul>
              </div>
            </div>
          </div>

          <div class="mt-6 p-8 rounded-2xl border border-white/10 bg-white/[0.02] fade-in">
            <h3 class="font-display text-xl mb-1">Pigmentos Alternativos</h3>
            <p class="text-sm text-muted mb-5 font-light">Caso não tenha os pigmentos de referência, estas são substituições comuns — o resultado tonal muda ligeiramente de temperatura.</p>
            <div class="grid md:grid-cols-3 gap-4">${alternativas}</div>
          </div>
        </div>
      </div>`;
  }

  // ── Converter para Cinzas ─────────────────────────────────────────────
  let converterState = {
    originalImageData: null,
    originalImg: null,
    brilho: 0, contraste: 0, intensidade: 100,
    metodo: 'luminancia',
  };

  function renderConverter() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div style="min-height:calc(100vh - 4rem)" class="px-6 py-12 md:py-16">
        <div class="max-w-6xl mx-auto">

          <!-- Header -->
          <div class="fade-in mb-10">
            <h1 class="font-display text-4xl md:text-5xl mb-4">Converter para Cinzas</h1>
            <p class="text-muted max-w-2xl font-light">Fa├ºa o upload de uma foto de referência e converta-a para escala de cinzas para estudar valores tonais. Ajuste brilho e contraste para focar nos valores que importam.</p>
          </div>

          <!-- Upload zone -->
          <div id="upload-zone"
            class="w-full rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 mb-8 cursor-pointer transition-all hover:border-accent/60 hover:bg-white/[0.02]"
            style="min-height:220px"
            onclick="document.getElementById('file-input').click()"
            ondragover="handleDragOver(event)"
            ondragleave="handleDragLeave(event)"
            ondrop="handleDrop(event)">
            <input type="file" id="file-input" accept="image/jpeg,image/png,image/webp" class="hidden" onchange="handleFileChange(event)" />
            <div id="upload-placeholder" class="flex flex-col items-center gap-3 text-center p-8">
              <div class="w-14 h-14 rounded-full bg-white/[0.06] flex items-center justify-center">
                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <p class="font-display text-xl">Clique ou arraste uma imagem</p>
              <p class="text-muted text-sm">Aceita JPG, PNG e WebP. Recomendado até 10MB.</p>
            </div>
          </div>

          <!-- Canvases (hidden until image is loaded) -->
          <div id="canvas-section" class="hidden mb-8">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-muted mb-3">Original</p>
                <canvas id="canvas-original" class="w-full rounded-xl border border-white/10" style="max-height:400px;object-fit:contain"></canvas>
              </div>
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-accent mb-3">Resultado</p>
                <canvas id="canvas-resultado" class="w-full rounded-xl border border-white/10" style="max-height:400px;object-fit:contain"></canvas>
              </div>
            </div>
          </div>

          <!-- Stats (hidden until image) -->
          <div id="stats-section" class="hidden mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-center">
              <p class="text-xs uppercase tracking-[0.2em] text-accent mb-1">Valor Médio</p>
              <p id="stat-valor" class="font-display text-2xl">—</p>
            </div>
            <div class="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-center">
              <p class="text-xs uppercase tracking-[0.2em] text-accent mb-1">Luminosidade</p>
              <p id="stat-lumi" class="font-display text-2xl">—</p>
            </div>
            <div class="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-center">
              <p class="text-xs uppercase tracking-[0.2em] text-accent mb-1">Faixa Dominante</p>
              <p id="stat-faixa" class="font-display text-xl">—</p>
            </div>
            <div class="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-center">
              <p class="text-xs uppercase tracking-[0.2em] text-accent mb-1">Contraste</p>
              <p id="stat-contraste" class="font-display text-xl">—</p>
            </div>
          </div>

          <!-- Controls -->
          <div class="p-4 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] mb-6">
            <div class="grid md:grid-cols-2 gap-8">

              <!-- Sliders -->
              <div class="space-y-6">
                <h3 class="font-display text-xl mb-4">Ajustes</h3>
                <div>
                  <div class="flex justify-between text-sm mb-2">
                    <span>Brilho</span>
                    <span id="val-brilho" class="text-accent font-mono">0</span>
                  </div>
                  <input type="range" id="sl-brilho" min="-100" max="100" value="0" class="w-full" oninput="onSlider('brilho', this.value)" />
                </div>
                <div>
                  <div class="flex justify-between text-sm mb-2">
                    <span>Contraste</span>
                    <span id="val-contraste" class="text-accent font-mono">0</span>
                  </div>
                  <input type="range" id="sl-contraste" min="-100" max="100" value="0" class="w-full" oninput="onSlider('contraste', this.value)" />
                </div>
                <div>
                  <div class="flex justify-between text-sm mb-2">
                    <span>Intensidade do Cinza</span>
                    <span id="val-intensidade" class="text-accent font-mono">100%</span>
                  </div>
                  <input type="range" id="sl-intensidade" min="0" max="100" value="100" class="w-full" oninput="onSlider('intensidade', this.value)" />
                  <p class="text-xs text-muted mt-1">0% = cor original ┬À 100% = cinza completo</p>
                </div>
              </div>

              <!-- Método -->
              <div>
                <h3 class="font-display text-xl mb-4">Método de Conversão</h3>
                <div class="space-y-3">
                  ${[
                    { id:'luminancia', label:'Luminância <span class="text-accent text-xs">(recomendado)</span>', desc:'Pesos ITU-R BT.601: 0.299R + 0.587G + 0.114B. Mais próximo da percepção humana.' },
                    { id:'media',      label:'Média simples',         desc:'Média aritmêtica dos canais R, G e B.' },
                    { id:'maximo',     label:'Valor míximo',          desc:'Usa o canal com maior valor entre R, G e B.' },
                  ].map(m => `
                    <label class="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${m.id==='luminancia'?'border-accent/40 bg-accent/[0.04]':'border-white/10 hover:border-white/20'}" id="lbl-${m.id}">
                      <input type="radio" name="metodo" value="${m.id}" ${m.id==='luminancia'?'checked':''} class="mt-1 accent-[#d88800]" onchange="onMetodo('${m.id}')" />
                      <div>
                        <p class="text-sm font-medium">${m.label}</p>
                        <p class="text-xs text-muted mt-0.5">${m.desc}</p>
                      </div>
                    </label>`).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- Botções -->
          <div class="flex flex-col sm:flex-row gap-4">
            <button onclick="resetarAjustes()" class="px-6 py-3 rounded-full border border-white/10 text-sm hover:border-accent/40 transition-colors">
              Redefinir Ajustes
            </button>
            <button id="btn-download" onclick="baixarImagem()" disabled
              class="flex-1 px-8 py-4 rounded-full text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              style="background:#d88800;color:hsl(0 0% 4%)"
              onmouseenter="if(!this.disabled) this.style.background='#c07800'"
              onmouseleave="if(!this.disabled) this.style.background='#d88800'">
              Baixar Imagem (PNG)
            </button>
            <button onclick="document.getElementById('file-input').click()" class="px-6 py-3 rounded-full border border-white/10 text-sm hover:border-accent/40 transition-colors">
              Trocar Imagem
            </button>
          </div>

        </div>
      </div>`;
  }

  // ── Converter: handlers ───────────────────────────────────────────────
  function handleDragOver(e) { e.preventDefault(); document.getElementById('upload-zone').classList.add('drag-over'); }
  function handleDragLeave(e) { document.getElementById('upload-zone').classList.remove('drag-over'); }
  function handleDrop(e) {
    e.preventDefault();
    document.getElementById('upload-zone').classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }
  function handleFileChange(e) { if (e.target.files[0]) processFile(e.target.files[0]); }

  function processFile(file) {
    if (!file.type.match(/image\/(jpeg|png|webp)/)) { alert('Formato não suportado. Use JPG, PNG ou WebP.'); return; }
    if (file.size > 12 * 1024 * 1024) { alert('Imagem muito grande. Use arquivos de até 10MB.'); return; }
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        converterState.originalImg = img;
        // Draw original
        const cOrig = document.getElementById('canvas-original');
        const maxW = 800, maxH = 600;
        let w = img.width, h = img.height;
        if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
        if (h > maxH) { w = Math.round(w * maxH / h); h = maxH; }
        cOrig.width = w; cOrig.height = h;
        const ctx = cOrig.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        converterState.originalImageData = ctx.getImageData(0, 0, w, h);
        // Show sections
        document.getElementById('canvas-section').classList.remove('hidden');
        document.getElementById('stats-section').classList.remove('hidden');
        document.getElementById('btn-download').disabled = false;
        document.getElementById('upload-placeholder').innerHTML = `
          <p class="text-muted text-sm">Imagem carregada: <span class="text-fg">${file.name}</span></p>`;
        // Process
        aplicarFiltros();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function onSlider(campo, valor) {
    converterState[campo] = Number(valor);
    const el = document.getElementById('val-' + campo);
    if (el) el.textContent = campo === 'intensidade' ? valor + '%' : valor;
    aplicarFiltros();
  }

  function onMetodo(m) {
    converterState.metodo = m;
    ['luminancia','media','maximo'].forEach(id => {
      const lbl = document.getElementById('lbl-' + id);
      if (!lbl) return;
      if (id === m) {
        lbl.style.borderColor = '#d8880066';
        lbl.style.background  = '#d888000a';
      } else {
        lbl.style.borderColor = 'hsl(0 0% 14%)';
        lbl.style.background  = 'transparent';
      }
    });
    aplicarFiltros();
  }

  function resetarAjustes() {
    converterState.brilho = 0; converterState.contraste = 0; converterState.intensidade = 100; converterState.metodo = 'luminancia';
    ['brilho','contraste','intensidade'].forEach(c => {
      const sl = document.getElementById('sl-' + c);
      const vl = document.getElementById('val-' + c);
      if (sl) sl.value = c === 'intensidade' ? 100 : 0;
      if (vl) vl.textContent = c === 'intensidade' ? '100%' : '0';
    });
    document.querySelector('input[name=metodo][value=luminancia]').checked = true;
    onMetodo('luminancia');
    aplicarFiltros();
  }

  function aplicarFiltros() {
    if (!converterState.originalImageData) return;
    const { originalImageData, brilho, contraste, intensidade, metodo, originalImg } = converterState;
    const cRes = document.getElementById('canvas-resultado');
    cRes.width  = originalImageData.width;
    cRes.height = originalImageData.height;
    const ctx   = cRes.getContext('2d');
    const src   = originalImageData.data;
    const out   = ctx.createImageData(cRes.width, cRes.height);
    const d     = out.data;
    const iRatio = intensidade / 100;
    const contrastFactor = (259 * (contraste + 255)) / (255 * (259 - contraste));
    let totalGray = 0, minGray = 255, maxGray = 0;

    for (let i = 0; i < src.length; i += 4) {
      const r = src[i], g = src[i+1], b = src[i+2];
      let gray;
      if      (metodo === 'luminancia') gray = 0.299*r + 0.587*g + 0.114*b;
      else if (metodo === 'media')      gray = (r + g + b) / 3;
      else                              gray = Math.max(r, g, b);

      // Brilho
      gray = Math.min(255, Math.max(0, gray + brilho * 2.55));
      // Contraste
      gray = Math.min(255, Math.max(0, contrastFactor * (gray - 128) + 128));

      const gInt = Math.round(gray);
      totalGray += gInt;
      if (gInt < minGray) minGray = gInt;
      if (gInt > maxGray) maxGray = gInt;

      // Blend com original
      const fR = Math.round(gInt * iRatio + r * (1 - iRatio));
      const fG = Math.round(gInt * iRatio + g * (1 - iRatio));
      const fB = Math.round(gInt * iRatio + b * (1 - iRatio));
      d[i]=fR; d[i+1]=fG; d[i+2]=fB; d[i+3]=255;
    }
    ctx.putImageData(out, 0, 0);

    // Stats
    const pixels  = (src.length / 4);
    const avgGray = totalGray / pixels;
    const avgVal  = Math.round((avgGray / 255) * 10 * 10) / 10;
    const range   = maxGray - minGray;
    const faixa   = avgGray < 85 ? 'Escuro' : avgGray < 170 ? 'Médio' : 'Claro';
    const ctStr   = range < 80 ? 'Baixo' : range < 160 ? 'Médio' : 'Alto';

    const sv = document.getElementById('stat-valor');
    const sl = document.getElementById('stat-lumi');
    const sf = document.getElementById('stat-faixa');
    const sc = document.getElementById('stat-contraste');
    if (sv) sv.textContent = avgVal.toFixed(1);
    if (sl) sl.textContent = Math.round(avgGray);
    if (sf) sf.textContent = faixa;
    if (sc) sc.textContent = ctStr;
  }

  function baixarImagem() {
    const canvas = document.getElementById('canvas-resultado');
    if (!canvas) return;
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a   = document.createElement('a');
      a.href = url; a.download = 'cinzas.png';
      document.body.appendChild(a); a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  }

  // ── Posterizar ──────────────────────────────────────────────────────
  let posterizeState = {
    originalImageData: null,
    niveis: 4,
    metodo: 'luminancia',
  };

  function renderPosterizar() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div style="min-height:calc(100vh - 4rem)" class="px-6 py-12 md:py-16">
        <div class="max-w-6xl mx-auto">

          <!-- Header -->
          <div class="fade-in mb-10">
            <h1 class="font-display text-4xl md:text-5xl mb-4">Posterizar</h1>
            <p class="text-muted max-w-2xl font-light">Reduza qualquer imagem a poucos tons de cinza para enxergar apenas as regiões de valor — como blocos. Essa é a forma mais eficaz de treinar o olhar para pintar.</p>
          </div>

          <!-- Upload zone -->
          <div id="pz-upload-zone"
            class="w-full rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 mb-8 cursor-pointer transition-all hover:border-accent/60 hover:bg-white/[0.02]"
            style="min-height:220px"
            onclick="document.getElementById('pz-file-input').click()"
            ondragover="pzHandleDragOver(event)"
            ondragleave="pzHandleDragLeave(event)"
            ondrop="pzHandleDrop(event)">
            <input type="file" id="pz-file-input" accept="image/jpeg,image/png,image/webp" class="hidden" onchange="pzHandleFileChange(event)" />
            <div id="pz-upload-placeholder" class="flex flex-col items-center gap-3 text-center p-8">
              <div class="w-14 h-14 rounded-full bg-white/[0.06] flex items-center justify-center">
                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <p class="font-display text-xl">Clique ou arraste uma imagem</p>
              <p class="text-muted text-sm">Aceita JPG, PNG e WebP. Recomendado até 10MB.</p>
            </div>
          </div>

          <!-- Canvases -->
          <div id="pz-canvas-section" class="hidden mb-8">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-muted mb-3">Original</p>
                <canvas id="pz-canvas-original" class="w-full rounded-xl border border-white/10" style="max-height:400px;object-fit:contain"></canvas>
              </div>
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-accent mb-3">Posterizado</p>
                <canvas id="pz-canvas-resultado" class="w-full rounded-xl border border-white/10" style="max-height:400px;object-fit:contain"></canvas>
              </div>
            </div>
          </div>

          <!-- Controls -->
          <div id="pz-controls-section" class="hidden p-4 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] mb-6">
            <div class="grid md:grid-cols-2 gap-8">
              <div class="space-y-6">
                <h3 class="font-display text-xl mb-4">Número de Tons</h3>
                <div class="flex flex-wrap gap-3" id="pz-levels">
                  ${[3,4,5,7,11].map(n => `
                    <button onclick="pzSetNiveis(${n})" data-nivel="${n}"
                      class="px-5 py-3 rounded-xl text-sm font-medium transition-all ${n===4?'border-accent/40 bg-accent/[0.04] text-accent border':'border-white/10 text-muted hover:border-white/20'}">
                      ${n} tons
                    </button>`).join('')}
                </div>
                <p class="text-xs text-muted mt-2">Menos tons = formas mais simplificadas. 3—5 é ideal para estudo.</p>

                <h3 class="font-display text-xl mt-6 mb-4">Método de Conversão</h3>
                <div class="space-y-3">
                  ${[
                    { id:'luminancia', label:'Luminância <span class="text-accent text-xs">(recomendado)</span>', desc:'Pesos ITU-R BT.601. Mais próximo da percepção humana.' },
                    { id:'media',      label:'Média simples',         desc:'Média aritmêtica dos canais R, G e B.' },
                  ].map(m => `
                    <label class="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${m.id==='luminancia'?'border-accent/40 bg-accent/[0.04]':'border-white/10 hover:border-white/20'}" id="pz-lbl-${m.id}">
                      <input type="radio" name="pz-metodo" value="${m.id}" ${m.id==='luminancia'?'checked':''} class="mt-1 accent-[#d88800]" onchange="pzOnMetodo('${m.id}')" />
                      <div>
                        <p class="text-sm font-medium">${m.label}</p>
                        <p class="text-xs text-muted mt-0.5">${m.desc}</p>
                      </div>
                    </label>`).join('')}
                </div>
              </div>

              <div class="space-y-6">
                <h3 class="font-display text-xl mb-4">Legenda</h3>
                <div id="pz-legenda" class="space-y-2"></div>
              </div>
            </div>
          </div>

          <!-- Botções -->
          <div id="pz-actions" class="hidden flex flex-col sm:flex-row gap-4">
            <button id="pz-btn-download" onclick="pzBaixarImagem()"
              class="flex-1 px-8 py-4 rounded-full text-sm font-medium transition-colors"
              style="background:#d88800;color:hsl(0 0% 4%)"
              onmouseenter="this.style.background='#c07800'"
              onmouseleave="this.style.background='#d88800'">
              Baixar Posterizado (PNG)
            </button>
            <button onclick="document.getElementById('pz-file-input').click()" class="px-6 py-3 rounded-full border border-white/10 text-sm hover:border-accent/40 transition-colors">
              Trocar Imagem
            </button>
          </div>

        </div>
      </div>`;
  }

  function pzSetNiveis(n) {
    posterizeState.niveis = n;
    document.querySelectorAll('#pz-levels button').forEach(btn => {
      const v = Number(btn.dataset.nivel);
      btn.className = v === n
        ? 'px-4 py-2.5 md:px-5 md:py-3 rounded-xl text-sm font-medium transition-all border-accent/40 bg-accent/[0.04] text-accent border'
        : 'px-4 py-2.5 md:px-5 md:py-3 rounded-xl text-sm font-medium transition-all border-white/10 text-muted hover:border-white/20 border';
    });
    pzAplicarPosterizacao();
  }

  function pzOnMetodo(m) {
    posterizeState.metodo = m;
    ['luminancia','media'].forEach(id => {
      const lbl = document.getElementById('pz-lbl-' + id);
      if (!lbl) return;
      if (id === m) {
        lbl.style.borderColor = '#d8880066';
        lbl.style.background  = '#d888000a';
      } else {
        lbl.style.borderColor = 'hsl(0 0% 14%)';
        lbl.style.background  = 'transparent';
      }
    });
    pzAplicarPosterizacao();
  }

  function pzHandleDragOver(e) { e.preventDefault(); document.getElementById('pz-upload-zone').classList.add('drag-over'); }
  function pzHandleDragLeave(e) { document.getElementById('pz-upload-zone').classList.remove('drag-over'); }
  function pzHandleDrop(e) {
    e.preventDefault();
    document.getElementById('pz-upload-zone').classList.remove('drag-over');
    if (e.dataTransfer.files[0]) pzProcessFile(e.dataTransfer.files[0]);
  }
  function pzHandleFileChange(e) { if (e.target.files[0]) pzProcessFile(e.target.files[0]); }

  function pzProcessFile(file) {
    if (!file.type.match(/image\/(jpeg|png|webp)/)) { alert('Formato não suportado. Use JPG, PNG ou WebP.'); return; }
    if (file.size > 12 * 1024 * 1024) { alert('Imagem muito grande. Use arquivos de até 10MB.'); return; }
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const cOrig = document.getElementById('pz-canvas-original');
        const maxW = 800, maxH = 600;
        let w = img.width, h = img.height;
        if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
        if (h > maxH) { w = Math.round(w * maxH / h); h = maxH; }
        cOrig.width = w; cOrig.height = h;
        const ctx = cOrig.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        posterizeState.originalImageData = ctx.getImageData(0, 0, w, h);

        document.getElementById('pz-canvas-section').classList.remove('hidden');
        document.getElementById('pz-controls-section').classList.remove('hidden');
        document.getElementById('pz-actions').classList.remove('hidden');
        document.getElementById('pz-upload-placeholder').innerHTML =
          `<p class="text-muted text-sm">Imagem carregada: <span class="text-fg">${file.name}</span></p>`;

        pzAplicarPosterizacao();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function pzAplicarPosterizacao() {
    if (!posterizeState.originalImageData) return;
    const { originalImageData, niveis, metodo } = posterizeState;
    const cRes = document.getElementById('pz-canvas-resultado');
    cRes.width  = originalImageData.width;
    cRes.height = originalImageData.height;
    const ctx   = cRes.getContext('2d');
    const src   = originalImageData.data;
    const out   = ctx.createImageData(cRes.width, cRes.height);
    const d     = out.data;

    const passo   = 255 / (niveis - 1);
    const escala  = escalaCinza;

    for (let i = 0; i < src.length; i += 4) {
      const r = src[i], g = src[i+1], b = src[i+2];
      let gray = metodo === 'luminancia'
        ? 0.299*r + 0.587*g + 0.114*b
        : (r + g + b) / 3;

      const idx = Math.round(gray / passo);
      const clampIdx = Math.min(idx, niveis - 1);
      const posterGray = Math.round(clampIdx * passo);

      // Se 11 níveis, mapear diretamente para a escala 0—10
      let finalGray;
      if (niveis === 11) {
        const escIdx = Math.min(Math.round((gray / 255) * 10), 10);
        finalGray = Math.round(escIdx * 25.5);
      } else {
        finalGray = posterGray;
      }

      const fR = Math.round(finalGray * (r / 255));
      const fG = Math.round(finalGray * (g / 255));
      const fB = Math.round(finalGray * (b / 255));
      d[i] = fR; d[i+1] = fG; d[i+2] = fB; d[i+3] = 255;
    }
    ctx.putImageData(out, 0, 0);

    // Legenda
    const legenda = document.getElementById('pz-legenda');
    let html = '';
    for (let i = 0; i < niveis; i++) {
      const val = niveis === 11 ? i : Math.round((i / (niveis - 1)) * 10);
      const hex = niveis === 11 ? escala[i].hex : `#${Math.round(i * passo).toString(16).padStart(2,'0').repeat(3)}`;
      const nome = niveis === 11 ? escala[val].nome : `Tom ${i + 1}`;
      const branco = niveis === 11 ? escala[val].branco : Math.round(((niveis - 1 - i) / (niveis - 1)) * 10);
      const preto  = niveis === 11 ? escala[val].preto  : Math.round((i / (niveis - 1)) * 10);
      html += `
        <div class="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/[0.02] fade-in" style="animation-delay:${i * 0.04}s">
          <div class="w-10 h-10 rounded-lg flex-shrink-0" style="background-color:${hex};${i === 0 ? 'box-shadow:inset 0 0 0 1px hsl(0 0% 20%)' : ''}"></div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium">${nome}</p>
            <p class="text-xs text-muted font-mono">${hex}</p>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="text-xs text-muted">${branco}B : ${preto}P</p>
        </div>
      </div>`;
    }
    legenda.innerHTML = html;
  }

  function pzBaixarImagem() {
    const canvas = document.getElementById('pz-canvas-resultado');
    if (!canvas) return;
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a   = document.createElement('a');
      a.href = url; a.download = 'posterizado.png';
      document.body.appendChild(a); a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  }

  // ── Mapear Zonas ──────────────────────────────────────────────────────
  let zonasState = {
    originalImageData: null,
    cols: 5,
    rows: 5,
    metodo: 'luminancia',
    overlay: true,
  };

  function renderZonas() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div style="min-height:calc(100vh - 4rem)" class="px-6 py-12 md:py-16">
        <div class="max-w-6xl mx-auto">

          <!-- Header -->
          <div class="fade-in mb-10">
            <h1 class="font-display text-4xl md:text-5xl mb-4">Mapear Zonas</h1>
            <p class="text-muted max-w-2xl font-light">Divida a imagem em uma grade e descubra o valor tonal dominante de cada zona. É o mapa que vocã monta antes de colocar tinta na tela.</p>
          </div>

          <!-- Upload zone -->
          <div id="zn-upload-zone"
            class="w-full rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 mb-8 cursor-pointer transition-all hover:border-accent/60 hover:bg-white/[0.02]"
            style="min-height:220px"
            onclick="document.getElementById('zn-file-input').click()"
            ondragover="znHandleDragOver(event)"
            ondragleave="znHandleDragLeave(event)"
            ondrop="znHandleDrop(event)">
            <input type="file" id="zn-file-input" accept="image/jpeg,image/png,image/webp" class="hidden" onchange="znHandleFileChange(event)" />
            <div id="zn-upload-placeholder" class="flex flex-col items-center gap-3 text-center p-8">
              <div class="w-14 h-14 rounded-full bg-white/[0.06] flex items-center justify-center">
                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <p class="font-display text-xl">Clique ou arraste uma imagem</p>
              <p class="text-muted text-sm">Aceita JPG, PNG e WebP. Recomendado até 10MB.</p>
            </div>
          </div>

          <!-- Result area -->
          <div id="zn-result-section" class="hidden">
            <!-- Canvas com grade -->
            <div class="mb-8">
              <canvas id="zn-canvas" class="w-full rounded-xl border border-white/10" style="max-height:500px;object-fit:contain"></canvas>
            </div>

            <!-- Grade numérica (abaixo da imagem) -->
            <div id="zn-grid-numbers" class="mb-8"></div>

            <!-- Legenda de zonas -->
            <div id="zn-legend" class="mb-8"></div>

            <!-- Controles -->
            <div class="p-4 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] mb-6">
              <div class="grid md:grid-cols-2 gap-8">
                <div class="space-y-6">
                  <h3 class="font-display text-xl mb-4">Tamanho da Grade</h3>
                  <div class="flex flex-wrap gap-3" id="zn-grid-btns">
                    ${[
                      { c:3, r:3, label:'3×3' },
                      { c:4, r:4, label:'4×4' },
                      { c:5, r:5, label:'5×5' },
                      { c:6, r:6, label:'6×6' },
                      { c:7, r:7, label:'7×7' },
                    ].map(g => `
                      <button onclick="znSetGrid(${g.c},${g.r})" data-c="${g.c}"
                        class="px-4 py-3 rounded-xl text-sm font-medium transition-all ${g.c===5?'border-accent/40 bg-accent/[0.04] text-accent border':'border-white/10 text-muted hover:border-white/20'}">
                        ${g.label}
                      </button>`).join('')}
                  </div>
                  <p class="text-xs text-muted mt-2">Menos zonas = visão mais simplificada. Comece com 3×3 e aumente conforme a necessidade.</p>

                  <h3 class="font-display text-xl mt-6 mb-4">Sobreposição</h3>
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" id="zn-overlay-toggle" checked onchange="znToggleOverlay()" class="accent-[#d88800] w-4 h-4" />
                    <span class="text-sm">Mostrar cores por faixa (escuro / médio / claro)</span>
                  </label>

                  <h3 class="font-display text-xl mt-6 mb-4">Método</h3>
                  <div class="space-y-3">
                    ${[
                      { id:'luminancia', label:'Luminância <span class="text-accent text-xs">(recomendado)</span>' },
                      { id:'media',      label:'Média simples' },
                    ].map(m => `
                      <label class="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${m.id==='luminancia'?'border-accent/40 bg-accent/[0.04]':'border-white/10 hover:border-white/20'}" id="zn-lbl-${m.id}">
                        <input type="radio" name="zn-metodo" value="${m.id}" ${m.id==='luminancia'?'checked':''} class="mt-1 accent-[#d88800]" onchange="znOnMetodo('${m.id}')" />
                        <p class="text-sm font-medium">${m.label}</p>
                      </label>`).join('')}
                  </div>
                </div>

                <div>
                  <h3 class="font-display text-xl mb-4">Resumo Tonal</h3>
                  <div id="zn-summary" class="space-y-3"></div>
                </div>
              </div>
            </div>

            <!-- Botções -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button onclick="znBaixarImagem()"
                class="flex-1 px-8 py-4 rounded-full text-sm font-medium transition-colors"
                style="background:#d88800;color:hsl(0 0% 4%)"
                onmouseenter="this.style.background='#c07800'"
                onmouseleave="this.style.background='#d88800'">
                Baixar Mapa de Zonas (PNG)
              </button>
              <button onclick="document.getElementById('zn-file-input').click()" class="px-6 py-3 rounded-full border border-white/10 text-sm hover:border-accent/40 transition-colors">
                Trocar Imagem
              </button>
            </div>
          </div>

        </div>
      </div>`;
  }

  function znSetGrid(c, r) {
    zonasState.cols = c;
    zonasState.rows = r;
    document.querySelectorAll('#zn-grid-btns button').forEach(btn => {
      const v = Number(btn.dataset.c);
      btn.className = v === c
        ? 'px-4 py-2.5 md:py-3 rounded-xl text-sm font-medium transition-all border-accent/40 bg-accent/[0.04] text-accent border'
        : 'px-4 py-2.5 md:py-3 rounded-xl text-sm font-medium transition-all border-white/10 text-muted hover:border-white/20 border';
    });
    znProcessar();
  }

  function znToggleOverlay() {
    zonasState.overlay = document.getElementById('zn-overlay-toggle').checked;
    znProcessar();
  }

  function znOnMetodo(m) {
    zonasState.metodo = m;
    ['luminancia','media'].forEach(id => {
      const lbl = document.getElementById('zn-lbl-' + id);
      if (!lbl) return;
      if (id === m) {
        lbl.style.borderColor = '#d8880066';
        lbl.style.background  = '#d888000a';
      } else {
        lbl.style.borderColor = 'hsl(0 0% 14%)';
        lbl.style.background  = 'transparent';
      }
    });
    znProcessar();
  }

  function znHandleDragOver(e) { e.preventDefault(); document.getElementById('zn-upload-zone').classList.add('drag-over'); }
  function znHandleDragLeave(e) { document.getElementById('zn-upload-zone').classList.remove('drag-over'); }
  function znHandleDrop(e) {
    e.preventDefault();
    document.getElementById('zn-upload-zone').classList.remove('drag-over');
    if (e.dataTransfer.files[0]) znProcessFile(e.dataTransfer.files[0]);
  }
  function znHandleFileChange(e) { if (e.target.files[0]) znProcessFile(e.target.files[0]); }

  function znProcessFile(file) {
    if (!file.type.match(/image\/(jpeg|png|webp)/)) { alert('Formato não suportado. Use JPG, PNG ou WebP.'); return; }
    if (file.size > 12 * 1024 * 1024) { alert('Imagem muito grande. Use arquivos de até 10MB.'); return; }
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const maxW = 800, maxH = 600;
        let w = img.width, h = img.height;
        if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
        if (h > maxH) { w = Math.round(w * maxH / h); h = maxH; }

        const c = document.getElementById('zn-canvas');
        c.width = w; c.height = h;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        zonasState.originalImageData = ctx.getImageData(0, 0, w, h);

        document.getElementById('zn-result-section').classList.remove('hidden');
        document.getElementById('zn-upload-placeholder').innerHTML =
          `<p class="text-muted text-sm">Imagem carregada: <span class="text-fg">${file.name}</span></p>`;

        znProcessar();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function znProcessar() {
    if (!zonasState.originalImageData) return;
    const { originalImageData, cols, rows, metodo, overlay } = zonasState;
    const W = originalImageData.width, H = originalImageData.height;
    const src = originalImageData.data;
    const cellW = Math.floor(W / cols), cellH = Math.floor(H / rows);

    const c = document.getElementById('zn-canvas');
    c.width = W; c.height = H;
    const ctx = c.getContext('2d');
    ctx.putImageData(originalImageData, 0, 0);

    const zonasValores = [];
    const contagem = Array(11).fill(0);

    for (let r = 0; r < rows; r++) {
      zonasValores[r] = [];
      for (let col = 0; col < cols; col++) {
        let totalGray = 0, count = 0;
        const x0 = col * cellW, y0 = r * cellH;
        for (let y = y0; y < y0 + cellH && y < H; y++) {
          for (let x = x0; x < x0 + cellW && x < W; x++) {
            const i = (y * W + x) * 4;
            const rv = src[i], gv = src[i+1], bv = src[i+2];
            totalGray += metodo === 'luminancia' ? 0.299*rv + 0.587*gv + 0.114*bv : (rv + gv + bv) / 3;
            count++;
          }
        }
        const avgGray = totalGray / count;
        const valor = Math.min(10, Math.round((avgGray / 255) * 10));
        zonasValores[r][col] = valor;
        contagem[valor]++;
      }
    }

    // Overlay colorido
    if (overlay) {
      for (let r = 0; r < rows; r++) {
        for (let col = 0; col < cols; col++) {
          const v = zonasValores[r][col];
          const x0 = col * cellW, y0 = r * cellH;
          let fill;
          if (v <= 3) fill = 'rgba(255,255,255,0.35)';
          else if (v <= 7) fill = 'rgba(216,136,0,0.25)';
          else fill = 'rgba(0,0,0,0.45)';
          ctx.fillStyle = fill;
          ctx.fillRect(x0, y0, cellW, cellH);
        }
      }
    }

    // Linhas da grade
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 1;
    for (let c2 = 1; c2 < cols; c2++) {
      ctx.beginPath(); ctx.moveTo(c2 * cellW, 0); ctx.lineTo(c2 * cellW, rows * cellH); ctx.stroke();
    }
    for (let r2 = 1; r2 < rows; r2++) {
      ctx.beginPath(); ctx.moveTo(0, r2 * cellH); ctx.lineTo(cols * cellW, r2 * cellH); ctx.stroke();
    }

    // Números nas células
    for (let r = 0; r < rows; r++) {
      for (let col = 0; col < cols; col++) {
        const v = zonasValores[r][col];
        const cx = col * cellW + cellW / 2;
        const cy = r * cellH + cellH / 2;
        ctx.fillStyle = v <= 5 ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.85)';
        ctx.font = `bold ${Math.max(14, Math.min(cellW, cellH) * 0.32)}px Inter, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(v), cx, cy);
      }
    }

    // Grade numérica abaixo da imagem
    const gridNumEl = document.getElementById('zn-grid-numbers');
    let gridHtml = `<div class="grid gap-1.5" style="grid-template-columns:repeat(${cols},1fr)">`;
    for (let r = 0; r < rows; r++) {
      for (let col = 0; col < cols; col++) {
        const v = zonasValores[r][col];
        const hex = escalaCinza[v].hex;
        const txtColor = v > 5 ? '#333' : '#eee';
        gridHtml += `<div class="aspect-square rounded-lg flex items-center justify-center border border-white/10" style="background:${hex}">
          <span class="font-mono text-sm font-bold" style="color:${txtColor}">${v}</span>
        </div>`;
      }
    }
    gridHtml += '</div>';
    gridNumEl.innerHTML = gridHtml;

    // Legenda de cores
    document.getElementById('zn-legend').innerHTML = `
      <div class="flex flex-wrap gap-4 text-sm">
        <span class="flex items-center gap-2"><span class="w-4 h-4 rounded" style="background:rgba(255,255,255,0.35);border:1px solid rgba(255,255,255,0.2)"></span> Claros (0—3)</span>
        <span class="flex items-center gap-2"><span class="w-4 h-4 rounded" style="background:rgba(216,136,0,0.25);border:1px solid rgba(216,136,0,0.3)"></span> Médios (4—7)</span>
        <span class="flex items-center gap-2"><span class="w-4 h-4 rounded" style="background:rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,0.15)"></span> Escuros (8—10)</span>
      </div>`;

    // Resumo
    const total = cols * rows;
    const claros  = contagem.slice(0, 4).reduce((a,b) => a+b, 0);
    const medios  = contagem.slice(4, 8).reduce((a,b) => a+b, 0);
    const escuros = contagem.slice(8, 11).reduce((a,b) => a+b, 0);
    const pctClaros  = Math.round((claros / total) * 100);
    const pctMedios  = Math.round((medios / total) * 100);
    const pctEscuros = Math.round((escuros / total) * 100);

    const faixaDominante = claros >= medios && claros >= escuros ? 'Clara'
      : escuros >= medios ? 'Escura' : 'Mista';

    document.getElementById('zn-summary').innerHTML = `
      <div class="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
        <p class="text-xs uppercase tracking-[0.2em] text-accent mb-2">Faixa Dominante</p>
        <p class="font-display text-2xl">${faixaDominante}</p>
      </div>
      <div class="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
        <p class="text-xs uppercase tracking-[0.2em] text-muted mb-2">Distribuição</p>
        <div class="flex gap-1 h-3 rounded-full overflow-hidden mb-3">
          <div class="bg-white/30 rounded-l-full" style="width:${pctClaros}%"></div>
          <div class="bg-[#d88800]" style="width:${pctMedios}%"></div>
          <div class="bg-black/50 rounded-r-full" style="width:${pctEscuros}%"></div>
        </div>
        <div class="flex justify-between text-xs text-muted">
          <span>${pctClaros}% claros</span>
          <span>${pctMedios}% médios</span>
          <span>${pctEscuros}% escuros</span>
        </div>
      </div>
      <div class="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
        <p class="text-xs uppercase tracking-[0.2em] text-muted mb-2">Valores Mais Frequentes</p>
        <div class="flex flex-wrap gap-2 mt-2">
          ${contagem.map((cnt, i) => cnt > 0 ? `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs" style="background:${escalaCinza[i].hex};color:${i>5?'#333':'#eee'}"><span class="font-mono font-bold">${i}</span><span class="opacity-70">├ù${cnt}</span></span>` : '').join('')}
        </div>
      </div>`;
  }

  function znBaixarImagem() {
    const canvas = document.getElementById('zn-canvas');
    if (!canvas) return;
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a   = document.createElement('a');
      a.href = url; a.download = 'mapa-zonas.png';
      document.body.appendChild(a); a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  }

  // ── Risco Linear ──────────────────────────────────────────────────────
  let riscoState = {
    originalImageData: null,
    limiar: 30,
    inversao: false,
    suavizacao: 2,
  };

  function renderRiscoLinear() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div style="min-height:calc(100vh - 4rem)" class="px-6 py-12 md:py-16">
        <div class="max-w-6xl mx-auto">

          <!-- Header -->
          <div class="fade-in mb-10">
            <h1 class="font-display text-4xl md:text-5xl mb-4">Risco Linear</h1>
            <p class="text-muted max-w-2xl font-light">Extraia os contornos de qualquer imagem como um desenho de linha. Ideal para estudar formas, preparar a tela com o contorno base, ou simplificar uma referência complexa.</p>
          </div>

          <!-- Upload zone -->
          <div id="rl-upload-zone"
            class="w-full rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 mb-8 cursor-pointer transition-all hover:border-accent/60 hover:bg-white/[0.02]"
            style="min-height:220px"
            onclick="document.getElementById('rl-file-input').click()"
            ondragover="rlHandleDragOver(event)"
            ondragleave="rlHandleDragLeave(event)"
            ondrop="rlHandleDrop(event)">
            <input type="file" id="rl-file-input" accept="image/jpeg,image/png,image/webp" class="hidden" onchange="rlHandleFileChange(event)" />
            <div id="rl-upload-placeholder" class="flex flex-col items-center gap-3 text-center p-8">
              <div class="w-14 h-14 rounded-full bg-white/[0.06] flex items-center justify-center">
                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <p class="font-display text-xl">Clique ou arraste uma imagem</p>
              <p class="text-muted text-sm">Aceita JPG, PNG e WebP. Recomendado até 10MB.</p>
            </div>
          </div>

          <!-- Canvases -->
          <div id="rl-canvas-section" class="hidden mb-8">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-muted mb-3">Original</p>
                <canvas id="rl-canvas-original" class="w-full rounded-xl border border-white/10" style="max-height:400px;object-fit:contain"></canvas>
              </div>
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-accent mb-3">Risco Linear</p>
                <canvas id="rl-canvas-resultado" class="w-full rounded-xl border border-white/10" style="max-height:400px;object-fit:contain"></canvas>
              </div>
            </div>
          </div>

          <!-- Controls -->
          <div id="rl-controls-section" class="hidden p-4 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] mb-6">
            <div class="grid md:grid-cols-2 gap-8">
              <div class="space-y-6">
                <h3 class="font-display text-xl mb-4">Ajustes</h3>
                <div>
                  <div class="flex justify-between text-sm mb-2">
                    <span>Limiar (Sensibilidade)</span>
                    <span id="rl-val-limiar" class="text-accent font-mono">30</span>
                  </div>
                  <input type="range" id="rl-sl-limiar" min="5" max="120" value="30" class="w-full" oninput="rlOnSlider('limiar', this.value)" />
                  <p class="text-xs text-muted mt-1">Menor = mais detalhes ┬À Maior = apenas contornos fortes</p>
                </div>
                <div>
                  <div class="flex justify-between text-sm mb-2">
                    <span>Suavização (Gauss)</span>
                    <span id="rl-val-suavizacao" class="text-accent font-mono">2</span>
                  </div>
                  <input type="range" id="rl-sl-suavizacao" min="0" max="6" value="2" class="w-full" oninput="rlOnSlider('suavizacao', this.value)" />
                  <p class="text-xs text-muted mt-1">Remove ruído antes da detecção. 0 = sem suavização.</p>
                </div>
                <div>
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" id="rl-inversao-toggle" onchange="rlOnInversao()" class="accent-[#d88800] w-4 h-4" />
                    <span class="text-sm">Inverter cores (fundo branco)</span>
                  </label>
                  <p class="text-xs text-muted mt-1 ml-7">Linhas pretas em fundo branco — ideal para impressão e desenho na tela.</p>
                </div>
              </div>

              <div class="space-y-6">
                <h3 class="font-display text-xl mb-4">Sobre o Algoritmo</h3>
                <div class="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <p class="text-sm text-muted leading-relaxed">
                    O algoritmo <span class="text-fg font-medium">Sobel</span> detecta bordas calculando o gradiente de intensidade em cada pixel. Primeiro, a imagem é convertida para cinzas e suavizada (filtro Gaussiano). Depois, duas míscaras 3×3 calculam a variação horizontal e vertical. A intensidade do contorno é dada pela magnitude do gradiente — pixels com variação alta são bordas.
                  </p>
                  <p class="text-sm text-muted leading-relaxed mt-3">
                    <span class="text-accent font-medium">Dica prítica:</span> Para preparar a tela, use suavização 2—3 e limiar 25—40. Para um estudo detalhado, diminua o limiar e aumente a suavização.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Botções -->
          <div id="rl-actions" class="hidden flex flex-col sm:flex-row gap-4">
            <button onclick="rlResetarAjustes()" class="px-6 py-3 rounded-full border border-white/10 text-sm hover:border-accent/40 transition-colors">
              Redefinir Ajustes
            </button>
            <button id="rl-btn-download" onclick="rlBaixarImagem()"
              class="flex-1 px-8 py-4 rounded-full text-sm font-medium transition-colors"
              style="background:#d88800;color:hsl(0 0% 4%)"
              onmouseenter="this.style.background='#c07800'"
              onmouseleave="this.style.background='#d88800'">
              Baixar Risco Linear (PNG)
            </button>
            <button onclick="document.getElementById('rl-file-input').click()" class="px-6 py-3 rounded-full border border-white/10 text-sm hover:border-accent/40 transition-colors">
              Trocar Imagem
            </button>
          </div>

        </div>
      </div>`;
  }

  // ── Risco Linear: handlers ────────────────────────────────────────────
  function rlHandleDragOver(e) { e.preventDefault(); document.getElementById('rl-upload-zone').classList.add('drag-over'); }
  function rlHandleDragLeave(e) { document.getElementById('rl-upload-zone').classList.remove('drag-over'); }
  function rlHandleDrop(e) {
    e.preventDefault();
    document.getElementById('rl-upload-zone').classList.remove('drag-over');
    if (e.dataTransfer.files[0]) rlProcessFile(e.dataTransfer.files[0]);
  }
  function rlHandleFileChange(e) { if (e.target.files[0]) rlProcessFile(e.target.files[0]); }

  function rlProcessFile(file) {
    if (!file.type.match(/image\/(jpeg|png|webp)/)) { alert('Formato não suportado. Use JPG, PNG ou WebP.'); return; }
    if (file.size > 12 * 1024 * 1024) { alert('Imagem muito grande. Use arquivos de até 10MB.'); return; }
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const cOrig = document.getElementById('rl-canvas-original');
        const maxW = 2000, maxH = 1500;
        let w = img.width, h = img.height;
        if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
        if (h > maxH) { w = Math.round(w * maxH / h); h = maxH; }
        cOrig.width = w; cOrig.height = h;
        const ctx = cOrig.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        riscoState.originalImageData = ctx.getImageData(0, 0, w, h);

        document.getElementById('rl-canvas-section').classList.remove('hidden');
        document.getElementById('rl-controls-section').classList.remove('hidden');
        document.getElementById('rl-actions').classList.remove('hidden');
        document.getElementById('rl-upload-placeholder').innerHTML =
          `<p class="text-muted text-sm">Imagem carregada: <span class="text-fg">${file.name}</span></p>`;

        rlAplicar();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function rlOnSlider(campo, valor) {
    riscoState[campo] = Number(valor);
    const el = document.getElementById('rl-val-' + campo);
    if (el) el.textContent = valor;
    rlAplicar();
  }

  function rlOnInversao() {
    riscoState.inversao = document.getElementById('rl-inversao-toggle').checked;
    rlAplicar();
  }

  function rlResetarAjustes() {
    riscoState.limiar = 30;
    riscoState.suavizacao = 2;
    riscoState.inversao = false;
    const slL = document.getElementById('rl-sl-limiar');
    const slS = document.getElementById('rl-sl-suavizacao');
    const vlL = document.getElementById('rl-val-limiar');
    const vlS = document.getElementById('rl-val-suavizacao');
    const tog = document.getElementById('rl-inversao-toggle');
    if (slL) slL.value = 30;
    if (slS) slS.value = 2;
    if (vlL) vlL.textContent = '30';
    if (vlS) vlS.textContent = '2';
    if (tog) tog.checked = false;
    rlAplicar();
  }

  // ── Filtro Gaussiano 3×3 ─────────────────────────────────────────────
  function rlGaussianBlur(src, w, h, sigma) {
    if (sigma <= 0) return src;
    // Kernel 5×5 adaptativo ao sigma
    const s = Math.max(0.5, sigma);
    const k = 5;
    const kernel = [];
    let sum = 0;
    const half = Math.floor(k / 2);
    for (let y = -half; y <= half; y++) {
      for (let x = -half; x <= half; x++) {
        const v = Math.exp(-(x*x + y*y) / (2 * s * s));
        kernel.push(v);
        sum += v;
      }
    }
    for (let i = 0; i < kernel.length; i++) kernel[i] /= sum;

    const out = new Float32Array(w * h);
    // Pass horizontal
    const temp = new Float32Array(w * h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let val = 0;
        for (let ky = -half; ky <= half; ky++) {
          for (let kx = -half; kx <= half; kx++) {
            const px = Math.min(w - 1, Math.max(0, x + kx));
            const py = Math.min(h - 1, Math.max(0, y + ky));
            val += src[py * w + px] * kernel[(ky + half) * k + (kx + half)];
          }
        }
        temp[y * w + x] = val;
      }
    }
    // Pass vertical
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let val = 0;
        for (let ky = -half; ky <= half; ky++) {
          for (let kx = -half; kx <= half; kx++) {
            const px = Math.min(w - 1, Math.max(0, x + kx));
            const py = Math.min(h - 1, Math.max(0, y + ky));
            val += temp[py * w + px] * kernel[(ky + half) * k + (kx + half)];
          }
        }
        out[y * w + x] = val;
      }
    }
    return out;
  }

  // ── Sobel edge detection ──────────────────────────────────────────────
  function rlSobel(gray, w, h) {
    const mag = new Float32Array(w * h);
    // Gx e Gy kernels
    const Gx = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const Gy = [-1, -2, -1,  0, 0, 0,  1, 2, 1];
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        let sx = 0, sy = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = (y + ky) * w + (x + kx);
            const ki = (ky + 1) * 3 + (kx + 1);
            sx += gray[idx] * Gx[ki];
            sy += gray[idx] * Gy[ki];
          }
        }
        mag[y * w + x] = Math.sqrt(sx * sx + sy * sy);
      }
    }
    return mag;
  }

  // ── Aplicar risco linear ──────────────────────────────────────────────
  function rlAplicar() {
    if (!riscoState.originalImageData) return;
    const { originalImageData, limiar, inversao, suavizacao } = riscoState;
    const W = originalImageData.width, H = originalImageData.height;
    const src = originalImageData.data;
    const cRes = document.getElementById('rl-canvas-resultado');
    cRes.width = W; cRes.height = H;
    const ctx = cRes.getContext('2d');
    const out = ctx.createImageData(W, H);
    const d = out.data;

    // 1. Converter para cinzas (luminôncia)
    const gray = new Float32Array(W * H);
    for (let i = 0; i < src.length; i += 4) {
      gray[i / 4] = 0.299 * src[i] + 0.587 * src[i + 1] + 0.114 * src[i + 2];
    }

    // 2. Suavização Gaussiana
    const smoothed = rlGaussianBlur(gray, W, H, suavizacao);

    // 3. Sobel
    const edges = rlSobel(smoothed, W, H);

    // 4. Encontrar magnitude míxima para normalização
    let maxMag = 0;
    for (let i = 0; i < edges.length; i++) {
      if (edges[i] > maxMag) maxMag = edges[i];
    }

    // 5. Aplicar limiar e gerar resultado
    const limiarNorm = (limiar / 120) * maxMag;
    for (let i = 0; i < edges.length; i++) {
      let isEdge = edges[i] >= limiarNorm;
      let grayVal;
      if (inversao) {
        grayVal = isEdge ? 0 : 255;
      } else {
        grayVal = isEdge ? 255 : 0;
      }
      const pi = i * 4;
      d[pi] = grayVal;
      d[pi + 1] = grayVal;
      d[pi + 2] = grayVal;
      d[pi + 3] = 255;
    }
    ctx.putImageData(out, 0, 0);
  }

  function rlBaixarImagem() {
    const canvas = document.getElementById('rl-canvas-resultado');
    if (!canvas) return;
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a   = document.createElement('a');
      a.href = url; a.download = 'risco-linear.png';
      document.body.appendChild(a); a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  }

  // ── Isolador Tonal Dinâmico ──────────────────────────────────────────
  // Escala: 0 = Branco (luz), 10 = Preto (sombra) — padrãão artístico
  let isoladorState = {
    originalImageData: null,
    grayData: null,
    picked: null,
    faixaMin: 0,
    faixaMax: 10,
    modoIsolacao: false,
    opacidadeFundo: 80,
  };

  function isoGrayToValor(gray) {
    return Math.min(10, Math.round(((255 - gray) / 255) * 10));
  }

  function renderIsolador() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div style="min-height:calc(100vh - 4rem)" class="px-6 py-12 md:py-16">
        <div class="max-w-6xl mx-auto">

          <!-- Header -->
          <div class="fade-in mb-10">
            <h1 class="font-display text-4xl md:text-5xl mb-4">Isolador Tonal Dinâmico</h1>
            <p class="text-muted max-w-2xl font-light">Passe o mouse ou arraste o dedo sobre a imagem para isolar o valor tonal exato de qualquer ponto — destrua as ilusções de ótica.</p>
          </div>

          <!-- Upload zone -->
          <div id="iso-upload-zone"
            class="w-full rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 mb-8 cursor-pointer transition-all hover:border-accent/60 hover:bg-white/[0.02]"
            style="min-height:220px"
            onclick="document.getElementById('iso-file-input').click()"
            ondragover="isoHandleDragOver(event)"
            ondragleave="isoHandleDragLeave(event)"
            ondrop="isoHandleDrop(event)">
            <input type="file" id="iso-file-input" accept="image/jpeg,image/png,image/webp" class="hidden" onchange="isoHandleFileChange(event)" />
            <div id="iso-upload-placeholder" class="flex flex-col items-center gap-3 text-center p-8">
              <div class="w-14 h-14 rounded-full bg-white/[0.06] flex items-center justify-center">
                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <p class="font-display text-xl">Clique ou arraste uma imagem</p>
              <p class="text-muted text-sm">Aceita JPG, PNG e WebP. Recomendado até 10MB.</p>
            </div>
          </div>

          <!-- Result area -->
          <div id="iso-result-section" class="hidden">
            <div class="grid lg:grid-cols-3 gap-6 mb-8">
              <!-- Canvas + hover wrapper -->
              <div class="lg:col-span-2">
                <div id="iso-canvas-wrapper" class="relative rounded-xl border border-white/10 overflow-hidden cursor-crosshair" style="background:#000">
                  <p id="iso-canvas-label" class="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-[0.2em] text-accent bg-bg/80 backdrop-blur-sm px-2 py-1 rounded">Passe o mouse na imagem</p>
                  <canvas id="iso-canvas" class="block" style="max-width:100%;height:auto"></canvas>
                </div>
              </div>

              <!-- Inspector panel (sticky) -->
              <div class="space-y-4 lg:sticky lg:top-20 lg:self-start">
                <!-- Amostra de cor pura -->
                <div class="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <p class="text-xs uppercase tracking-[0.2em] text-muted mb-4">Tom Isolado</p>
                  <div id="iso-sample-box" class="w-full rounded-xl border border-white/10 flex items-center justify-center relative" style="background-color:#222;height:140px;transition:background-color 0.05s">
                    <div class="absolute w-2 h-2 rounded-full border border-white/40" style="background:rgba(0,0,0,0.2)"></div>
                  </div>
                </div>

                <!-- Dados numêricos -->
                <div class="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <p class="text-xs uppercase tracking-[0.2em] text-muted mb-4">Dados do Pixel</p>
                  <div id="iso-picked-content" class="space-y-3">
                    <p class="text-muted text-sm">Passe o mouse na imagem</p>
                  </div>
                </div>

                <!-- Escala visual com marcador -->
                <div class="p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <p class="text-xs uppercase tracking-[0.2em] text-muted mb-3">Mapeamento na Escala</p>
                  <div id="iso-scale-bar" class="relative flex rounded-lg overflow-hidden border border-white/10" style="height:24px">
                    ${escalaCinza.map(v => `<div class="flex-1" style="background-color:${v.hex}"></div>`).join('')}
                    <div id="iso-scale-marker" class="absolute top-[-2px] w-1 h-[28px] rounded-sm transition-all duration-100 ease-out" style="background:#d88800;box-shadow:0 0 8px #d88800;left:50%;display:none"></div>
                  </div>
                  <div class="mt-2 flex justify-between text-[10px] text-muted font-mono">
                    <span>0 (Branco)</span><span>5</span><span>10 (Preto)</span>
                  </div>
                </div>

                <!-- Ampliação -->
                <div class="p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <p class="text-xs uppercase tracking-[0.2em] text-muted mb-3">Ampliação (7×7)</p>
                  <div class="flex justify-center">
                    <canvas id="iso-canvas-mag" width="140" height="140" class="rounded-lg border border-white/10" style="image-rendering:pixelated"></canvas>
                  </div>
                </div>
              </div>
            </div>

            <!-- Isolation controls -->
            <div class="p-4 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] mb-6">
              <div class="grid md:grid-cols-2 gap-8">
                <div class="space-y-6">
                  <h3 class="font-display text-xl mb-4">Isolar Faixa de Valores</h3>
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" id="iso-modo-toggle" onchange="isoOnModoIsolacao()" class="accent-[#d88800] w-4 h-4" />
                    <span class="text-sm">Ativar isolamento tonal</span>
                  </label>
                  <p class="text-xs text-muted">Quando ativo, apenas os pixels dentro da faixa selecionada ficam visíveis — o resto fica dessaturado.</p>

                  <div class="space-y-3">
                    <div>
                      <div class="flex justify-between text-sm mb-2">
                        <span>Valor Mínimo (Claro)</span>
                        <span id="iso-val-min" class="text-accent font-mono">0</span>
                      </div>
                      <input type="range" id="iso-sl-min" min="0" max="10" value="0" class="w-full" oninput="isoOnFaixa()" />
                    </div>
                    <div>
                      <div class="flex justify-between text-sm mb-2">
                        <span>Valor Míximo (Escuro)</span>
                        <span id="iso-val-max" class="text-accent font-mono">10</span>
                      </div>
                      <input type="range" id="iso-sl-max" min="0" max="10" value="10" class="w-full" oninput="isoOnFaixa()" />
                    </div>
                  </div>

                  <div>
                    <p class="text-xs text-muted mb-2">Atalhos rípidos:</p>
                    <div class="flex flex-wrap gap-2">
                      <button onclick="isoSetFaixa(0,3)" class="px-3 py-1.5 rounded-lg text-xs border border-white/10 text-muted hover:border-accent/40 hover:text-accent transition-all">Claros (0—3)</button>
                      <button onclick="isoSetFaixa(4,7)" class="px-3 py-1.5 rounded-lg text-xs border border-white/10 text-muted hover:border-accent/40 hover:text-accent transition-all">Médios (4—7)</button>
                      <button onclick="isoSetFaixa(8,10)" class="px-3 py-1.5 rounded-lg text-xs border border-white/10 text-muted hover:border-accent/40 hover:text-accent transition-all">Escuros (8—10)</button>
                      <button onclick="isoSetFaixa(0,10)" class="px-3 py-1.5 rounded-lg text-xs border border-white/10 text-muted hover:border-accent/40 hover:text-accent transition-all">Todos</button>
                    </div>
                  </div>

                  <div>
                    <div class="flex justify-between text-sm mb-2">
                      <span>Opacidade do Fundo</span>
                      <span id="iso-val-opacidade" class="text-accent font-mono">80%</span>
                    </div>
                    <input type="range" id="iso-sl-opacidade" min="0" max="100" value="80" class="w-full" oninput="isoOnOpacidade()" />
                    <p class="text-xs text-muted mt-1">Quanto do fundo dessaturado permanece visível.</p>
                  </div>
                </div>

                <div class="space-y-6">
                  <h3 class="font-display text-xl mb-4">Distribuição de Valores</h3>
                  <div id="iso-histograma" class="space-y-2"></div>
                  <p class="text-xs text-muted">Quantos pixels da imagem pertencem a cada faixa tonal.</p>
                </div>
              </div>
            </div>

            <!-- Botções -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button onclick="isoLimparIsolamento()" class="px-6 py-3 rounded-full border border-white/10 text-sm hover:border-accent/40 transition-colors">
                Limpar Isolamento
              </button>
              <button onclick="isoBaixarImagem()"
                class="flex-1 px-8 py-4 rounded-full text-sm font-medium transition-colors"
                style="background:#d88800;color:hsl(0 0% 4%)"
                onmouseenter="this.style.background='#c07800'"
                onmouseleave="this.style.background='#d88800'">
                Baixar Resultado (PNG)
              </button>
              <button onclick="document.getElementById('iso-file-input').click()" class="px-6 py-3 rounded-full border border-white/10 text-sm hover:border-accent/40 transition-colors">
                Trocar Imagem
              </button>
            </div>
          </div>

        </div>
      </div>`;
  }

  // ── Isolador: handlers ────────────────────────────────────────────────
  function isoHandleDragOver(e) { e.preventDefault(); document.getElementById('iso-upload-zone').classList.add('drag-over'); }
  function isoHandleDragLeave(e) { document.getElementById('iso-upload-zone').classList.remove('drag-over'); }
  function isoHandleDrop(e) {
    e.preventDefault();
    document.getElementById('iso-upload-zone').classList.remove('drag-over');
    if (e.dataTransfer.files[0]) isoProcessFile(e.dataTransfer.files[0]);
  }
  function isoHandleFileChange(e) { if (e.target.files[0]) isoProcessFile(e.target.files[0]); }

  function isoProcessFile(file) {
    if (!file.type.match(/image\/(jpeg|png|webp)/)) { alert('Formato não suportado. Use JPG, PNG ou WebP.'); return; }
    if (file.size > 12 * 1024 * 1024) { alert('Imagem muito grande. Use arquivos de até 10MB.'); return; }
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('iso-canvas');
        const maxW = 900, maxH = 700;
        let w = img.width, h = img.height;
        if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
        if (h > maxH) { w = Math.round(w * maxH / h); h = maxH; }
        c.width = w; c.height = h;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const imgData = ctx.getImageData(0, 0, w, h);
        isoladorState.originalImageData = imgData;

        // Pre-calc grayscale
        const gray = new Float32Array(w * h);
        for (let i = 0; i < imgData.data.length; i += 4) {
          gray[i / 4] = 0.299 * imgData.data[i] + 0.587 * imgData.data[i+1] + 0.114 * imgData.data[i+2];
        }
        isoladorState.grayData = gray;
        isoladorState.picked = null;

        document.getElementById('iso-result-section').classList.remove('hidden');
        document.getElementById('iso-upload-placeholder').innerHTML =
          `<p class="text-muted text-sm">Imagem carregada: <span class="text-fg">${file.name}</span></p>`;

        isoRenderHistograma();
        isoRenderOriginal();

        // ── Eventos de interação (mouse + touch) ──
        // Remove listeners anteriores via AbortController
        if (c._isoAbort) c._isoAbort.abort();
        c._isoAbort = new AbortController();
        const signal = c._isoAbort.signal;

        function isoGetCoords(e) {
          const rect = c.getBoundingClientRect();
          const clientX = e.touches ? e.touches[0].clientX : e.clientX;
          const clientY = e.touches ? e.touches[0].clientY : e.clientY;
          return {
            x: Math.min(c.width - 1, Math.max(0, Math.floor(((clientX - rect.left) / rect.width) * c.width))),
            y: Math.min(c.height - 1, Math.max(0, Math.floor(((clientY - rect.top) / rect.height) * c.height)))
          };
        }

        function isoInteragir(e) {
          if (!c.width) return;
          e.preventDefault();
          const { x, y } = isoGetCoords(e);
          isoPickPixel(x, y);
        }

        c.addEventListener('mousemove', isoInteragir, { signal });
        c.addEventListener('touchmove', isoInteragir, { passive: false, signal });
        c.addEventListener('touchstart', isoInteragir, { passive: false, signal });

        // Inicializa apontando para o centro
        isoPickPixel(Math.round(w / 2), Math.round(h / 2));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function isoPickPixel(cx, cy) {
    const c = document.getElementById('iso-canvas');
    const W = c.width, H = c.height;
    if (cx < 0 || cx >= W || cy < 0 || cy >= H) return;
    const idx = cy * W + cx;
    const gray = isoladorState.grayData[idx];
    const valor = isoGrayToValor(gray);
    const src = isoladorState.originalImageData.data;
    const pi = idx * 4;
    const r = src[pi], g = src[pi+1], b = src[pi+2];
    const hex = '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('').toUpperCase();
    const escala = escalaCinza[valor];
    const pctLuz = Math.round((gray / 255) * 100);

    isoladorState.picked = { cx, cy, valor, r, g, b, hex, gray, nome: escala.nome };

    // Amostra de cor
    const sampleBox = document.getElementById('iso-sample-box');
    if (sampleBox) sampleBox.style.backgroundColor = hex;

    // Dados numêricos
    const panel = document.getElementById('iso-picked-content');
    if (panel) {
      panel.innerHTML = `
        <div class="flex items-center gap-4">
          <div>
            <p class="font-display text-4xl leading-none">Valor ${valor}</p>
            <p class="text-sm text-muted mt-1">${escala.nome}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div class="p-3 rounded-lg border border-white/10 bg-white/[0.02]">
            <p class="text-[10px] uppercase tracking-wider text-muted">Luz</p>
            <p class="font-mono text-fg">${pctLuz}%</p>
          </div>
          <div class="p-3 rounded-lg border border-white/10 bg-white/[0.02]">
            <p class="text-[10px] uppercase tracking-wider text-muted">Hex</p>
            <p class="font-mono text-fg">${hex}</p>
          </div>
          <div class="p-3 rounded-lg border border-white/10 bg-white/[0.02]">
            <p class="text-[10px] uppercase tracking-wider text-muted">RGB</p>
            <p class="font-mono text-fg">${r}, ${g}, ${b}</p>
          </div>
          <div class="p-3 rounded-lg border border-white/10 bg-white/[0.02]">
            <p class="text-[10px] uppercase tracking-wider text-muted">Faixa</p>
            <p class="font-mono text-fg">${valor <= 3 ? 'Claro' : valor <= 7 ? 'Médio' : 'Escuro'}</p>
          </div>
        </div>
        <div class="p-3 rounded-lg border border-accent/20 bg-accent/[0.04]">
          <p class="text-xs text-accent">Mistura: <span class="font-medium">${escala.branco} partes branco ┬À ${escala.preto} partes preto</span></p>
        </div>`;
    }

    // Marcador animado na escala (0=branco â esquerda, 10=preto â direita)
    const marker = document.getElementById('iso-scale-marker');
    if (marker) {
      marker.style.display = 'block';
      const posEscala = 100 - pctLuz;
      marker.style.left = `calc(${posEscala}% - 2px)`;
    }

    // Ampliação
    isoRenderMagnifier(cx, cy);
  }

  function isoRenderMagnifier(cx, cy) {
    const srcCanvas = document.getElementById('iso-canvas');
    const magCanvas = document.getElementById('iso-canvas-mag');
    if (!srcCanvas || !magCanvas) return;
    const ctxMag = magCanvas.getContext('2d');
    const W = srcCanvas.width, H = srcCanvas.height;
    const radius = 3;
    const size = radius * 2 + 1;

    magCanvas.width = size * 20;
    magCanvas.height = size * 20;
    ctxMag.imageSmoothingEnabled = false;

    const x0 = Math.max(0, cx - radius);
    const y0 = Math.max(0, cy - radius);
    const x1 = Math.min(W - 1, cx + radius);
    const y1 = Math.min(H - 1, cy + radius);

    ctxMag.clearRect(0, 0, magCanvas.width, magCanvas.height);
    ctxMag.drawImage(srcCanvas, x0, y0, x1 - x0 + 1, y1 - y0 + 1, 0, 0, magCanvas.width, magCanvas.height);

    // Grid
    ctxMag.strokeStyle = 'rgba(255,255,255,0.15)';
    ctxMag.lineWidth = 0.5;
    for (let i = 0; i <= size; i++) {
      ctxMag.beginPath(); ctxMag.moveTo(i * 20, 0); ctxMag.lineTo(i * 20, size * 20); ctxMag.stroke();
      ctxMag.beginPath(); ctxMag.moveTo(0, i * 20); ctxMag.lineTo(size * 20, i * 20); ctxMag.stroke();
    }

    // Centro
    const cxIdx = cx - x0, cyIdx = cy - y0;
    ctxMag.strokeStyle = '#d88800';
    ctxMag.lineWidth = 2;
    ctxMag.strokeRect(cxIdx * 20, cyIdx * 20, 20, 20);
  }

  function isoRenderOriginal() {
    const c = document.getElementById('iso-canvas');
    const ctx = c.getContext('2d');
    ctx.putImageData(isoladorState.originalImageData, 0, 0);
  }

  function isoOnFaixa() {
    isoladorState.faixaMin = Number(document.getElementById('iso-sl-min').value);
    isoladorState.faixaMax = Number(document.getElementById('iso-sl-max').value);
    if (isoladorState.faixaMin > isoladorState.faixaMax) {
      const tmp = isoladorState.faixaMin;
      isoladorState.faixaMin = isoladorState.faixaMax;
      isoladorState.faixaMax = tmp;
    }
    document.getElementById('iso-val-min').textContent = isoladorState.faixaMin;
    document.getElementById('iso-val-max').textContent = isoladorState.faixaMax;
    isoAplicarIsolamento();
  }

  function isoSetFaixa(min, max) {
    isoladorState.faixaMin = min;
    isoladorState.faixaMax = max;
    document.getElementById('iso-sl-min').value = min;
    document.getElementById('iso-sl-max').value = max;
    document.getElementById('iso-val-min').textContent = min;
    document.getElementById('iso-val-max').textContent = max;
    isoAplicarIsolamento();
  }

  function isoOnModoIsolacao() {
    isoladorState.modoIsolacao = document.getElementById('iso-modo-toggle').checked;
    isoAplicarIsolamento();
  }

  function isoOnOpacidade() {
    isoladorState.opacidadeFundo = Number(document.getElementById('iso-sl-opacidade').value);
    document.getElementById('iso-val-opacidade').textContent = isoladorState.opacidadeFundo + '%';
    isoAplicarIsolamento();
  }

  function isoAplicarIsolamento() {
    if (!isoladorState.originalImageData || !isoladorState.modoIsolacao) {
      isoRenderOriginal();
      if (isoladorState.picked) isoPickPixel(isoladorState.picked.cx, isoladorState.picked.cy);
      return;
    }
    const c = document.getElementById('iso-canvas');
    const ctx = c.getContext('2d');
    const W = c.width, H = c.height;
    const src = isoladorState.originalImageData.data;
    const gray = isoladorState.grayData;
    const out = ctx.createImageData(W, H);
    const d = out.data;
    const { faixaMin, faixaMax, opacidadeFundo } = isoladorState;
    const bgOpacity = opacidadeFundo / 100;

    for (let i = 0; i < gray.length; i++) {
      const valor = isoGrayToValor(gray[i]);
      const pi = i * 4;
      if (valor >= faixaMin && valor <= faixaMax) {
        d[pi] = src[pi]; d[pi+1] = src[pi+1]; d[pi+2] = src[pi+2]; d[pi+3] = 255;
      } else {
        const avg = Math.round(gray[i]);
        d[pi] = Math.round(avg + (src[pi] - avg) * (1 - bgOpacity));
        d[pi+1] = Math.round(avg + (src[pi+1] - avg) * (1 - bgOpacity));
        d[pi+2] = Math.round(avg + (src[pi+2] - avg) * (1 - bgOpacity));
        d[pi+3] = 255;
      }
    }
    ctx.putImageData(out, 0, 0);
  }

  function isoLimparIsolamento() {
    isoladorState.modoIsolacao = false;
    isoladorState.faixaMin = 0;
    isoladorState.faixaMax = 10;
    const tog = document.getElementById('iso-modo-toggle');
    const slMin = document.getElementById('iso-sl-min');
    const slMax = document.getElementById('iso-sl-max');
    const vlMin = document.getElementById('iso-val-min');
    const vlMax = document.getElementById('iso-val-max');
    if (tog) tog.checked = false;
    if (slMin) slMin.value = 0;
    if (slMax) slMax.value = 10;
    if (vlMin) vlMin.textContent = '0';
    if (vlMax) vlMax.textContent = '10';
    isoRenderOriginal();
    if (isoladorState.picked) isoPickPixel(isoladorState.picked.cx, isoladorState.picked.cy);
  }

  function isoRenderHistograma() {
    if (!isoladorState.grayData) return;
    const gray = isoladorState.grayData;
    const contagem = Array(11).fill(0);
    for (let i = 0; i < gray.length; i++) {
      const v = isoGrayToValor(gray[i]);
      contagem[v]++;
    }
    const maxCount = Math.max(...contagem);
    const el = document.getElementById('iso-histograma');
    el.innerHTML = escalaCinza.map((v, i) => {
      const pct = maxCount > 0 ? (contagem[i] / maxCount) * 100 : 0;
      return `
        <div class="flex items-center gap-3">
          <span class="w-4 text-right font-mono text-xs text-muted">${i}</span>
          <div class="flex-1 h-5 rounded overflow-hidden bg-white/5 relative" style="cursor:pointer" onclick="isoSetFaixa(${i},${i})">
            <div class="h-full rounded transition-all duration-300" style="width:${pct}%;background:${v.hex};box-shadow:inset 0 0 0 1px rgba(255,255,255,0.1)"></div>
          </div>
          <span class="w-10 text-right font-mono text-xs text-muted">${contagem[i]}</span>
        </div>`;
    }).join('');
  }

  function isoBaixarImagem() {
    const canvas = document.getElementById('iso-canvas');
    if (!canvas) return;
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a   = document.createElement('a');
      a.href = url; a.download = 'isolador-tonal.png';
      document.body.appendChild(a); a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  }

  // ── Simulador de Janela Física ───────────────────────────────────────
  let janelaState = {
    originalImageData: null,
    imgW: 0, imgH: 0,
    janelaX: 0, janelaY: 0,
    tamanho: 120,
    arrastando: false,
  };

  function renderJanela() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div style="min-height:calc(100vh - 4rem)" class="px-6 py-12 md:py-16">
        <div class="max-w-6xl mx-auto">

          <!-- Header -->
          <div class="fade-in mb-10">
            <h1 class="font-display text-4xl md:text-5xl mb-4">Simulador de Janela Física</h1>
            <p class="text-muted max-w-2xl font-light">Isole detalhes bloqueando o contexto ao redor. Arraste o bloco vazado sobre a foto para estudar valores, texturas e micro-anatomias sem sofrer interferãncia das luzes ao redor.</p>
          </div>

          <!-- Upload zone -->
          <div id="jn-upload-zone"
            class="w-full rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 mb-8 cursor-pointer transition-all hover:border-accent/60 hover:bg-white/[0.02]"
            style="min-height:220px"
            onclick="document.getElementById('jn-file-input').click()"
            ondragover="jnHandleDragOver(event)"
            ondragleave="jnHandleDragLeave(event)"
            ondrop="jnHandleDrop(event)">
            <input type="file" id="jn-file-input" accept="image/jpeg,image/png,image/webp" class="hidden" onchange="jnHandleFileChange(event)" />
            <div id="jn-upload-placeholder" class="flex flex-col items-center gap-3 text-center p-8">
              <div class="w-14 h-14 rounded-full bg-white/[0.06] flex items-center justify-center">
                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/><path d="M21 15l-5-5L5 21"/></svg>
              </div>
              <p class="font-display text-xl">Clique ou arraste uma imagem</p>
              <p class="text-muted text-sm">Aceita JPG, PNG e WebP. Recomendado até 10MB.</p>
            </div>
          </div>

          <!-- Result area -->
          <div id="jn-result-section" class="hidden">

            <!-- Controles -->
            <div class="flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-2xl border border-white/10 bg-white/[0.02] mb-6">
              <div class="flex-1">
                <div class="flex justify-between text-sm mb-2">
                  <span>Tamanho da Abertura</span>
                  <span id="jn-val-tamanho" class="text-accent font-mono">120</span>
                </div>
                <input type="range" id="jn-sl-tamanho" min="30" max="400" value="120" class="w-full" oninput="jnOnTamanho(this.value)" />
              </div>
              <div class="text-xs text-muted hidden md:block">Arraste a janela na imagem</div>
            </div>

            <!-- Canvas -->
            <div id="jn-canvas-wrapper"
              class="relative rounded-2xl border border-white/10 overflow-hidden cursor-move"
              style="background:#000;box-shadow:0 20px 40px rgba(0,0,0,0.5)">
              <canvas id="jn-canvas" class="block" style="max-width:100%;height:auto"></canvas>
            </div>

            <!-- Botções -->
            <div class="flex flex-col sm:flex-row gap-4 mt-6">
              <button onclick="jnResetar()" class="px-6 py-3 rounded-full border border-white/10 text-sm hover:border-accent/40 transition-colors">
                Centralizar Janela
              </button>
              <button onclick="jnBaixarImagem()"
                class="flex-1 px-8 py-4 rounded-full text-sm font-medium transition-colors"
                style="background:#d88800;color:hsl(0 0% 4%)"
                onmouseenter="this.style.background='#c07800'"
                onmouseleave="this.style.background='#d88800'">
                Baixar Resultado (PNG)
              </button>
              <button onclick="document.getElementById('jn-file-input').click()" class="px-6 py-3 rounded-full border border-white/10 text-sm hover:border-accent/40 transition-colors">
                Trocar Imagem
              </button>
            </div>
          </div>

        </div>
      </div>`;
  }

  // ── Janela: handlers ──────────────────────────────────────────────────
  function jnHandleDragOver(e) { e.preventDefault(); document.getElementById('jn-upload-zone').classList.add('drag-over'); }
  function jnHandleDragLeave(e) { document.getElementById('jn-upload-zone').classList.remove('drag-over'); }
  function jnHandleDrop(e) {
    e.preventDefault();
    document.getElementById('jn-upload-zone').classList.remove('drag-over');
    if (e.dataTransfer.files[0]) jnProcessFile(e.dataTransfer.files[0]);
  }
  function jnHandleFileChange(e) { if (e.target.files[0]) jnProcessFile(e.target.files[0]); }

  function jnProcessFile(file) {
    if (!file.type.match(/image\/(jpeg|png|webp)/)) { alert('Formato não suportado. Use JPG, PNG ou WebP.'); return; }
    if (file.size > 12 * 1024 * 1024) { alert('Imagem muito grande. Use arquivos de até 10MB.'); return; }
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('jn-canvas');
        const maxW = 900, maxH = 700;
        let w = img.width, h = img.height;
        if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
        if (h > maxH) { w = Math.round(w * maxH / h); h = maxH; }
        c.width = w; c.height = h;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        janelaState.originalImageData = ctx.getImageData(0, 0, w, h);
        janelaState.imgW = w;
        janelaState.imgH = h;
        janelaState.janelaX = Math.round(w / 2);
        janelaState.janelaY = Math.round(h / 2);

        document.getElementById('jn-result-section').classList.remove('hidden');
        document.getElementById('jn-upload-placeholder').innerHTML =
          `<p class="text-muted text-sm">Imagem carregada: <span class="text-fg">${file.name}</span></p>`;

        jnDesenharMascara();

        // ── Eventos de arrasto ──
        const wrapper = document.getElementById('jn-canvas-wrapper');
        if (wrapper._jnAbort) wrapper._jnAbort.abort();
        wrapper._jnAbort = new AbortController();
        const signal = wrapper._jnAbort.signal;

        function jnGetCoords(e) {
          const rect = c.getBoundingClientRect();
          const clientX = e.touches ? e.touches[0].clientX : e.clientX;
          const clientY = e.touches ? e.touches[0].clientY : e.clientY;
          return {
            x: Math.min(c.width, Math.max(0, ((clientX - rect.left) / rect.width) * c.width)),
            y: Math.min(c.height, Math.max(0, ((clientY - rect.top) / rect.height) * c.height))
          };
        }

        function jnIniciarArrasto(e) {
          janelaState.arrastando = true;
          jnMoverJanela(e);
        }

        function jnFinalizarArrasto() {
          janelaState.arrastando = false;
        }

        function jnMoverJanela(e) {
          if (!janelaState.arrastando) return;
          e.preventDefault();
          const { x, y } = jnGetCoords(e);
          janelaState.janelaX = x;
          janelaState.janelaY = y;
          jnDesenharMascara();
        }

        wrapper.addEventListener('mousedown', jnIniciarArrasto, { signal });
        wrapper.addEventListener('mousemove', jnMoverJanela, { signal });
        window.addEventListener('mouseup', jnFinalizarArrasto);
        wrapper.addEventListener('touchstart', jnIniciarArrasto, { passive: false, signal });
        wrapper.addEventListener('touchmove', jnMoverJanela, { passive: false, signal });
        window.addEventListener('touchend', jnFinalizarArrasto);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function jnOnTamanho(val) {
    janelaState.tamanho = Number(val);
    document.getElementById('jn-val-tamanho').textContent = val;
    jnDesenharMascara();
  }

  function jnDesenharMascara() {
    const c = document.getElementById('jn-canvas');
    if (!c || !janelaState.originalImageData) return;
    const ctx = c.getContext('2d');
    const W = janelaState.imgW, H = janelaState.imgH;
    const { janelaX, janelaY, tamanho } = janelaState;
    const metade = tamanho / 2;

    // Restaura a imagem original
    ctx.putImageData(janelaState.originalImageData, 0, 0);

    // Míscara escura ao redor (96% opaco)
    ctx.fillStyle = 'rgba(10, 10, 10, 0.96)';
    // Bloco superior
    ctx.fillRect(0, 0, W, janelaY - metade);
    // Bloco inferior
    ctx.fillRect(0, janelaY + metade, W, H - (janelaY + metade));
    // Bloco lateral esquerdo (na faixa da janela)
    ctx.fillRect(0, janelaY - metade, janelaX - metade, tamanho);
    // Bloco lateral direito (na faixa da janela)
    ctx.fillRect(janelaX + metade, janelaY - metade, W - (janelaX + metade), tamanho);

    // Borda sutil laranja na abertura
    ctx.strokeStyle = 'rgba(216, 136, 0, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(janelaX - metade, janelaY - metade, tamanho, tamanho);
  }

  function jnResetar() {
    janelaState.janelaX = Math.round(janelaState.imgW / 2);
    janelaState.janelaY = Math.round(janelaState.imgH / 2);
    jnDesenharMascara();
  }

  function jnBaixarImagem() {
    const canvas = document.getElementById('jn-canvas');
    if (!canvas) return;
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a   = document.createElement('a');
      a.href = url; a.download = 'janela-fisica.png';
      document.body.appendChild(a); a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  }

  // ── Quadricular Imagem ────────────────────────────────────────────────
  let quadricularState = {
    originalImageData: null,
    cols: 5,
    rows: 5,
    corGrid: '#ffffff',
    espessura: 1,
    refW: 8,
    refH: 12,
    telaW: 50,
    telaH: 70,
    grayscale: false,
  };

  function renderQuadricular() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div style="min-height:calc(100vh - 4rem)" class="px-6 py-12 md:py-16">
        <div class="max-w-6xl mx-auto">

          <!-- Header -->
          <div class="fade-in mb-10">
            <h1 class="font-display text-4xl md:text-5xl mb-4">Quadricular Imagem</h1>
            <p class="text-muted max-w-2xl font-light">Sobreponha uma grade na referência para copiar a imagem quadrado por quadrado — a técnica clássica para quem quer desenhar com precisão sem precisar saber desenhar.</p>
          </div>

          <!-- Upload zone -->
          <div id="qd-upload-zone"
            class="w-full rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 mb-8 cursor-pointer transition-all hover:border-accent/60 hover:bg-white/[0.02]"
            style="min-height:220px"
            onclick="document.getElementById('qd-file-input').click()"
            ondragover="qdHandleDragOver(event)"
            ondragleave="qdHandleDragLeave(event)"
            ondrop="qdHandleDrop(event)">
            <input type="file" id="qd-file-input" accept="image/jpeg,image/png,image/webp" class="hidden" onchange="qdHandleFileChange(event)" />
            <div id="qd-upload-placeholder" class="flex flex-col items-center gap-3 text-center p-8">
              <div class="w-14 h-14 rounded-full bg-white/[0.06] flex items-center justify-center">
                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <p class="font-display text-xl">Clique ou arraste uma imagem</p>
              <p class="text-muted text-sm">Aceita JPG, PNG e WebP. Recomendado até 10MB.</p>
            </div>
          </div>

          <!-- Canvases -->
          <div id="qd-canvas-section" class="hidden mb-8">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-muted mb-3">Original</p>
                <canvas id="qd-canvas-original" class="w-full rounded-xl border border-white/10" style="max-height:400px;object-fit:contain"></canvas>
              </div>
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-accent mb-3">Quadriculada</p>
                <canvas id="qd-canvas-resultado" class="w-full rounded-xl border border-white/10" style="max-height:400px;object-fit:contain"></canvas>
              </div>
            </div>
          </div>

          <!-- Controls -->
          <div id="qd-controls-section" class="hidden p-4 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] mb-6">
            <div class="grid md:grid-cols-2 gap-8">
              <div class="space-y-6">
                <h3 class="font-display text-xl mb-4">Tamanho da Grade</h3>
                <div>
                  <div class="flex justify-between text-sm mb-2">
                    <span>Colunas</span>
                    <span id="qd-val-cols" class="text-accent font-mono">5</span>
                  </div>
                  <input type="range" id="qd-sl-cols" min="2" max="20" value="5" class="w-full" oninput="qdOnCols(this.value)" />
                </div>
                <div>
                  <div class="flex justify-between text-sm mb-2">
                    <span>Linhas</span>
                    <span id="qd-val-rows" class="text-accent font-mono">5</span>
                  </div>
                  <input type="range" id="qd-sl-rows" min="2" max="20" value="5" class="w-full" oninput="qdOnRows(this.value)" />
                </div>

                <h3 class="font-display text-xl mt-6 mb-4">Aparência</h3>
                <div>
                  <p class="text-sm mb-2">Cor da grade</p>
                  <div class="flex gap-3" id="qd-cores">
                    <button onclick="qdSetCor('#ffffff')" data-cor="#ffffff" class="w-9 h-9 rounded-lg border-2 border-accent bg-white transition-all"></button>
                    <button onclick="qdSetCor('#000000')" data-cor="#000000" class="w-9 h-9 rounded-lg border-2 border-white/10 bg-black transition-all"></button>
                    <button onclick="qdSetCor('#d88800')" data-cor="#d88800" class="w-9 h-9 rounded-lg border-2 border-white/10 transition-all" style="background:#d88800"></button>
                    <button onclick="qdSetCor('#ff0000')" data-cor="#ff0000" class="w-9 h-9 rounded-lg border-2 border-white/10 bg-red-600 transition-all"></button>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-sm mb-2">
                    <span>Espessura</span>
                    <span id="qd-val-esp" class="text-accent font-mono">1px</span>
                  </div>
                  <input type="range" id="qd-sl-esp" min="1" max="5" value="1" class="w-full" oninput="qdOnEsp(this.value)" />
                </div>
                <label class="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" id="qd-grayscale-toggle" onchange="qdOnGrayscale()" class="accent-[#d88800] w-4 h-4" />
                  <span class="text-sm">Escala de cinzas (P&B)</span>
                </label>
              </div>

              <div class="space-y-6">
                <h3 class="font-display text-xl mb-4">Dica de Uso</h3>
                <div class="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <p class="text-sm text-muted leading-relaxed">
                    Crie uma grade <span class="text-fg font-medium">idêntica</span> na sua tela ou papel. Cada célula é um pedaço pequeno para desenhar separadamente. Comece com <span class="text-accent font-medium">5×5</span> e aumente para mais detalhe.
                  </p>
                  <p class="text-sm text-muted leading-relaxed mt-3">
                    <span class="text-accent font-medium">Proporção:</span> Se a referência tem 20cm de largura e a grade tem 5 colunas, cada célula tem 4cm. Mantenha a mesma proporção no papel.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Painel de Cálculo de Proporção -->
          <div id="qd-calc-section" class="hidden p-4 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] mb-6">
            <h3 class="font-display text-xl mb-6">Cálculo de Proporção</h3>
            <div class="grid md:grid-cols-3 gap-6">
              <!-- Referência -->
              <div class="space-y-4">
                <p class="text-xs uppercase tracking-[0.2em] text-accent mb-2">Referência (foto)</p>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="text-xs text-muted block mb-1">Largura (cm)</label>
                    <input type="number" id="qd-ref-w" value="8" min="1" step="0.5" class="w-full p-2.5 rounded-lg bg-white/5 border border-white/10 text-fg text-sm focus:border-accent outline-none" oninput="qdCalcUpdate()" />
                  </div>
                  <div>
                    <label class="text-xs text-muted block mb-1">Altura (cm)</label>
                    <input type="number" id="qd-ref-h" value="12" min="1" step="0.5" class="w-full p-2.5 rounded-lg bg-white/5 border border-white/10 text-fg text-sm focus:border-accent outline-none" oninput="qdCalcUpdate()" />
                  </div>
                </div>
                <p class="text-xs text-muted">Proporção: <span id="qd-calc-ref-ratio" class="text-fg font-mono">2:3</span></p>
              </div>

              <!-- Tela/Papel -->
              <div class="space-y-4">
                <p class="text-xs uppercase tracking-[0.2em] text-accent mb-2">Tela / Papel</p>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="text-xs text-muted block mb-1">Largura (cm)</label>
                    <input type="number" id="qd-tela-w" value="50" min="1" step="1" class="w-full p-2.5 rounded-lg bg-white/5 border border-white/10 text-fg text-sm focus:border-accent outline-none" oninput="qdCalcUpdate()" />
                  </div>
                  <div>
                    <label class="text-xs text-muted block mb-1">Altura (cm)</label>
                    <input type="number" id="qd-tela-h" value="70" min="1" step="1" class="w-full p-2.5 rounded-lg bg-white/5 border border-white/10 text-fg text-sm focus:border-accent outline-none" oninput="qdCalcUpdate()" />
                  </div>
                </div>
                <p class="text-xs text-muted">Proporção: <span id="qd-calc-tela-ratio" class="text-fg font-mono">5:7</span></p>
                <div class="flex flex-wrap gap-1.5 mt-2">
                  <button onclick="qdSetPreset(30,40)" class="px-2 py-1 text-[10px] rounded-md border border-white/10 text-muted hover:border-accent/40 hover:text-fg transition-colors">30×40</button>
                  <button onclick="qdSetPreset(40,50)" class="px-2 py-1 text-[10px] rounded-md border border-white/10 text-muted hover:border-accent/40 hover:text-fg transition-colors">40×50</button>
                  <button onclick="qdSetPreset(50,70)" class="px-2 py-1 text-[10px] rounded-md border border-white/10 text-muted hover:border-accent/40 hover:text-fg transition-colors">50×70</button>
                  <button onclick="qdSetPreset(60,80)" class="px-2 py-1 text-[10px] rounded-md border border-white/10 text-muted hover:border-accent/40 hover:text-fg transition-colors">60×80</button>
                  <button onclick="qdSetPreset(80,100)" class="px-2 py-1 text-[10px] rounded-md border border-white/10 text-muted hover:border-accent/40 hover:text-fg transition-colors">80×100</button>
                  <button onclick="qdSetPreset(100,120)" class="px-2 py-1 text-[10px] rounded-md border border-white/10 text-muted hover:border-accent/40 hover:text-fg transition-colors">100×120</button>
                </div>
              </div>

              <!-- Resultado -->
              <div class="space-y-3">
                <p class="text-xs uppercase tracking-[0.2em] text-accent mb-2">Resultado</p>
                <div class="p-4 rounded-xl border border-white/10 bg-white/[0.03] space-y-3">
                  <div class="flex justify-between text-sm">
                    <span class="text-muted">Fator de escala</span>
                    <span id="qd-calc-escala" class="text-accent font-mono font-medium">×4.17</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-muted">Área na tela</span>
                    <span id="qd-calc-area" class="text-fg font-mono">33.3 × 50 cm</span>
                  </div>
                  <div class="border-t border-white/10 pt-3 mt-3">
                    <p class="text-xs text-muted mb-2">Tamanho de cada célula</p>
                    <div class="flex justify-between text-sm">
                      <span class="text-muted">Na referência</span>
                      <span id="qd-calc-cell-ref" class="text-fg font-mono">1.6 × 2.4 cm</span>
                    </div>
                    <div class="flex justify-between text-sm mt-1">
                      <span class="text-muted">Na tela</span>
                      <span id="qd-calc-cell-tela" class="text-accent font-mono font-medium">6.67 × 10 cm</span>
                    </div>
                  </div>
                  <div class="border-t border-white/10 pt-3 mt-3">
                    <p class="text-xs text-muted mb-2">Grade automática</p>
                    <div class="flex justify-between text-sm">
                      <span class="text-muted">Quad. na ref.</span>
                      <span id="qd-calc-quad-ref" class="text-fg font-mono">2 × 2 cm</span>
                    </div>
                    <div class="flex justify-between text-sm mt-1">
                      <span class="text-muted">Quad. na tela</span>
                      <span id="qd-calc-quad-tela" class="text-accent font-mono font-medium">8.33 × 8.33 cm</span>
                    </div>
                    <div class="flex justify-between text-sm mt-1">
                      <span class="text-muted">Total</span>
                      <span id="qd-calc-qtd" class="text-fg font-mono">6 × 6 (36 total)</span>
                    </div>
                  </div>
                </div>
                <p id="qd-calc-alert" class="hidden text-xs text-yellow-500/90 mt-2 leading-relaxed"></p>
              </div>
            </div>
          </div>

          <!-- Botões -->
          <div id="qd-actions" class="hidden flex flex-col sm:flex-row gap-4 flex-wrap">
            <button onclick="qdResetar()" class="px-6 py-3 rounded-full border border-white/10 text-sm hover:border-accent/40 transition-colors">
              Redefinir Grade
            </button>
            <button id="qd-btn-download" onclick="qdBaixarImagem()"
              class="flex-1 px-8 py-4 rounded-full text-sm font-medium transition-colors"
              style="background:#d88800;color:hsl(0 0% 4%)"
              onmouseenter="this.style.background='#c07800'"
              onmouseleave="this.style.background='#d88800'">
              Baixar Quadriculada (PNG)
            </button>
            <button onclick="qdGerarReferenciaAmpliada()" class="px-6 py-3 rounded-full border border-white/10 text-sm hover:border-accent/40 transition-colors">
              <i class="fa-solid fa-print mr-2"></i>Referência Ampliada
            </button>
            <button onclick="qdGerarGradeBranca()" class="px-6 py-3 rounded-full border border-white/10 text-sm hover:border-accent/40 transition-colors">
              <i class="fa-solid fa-table mr-2"></i>Grade em Branco
            </button>
            <button onclick="document.getElementById('qd-file-input').click()" class="px-6 py-3 rounded-full border border-white/10 text-sm hover:border-accent/40 transition-colors">
              Trocar Imagem
            </button>
          </div>

        </div>
      </div>`;
  }

  function qdOnCols(v) {
    quadricularState.cols = Number(v);
    document.getElementById('qd-val-cols').textContent = v;
    qdCalcUpdate();
    qdAplicarGrade();
  }
  function qdOnRows(v) {
    quadricularState.rows = Number(v);
    document.getElementById('qd-val-rows').textContent = v;
    qdCalcUpdate();
    qdAplicarGrade();
  }
  function qdSetCor(c) {
    quadricularState.corGrid = c;
    document.querySelectorAll('#qd-cores button').forEach(b => {
      b.classList.toggle('border-accent', b.dataset.cor === c);
      b.classList.toggle('border-white/10', b.dataset.cor !== c);
    });
    qdAplicarGrade();
  }
  function qdOnEsp(v) {
    quadricularState.espessura = Number(v);
    document.getElementById('qd-val-esp').textContent = v + 'px';
    qdAplicarGrade();
  }
  function qdOnGrayscale() {
    quadricularState.grayscale = document.getElementById('qd-grayscale-toggle').checked;
    qdAplicarGrade();
  }
  function qdSetPreset(w, h) {
    quadricularState.telaW = w;
    quadricularState.telaH = h;
    document.getElementById('qd-tela-w').value = w;
    document.getElementById('qd-tela-h').value = h;
    qdCalcUpdate();
  }

  function qdCalcUpdate() {
    const refW = parseFloat(document.getElementById('qd-ref-w').value) || 8;
    const refH = parseFloat(document.getElementById('qd-ref-h').value) || 12;
    const telaW = parseFloat(document.getElementById('qd-tela-w').value) || 50;
    const telaH = parseFloat(document.getElementById('qd-tela-h').value) || 70;
    const { cols, rows } = quadricularState;

    quadricularState.refW = refW;
    quadricularState.refH = refH;
    quadricularState.telaW = telaW;
    quadricularState.telaH = telaH;

    const refRatio = refW / refH;
    const telaRatio = telaW / telaH;

    let escala, areaW, areaH, ladoLimitante;
    if (refRatio > telaRatio) {
      escala = telaW / refW;
      ladoLimitante = 'largura';
      areaW = telaW;
      areaH = refH * escala;
    } else {
      escala = telaH / refH;
      ladoLimitante = 'altura';
      areaW = refW * escala;
      areaH = telaH;
    }

    const cellRefW = refW / cols;
    const cellRefH = refH / rows;
    const cellTelaW = areaW / cols;
    const cellTelaH = areaH / rows;

    const fmt = v => v % 1 === 0 ? v.toString() : v.toFixed(1);
    const fmt2 = v => v < 1 ? v.toFixed(2) : v.toFixed(1);

    document.getElementById('qd-calc-ref-ratio').textContent = simplifyRatio(refW, refH);
    document.getElementById('qd-calc-tela-ratio').textContent = simplifyRatio(telaW, telaH);
    document.getElementById('qd-calc-escala').textContent = '×' + fmt2(escala);
    document.getElementById('qd-calc-area').textContent = fmt(areaW) + ' × ' + fmt(areaH) + ' cm';
    document.getElementById('qd-calc-cell-ref').textContent = fmt2(cellRefW) + ' × ' + fmt2(cellRefH) + ' cm';
    document.getElementById('qd-calc-cell-tela').textContent = fmt2(cellTelaW) + ' × ' + fmt2(cellTelaH) + ' cm';

    const tamanhoQuadRef = Math.max(refW, refH) > 30 ? 5 : 2;
    const tamanhoQuadTela = tamanhoQuadRef * escala;
    const qtdQuadrados = Math.ceil(Math.max(refW, refH) / tamanhoQuadRef);

    document.getElementById('qd-calc-quad-ref').textContent = tamanhoQuadRef + ' × ' + tamanhoQuadRef + ' cm';
    document.getElementById('qd-calc-quad-tela').textContent = fmt2(tamanhoQuadTela) + ' × ' + fmt2(tamanhoQuadTela) + ' cm';
    document.getElementById('qd-calc-qtd').textContent = qtdQuadrados + ' × ' + qtdQuadrados + ' (' + (qtdQuadrados * qtdQuadrados) + ' total)';

    const alertEl = document.getElementById('qd-calc-alert');
    alertEl.classList.remove('hidden');
    if (ladoLimitante === 'largura') {
      alertEl.innerHTML = '⚡ Largura limitante. Desenho ocupa ' + fmt(areaH) + 'cm da altura da tela (' + fmt(telaH) + 'cm). Sobram ' + fmt(telaH - areaH) + 'cm na vertical.';
    } else {
      alertEl.innerHTML = '⚡ Altura limitante. Desenho ocupa ' + fmt(areaW) + 'cm da largura da tela (' + fmt(telaW) + 'cm). Sobram ' + fmt(telaW - areaW) + 'cm na horizontal.';
    }
  }

  function simplifyRatio(a, b) {
    const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
    const d = gcd(Math.round(a * 10), Math.round(b * 10));
    return (Math.round(a * 10) / d) + ':' + (Math.round(b * 10) / d);
  }

  function qdResetar() {
    quadricularState.cols = 5;
    quadricularState.rows = 5;
    quadricularState.corGrid = '#ffffff';
    quadricularState.espessura = 1;
    quadricularState.refW = 8;
    quadricularState.refH = 12;
    quadricularState.telaW = 50;
    quadricularState.telaH = 70;
    quadricularState.grayscale = false;
    const slC = document.getElementById('qd-sl-cols');
    const slR = document.getElementById('qd-sl-rows');
    const slE = document.getElementById('qd-sl-esp');
    if (slC) slC.value = 5;
    if (slR) slR.value = 5;
    if (slE) slE.value = 1;
    document.getElementById('qd-val-cols').textContent = '5';
    document.getElementById('qd-val-rows').textContent = '5';
    document.getElementById('qd-val-esp').textContent = '1px';
    document.getElementById('qd-grayscale-toggle').checked = false;
    const refWEl = document.getElementById('qd-ref-w');
    const refHEl = document.getElementById('qd-ref-h');
    const telaWEl = document.getElementById('qd-tela-w');
    const telaHEl = document.getElementById('qd-tela-h');
    if (refWEl) refWEl.value = 8;
    if (refHEl) refHEl.value = 12;
    if (telaWEl) telaWEl.value = 50;
    if (telaHEl) telaHEl.value = 70;
    qdSetCor('#ffffff');
    qdCalcUpdate();
    qdAplicarGrade();
  }

  // Handlers de upload
  function qdHandleDragOver(e) { e.preventDefault(); document.getElementById('qd-upload-zone').classList.add('drag-over'); }
  function qdHandleDragLeave(e) { document.getElementById('qd-upload-zone').classList.remove('drag-over'); }
  function qdHandleDrop(e) {
    e.preventDefault();
    document.getElementById('qd-upload-zone').classList.remove('drag-over');
    if (e.dataTransfer.files[0]) qdProcessFile(e.dataTransfer.files[0]);
  }
  function qdHandleFileChange(e) { if (e.target.files[0]) qdProcessFile(e.target.files[0]); }

  function qdProcessFile(file) {
    if (!file.type.match(/image\/(jpeg|png|webp)/)) { alert('Formato não suportado. Use JPG, PNG ou WebP.'); return; }
    if (file.size > 12 * 1024 * 1024) { alert('Imagem muito grande. Use arquivos de até 10MB.'); return; }
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const cOrig = document.getElementById('qd-canvas-original');
        const maxW = 800, maxH = 600;
        let w = img.width, h = img.height;
        if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
        if (h > maxH) { w = Math.round(w * maxH / h); h = maxH; }
        cOrig.width = w; cOrig.height = h;
        const ctx = cOrig.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        quadricularState.originalImageData = ctx.getImageData(0, 0, w, h);

        document.getElementById('qd-canvas-section').classList.remove('hidden');
        document.getElementById('qd-controls-section').classList.remove('hidden');
        document.getElementById('qd-calc-section').classList.remove('hidden');
        document.getElementById('qd-actions').classList.remove('hidden');
        document.getElementById('qd-upload-placeholder').innerHTML =
          `<p class="text-muted text-sm">Imagem carregada: <span class="text-fg">${file.name}</span></p>`;

        qdAplicarGrade();
        qdCalcUpdate();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function qdAplicarGrade() {
    if (!quadricularState.originalImageData) return;
    const { originalImageData, cols, rows, corGrid, espessura, grayscale } = quadricularState;
    const W = originalImageData.width, H = originalImageData.height;
    const cRes = document.getElementById('qd-canvas-resultado');
    cRes.width = W; cRes.height = H;
    const ctx = cRes.getContext('2d');

    const imgData = new ImageData(new Uint8ClampedArray(originalImageData.data), W, H);

    if (grayscale) {
      const d = imgData.data;
      for (let i = 0; i < d.length; i += 4) {
        const luma = Math.round(0.299 * d[i] + 0.587 * d[i+1] + 0.114 * d[i+2]);
        d[i] = d[i+1] = d[i+2] = luma;
      }
    }

    ctx.putImageData(imgData, 0, 0);

    const cellW = W / cols, cellH = H / rows;

    // Linhas verticais
    ctx.strokeStyle = corGrid;
    ctx.lineWidth = espessura;
    for (let c = 1; c < cols; c++) {
      ctx.beginPath();
      ctx.moveTo(Math.round(c * cellW) + 0.5, 0);
      ctx.lineTo(Math.round(c * cellW) + 0.5, H);
      ctx.stroke();
    }
    // Linhas horizontais
    for (let r = 1; r < rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, Math.round(r * cellH) + 0.5);
      ctx.lineTo(W, Math.round(r * cellH) + 0.5);
      ctx.stroke();
    }
  }

  function qdBaixarImagem() {
    const canvas = document.getElementById('qd-canvas-resultado');
    if (!canvas) return;
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a   = document.createElement('a');
      a.href = url; a.download = 'imagem-quadriculada.png';
      document.body.appendChild(a); a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  }

  function qdGerarReferenciaAmpliada() {
    if (!quadricularState.originalImageData) return;
    const { originalImageData, cols, rows, corGrid, espessura } = quadricularState;
    const W = originalImageData.width, H = originalImageData.height;

    const scale = 3;
    const outW = W * scale, outH = H * scale;
    const c = document.createElement('canvas');
    c.width = outW; c.height = outH;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(document.getElementById('qd-canvas-resultado'), 0, 0, outW, outH);

    const cellW = outW / cols, cellH = outH / rows;
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = Math.max(14, Math.min(cellW, cellH) * 0.12);
    ctx.font = `700 ${fontSize}px Inter, system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let r = 0; r < rows; r++) {
      for (let c2 = 0; c2 < cols; c2++) {
        const label = letras[c2] + (r + 1);
        const cx = (c2 + 0.5) * cellW;
        const cy = (r + 0.5) * cellH;
        const bgAlpha = corGrid === '#000000' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)';
        const textCol = corGrid === '#000000' ? '#ffffff' : '#000000';
        const padX = fontSize * label.length * 0.35 + 6;
        const padY = fontSize * 0.6 + 4;
        ctx.fillStyle = bgAlpha;
        ctx.beginPath();
        ctx.roundRect(cx - padX, cy - padY, padX * 2, padY * 2, 4);
        ctx.fill();
        ctx.fillStyle = textCol;
        ctx.fillText(label, cx, cy);
      }
    }

    c.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'referencia-ampliada.png';
      document.body.appendChild(a); a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  }

  function qdGerarGradeBranca() {
    const { telaW, telaH, refW, refH, cols, rows, corGrid, espessura } = quadricularState;

    const refRatio = refW / refH;
    const telaRatio = telaW / telaH;
    let areaW, areaH;
    if (refRatio > telaRatio) {
      areaW = telaW;
      areaH = refH * (telaW / refW);
    } else {
      areaW = refW * (telaH / refH);
      areaH = telaH;
    }

    const pxPerCm = 10;
    const canvasW = Math.round(areaW * pxPerCm);
    const canvasH = Math.round(areaH * pxPerCm);

    const c = document.createElement('canvas');
    c.width = canvasW; c.height = canvasH;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasW, canvasH);

    const cellW = canvasW / cols, cellH = canvasH / rows;

    const lineColor = corGrid === '#ffffff' ? '#cccccc' : corGrid;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = Math.max(1, espessura);

    for (let col = 0; col <= cols; col++) {
      ctx.beginPath();
      ctx.moveTo(Math.round(col * cellW) + 0.5, 0);
      ctx.lineTo(Math.round(col * cellW) + 0.5, canvasH);
      ctx.stroke();
    }
    for (let row = 0; row <= rows; row++) {
      ctx.beginPath();
      ctx.moveTo(0, Math.round(row * cellH) + 0.5);
      ctx.lineTo(canvasW, Math.round(row * cellH) + 0.5);
      ctx.stroke();
    }

    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = Math.max(10, Math.min(cellW, cellH) * 0.15);
    ctx.font = `600 ${fontSize}px Inter, system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = lineColor;

    for (let r = 0; r < rows; r++) {
      for (let col = 0; col < cols; col++) {
        const label = letras[col] + (r + 1);
        ctx.fillText(label, (col + 0.5) * cellW, (r + 0.5) * cellH);
      }
    }

    c.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'grade-branca-' + telaW + 'x' + telaH + '.png';
      document.body.appendChild(a); a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  }


  // ── Comparador de Amostras ──────────────────────────────────────────────
  let comparadorState = {
    refImageData: null,
    refGray: null,
    refW: 0, refH: 0,
    pinImageData: null,
    pinGray: null,
    pinW: 0, pinH: 0,
    pontoRef: null,
    pontoPin: null,
    metodo: 'luminancia',
    historico: [],
    fase: 'upload-ref',
    abortRef: null,
    abortPin: null,
  };

  function renderComparador() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div style="min-height:calc(100vh - 4rem)" class="px-6 py-12 md:py-16">
        <div class="max-w-6xl mx-auto">

          <!-- Header -->
          <div class="fade-in mb-10">
            <h1 class="font-display text-4xl md:text-5xl mb-4">Comparar Amostras</h1>
            <p class="text-muted max-w-2xl font-light">Faça upload da foto de referência e da sua pintura. Clique no mesmo ponto em cada imagem para descobrir a diferença exata entre os valores tonais.</p>
          </div>

          <!-- Upload zones -->
          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-muted mb-3">Foto de Referência</p>
              <div id="cp-upload-ref"
                class="w-full rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:border-accent/60 hover:bg-white/[0.02]"
                style="min-height:180px"
                onclick="document.getElementById('cp-file-ref').click()"
                ondragover="cpHandleDragRefOver(event)"
                ondragleave="cpHandleDragRefLeave(event)"
                ondrop="cpHandleDropRef(event)">
                <input type="file" id="cp-file-ref" accept="image/jpeg,image/png,image/webp" class="hidden" onchange="cpHandleFileRef(event)" />
                <div id="cp-upload-ref-placeholder" class="flex flex-col items-center gap-2 text-center p-6">
                  <div class="w-12 h-12 rounded-full bg-white/[0.06] flex items-center justify-center">
                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" class="text-muted"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  </div>
                  <p class="font-display text-lg">Referência</p>
                  <p class="text-muted text-xs">Arraste ou clique</p>
                </div>
              </div>
            </div>
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-muted mb-3">Sua Pintura</p>
              <div id="cp-upload-pin"
                class="w-full rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:border-accent/60 hover:bg-white/[0.02]"
                style="min-height:180px"
                onclick="document.getElementById('cp-file-pin').click()"
                ondragover="cpHandleDragPinOver(event)"
                ondragleave="cpHandleDragPinLeave(event)"
                ondrop="cpHandleDropPin(event)">
                <input type="file" id="cp-file-pin" accept="image/jpeg,image/png,image/webp" class="hidden" onchange="cpHandleFilePin(event)" />
                <div id="cp-upload-pin-placeholder" class="flex flex-col items-center gap-2 text-center p-6">
                  <div class="w-12 h-12 rounded-full bg-white/[0.06] flex items-center justify-center">
                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" class="text-muted"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  </div>
                  <p class="font-display text-lg">Sua Pintura</p>
                  <p class="text-muted text-xs">Arraste ou clique</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Hint -->
          <div id="cp-hint" class="hidden mb-6 p-4 rounded-xl border border-accent/20 bg-accent/[0.03] text-center">
            <p id="cp-hint-text" class="text-sm text-accent font-medium"></p>
          </div>

          <!-- Canvases -->
          <div id="cp-canvas-section" class="hidden mb-8">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-muted mb-3">Referência</p>
                <canvas id="cp-canvas-ref" class="w-full rounded-xl border border-white/10 cursor-crosshair" style="max-height:400px;object-fit:contain"></canvas>
              </div>
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-muted mb-3">Sua Pintura</p>
                <canvas id="cp-canvas-pin" class="w-full rounded-xl border border-white/10 cursor-crosshair" style="max-height:400px;object-fit:contain"></canvas>
              </div>
            </div>
          </div>

          <!-- Comparison panel -->
          <div id="cp-comparison-section" class="hidden mb-8">
            <div class="grid grid-cols-3 gap-4 mb-4">
              <!-- Ref card -->
              <div id="cp-ref-card" class="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-center">
                <p class="text-[10px] uppercase tracking-[0.15em] text-muted mb-2">Referência</p>
                <div id="cp-ref-swatch" class="w-12 h-12 rounded-lg mx-auto mb-2 border border-white/10"></div>
                <p id="cp-ref-valor" class="font-display text-2xl text-fg">—</p>
                <p id="cp-ref-nome" class="text-xs text-muted mt-1"></p>
              </div>
              <!-- Pin card -->
              <div id="cp-pin-card" class="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-center">
                <p class="text-[10px] uppercase tracking-[0.15em] text-muted mb-2">Sua Pintura</p>
                <div id="cp-pin-swatch" class="w-12 h-12 rounded-lg mx-auto mb-2 border border-white/10"></div>
                <p id="cp-pin-valor" class="font-display text-2xl text-fg">—</p>
                <p id="cp-pin-nome" class="text-xs text-muted mt-1"></p>
              </div>
              <!-- Diff card -->
              <div id="cp-diff-card" class="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-center">
                <p class="text-[10px] uppercase tracking-[0.15em] text-muted mb-2">Diferença</p>
                <div id="cp-diff-icon" class="w-12 h-12 rounded-lg mx-auto mb-2 flex items-center justify-center border border-white/10 bg-white/[0.04]">
                  <span id="cp-diff-symbol" class="text-2xl">→</span>
                </div>
                <p id="cp-diff-valor" class="font-display text-2xl text-fg">—</p>
                <p id="cp-diff-msg" class="text-xs text-muted mt-1 leading-snug"></p>
              </div>
            </div>
            <!-- Visual bar -->
            <div id="cp-diff-bar-wrap" class="hidden p-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <div class="flex justify-between text-[10px] text-muted mb-2">
                <span>0 (Branco)</span><span>5 (Médio)</span><span>10 (Preto)</span>
              </div>
              <div class="relative h-4 rounded-full overflow-hidden" style="background:linear-gradient(to right,#fff,#888,#000)">
                <div id="cp-marker-ref" class="absolute top-0 w-0.5 h-full bg-accent transition-all duration-300" style="left:50%"></div>
                <div id="cp-marker-pin" class="absolute top-0 w-0.5 h-full bg-blue-400 transition-all duration-300" style="left:50%"></div>
              </div>
              <div class="flex justify-between mt-2 text-[10px]">
                <span class="text-accent font-medium">● Ref</span>
                <span class="text-blue-400 font-medium">● Sua Pintura</span>
              </div>
            </div>
          </div>

          <!-- History -->
          <div id="cp-history-section" class="hidden mb-8">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-display text-xl">Histórico</h3>
              <button onclick="cpLimparHistorico()" class="text-xs text-muted hover:text-fg transition-colors">Limpar</button>
            </div>
            <div id="cp-history-grid" class="grid grid-cols-3 sm:grid-cols-6 gap-3"></div>
          </div>

          <!-- Controls -->
          <div id="cp-controls-section" class="hidden p-4 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] mb-6">
            <div class="flex flex-wrap items-center gap-6">
              <div>
                <p class="text-sm mb-2">Método</p>
                <div class="flex gap-2">
                  <button onclick="cpSetMetodo('luminancia')" id="cp-btn-luminancia" class="px-4 py-2.5 min-h-[44px] rounded-lg text-xs border border-accent text-accent transition-all">Luminância</button>
                  <button onclick="cpSetMetodo('media')" id="cp-btn-media" class="px-4 py-2.5 min-h-[44px] rounded-lg text-xs border border-white/10 text-muted transition-all">Média</button>
                </div>
              </div>
              <div class="flex-1"></div>
              <button onclick="cpExportarComparacao()" class="px-4 py-2.5 min-h-[44px] rounded-lg text-xs border border-white/10 text-muted hover:border-accent/40 hover:text-accent active:scale-95 transition-all">Baixar Comparação (PNG)</button>
              <button onclick="cpLimparPontos()" class="px-4 py-2.5 min-h-[44px] rounded-lg text-xs border border-white/10 text-muted hover:border-accent/40 hover:text-accent active:scale-95 transition-all">Limpar Pontos</button>
              <button onclick="cpRedefinir()" class="px-4 py-2.5 min-h-[44px] rounded-lg text-xs border border-white/10 text-muted hover:border-red-500/40 hover:text-red-400 active:scale-95 transition-all">Redefinir Tudo</button>
            </div>
          </div>

        </div>
      </div>`;
  }

  // ── Upload handlers ─────────────────────────────────────────────────────
  function cpHandleDragRefOver(e) { e.preventDefault(); document.getElementById('cp-upload-ref').classList.add('border-accent/60','bg-accent/[0.02]'); }
  function cpHandleDragRefLeave(e) { document.getElementById('cp-upload-ref').classList.remove('border-accent/60','bg-accent/[0.02]'); }
  function cpHandleDropRef(e) { e.preventDefault(); document.getElementById('cp-upload-ref').classList.remove('border-accent/60','bg-accent/[0.02]'); if (e.dataTransfer.files[0]) cpProcessFile(e.dataTransfer.files[0], 'ref'); }
  function cpHandleFileRef(e) { if (e.target.files[0]) cpProcessFile(e.target.files[0], 'ref'); }

  function cpHandleDragPinOver(e) { e.preventDefault(); document.getElementById('cp-upload-pin').classList.add('border-accent/60','bg-accent/[0.02]'); }
  function cpHandleDragPinLeave(e) { document.getElementById('cp-upload-pin').classList.remove('border-accent/60','bg-accent/[0.02]'); }
  function cpHandleDropPin(e) { e.preventDefault(); document.getElementById('cp-upload-pin').classList.remove('border-accent/60','bg-accent/[0.02]'); if (e.dataTransfer.files[0]) cpProcessFile(e.dataTransfer.files[0], 'pin'); }
  function cpHandleFilePin(e) { if (e.target.files[0]) cpProcessFile(e.target.files[0], 'pin'); }

  function cpProcessFile(file, target) {
    if (!file.type.match(/image\/(jpeg|png|webp)/)) { alert('Formato não suportado. Use JPG, PNG ou WebP.'); return; }
    if (file.size > 12 * 1024 * 1024) { alert('Imagem muito grande. Use arquivos de até 10MB.'); return; }
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const maxW = 800, maxH = 600;
        let w = img.width, h = img.height;
        if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
        if (h > maxH) { w = Math.round(w * maxH / h); h = maxH; }

        const canvasId = target === 'ref' ? 'cp-canvas-ref' : 'cp-canvas-pin';
        const c = document.getElementById(canvasId);
        c.width = w; c.height = h;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const imgData = ctx.getImageData(0, 0, w, h);

        // Pre-compute grayscale
        const src = imgData.data;
        const grayArr = new Float32Array(w * h);
        for (let i = 0; i < src.length; i += 4) {
          grayArr[i / 4] = comparadorState.metodo === 'luminancia'
            ? 0.299 * src[i] + 0.587 * src[i + 1] + 0.114 * src[i + 2]
            : (src[i] + src[i + 1] + src[i + 2]) / 3;
        }

        if (target === 'ref') {
          comparadorState.refImageData = imgData;
          comparadorState.refGray = grayArr;
          comparadorState.refW = w;
          comparadorState.refH = h;
          document.getElementById('cp-upload-ref-placeholder').innerHTML =
            `<p class="text-muted text-sm">Carregada: <span class="text-fg">${file.name}</span></p>`;
          document.getElementById('cp-upload-ref').classList.remove('hover:border-accent/60','hover:bg-white/[0.02]','cursor-pointer');
          document.getElementById('cp-upload-ref').classList.add('border-accent/30');
        } else {
          comparadorState.pinImageData = imgData;
          comparadorState.pinGray = grayArr;
          comparadorState.pinW = w;
          comparadorState.pinH = h;
          document.getElementById('cp-upload-pin-placeholder').innerHTML =
            `<p class="text-muted text-sm">Carregada: <span class="text-fg">${file.name}</span></p>`;
          document.getElementById('cp-upload-pin').classList.remove('hover:border-accent/60','hover:bg-white/[0.02]','cursor-pointer');
          document.getElementById('cp-upload-pin').classList.add('border-accent/30');
        }

        // If both loaded, show canvases + controls
        if (comparadorState.refImageData && comparadorState.pinImageData) {
          comparadorState.fase = 'ready';
          document.getElementById('cp-canvas-section').classList.remove('hidden');
          document.getElementById('cp-controls-section').classList.remove('hidden');
          cpSetupCanvasEvents();
          cpShowHint('Clique em um ponto na referência para começar');
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // ── Canvas events ───────────────────────────────────────────────────────
  function cpSetupCanvasEvents() {
    const cRef = document.getElementById('cp-canvas-ref');
    const cPin = document.getElementById('cp-canvas-pin');

    if (comparadorState.abortRef) comparadorState.abortRef.abort();
    if (comparadorState.abortPin) comparadorState.abortPin.abort();
    comparadorState.abortRef = new AbortController();
    comparadorState.abortPin = new AbortController();

    const signalRef = comparadorState.abortRef.signal;
    const signalPin = comparadorState.abortPin.signal;

    cRef.addEventListener('click', cpClickRef, { signal: signalRef });
    cPin.addEventListener('click', cpClickPin, { signal: signalPin });
    cRef.addEventListener('touchstart', cpClickRef, { passive: false, signal: signalRef });
    cPin.addEventListener('touchstart', cpClickPin, { passive: false, signal: signalPin });
  }

  function cpGetCoords(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: Math.min(canvas.width - 1, Math.max(0, Math.floor(((clientX - rect.left) / rect.width) * canvas.width))),
      y: Math.min(canvas.height - 1, Math.max(0, Math.floor(((clientY - rect.top) / rect.height) * canvas.height)))
    };
  }

  function cpClickRef(e) {
    if (!comparadorState.refGray) return;
    e.preventDefault();
    const c = document.getElementById('cp-canvas-ref');
    const { x, y } = cpGetCoords(e, c);
    const gray = comparadorState.refGray[y * comparadorState.refW + x];
    const pi = (y * comparadorState.refW + x) * 4;
    const src = comparadorState.refImageData.data;
    const valor = Math.min(10, Math.max(0, Math.round((1 - gray / 255) * 10)));
    const r = src[pi], g = src[pi + 1], b = src[pi + 2];
    const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
    const nomeIdx = Math.min(10, Math.max(0, Math.round((gray / 255) * 10)));
    const nome = escalaCinza[nomeIdx].nome;

    comparadorState.pontoRef = { x, y, gray, valor, r, g, b, hex, nome };

    // Redraw canvas + marker
    const ctx = c.getContext('2d');
    ctx.putImageData(comparadorState.refImageData, 0, 0);
    cpDrawMarker(ctx, x, y, '#d88800');

    comparadorState.fase = 'picked-ref';
    cpShowHint('Agora clique no mesmo ponto na sua pintura →');
  }

  function cpClickPin(e) {
    if (!comparadorState.pinGray) return;
    e.preventDefault();
    const c = document.getElementById('cp-canvas-pin');
    const { x, y } = cpGetCoords(e, c);
    const gray = comparadorState.pinGray[y * comparadorState.pinW + x];
    const pi = (y * comparadorState.pinW + x) * 4;
    const src = comparadorState.pinImageData.data;
    const valor = Math.min(10, Math.max(0, Math.round((1 - gray / 255) * 10)));
    const r = src[pi], g = src[pi + 1], b = src[pi + 2];
    const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
    const nomeIdx = Math.min(10, Math.max(0, Math.round((gray / 255) * 10)));
    const nome = escalaCinza[nomeIdx].nome;

    comparadorState.pontoPin = { x, y, gray, valor, r, g, b, hex, nome };

    // Redraw canvas + marker
    const ctx = c.getContext('2d');
    ctx.putImageData(comparadorState.pinImageData, 0, 0);
    cpDrawMarker(ctx, x, y, '#60a5fa');

    comparadorState.fase = 'picked-both';
    cpShowHint('');
    document.getElementById('cp-hint').classList.add('hidden');

    cpMostrarComparacao();
    cpAdicionarHistorico();
  }

  function cpDrawMarker(ctx, x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  // ── Export comparison as PNG ─────────────────────────────────────────────
  function cpExportarComparacao() {
    const { pontoRef: ref, pontoPin: pin } = comparadorState;
    if (!ref || !pin) return;

    const cRef = document.getElementById('cp-canvas-ref');
    const cPin = document.getElementById('cp-canvas-pin');
    const gap = 16;
    const headerH = 50;
    const footerH = 80;
    const totalW = cRef.width + gap + cPin.width;
    const totalH = headerH + Math.max(cRef.height, cPin.height) + footerH;

    const canvas = document.createElement('canvas');
    canvas.width = totalW;
    canvas.height = totalH;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, totalW, totalH);

    // Header labels
    ctx.font = '600 16px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#999';
    ctx.textAlign = 'left';
    ctx.fillText('Referência', 0, 30);
    ctx.textAlign = 'left';
    ctx.fillText('Sua Pintura', cRef.width + gap, 30);

    // Draw canvases
    ctx.drawImage(cRef, 0, headerH);
    ctx.drawImage(cPin, cRef.width + gap, headerH);

    // Footer — comparison data
    const fy = headerH + Math.max(cRef.height, cPin.height) + 16;

    // Ref swatch + value
    ctx.fillStyle = ref.hex;
    ctx.fillRect(0, fy, 20, 20);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.strokeRect(0, fy, 20, 20);
    ctx.font = '600 14px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.fillText(`Ref: ${ref.valor}/10 (${ref.nome})`, 28, fy + 15);

    // Pin swatch + value
    const pinX = cRef.width + gap;
    ctx.fillStyle = pin.hex;
    ctx.fillRect(pinX, fy, 20, 20);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.strokeRect(pinX, fy, 20, 20);
    ctx.fillStyle = '#fff';
    ctx.fillText(`Sua: ${pin.valor}/10 (${pin.nome})`, pinX + 28, fy + 15);

    // Diff
    const diff = Math.abs(ref.valor - pin.valor);
    const diffCor = diff <= 1 ? '#4ade80' : diff <= 3 ? '#facc15' : diff <= 5 ? '#f97316' : '#ef4444';
    ctx.fillStyle = diffCor;
    ctx.font = '700 18px Inter, system-ui, sans-serif';
    ctx.fillText(`Δ ${diff.toFixed(1)}`, totalW / 2 - 20, fy + 15);

    // Diff message
    const diffMsg = diff === 0 ? 'Valor idêntico!' :
      ref.valor > pin.valor ? 'Adicione mais grafite/tinta preta' :
      'Reduza a intensidade';
    ctx.font = '400 12px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#777';
    ctx.fillText(diffMsg, 0, fy + 40);

    // Download
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'comparacao-tonal.png';
      document.body.appendChild(a); a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  }

  // ── Comparison display ──────────────────────────────────────────────────
  function cpMostrarComparacao() {
    const { pontoRef: ref, pontoPin: pin } = comparadorState;
    if (!ref || !pin) return;

    document.getElementById('cp-comparison-section').classList.remove('hidden');

    // Ref card
    document.getElementById('cp-ref-swatch').style.backgroundColor = ref.hex;
    document.getElementById('cp-ref-valor').textContent = ref.valor + '/10';
    document.getElementById('cp-ref-nome').textContent = ref.nome;

    // Pin card
    document.getElementById('cp-pin-swatch').style.backgroundColor = pin.hex;
    document.getElementById('cp-pin-valor').textContent = pin.valor + '/10';
    document.getElementById('cp-pin-nome').textContent = pin.nome;

    // Diff
    const diff = Math.abs(ref.valor - pin.valor);
    const direcao = ref.valor > pin.valor ? 'mais' : 'menos';
    const corClasse = diff <= 1 ? 'text-green-400' : diff <= 3 ? 'text-yellow-400' : diff <= 5 ? 'text-orange-400' : 'text-red-400';

    let msg = '';
    if (diff === 0) msg = 'Valor idêntico!';
    else if (diff <= 1) msg = 'Excelente! Praticamente igual.';
    else if (diff <= 3) msg = `Quase lá. Adicione ${direcao} intensidade.`;
    else if (diff <= 5) msg = `Diferença moderada. ${ref.valor > pin.valor ? 'Escureça' : 'Clareie'} um pouco.`;
    else msg = ref.valor > pin.valor ? 'Adicione mais grafite/tinta preta.' : 'Reduza a intensidade — está escurecido demais.';

    document.getElementById('cp-diff-valor').textContent = diff.toFixed(1);
    document.getElementById('cp-diff-valor').className = `font-display text-2xl ${corClasse}`;
    document.getElementById('cp-diff-msg').textContent = msg;
    document.getElementById('cp-diff-symbol').textContent = diff === 0 ? '=' : ref.valor > pin.valor ? '↑' : '↓';

    // Visual bar
    document.getElementById('cp-diff-bar-wrap').classList.remove('hidden');
    const refPos = (ref.valor / 10) * 100;
    const pinPos = (pin.valor / 10) * 100;
    document.getElementById('cp-marker-ref').style.left = refPos + '%';
    document.getElementById('cp-marker-pin').style.left = pinPos + '%';
  }

  // ── History ─────────────────────────────────────────────────────────────
  function cpAdicionarHistorico() {
    const { pontoRef: ref, pontoPin: pin } = comparadorState;
    if (!ref || !pin) return;
    const diff = Math.abs(ref.valor - pin.valor);
    comparadorState.historico.push({
      ref: { ...ref },
      pin: { ...pin },
      diff,
    });
    if (comparadorState.historico.length > 12) comparadorState.historico.shift();
    document.getElementById('cp-history-section').classList.remove('hidden');
    cpRenderHistorico();
  }

  function cpRenderHistorico() {
    const grid = document.getElementById('cp-history-grid');
    grid.innerHTML = comparadorState.historico.map((item, i) => {
      const corBg = item.diff <= 1 ? 'border-green-500/30' : item.diff <= 3 ? 'border-yellow-500/30' : item.diff <= 5 ? 'border-orange-500/30' : 'border-red-500/30';
      return `
        <div class="p-3 rounded-xl border ${corBg} bg-white/[0.02] text-center fade-in" style="animation-delay:${i * 0.03}s">
          <div class="flex items-center justify-center gap-1 mb-2">
            <div class="w-4 h-4 rounded border border-white/10" style="background:${item.ref.hex}"></div>
            <span class="text-[10px] text-muted">→</span>
            <div class="w-4 h-4 rounded border border-white/10" style="background:${item.pin.hex}"></div>
          </div>
          <p class="text-xs font-mono text-fg">${item.ref.valor}→${item.pin.valor}</p>
          <p class="text-[10px] text-muted mt-0.5">Δ${item.diff.toFixed(1)}</p>
        </div>`;
    }).join('');
  }

  // ── Controls ────────────────────────────────────────────────────────────
  function cpSetMetodo(m) {
    comparadorState.metodo = m;
    document.getElementById('cp-btn-luminancia').className = `px-4 py-2.5 min-h-[44px] rounded-lg text-xs border ${m === 'luminancia' ? 'border-accent text-accent' : 'border-white/10 text-muted'} transition-all`;
    document.getElementById('cp-btn-media').className = `px-4 py-2.5 min-h-[44px] rounded-lg text-xs border ${m === 'media' ? 'border-accent text-accent' : 'border-white/10 text-muted'} transition-all`;

    // Re-process both images with new method
    if (comparadorState.refImageData) cpReprocessGray('ref');
    if (comparadorState.pinImageData) cpReprocessGray('pin');

    // Re-pick if points were selected
    if (comparadorState.pontoRef) {
      const g = comparadorState.refGray[comparadorState.pontoRef.y * comparadorState.refW + comparadorState.pontoRef.x];
      comparadorState.pontoRef.gray = g;
      comparadorState.pontoRef.valor = Math.min(10, Math.max(0, Math.round((1 - g / 255) * 10)));
    }
    if (comparadorState.pontoPin) {
      const g = comparadorState.pinGray[comparadorState.pontoPin.y * comparadorState.pinW + comparadorState.pontoPin.x];
      comparadorState.pontoPin.gray = g;
      comparadorState.pontoPin.valor = Math.min(10, Math.max(0, Math.round((1 - g / 255) * 10)));
    }
    if (comparadorState.pontoRef && comparadorState.pontoPin) cpMostrarComparacao();
  }

  function cpReprocessGray(target) {
    const state = comparadorState;
    const imgData = target === 'ref' ? state.refImageData : state.pinImageData;
    const w = target === 'ref' ? state.refW : state.pinW;
    const h = target === 'ref' ? state.refH : state.pinH;
    const src = imgData.data;
    const grayArr = new Float32Array(w * h);
    for (let i = 0; i < src.length; i += 4) {
      grayArr[i / 4] = state.metodo === 'luminancia'
        ? 0.299 * src[i] + 0.587 * src[i + 1] + 0.114 * src[i + 2]
        : (src[i] + src[i + 1] + src[i + 2]) / 3;
    }
    if (target === 'ref') state.refGray = grayArr;
    else state.pinGray = grayArr;
  }

  // ── Hint ────────────────────────────────────────────────────────────────
  function cpShowHint(text) {
    const el = document.getElementById('cp-hint');
    const txt = document.getElementById('cp-hint-text');
    if (!text) { el.classList.add('hidden'); return; }
    el.classList.remove('hidden');
    txt.textContent = text;
  }

  // ── Reset ───────────────────────────────────────────────────────────────
  function cpLimparPontos() {
    comparadorState.pontoRef = null;
    comparadorState.pontoPin = null;
    comparadorState.fase = 'ready';

    // Redraw canvases without markers
    if (comparadorState.refImageData) {
      const c = document.getElementById('cp-canvas-ref');
      c.getContext('2d').putImageData(comparadorState.refImageData, 0, 0);
    }
    if (comparadorState.pinImageData) {
      const c = document.getElementById('cp-canvas-pin');
      c.getContext('2d').putImageData(comparadorState.pinImageData, 0, 0);
    }

    // Reset comparison display
    document.getElementById('cp-ref-valor').textContent = '—';
    document.getElementById('cp-ref-nome').textContent = '';
    document.getElementById('cp-ref-swatch').style.backgroundColor = '';
    document.getElementById('cp-pin-valor').textContent = '—';
    document.getElementById('cp-pin-nome').textContent = '';
    document.getElementById('cp-pin-swatch').style.backgroundColor = '';
    document.getElementById('cp-diff-valor').textContent = '—';
    document.getElementById('cp-diff-valor').className = 'font-display text-2xl text-fg';
    document.getElementById('cp-diff-msg').textContent = '';
    document.getElementById('cp-diff-symbol').textContent = '→';
    document.getElementById('cp-diff-bar-wrap').classList.add('hidden');
    document.getElementById('cp-comparison-section').classList.add('hidden');

    cpShowHint('Clique em um ponto na referência para começar');
  }

  function cpRedefinir() {
    if (comparadorState.abortRef) comparadorState.abortRef.abort();
    if (comparadorState.abortPin) comparadorState.abortPin.abort();

    comparadorState.refImageData = null;
    comparadorState.refGray = null;
    comparadorState.refW = 0;
    comparadorState.refH = 0;
    comparadorState.pinImageData = null;
    comparadorState.pinGray = null;
    comparadorState.pinW = 0;
    comparadorState.pinH = 0;
    comparadorState.pontoRef = null;
    comparadorState.pontoPin = null;
    comparadorState.historico = [];
    comparadorState.fase = 'upload-ref';
    comparadorState.abortRef = null;
    comparadorState.abortPin = null;

    // Re-render the whole page
    renderComparador();
  }

  function cpLimparHistorico() {
    comparadorState.historico = [];
    document.getElementById('cp-history-section').classList.add('hidden');
    document.getElementById('cp-history-grid').innerHTML = '';
  }


  // ── Ilusão de Óptica do Valor ───────────────────────────────────────────
  let ilusaoState = { valor: 5 };

  function renderIlusao() {
    const app = document.getElementById('app');
    const v = ilusaoState.valor;
    const esc = escalaCinza[v];

    // Fundos para demo principal
    const fundos = [
      { bg: 0, label: 'Fundo Branco', sub: 'Parece mais escuro' },
      { bg: v, label: 'Fundo Neutro', sub: 'Valor real' },
      { bg: 10, label: 'Fundo Preto', sub: 'Parece mais claro' },
    ];

    app.innerHTML = `
      <div style="min-height:calc(100vh - 4rem)" class="px-6 py-12 md:py-16">
        <div class="max-w-6xl mx-auto">

          <!-- Header -->
          <div class="fade-in mb-10">
            <h1 class="font-display text-4xl md:text-5xl mb-4">Ilusão de Óptica do Valor</h1>
            <p class="text-muted max-w-2xl font-light">O maior inimigo do hiper-realismo não é a falta de coordenação — é o próprio <span class="text-fg font-medium">cérebro</span>, que tenta "corrigir" o que vemos. Três passos para treinar o olho.</p>
          </div>

          <!-- ═══ PASSO 1: Teoria — Ilusão de Profundidade ═══ -->
          <div class="mb-12">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">1</span>
              <h2 class="font-display text-2xl">A Teoria: O cérebro constrói profundidade</h2>
            </div>
            <div class="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <div class="rounded-2xl overflow-hidden border border-white/10 bg-white">
                  <img src="../images/ilusao.webp" alt="Ilusão óptica de profundidade — grade quadriculada distorcida cria a sensação de um túnel"
                    class="w-full" style="display:block" />
                </div>
              </div>
              <div class="space-y-4">
                <p class="text-sm text-muted leading-relaxed">
                  Esta imagem é uma <span class="text-fg font-medium">grade quadriculada distorcida</span> que o cérebro interpreta como um túnel tridimensional — mas é uma superfície completamente plana.
                </p>

                <div class="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <p class="text-xs text-accent font-medium mb-1">1. Gradiente de textura</p>
                  <p class="text-sm text-muted leading-relaxed">Os quadrados ficam <span class="text-fg font-medium">progressivamente menores</span> em direção ao centro. O cérebro associa tamanho menor a maior distância — e cria profundidade.</p>
                </div>

                <div class="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <p class="text-xs text-accent font-medium mb-1">2. Deformação da grade</p>
                  <p class="text-sm text-muted leading-relaxed">As linhas rectas são <span class="text-fg font-medium">curvadas em arcos concêntricos</span>. Esta curvatura simula a deformação de uma superfície elástica empurrada para baixo — um funil.</p>
                </div>

                <div class="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <p class="text-xs text-accent font-medium mb-1">3. Gradiente de luz e sombra</p>
                  <p class="text-sm text-muted leading-relaxed">A iluminação não é uniforme: as bordas parecem <span class="text-fg font-medium">mais iluminadas</span> e o centro escurece progressivamente. O contraste cria a sensação de uma cavidade profunda e escura.</p>
                </div>

                <div class="p-4 rounded-xl border border-accent/20 bg-accent/[0.03]">
                  <p class="text-xs text-accent font-medium mb-1">Na pintura</p>
                  <p class="text-sm text-muted leading-relaxed">Estes mesmos mecanismos — gradiente de textura, curvatura e sombreamento — são exactamente o que usamos para pintar profundidade numa tela plana. O cérebro é "hackeado" por estas pistas visuais.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- ═══ PASSO 2: Prática — Simulador ═══ -->
          <div class="mb-12">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">2</span>
              <h2 class="font-display text-2xl">A Prática: Veja com os seus olhos</h2>
            </div>

            <!-- Slider -->
            <div class="mb-8 p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div class="flex justify-between items-center mb-4">
                <p class="text-sm font-medium">Escolha um valor</p>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg border border-white/10" style="background:${esc.hex}"></div>
                  <div>
                    <span class="font-display text-xl text-accent">${v}</span>
                    <span class="text-sm text-muted ml-2">${esc.nome}</span>
                  </div>
                </div>
              </div>
              <input type="range" id="io-slider" min="0" max="10" value="${v}"
                class="w-full h-2 rounded-full appearance-none cursor-pointer"
                style="background:linear-gradient(to right,#fff,#888,#000)"
                oninput="ioSetValor(+this.value)" />
              <div class="flex justify-between text-[10px] text-muted mt-1">
                <span>0 (Branco)</span><span>5 (Médio)</span><span>10 (Preto)</span>
              </div>
            </div>

            <!-- Demo principal: 3 fundos -->
            <div class="mb-8">
              <h3 class="font-display text-xl mb-3">Mesmo valor, fundos diferentes</h3>
              <div class="grid grid-cols-3 gap-4">
                ${fundos.map(f => {
                  const bg = escalaCinza[f.bg].hex;
                  const txtC = v > f.bg ? '#fff' : v < f.bg ? '#000' : '#555';
                  return `
                  <div class="rounded-2xl border border-white/10 overflow-hidden fade-in">
                    <div class="p-6 md:p-8 flex items-center justify-center" style="background:${bg};min-height:160px">
                      <div class="w-20 h-20 md:w-28 md:h-28 rounded-xl border border-white/10 flex items-center justify-center" style="background:${esc.hex}">
                        <span class="font-display text-2xl md:text-3xl" style="color:${txtC}">${v}</span>
                      </div>
                    </div>
                    <div class="p-3 bg-bg/80 text-center">
                      <p class="text-xs font-medium">${f.label}</p>
                      <p class="text-[10px] text-muted">${f.sub}</p>
                    </div>
                  </div>`;
                }).join('')}
              </div>
            </div>

            <!-- Demo estendida: 11 fundos -->
            <div>
              <h3 class="font-display text-xl mb-2">Todos os fundos — mesmo valor no centro</h3>
              <p class="text-sm text-muted mb-4">Todos os quadrados centrais são <span class="text-fg font-medium">exactamente</span> o cinza ${v}.</p>
              <div class="overflow-x-auto pb-2 -mx-2 px-2">
                <div class="flex gap-2" style="min-width:max-content">
                  ${escalaCinza.map((f, i) => `
                    <div class="flex flex-col items-center gap-2 fade-in" style="animation-delay:${i * 0.03}s">
                      <div class="w-14 h-14 md:w-18 md:h-18 rounded-xl flex items-center justify-center border border-white/10" style="background:${f.hex};width:4.5rem;height:4.5rem">
                        <div class="w-7 h-7 md:w-9 md:h-9 rounded-lg border border-white/10" style="background:${esc.hex}"></div>
                      </div>
                      <span class="text-[10px] font-mono ${i === v ? 'text-accent font-bold' : 'text-muted'}">${i}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- ═══ PASSO 3: Solução — Máscara + Isolador ═══ -->
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">3</span>
              <h2 class="font-display text-2xl">A Solução: Como vencer o cérebro</h2>
            </div>
            <div class="grid md:grid-cols-3 gap-6">
              <!-- Máscara de valor -->
              <div class="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div class="w-full h-32 rounded-xl border border-white/10 bg-white flex items-center justify-center mb-4 relative overflow-hidden">
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-28 h-20 rounded-lg" style="background:#808080"></div>
                  </div>
                  <div class="absolute w-10 h-10 rounded-full border-2 border-dashed border-accent" style="background:#333"></div>
                </div>
                <h3 class="font-display text-lg mb-2">Máscara de Valor</h3>
                <p class="text-sm text-muted leading-relaxed mb-3">Corte um rectângulo de papel <span class="text-fg font-medium">cinza neutro</span> (valor 5). Faça um furo de 2cm no centro.</p>
                <p class="text-sm text-muted leading-relaxed">Segure sobre a referência e sobre a tela para ver o valor puro, sem interferência do cérebro.</p>
              </div>

              <!-- Squint -->
              <div class="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div class="w-full h-32 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center mb-4">
                  <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
                    <path d="M5 20 Q20 8 40 8 Q60 8 75 20 Q60 32 40 32 Q20 32 5 20Z" stroke="#d88800" stroke-width="2" fill="none"/>
                    <line x1="10" y1="19" x2="70" y2="19" stroke="#d88800" stroke-width="2"/>
                  </svg>
                </div>
                <h3 class="font-display text-lg mb-2">Squint</h3>
                <p class="text-sm text-muted leading-relaxed mb-3"><span class="text-fg font-medium">Aperte levemente os olhos</span> ao avaliar valores na referência.</p>
                <p class="text-sm text-muted leading-relaxed">Isto reduz o contraste abrupto e permite ver os valores reais, sem o cérebro "corrigir".</p>
              </div>

              <!-- Isolador -->
              <div class="p-6 rounded-2xl border border-accent/20 bg-accent/[0.03]">
                <div class="w-full h-32 rounded-xl border border-accent/20 bg-accent/[0.05] flex items-center justify-center mb-4">
                  <div class="w-20 h-16 rounded-lg border-2 border-dashed border-accent/40 flex items-center justify-center">
                    <span class="text-accent text-xs font-medium text-center leading-tight px-1">Isolar<br/>valor</span>
                  </div>
                </div>
                <h3 class="font-display text-lg mb-2">Isolador Digital</h3>
                <p class="text-sm text-muted leading-relaxed mb-3">O <span class="text-accent font-medium">Isolador Tonal</span> faz exactamente a mesma coisa que a máscara — mas digitalmente.</p>
                <button onclick="navigate('isolador')" class="w-full px-4 py-3 min-h-[44px] rounded-xl text-sm font-medium bg-accent text-bg hover:brightness-110 active:scale-95 transition-all">
                  Experimentar o Isolador →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>`;
  }

  // ── Simulador handlers ──────────────────────────────────────────────────
  function ioSetValor(v) {
    ilusaoState.valor = v;
    renderIlusao();
  }

  // ══════════════════════════════════════════════════════════════════════
  // ── 1. LOCALIZADOR DE VALOR ──────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════
  let localizadorState = {
    imageData: null,
    originalImageData: null,
    grayData: null,
    picked: null,
    modoIsolacao: false,
    faixaMin: 0,
    faixaMax: 10,
    opacidadeFundo: 80,
  };

  function renderLocalizador() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div style="min-height:calc(100vh - 4rem)" class="px-6 py-12 md:py-16">
        <div class="max-w-5xl mx-auto">
          <div class="fade-in mb-10">
            <h1 class="font-display text-4xl md:text-5xl mb-4">Localizar Valor</h1>
            <p class="text-muted max-w-2xl font-light">Clique em qualquer ponto da imagem para descobrir o valor tonal exato (0–10). Isole uma faixa de valores para estudar a distribuição tonal.</p>
          </div>
          <div id="lv-upload-zone" class="w-full rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 mb-8 cursor-pointer transition-all hover:border-accent/60 hover:bg-white/[0.02]" style="min-height:200px" onclick="document.getElementById('lv-file-input').click()">
            <input type="file" id="lv-file-input" accept="image/jpeg,image/png,image/webp" class="hidden" onchange="lvProcessFile(event)" />
            <p class="font-display text-xl text-muted">Clique ou arraste uma imagem</p>
          </div>
          <div id="lv-result" class="hidden">
            <div class="grid md:grid-cols-[1fr,280px] gap-6">
              <div class="relative">
                <canvas id="lv-canvas" class="w-full rounded-xl border border-white/10 cursor-crosshair" style="max-height:500px;object-fit:contain"></canvas>
                <div id="lv-loupe" class="hidden fixed w-32 h-32 rounded-full border-2 border-accent pointer-events-none z-50 shadow-2xl" style="image-rendering:pixelated"></div>
              </div>
              <div id="lv-info" class="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-5 self-start sticky top-20">
                <p class="text-xs uppercase tracking-[0.2em] text-muted">Clique na imagem</p>
                <div class="text-center py-8">
                  <div id="lv-color-preview" class="w-20 h-20 rounded-2xl mx-auto mb-4 border border-white/10" style="background:#808080"></div>
                  <p id="lv-valor" class="font-display text-5xl font-bold text-accent">5</p>
                  <p class="text-xs text-muted mt-1">valor tonal (0–10)</p>
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between"><span class="text-muted">R</span><span id="lv-r" class="font-mono text-fg">128</span></div>
                  <div class="flex justify-between"><span class="text-muted">G</span><span id="lv-g" class="font-mono text-fg">128</span></div>
                  <div class="flex justify-between"><span class="text-muted">B</span><span id="lv-b" class="font-mono text-fg">128</span></div>
                  <div class="flex justify-between border-t border-white/10 pt-2"><span class="text-muted">Hex</span><span id="lv-hex" class="font-mono text-accent">#808080</span></div>
                  <div class="flex justify-between"><span class="text-muted">Brilho</span><span id="lv-bri" class="font-mono text-fg">50%</span></div>
                </div>
                <div class="pt-2 border-t border-white/10">
                  <p class="text-[10px] uppercase tracking-[0.2em] text-muted mb-2">Zona</p>
                  <div id="lv-zona-bar" class="flex gap-0.5 h-6 rounded-lg overflow-hidden"></div>
                  <p id="lv-zona-text" class="text-xs text-muted mt-2 text-center"></p>
                </div>
              </div>
            </div>

            <!-- Isolamento Tonal -->
            <div class="p-4 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] mt-6">
              <div class="grid md:grid-cols-2 gap-8">
                <div class="space-y-6">
                  <h3 class="font-display text-xl mb-4">Isolar Faixa de Valores</h3>
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" id="lv-modo-toggle" onchange="lvOnModoIsolacao()" class="accent-[#d88800] w-4 h-4" />
                    <span class="text-sm">Ativar isolamento tonal</span>
                  </label>
                  <p class="text-xs text-muted">Quando ativo, apenas os pixels dentro da faixa selecionada ficam visíveis — o resto fica dessaturado.</p>

                  <div class="space-y-3">
                    <div>
                      <div class="flex justify-between text-sm mb-2">
                        <span>Valor Mínimo (Claro)</span>
                        <span id="lv-val-min" class="text-accent font-mono">0</span>
                      </div>
                      <input type="range" id="lv-sl-min" min="0" max="10" value="0" class="w-full" oninput="lvOnFaixa()" />
                    </div>
                    <div>
                      <div class="flex justify-between text-sm mb-2">
                        <span>Valor Máximo (Escuro)</span>
                        <span id="lv-val-max" class="text-accent font-mono">10</span>
                      </div>
                      <input type="range" id="lv-sl-max" min="0" max="10" value="10" class="w-full" oninput="lvOnFaixa()" />
                    </div>
                  </div>

                  <div>
                    <p class="text-xs text-muted mb-2">Atalhos rápidos:</p>
                    <div class="flex flex-wrap gap-2">
                      <button onclick="lvSetFaixa(0,3)" class="px-3 py-1.5 rounded-lg text-xs border border-white/10 text-muted hover:border-accent/40 hover:text-accent transition-all">Claros (0–3)</button>
                      <button onclick="lvSetFaixa(4,7)" class="px-3 py-1.5 rounded-lg text-xs border border-white/10 text-muted hover:border-accent/40 hover:text-accent transition-all">Médios (4–7)</button>
                      <button onclick="lvSetFaixa(8,10)" class="px-3 py-1.5 rounded-lg text-xs border border-white/10 text-muted hover:border-accent/40 hover:text-accent transition-all">Escuros (8–10)</button>
                      <button onclick="lvSetFaixa(0,10)" class="px-3 py-1.5 rounded-lg text-xs border border-white/10 text-muted hover:border-accent/40 hover:text-accent transition-all">Todos</button>
                    </div>
                  </div>

                  <div>
                    <div class="flex justify-between text-sm mb-2">
                      <span>Opacidade do Fundo</span>
                      <span id="lv-val-opacidade" class="text-accent font-mono">80%</span>
                    </div>
                    <input type="range" id="lv-sl-opacidade" min="0" max="100" value="80" class="w-full" oninput="lvOnOpacidade()" />
                    <p class="text-xs text-muted mt-1">Quanto do fundo dessaturado permanece visível.</p>
                  </div>
                </div>

                <div class="space-y-6">
                  <h3 class="font-display text-xl mb-4">Distribuição de Valores</h3>
                  <div id="lv-histograma" class="space-y-2"></div>
                  <p class="text-xs text-muted">Quantos pixels da imagem pertencem a cada faixa tonal.</p>
                </div>
              </div>
            </div>

            <!-- Botões -->
            <div class="flex flex-col sm:flex-row gap-4 mt-6">
              <button onclick="lvLimparIsolamento()" class="px-6 py-3 rounded-full border border-white/10 text-sm hover:border-accent/40 transition-colors">
                Limpar Isolamento
              </button>
              <button onclick="lvBaixarImagem()"
                class="flex-1 px-8 py-4 rounded-full text-sm font-medium transition-colors"
                style="background:#d88800;color:hsl(0 0% 4%)"
                onmouseenter="this.style.background='#c07800'"
                onmouseleave="this.style.background='#d88800'">
                Baixar Resultado (PNG)
              </button>
              <button onclick="document.getElementById('lv-file-input').click()" class="px-6 py-3 rounded-full border border-white/10 text-sm hover:border-accent/40 transition-colors">
                Trocar Imagem
              </button>
            </div>
          </div>
        </div>
      </div>`;
  }

  function lvProcessFile(e) {
    const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('lv-canvas');
        const maxW = 800, maxH = 600;
        let w = img.width, h = img.height;
        if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
        if (h > maxH) { w = Math.round(w * maxH / h); h = maxH; }
        c.width = w; c.height = h;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const imgData = ctx.getImageData(0, 0, w, h);
        localizadorState.imageData = imgData;
        localizadorState.originalImageData = imgData;

        // Pre-calc grayscale
        const gray = new Float32Array(w * h);
        for (let i = 0; i < imgData.data.length; i += 4) {
          gray[i / 4] = 0.299 * imgData.data[i] + 0.587 * imgData.data[i+1] + 0.114 * imgData.data[i+2];
        }
        localizadorState.grayData = gray;
        localizadorState.picked = null;

        document.getElementById('lv-result').classList.remove('hidden');
        document.getElementById('lv-upload-zone').innerHTML = `
          <p class="text-muted text-sm">Imagem carregada</p>
          <button onclick="document.getElementById('lv-file-input').value=''; document.getElementById('lv-file-input').click()" class="mt-2 px-4 py-1.5 text-xs rounded-full border border-white/10 text-muted hover:border-accent/40 hover:text-fg transition-colors">Trocar Imagem</button>
        `;
        c.onclick = lvClick;
        c.onmousemove = lvMove;
        c.onmouseleave = () => document.getElementById('lv-loupe').classList.add('hidden');
        lvRenderHistograma();
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  function lvClick(e) {
    const c = document.getElementById('lv-canvas');
    const rect = c.getBoundingClientRect();
    const sx = c.width / rect.width, sy = c.height / rect.height;
    const px = Math.floor((e.clientX - rect.left) * sx);
    const py = Math.floor((e.clientY - rect.top) * sy);
    const d = localizadorState.imageData.data;
    const idx = (py * c.width + px) * 4;
    const r = d[idx], g = d[idx+1], b = d[idx+2];
    const luma = 0.299*r + 0.587*g + 0.114*b;
    const valor = Math.round((1 - luma/255) * 10);
    const hex = '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('');

    document.getElementById('lv-color-preview').style.background = `rgb(${r},${g},${b})`;
    document.getElementById('lv-valor').textContent = valor;
    document.getElementById('lv-r').textContent = r;
    document.getElementById('lv-g').textContent = g;
    document.getElementById('lv-b').textContent = b;
    document.getElementById('lv-hex').textContent = hex;
    document.getElementById('lv-bri').textContent = Math.round(luma/255*100) + '%';

    const zonaBar = document.getElementById('lv-zona-bar');
    zonaBar.innerHTML = '';
    for (let i = 0; i <= 10; i++) {
      const brightness = Math.round((1 - i/10) * 255);
      const div = document.createElement('div');
      div.className = 'flex-1 h-full transition-all ' + (i === valor ? 'ring-2 ring-accent ring-offset-1 ring-offset-bg rounded' : '');
      div.style.background = `rgb(${brightness},${brightness},${brightness})`;
      zonaBar.appendChild(div);
    }
    const nomes = ['Branco Puro','Cinza Muito Claro','Cinza Claro','Cinza Médio Claro','Cinza Médio','Cinza Médio Escuro','Cinza Escuro','Cinza Muito Escuro','Preto Claro','Preto','Preto Puro'];
    document.getElementById('lv-zona-text').textContent = `Zona ${valor}: ${nomes[valor]}`;
  }

  function lvMove(e) {
    const c = document.getElementById('lv-canvas');
    const rect = c.getBoundingClientRect();
    const sx = c.width / rect.width, sy = c.height / rect.height;
    const px = Math.floor((e.clientX - rect.left) * sx);
    const py = Math.floor((e.clientY - rect.top) * sy);
    if (px < 0 || py < 0 || px >= c.width || py >= c.height) return;

    const loupe = document.getElementById('lv-loupe');
    loupe.classList.remove('hidden');
    loupe.style.left = (e.clientX + 20) + 'px';
    loupe.style.top = (e.clientY - 64) + 'px';

    const zoom = 8, size = 16;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = size; tempCanvas.height = size;
    const tCtx = tempCanvas.getContext('2d');
    tCtx.imageSmoothingEnabled = false;
    tCtx.drawImage(c, px - size/2, py - size/2, size, size, 0, 0, size * zoom, size * zoom);

    const grid = tempCanvas.getContext('2d');
    grid.strokeStyle = 'rgba(255,255,255,0.15)';
    grid.lineWidth = 1;
    for (let i = 0; i <= size; i++) {
      grid.beginPath(); grid.moveTo(i*zoom, 0); grid.lineTo(i*zoom, size*zoom); grid.stroke();
      grid.beginPath(); grid.moveTo(0, i*zoom); grid.lineTo(size*zoom, i*zoom); grid.stroke();
    }

    loupe.style.backgroundImage = `url(${tempCanvas.toDataURL()})`;
    loupe.style.backgroundSize = 'cover';
  }

  // ── Localizador: isolamento tonal ──────────────────────────────────
  function lvOnFaixa() {
    localizadorState.faixaMin = Number(document.getElementById('lv-sl-min').value);
    localizadorState.faixaMax = Number(document.getElementById('lv-sl-max').value);
    if (localizadorState.faixaMin > localizadorState.faixaMax) {
      const tmp = localizadorState.faixaMin;
      localizadorState.faixaMin = localizadorState.faixaMax;
      localizadorState.faixaMax = tmp;
    }
    document.getElementById('lv-val-min').textContent = localizadorState.faixaMin;
    document.getElementById('lv-val-max').textContent = localizadorState.faixaMax;
    lvAplicarIsolamento();
  }

  function lvSetFaixa(min, max) {
    localizadorState.faixaMin = min;
    localizadorState.faixaMax = max;
    document.getElementById('lv-sl-min').value = min;
    document.getElementById('lv-sl-max').value = max;
    document.getElementById('lv-val-min').textContent = min;
    document.getElementById('lv-val-max').textContent = max;
    lvAplicarIsolamento();
  }

  function lvOnModoIsolacao() {
    localizadorState.modoIsolacao = document.getElementById('lv-modo-toggle').checked;
    lvAplicarIsolamento();
  }

  function lvOnOpacidade() {
    localizadorState.opacidadeFundo = Number(document.getElementById('lv-sl-opacidade').value);
    document.getElementById('lv-val-opacidade').textContent = localizadorState.opacidadeFundo + '%';
    lvAplicarIsolamento();
  }

  function lvGrayToValor(gray) {
    return Math.min(10, Math.max(0, Math.round((1 - gray / 255) * 10)));
  }

  function lvAplicarIsolamento() {
    if (!localizadorState.originalImageData || !localizadorState.modoIsolacao) {
      lvRenderOriginal();
      if (localizadorState.picked) lvClickAt(localizadorState.picked.cx, localizadorState.picked.cy);
      return;
    }
    const c = document.getElementById('lv-canvas');
    const ctx = c.getContext('2d');
    const W = c.width, H = c.height;
    const src = localizadorState.originalImageData.data;
    const gray = localizadorState.grayData;
    const out = ctx.createImageData(W, H);
    const d = out.data;
    const { faixaMin, faixaMax, opacidadeFundo } = localizadorState;
    const bgOpacity = opacidadeFundo / 100;

    for (let i = 0; i < gray.length; i++) {
      const valor = lvGrayToValor(gray[i]);
      const pi = i * 4;
      if (valor >= faixaMin && valor <= faixaMax) {
        d[pi] = src[pi]; d[pi+1] = src[pi+1]; d[pi+2] = src[pi+2]; d[pi+3] = 255;
      } else {
        const avg = Math.round(gray[i]);
        d[pi] = Math.round(avg + (src[pi] - avg) * (1 - bgOpacity));
        d[pi+1] = Math.round(avg + (src[pi+1] - avg) * (1 - bgOpacity));
        d[pi+2] = Math.round(avg + (src[pi+2] - avg) * (1 - bgOpacity));
        d[pi+3] = 255;
      }
    }
    ctx.putImageData(out, 0, 0);
  }

  function lvRenderOriginal() {
    const c = document.getElementById('lv-canvas');
    const ctx = c.getContext('2d');
    ctx.putImageData(localizadorState.originalImageData, 0, 0);
  }

  function lvLimparIsolamento() {
    localizadorState.modoIsolacao = false;
    localizadorState.faixaMin = 0;
    localizadorState.faixaMax = 10;
    const tog = document.getElementById('lv-modo-toggle');
    const slMin = document.getElementById('lv-sl-min');
    const slMax = document.getElementById('lv-sl-max');
    const vlMin = document.getElementById('lv-val-min');
    const vlMax = document.getElementById('lv-val-max');
    if (tog) tog.checked = false;
    if (slMin) slMin.value = 0;
    if (slMax) slMax.value = 10;
    if (vlMin) vlMin.textContent = '0';
    if (vlMax) vlMax.textContent = '10';
    lvRenderOriginal();
    if (localizadorState.picked) lvClickAt(localizadorState.picked.cx, localizadorState.picked.cy);
  }

  function lvClickAt(cx, cy) {
    const c = document.getElementById('lv-canvas');
    const d = localizadorState.imageData.data;
    const idx = (cy * c.width + cx) * 4;
    const r = d[idx], g = d[idx+1], b = d[idx+2];
    const luma = 0.299*r + 0.587*g + 0.114*b;
    const valor = Math.round((1 - luma/255) * 10);
    const hex = '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('');

    document.getElementById('lv-color-preview').style.background = `rgb(${r},${g},${b})`;
    document.getElementById('lv-valor').textContent = valor;
    document.getElementById('lv-r').textContent = r;
    document.getElementById('lv-g').textContent = g;
    document.getElementById('lv-b').textContent = b;
    document.getElementById('lv-hex').textContent = hex;
    document.getElementById('lv-bri').textContent = Math.round(luma/255*100) + '%';

    const zonaBar = document.getElementById('lv-zona-bar');
    zonaBar.innerHTML = '';
    for (let i = 0; i <= 10; i++) {
      const brightness = Math.round((1 - i/10) * 255);
      const div = document.createElement('div');
      div.className = 'flex-1 h-full transition-all ' + (i === valor ? 'ring-2 ring-accent ring-offset-1 ring-offset-bg rounded' : '');
      div.style.background = `rgb(${brightness},${brightness},${brightness})`;
      zonaBar.appendChild(div);
    }
    const nomes = ['Branco Puro','Cinza Muito Claro','Cinza Claro','Cinza Médio Claro','Cinza Médio','Cinza Médio Escuro','Cinza Escuro','Cinza Muito Escuro','Preto Claro','Preto','Preto Puro'];
    document.getElementById('lv-zona-text').textContent = `Zona ${valor}: ${nomes[valor]}`;

    localizadorState.picked = { cx, cy };
  }

  function lvRenderHistograma() {
    const el = document.getElementById('lv-histograma');
    if (!el || !localizadorState.grayData) return;
    const gray = localizadorState.grayData;
    const contagens = new Array(11).fill(0);
    for (let i = 0; i < gray.length; i++) {
      contagens[lvGrayToValor(gray[i])]++;
    }
    const maxC = Math.max(...contagens);
    el.innerHTML = contagens.map((c, i) => {
      const pct = maxC > 0 ? (c / maxC) * 100 : 0;
      const pixels = (c / gray.length * 100).toFixed(1);
      const br = Math.round((1 - i/10) * 255);
      return `
        <div class="flex items-center gap-3 text-xs">
          <span class="w-6 text-right font-mono text-muted">${i}</span>
          <div class="flex-1 h-4 rounded overflow-hidden bg-white/5">
            <div class="h-full rounded transition-all" style="width:${pct}%;background:rgb(${br},${br},${br})"></div>
          </div>
          <span class="w-12 text-right font-mono text-muted">${pixels}%</span>
        </div>`;
    }).join('');
  }

  function lvBaixarImagem() {
    const canvas = document.getElementById('lv-canvas');
    if (!canvas) return;
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a   = document.createElement('a');
      a.href = url; a.download = 'localizar-valor.png';
      document.body.appendChild(a); a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  }

  // ══════════════════════════════════════════════════════════════════════
  // ── 2. EXTRATOR DE PALETA ────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════
  let paletaState = { imageData: null };

  function renderPaleta() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div style="min-height:calc(100vh - 4rem)" class="px-6 py-12 md:py-16">
        <div class="max-w-5xl mx-auto">
          <div class="fade-in mb-10">
            <h1 class="font-display text-4xl md:text-5xl mb-4">Extrair Paleta</h1>
            <p class="text-muted max-w-2xl font-light">Analisa a imagem e extrai as cores dominantes com os valores hex exatos para misturar.</p>
          </div>
          <div id="pe-upload-zone" class="w-full rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 mb-8 cursor-pointer transition-all hover:border-accent/60 hover:bg-white/[0.02]" style="min-height:200px" onclick="document.getElementById('pe-file-input').click()">
            <input type="file" id="pe-file-input" accept="image/jpeg,image/png,image/webp" class="hidden" onchange="peProcessFile(event)" />
            <p class="font-display text-xl text-muted">Clique ou arraste uma imagem</p>
          </div>
          <div id="pe-result" class="hidden">
            <canvas id="pe-canvas" class="w-full rounded-xl border border-white/10 mb-6" style="max-height:350px;object-fit:contain"></canvas>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" id="pe-palette"></div>
          </div>
        </div>
      </div>`;
  }

  function peProcessFile(e) {
    const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('pe-canvas');
        const maxW = 800, maxH = 500;
        let w = img.width, h = img.height;
        if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
        if (h > maxH) { w = Math.round(w * maxH / h); h = maxH; }
        c.width = w; c.height = h;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        paletaState.imageData = ctx.getImageData(0, 0, w, h);
        document.getElementById('pe-result').classList.remove('hidden');
        document.getElementById('pe-upload-zone').innerHTML = `
          <p class="text-muted text-sm">Imagem carregada</p>
          <button onclick="document.getElementById('pe-file-input').value=''; document.getElementById('pe-file-input').click()" class="mt-2 px-4 py-1.5 text-xs rounded-full border border-white/10 text-muted hover:border-accent/40 hover:text-fg transition-colors">Trocar Imagem</button>
        `;
        peExtractPalette();
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  function peExtractPalette() {
    const d = paletaState.imageData.data;
    const numColors = 10;
    const step = Math.max(4, Math.floor(d.length / 4 / 5000));
    const samples = [];
    for (let i = 0; i < d.length; i += step * 4) {
      samples.push([d[i], d[i+1], d[i+2]]);
    }

    let centroids = [];
    for (let i = 0; i < numColors; i++) {
      centroids.push([...samples[Math.floor(Math.random() * samples.length)]]);
    }

    for (let iter = 0; iter < 15; iter++) {
      const clusters = Array.from({length: numColors}, () => []);
      for (const s of samples) {
        let minD = Infinity, minI = 0;
        for (let c = 0; c < numColors; c++) {
          const dist = (s[0]-centroids[c][0])**2 + (s[1]-centroids[c][1])**2 + (s[2]-centroids[c][2])**2;
          if (dist < minD) { minD = dist; minI = c; }
        }
        clusters[minI].push(s);
      }
      for (let c = 0; c < numColors; c++) {
        if (clusters[c].length === 0) continue;
        centroids[c] = [0,0,0];
        for (const s of clusters[c]) { centroids[c][0] += s[0]; centroids[c][1] += s[1]; centroids[c][2] += s[2]; }
        centroids[c] = centroids[c].map(v => Math.round(v / clusters[c].length));
      }
    }

    const totalPixels = samples.length;
    const colorCounts = centroids.map(() => 0);
    for (const s of samples) {
      let minD = Infinity, minI = 0;
      for (let c = 0; c < numColors; c++) {
        const dist = (s[0]-centroids[c][0])**2 + (s[1]-centroids[c][1])**2 + (s[2]-centroids[c][2])**2;
        if (dist < minD) { minD = dist; minI = c; }
      }
      colorCounts[minI]++;
    }

    const palette = centroids.map((c, i) => ({
      r: c[0], g: c[1], b: c[2],
      hex: '#' + c.map(v => v.toString(16).padStart(2,'0')).join(''),
      pct: Math.round(colorCounts[i] / totalPixels * 100)
    })).sort((a, b) => b.pct - a.pct);

    const cont = document.getElementById('pe-palette');
    cont.innerHTML = palette.map(p => {
      const luma = 0.299*p.r + 0.587*p.g + 0.114*p.b;
      const textColor = luma > 140 ? '#000000' : '#ffffff';
      return `<div class="rounded-xl border border-white/10 overflow-hidden">
        <div class="h-20 flex items-end justify-between px-3 pb-2" style="background:${p.hex}">
          <span class="text-xs font-mono font-bold px-1.5 py-0.5 rounded" style="background:rgba(0,0,0,0.4);color:#fff">${p.hex}</span>
          <span class="text-xs font-mono px-1.5 py-0.5 rounded" style="background:rgba(0,0,0,0.4);color:#fff">${p.pct}%</span>
        </div>
        <div class="px-3 py-2 bg-card text-xs text-muted">
          <span>R:${p.r} G:${p.g} B:${p.b}</span>
        </div>
      </div>`;
    }).join('');
  }

  // ══════════════════════════════════════════════════════════════════════
  // ── 3. SIMULADOR DE CAMADAS ──────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════
  let camadasState = { imageData: null };

  function renderCamadas() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div style="min-height:calc(100vh - 4rem)" class="px-6 py-12 md:py-16">
        <div class="max-w-6xl mx-auto">
          <div class="fade-in mb-10">
            <h1 class="font-display text-4xl md:text-5xl mb-4">Simulador de Camadas</h1>
            <p class="text-muted max-w-2xl font-light">Visualize a ordem ideal de pintura: fundo → formas médias → sombras → detalhes → destaques.</p>
          </div>
          <div id="ly-upload-zone" class="w-full rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 mb-8 cursor-pointer transition-all hover:border-accent/60 hover:bg-white/[0.02]" style="min-height:200px" onclick="document.getElementById('ly-file-input').click()">
            <input type="file" id="ly-file-input" accept="image/jpeg,image/png,image/webp" class="hidden" onchange="lyProcessFile(event)" />
            <p class="font-display text-xl text-muted">Clique ou arraste uma imagem</p>
          </div>
          <div id="ly-result" class="hidden">
            <div class="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-muted mb-3">Original</p>
                <canvas id="ly-canvas-orig" class="w-full rounded-xl border border-white/10" style="max-height:400px;object-fit:contain"></canvas>
              </div>
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-accent mb-3" id="ly-layer-label">Camada 1: Fundo</p>
                <canvas id="ly-canvas-layer" class="w-full rounded-xl border border-white/10" style="max-height:400px;object-fit:contain"></canvas>
              </div>
            </div>
            <div class="flex flex-wrap gap-2 justify-center mb-6">
              <button onclick="lyShowLayer(0)" class="ly-btn px-4 py-2 rounded-full text-sm border border-accent text-accent transition">1. Fundo</button>
              <button onclick="lyShowLayer(1)" class="ly-btn px-4 py-2 rounded-full text-sm border border-white/10 text-muted hover:border-accent/40 transition">2. Formas</button>
              <button onclick="lyShowLayer(2)" class="ly-btn px-4 py-2 rounded-full text-sm border border-white/10 text-muted hover:border-accent/40 transition">3. Sombras</button>
              <button onclick="lyShowLayer(3)" class="ly-btn px-4 py-2 rounded-full text-sm border border-white/10 text-muted hover:border-accent/40 transition">4. Detalhes</button>
              <button onclick="lyShowLayer(4)" class="ly-btn px-4 py-2 rounded-full text-sm border border-white/10 text-muted hover:border-accent/40 transition">5. Destaques</button>
            </div>
            <div class="p-5 rounded-xl border border-white/10 bg-white/[0.02] max-w-2xl mx-auto">
              <p id="ly-tip" class="text-sm text-muted leading-relaxed"></p>
            </div>
          </div>
        </div>
      </div>`;
  }

  function lyProcessFile(e) {
    const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        const maxW = 600, maxH = 450;
        let w = img.width, h = img.height;
        if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
        if (h > maxH) { w = Math.round(w * maxH / h); h = maxH; }

        const cOrig = document.getElementById('ly-canvas-orig');
        cOrig.width = w; cOrig.height = h;
        const ctxO = cOrig.getContext('2d');
        ctxO.drawImage(img, 0, 0, w, h);
        camadasState.imageData = ctxO.getImageData(0, 0, w, h);
        camadasState.w = w;
        camadasState.h = h;

        document.getElementById('ly-result').classList.remove('hidden');
        document.getElementById('ly-upload-zone').innerHTML = `
          <p class="text-muted text-sm">Imagem carregada</p>
          <button onclick="document.getElementById('ly-file-input').value=''; document.getElementById('ly-file-input').click()" class="mt-2 px-4 py-1.5 text-xs rounded-full border border-white/10 text-muted hover:border-accent/40 hover:text-fg transition-colors">Trocar Imagem</button>
        `;
        lyShowLayer(0);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  function lyShowLayer(layer) {
    const { imageData, w, h } = camadasState;
    const src = new Uint8ClampedArray(imageData.data);
    const cRes = document.getElementById('ly-canvas-layer');
    cRes.width = w; cRes.height = h;
    const ctx = cRes.getContext('2d');

    const d = new Uint8ClampedArray(src);
    const tips = [
      'Camada 1 — Fundo: Pinte toda a tela com um tom médio que represente o tom geral da imagem. Use pinceladas largas. Não se preocupe com detalhes.',
      'Camada 2 — Formas: Identifique as formas principais e pinte suas silhuetas com valores aproximados. Use pincéis médios.',
      'Camada 3 — Sombras: Adicione as regiões mais escuras. Defina a direção da luz e pinte as sombras projetadas e de forma.',
      'Camada 4 — Detalhes: Trabalhe nos detalhes finos — texturas, bordas, transições suaves. Use pincéis pequenos.',
      'Camada 5 — Destaques: Por último, adicione os pontos mais brilhantes da imagem. São poucos mas definem o realismo.'
    ];

    const names = ['Camada 1: Fundo', 'Camada 2: Formas', 'Camada 3: Sombras', 'Camada 4: Detalhes', 'Camada 5: Destaques'];

    if (layer === 0) {
      let rSum = 0, gSum = 0, bSum = 0, count = 0;
      for (let i = 0; i < src.length; i += 4) { rSum += src[i]; gSum += src[i+1]; bSum += src[i+2]; count++; }
      const rAvg = Math.round(rSum/count), gAvg = Math.round(gSum/count), bAvg = Math.round(bSum/count);
      ctx.fillStyle = `rgb(${rAvg},${gAvg},${bAvg})`;
      ctx.fillRect(0, 0, w, h);
    } else if (layer === 1) {
      for (let i = 0; i < d.length; i += 4) {
        const gray = Math.round(0.299*d[i] + 0.587*d[i+1] + 0.114*d[i+2]);
        let v;
        if (gray < 51) v = 20;
        else if (gray < 102) v = 60;
        else if (gray < 153) v = 110;
        else if (gray < 204) v = 180;
        else v = 235;
        d[i] = d[i+1] = d[i+2] = v;
      }
      ctx.putImageData(new ImageData(d, w, h), 0, 0);
    } else if (layer === 2) {
      for (let i = 0; i < d.length; i += 4) {
        const gray = Math.round(0.299*d[i] + 0.587*d[i+1] + 0.114*d[i+2]);
        d[i] = d[i+1] = d[i+2] = gray < 80 ? gray : 200;
        d[i+3] = gray < 80 ? 255 : 60;
      }
      ctx.fillStyle = '#f0ece5';
      ctx.fillRect(0, 0, w, h);
      ctx.putImageData(new ImageData(d, w, h), 0, 0);
    } else if (layer === 3) {
      for (let i = 0; i < d.length; i += 4) {
        const gray = Math.round(0.299*d[i] + 0.587*d[i+1] + 0.114*d[i+2]);
        const edge = i > w*4 && i < d.length - w*4 ? Math.abs(gray - Math.round(0.299*d[i-w*4] + 0.587*d[i-w*4+1] + 0.114*d[i-w*4+2])) : 0;
        const show = edge > 15 || (gray > 200) || (gray < 30);
        d[i] = show ? src[i] : 230;
        d[i+1] = show ? src[i+1] : 225;
        d[i+2] = show ? src[i+2] : 220;
        d[i+3] = 255;
      }
      ctx.putImageData(new ImageData(d, w, h), 0, 0);
    } else if (layer === 4) {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < d.length; i += 4) {
        const gray = Math.round(0.299*src[i] + 0.587*src[i+1] + 0.114*src[i+2]);
        if (gray > 200) {
          d[i] = src[i]; d[i+1] = src[i+1]; d[i+2] = src[i+2]; d[i+3] = 255;
        } else {
          d[i+3] = 0;
        }
      }
      ctx.putImageData(new ImageData(d, w, h), 0, 0);
    }

    document.getElementById('ly-layer-label').textContent = names[layer];
    document.getElementById('ly-tip').textContent = tips[layer];

    document.querySelectorAll('.ly-btn').forEach((btn, i) => {
      btn.className = 'ly-btn px-4 py-2 rounded-full text-sm transition ' + (i === layer ? 'border border-accent text-accent' : 'border border-white/10 text-muted hover:border-accent/40');
    });
  }

  // ══════════════════════════════════════════════════════════════════════
  // ── 4. EXERCÍCIOS PROGRESSIVOS ───────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════
  function renderExercicios() {
    const semanas = [
      { semana: 1, titulo: 'Escala de Cinzas', foco: 'Valor tonal', exercicios: [
        { nome: 'Barra de 11 valores', desc: 'Pinte uma barra contínua do branco ao preto em 11 passos iguais. Use apenas preto e branco.', tempo: '2h', dificuldade: 'Fácil' },
        { nome: 'Esfera em grayscale', desc: 'Pinte uma esfera com sombra, meia-tom e destaque usando apenas valores.', tempo: '3h', dificuldade: 'Médio' },
        { nome: 'Cubo com luz direcional', desc: 'Pratique 3 planos com valores distintos sob uma mesma fonte de luz.', tempo: '2h', dificuldade: 'Fácil' },
      ]},
      { semana: 2, titulo: 'Misturas e Proporções', foco: 'Controle de tom', exercicios: [
        { nome: 'Cartela de 50 cinzas', desc: 'Misture 50 tons de cinza partindo de proporções exatas de preto e branco.', tempo: '3h', dificuldade: 'Médio' },
        { nome: 'Degradê vertical', desc: 'Pinte um degradê suave de 30cm sem bandas visíveis.', tempo: '2h', dificuldade: 'Médio' },
        { nome: 'Match de valor', desc: 'Use um cartão cinza de referência e tente reproduzir o mesmo tom na tela.', tempo: '1h', dificuldade: 'Fácil' },
      ]},
      { semana: 3, titulo: 'Formas e Silhuetas', foco: 'Contorno e preenchimento', exercicios: [
        { nome: 'Natur-morto simplificado', desc: 'Reduza uma natureza-morta a 3 valores: fundo, objeto claro, objeto escuro.', tempo: '3h', dificuldade: 'Médio' },
        { nome: 'Silhuetas de frutas', desc: 'Pinte apenas as silhuetas de frutas usando um único valor médio.', tempo: '2h', dificuldade: 'Fácil' },
        { nome: 'Composição com recortes', desc: 'Crie uma composição onde o negative space é tão importante quanto o positive.', tempo: '3h', dificuldade: 'Difícil' },
      ]},
      { semana: 4, titulo: 'Transições e Blending', foco: 'Suavidade de tons', exercicios: [
        { nome: 'Bola de bilhar', desc: 'Pinte uma esfera com reflexo especular e sombra de oclusão.', tempo: '4h', dificuldade: 'Difícil' },
        { nome: 'Rosto em escala de cinzas', desc: 'Use a técnica de grade para transferir um retrato em P&B.', tempo: '6h', dificuldade: 'Difícil' },
        { nome: 'Tecido dobrado', desc: 'Pratique dobras e sombras em tecido branco sobre fundo escuro.', tempo: '3h', dificuldade: 'Médio' },
      ]},
      { semana: 5, titulo: 'Texturas', foco: 'Superfícies diferentes', exercicios: [
        { nome: 'Madeira', desc: 'Pinte a textura de madeira com veios e variações de tom.', tempo: '3h', dificuldade: 'Médio' },
        { nome: 'Metal', desc: 'Trabalhe reflexos especulares e sombras duras em uma superfície metálica.', tempo: '3h', dificuldade: 'Médio' },
        { nome: 'Pele humana', desc: 'Pratique tons de pele com transições suaves e poros simulados.', tempo: '4h', dificuldade: 'Difícil' },
      ]},
      { semana: 6, titulo: 'Luz e Sombra', foco: 'Direção e intensidade', exercicios: [
        { nome: 'Retrato com chiaroscuro', desc: 'Use contraste extremo de luz e sombra no estilo Caravaggio.', tempo: '5h', dificuldade: 'Difícil' },
        { nome: 'Sombras projetadas', desc: 'Pinte um objeto projetando sombra em superfície curva.', tempo: '3h', dificuldade: 'Médio' },
        { nome: 'Luz ambiente', desc: 'Cena com múltiplas fontes de luz e sombras coloridas.', tempo: '4h', dificuldade: 'Difícil' },
      ]},
      { semana: 7, titulo: 'Referência e Grade', foco: 'Transferência precisa', exercicios: [
        { nome: 'Retrato com grade 5×5', desc: 'Use o quadricular para transferir um retrato com precisão.', tempo: '6h', dificuldade: 'Difícil' },
        { nome: 'Detalhe ampliado', desc: 'Amplie um olho ou boca e pinte com grade densa (10×10).', tempo: '5h', dificuldade: 'Difícil' },
        { nome: 'Comparação lado a lado', desc: 'Pinte ao lado da referência e use o comparador para ajustar valores.', tempo: '4h', dificuldade: 'Médio' },
      ]},
      { semana: 8, titulo: 'Projeto Final', foco: 'Integração completa', exercicios: [
        { nome: 'Hiperrealismo: objeto', desc: 'Escolha um objeto com textura e luz definida. Pinte em tamanho real.', tempo: '8h', dificuldade: 'Difícil' },
        { nome: 'Hiperrealismo: retrato', desc: 'Retrato completo usando todas as técnicas das semanas anteriores.', tempo: '10h', dificuldade: 'Difícil' },
      ]},
    ];

    const app = document.getElementById('app');
    app.innerHTML = `
      <div style="min-height:calc(100vh - 4rem)" class="px-6 py-12 md:py-16">
        <div class="max-w-4xl mx-auto">
          <div class="fade-in mb-10">
            <h1 class="font-display text-4xl md:text-5xl mb-4">Exercícios Progressivos</h1>
            <p class="text-muted max-w-2xl font-light">8 semanas estruturadas do básico ao hiperrealismo. Cada semana tem um foco e exercícios práticos.</p>
          </div>
          <div class="space-y-4">
            ${semanas.map(s => `
              <div class="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                <button onclick="this.parentElement.classList.toggle('open')" class="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors">
                  <div class="flex items-center gap-4">
                    <span class="w-10 h-10 rounded-xl bg-accent/10 text-accent font-display text-lg flex items-center justify-center font-bold">${s.semana}</span>
                    <div>
                      <p class="font-display text-lg text-fg">${s.titulo}</p>
                      <p class="text-xs text-muted">${s.foco} · ${s.exercicios.length} exercícios</p>
                    </div>
                  </div>
                  <svg class="w-5 h-5 text-muted transition-transform" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 9l-7 7-7-7"/></svg>
                </button>
                <div class="exercises-list hidden px-6 pb-4 space-y-3">
                  ${s.exercicios.map(ex => `
                    <div class="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                      <div class="flex items-start justify-between gap-3 mb-1">
                        <p class="text-sm font-medium text-fg">${ex.nome}</p>
                        <span class="text-[10px] px-2 py-0.5 rounded-full border ${ex.dificuldade === 'Fácil' ? 'border-green-500/30 text-green-400' : ex.dificuldade === 'Médio' ? 'border-yellow-500/30 text-yellow-400' : 'border-red-500/30 text-red-400'}">${ex.dificuldade}</span>
                      </div>
                      <p class="text-xs text-muted leading-relaxed">${ex.desc}</p>
                      <p class="text-[10px] text-accent mt-2">⏱ ${ex.tempo}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>`;

    document.querySelectorAll('.exercises-list').forEach(el => {
      el.previousElementSibling.addEventListener('click', () => {
        el.classList.toggle('hidden');
        el.previousElementSibling.querySelector('svg').classList.toggle('rotate-180');
      });
    });
  }

  // ══════════════════════════════════════════════════════════════════════
  // ── 5. ANÁLISE DE LUZ ────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════
  let luzState = { imageData: null };

  function renderLuz() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div style="min-height:calc(100vh - 4rem)" class="px-6 py-12 md:py-16">
        <div class="max-w-5xl mx-auto">
          <div class="fade-in mb-10">
            <h1 class="font-display text-4xl md:text-5xl mb-4">Análise de Luz</h1>
            <p class="text-muted max-w-2xl font-light">Identifica a direção da luz na referência e mostra como ela afeta os valores em cada zona da imagem.</p>
          </div>
          <div id="la-upload-zone" class="w-full rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 mb-8 cursor-pointer transition-all hover:border-accent/60 hover:bg-white/[0.02]" style="min-height:200px" onclick="document.getElementById('la-file-input').click()">
            <input type="file" id="la-file-input" accept="image/jpeg,image/png,image/webp" class="hidden" onchange="laProcessFile(event)" />
            <p class="font-display text-xl text-muted">Clique ou arraste uma imagem</p>
          </div>
          <div id="la-result" class="hidden">
            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-muted mb-3">Original</p>
                <canvas id="la-canvas-orig" class="w-full rounded-xl border border-white/10" style="max-height:400px;object-fit:contain"></canvas>
              </div>
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-accent mb-3">Mapa de Luz</p>
                <canvas id="la-canvas-map" class="w-full rounded-xl border border-white/10" style="max-height:400px;object-fit:contain"></canvas>
              </div>
            </div>
            <div class="grid md:grid-cols-3 gap-4 mb-6">
              <div class="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                <p class="text-xs uppercase tracking-[0.2em] text-accent mb-3">Direção da Luz</p>
                <div class="flex items-center gap-4">
                  <div id="la-arrow" class="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-2xl">↘</div>
                  <div>
                    <p id="la-direction" class="text-fg font-medium">Superior Esquerda</p>
                    <p id="la-angle" class="text-xs text-muted mt-1">~135°</p>
                  </div>
                </div>
              </div>
              <div class="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                <p class="text-xs uppercase tracking-[0.2em] text-accent mb-3">Zonas de Luz</p>
                <div id="la-zones" class="space-y-1.5"></div>
              </div>
              <div class="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                <p class="text-xs uppercase tracking-[0.2em] text-accent mb-3">Contraste</p>
                <p id="la-contrast-val" class="text-3xl font-display font-bold text-fg mb-1"></p>
                <p id="la-contrast-desc" class="text-xs text-muted"></p>
                <div class="mt-3 h-2 rounded-full overflow-hidden bg-white/5">
                  <div id="la-contrast-bar" class="h-full rounded-full transition-all" style="width:50%"></div>
                </div>
              </div>
            </div>
            <div class="p-5 rounded-xl border border-white/10 bg-white/[0.02] max-w-2xl mx-auto">
              <p id="la-tip" class="text-sm text-muted leading-relaxed"></p>
            </div>
          </div>
        </div>
      </div>`;
  }

  function laProcessFile(e) {
    const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        const maxW = 600, maxH = 450;
        let w = img.width, h = img.height;
        if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
        if (h > maxH) { w = Math.round(w * maxH / h); h = maxH; }

        const cOrig = document.getElementById('la-canvas-orig');
        cOrig.width = w; cOrig.height = h;
        const ctxO = cOrig.getContext('2d');
        ctxO.drawImage(img, 0, 0, w, h);
        luzState.imageData = ctxO.getImageData(0, 0, w, h);
        luzState.w = w;
        luzState.h = h;

        document.getElementById('la-result').classList.remove('hidden');
        document.getElementById('la-upload-zone').innerHTML = `
          <p class="text-muted text-sm">Imagem carregada</p>
          <button onclick="document.getElementById('la-file-input').value=''; document.getElementById('la-file-input').click()" class="mt-2 px-4 py-1.5 text-xs rounded-full border border-white/10 text-muted hover:border-accent/40 hover:text-fg transition-colors">Trocar Imagem</button>
        `;
        laAnalyze();
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  function laAnalyze() {
    const { imageData, w, h } = luzState;
    const src = imageData.data;

    const cMap = document.getElementById('la-canvas-map');
    cMap.width = w; cMap.height = h;
    const ctx = cMap.getContext('2d');
    const mapData = ctx.createImageData(w, h);

    let totalLuma = 0, count = 0;
    let minLuma = 255, maxLuma = 0;
    for (let i = 0; i < src.length; i += 4) {
      const luma = 0.299*src[i] + 0.587*src[i+1] + 0.114*src[i+2];
      totalLuma += luma; count++;
      if (luma < minLuma) minLuma = luma;
      if (luma > maxLuma) maxLuma = luma;
    }
    const avgLuma = totalLuma / count;

    for (let i = 0; i < src.length; i += 4) {
      const luma = 0.299*src[i] + 0.587*src[i+1] + 0.114*src[i+2];
      const norm = (luma - minLuma) / (maxLuma - minLuma);
      const r = Math.round(norm * 255);
      const b = Math.round((1 - norm) * 255);
      mapData.data[i] = r;
      mapData.data[i+1] = Math.round(norm * 80);
      mapData.data[i+2] = b;
      mapData.data[i+3] = 255;
    }
    ctx.putImageData(mapData, 0, 0);

    let topLuma = 0, botLuma = 0, leftLuma = 0, rightLuma = 0;
    let topN = 0, botN = 0, leftN = 0, rightN = 0;
    const halfH = Math.floor(h/2), halfW = Math.floor(w/2);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const luma = 0.299*src[(y*w+x)*4] + 0.587*src[(y*w+x)*4+1] + 0.114*src[(y*w+x)*4+2];
        if (y < halfH) { topLuma += luma; topN++; }
        else { botLuma += luma; botN++; }
        if (x < halfW) { leftLuma += luma; leftN++; }
        else { rightLuma += luma; rightN++; }
      }
    }
    const topAvg = topLuma/topN, botAvg = botLuma/botN;
    const leftAvg = leftLuma/leftN, rightAvg = rightLuma/rightN;

    const yBias = topAvg - botAvg;
    const xBias = leftAvg - rightAvg;
    const angle = Math.atan2(-yBias, xBias) * 180 / Math.PI;
    const normalizedAngle = ((angle % 360) + 360) % 360;

    let arrow, direction;
    if (normalizedAngle > 315 || normalizedAngle <= 45) { arrow = '→'; direction = 'Direita'; }
    else if (normalizedAngle > 45 && normalizedAngle <= 135) { arrow = '↓'; direction = 'Abaixo'; }
    else if (normalizedAngle > 135 && normalizedAngle <= 225) { arrow = '←'; direction = 'Esquerda'; }
    else { arrow = '↑'; direction = 'Acima'; }

    if (Math.abs(yBias) > 30 && Math.abs(xBias) > 30) {
      const diagAngle = Math.atan2(yBias > 0 ? -1 : 1, xBias > 0 ? -1 : 1);
      const deg = diagAngle * 180 / Math.PI;
      if (deg > -45 && deg <= 45) { arrow = '↘'; direction = 'Superior Esquerda'; }
      else if (deg > 45 && deg <= 135) { arrow = '↗'; direction = 'Inferior Esquerda'; }
      else if (deg > -135 && deg <= -45) { arrow = '↙'; direction = 'Superior Direita'; }
      else { arrow = '↖'; direction = 'Inferior Direita'; }
    }

    document.getElementById('la-arrow').textContent = arrow;
    document.getElementById('la-direction').textContent = direction;
    document.getElementById('la-angle').textContent = '~' + Math.round(normalizedAngle) + '°';

    const zoneLabels = [
      { pct: Math.round(src.filter((_,i) => i%4===0 && 0.299*src[i]+0.587*src[i+1]+0.114*src[i+2] > 230).length / (w*h) * 100), label: 'Destaques', color: 'bg-white' },
      { pct: Math.round(src.filter((_,i) => i%4===0 && {l: 0.299*src[i]+0.587*src[i+1]+0.114*src[i+2]}.l > 180 && {l: 0.299*src[i]+0.587*src[i+1]+0.114*src[i+2]}.l <= 230).length / (w*h) * 100), label: 'Claras', color: 'bg-gray-300' },
      { pct: Math.round(src.filter((_,i) => i%4===0 && {l: 0.299*src[i]+0.587*src[i+1]+0.114*src[i+2]}.l > 75 && {l: 0.299*src[i]+0.587*src[i+1]+0.114*src[i+2]}.l <= 180).length / (w*h) * 100), label: 'Médios', color: 'bg-gray-500' },
      { pct: Math.round(src.filter((_,i) => i%4===0 && {l: 0.299*src[i]+0.587*src[i+1]+0.114*src[i+2]}.l > 25 && {l: 0.299*src[i]+0.587*src[i+1]+0.114*src[i+2]}.l <= 75).length / (w*h) * 100), label: 'Escuras', color: 'bg-gray-700' },
      { pct: Math.round(src.filter((_,i) => i%4===0 && 0.299*src[i]+0.587*src[i+1]+0.114*src[i+2] <= 25).length / (w*h) * 100), label: 'Sombras', color: 'bg-gray-900' },
    ];

    document.getElementById('la-zones').innerHTML = zoneLabels.map(z =>
      `<div class="flex items-center gap-2 text-xs"><div class="w-3 h-3 rounded ${z.color} border border-white/10"></div><span class="text-muted flex-1">${z.label}</span><span class="text-fg font-mono">${z.pct}%</span></div>`
    ).join('');

    const contrast = maxLuma - minLuma;
    const contrastPct = Math.round(contrast / 255 * 100);
    document.getElementById('la-contrast-val').textContent = contrastPct + '%';
    const bar = document.getElementById('la-contrast-bar');
    bar.style.width = contrastPct + '%';
    bar.style.background = contrastPct > 70 ? '#22c55e' : contrastPct > 40 ? '#eab308' : '#ef4444';
    document.getElementById('la-contrast-desc').textContent = contrastPct > 70 ? 'Alto contraste — luz e sombra bem definidas' : contrastPct > 40 ? 'Contraste médio — tons intermediários dominam' : 'Baixo contraste — pouca variação tonal';

    document.getElementById('la-tip').innerHTML = `<span class="text-accent font-medium">Dica:</span> A luz vem de <span class="text-fg font-medium">${direction}</span>. Ao pintar, comece pelas sombras do lado oposto e vá adicionando luz gradualmente. Contraste de <span class="text-fg font-medium">${contrastPct}%</span> — ${contrastPct > 70 ? 'use preto puro nas sombras e branco nos destaques.' : contrastPct > 40 ? 'evite preto puro, use camadas de cinza escuro.' : 'foque em transições suaves de meia-tom.'}`;
  }


    navigate('home');