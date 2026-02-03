// =====================================================
// DETECTOR DE INFORMAÇÕES DO DISPOSITIVO
// Para demonstração educacional de engenharia social
// =====================================================

class DeviceInfoDetector {
    constructor() {
        this.info = {};
    }

    // Detectar navegador
    detectBrowser() {
        const userAgent = navigator.userAgent;
        let browserName = "Desconhecido";
        let browserVersion = "?";

        if (userAgent.indexOf("Firefox") > -1) {
            browserName = "Firefox";
            const match = userAgent.match(/Firefox\/(\d+(\.\d+)?)/);
            browserVersion = match ? match[1] : "?";
        } else if (userAgent.indexOf("SamsungBrowser") > -1) {
            browserName = "Samsung Internet";
            const match = userAgent.match(/SamsungBrowser\/(\d+(\.\d+)?)/);
            browserVersion = match ? match[1] : "?";
        } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
            browserName = "Opera";
            const match = userAgent.match(/(Opera|OPR)\/(\d+(\.\d+)?)/);
            browserVersion = match ? match[2] : "?";
        } else if (userAgent.indexOf("Edg") > -1) {
            browserName = "Microsoft Edge";
            const match = userAgent.match(/Edg\/(\d+(\.\d+)?)/);
            browserVersion = match ? match[1] : "?";
        } else if (userAgent.indexOf("Chrome") > -1) {
            browserName = "Chrome";
            const match = userAgent.match(/Chrome\/(\d+(\.\d+)?)/);
            browserVersion = match ? match[1] : "?";
        } else if (userAgent.indexOf("Safari") > -1) {
            browserName = "Safari";
            const match = userAgent.match(/Version\/(\d+(\.\d+)?)/);
            browserVersion = match ? match[1] : "?";
        }

        return { name: browserName, version: browserVersion };
    }

    // Detectar sistema operacional
    detectOS() {
        const userAgent = navigator.userAgent;

        if (userAgent.indexOf("Windows NT 10") > -1) return "Windows 10/11";
        if (userAgent.indexOf("Windows NT 6.3") > -1) return "Windows 8.1";
        if (userAgent.indexOf("Windows NT 6.2") > -1) return "Windows 8";
        if (userAgent.indexOf("Windows NT 6.1") > -1) return "Windows 7";
        if (userAgent.indexOf("Win") > -1) return "Windows";
        if (userAgent.indexOf("Mac") > -1) {
            if (userAgent.indexOf("iPhone") > -1) return "iOS (iPhone)";
            if (userAgent.indexOf("iPad") > -1) return "iOS (iPad)";
            return "macOS";
        }
        if (userAgent.indexOf("Android") > -1) {
            const match = userAgent.match(/Android\s(\d+(\.\d+)?)/);
            return match ? `Android ${match[1]}` : "Android";
        }
        if (userAgent.indexOf("Linux") > -1) return "Linux";
        if (userAgent.indexOf("CrOS") > -1) return "Chrome OS";

        return "Desconhecido";
    }

    // Detectar tipo de dispositivo
    detectDeviceType() {
        const userAgent = navigator.userAgent;

        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
            return "📱 Tablet";
        }
        if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
            return "📱 Smartphone";
        }
        return "💻 Desktop/Laptop";
    }

    // Detectar modelo específico do dispositivo (quando disponível)
    detectDeviceModel() {
        const userAgent = navigator.userAgent;

        // iPhone
        if (/iPhone/.test(userAgent)) {
            return "Apple iPhone";
        }
        // iPad
        if (/iPad/.test(userAgent)) {
            return "Apple iPad";
        }
        // Samsung
        if (/SM-[A-Z]\d{3}/.test(userAgent)) {
            const match = userAgent.match(/SM-[A-Z]\d{3}[A-Z]?/);
            return match ? `Samsung ${match[0]}` : "Samsung Galaxy";
        }
        // Xiaomi
        if (/Xiaomi|Redmi|POCO|Mi \d/.test(userAgent)) {
            return "Xiaomi/Redmi";
        }
        // Motorola
        if (/moto|Motorola/.test(userAgent)) {
            return "Motorola";
        }
        // Huawei
        if (/HUAWEI|Honor/.test(userAgent)) {
            return "Huawei/Honor";
        }
        // OnePlus
        if (/OnePlus/.test(userAgent)) {
            return "OnePlus";
        }
        // LG
        if (/LG-|LM-/.test(userAgent)) {
            return "LG";
        }
        // Google Pixel
        if (/Pixel/.test(userAgent)) {
            return "Google Pixel";
        }

        return this.detectDeviceType();
    }

    // Coletar todas as informações
    collectAll() {
        const browser = this.detectBrowser();
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

        return {
            // Dispositivo
            deviceType: this.detectDeviceModel(),
            os: this.detectOS(),
            platform: navigator.platform || "Não detectado",

            // Navegador
            browserName: browser.name,
            browserVersion: browser.version,
            language: navigator.language || "Não detectado",

            // Tela
            screenResolution: `${screen.width} x ${screen.height}`,
            screenOrientation: screen.orientation ?
                (screen.orientation.type.includes('portrait') ? '📱 Retrato' : '🖥️ Paisagem') :
                (screen.width > screen.height ? '🖥️ Paisagem' : '📱 Retrato'),
            hasTouch: ('ontouchstart' in window || navigator.maxTouchPoints > 0) ? "✅ Sim" : "❌ Não",

            // Hardware
            cpuCores: navigator.hardwareConcurrency ?
                `${navigator.hardwareConcurrency} núcleos` : "Não disponível",
            deviceMemory: navigator.deviceMemory ?
                `~${navigator.deviceMemory} GB` : "Não disponível",
            connectionType: connection ?
                connection.effectiveType.toUpperCase() : "Não disponível",

            // Extras
            userAgent: navigator.userAgent,
            accessTime: new Date().toLocaleString('pt-BR', {
                dateStyle: 'full',
                timeStyle: 'long'
            }),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
    }

    // Preencher os elementos na página
    populateUI() {
        const info = this.collectAll();

        // Mapeamento de IDs para valores
        const mappings = {
            'deviceType': info.deviceType,
            'deviceOS': info.os,
            'devicePlatform': info.platform,
            'browserName': info.browserName,
            'browserVersion': info.browserVersion,
            'browserLanguage': info.language,
            'screenResolution': info.screenResolution,
            'screenOrientation': info.screenOrientation,
            'hasTouch': info.hasTouch,
            'cpuCores': info.cpuCores,
            'deviceMemory': info.deviceMemory,
            'connectionType': info.connectionType,
            'userAgentFull': info.userAgent,
            'accessTime': info.accessTime,
            'timezone': info.timezone
        };

        // Preencher cada elemento com animação
        Object.entries(mappings).forEach(([id, value], index) => {
            const element = document.getElementById(id);
            if (element) {
                // Delay para efeito de "scanning"
                setTimeout(() => {
                    element.textContent = value;
                    element.style.animation = 'none';
                    element.offsetHeight; // Trigger reflow
                    element.style.animation = 'typewriter 0.3s ease-out';
                }, 800 + (index * 100));
            }
        });
    }
}

// =====================================================
// DETECTOR DE IP E LOCALIZAÇÃO VIA API
// =====================================================
async function detectIPLocation() {
    try {
        // Usar API gratuita para obter informações de IP
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        setTimeout(() => {
            updateElement('publicIP', data.ip || 'Não disponível');
            updateElement('ipCity', data.city || 'Não disponível');
            updateElement('ipRegion', data.region || 'Não disponível');
            updateElement('ipCountry', `${data.country_name || ''} ${data.country_code ? '(' + data.country_code + ')' : ''}`);
            updateElement('ipISP', data.org || 'Não disponível');
        }, 2500);
    } catch (error) {
        console.log('Erro ao detectar IP:', error);
        setTimeout(() => {
            updateElement('publicIP', 'Bloqueado');
            updateElement('ipCity', 'Não disponível');
            updateElement('ipRegion', 'Não disponível');
            updateElement('ipCountry', 'Não disponível');
            updateElement('ipISP', 'Não disponível');
        }, 2500);
    }
}

// =====================================================
// DETECTOR DE BATERIA
// =====================================================
async function detectBattery() {
    if ('getBattery' in navigator) {
        try {
            const battery = await navigator.getBattery();

            function updateBatteryInfo() {
                const level = Math.round(battery.level * 100);
                const charging = battery.charging;

                const batteryLevelEl = document.getElementById('batteryLevel');
                const batteryPercentageEl = document.getElementById('batteryPercentage');
                const batteryStatusEl = document.getElementById('batteryStatus');
                const batteryTimeEl = document.getElementById('batteryTime');

                if (batteryLevelEl) {
                    batteryLevelEl.style.width = `${level}%`;
                    // Mudar cor baseado no nível
                    if (level <= 20) {
                        batteryLevelEl.style.background = 'linear-gradient(90deg, #ef4444, #f87171)';
                    } else if (level <= 50) {
                        batteryLevelEl.style.background = 'linear-gradient(90deg, #fbbf24, #fcd34d)';
                    }
                }

                if (batteryPercentageEl) {
                    batteryPercentageEl.textContent = `${level}%`;
                }

                if (batteryStatusEl) {
                    batteryStatusEl.textContent = charging ? '⚡ Carregando' : '🔋 Descarregando';
                    batteryStatusEl.style.color = charging ? '#10b981' : '#fbbf24';
                }

                if (batteryTimeEl) {
                    if (charging && battery.chargingTime !== Infinity) {
                        const mins = Math.round(battery.chargingTime / 60);
                        batteryTimeEl.textContent = `${mins} min para carregar`;
                    } else if (!charging && battery.dischargingTime !== Infinity) {
                        const hours = Math.floor(battery.dischargingTime / 3600);
                        const mins = Math.round((battery.dischargingTime % 3600) / 60);
                        batteryTimeEl.textContent = `${hours}h ${mins}min restantes`;
                    } else {
                        batteryTimeEl.textContent = 'Calculando...';
                    }
                }
            }

            // Atualizar inicialmente
            setTimeout(updateBatteryInfo, 2800);

            // Listeners para mudanças
            battery.addEventListener('chargingchange', updateBatteryInfo);
            battery.addEventListener('levelchange', updateBatteryInfo);
        } catch (error) {
            hideBatterySection();
        }
    } else {
        hideBatterySection();
    }
}

function hideBatterySection() {
    const section = document.getElementById('batterySection');
    if (section) {
        section.innerHTML = `
            <div class="battery-header">
                <span class="info-icon">🔋</span>
                <h4>Bateria do Seu Dispositivo</h4>
            </div>
            <p style="color: #94a3b8; text-align: center; padding: 1rem;">
                API de bateria não disponível neste navegador
            </p>
        `;
    }
}

// =====================================================
// DETECTOR DE DISPOSITIVOS DE MÍDIA (Câmeras, Mics)
// =====================================================
async function detectMediaDevices() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();

        const cameras = devices.filter(d => d.kind === 'videoinput').length;
        const mics = devices.filter(d => d.kind === 'audioinput').length;
        const speakers = devices.filter(d => d.kind === 'audiooutput').length;

        setTimeout(() => {
            updateElement('camerasCount', cameras > 0 ? `${cameras} câmera(s) 📸` : 'Nenhuma');
            updateElement('micsCount', mics > 0 ? `${mics} microfone(s) 🎤` : 'Nenhum');
            updateElement('speakersCount', speakers > 0 ? `${speakers} alto-falante(s) 🔊` : 'Nenhum');
        }, 3000);
    } catch (error) {
        setTimeout(() => {
            updateElement('camerasCount', 'Bloqueado');
            updateElement('micsCount', 'Bloqueado');
            updateElement('speakersCount', 'Bloqueado');
        }, 3000);
    }
}

// =====================================================
// DETECTOR DE GPU (WebGL)
// =====================================================
function detectGPU() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        if (gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
                const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                setTimeout(() => {
                    updateElement('gpuInfo', renderer || 'Não disponível');
                }, 3200);
                return;
            }
        }
    } catch (error) {}

    setTimeout(() => {
        updateElement('gpuInfo', 'Não disponível');
    }, 3200);
}

// =====================================================
// DETECTOR DE MODO ANÔNIMO
// =====================================================
async function detectIncognito() {
    let isIncognito = false;

    // Método 1: Storage estimation
    if ('storage' in navigator && 'estimate' in navigator.storage) {
        const { quota } = await navigator.storage.estimate();
        // Em modo anônimo, a quota é geralmente menor
        if (quota && quota < 120000000) {
            isIncognito = true;
        }
    }

    // Método 2: IndexedDB
    try {
        const db = indexedDB.open('test');
        db.onerror = () => { isIncognito = true; };
    } catch (e) {
        isIncognito = true;
    }

    setTimeout(() => {
        updateElement('incognitoMode', isIncognito ? '🕵️ Possivelmente sim' : '👁️ Não');
    }, 3400);
}

// =====================================================
// DETECTOR DE DO NOT TRACK
// =====================================================
function detectDNT() {
    const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;

    setTimeout(() => {
        if (dnt === '1' || dnt === 'yes') {
            updateElement('dntStatus', '✅ Ativado');
        } else if (dnt === '0' || dnt === 'no') {
            updateElement('dntStatus', '❌ Desativado');
        } else {
            updateElement('dntStatus', '❓ Não configurado');
        }
    }, 3600);
}

// =====================================================
// FUNÇÕES DE PERMISSÕES - CÂMERA
// =====================================================
let cameraStream = null;

async function requestCamera() {
    const btn = document.getElementById('cameraBtn');
    const result = document.getElementById('cameraResult');
    const denied = document.getElementById('cameraDenied');
    const video = document.getElementById('cameraVideo');

    btn.innerHTML = '<span class="btn-icon">⏳</span> Solicitando permissão...';
    btn.disabled = true;

    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' },
            audio: false
        });

        video.srcObject = cameraStream;
        btn.style.display = 'none';
        result.style.display = 'block';
        denied.style.display = 'none';

    } catch (error) {
        btn.style.display = 'none';
        denied.style.display = 'flex';
        result.style.display = 'none';
    }
}

function capturePhoto() {
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('cameraCanvas');
    const photoContainer = document.getElementById('capturedPhoto');
    const photoImage = document.getElementById('photoImage');
    const captureBtn = document.getElementById('captureBtn');
    const cameraPreview = document.querySelector('.camera-preview');

    // Configurar canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Capturar frame
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    // Converter para imagem
    const imageData = canvas.toDataURL('image/png');
    photoImage.src = imageData;

    // Mostrar foto capturada
    photoContainer.style.display = 'block';

    // Parar o vídeo após um momento
    setTimeout(() => {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
        }
        cameraPreview.style.display = 'none';
        captureBtn.style.display = 'none';
    }, 500);
}

// =====================================================
// FUNÇÕES DE PERMISSÕES - GEOLOCALIZAÇÃO
// =====================================================
async function requestLocation() {
    const btn = document.getElementById('locationBtn');
    const result = document.getElementById('locationResult');
    const denied = document.getElementById('locationDenied');

    btn.innerHTML = '<span class="btn-icon">⏳</span> Solicitando permissão...';
    btn.disabled = true;

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const accuracy = position.coords.accuracy;

                btn.style.display = 'none';
                result.style.display = 'block';
                denied.style.display = 'none';

                updateElement('geoLat', lat.toFixed(6));
                updateElement('geoLon', lon.toFixed(6));
                updateElement('geoAccuracy', `±${Math.round(accuracy)}m`);

                // Tentar obter endereço via reverse geocoding
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
                    );
                    const data = await response.json();
                    updateElement('geoAddress', data.display_name || 'Não disponível');
                } catch (e) {
                    updateElement('geoAddress', `${lat.toFixed(4)}, ${lon.toFixed(4)}`);
                }
            },
            (error) => {
                btn.style.display = 'none';
                denied.style.display = 'flex';
                result.style.display = 'none';
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    } else {
        btn.style.display = 'none';
        denied.style.display = 'flex';
        denied.querySelector('span:last-child').textContent = 'Geolocalização não suportada neste navegador';
    }
}

// =====================================================
// FUNÇÕES DE PERMISSÕES - MICROFONE
// =====================================================
let micStream = null;

async function requestMicrophone() {
    const btn = document.getElementById('micBtn');
    const result = document.getElementById('micResult');
    const denied = document.getElementById('micDenied');

    btn.innerHTML = '<span class="btn-icon">⏳</span> Solicitando permissão...';
    btn.disabled = true;

    try {
        micStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        });

        btn.style.display = 'none';
        result.style.display = 'block';
        denied.style.display = 'none';

        // Parar após 5 segundos para não ficar gravando eternamente
        setTimeout(() => {
            if (micStream) {
                micStream.getTracks().forEach(track => track.stop());
                const statusEl = document.querySelector('.mic-status');
                if (statusEl) {
                    statusEl.textContent = '✅ Microfone desativado (demonstração encerrada)';
                    statusEl.style.color = '#10b981';
                }
            }
        }, 5000);

    } catch (error) {
        btn.style.display = 'none';
        denied.style.display = 'flex';
        result.style.display = 'none';
    }
}

// =====================================================
// FUNÇÃO AUXILIAR PARA ATUALIZAR ELEMENTOS
// =====================================================
function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
        element.style.animation = 'none';
        element.offsetHeight;
        element.style.animation = 'typewriter 0.3s ease-out';
    }
}

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

    // Inicializar detector de dispositivo básico
    const deviceDetector = new DeviceInfoDetector();
    deviceDetector.populateUI();

    // Inicializar detecções adicionais
    detectIPLocation();      // IP e localização por IP
    detectBattery();         // Nível de bateria
    detectMediaDevices();    // Câmeras e microfones disponíveis
    detectGPU();             // Informações da GPU
    detectIncognito();       // Modo anônimo
    detectDNT();             // Do Not Track

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