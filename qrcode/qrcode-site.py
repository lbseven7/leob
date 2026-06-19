import qrcode
from PIL import Image   

def gerar_qr_obra(token):
    # O link usa o token passado no argumento da função
    url = f"https://www.leob.com.br/pages/visualizar-certificado.html?token={token}"
    
    # Criando um QR Code com mais qualidade
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    # Salvando a imagem
    img = qr.make_image(fill_color="black", back_color="white")
    nome_arquivo = f"qrcode_{token}.png"
    img.save(nome_arquivo)
    print(f"QR Code para {token} gerado com sucesso: {nome_arquivo}")

# Agora, para gerar, basta chamar assim:
token_atual = "lb-2026-001"
gerar_qr_obra(token_atual)