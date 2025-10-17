// Contador de cliques para demonstração de engenharia social
class ClickCounter {
    constructor() {
        this.storageKey = 'socialEngineeringDemo_clicks';
        this.init();
    }

    init() {
        this.incrementCounter();
        this.displayCounter();
        this.addAnimations();
    }

    incrementCounter() {
        let currentCount = this.getStoredCount();
        currentCount++;
        localStorage.setItem(this.storageKey, currentCount.toString());
        return currentCount;
    }

    getStoredCount() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? parseInt(stored, 10) : 0;
    }

    displayCounter() {
        const counterElement = document.getElementById('clickCounter');
        if (counterElement) {
            const count = this.getStoredCount();
            this.animateNumber(counterElement, 0, count);
        }
    }

    animateNumber(element, start, end) {
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);

            element.textContent = current.toLocaleString('pt-BR');

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    addAnimations() {
        // Adicionar animação de entrada aos elementos
        const elements = document.querySelectorAll('.revelation-box, .stats-section, .explanation-section');
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.3}s`;
            el.classList.add('fade-in-up');
        });

        // Adicionar efeito de partículas ao contador
        this.addParticleEffect();
    }

    addParticleEffect() {
        const counter = document.getElementById('clickCounter');
        if (!counter) return;

        counter.addEventListener('animationend', () => {
            this.createParticles(counter);
        });
    }

    createParticles(element) {
        const particles = ['🎯', '🔍', '🛡️', '⚡', '🧠'];
        const rect = element.getBoundingClientRect();

        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.left = `${rect.left + rect.width / 2}px`;
            particle.style.top = `${rect.top + rect.height / 2}px`;

            document.body.appendChild(particle);

            // Animar partícula
            const angle = (Math.PI * 2 * i) / 5;
            const distance = 100;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1500,
                easing: 'ease-out'
            }).onfinish = () => {
                particle.remove();
            };
        }
    }
}

// Função para compartilhar insights
function shareInsight() {
    const text = `🎯 Acabei de aprender uma lição valiosa sobre engenharia social! Mesmo sendo cauteloso, a curiosidade pode nos tornar vulneráveis. A segurança digital é sobre vigilância constante, não apenas conhecimento. #CybersecurityAwareness #EngenhariasSocial`;

    if (navigator.share) {
        navigator.share({
            title: 'Lição sobre Engenharia Social',
            text: text,
            url: window.location.href
        });
    } else {
        // Fallback: copiar para clipboard
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Texto copiado para o clipboard!');
        }).catch(() => {
            // Fallback do fallback: abrir em nova aba com texto pré-preenchido
            const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
            window.open(linkedinUrl, '_blank');
        });
    }
}

// Função para mostrar notificações
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animar entrada
    notification.animate([
        { transform: 'translateY(-100%)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 }
    ], {
        duration: 300,
        easing: 'ease-out'
    });

    // Remover após 3 segundos
    setTimeout(() => {
        notification.animate([
            { transform: 'translateY(0)', opacity: 1 },
            { transform: 'translateY(-100%)', opacity: 0 }
        ], {
            duration: 300,
            easing: 'ease-in'
        }).onfinish = () => {
            notification.remove();
        };
    }, 3000);
}

// Detectar quando a página foi carregada de um link externo
function detectReferrer() {
    const referrer = document.referrer;
    if (referrer && referrer.includes('linkedin.com')) {
        // Adicionar classe especial para usuários vindos do LinkedIn
        document.body.classList.add('from-linkedin');
    }
}

// Adicionar efeitos de interação
function addInteractionEffects() {
    // Efeito hover nos cards
    const cards = document.querySelectorAll('.explanation-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new ClickCounter();
    detectReferrer();
    addInteractionEffects();

    // Adicionar listener para o botão de compartilhar
    const shareButton = document.querySelector('.btn-secondary');
    if (shareButton) {
        shareButton.addEventListener('click', shareInsight);
    }
});

// Prevenir que a página seja deixada muito rapidamente (dar tempo para a pessoa ler)
let pageViewed = false;
setTimeout(() => {
    pageViewed = true;
}, 5000); // 5 segundos

window.addEventListener('beforeunload', (event) => {
    if (!pageViewed) {
        event.preventDefault();
        event.returnValue = 'Tem certeza que deseja sair? Você ainda não terminou de ler sobre esta importante lição de segurança.';
        return event.returnValue;
    }
});