# Leilões ao Vivo — leob.

Sistema de leilões em tempo real integrado ao site estático (Vercel), com back-end em
**Google Sheets + Apps Script** (mesmo padrão já usado no painel de vendas).

## Como funciona

- **Páginas** (já criadas, 100% estáticas):
  - `pages/leiloes.html` — vitrine de lotes (agendados / ao vivo / encerrados)
  - `pages/leilao.html?id=<id>` — tela da obra: lance, cronômetro, histórico ao vivo, PIX
  - `pages/leilao-admin.html` — painel de gestão
  - `js/leiloes.js` + `js/config-leiloes.js` — lógica e configuração
- **Back-end**: uma planilha do Google com abas `Lotes`, `Participantes`, `Lances`, `Config`.
- **Regras embutidas**: lance mínimo = `máximo + incremento`; anti-rajada (lance nos 2 min
  finais estende +2 min); registro obrigatório do participante; vencedor apurado
  automaticamente; pagamento via PIX com confirmação manual.

## Setup passo a passo (fazer uma vez)

### 1. Criar a planilha + Apps Script
1. Acesse `sheets.new` e crie uma planilha em branco chamada "Leilões leob".
2. Abra **Extensões → Apps Script** e cole o conteúdo de `apps-script/Code.gs`
   (o script fica ligado à planilha).
3. Clique em **Implantar → Nova implementação → Aplicativo da web**:
   - **Executar como**: *Eu*
   - **Quem tem acesso**: *Qualquer pessoa*
   - Clique em **Implantar** e copie a URL (termina em `/exec`).

### 2. Configurar o site
Abra `js/config-leiloes.js` e preencha:

```js
window.LEILOES = {
  api: 'https://script.google.com/macros/s/....../exec',  // URL do passo 1
  pix: {
    chave: '',            // SUA chave PIX (CPF/e-mail/tel/CNPJ)
    nome: 'LEO BARBOSA',  // nome do recebedor
    cidade: 'JAGUAQUARA'  // cidade do recebedor
  },
  ...
};
```

Substitua em todo o site a URL `pix.chave` pela chave PIX real (o QR e o copia-e-cola são
gerados no navegador com base nessa chave + valor do lance).

### 3. Painel de gestão
Acesse `pages/leilao-admin.html`, clique em **Configurar API** no menu e cole a URL do
Apps Script (fica salva no navegador, como já acontece no painel de vendas).
Crie o primeiro lote (título, imagem, lance inicial, incremento, datas de início e fim).

### 4. Publicar na Vercel
Nenhum build é necessário: a Vercel serve o site como está. Faça o commit/deply normal.
O menu do `index.html` já tem o link **Leilões**.

## Uso diário (evento ao vivo agendado)

1. No painel, crie o lote com a data/hora da janela do leilão.
2. Divulgue a hora do evento (réels, stories, WhatsApp).
3. Os visitantes se cadastram em um clique (nome, WhatsApp, cidade/UF + aceite das regras).
4. Na hora, a tela do lote abre os lances com cronômetro sincronizado com o servidor.
5. Lance nos 2 min finais estende o prazo (+2 min).
6. Ao encerrar, o sistema apura o lance mais alto e mostra o vencedor.
7. O vencedor paga por PIX (QR/copia-e-cola) e envia o comprovante no WhatsApp.
8. No painel, marque **Pago → Enviado → Entregue** e combine o frete
   (fora da região, o envio é por conta do comprador).

## Endpoints do Apps Script

| Ação | Método | Descrição |
|---|---|---|
| `?action=estado&lote=ID` | GET | Estado do lote + lances (usado pelo polling ~4s) |
| `?action=lance&lote&participante&valor` | GET | Valida e registra lance (+anti-rajada) |
| `?action=registrar&nome&whatsapp&cidade&uf&aceitou=1` | GET | Cadastra participante |
| `?action=lotes` | GET | Lista dos lotes para a vitrine |
| `?action=admin` | GET | Dados completos para o painel |
| POST `{action: addLote/editLote/setStatus/deleteLote}` | POST | CRUD do painel (`no-cors`) |

## Limites e boas práticas

- O Apps Script tem cotas; para o volume previsto (3–5 leilões/mês, poucos espectadores
  simultâneos) está folgado. O estado do lote é servido via `CacheService` para não pesar
  nas leituras da planilha.
- O QR PIX usa o serviço público `api.qrserver.com`. Se preferir autonomia total, gere o
  QR localmente (o payload BR Code já é gerado no navegador).
- Basta apagar a URL da API no painel (guardada no navegador) e apontar para outra
  planilha para trocar de "ambiente".