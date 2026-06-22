import qrcode
from PIL import Image   

def gerar_qr_lista_espera():
    # URL da página de lista de espera do curso
    url = "https://www.leob.com.br/pages/lista-espera-curso.html"
    
    # Criando um QR Code com alta qualidade
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    # Gerando e salvando a imagem
    img = qr.make_image(fill_color="black", back_color="white")
    nome_arquivo = "lista-espera-curso.png"
    img.save(nome_arquivo)
    print(f"✅ QR Code gerado com sucesso: {nome_arquivo}")
    print(f"📱 Aponte a câmera para acessar: {url}")


if __name__ == "__main__":
    gerar_qr_lista_espera()