#!/usr/bin/env node
// ── Gerador de Áudio via OpenAI TTS ────────────────────────────────────
// Uso: node gerar-audio.js <roteiro.json> [--test] [--voz <nome>]

const fs = require('fs');
const path = require('path');

const API_KEY = fs.readFileSync(path.join(__dirname, 'apiKey.txt'), 'utf8').trim();
const OPENAI_URL = 'https://api.openai.com/v1/audio/speech';
const SAMPLE_RATE = 24000;

const args = process.argv.slice(2);
const roteiroPath = args.find(a => !a.startsWith('--')) || 'audio/roteiro.json';
const testMode = args.includes('--test');
const vozArg = args.find((a, i) => args[i - 1] === '--voz') || null;
const DEFAULT_VOZ = vozArg || 'nova';

async function gerarVoz(texto, voz, arquivo) {
  console.log(`  🔊 Gerando voz (${voz}): ${arquivo}`);
  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini-tts',
      input: texto,
      voice: voz,
      response_format: 'wav',
      instructions: 'Fale de forma natural, pausada e envolvente, como um narrador de documentário brasileiro. Tom solene mas acessível.',
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Erro OpenAI (${res.status}): ${err}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(arquivo, buffer);
  const duracao = (buffer.length / (SAMPLE_RATE * 2)).toFixed(1);
  console.log(`  ✅ Salvo: ${arquivo} (${duracao}s, ${(buffer.length / 1024).toFixed(0)}KB)`);
  return duracao;
}

function gerarSilencio(duracao, arquivo) {
  console.log(`  🔇 Gerando silêncio: ${arquivo}`);
  const numSamples = Math.floor(SAMPLE_RATE * duracao);
  const header = Buffer.alloc(44);
  const dataSize = numSamples * 2;
  const fileSize = 36 + dataSize;

  header.write('RIFF', 0);
  header.writeUInt32LE(fileSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(SAMPLE_RATE, 24);
  header.writeUInt32LE(SAMPLE_RATE * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  const silence = Buffer.alloc(numSamples * 2, 0);
  const wav = Buffer.concat([header, silence]);
  fs.writeFileSync(arquivo, wav);
  console.log(`  ✅ Salvo: ${arquivo} (${duracao}s, silêncio)`);
  return duracao;
}

async function main() {
  const roteiro = JSON.parse(fs.readFileSync(roteiroPath, 'utf8'));
  const outDir = path.dirname(roteiroPath);

  console.log(`\n🎬 Gerador de Áudio — ${roteiro.length} trechos\n`);

  if (testMode) {
    console.log('🧪 MODO TESTE — gerando trecho 01 com 3 vozes:\n');
    const trecho = roteiro.find(t => t.tipo === 'voz');
    if (!trecho) { console.log('Nenhum trecho de voz encontrado.'); return; }

    const vozes = ['nova', 'shimmer', 'onyx'];
    for (const voz of vozes) {
      const arquivo = path.join(outDir, `teste-01-${voz}.wav`);
      await gerarVoz(trecho.texto, voz, arquivo);
    }
    console.log('\n✅ Teste completo! Ouça os 3 arquivos e escolha a voz.\n');
    return;
  }

  const voz = DEFAULT_VOZ;
  console.log(`🎙️  Voz: ${voz}\n`);

  let totalDuracao = 0;
  for (let i = 0; i < roteiro.length; i++) {
    const item = roteiro[i];
    const arquivo = path.join(outDir, item.arquivo);
    console.log(`[${i + 1}/${roteiro.length}]`);

    if (item.tipo === 'silencio') {
      const d = gerarSilencio(item.duracao || 4, arquivo);
      totalDuracao += d;
    } else {
      const d = await gerarVoz(item.texto, voz, arquivo);
      totalDuracao += parseFloat(d);
    }

    // Pequena pausa entre requests pra não rate-limitar
    if (i < roteiro.length - 1) await new Promise(r => setTimeout(r, 500));
  }

  console.log(`\n✅ Completo! ${roteiro.length} arquivos gerados.`);
  console.log(`⏱️  Duração total: ~${Math.floor(totalDuracao / 60)}min ${Math.floor(totalDuracao % 60)}s`);
  console.log(`📁 Pasta: ${outDir}\n`);
}

main().catch(err => { console.error('❌', err.message); process.exit(1); });
