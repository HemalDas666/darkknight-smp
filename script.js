// ============================================
// DARK KNIGHT SMP - COMPLETE WEBSITE SCRIPT
// ============================================

// When page loads
document.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
    initHeaderScroll();
    initMobileMenu();
    initModal();
    initBackToTop();
    initParticles();
    initSmoothScroll();
    
    // Show welcome achievement
    setTimeout(() => {
        showAchievementNotification();
    }, 1500);
});

// ====================
// LOADING SCREEN
// ====================
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// ====================
// HEADER SCROLL
// ====================
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ====================
// MOBILE MENU
// ====================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.navigation');
    
    if (menuToggle && navigation) {
        menuToggle.addEventListener('click', () => {
            navigation.classList.toggle('active');
            menuToggle.innerHTML = navigation.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking links
        document.querySelectorAll('.navigation a').forEach(link => {
            link.addEventListener('click', () => {
                navigation.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

// ====================
// MODAL
// ====================
function initModal() {
    const modal = document.querySelector('#ipModal');
    const closeBtn = document.querySelector('.close-modal');
    const joinBtn = document.querySelector('.join-btn');
    
    if (modal && closeBtn) {
        // Close modal
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        // Close when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }
    
    if (joinBtn) {
        // Show modal when Join button clicked
        joinBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.querySelector('#ipModal');
            if (modal) {
                modal.classList.add('active');
            }
        });
    }
}

// ====================
// COPY SERVER IP - FIXED VERSION
// ====================
window.copyIP = async function() {
    const ip = 'darkknightsmp.qzz.io';
    
    try {
        // Modern clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(ip);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = ip;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            textArea.setSelectionRange(0, 99999); // For mobile devices
            
            const success = document.execCommand('copy');
            document.body.removeChild(textArea);
            
            if (!success) {
                throw new Error('Copy failed');
            }
        }
        
        // Show success notification
        showNotification('success', 
            'SERVER IP COPIED!', 
            'Paste in Minecraft Multiplayer',
            4000
        );
        
        // Vibrate on mobile
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
        
        // Close modal if open
        const modal = document.querySelector('#ipModal');
        if (modal && modal.classList.contains('active')) {
            setTimeout(() => {
                modal.classList.remove('active');
            }, 1000);
        }
        
    } catch (err) {
        // Show error if copy fails
        showNotification('error',
            'COPY FAILED',
            'Please copy manually: ' + ip,
            6000
        );
    }
};

// ====================
// DISCORD BUTTON - FIXED VERSION
// ====================
function showDiscord() {
    const discordLink = 'https://discord.gg/DeRxD8wq';
    
    showCenterNotification(
        'JOIN OUR DISCORD!',
        'Connect with players, get updates, and join the community!',
        'fa-discord'
    );
    
    // Open after delay
    setTimeout(() => {
        window.open(discordLink, '_blank');
        hideCenterNotification();
    }, 2000);
}

// ====================
// BACK TO TOP
// ====================
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ====================
// PARTICLES
// ====================
function initParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    
    if (!particlesContainer) return;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Apply properties
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.backgroundColor = getRandomColor();
        
        particlesContainer.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, (duration + delay) * 1000);
    }
    
    function getRandomColor() {
        const colors = [
            '#00e1ff',
            '#6c5ce7',
            '#ff0080',
            '#00ff80',
            '#ffcc00'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Create initial particles
    for (let i = 0; i < 50; i++) {
        createParticle();
    }
    
    // Create particles periodically
    setInterval(createParticle, 300);
}

// ====================
// SMOOTH SCROLL
// ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ====================
// NOTIFICATION SYSTEM
// ====================

// Show toast notification
function showNotification(type, title, message, duration = 5000) {
    const container = document.getElementById('notificationContainer');
    
    if (!container) return null;
    
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    
    const icons = {
        success: 'fas fa-check',
        error: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle',
        achievement: 'fas fa-trophy',
        warning: 'fas fa-exclamation-circle'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${icons[type] || 'fas fa-bell'}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
        <div class="toast-progress">
            <div class="toast-progress-bar"></div>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Show animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Set progress bar animation
    const progressBar = toast.querySelector('.toast-progress-bar');
    if (progressBar) {
        progressBar.style.animationDuration = `${duration}ms`;
    }
    
    // Auto remove
    if (duration > 0) {
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode === container) {
                    container.removeChild(toast);
                }
            }, 500);
        }, duration);
    }
    
    return toast;
}

// Show center modal notification
function showCenterNotification(title, message, icon = 'fa-gamepad') {
    const modal = document.getElementById('centerNotification');
    if (!modal) return;
    
    const titleEl = document.getElementById('centerNotificationTitle');
    const messageEl = document.getElementById('centerNotificationMessage');
    const iconEl = modal.querySelector('.notification-icon i');
    
    if (titleEl) titleEl.textContent = title;
    if (messageEl) messageEl.textContent = message;
    if (iconEl) iconEl.className = `fas ${icon}`;
    
    modal.classList.add('show');
    
    // Prevent background scroll
    document.body.style.overflow = 'hidden';
}

function hideCenterNotification() {
    const modal = document.getElementById('centerNotification');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Special notification: Achievement
function showAchievementNotification() {
    showNotification('achievement',
        'WELCOME TO DARK KNIGHT!',
        'Join our epic Minecraft adventure!',
        6000
    );
}

// ====================
// SCROLL TO FEATURES
// ====================
function scrollToFeatures() {
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
        featuresSection.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// ====================
// ADD PARTICLE STYLES
// ====================
if (!document.querySelector('style[data-particles]')) {
    const style = document.createElement('style');
    style.setAttribute('data-particles', 'true');
    style.textContent = `
        .particles-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        }
        
        .particle {
            position: absolute;
            bottom: -10px;
            border-radius: 50%;
            opacity: 0.3;
            animation: particleFloat linear infinite;
        }
        
        @keyframes particleFloat {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% { opacity: 0.3; }
            90% { opacity: 0.3; }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}