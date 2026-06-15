
// GERENCIAMENTO DE IDIOMA GLOBAL
let currentLang = localStorage.getItem('lang') || 'pt';

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

// OBJETOS COM ESTRUTURA LOCALIZADA (PT / EN)
const obras = [
    {
        id: 1,
        img: "images/casa-do-vaqueiro.jpg",
        categoria: "disponível",
        restante: 10,
        total: 10,
        linkPayment: "https://www.asaas.com/c/p2g0km0bu46pecvw",
        pt: {
            titulo: "Casa de Vaqueiro",
            tecnica: "Papel Algodão 100%",
            dimensoes: "20x28cm"
        },
        en: {
            titulo: "The Cowboy's House",
            tecnica: "100% Cotton Paper",
            dimensoes: "20x28cm"
        }
    },
    {
        id: 2,
        img: "images/ela-e-seu-cavalo.jpg",
        categoria: "disponível",
        restante: 10,
        total: 10,
        linkPayment: null,
        pt: {
            titulo: "Ela e Seu Cavalo",
            tecnica: "Papel Ultra Smooth",
            dimensoes: "27,9 x 42cm"
        },
        en: {
            titulo: "She and Her Horse",
            tecnica: "Ultra Smooth Paper",
            dimensoes: "27.9 x 42cm"
        }
    }
];

// NOVO REPOSITÓRIO DE POSTS DO DIÁRIO DE ESTÚDIO
const postsBlog = [
    {
        id: "casa-do-vaqueiro-post",
        thumb: "images/casa-do-vaqueiro.jpg",
        data: "Jun 2026",
        pt: {
            categoria: "Processo Criativo",
            titulo: "A Luz Oculta na Casa de Vaqueiro",
            descricao: "Um local que tem muitas coisas pra contar..."
        },
        en: {
            categoria: "Creative Process",
            titulo: "Many Families Live Here",
            descricao: "A detailed analysis of using contrast and textures to recreate the atmosphere of the Bahian countryside on cotton paper."
        }
    }
];
const bastidores = [
    {
        imagem: "../images/leo-pintando-2.jpg", 
        tipo: "Bastidores",
        titulo: "Pintando 'Farinha'.",
        data: "Jun 2026"
    },
    {
        imagem: "../images/registrando.jpg",
        tipo: "Bastidores",
        titulo: "Momentos e Modelos.",
        data: "Jun 2026"
    },
    {
        imagem: "../images/em-baixo-do-pau-brasil.jpg",
        tipo: "Bastidores",
        titulo: "À Sombra do Pau Brasil.",
        data: "Jun 2026"
    },
    {
        imagem: "../images/cavalo-cinza.jpg",
        tipo: "Bastidores",
        titulo: "Baruque em Destaque.",
        data: "Mai 2026"
    }
];

const eventos = [
    // { tipo: "Vídeo", titulo: "Cláudio Colavolpe Photo Art", descricao: "Registro em vídeo da visita ao espaço e da experiência no local.", data: "Mai 2026", thumb: "images/ccvolpe.jpg", video: null },
    { tipo: "Post", titulo: "Cláudio Colavolpe Photo Art", descricao: "Visitei a galeria do Cláudio Colavolpe.", data: "Mai 2026", thumb: "images/ccvolpe-foto.jpg", link: "#" },
    { tipo: "Flashes", titulo: "Fotos do Artista", descricao: "Processo Criativo e Bastidores.", data: "Mar 2026", thumb: "./images/leo-cavalete.jpg", link: "/pages/galeria.html" }
];

const galleryGrid = document.getElementById('gallery-grid');
const eventsGrid = document.getElementById('events-grid');
const blogGrid = document.getElementById('blog-grid');

function renderEvents() {
    if (!eventsGrid) return;
    eventsGrid.innerHTML = '';
    eventos.forEach(evento => {
        const item = document.createElement('article');
        item.className = 'fade-in group overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950';
        const media = evento.video
            ? `<div class="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                            <video class="w-full h-full object-cover" controls preload="metadata" playsinline poster="${evento.thumb}">
                                <source src="${evento.video}" type="video/mp4">
                                Seu navegador não suporta vídeo.
                            </video>
                            <span class="absolute top-4 left-4 bg-black/75 text-white text-[10px] px-3 py-1 uppercase tracking-[0.2em] pointer-events-none">${evento.tipo}</span>
                       </div>`
            : `<a href="${evento.link}" class="block" target="_blank" rel="noopener noreferrer">
                            <div class="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                                <img src="${evento.thumb}" alt="${evento.titulo}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                                <span class="absolute top-4 left-4 bg-black/75 text-white text-[10px] px-3 py-1 uppercase tracking-[0.2em]">${evento.tipo}</span>
                            </div>
                       </a>`;
        item.innerHTML = `
                    ${media}
                    <div class="p-5 sm:p-6">
                        <p class="text-[10px] uppercase tracking-[0.25em] text-brand-orange mb-3">${evento.data}</p>
                        <h3 class="text-lg font-medium mb-3 group-hover:text-brand-orange transition">${evento.titulo}</h3>
                        <p class="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">${evento.descricao}</p>
                    </div>`;
        eventsGrid.appendChild(item);
        setTimeout(() => item.classList.add('visible'), 50);
    });
    updateCursorEvents();
}

function renderGallery(filter = 'todos') {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    let filtered = obras;
    if (filter === 'disponível') {
        filtered = obras.filter(o => o.restante > 0);
    } else if (filter === 'urgente') {
        filtered = obras.filter(o => o.restante > 0 && o.restante <= 3);
    }

    filtered.forEach(obra => {
        const content = obra[currentLang];
        const isLowStock = obra.restante > 0 && obra.restante <= 3;
        const isSoldOut = obra.restante === 0;
        const item = document.createElement('div');
        item.className = 'fade-in group cursor-pointer';

        let badgeHTML = '';
        if (isSoldOut) {
            badgeHTML = `<div class="absolute top-4 left-4 bg-zinc-500 text-white text-[9px] px-2 py-1 font-bold uppercase tracking-tighter">${currentLang === 'pt' ? 'Esgotado' : 'Sold Out'}</div>`;
        } else if (isLowStock) {
            badgeHTML = `<div class="absolute top-4 left-4 bg-brand-orange text-white text-[9px] px-2 py-1 font-bold uppercase tracking-tighter">${currentLang === 'pt' ? 'Últimas Unidades' : 'Low Stock'}</div>`;
        }

        item.innerHTML = `
                    <div class="relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 aspect-[4/5] mb-4">
                        <img src="${obra.img}" alt="${content.titulo}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isSoldOut ? 'opacity-40' : ''}">
                        ${badgeHTML}
                    </div>
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-lg font-medium group-hover:text-brand-orange transition">${content.titulo}</h3>
                            <p class="text-[10px] opacity-50 uppercase tracking-widest">${content.tecnica}</p>
                        </div>
                        <div class="text-right">
                            <span class="text-[11px] font-bold ${isLowStock ? 'text-brand-orange animate-urgent' : ''} ${isSoldOut ? 'text-zinc-400 line-through' : ''}">${obra.restante}/${obra.total}</span>
                            <p class="text-[8px] opacity-40 uppercase">${isSoldOut ? (currentLang === 'pt' ? 'Esgotadas' : 'Sold') : (currentLang === 'pt' ? 'Restantes' : 'Left')}</p>
                        </div>
                    </div>
                `;
        item.onclick = () => openModal(obra);
        galleryGrid.appendChild(item);
        setTimeout(() => item.classList.add('visible'), 50);
    });

    updateCursorEvents();
}

// RENDERIZAÇÃO DA NOVA SEÇÃO DO BLOG DE FORMA BILÍNGUE
function renderBlog() {
    if (!blogGrid) return;
    blogGrid.innerHTML = '';

    postsBlog.forEach(post => {
        const content = post[currentLang];
        const card = document.createElement('article');
        card.className = 'fade-in group overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all hover:shadow-xl';

        card.innerHTML = `
                    <div class="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                        <img src="${post.thumb}" alt="${content.titulo}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                        <span class="absolute top-4 left-4 bg-black/75 text-white text-[9px] font-bold px-3 py-1 uppercase tracking-[0.2em]">${content.categoria}</span>
                    </div>
                    <div class="p-6">
                        <p class="text-[10px] uppercase tracking-[0.25em] text-brand-orange mb-2">${post.data}</p>
                        <h3 class="text-xl font-medium mb-3 group-hover:text-brand-orange transition serif leading-tight">${content.titulo}</h3>
                        <p class="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed mb-4">${content.descricao}</p>
                        <a href="/blog/${post.id}" class="text-xs font-bold uppercase tracking-wider text-black dark:text-white hover:text-brand-orange dark:hover:text-brand-orange transition">
                            ${currentLang === 'pt' ? 'Ler Artigo →' : 'Read Article →'}
                        </a>
                    </div>
                `;
        blogGrid.appendChild(card);
        setTimeout(() => card.classList.add('visible'), 50);
    });
}

function filterGallery(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    const eventTarget = window.event ? window.event.currentTarget : null;
    if (eventTarget) {
        eventTarget.classList.add('active');
    } else {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if (btn.getAttribute('onclick').includes(category)) btn.classList.add('active');
        });
    }
    renderGallery(category);
}

let obraSelecionadaAtual = null;

function openModal(obra) {
    obraSelecionadaAtual = obra;
    const content = obra[currentLang];

    document.getElementById('modal-img').src = obra.img;
    document.getElementById('modal-title').innerText = content.titulo;
    document.getElementById('modal-technique').innerText = content.tecnica;
    document.getElementById('modal-dimensions').innerText = content.dimensoes;

    const badge = document.getElementById('modal-stock-badge');
    const btnPayment = document.getElementById('payment-link');
    const helper = document.getElementById('payment-helper');

    const msgPT = `Olá Leo! Gostaria de consultar a disponibilidade da obra "${content.titulo}".`;
    const msgEN = `Hello Leo! I would like to inquire about the availability of the artwork "${content.titulo}".`;
    const disponibilidadeMsg = currentLang === 'pt' ? msgPT : msgEN;

    btnPayment.style.pointerEvents = 'auto';
    btnPayment.removeAttribute('disabled');

    if (obra.restante === 0) {
        badge.innerText = currentLang === 'pt' ? `SÉRIE ESGOTADA` : `SOLD OUT SERIES`;
        badge.className = 'inline-block px-2 py-1 bg-zinc-500 text-white text-[10px] font-bold tracking-tighter mb-4 w-fit';
        helper.innerText = currentLang === 'pt' ? 'Esta obra não possui exemplares disponíveis no momento.' : 'This artwork currently has no available prints.';
        btnPayment.innerText = currentLang === 'pt' ? 'Série Esgotada' : 'Sold Out';
        btnPayment.removeAttribute('href');
        btnPayment.style.pointerEvents = 'none';
        btnPayment.className = 'inline-flex items-center justify-center w-full bg-zinc-300 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-600 text-center py-4 px-6 font-semibold uppercase tracking-[0.22em] cursor-not-allowed';
    } else {
        if (currentLang === 'pt') {
            badge.innerText = `SÉRIE LIMITADA: ${obra.restante} DE ${obra.total} DISPONÍVEIS`;
        } else {
            badge.innerText = `LIMITED SERIES: ${obra.restante} OF ${obra.total} AVAILABLE`;
        }
        badge.className = obra.restante <= 3 ? 'inline-block px-2 py-1 bg-brand-orange text-white text-[10px] font-bold tracking-tighter mb-4 w-fit' : 'inline-block px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold tracking-tighter mb-4 w-fit';

        if (obra.linkPayment) {
            helper.innerText = currentLang === 'pt' ? 'Você será direcionado para uma página segura para iniciar sua reserva.' : 'You will be redirected to a secure checkout page to begin your order.';
            btnPayment.innerText = currentLang === 'pt' ? 'Adquirir Obra' : 'Acquire Artwork';
            btnPayment.href = `obrigado.html?paymentUrl=${encodeURIComponent(obra.linkPayment)}&titulo=${encodeURIComponent(content.titulo)}&img=${encodeURIComponent(obra.img)}`;
            btnPayment.className = 'inline-flex items-center justify-center w-full bg-black text-white text-center py-4 px-6 font-semibold uppercase tracking-[0.22em] hover:bg-brand-orange transition duration-300 shadow-md';
            btnPayment.removeAttribute('target');
        } else {
            helper.innerText = currentLang === 'pt' ? 'Fale comigo no WhatsApp para consultar disponibilidade e próximos passos.' : 'Contact me via WhatsApp to check availability and international shipping steps.';
            btnPayment.innerText = currentLang === 'pt' ? 'Verificar Disponibilidade' : 'Check Availability';
            btnPayment.href = `https://wa.me/5573991182932?text=${encodeURIComponent(disponibilidadeMsg)}`;
            btnPayment.className = 'inline-flex items-center justify-center w-full bg-black text-white text-center py-4 px-6 font-semibold uppercase tracking-[0.22em] hover:bg-brand-orange transition duration-300';
            btnPayment.setAttribute('target', '_blank');
        }
    }

    const modal = document.getElementById('modal-overlay');
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.remove('opacity-0'), 10);
    sessionStorage.setItem('lastOpenModal', obra.id);
}

function closeModal() {
    const modal = document.getElementById('modal-overlay');
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        obraSelecionadaAtual = null;
    }, 300);
    sessionStorage.removeItem('lastOpenModal');
}

// ALTERAÇÃO GLOBAL DE IDIOMA E INTERFACE
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    if (lang === 'en') {
        document.getElementById('lang-en').className = 'text-brand-orange font-bold';
        document.getElementById('lang-pt').className = 'text-zinc-400 hover:text-black dark:hover:text-white transition';

        // Header & Nav
        document.getElementById('nav-catalogo').innerText = "Catalogue";
        document.getElementById('nav-blog').innerText = "Studio Diary";
        document.getElementById('nav-eventos').innerText = "Events";
        document.getElementById('nav-sobre').innerText = "About";

        // Elementos da página
        document.getElementById('inspiration-title').innerText = "The Artist's Inspiration";
        document.getElementById('catalog-heading').innerText = "Fine Art Limited Series";
        document.getElementById('filter-all').innerText = "All";
        document.getElementById('filter-available').innerText = "Available";
        document.getElementById('filter-urgent').innerText = "Low Stock";

        document.getElementById('blog-title').innerText = "Studio Diary";
        document.getElementById('blog-subtitle').innerText = "Conceptual reflections, technical analyses, and the philosophy behind each monochromatic painting.";

        document.getElementById('events-heading').innerText = "Events & Records";
        document.getElementById('events-subtitle').innerText = "Short videos, posts, and snapshots of leob.'s journey in exhibitions, behind the scenes, and gatherings.";

        document.getElementById('about-heading').innerText = "About the Artist";
        document.getElementById('about-text').innerHTML = "Born in 1982 in Jequié, Bahia, Alexsandro Barbosa — widely known by his artistic name Léo Barbosa (leob.) — is a visual artist with over 25 years of dedication to fine arts.<br><br>Self-taught by essence, he built a solid and multidisciplinary career combining his passion for painting, photography, design, and technology. Drawing inspiration from nature and all its elements, Léo found his artistic signature in hyper-realism since 2012. His paintings portray with precision and sensitivity the simplicity of the countryside, making the rural environment the primary focus of his work.";

        // Modals
        document.getElementById('modal-label-support').innerText = "Support";
        document.getElementById('modal-label-dimensions').innerText = "Dimensions";
        document.getElementById('modal-label-cta').innerText = "acquire exclusive artwork now";
    } else {
        document.getElementById('lang-pt').className = 'text-brand-orange font-bold';
        document.getElementById('lang-en').className = 'text-zinc-400 hover:text-black dark:hover:text-white transition';

        document.getElementById('nav-catalogo').innerText = "Catálogo";
        document.getElementById('nav-blog').innerText = "Diário de Estúdio";
        document.getElementById('nav-eventos').innerText = "Eventos";
        document.getElementById('nav-sobre').innerText = "Sobre";

        document.getElementById('inspiration-title').innerText = "A Inspiração do Artista";
        document.getElementById('catalog-heading').innerText = "Séries Limitadas Fine Art";
        document.getElementById('filter-all').innerText = "Todos";
        document.getElementById('filter-available').innerText = "Disponíveis";
        document.getElementById('filter-urgent').innerText = "Últimas Unidades";

        document.getElementById('blog-title').innerText = "Diário de Estúdio";
        document.getElementById('blog-subtitle').innerText = "Reflexões conceituais, análises técnicas e a filosofia por trás de cada pintura monocromática.";

        document.getElementById('events-heading').innerText = "Eventos & Registros";
        document.getElementById('events-subtitle').innerText = "Pequenos vídeos, posts e momentos da trajetória da leob. em exposições, bastidores e encontros.";

        document.getElementById('about-heading').innerText = "Sobre o Artista";
        document.getElementById('about-text').innerHTML = "Nascido em 1982, em Jequié, Bahia, Alexsandro Barbosa — amplamente conhecido pelo nome artístico Léo Barbosa (leob.) — é artista visual com mais de 25 anos de dedicação às artes plásticas.<br><br>Autodidata por essência, construiu uma trajetória sólida e multidisciplinar que une sua paixão pela pintura, fotografia, design e tecnologia. Tendo a natureza e todos os seus atores como principal inspiração, Léo encontrou no estilo hiper-realista, a partir de 2012, sua assinatura artística. Suas pinturas retratam com precisão e sensibilidade a simplicidade do campo, fazendo do ambiente rural o grande foco de sua obra.";

        document.getElementById('modal-label-support').innerText = "Suporte";
        document.getElementById('modal-label-dimensions').innerText = "Dimensões";
        document.getElementById('modal-label-cta').innerText = "quero obra exclusiva agora";
    }

    renderGallery();
    renderBlog();
}

// Custom Cursor
const cursor = document.getElementById('custom-cursor');
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
if (!isTouchDevice && cursor) {
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

function updateCursorEvents() {
    if (isTouchDevice || !cursor) return;
    document.querySelectorAll('a, button, .group').forEach(el => {
        el.addEventListener('mouseenter', () => {
            const isFooterLink = !!el.closest('footer');
            cursor.style.transform = isFooterLink ? 'translate(-50%, -50%) scale(1.7)' : 'translate(-50%, -50%) scale(2.4)';
            cursor.style.backgroundColor = isFooterLink ? 'rgba(249, 115, 22, 0.16)' : 'rgba(249, 115, 22, 0.28)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'rgba(249, 115, 22, 0.28)';
        });
    });
}

function updateProgressBar() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    const progressBar = document.getElementById('progress-bar');
    if (progressBar) progressBar.style.width = `${progress}%`;

    const heroSection = document.querySelector('section.hero-height');
    const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight * 0.7;
    const headerLogo = document.getElementById('header-logo');

    if (headerLogo) {
        if (scrollTop >= (heroHeight - 80)) {
            headerLogo.classList.remove('opacity-0', 'pointer-events-none');
            headerLogo.classList.add('opacity-100');
        } else {
            headerLogo.classList.remove('opacity-100');
            headerLogo.classList.add('opacity-0', 'pointer-events-none');
        }
    }

    document.querySelector('header')?.classList.toggle('scrolled', scrollTop > 24);
}

window.addEventListener('scroll', updateProgressBar);

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mainNav = document.getElementById('main-nav');
mobileMenuBtn?.addEventListener('click', () => mainNav.classList.toggle('hidden'));
mainNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mainNav.classList.add('hidden'));
});

if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
}

// CARREGAMENTO INICIAL DA APLICAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLang);
    renderEvents();
});

function toggleVideoModal(show) {
    const modal = document.getElementById('video-lightbox');
    const player = document.getElementById('modal-player');
    if (show) {
        modal.classList.remove('hidden');
        player.play();
    } else {
        modal.classList.add('hidden');
        player.pause();
        player.currentTime = 0;
    }
}
