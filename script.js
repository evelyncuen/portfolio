// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.offsetTop - document.querySelector('.header').offsetHeight, behavior: 'smooth' });
            document.querySelector('.nav').classList.remove('active');
            document.querySelector('.mobile-menu-toggle').classList.remove('active');
        }
    });
});

// ========================================
// MOBILE MENU
// ========================================
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');
mobileToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
});
document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav') && !e.target.closest('.mobile-menu-toggle')) {
        nav.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
});

// ========================================
// STICKY HEADER
// ========================================
window.addEventListener('scroll', function() {
    document.querySelector('.header').classList.toggle('scrolled', window.scrollY > 100);
    document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 500);
});

// ========================================
// ANIMATE ON SCROLL
// ========================================
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// ========================================
// BACK TO TOP
// ========================================
document.getElementById('backToTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ========================================
// ACTIVE NAV HIGHLIGHT
// ========================================
window.addEventListener('scroll', function() {
    const scrollPos = window.scrollY + 200;
    let current = '';
    document.querySelectorAll('section[id]').forEach(s => {
        if (scrollPos >= s.offsetTop && scrollPos < s.offsetTop + s.offsetHeight) current = s.id;
    });
    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
});

// ========================================
// MODAL — CASOS DE ESTUDIO + GALERÍAS
// ========================================
const modal = document.getElementById('caseStudyModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.modal-close');

// Helper para generar la sección de galería dentro del modal
function gallerySection(label, img1, img2) {
    return `
    <div class="modal-gallery">
        <h3>Imágenes del proyecto</h3>
        <div class="modal-gallery-grid">
            <img src="${img1}" alt="${label} - imagen 1">
            <img src="${img2}" alt="${label} - imagen 2">
        </div>
    </div>`;
}

const caseStudies = {
    'rh': {
        content: `
        <h2>Automatización para contrataciones</h2>
        <h3>Objetivo</h3>
        <p>Optimizar el registro y gestión de información del área de Recursos Humanos mediante formularios digitales y generación automática de solicitudes.</p>
        <h3>Problema/reto</h3>
        <p>El área de Recursos Humanos realizaba parte de sus procesos de captura y documentación manualmente, lo que dificultaba la organización de la información y hacía más lento el seguimiento de solicitudes.</p>
        <h3>Proceso</h3>
        <ul>
            <li><strong>Investigación y análisis:</strong> Identificación del flujo de trabajo existente y de las necesidades del área de RH.</li>
            <li><strong>Diseño del flujo:</strong> Planeación de un sistema basado en formularios digitales conectados a hojas de cálculo.</li>
            <li><strong>Desarrollo:</strong> Creación del formulario digital y scripts para generar reportes PDF dinámicos.</li>
            <li><strong>UX y usabilidad:</strong> Formularios intuitivos y procesos fáciles de seguir para usuarios sin conocimientos técnicos.</li>
        </ul>
        <h3>Herramientas</h3>
        <p>Google Apps Script · Google Sheets · AutoCrat · HTML/CSS/JS</p>
        <h3>Resultado</h3>
        <p>La solución permitió agilizar procesos administrativos y reducir tareas manuales relacionadas con captura y generación de documentos.</p>
        ${gallerySection('Automatización RH',
            'img/RH_1.png',
            'img/RH_2.jpg')}`
    },
    'newsletter': {
        content: `
        <h2>Newsletter corporativo</h2>
        <h3>Objetivo</h3>
        <p>Crear un newsletter corporativo funcional y adaptable que compartiera contenido relevante del sector industrial y logístico.</p>
        <h3>Problema/reto</h3>
        <p>Desarrollar un newsletter compatible con versiones antiguas de Outlook, garantizando una experiencia visual clara bajo limitaciones técnicas como el bloqueo automático de imágenes.</p>
        <h3>Proceso</h3>
        <ul>
            <li><strong>Investigación y planeación:</strong> Análisis de limitaciones técnicas de clientes de correo y selección de contenido relevante del sector.</li>
            <li><strong>Diseño y desarrollo:</strong> Plantilla reutilizable con HTML y CSS optimizados para email marketing.</li>
            <li><strong>Automatización:</strong> Estructura dinámica conectada a Power Automate para actualizar contenido sin modificar el código base.</li>
            <li><strong>Seguimiento:</strong> Monitoreo de clics en CTAs y administración de base de suscriptores.</li>
        </ul>
        <h3>Herramientas</h3>
        <p>HTML · CSS · Power Automate · Excel</p>
        <h3>Resultado</h3>
        <p>Optimización de tiempos de producción y fortalecimiento de la comunicación de marca mediante contenido útil para el sector industrial.</p>
        ${gallerySection('Newsletter',
            'img/News_full.png',
            'img/News_diagrama.png')}`
    },
    'shelter': {
        content: `
        <h2>Sitio web para empresa Shelter</h2>
        <h3>Objetivo</h3>
        <p>Crear una plataforma web capaz de dar visibilidad y seriedad al negocio, explicando de forma clara el modelo Shelter para empresas extranjeras que buscan establecer operaciones en México.</p>
        <h3>Problema/reto</h3>
        <p>Transformar información operativa compleja en una experiencia web clara, accesible y fácil de entender para clientes internacionales.</p>
        <h3>Proceso</h3>
        <ul>
            <li><strong>Investigación y estructuración:</strong> Definición de la estructura del sitio priorizando información relevante para usuarios internacionales.</li>
            <li><strong>Dirección visual y UX/UI:</strong> Interfaz corporativa enfocada en claridad, jerarquía visual y navegación intuitiva.</li>
            <li><strong>Desarrollo web:</strong> Implementación en WordPress con enfoque ágil para optimizar tiempos de producción.</li>
            <li><strong>Recursos visuales:</strong> Integración y optimización de imágenes para coherencia con la identidad corporativa.</li>
        </ul>
        <h3>Herramientas</h3>
        <p>WordPress · Elementor · HTML/CSS</p>
        <h3>Resultado</h3>
        <p>Sitio web corporativo claro, moderno y funcional que reforzó la seriedad de la empresa ante clientes potenciales internacionales.</p>
        ${gallerySection('Shelter',
            'img/Shelter_Home.jpg',
            'img/Shelter_Mockup.jpg')}`
    },
    'eloise': {
        content: `
        <h2>La odisea de Eloise</h2>
        <h3>Objetivo</h3>
        <p>Diseñar y desarrollar un juego serio que funcione como una herramienta de sensibilización sobre el daltonismo en los videojuegos. El propósito era demostrar, mediante mecánicas de juego, cómo las barreras visuales afectan la experiencia del jugador y cómo la implementación de soluciones de accesibilidad puede crear entornos más inclusivos sin sacrificar la estética.</p>
        <h3>Problema/reto</h3>
        <p>Muchos videojuegos no consideran adecuadamente a jugadores con daltonismo, usando paletas de color poco accesibles o mensajes visuales que depende únicamente del color. El reto era explicar estos problemas y sus soluciones de forma lúdica, sin convertir el juego en un tutorial teórico.</p>
        <h3>Proceso</h3>
        <ul>
            <li><strong>Investigación:</strong> Se hizo una revisión de los tipos de daltonismo existentes y ejemplos de interfaces poco accesibles en videojuegos</li>
            <li><strong>Diseño de experiencia:</strong> Creación de la narrativa, diseño de personajes, niveles y mecánicas de juego. Se decidió desarrollar un recorrido por escenarios donde Eloise y su mascota Kiwi aprenden conceptos de accesibilidad.</li>
            <li><strong>UX/UI:</strong> Se diseñaron paletas de color probadas para distintos tipos de daltonismo, uso de iconos y patrones para transmitir información</li>
            <li><strong>Implementación:</strong> Desarrollo de la experiencia en Unity, integración y programación de todos los recursos para la funcionalidad completa del videojuego..</li>
        </ul>
        <h3>Resultado</h3>
        <p>Se consolidó una herramienta didáctica eficaz para que estudiantes y desarrolladores entiendan las necesidades de jugadores con daltonismo. El proyecto demuestra que la accesibilidad es un valor agregado al diseño que mejora la experiencia para todos los usuarios, fortaleciendo la capacidad de los creadores para desarrollar productos más inclusivos y con mayor alcance en el mercado global.</p>
        ${gallerySection('La odisea de Eloise',
            'img/Videojuego_1.png',
            'img/Videojuego_2.png')}`
    },
    'mictlan': {
        content: `
        <h2>Viaje al Mictlán</h2>
        <h3>Objetivo</h3>
        <p>Crear una experiencia audiovisual inmersiva inspirada en el trayecto por los siete niveles del Mictlán, presentada durante la celebración del Día de Muertos.</p>
        <h3>Problema/reto</h3>
        <p>Diseñar contenido visual para una sala inmersiva y no para una pantalla tradicional, considerando múltiples superficies de proyección, continuidad visual y percepción espacial.</p>
        <h3>Proceso</h3>
        <ul>
            <li><strong>Investigación visual y conceptual:</strong> Exploración de referencias sobre la cosmovisión mexica y símbolos del Mictlán.</li>
            <li><strong>Diseño y narrativa visual:</strong> Planeación de escenas inspiradas en el recorrido por los distintos niveles del inframundo.</li>
            <li><strong>Animación y adaptación espacial:</strong> Desarrollo de animaciones considerando la arquitectura de la sala y distribución de proyectores.</li>
            <li><strong>Producción multimedia:</strong> Integración de motion graphics y composición audiovisual.</li>
        </ul>
        <h3>Herramientas</h3>
        <p>After Effects · Photoshop · Illustrator · Resolume Arena</p>
        <h3>Resultado</h3>
        <p>El proyecto transformó el espacio físico en una experiencia audiovisual inspirada en la cultura mexica durante la celebración del Día de Muertos.</p>
        ${gallerySection('Viaje al Mictlán',
            'img/Mictlan_1.jpg',
            'img/Mictlan_2.jpeg')}`
    },
    'juanGabriel': {
        content: `
        <h2>Do de pecho</h2>
        <h3>Objetivo</h3>
        <p>Desarrollar una experiencia audiovisual inmersiva como tributo a Juan Gabriel, representando distintas etapas de su trayectoria artística y legado cultural.</p>
        <h3>Problema/reto</h3>
        <p>Traducir momentos clave de la vida y carrera de Juan Gabriel en una experiencia visual envolvente capaz de conectar emocionalmente con el público, adaptada técnicamente a la sala inmersiva.</p>
        <h3>Proceso</h3>
        <ul>
            <li><strong>Planeación conceptual:</strong> Narrativa visual basada en orígenes, presentaciones emblemáticas, logros y legado del artista.</li>
            <li><strong>Diseño visual:</strong> Composiciones inspiradas en la identidad artística de Juan Gabriel.</li>
            <li><strong>Motion graphics y adaptación inmersiva:</strong> Animaciones y transiciones considerando el espacio de la sala.</li>
            <li><strong>Producción audiovisual:</strong> Integración de motion graphics, sonido y recursos visuales.</li>
        </ul>
        <h3>Herramientas</h3>
        <p>After Effects · Photoshop · Illustrator · Resolume Arena</p>
        <h3>Resultado</h3>
        <p>La experiencia reinterpretó visualmente el legado artístico de Juan Gabriel, conectando emocionalmente con los asistentes mediante una propuesta inmersiva.</p>
        ${gallerySection('Do de pecho',
            'img/DoPecho_1.jpg',
            'img/DoPecho_2.jpg')}`
    }
};

// Abrir modal — casos de estudio
document.querySelectorAll('[data-project]').forEach(btn => {
    btn.addEventListener('click', function() {
        const key = this.getAttribute('data-project');
        const study = caseStudies[key];
        if (study) {
            modalBody.innerHTML = study.content;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Datos de galerías para "otros proyectos"
const otherGalleries = {
    'redes': {
        title: 'Redes sociales',
        images: ['img/RSS_1.jpg'],
        video: 'https://www.youtube.com/embed/OaWK0o7JU6I'
    },
    '3d': {
        title: 'Modelado 3D',
        images: [
            'img/Modelado_1.jpg',
            'img/Modelado_2.jpg'
        ]
    },
    'motion': {
        title: 'Motion Graphics',
        images: [
            'img/Motion_1.gif',
            'img/Motion_2.gif'
        ]
    }
};

// Abrir modal — galerías de otros proyectos
document.querySelectorAll('[data-gallery]').forEach(btn => {
    btn.addEventListener('click', function() {
        const key = this.getAttribute('data-gallery');
        const gallery = otherGalleries[key];
        if (gallery) {
           const secondMedia = gallery.video
            ? `<iframe
                    src="${gallery.video}"
                    frameborder="0"
                    allowfullscreen
                    style="width:100%; aspect-ratio:16/9; border-radius:8px; border:none;">
                </iframe>`
            : `<img src="${gallery.images[1]}" alt="${gallery.title} - imagen 2">`;
            modalBody.innerHTML = `
                <h2>${gallery.title}</h2>
                <div class="gallery-modal-grid">
                    <img src="${gallery.images[0]}" alt="${gallery.title} - imagen 1">
                    ${secondMedia}
                </div>`;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Cerrar modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

// ========================================
// LIGHTBOX
// ========================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
    document.body.style.overflow = '';
}

// Clic en imágenes de tarjetas y modales
document.addEventListener('click', function(e) {
    if (e.target.matches(
        '.other-project-gallery img, .gallery-modal-grid img, .modal-gallery-grid img'
    )) {
        openLightbox(e.target.src, e.target.alt);
    }
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
});

// Cerrar modal y/o galerías con Esc:
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (lightbox.style.display === 'flex') closeLightbox();
        else if (modal.classList.contains('active')) closeModal();
    }
});