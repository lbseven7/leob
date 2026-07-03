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
        restante: 30,
        total: 30,
        linkPayment: null,
        pt: {
            titulo: "Casa de Vaqueiro",
            tecnica: "Papel Ultra Smooth",
            dimensoes: "20x28cm"
        },
        en: {
            titulo: "The Cowboy's House",
            tecnica: "Ultra Smooth Paper",
            dimensoes: "20x28cm"
        }
    },
    {
        id: 2,
        img: "images/ela-e-seu-cavalo.jpg",
        categoria: "disponível",
        restante: 30,
        total: 30,
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

const galleryGrid = document.getElementById('gallery-grid');

// Array de eventos
const eventos = [
    {
        tipo: "Palestras",
        titulo: "Colégio Monteiro Lobato",
        descricao: "Falar sobre arte é sempre muito bom! Compartilhei minha experiência e técnicas com os alunos.",
        data: "Nov 2025",
        thumb: "../images/ccvolpe-foto.jpg",
        link: "galeria.html"
    },
    {
        tipo: "Fotos do Artista",
        titulo: "Processo Criativo e Bastidores",
        descricao: "Um olhar por trás das telas: momentos de criação, preparação e inspiração no ateliê.",
        data: "Mar 2026",
        thumb: "../images/leo-cavalete.jpg",
        link: "galeria.html"
    }
];

// Array de palestras/galeria
const palestras = [
    {
        titulo: "Colégio Monteiro Lobato",
        descricao: "Falar sobre arte é sempre muito bom!",
        data: "Nov 2025",
        imagem: "../images/monteiro-lobato-turma.JPG",
        tipo: "Palestras"
    },
    {
        titulo: "Colégio Monteiro Lobato",
        descricao: "Falar sobre arte é sempre muito bom!",
        data: "Nov 2025",
        imagem: "../images/monteiro-lobato-leo-tela2.JPG",
        tipo: "Palestras"
    }
];

// Array de bastidores (para a página galeria)
const bastidores = [
    {
        imagem: "../images/leo-pintando-2.jpg",
        tipo: "Bastidores",
        titulo: "Pintando 'Farinha'",
        data: "Jun 2026"
    },
    {
        imagem: "../images/registrando.jpg",
        tipo: "Bastidores",
        titulo: "Momentos e Modelos",
        data: "Jun 2026"
    },
    {
        imagem: "../images/em-baixo-do-pau-brasil.jpg",
        tipo: "Bastidores",
        titulo: "À Sombra do Pau Brasil",
        data: "Jun 2026"
    },
    {
        imagem: "../images/cavalo-cinza.jpg",
        tipo: "Bastidores",
        titulo: "Baruque em Destaque",
        data: "Mai 2026"
    }
];

// Dark Mode Toggle (compatível com todas as páginas)
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        if (darkModeIcon) {
            darkModeIcon.className = isDark ? 'fas fa-moon text-blue-300' : 'fas fa-sun text-yellow-500';
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Aplicar tema salvo
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    if (darkModeIcon) {
        darkModeIcon.className = 'fas fa-moon text-blue-300';
    }
} else {
    if (darkModeIcon) {
        darkModeIcon.className = 'fas fa-sun text-yellow-500';
    }
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

    const msgPT = `Olá Leo! Gostaria de consultar a disponibilidade da obra "${content.titulo}"`;
    const msgEN = `Hello Leo! I would like to inquire about the availability of the artwork "${content.titulo}"`;
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

        helper.innerText = currentLang === 'pt' ? 'Você será direcionado para uma página segura para iniciar sua reserva.' : 'You will be redirected to a secure checkout page to begin your order.';
        btnPayment.innerText = currentLang === 'pt' ? 'Verificar Disponibilidade' : 'Check Availability';
        btnPayment.href = `https://wa.me/5573988279832?text=${encodeURIComponent(disponibilidadeMsg)}`;
        btnPayment.className = 'inline-flex items-center justify-center w-full bg-black text-white text-center py-4 px-6 font-semibold uppercase tracking-[0.22em] hover:bg-brand-orange transition duration-300 shadow-md';
        btnPayment.setAttribute('target', '_blank');
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
        const navEventosEl = document.getElementById('nav-eventos');
        if (navEventosEl) navEventosEl.innerText = "Events";
        document.getElementById('nav-sobre').innerText = "About";

        // Elementos da página
        document.getElementById('catalog-heading').innerText = "Fine Art Limited Series";
        document.getElementById('filter-all').innerText = "All";
        document.getElementById('filter-available').innerText = "Available";
        document.getElementById('filter-urgent').innerText = "Low Stock";

        const aboutHeadingEl = document.getElementById('about-heading');
        const aboutTextEl = document.getElementById('about-text');
        if (aboutHeadingEl) aboutHeadingEl.innerText = "About the Artist";
        if (aboutTextEl) aboutTextEl.innerHTML = "Born in Jequié and forged by the streets of São Paulo, my artistic journey began with a simple drawing of candy wrapper stickers in the 90s. Between the graffiti of the metropolis and the tranquility of the countryside in Jaguaquara, I learned that art is the translation of the soul. With 20 years of experience, today I use hyperrealism to capture more than images: I capture stories, lights, and rural memories. As an artist, designer, and web developer, I combine technical rigor with emotion, believing that a house by the roadside has as much to say as the landscape that surrounds it. My goal is simple: to bring peace and reflection to those who observe what my brushes have been able to record.";

        // Modals
        document.getElementById('modal-label-support').innerText = "Support";
        document.getElementById('modal-label-dimensions').innerText = "Dimensions";
        document.getElementById('modal-label-cta').innerText = "acquire exclusive artwork now";
    } else {
        document.getElementById('lang-pt').className = 'text-brand-orange font-bold';
        document.getElementById('lang-en').className = 'text-zinc-400 hover:text-black dark:hover:text-white transition';

        document.getElementById('nav-catalogo').innerText = "Catálogo";
        const navEventosElPt = document.getElementById('nav-eventos');
        if (navEventosElPt) navEventosElPt.innerText = "Eventos";
        document.getElementById('nav-sobre').innerText = "Sobre";

        document.getElementById('catalog-heading').innerText = "Séries Limitadas Fine Art";
        document.getElementById('filter-all').innerText = "Todos";
        document.getElementById('filter-available').innerText = "Disponíveis";
        document.getElementById('filter-urgent').innerText = "Últimas Unidades";

        const aboutHeadingElPt = document.getElementById('about-heading');
        const aboutTextElPt = document.getElementById('about-text');
        if (aboutHeadingElPt) aboutHeadingElPt.innerText = "Sobre o Artista";
        if (aboutTextElPt) aboutTextElPt.innerHTML = "Nascido em Jequié e forjado pelas ruas de São Paulo, minha jornada artística começou com um simples desenho de figurinhas de bala nos anos 90. Entre o grafite da metrópole e a calmaria do campo em Jaguaquara, aprendi que a arte é a tradução da alma. Com 20 anos de experiência, hoje utilizo o hiper-realismo para capturar mais do que imagens: capturo histórias, luzes e memórias rurais. Como artista, designer e desenvolvedor web, uno o rigor técnico à emoção, acreditando que uma casa à beira da estrada tem tanto a dizer quanto a paisagem que a envolve. Meu objetivo é simples: levar paz e reflexão a quem observa o que meus pincéis puderam registrar.";

        document.getElementById('modal-label-support').innerText = "Suporte";
        document.getElementById('modal-label-dimensions').innerText = "Dimensões";
        document.getElementById('modal-label-cta').innerText = "quero obra exclusiva agora";
    }

    renderGallery();
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

    document.querySelector('header')?.classList.toggle('scrolled', scrollTop > 24);
}

window.addEventListener('scroll', updateProgressBar);

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mainNav = document.getElementById('main-nav');
mobileMenuBtn?.addEventListener('click', () => mainNav.classList.toggle('hidden'));
mainNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mainNav.classList.add('hidden'));
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Aplica o idioma inicial
    changeLanguage(currentLang);

    // 2. Renderização Inteligente baseada na página atual
    if (document.getElementById('gallery-grid')) {
        renderGallery(); // Renderiza galeria apenas se o grid existir nesta página
    }
});