// ============================================
// KITS PAGE INTERACTIVITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initKitCards();
    initPurchaseModal();
    initConfirmationModal();
    initTouchFlip();
    initLoadingScreen();
    initHeaderScroll();
    initMobileMenu();
    initBackToTop();
    
    // Test notification on load
    setTimeout(() => {
        showNotification('info',
            '🎮 KITS READY!',
            'Hover over cards to see what\'s inside each kit!',
            4000
        );
    }, 1000);
});

// ====================
// KIT CARDS FLIP
// ====================
function initKitCards() {
    const kitCards = document.querySelectorAll('.kit-card');
    
    kitCards.forEach(card => {
        // Desktop hover
        card.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                card.classList.add('hover');
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                card.classList.remove('hover');
            }
        });
        
        // Purchase button click
        const buyBtn = card.querySelector('.kit-buy-btn');
        const selectBtn = card.querySelector('.kit-select-btn');
        
        if (buyBtn) {
            buyBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const kitName = this.getAttribute('data-kit');
                openPurchaseModal(kitName);
            });
        }
        
        if (selectBtn) {
            selectBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const kitName = this.getAttribute('data-kit');
                openPurchaseModal(kitName);
            });
        }
    });
}

// ====================
// TOUCH FLIP FOR MOBILE
// ====================
function initTouchFlip() {
    const kitCards = document.querySelectorAll('.kit-card');
    
    kitCards.forEach(card => {
        let touchStartX = 0;
        let touchEndX = 0;
        let isFlipped = false;
        
        card.addEventListener('touchstart', function(e) {
            if (window.innerWidth <= 768) {
                touchStartX = e.changedTouches[0].screenX;
                e.stopPropagation();
            }
        }, { passive: true });
        
        card.addEventListener('touchend', function(e) {
            if (window.innerWidth <= 768) {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchEndX - touchStartX;
                
                // Flip on tap or swipe
                if (Math.abs(diff) < 50) {
                    isFlipped = !isFlipped;
                    this.classList.toggle('active', isFlipped);
                    
                    // Haptic feedback
                    if (navigator.vibrate) {
                        navigator.vibrate(30);
                    }
                }
                e.stopPropagation();
            }
        }, { passive: true });
        
        // Double tap to flip back
        let lastTap = 0;
        card.addEventListener('touchend', function(e) {
            if (window.innerWidth <= 768) {
                const currentTime = new Date().getTime();
                const tapLength = currentTime - lastTap;
                
                if (tapLength < 300 && tapLength > 0) {
                    isFlipped = !isFlipped;
                    this.classList.toggle('active', isFlipped);
                    
                    if (navigator.vibrate) {
                        navigator.vibrate([30, 30, 30]);
                    }
                }
                
                lastTap = currentTime;
                e.stopPropagation();
            }
        }, { passive: true });
    });
}

// ====================
// PURCHASE MODAL
// ====================
function initPurchaseModal() {
    const purchaseModal = document.getElementById('purchaseModal');
    const closeModalBtn = purchaseModal.querySelector('.close-purchase-modal');
    const cancelBtn = document.getElementById('cancelPurchase');
    const confirmBtn = document.getElementById('confirmPurchase');
    const termsCheckbox = document.getElementById('agreeTerms');
    const paymentOptions = purchaseModal.querySelectorAll('.payment-option');
    
    // Close modal
    closeModalBtn.addEventListener('click', closePurchaseModal);
    cancelBtn.addEventListener('click', closePurchaseModal);
    
    // Close when clicking outside
    purchaseModal.addEventListener('click', function(e) {
        if (e.target === purchaseModal) {
            closePurchaseModal();
        }
    });
    
    // Close on escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && purchaseModal.classList.contains('active')) {
            closePurchaseModal();
        }
    });
    
    // Payment method selection
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Update confirm button text based on payment method
            const method = this.getAttribute('data-method');
            updateConfirmButton(method);
        });
    });
    
    // Terms checkbox
    termsCheckbox.addEventListener('change', function() {
        confirmBtn.disabled = !this.checked;
    });
    
    // Confirm purchase
    confirmBtn.addEventListener('click', function() {
        if (!termsCheckbox.checked) {
            showNotification('warning',
                'TERMS REQUIRED',
                'Please agree to the terms and conditions',
                3000
            );
            return;
        }
        
        const selectedKit = confirmBtn.getAttribute('data-kit');
        const selectedPrice = confirmBtn.getAttribute('data-price');
        const selectedMethod = purchaseModal.querySelector('.payment-option.active').getAttribute('data-method');
        
        // Simulate purchase process
        simulatePurchase(selectedKit, selectedPrice, selectedMethod);
    });
}

function openPurchaseModal(kitName) {
    const purchaseModal = document.getElementById('purchaseModal');
    const modalKitIcon = document.getElementById('modalKitIcon');
    const modalKitName = document.getElementById('modalKitName');
    const modalKitNameText = document.getElementById('modalKitNameText');
    const modalKitPrice = document.getElementById('modalKitPrice');
    const modalKitBenefits = document.getElementById('modalKitBenefits');
    const confirmBtn = document.getElementById('confirmPurchase');
    const termsCheckbox = document.getElementById('agreeTerms');
    
    // Reset form
    termsCheckbox.checked = false;
    confirmBtn.disabled = true;
    
    // Get kit data
    const kitData = getKitData(kitName);
    
    // Update modal content
    modalKitIcon.innerHTML = `<i class="${kitData.icon}"></i>`;
    modalKitIcon.style.background = kitData.gradient;
    modalKitName.textContent = kitData.name.toUpperCase();
    modalKitNameText.textContent = kitData.name;
    modalKitPrice.textContent = kitData.price;
    modalKitPrice.style.background = kitData.gradient;
    modalKitPrice.style.webkitBackgroundClip = 'text';
    modalKitPrice.style.webkitTextFillColor = 'transparent';
    
    // Update benefits list
    modalKitBenefits.innerHTML = '';
    kitData.benefits.forEach(benefit => {
        const li = document.createElement('li');
        li.textContent = benefit;
        modalKitBenefits.appendChild(li);
    });
    
    // Set confirm button data
    confirmBtn.setAttribute('data-kit', kitName);
    confirmBtn.setAttribute('data-price', kitData.price);
    
    // Open modal
    purchaseModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Announce to screen reader
    announceToScreenReader(`Purchase modal opened for ${kitData.name}. Price: ${kitData.price}`);
}

function closePurchaseModal() {
    const purchaseModal = document.getElementById('purchaseModal');
    purchaseModal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateConfirmButton(method) {
    const confirmBtn = document.getElementById('confirmPurchase');
    const texts = {
        paypal: '<i class="fab fa-paypal"></i> Pay with PayPal',
        stripe: '<i class="fas fa-credit-card"></i> Pay with Card',
        crypto: '<i class="fab fa-bitcoin"></i> Pay with Crypto',
        razorpay: '<i class="fas fa-rupee-sign"></i> Pay with Razorpay'
    };
    
    confirmBtn.innerHTML = texts[method] || '<i class="fas fa-lock"></i> Secure Checkout';
}

// ====================
// CONFIRMATION MODAL
// ====================
function initConfirmationModal() {
    const confirmationModal = document.getElementById('confirmationModal');
    const closeBtn = document.getElementById('closeConfirmation');
    const copyBtn = document.getElementById('copyTransaction');
    const randomId = document.getElementById('randomId');
    
    // Generate random transaction ID
    randomId.textContent = Math.random().toString(36).substr(2, 6).toUpperCase();
    
    // Close modal
    closeBtn.addEventListener('click', closeConfirmationModal);
    
    // Close when clicking outside
    confirmationModal.addEventListener('click', function(e) {
        if (e.target === confirmationModal) {
            closeConfirmationModal();
        }
    });
    
    // Copy transaction ID
    copyBtn.addEventListener('click', function() {
        const transactionId = document.getElementById('transactionId').textContent;
        copyToClipboard(transactionId);
        
        showNotification('success',
            'COPIED!',
            'Transaction ID copied to clipboard',
            3000
        );
        
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    });
}

function openConfirmationModal(kitName, price) {
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmedKit = document.getElementById('confirmedKit');
    const confirmedAmount = document.getElementById('confirmedAmount');
    const randomId = document.getElementById('randomId');
    
    // Update content
    confirmedKit.textContent = kitName;
    confirmedAmount.textContent = price;
    randomId.textContent = Math.random().toString(36).substr(2, 6).toUpperCase();
    
    // Open modal
    confirmationModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Play success sound if allowed
    playSuccessSound();
    
    // Announce to screen reader
    announceToScreenReader(`Purchase successful! You bought ${kitName} for ${price}.`);
}

function closeConfirmationModal() {
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ====================
// KIT DATA
// ====================
function getKitData(kitName) {
    const kits = {
        survivor: {
            name: 'Survivor Kit',
            price: '$4.99',
            icon: 'fas fa-campfire',
            gradient: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
            benefits: [
                'Full Iron Armor Set',
                'Complete Iron Tools Set',
                '64 Steak & 64 Bread',
                'Building Materials Pack',
                '5 Healing Potions',
                '1,000 In-Game Coins',
                'Access to /home command',
                '24/7 Support access'
            ]
        },
        master: {
            name: 'Master Kit',
            price: '$9.99',
            icon: 'fas fa-user-ninja',
            gradient: 'linear-gradient(135deg, #2196F3, #03A9F4)',
            benefits: [
                'Full Diamond Armor (Protection III)',
                'Enchanted Diamond Tools',
                'Sharpness V Diamond Sword',
                'Power V Bow & 64 Arrows',
                '16 Potions of various types',
                '64 Golden Apples',
                '5,000 In-Game Coins',
                'Access to /fly command',
                'Master rank in Discord'
            ]
        },
        youtuber: {
            name: 'YouTuber Kit',
            price: '$14.99',
            icon: 'fab fa-youtube',
            gradient: 'linear-gradient(135deg, #FF5722, #FF9800)',
            benefits: [
                'Custom YouTuber Crown & Cape',
                'Full Netherite Gear Set',
                '64 Enchanted Golden Apples',
                'Streamer Particle Effects',
                'Camera & Replay Mod Access',
                '10,000 In-Game Coins',
                'Ender Dragon Pet (Cosmetic)',
                'Special YouTuber rank',
                'Access to creative mode',
                'Server promotion in Discord'
            ]
        },
        king: {
            name: 'King Kit',
            price: '$19.99',
            icon: 'fas fa-crown',
            gradient: 'linear-gradient(135deg, #FFC107, #FFEB3B)',
            benefits: [
                'Royal Crown & Scepter',
                'King\'s Throne (Custom Block)',
                'Netherite Armor (Protection IV)',
                'Sharpness V Netherite Sword',
                'Royal Steed with Armor',
                '25,000 In-Game Coins',
                'Pre-built Castle Schematic',
                '5 NPC Guards',
                'King rank with special tag',
                'Access to /kingdom commands'
            ]
        },
        knight: {
            name: 'Knight Kit',
            price: '$12.99',
            icon: 'fas fa-helmet-battle',
            gradient: 'linear-gradient(135deg, #9C27B0, #E91E63)',
            benefits: [
                'Diamond Armor (Protection IV)',
                'Sharpness V, Fire Aspect II Sword',
                'Power V, Infinity Bow',
                '64 TNT & Fire Charges',
                'Complete Potion Kit',
                'Armored War Horse',
                'Knight Banner & Shield',
                '8,000 In-Game Coins',
                'Knight rank in Discord',
                'Access to /war commands'
            ]
        },
        naruto: {
            name: 'Naruto Kit',
            price: '$16.99',
            icon: 'fas fa-user-ninja',
            gradient: 'linear-gradient(135deg, #00BCD4, #009688)',
            benefits: [
                'Hidden Leaf Headband',
                'Akatsuki Robe (Custom Skin)',
                'Kunai & Shuriken Weapons',
                'Chakra Potions (Special Effects)',
                'Speed & Jump Boost Potions',
                'Sharingan Eye Particle Effect',
                'Rasengan & Chidori Abilities',
                '15,000 In-Game Coins',
                'Naruto-themed particle effects',
                'Access to /jutsu commands'
            ]
        }
    };
    
    return kits[kitName] || kits.survivor;
}

// ====================
// SIMULATE PURCHASE
// ====================
function simulatePurchase(kitName, price, method) {
    const confirmBtn = document.getElementById('confirmPurchase');
    
    // Disable button and show loading
    confirmBtn.disabled = true;
    const originalText = confirmBtn.innerHTML;
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Show processing notification
    showNotification('info',
        'PROCESSING PAYMENT',
        'Please wait while we process your payment...',
        5000
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
            openConfirmationModal(kitName, price);
            
            // Track purchase
            trackPurchase(kitName, price, method);
            
            // Show success notification
            setTimeout(() => {
                showNotification('success',
                    '🎉 PURCHASE COMPLETE!',
                    'Your items will be delivered in-game shortly',
                    5000
                );
            }, 500);
        }, 500);
        
    }, 2000);
}

// ====================
// UTILITY FUNCTIONS
// ====================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(() => {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    });
}

function playSuccessSound() {
    // Create a simple success sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio not supported');
    }
}

function trackPurchase(kitName, price, method) {
    // Here you would integrate with your analytics/backend
    console.log(`Purchase tracked: ${kitName} - ${price} - ${method}`);
    
    // Example: Send to Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'purchase', {
            'transaction_id': `DKSMP-${Date.now()}`,
            'value': parseFloat(price.replace('$', '')),
            'currency': 'USD',
            'items': [{
                'item_name': kitName,
                'item_category': 'minecraft_kit',
                'price': parseFloat(price.replace('$', '')),
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
// SHARED FUNCTIONS (from main script)
// ====================
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => loadingScreen.style.display = 'none', 500);
    }, 1500);
}

function initHeaderScroll() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 100);
    });
}

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
    }
}

function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.classList.toggle('visible', window.scrollY > 300);
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ====================
// NOTIFICATION SYSTEM
// ====================
function showNotification(type, title, message, duration = 5000) {
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle',
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
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    if (duration > 0) {
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, duration);
    }
}

// ====================
// INITIALIZE ON LOAD
// ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add animation to cards
    const cards = document.querySelectorAll('.kit-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-in');
    });
});

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .kit-card.animate-in {
        animation: cardSlideUp 0.6s ease forwards;
        opacity: 0;
        transform: translateY(30px);
    }
    
    @keyframes cardSlideUp {
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

console.log('✅ Kits Page Loaded Successfully!');