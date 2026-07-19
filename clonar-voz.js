#!/usr/bin/env node
// ============================================================
//  Clonagem de Voz — ElevenLabs API
// ============================================================
//  Uso:
//    1. Criar conta em https://elevenlabs.io (grátis)
//    2. Pegar API key em https://elevenlabs.io/app/settings/api-keys
//    3. Salvar a key em: elevenlabs-key.txt
//    4. Gravar 30s da sua voz (WAV, 24kHz, mono)
//    5. node clonar-voz.js gravar    → grava amostra via microphone
//    6. node clonar-voz.js criar     → clona a voz na ElevenLabs
//    7. node clonar-voz.js gerar     → gera narração com a voz clonada
// ============================================================

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const API_KEY_FILE = path.join(__dirname, 'elevenlabs-key.txt');
const VOICE_ID_FILE = path.join(__dirname, 'audio', 'elevenlabs-voice-id.txt');
const ROTEIRO_FILE = path.join(__dirname, 'audio', 'roteiro.json');
const AMOSTRA_FILE = path.join(__dirname, 'audio', 'minha-voz-amostra.wav');
const OUTPUT_DIR = path.join(__dirname, 'audio');

const ELEVENLABS_BASE = 'api.elevenlabs.io';

// ── Helpers ──────────────────────────────────────────────────

function getApiKey() {
  if (!fs.existsSync(API_KEY_FILE)) {
    console.error('❌ Arquivo elevenlabs-key.txt não encontrado.');
    console.error('   Crie o arquivo com sua API key do ElevenLabs.');
    process.exit(1);
  }
  return fs.readFileSync(API_KEY_FILE, 'utf8').trim();
}

function request(options, body = null) {
  return new Promise((resolve, reject) => {
    const proto = options.port === 443 ? https : http;
    const req = proto.request(options, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const raw = Buffer.concat(chunks).toString('utf8');
        try {
          resolve({ status: res.statusCode, data: JSON.parse(raw) });
        } catch {
          resolve({ status: res.statusCode, data: raw });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

// ── Comandos ─────────────────────────────────────────────────

async function criarVoz() {
  const apiKey = getApiKey();

  if (!fs.existsSync(AMOSTRA_FILE)) {
    console.error(`❌ Amostra de voz não encontrada: ${AMOSTRA_FILE}`);
    console.error('   Execute primeiro: node clonar-voz.js amostra');
    console.error('   Ou coloque manualmente um WAV de 30s nesse caminho.');
    process.exit(1);
  }

  const audioBuffer = fs.readFileSync(AMOSTRA_FILE);
  const audioBase64 = audioBuffer.toString('base64');

  console.log('🎙️  Clonando voz na ElevenLabs...');
  console.log(`   Arquivo: ${(audioBuffer.length / 1024).toFixed(0)}KB`);

  const body = JSON.stringify({
    name: 'Leo Barbosa',
    description: 'Voz do artista Leo Barbosa — narração documental',
    files: [audioBase64],
    labels: {
      accent: 'brazilian',
      gender: 'male',
      use_case: 'narration'
    }
  });

  const res = await request({
    hostname: ELEVENLABS_BASE,
    path: '/v1/voices/add',
    method: 'POST',
    port: 443,
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    }
  }, body);

  if (res.status !== 200 && res.status !== 201) {
    console.error(`❌ Erro ${res.status}:`, JSON.stringify(res.data, null, 2));
    process.exit(1);
  }

  const voiceId = res.data.voice_id;
  console.log(`\n✅ Voz clonada com sucesso!`);
  console.log(`   Voice ID: ${voiceId}`);
  console.log(`   Nome: ${res.data.name}`);

  fs.writeFileSync(VOICE_ID_FILE, voiceId, 'utf8');
  console.log(`   Salvo em: ${VOICE_ID_FILE}`);

  return voiceId;
}

async function gerarAudio() {
  const apiKey = getApiKey();

  if (!fs.existsSync(VOICE_ID_FILE)) {
    console.error('❌ Voice ID não encontrado.');
    console.error('   Execute primeiro: node clonar-voz.js criar');
    process.exit(1);
  }

  const voiceId = fs.readFileSync(VOICE_ID_FILE, 'utf8').trim();
  const roteiro = JSON.parse(fs.readFileSync(ROTEIRO_FILE, 'utf8'));

  console.log(`🎙️  Gerando narração com voz clonada (ID: ${voiceId})`);
  console.log(`   ${roteiro.length} trechos\n`);

  const vozEntries = roteiro.filter(e => e.tipo === 'voz');

  for (let i = 0; i < vozEntries.length; i++) {
    const entry = vozEntries[i];
    const outFile = path.join(OUTPUT_DIR, entry.arquivo);
    const progress = `[${i + 1}/${vozEntries.length}]`;
    const preview = entry.texto.substring(0, 60) + '...';

    process.stdout.write(`🔊 ${progress} ${entry.arquivo}\n   ${preview}\n`);

    const body = JSON.stringify({
      model_id: 'eleven_multilingual_v2',
      text: entry.texto,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.3,
        use_speaker_boost: true
      }
    });

    const res = await request({
      hostname: ELEVENLABS_BASE,
      path: `/v1/text-to-speech/${voiceId}`,
      method: 'POST',
      port: 443,
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    }, body);

    if (res.status !== 200) {
      console.error(`   ❌ Erro ${res.status}:`, typeof res.data === 'string' ? res.data.substring(0, 200) : JSON.stringify(res.data));
      continue;
    }

    // res.data é o buffer de áudio (binário)
    // Precisamos usar o request raw para obter o buffer
    const audioData = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: ELEVENLABS_BASE,
        path: `/v1/text-to-speech/${voiceId}`,
        method: 'POST',
        port: 443,
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg'
        }
      }, (res) => {
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      });
      req.on('error', reject);
      req.write(body);
      req.end();
    });

    fs.writeFileSync(outFile, audioData);
    const sizeKB = (audioData.length / 1024).toFixed(0);
    console.log(`   ✅ Salvo (${sizeKB}KB)\n`);

    // Pequena pausa entre requests
    if (i < vozEntries.length - 1) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  console.log('✅ Narração completa gerada!');
}

// ── Listar vozes ─────────────────────────────────────────────

async function listarVozes() {
  const apiKey = getApiKey();

  const res = await request({
    hostname: ELEVENLABS_BASE,
    path: '/v1/voices',
    method: 'GET',
    port: 443,
    headers: { 'xi-api-key': apiKey }
  });

  if (res.status !== 200) {
    console.error(`❌ Erro ${res.status}:`, JSON.stringify(res.data));
    process.exit(1);
  }

  const voices = res.data.voices || [];
  console.log(`\n📋 ${voices.length} vozes disponíveis:\n`);

  for (const v of voices) {
    const labels = v.labels || {};
    console.log(`  🎤 ${v.name}`);
    console.log(`     ID: ${v.voice_id}`);
    console.log(`     Accent: ${labels.accent || '—'} | Gender: ${labels.gender || '—'}`);
    console.log(`     Use: ${labels.use_case || '—'}`);
    console.log('');
  }

  if (fs.existsSync(VOICE_ID_FILE)) {
    const current = fs.readFileSync(VOICE_ID_FILE, 'utf8').trim();
    console.log(`   ⭐ Voz atual: ${current}`);
  }
}

// ── Menu ─────────────────────────────────────────────────────

async function main() {
  const cmd = process.argv[2];

  console.log('╔══════════════════════════════════════╗');
  console.log('║   🎙️  Clonador de Voz — ElevenLabs  ║');
  console.log('╚══════════════════════════════════════╝\n');

  switch (cmd) {
    case 'criar':
      await criarVoz();
      break;

    case 'gerar':
      await gerarAudio();
      break;

    case 'vozes':
      await listarVozes();
      break;

    default:
      console.log('Uso:');
      console.log('  node clonar-voz.js criar    → Clonar voz (precisa de amostra)');
      console.log('  node clonar-voz.js gerar    → Gerar narração com voz clonada');
      console.log('  node clonar-voz.js vozes    → Listar vozes disponíveis');
      console.log('');
      console.log('Primeiro passo:');
      console.log('  1. Criar conta em https://elevenlabs.io');
      console.log('  2. Pegar API key em Settings → API Keys');
      console.log('  3. Salvar em: elevenlabs-key.txt');
      console.log('  4. Colocar amostra de 30s em: audio/minha-voz-amostra.wav');
      console.log('  5. node clonar-voz.js criar');
      console.log('  6. node clonar-voz.js gerar');
      break;
  }
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
