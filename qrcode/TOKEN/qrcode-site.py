import qrcode
import os
from PIL import Image   

def gerar_qr_obra(token_com_prefixo, pasta_destino):
    """Gera QR Code para um token com prefixo e salva na pasta correta."""
    # URL do certificado (token completo com prefixo)
    url = f"https://www.leob.com.br/pages/visualizar-certificado.html?token={token_com_prefixo}"
    
    # Criar QR Code com alta qualidade
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    # Criar pasta se não existir
    if not os.path.exists(pasta_destino):
        os.makedirs(pasta_destino)

    # Gerar e salvar imagem
    img = qr.make_image(fill_color="black", back_color="white")
    nome_arquivo = f"{token_com_prefixo}.png"
    caminho_completo = os.path.join(pasta_destino, nome_arquivo)
    img.save(caminho_completo)
    print(f"✅ QR Code para {token_com_prefixo} gerado: {caminho_completo}")


def gerar_qrs_para_serie(nome_serie, prefixo):
    """Gera QR Codes para uma série completa."""
    pasta_serie = os.path.join(os.path.dirname(__file__), "..", nome_serie)
    pasta_serie = os.path.normpath(pasta_serie)
    
    print(f"\n📦 Gerando QR Codes para a série: {nome_serie}")
    # Gerar tokens com prefixo (ex: MAR_lb-2026-001)
    for i in range(1, 31):
        token_com_prefixo = f"{prefixo}_lb-2026-{str(i).zfill(3)}"
        gerar_qr_obra(token_com_prefixo, pasta_serie)


if __name__ == "__main__":
    # Configurações das séries
    series = [
        # {
        #     "nome": "CASA-DE-VAQUEIRO",
        #     "prefixo": "CV"
        # },
        # {
        #     "nome": "ELA-E-SEU-CAVALO", 
        #     "prefixo": "ESC"
        # },
        {
            "nome": "MARKETING",
            "prefixo": "MAR"
        }
    ]

    # Gerar QR Codes para todas as séries
    for serie in series:
        gerar_qrs_para_serie(serie["nome"], serie["prefixo"])

    print("\n🎉 Todos os QR Codes gerados com sucesso!")
    
