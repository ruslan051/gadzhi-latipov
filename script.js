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
