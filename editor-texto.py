import re
import os
import unicodedata
from datetime import datetime

def corrigir_nomes(texto):
    substituicoes = {
        r"Virgínia Enen": "Virgínia Essene",
        r"Teard de Shardan|Tear de Shardan|Shardan|Chardã|Teardan| Teard": "Teilhard de Chardin",
        r"Brigamiang|Brigamang": "Brigham Young",
        r"Bill Schnosl": "Bill Schnoebelen",
        r"South Lake": "Salt Lake City",
        r"Joal Col de Tibé": "Djwal Khul",
        r"Lemaitre": "Georges Lemaître",
        r"Clavius": "Christopher Clavius",
        r"Antônio Vieira": "Padre Antônio Vieira",
        r"\[risadas\]|\[música\]|'\[risadas\]'": ""
    }
    for errado, correto in substituicoes.items():
        texto = re.sub(errado, correto, texto, flags=re.IGNORECASE)
    return texto

def limpar_texto(texto):
    if not texto:
        return ""

    # 1. REMOÇÃO DE TIMESTAMPS SUJOS DO YOUTUBE (ex: 0:2525, 1:281, 1:031)
    # Remove qualquer padrão de "número : número_com_3_ou_mais_digitos"
    texto = re.sub(r'\b\d+:\d{3,}\b', '', texto)
    
    # Remove padrões de tempo curtos que NÃO sejam referências bíblicas conhecidas
    # (Geralmente timestamps de início de linha ou isolados)
    texto = re.sub(r'\b\d+:\d{2,}\b', '', texto)

    # 2. REMOÇÃO DE "SEGUNDOS/MINUTOS" E NÚMEROS ISOLADOS
    texto = re.sub(r'(Segundos|Minutos|Horas|Segundo|Minuto)\s*', '', texto, flags=re.IGNORECASE)
    
    # Remove números isolados (timestamps que sobraram sem os dois pontos)
    # Mas protege se houver um ":" por perto (referência bíblica legítima tipo 24:8)
    texto = re.sub(r'(?<!:)\b\d{1,3}\b(?!:)', '', texto)

    # 3. LIMPEZA DE VÍCIOS DE FALA
    texto = re.sub(r'\s+[eE]\s+', ' ', texto)
    texto = re.sub(r'\s+[nN]é\s+', ' ', texto)
    
    # 4. CORREÇÕES DE NOMES
    texto = corrigir_nomes(texto)
    
    # 5. FORMATAÇÃO DE PONTUAÇÃO E ESPAÇOS
    # Remove pontos e vírgulas que ficaram "soltos" após a remoção dos números
    texto = re.sub(r'\s+', ' ', texto).strip()
    texto = re.sub(r'\s+\.', '.', texto)
    texto = re.sub(r'\.+', '.', texto)
    texto = re.sub(r',+', ',', texto)

    # 6. DIVISÃO EM FRASES E CAPITALIZAÇÃO
    if not re.search(r'[.!?]', texto):
        texto += "."

    partes = re.split(r'([.!?])\s*', texto)
    frases_corrigidas = []
    
    for i in range(0, len(partes)-1, 2):
        frase = partes[i].strip()
        # Limpa resíduos de pontuação e números que sobraram no início da frase
        frase = re.sub(r'^[,\s.?!0-9]+', '', frase)
        pontuacao = partes[i+1]
        
        if frase:
            frase = frase[0].upper() + frase[1:]
            frases_corrigidas.append(frase + pontuacao)

    # 7. AGRUPAMENTO EM PARÁGRAFOS
    paragrafos = []
    bloco_atual = []
    transicoes = ["Vejam", "Agora", "No entanto", "De fato", "Mas", "Então", "Quando", "Vejo", "Portanto"]
    
    for frase in frases_corrigidas:
        comeca_transicao = any(frase.startswith(t) for t in transicoes)
        if (comeca_transicao or len(bloco_atual) >= 4) and bloco_atual:
            paragrafos.append(" ".join(bloco_atual))
            bloco_atual = [frase]
        else:
            bloco_atual.append(frase)
            
    if bloco_atual:
        paragrafos.append(" ".join(bloco_atual))
            
    return "\n\n".join(paragrafos)

def gerar_post_blog(titulo, categoria, assinatura, conteudo_sujo):
    if not os.path.exists("artigos"):
        os.makedirs("artigos")
        
    conteudo_limpo = limpar_texto(conteudo_sujo)
    data_atual = datetime.now().strftime("%Y-%m-%d")
    
    slug = titulo.lower()
    slug = unicodedata.normalize('NFD', slug).encode('ascii', 'ignore').decode('utf-8')
    slug = re.sub(r'[^a-z0-9]+', '-', slug).strip('-')
    
    caminho_arquivo = os.path.join("artigos", f"{slug}.md")
    
    template = f"""---
title: "{titulo}"
date: "{data_atual}"
image: "{slug}.webp"
category: "{categoria}"
signature: "{assinatura}"
---

{conteudo_limpo}
"""
    
    with open(caminho_arquivo, "w", encoding="utf-8") as f:
        f.write(template)
    
    print(f"🚀 Post '{caminho_arquivo}' gerado com sucesso!")

    # --- EXECUÇÃO DO SCRIPT ---

# 1. Título do Post
titulo = "O Prompt Mestre"
categoria = "Tecnologia"
assinatura = "Sancler Miranda"

# 2. Cole aqui o texto bruto que você obteve da transcrição
texto_bruto = """

0:00
E aí tranquila que a sancle Miranda
0:02
nesse vídeo vou te mostrar o prompt
0:04
mestre Por que Sancler você me pergunta
0:07
porque com esse prompt que eu vou te
0:09
mostrar agora aqui no computador dentro
0:11
do chat GPT você vai conseguir criar
0:14
qualquer qualquer outro prompt que você
0:17
quiser quantos prontos você quiser então
0:20
já deixa o seu like aqui e se inscreva
0:22
se é a primeira vez que você está aqui
0:24
no canal porque isso aqui é ouro fiquei
0:27
pensando se eu realmente compartilharia
0:30
isso assim aberto publicamente gratuito
0:33
isso aqui veio depois de muita pesquisa
0:36
procurando cada vez mais para trazer o
0:38
melhor tanto aqui para o YouTube quanto
0:40
para dentro do curso e a Revolution
0:43
Então vamos lá vamos falar sobre essa
0:45
maravilha de prompt Eu estou aqui no
0:48
chat GPT no gpt4 e mais serve também
0:51
para o 3.5 eu vou te mostrar toda a
0:54
estrutura do prompt Depois eu vou te dar
0:56
exemplos do que você pode fazer e a
0:58
partir daí é infinito você decide o que
1:00
você quer fazer Quais são os prompts que
1:02
você quer criar de acordo com a sua
1:04
necessidade Ok esse prompt aqui ele é
1:06
adaptado e traduzido Por mim ele foi
1:09
adaptado do prompt de uma de um cara que
1:11
se chama God softwares Esse é o codino
1:14
nome dele o nick dele eu procurei pelo
1:17
nome dele mas não achei vou deixar aqui
1:18
na descrição o link dele e aqui esse
1:21
prompt começa fazendo o seguinte você é
1:23
um especialista em criação de prompt seu
1:25
objetivo é me ajudar a criar um melhor
1:27
pronto possível para o que eu preciso
1:29
Então a primeira coisa aqui é dar uma
1:32
instrução Clara de quem ele é então está
1:35
definindo qual é o papel quando você
1:37
define você é um especialista em criação
1:40
de prompt que que essa inteligência
1:41
artificial e nesse caso o GPT vai fazer
1:44
ele vai buscar no bancos de dados que
1:47
ele foi treinado por aquele conhecimento
1:49
específico na qual você está
1:51
direcionando a identidade dele que nesse
1:53
caso é um especialista em criação de
1:55
prova então ele vai buscar lá no banco
1:57
de dados dele todas as essas informações
1:59
Então vai ter se essa pré-definição
2:01
então aqui já estamos pré definindo Que
2:03
tipo de conhecimento que ele vai nos dar
2:05
e Aqui começa a contextualizar aí entra
2:08
a parte do contexto do prompt prompt que
2:11
você fornecer deve ser escrito a partir
2:13
da minha perspectiva do usuário fazendo
2:16
solicitações ao chat GPT então aqui tá
2:19
deixando claro Olha você vai escrever
2:21
algo que na verdade sou eu que vou
2:23
copiar e colar dentro do chat GPT
2:26
continuando considera em sua criação que
2:28
esse prompt será inserido em uma
2:31
interface do gpt3 ou gpt4 ou chat GPT
2:35
esse será o processo é que vai deixar
2:37
uma instrução Clara do que que as regras
2:40
que ele deve seguir aí nós estamos
2:43
dizendo aqui o seguinte primeiro você
2:45
irá gerar a seguinte sessões Tá bom
2:48
então essa primeira coisa que ele vai
2:50
fazer Ou seja quando mandarmos a
2:52
primeira interação com ele é a partir
2:54
dessas aspas que foram abertas aqui que
2:57
ele vai mandar a mensagem de fato Então
2:58
antes aqui ele não vai mandar nada é uma
3:02
instrução para treinar aquele bote
3:04
primeiro você vai começar chat GPT a me
3:06
dar um prompt então começa por aqui e aí
3:08
dentro de Chaves você vai fornecer o
3:13
melhor prompt de possível de acordo com
3:15
a minha solicitação então estamos
3:16
dizendo para o chat ept o seguinte aqui
3:18
dentro dessas Chaves é aqui que você vai
3:21
me colocar Qual é o prompt eu vou te
3:22
dizer algo você vai me trazer um prompt
3:24
aí você também vai ter chat de PT uma
3:27
sessão de crítica na hora que você for
3:29
me mandar essa mensagem dentro de Chaves
3:31
aqui eu explico para o chat GPT assim ó
3:33
você vai me fornecer um parágrafo com
3:36
siso sobre como melhorar o pronto seja
3:38
muito crítico em sua resposta essa
3:41
sessão destina-se a forçar a Cristo a
3:44
crítica construtiva mesmo quando prompt
3:46
é aceitável então mesmo que o produto
3:48
seja muito bom e você pode até copiar e
3:51
colar e parar ali eu quero que ele
3:52
continue sempre aí a hora que eu não
3:54
quiser mais tô satisfeito só não
3:55
respondo mais o chat GTT quaisquer
3:58
suposições ou problemas podem ser
4:00
incluídos Aí vem uma outra sessão
4:02
Lembrando que estamos aqui dentro do
4:04
dentro de aspas é isso aqui que vai
4:07
aparecer para mim como resposta tá bom
4:08
do chat GPT então a terceira sessão que
4:11
o chat Preto vai mostrar é perguntas
4:13
dentro de Chaves faça quaisquer
4:16
perguntas relacionadas a quais
4:18
informações adicionais são necessárias
4:21
de mim para melhorar o prompt Faça no
4:24
máximo três perguntas fica ruim quando
4:26
ele faz um monte de pergunta você tem
4:28
que responder uma por uma passa no
4:29
máximo três então ele vai te fazer
4:31
perguntas para melhorar um prompt que é
4:34
para você olha que incrível isso cara
4:35
por isso que esse prompt aqui ele é tão
4:38
poderoso eu tô entregando isso aqui para
4:39
você te explicando deixando assim mais
4:42
mastigado possível para você só pegar
4:44
isso aqui copiar e colar se o prompt
4:47
precisar de mais esclarecimentos ou
4:49
detalhes em determinadas áreas faça
4:51
perguntas para obter mais informações
4:53
para incluir no pronto então essa
4:55
intenção das perguntas que ele vai fazer
4:57
segunda coisa aí aqui já não ainda mais
5:00
naquilo que nós vamos ver próprio chat
5:02
GPT escrevendo para gente aqui já tá
5:04
fora da aspas segunda coisa eu
5:06
fornecerei minhas respostas à sua
5:09
pergunta que você incorporar incorporar
5:12
em sua próxima resposta usando formato
5:14
você vai entender melhor isso aqui pode
5:16
tá parecendo complicado mas já já você
5:18
vai entender eu tô explicando primeiro a
5:20
estrutura continuaremos esse processo
5:21
interativo que essa essa interação de
5:24
você fala eu respondo pergunta eu
5:27
respondo continuaremos esse processo
5:29
interativo comigo te fornecendo
5:31
informações adicionais e você atualizará
5:35
o pronto até que o prompt seja
5:37
aperfeiçoado aí aqui dá mais uma
5:40
instrução para ficar claro para lembrar
5:42
para não ter erro dentro do prompt
5:44
lembre-se prompt que estamos criando
5:46
deve ser escrito a partir da minha
5:48
perspectiva ou usuário fazendo a
5:51
solicitar solicitação a você o chat GPT
5:53
que aí é uma interface do GPT 3 ou 4 um
5:56
exemplo de prompt que você poderia criar
5:58
seria
5:59
com você a Gerar como um físico phd para
6:03
me ajudar a entender a natureza do
6:04
universo então nos dando só um exemplo
6:06
para ele termos a melhor resposta
6:08
possível quando você dá exemplos para
6:10
uma um modelo de linguagem que é esse
6:12
aqui melhor vai ser a resposta pense
6:14
cuidadosamente e use a sua imaginação
6:17
para criar um prompt incrível então
6:20
estamos estamos ali falando chat GPT
6:22
façam o melhor que você puder pegue o
6:25
máximo de informações que você tem no
6:27
seu banco de dados sobre o seu
6:28
especialista em criação de prompt
6:30
estamos deixando claro que é a primeira
6:31
resposta dele deve ser apenas uma
6:33
saudação e perguntar o qual o prompt
6:35
deve ser é só isso E aí o chat é pt
6:38
respondeu Olá estou aqui para te ajudar
6:39
a criar o melhor pronto tipo possível
6:42
por favor me informe qual é o tema ou
6:44
assunto que você gostaria que o
6:46
pronto-te abordasse aqui é a porta de
6:49
entrada para você colocar a sua
6:52
imaginação Para fluir é aqui que você
6:54
vai dizer eu quero um prompt sobre x mas
6:56
dê exemplos do que que eu posso pedir
6:59
para o CPT cara você pode pedir para
7:01
criar um prompt para você criar
7:03
conteúdos para você ter linha editorial
7:05
para você como ser mais produtivo
7:08
possível então eu vou te mostrar aqui
7:10
vou dar um exemplo aqui agora olha só
7:12
com o quão simples você pode começar eu
7:14
quero criar uma linha editorial para o
7:16
meu canal no YouTube aí vamos dar um etv
7:18
Olha só as sessões que foi colocada ali
7:21
em cima Pronto ele começa já direto no
7:23
prompt e o prompt é o seguinte chat GPT
7:26
eu preciso criar uma linha editorial
7:28
para o meu canal do YouTube por favor me
7:30
ajude a desenvolver um plano abrangente
7:33
incluindo ideias de conteúdo frequência
7:35
de postagem e estratégias de engajamento
7:38
Ou seja você já sacou aqui ó é só você
7:41
vir aqui agora copiar abrir um novo chat
7:45
colar já era você acabou de pedir de ter
7:49
um prompt um super prompt criador de
7:52
pronto depois que você diz o tema é só
7:54
você pegar copiar colar dentro de um
7:57
novo chat e você pode fazer isso
7:59
diversos prompts Mas vamos voltar lá
8:02
porque pode ser melhorado isso aqui né
8:04
só demos algo e que foi bem genérico que
8:07
é crie uma linha editorial para o meu
8:09
canal no YouTube tá mas olha só Qual foi
8:11
a crítica dele Olha que que maravilhoso
8:13
isso que ele vai dizer como tornar esse
8:16
prompt melhor cara o próprio chat GPT
8:19
vai te dizer como se tornar esse prompt
8:22
melhor para que ele responda e te dê a
8:24
melhor resposta possível sacou então Ó a
8:28
crítica o prompt poderia ser mais
8:30
específico em relação ao tipo de canal
8:32
ao público alvo Além disso poderia
8:34
abordar melhor a Organização das ideias
8:37
e a definição de metas Claras e
8:39
mensuráveis ele não só vaidade a crítica
8:42
mas também vai te trazer três perguntas
8:44
que tem a ver com essa crítica para
8:45
tornar o próprio de melhor para você só
8:47
copiar colar e jogar ali então vamos lá
8:49
primeira pergunta que ele fez qual o
8:51
tema principal do seu canal no YouTube
8:52
vamos dizer que eu tenho um canal sobre
8:54
produtividade quem é o público alvo do
8:57
seu canal pessoas que trabalham em novos
8:59
terceiro Você tem algum objetivo
9:01
específico em termos de crescimento ou
9:04
engajamento Quero chegar aos primeiros
9:06
10 mil inscritos Então vamos mandar e
9:09
ver aqui como que o chat GPT vai tornar
9:12
melhor isso olha que coisa interessante
9:14
ele tá começando a criar um novo prompt
9:17
baseado nas respostas que eu acabei de
9:19
dar para ele mesmo tá entendendo e
9:22
pronto se tornou o meu canal no YouTube
9:23
é focado em produtividade para pessoas
9:25
que trabalham Home Office por favor me
9:28
ajude a desenvolver uma linha editorial
9:30
abrangente incluindo ideias de conteúdo
9:33
frequência de postagens estratégia de
9:36
engajamento com o objetivo de alcançar
9:37
10 mil inscritos galera olha só presta
9:40
atenção muito provável que para uma
9:42
pessoa Principalmente uma pessoa que
9:43
está iniciando agora com chat GPT tá
9:46
entendendo agora o que que é isso ela
9:48
não vai chegar nesse trompete aqui de
9:50
jeito nenhum o máximo que ela faria era
9:52
algo assim ó crie uma linha editorial
9:54
para o meu canal no YouTube isso aqui é
9:56
genérico tem um termo que é dito em
9:58
inglês que é em barbas out que é lixo
10:01
que entra lixo que sai no meio da
10:03
programação aquele input que você coloca
10:05
aqui no chat GPT ou seja aquilo que você
10:08
pede o teu prompt a tua pergunta quanto
10:11
pior for essa pergunta em termos ela é
10:14
genérica demais ela não tem
10:16
absolutamente nada específico não fala
10:17
de sobre nenhuma estrutura não dá nenhum
10:20
exemplo cara mais genérico vai ser a
10:22
resposta e menos vai servir para você
10:24
continuando o chat GPT trouxe algo muito
10:27
específico que é meu canal no YouTube é
10:29
focado em produtividade para quem para
10:31
pessoas que trabalham em Home Office aí
10:32
ó por favor me ajuda a desenvolver uma
10:35
linha editorial abrangente incluindo
10:37
ideias de conteúdo frequência de
10:39
postagem estratégias de engajamento com
10:41
objetivo de alcançar 10 mil inscritos
10:43
incrível Olha só vou copiar agora vamos
10:46
supor que agora eu já tô satisfeito não
10:48
quero mais mas poderia continuar porque
10:50
senão vai ficar aqui para sempre né ele
10:51
vai ficar nesse processo interativo como
10:53
eu pedi até eu ficar satisfeito então
10:56
copiei esse prompt aí que que você vai
10:58
fazer bem no novo Vou colocar aqui o
11:00
gpt4 mas pode ser no 3.5 dá um control V
11:04
enter e vamos ver o que que vai sair
11:06
desse prompt que o próprio chat GPT
11:09
trouxe é quase um trava-língua o chat
11:11
GPT com prompt prompt que ele criou já
11:13
que ele é um criador de prontos e vamos
11:14
ver caramba ele tá dando uma resposta
11:16
bem grande inclusive olha só que
11:19
completa foi a resposta que o chat GPT
11:22
deu só com esse prompt que eu acabei de
11:24
criar 100 com pouquíssimo esforço para
11:27
alcançar 10 mil inscritos é importante
11:28
ter uma linha editorial sólida conteúdo
11:30
atraente estratégias eficazes de
11:32
engajamento então ele já tá pensando em
11:34
tudo isso podia de acordo com que eu
11:36
pedi lá ele está pensando pô ele tem um
11:38
objetivo de 10 mil inscritos então é
11:39
importante ter tal e tal e tal coisa por
11:41
isso eu vou te dar as seguintes
11:43
sugestões aí pam pam pam vamos ver quais
11:45
foram elas linha editorial ideias de
11:48
conteúdo para vídeo estratégias de
11:50
engajamento cara pelo amor de Deus bicho
11:53
para você ter essa mesma esse mesmo tipo
11:56
de conhecimento ou você teria que fazer
11:58
diversos cursos teria que ter anos de
12:00
experiência Ou se teria que contratar
12:01
alguém cara pelo amor de Deus mano esse
12:04
é o momento de Vou levantar vou embora
12:07
vou embora esse é o momento eu vou
12:08
embora vou embora mano vou embora dessa
12:10
vez eu vou mesmo cara aí Ele trouxe uma
12:12
linha editorial com 7 pontos para uma
12:15
linha editorial dicas e truques de
12:16
produtividade ferramentas e aplicativos
12:18
gestão do tempo organização do espaço
12:21
equilíbrio saudáveis ideias cara parte
12:24
disso a tua cabeça vai explodindo todos
12:26
os conteúdos desse canal é sobre cabeça
12:28
explodir não sei se você já percebeu
12:30
isso não tem como você ficar interagindo
12:31
com ferramentas de Inteligência
12:33
Artificial sem você ficar doido ainda
12:36
nem falar direito tá entendendo top deu
12:39
ideias de conteúdo para vídeo aí aqui
12:40
isso aqui é só o começo tudo vai a
12:43
partir daqui ó vai embora vai
12:44
perguntando fala mais sobre essa ideia
12:47
de top 10 dicas de produtividade me dê
12:50
ideias de dicas de produtividade me dê
12:52
dicas de como organizar o espaço de
12:54
trabalho para quem trabalha em Home
12:56
Office e é que você vai embora no chat
12:58
GT você vai embora com ele entendeu vai
13:01
sobe na garupa mano e deixa
13:03
tá entendendo dentro desse mesmo chat eu
13:06
poderia falar que quero criar outro
13:08
prompt Então esse chat vai ficar aqui
13:10
você coloca quero criar outro pronto te
13:13
começa por exemplo poderia perguntar
13:14
coisas sobre como criar um blog como
13:17
criar um perfil atraente no Instagram
13:20
criar um aplicativo com inteligência
13:22
artificial e pedir para explicar Qual é
13:25
o passo a passo para que isso aconteça
13:26
ideias de vídeo para o YouTube ideias de
13:29
título para o YouTube não tem nem limite
13:31
eu ia falar o limite mas não é não
13:33
qualquer coisa a partir daqui deixa a
13:36
sua imaginação fluir PT vai te ajudando
13:39
a desenvolver cada vez mais esse pronto
13:41
mano Isso aqui foi entregue para você de
13:43
graça a única coisa que eu peço para
13:45
você é clica aqui nesse botão para você
13:47
se inscrever se você ainda não for
13:49
inscrito clica no like e quem mais
13:51
precisa necessita saber desse
13:54
superprompt aqui manda esse vídeo para
13:56
essa pessoa compartilha lá no grupo do
13:58
WhatsApp compartilhe no do telegram só
14:00
deixa as pessoas saberem que isso aqui
14:02
existe isso aqui pode facilitar a vida
14:04
de muitas pessoas pode começar um novo
14:07
negócio a partir disso aqui pode muitas
14:09
coisas boas acontecerem então ajuda essa
14:12
corrente boa a ser espalhada beleza as
14:15
pessoas saberem disso aqui e se você
14:17
quiser se aprofundar no chat PT sendo
14:19
criador de conteúdo infoprodutor já tem
14:22
aqui abaixo o Iah Revolution aqui é o
14:24
sancle Miranda Muito obrigado você ter
14:26
assistido até o momento e eu te espero
14:27
no próximo vídeo Valeu tamo junto abraço
"""

# 3. Chame a função para gerar o arquivo .md
gerar_post_blog(titulo, categoria, assinatura, texto_bruto)
