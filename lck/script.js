// ============================================
// LEGENDARY CHEST KEY INTERACTIVITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initLCKPage();
    initPurchaseSystem();
    initTestimonials();
    initFAQ();
    initCountdown();
    initAnimations();
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('info',
            '🔑 LEGENDARY CHEST KEY',
            'Unlock MAX enchanted Netherite gear! Limited time offer.',
            5000
        );
    }, 1000);
});

// ====================
// INITIALIZE PAGE
// ====================
function initLCKPage() {
    // Set active navigation
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.navigation a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === './' || link.getAttribute('href') === 'index.html') {
            if (currentPage.includes('lck')) {
                link.classList.add('active');
            }
        }
    });
    
    // Animated counters
    initCounters();
    
    // 3D card flip
    initCardFlip();
    
    // Generate random key ID
    generateKeyId();
}

// ====================
// CARD FLIP
// ====================
function initCardFlip() {
    const cardInner = document.querySelector('.lck-card-inner');
    const unlockBtn = document.getElementById('unlockChestBtn');
    const purchaseBtn = document.getElementById('purchaseNowBtn');
    
    if (cardInner && unlockBtn) {
        // Desktop hover
        cardInner.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                cardInner.classList.add('flipped');
            }
        });
        
        cardInner.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                cardInner.classList.remove('flipped');
            }
        });
        
        // Mobile touch
        if (window.innerWidth <= 768) {
            let isFlipped = false;
            
            cardInner.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    isFlipped = !isFlipped;
                    cardInner.classList.toggle('flipped', isFlipped);
                    
                    // Haptic feedback
                    if (navigator.vibrate) {
                        navigator.vibrate(30);
                    }
                }
            });
            
            // Double tap to flip back
            let lastTap = 0;
            cardInner.addEventListener('touchend', (e) => {
                const currentTime = new Date().getTime();
                const tapLength = currentTime - lastTap;
                
                if (tapLength < 300 && tapLength > 0) {
                    isFlipped = !isFlipped;
                    cardInner.classList.toggle('flipped', isFlipped);
                    
                    if (navigator.vibrate) {
                        navigator.vibrate([30, 30, 30]);
                    }
                }
                
                lastTap = currentTime;
                e.stopPropagation();
            }, { passive: true });
        }
        
        // Button clicks
        unlockBtn.addEventListener('click', () => {
            openPurchaseModal();
        });
        
        if (purchaseBtn) {
            purchaseBtn.addEventListener('click', () => {
                openPurchaseModal();
            });
        }
    }
}

// ====================
// PURCHASE SYSTEM
// ====================
function initPurchaseSystem() {
    const finalPurchaseBtn = document.getElementById('finalPurchaseBtn');
    const purchaseModal = document.getElementById('purchaseModal');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.getElementById('cancelPurchase');
    const confirmBtn = document.getElementById('confirmPurchase');
    const closeSuccessBtn = document.getElementById('closeSuccess');
    const copyKeyBtn = document.getElementById('copyKeyBtn');
    const termsCheckbox = document.getElementById('agreeTerms');
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    // Open modal from all buttons
    const openButtons = [finalPurchaseBtn].filter(Boolean);
    openButtons.forEach(btn => {
        btn.addEventListener('click', openPurchaseModal);
    });
    
    // Close modal
    if (closeModalBtn) closeModalBtn.addEventListener('click', closePurchaseModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closePurchaseModal);
    if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeSuccessModal);
    
    // Close when clicking outside
    if (purchaseModal) {
        purchaseModal.addEventListener('click', (e) => {
            if (e.target === purchaseModal) {
                closePurchaseModal();
            }
        });
    }
    
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                closeSuccessModal();
            }
        });
    }
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (purchaseModal.classList.contains('active')) {
                closePurchaseModal();
            }
            if (successModal.classList.contains('active')) {
                closeSuccessModal();
            }
        }
    });
    
    // Payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Terms checkbox
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', function() {
            if (confirmBtn) {
                confirmBtn.disabled = !this.checked;
            }
        });
    }
    
    // Confirm purchase
    if (confirmBtn) {
        confirmBtn.addEventListener('click', simulatePurchase);
    }
    
    // Copy key ID
    if (copyKeyBtn) {
        copyKeyBtn.addEventListener('click', copyKeyId);
    }
}

function openPurchaseModal() {
    const purchaseModal = document.getElementById('purchaseModal');
    const confirmBtn = document.getElementById('confirmPurchase');
    const termsCheckbox = document.getElementById('agreeTerms');
    
    if (purchaseModal) {
        // Reset form
        if (termsCheckbox) termsCheckbox.checked = false;
        if (confirmBtn) confirmBtn.disabled = true;
        
        // Open modal
        purchaseModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Announce to screen reader
        announceToScreenReader('Purchase modal opened for Legendary Chest Key. Price: $24.99');
    }
}

function closePurchaseModal() {
    const purchaseModal = document.getElementById('purchaseModal');
    if (purchaseModal) {
        purchaseModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function simulatePurchase() {
    const confirmBtn = document.getElementById('confirmPurchase');
    const purchaseModal = document.getElementById('purchaseModal');
    
    if (!confirmBtn || !purchaseModal) return;
    
    // Disable button and show loading
    confirmBtn.disabled = true;
    const originalText = confirmBtn.innerHTML;
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Show processing notification
    showNotification('info',
        'PROCESSING PAYMENT',
        'Please wait while we unlock your Legendary Chest...',
        4000
    );
    
    // Simulate API call delay
    setTimeout(() => {
        // Close purchase modal
        closePurchaseModal();
        
        // Reset confirm button
        confirmBtn.disabled = false;
        confirmBtn.innerHTML = originalText;
        
        // Show success modal
        setTimeout(() => {
            openSuccessModal();
            
            // Track purchase
            trackLCKPurchase();
            
            // Show success notification
            setTimeout(() => {
                showNotification('success',
                    '🎉 LEGENDARY CHEST UNLOCKED!',
                    'Your Netherite gear is ready! Check your inventory.',
                    6000
                );
            }, 500);
        }, 500);
    }, 2000);
}

function openSuccessModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Announce to screen reader
        announceToScreenReader('Purchase successful! Your Legendary Chest Key has been activated.');
    }
}

function closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function generateKeyId() {
    const keyIdElements = document.querySelectorAll('#keyId, #keyIdDisplay');
    const keyId = 'LCK-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    
    keyIdElements.forEach(el => {
        if (el) el.textContent = keyId;
    });
    
    return keyId;
}

function copyKeyId() {
    const keyId = document.getElementById('keyId')?.textContent;
    if (!keyId) return;
    
    navigator.clipboard.writeText(keyId).then(() => {
        showNotification('success',
            'KEY COPIED!',
            'Key ID copied to clipboard',
            3000
        );
        
        // Update button text temporarily
        const copyBtn = document.getElementById('copyKeyBtn');
        if (copyBtn) {
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.style.background = 'linear-gradient(135deg, #00ff80, #00cc66)';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
                copyBtn.style.background = '';
            }, 2000);
        }
        
        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }).catch(err => {
        showNotification('error',
            'COPY FAILED',
            'Please copy manually: ' + keyId,
            5000
        );
    });
}

// ====================
// ANIMATED COUNTERS
// ====================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start counter when in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// ====================
// TESTIMONIALS
// ====================
function initTestimonials() {
    // Testimonials could be loaded from an API in the future
    console.log('Testimonials loaded');
}

// ====================
// FAQ ACCORDION
// ====================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ====================
// COUNTDOWN TIMER
// ====================
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Set countdown to 24 hours from now
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);
    
    function updateCountdown() {
        const now = new Date();
        const diff = endTime - now;
        
        if (diff <= 0) {
            countdownElement.textContent = '00:00:00';
            return;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        countdownElement.textContent = 
            `${hours.toString().padStart(2, '0')}:` +
            `${minutes.toString().padStart(2, '0')}:` +
            `${seconds.toString().padStart(2, '0')}`;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ====================
// ANIMATIONS
// ====================
function initAnimations() {
    // Add animation classes on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.feature-card, .testimonial, .faq-item').forEach(el => {
        observer.observe(el);
    });
}

// ====================
// UTILITY FUNCTIONS
// ====================
function trackLCKPurchase() {
    // Here you would integrate with your analytics/backend
    console.log('LCK Purchase tracked');
    
    // Example: Send to Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'purchase', {
            'transaction_id': generateKeyId(),
            'value': 24.99,
            'currency': 'USD',
            'items': [{
                'item_name': 'Legendary Chest Key',
                'item_category': 'minecraft_chest_key',
                'price': 24.99,
                'quantity': 1
            }]
        });
    }
}

function announceToScreenReader(message) {
    const ariaLive = document.getElementById('aria-live-region') || (() => {
        const div = document.createElement('div');
        div.id = 'aria-live-region';
        div.className = 'sr-only';
        div.setAttribute('aria-live', 'polite');
        div.setAttribute('aria-atomic', 'true');
        document.body.appendChild(div);
        return div;
    })();
    
    ariaLive.textContent = message;
    setTimeout(() => ariaLive.textContent = '', 3000);
}

// ====================
// NOTIFICATION SHORTCUT
// ====================
window.showNotification = function(type, title, message, duration = 5000) {
    if (typeof DKSMP !== 'undefined' && DKSMP.showNotification) {
        return DKSMP.showNotification(type, title, message, duration);
    }
    
    // Fallback if shared.js not loaded
    console.log(`[${type.toUpperCase()}] ${title}: ${message}`);
    return null;
};

// ====================
// INITIALIZE ON LOAD
// ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add entrance animations
    const heroContent = document.querySelector('.lck-hero-content');
    const mainCard = document.querySelector('.lck-main-card');
    
    if (heroContent) heroContent.classList.add('animate-in');
    if (mainCard) mainCard.classList.add('animate-in');
    
    console.log('✅ Legendary Chest Key Page Loaded!');
});

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
        transform: translateY(30px);
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;

document.head.appendChild(animationStyles);
// Key Purchase Simulation
function generateKeyId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let keyId = '';
    for (let i = 0; i < 8; i++) {
        keyId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return keyId;
}

// Simulate Key Countdown
function updateKeyCountdown() {
    const keysLeftElement = document.getElementById('keysLeft');
    if (keysLeftElement) {
        let keysLeft = parseInt(keysLeftElement.textContent);
        if (keysLeft > 0) {
            // Randomly decrease keys every few minutes
            setInterval(() => {
                if (keysLeft > 10 && Math.random() > 0.7) {
                    keysLeft--;
                    keysLeftElement.textContent = keysLeft;
                }
            }, 60000); // Check every minute
        }
    }
}

// Add sparkle effects to key
function createSparkles() {
    const keyModel = document.querySelector('.key-model');
    if (keyModel) {
        for (let i = 0; i < 10; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'floating-sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: ${Math.random() > 0.5 ? 'var(--key-gold)' : 'var(--key-red)'};
                border-radius: 50%;
                pointer-events: none;
                opacity: ${Math.random() * 0.5 + 0.3};
            `;
            
            // Random position around key
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 100 + 50;
            sparkle.style.left = `calc(50% + ${Math.cos(angle) * radius}px)`;
            sparkle.style.top = `calc(50% + ${Math.sin(angle) * radius}px)`;
            
            // Animation
            sparkle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 0 },
                { transform: `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(${Math.random() + 0.5})`, opacity: 1 },
                { transform: `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(0)`, opacity: 0 }
            ], {
                duration: Math.random() * 2000 + 2000,
                iterations: Infinity,
                delay: Math.random() * 2000
            });
            
            keyModel.appendChild(sparkle);
        }
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Start key countdown
    updateKeyCountdown();
    
    // Add sparkles
    createSparkles();
    
    // Add subtle rotation to 3D key
    const keyModel = document.querySelector('.key-model');
    if (keyModel) {
        let rotation = 0;
        setInterval(() => {
            rotation += 0.1;
            keyModel.style.transform = `translate(-50%, -50%) rotateY(${rotation}deg)`;
        }, 50);
    }
    
    // Make purchase form interactive
    const purchaseBtn = document.getElementById('buyKeyBtn');
    if (purchaseBtn) {
        purchaseBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        purchaseBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Add hover effects to items
    const itemCards = document.querySelectorAll('.item-card');
    itemCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
    
    // Simulate active users
    setInterval(() => {
        const statNumber = document.querySelector('.stat-item:nth-child(4) .stat-number');
        if (statNumber) {
            let current = parseInt(statNumber.textContent);
            statNumber.textContent = current + Math.floor(Math.random() * 3);
        }
    }, 30000); // Update every 30 seconds
});