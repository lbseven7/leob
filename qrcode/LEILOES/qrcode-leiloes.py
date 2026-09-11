import qrcode

URL_LEILOES = "https://www.leob.com.br/pages/leiloes.html"


def gerar_qr(url, nome_arquivo, box_size=10, border=4):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=box_size,
        border=border,
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    img.save(nome_arquivo)
    print(f"OK: {nome_arquivo} -> {url}")


if __name__ == "__main__":
    gerar_qr(URL_LEILOES, "qrcode/LEILOES/leiloes.png", box_size=10, border=4)
    gerar_qr(URL_LEILOES, "qrcode/LEILOES/leiloes-print.png", box_size=16, border=8)