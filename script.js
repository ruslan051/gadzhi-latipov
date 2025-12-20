// Эффект при скролле проектов
let lastScrollY = 0;
let ticking = false;

// Плавное появление элементов при скролле
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
    observer.observe(element);
});

// Эффект параллакса для сетки
document.addEventListener('mousemove', (e) => {
    const grid = document.querySelector('.elegant-grid');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    grid.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
});

// Плавный скролл для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Случайное мерцание карточек проектов
setInterval(() => {
    if (Math.random() > 0.7) {
        const cards = document.querySelectorAll('.project-card-elegant');
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        
        randomCard.style.boxShadow = '0 0 40px rgba(0, 224, 255, 0.9)';
        
        setTimeout(() => {
            randomCard.style.boxShadow = '0 0 20px rgba(0, 224, 255, 0.7)';
        }, 300);
    }
}, 2000);

// Эффект при наведении на email
const emailLink = document.querySelector('.email-elegant');
if (emailLink) {
    emailLink.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    emailLink.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// Эффект при наведении на скиллы
document.querySelectorAll('.skill-chip').forEach(chip => {
    chip.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    chip.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Анимация титульного текста (дополнительная)
window.addEventListener('load', function() {
    const titleElement = document.querySelector('.title-pulse-glitch');
    
    // Периодическое усиление глитч-эффекта
    setInterval(() => {
        if (Math.random() > 0.5) {
            titleElement.style.animation = 'none';
            setTimeout(() => {
                titleElement.style.animation = 
                    'neonPulse 3s ease-in-out infinite alternate, glitchShift 5s infinite';
            }, 50);
        }
    }, 5000);
});

// Эффект клика по карточкам
document.querySelectorAll('.project-card-elegant').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'translateY(-10px)';
        }, 150);
    });
});

// Адаптация сетки при изменении размера окна
window.addEventListener('resize', function() {
    const grid = document.querySelector('.elegant-grid');
    grid.style.backgroundSize = '60px 60px';
});

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    console.log('Киберпанк сайт Гаджи Латипова загружен!');
    
    // Устанавливаем год в футере
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-text');
    if (yearElement) {
        yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
    }
});

// Добавляем звуковые эффекты (опционально)
const enableSoundEffects = false; // поменяйте на true, если хотите звуки

if (enableSoundEffects) {
    // Создаем аудио элементы
    const hoverSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3');
    const clickSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-electronic-retro-block-hit-2185.mp3');
    
    // Звук при наведении на карточки
    document.querySelectorAll('.project-card-elegant, .email-elegant, .skill-chip').forEach(element => {
        element.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.volume = 0.3;
            hoverSound.play();
        });
        
        element.addEventListener('click', () => {
            clickSound.currentTime = 0;
            clickSound.volume = 0.5;
            clickSound.play();
        });
    });
}

function updateProjectsOnScroll() {
    const projects = document.querySelectorAll('.full-width-project');
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    projects.forEach(project => {
        const rect = project.getBoundingClientRect();
        const projectTop = rect.top;
        const projectBottom = rect.bottom;
        
        // Если проект в области видимости
        if (projectTop < windowHeight && projectBottom > 0) {
            const visiblePercent = Math.min(100, Math.max(0, 
                ((windowHeight - projectTop) / (projectBottom - projectTop)) * 100
            ));
            
            // Эффект параллакса
            project.style.transform = `translateX(${visiblePercent * 0.1}px)`;
            
            // Эффект свечения при попадании в центр экрана
            const centerThreshold = windowHeight / 2;
            const distanceFromCenter = Math.abs(rect.top + rect.height/2 - centerThreshold);
            const intensity = Math.max(0, 1 - distanceFromCenter / centerThreshold);
            
            if (intensity > 0.3) {
                project.style.boxShadow = `0 0 ${30 * intensity}px rgba(255, 255, 255, 0.2)`;
            } else {
                project.style.boxShadow = 'none';
            }
        }
    });
    
    lastScrollY = scrollY;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateProjectsOnScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// Эффект при наведении на проекты
document.querySelectorAll('.full-width-project').forEach(project => {
    project.addEventListener('mouseenter', function() {
        const color = getComputedStyle(this.querySelector('.status-dot')).color;
        this.style.borderLeftWidth = '10px';
        this.style.borderLeftColor = color;
        
        // Эффект усиления анимации
        const beforeElement = this.querySelector('.project-inner')?.parentElement;
        if (beforeElement) {
            beforeElement.style.animationDuration = '0.5s';
            setTimeout(() => {
                beforeElement.style.animationDuration = '';
            }, 500);
        }
    });
    
    project.addEventListener('mouseleave', function() {
        this.style.borderLeftWidth = '5px';
    });
});

// Анимация при клике на проект
document.querySelectorAll('.full-width-project').forEach(project => {
    project.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' || e.target.closest('a')) return;
        
        this.style.transform = 'translateX(10px) scale(1.01)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
        
        // Эффект пульсации
        const indicator = this.querySelector('.status-dot');
        if (indicator) {
            indicator.style.transform = 'scale(1.5)';
            setTimeout(() => {
                indicator.style.transform = 'scale(1)';
            }, 300);
        }
    });
});

// Эффект постепенного появления проектов при загрузке
window.addEventListener('load', function() {
    const projects = document.querySelectorAll('.full-width-project');
    projects.forEach((project, index) => {
        setTimeout(() => {
            project.style.opacity = '1';
            project.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Анимированный текст Приветствия  
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('[data-text]');
    
    elements.forEach(element => {
        const text = element.getAttribute('data-text');
        let index = 0;
        const speed = 200;
        
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else {
                element.style.borderRight = 'none';
            }
        }
        
        // Начинаем печать через секунду
        setTimeout(type, 1000);
    });
});

// Навигация по проектам
const quickNav = document.querySelector('.quick-nav');
const navLinks = document.querySelectorAll('.nav-list a');
const projects = document.querySelectorAll('.full-width-project');

// Добавляем ID проектам
projects.forEach((project, index) => {
    project.id = `project-${index + 1}`;
});

// Активная навигация при скролле
function updateActiveNav() {
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    let currentActive = null;
    
    projects.forEach(project => {
        const projectTop = project.offsetTop;
        const projectBottom = projectTop + project.offsetHeight;
        
        if (scrollPosition >= projectTop && scrollPosition <= projectBottom) {
            currentActive = project.id;
        }
    });
    
    navLinks.forEach(link => {
        link.parentElement.classList.remove('active');
        if (link.getAttribute('href') === `#${currentActive}`) {
            link.parentElement.classList.add('active');
        }
    });
}

// Плавный скролл для навигации
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Анимация клика
            this.style.color = '#00ffaa';
            setTimeout(() => {
                this.style.color = '';
            }, 300);
        }
    });
});

// Обновление активной ссылки при скролле
let navScrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(navScrollTimeout);
    navScrollTimeout = setTimeout(updateActiveNav, 50);
});

// Инициализация
updateActiveNav();

// Авто-скрытие/показ навигации при скролле
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Скролл вниз
        quickNav.style.transform = 'translateY(-50%) translateX(20px)';
        quickNav.style.opacity = '0.1';
    } else {
        // Скролл вверх
        quickNav.style.transform = 'translateY(-50%) translateX(0)';
        if (!quickNav.matches(':hover')) {
            quickNav.style.opacity = '0.3';
        }
    }
    
    lastScrollTop = scrollTop;
});

// Эффект при наведении на панель
quickNav.addEventListener('mouseenter', function() {
    this.style.opacity = '1';
    this.style.transform = 'translateY(-50%) scale(1.02)';
});

quickNav.addEventListener('mouseleave', function() {
    this.style.opacity = '0.3';
    this.style.transform = 'translateY(-50%)';
});

// Плавное появление навигации при загрузке
window.addEventListener('load', function() {
    setTimeout(() => {
        quickNav.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        quickNav.style.opacity = '0.3';
    }, 1000);
});

// ===== МОБИЛЬНАЯ НАВИГАЦИЯ =====
const mobileToggle = document.createElement('div');
mobileToggle.className = 'mobile-nav-toggle';
mobileToggle.innerHTML = `
    <i class="fas fa-bars"></i>
    <i class="fas fa-times"></i>
    <span class="mobile-badge">${projects.length}</span>
`;

const mobileOverlay = document.createElement('div');
mobileOverlay.className = 'mobile-nav-overlay';

document.body.appendChild(mobileToggle);
document.body.appendChild(mobileOverlay);

// Переключение мобильного меню
mobileToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('active');
    quickNav.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    
    // Анимация кнопки
    if (this.classList.contains('active')) {
        this.style.transform = 'rotate(90deg) scale(0.95)';
        this.style.background = 'rgba(0, 224, 255, 0.15)';
    } else {
        this.style.transform = 'rotate(0) scale(1)';
        this.style.background = 'rgba(10, 10, 20, 0.95)';
    }
});

// Закрытие меню по клику на оверлей
mobileOverlay.addEventListener('click', function() {
    mobileToggle.classList.remove('active');
    quickNav.classList.remove('active');
    this.classList.remove('active');
    mobileToggle.style.transform = 'rotate(0) scale(1)';
    mobileToggle.style.background = 'rgba(10, 10, 20, 0.95)';
});

// Закрытие меню по клику на ссылку
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 1024) {
            mobileToggle.classList.remove('active');
            quickNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            mobileToggle.style.transform = 'rotate(0) scale(1)';
            mobileToggle.style.background = 'rgba(10, 10, 20, 0.95)';
        }
    });
});

// Закрытие меню по свайпу (для мобильных)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 100;
    const swipeDistance = touchEndX - touchStartX;
    
    // Свайп вправо закрывает меню
    if (swipeDistance > swipeThreshold && quickNav.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        quickNav.classList.remove('active');
        mobileOverlay.classList.remove('active');
    }
}

// Адаптивное поведение для разных устройств
function checkViewport() {
    const isMobile = window.innerWidth <= 1024;
    
    if (isMobile) {
        // Для мобильных: скрываем навигацию по умолчанию
        quickNav.style.display = 'none';
        quickNav.classList.remove('active');
        mobileToggle.style.display = 'flex';
        
        // Убираем эффект hover для мобильных
        quickNav.style.opacity = '1';
        quickNav.style.transform = 'translateY(-50%)';
        
        // Увеличиваем отступы для touch
        navLinks.forEach(link => {
            link.style.padding = '15px 20px';
            link.style.marginBottom = '5px';
        });
    } else {
        // Для десктопов: показываем навигацию
        quickNav.style.display = 'block';
        mobileToggle.style.display = 'none';
        mobileOverlay.style.display = 'none';
        
        // Возвращаем desktop эффекты
        quickNav.style.opacity = '0.3';
        quickNav.style.transform = 'translateY(-50%)';
        
        navLinks.forEach(link => {
            link.style.padding = '12px 15px';
            link.style.marginBottom = '8px';
        });
    }
}

// Проверяем при загрузке и изменении размера
checkViewport();
window.addEventListener('resize', checkViewport);

// Отключаем параллакс на мобильных для производительности
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Упрощаем анимации для мобильных
        const grid = document.querySelector('.elegant-grid');
        if (grid) {
            grid.style.animation = 'none';
            grid.style.transform = 'none';
        }
        
        // Уменьшаем сложные фоны проектов
        projects.forEach(project => {
            const beforeElement = project.querySelector(':before');
            if (beforeElement) {
                project.style.animation = 'none';
            }
        });
    }
}

// Инициализация оптимизаций
optimizeForMobile();
window.addEventListener('resize', optimizeForMobile);

// Улучшенное определение активного проекта для мобильных
function updateActiveNavMobile() {
    const scrollPosition = window.scrollY + 100; // Смещение для мобильных
    
    let currentActive = null;
    let minDistance = Infinity;
    
    projects.forEach(project => {
        const projectTop = project.offsetTop;
        const projectCenter = projectTop + project.offsetHeight / 3;
        const distance = Math.abs(scrollPosition - projectCenter);
        
        if (distance < minDistance) {
            minDistance = distance;
            currentActive = project.id;
        }
    });
    
    // Обновляем активную ссылку
    navLinks.forEach(link => {
        link.parentElement.classList.remove('active');
        if (link.getAttribute('href') === `#${currentActive}`) {
            link.parentElement.classList.add('active');
            
            // Прокручиваем активный элемент в вид навигации (для мобильных)
            if (quickNav.classList.contains('active')) {
                link.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }
    });
}

// Обновляем функцию скролла
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    
    if (window.innerWidth <= 1024) {
        // Для мобильных: более частое обновление
        updateActiveNavMobile();
    } else {
        // Для десктопов: стандартное обновление
        scrollTimeout = setTimeout(updateActiveNav, 100);
    }
}, { passive: true });

// Добавляем вибрацию для мобильных (опционально)
if ('vibrate' in navigator && window.innerWidth <= 1024) {
    mobileToggle.addEventListener('click', function() {
        navigator.vibrate(10);
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navigator.vibrate(5);
        });
    });
}

// Предотвращаем зум при двойном тапе
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });

// Адаптивные отступы для проектов на мобильных
function adjustProjectSpacing() {
    if (window.innerWidth <= 768) {
        projects.forEach(project => {
            project.style.padding = '40px 15px';
            project.style.marginBottom = '10px';
            project.style.scrollMarginTop = '80px'; // Для мобильной навигации
        });
    }
}

adjustProjectSpacing();
window.addEventListener('resize', adjustProjectSpacing);

// Ленивая загрузка для мобильных (улучшение производительности)
if ('IntersectionObserver' in window && window.innerWidth <= 768) {
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const project = entry.target;
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
                lazyObserver.unobserve(project);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    // Наблюдаем за проектами
    projects.forEach(project => {
        project.style.opacity = '0';
        project.style.transform = 'translateY(20px)';
        project.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        lazyObserver.observe(project);
    });
}
initMobileNav();
window.addEventListener('resize', initMobileNav);