from PIL import Image
import os

# Caminho da sua pasta de imagens
pasta = 'images'

# Formatos que queremos converter
extensoes_alvo = (".png", ".jpg", ".jpeg")

for arquivo in os.listdir(pasta):
    # Converte o nome para minúsculo para evitar erros de Case Sensitivity
    arquivo_lower = arquivo.lower()
    
    if arquivo_lower.endswith(extensoes_alvo):
        caminho_antigo = os.path.join(pasta, arquivo)
        
        # Abre a imagem
        img = Image.open(caminho_antigo)
        
        # Define o novo nome trocando a extensão original por .webp
        nome_base = os.path.splitext(arquivo)[0]
        nome_novo = f"{nome_base}.webp"
        caminho_novo = os.path.join(pasta, nome_novo)
        
        # Salva como WebP (ajuste a qualidade se quiser, ex: quality=80)
        # img.save(caminho_novo, "webp", quality=85)
        
        print(f"Sucesso: {arquivo} -> {nome_novo}")

print("--- Conversão concluída! ---")