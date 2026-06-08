const QRCode = require('qrcode');

const dados = 'https://www.leob.com.br';

// Gerando e salvando como arquivo de imagem
QRCode.toFile('qrcode.png', dados, function (err) {
  if (err) throw err;
  console.log('QR Code criado!');
});