import qrcode
from PIL import Image   

# O conteúdo que o QR Code vai carregar (pode ser link, texto, piX...)
dados = "https://www.leob.com.br/visualizar-certificado.html?token=lb-2026-001"

# Criando o QR Code
qr = qrcode.make(dados)

# Salvando como imagem
qr.save("visualizar.png")
print("QR Code gerado com sucesso!")