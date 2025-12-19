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

