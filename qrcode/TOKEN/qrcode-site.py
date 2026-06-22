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
    nome_arquivo = f"CV_{token}.png"
    # nome_arquivo = f"ESC_{token}.png"
    img.save(nome_arquivo)
    print(f"QR Code para {token} gerado com sucesso: {nome_arquivo}")

# Agora, para gerar, basta chamar assim:
token_atual = [
"lb-2026-001",
"lb-2026-002",
"lb-2026-003",
"lb-2026-004",
"lb-2026-005",
"lb-2026-006",
"lb-2026-007",
"lb-2026-008",
"lb-2026-009",
"lb-2026-010",
"lb-2026-011",
"lb-2026-012",
"lb-2026-013",
"lb-2026-014",
"lb-2026-015",
"lb-2026-016",
"lb-2026-017",
"lb-2026-018",
"lb-2026-019",
"lb-2026-020",
"lb-2026-021",
"lb-2026-022",
"lb-2026-023",
"lb-2026-024",
"lb-2026-025",
"lb-2026-026",
"lb-2026-027",
"lb-2026-028",
"lb-2026-029",
"lb-2026-030",
]
for token in token_atual:
    gerar_qr_obra(token)
    
