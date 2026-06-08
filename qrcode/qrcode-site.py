import qrcode

# O conteúdo que o QR Code vai carregar (pode ser link, texto, piX...)
dados = "https://www.leob.com.br"

# Criando o QR Code
qr = qrcode.make(dados)

# Salvando como imagem
qr.save("meu_qrcode.png")
print("QR Code gerado com sucesso!")