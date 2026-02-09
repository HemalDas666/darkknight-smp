// Ranks Page JavaScript

// Rank Data
const ranksData = {
    knight: {
        name: "KNIGHT",
        price: "$9.99",
        icon: "fas fa-shield-alt",
        color: "#4dabf7",
        description: "The perfect starter rank for dedicated players seeking basic privileges.",
        features: [
            "/fly command in survival",
            "3 homes instead of 1",
            "Access to /hat command",
            "Knight rank prefix",
            "10,000 coins bonus",
            "Priority queue access"
        ],
        details: {
            commands: "/fly, /home (3), /hat, /msg, /warp",
            permissions: "Color in chat, priority queue, kit selection",
            restrictions: "No creative access, limited homes",
            support: "Normal support priority"
        }
    },
    lord: {
        name: "LORD",
        price: "$19.99",
        icon: "fas fa-chess-queen",
        color: "#9c36b5",
        description: "Enhanced privileges for players who want more control and features.",
        features: [
            "All Knight perks",
            "/back command (death)",
            "5 homes instead of 3",
            "Access to /feed command",
            "Lord rank prefix",
            "25,000 coins bonus",
            "Custom particle effects",
            "Colorful chat"
        ],
        details: {
            commands: "All Knight commands plus: /back, /feed, /heal, /workbench",
            permissions: "Custom particles, colorful chat, extended home limit",
            restrictions: "No god mode, no creative access",
            support: "Normal support priority"
        }
    },
    baron: {
        name: "BARON",
        price: "$29.99",
        icon: "fas fa-landmark",
        color: "#ff6b6b",
        description: "For serious players who want maximum benefits and recognition.",
        features: [
            "All Lord perks",
            "/workbench command",
            "8 homes instead of 5",
            "Access to /enderchest",
            "Baron rank prefix",
            "50,000 coins bonus",
            "Custom join message",
            "Nickname colors",
            "Priority support"
        ],
        details: {
            commands: "All Lord commands plus: /enderchest, /nick, /anvil",
            permissions: "Custom join message, nickname colors, priority support",
            restrictions: "Limited god mode access",
            support: "High priority support"
        }
    },
    duke: {
        name: "DUKE",
        price: "$49.99",
        icon: "fas fa-crown",
        color: "#ffd43b",
        description: "Royal status with exceptional privileges for server influencers.",
        features: [
            "All Baron perks",
            "/craft command anywhere",
            "12 homes instead of 8",
            "Access to /repair command",
            "Duke rank prefix",
            "100,000 coins bonus",
            "Custom prefix color",
            "Exclusive particle trail",
            "/tpahere command",
            "Vote multiplier x2"
        ],
        details: {
            commands: "All Baron commands plus: /craft, /repair, /tpahere, /tpaccept",
            permissions: "Custom prefix color, exclusive particles, vote multiplier",
            restrictions: "No creative mode access",
            support: "High priority support"
        }
    },
    prince: {
        name: "PRINCE",
        price: "$79.99",
        icon: "fas fa-gem",
        color: "#20c997",
        description: "Near-ultimate power with almost all commands and maximum recognition.",
        features: [
            "All Duke perks",
            "/god command (short duration)",
            "16 homes instead of 12",
            "Access to /fix all command",
            "Prince rank prefix",
            "250,000 coins bonus",
            "Custom join sound",
            "Exclusive pet (cosmetic)",
            "/nick with colors & format",
            "Vote multiplier x3",
            "Special Discord role"
        ],
        details: {
            commands: "All Duke commands plus: /god (30s), /fix all, /top",
            permissions: "Custom join sound, exclusive pet, Discord role, extended permissions",
            restrictions: "Limited creative access",
            support: "VIP support priority"
        }
    },
    king: {
        name: "KING",
        price: "$129.99",
        icon: "fas fa-crown",
        color: "#ff6b00",
        description: "The ultimate rank with ALL privileges, commands, and maximum server recognition.",
        features: [
            "All Prince perks",
            "/god command (permanent)",
            "Unlimited homes",
            "Access to all commands",
            "King rank prefix (animated)",
            "500,000 coins bonus",
            "Custom animated particles",
            "Exclusive King's throne",
            "/nick with special characters",
            "Vote multiplier x5",
            "King role in Discord",
            "Staff-like permissions",
            "Event host privileges"
        ],
        details: {
            commands: "ALL server commands including creative mode access",
            permissions: "Animated prefix, throne item, staff permissions, event hosting",
            restrictions: "No restrictions - full access",
            support: "Royal support priority (immediate response)"
        }
    }
};

// Discord URL (Replace with your actual Discord URL)
const DISCORD_URL = "https://discord.gg/DeRxD8wq";

// DOM Elements
let currentRank = null;
let discordRedirectTimer = null;
let countdownValue = 3;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen
    setTimeout(() => {
        document.querySelector('.loading-screen').classList.add('fade-out');
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 1500);
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize floating elements
    initFloatingElements();
    
    // Set up scroll effects
    setupScrollEffects();
    
    // Set up notification system
    setupNotifications();
    
    // Set up particles
    initParticles();
});

// Set up all event listeners
function setupEventListeners() {
    // Menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.navigation');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navigation.classList.toggle('active');
            menuToggle.innerHTML = navigation.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navigation') && !e.target.closest('.menu-toggle')) {
            navigation.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Discord buttons
    const discordBtns = document.querySelectorAll('#discordBtn, #mainDiscordBtn');
    discordBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showDiscordRedirect();
        });
    });
    
    // Purchase modal
    const purchaseModal = document.getElementById('purchaseModal');
    const closePurchaseBtn = document.querySelector('.close-purchase-modal');
    const cancelPurchaseBtn = document.getElementById('cancelPurchase');
    const confirmPurchaseBtn = document.getElementById('confirmPurchase');
    const termsCheckbox = document.getElementById('agreeTerms');
    
    if (closePurchaseBtn) {
        closePurchaseBtn.addEventListener('click', () => {
            purchaseModal.classList.remove('active');
        });
    }
    
    if (cancelPurchaseBtn) {
        cancelPurchaseBtn.addEventListener('click', () => {
            purchaseModal.classList.remove('active');
        });
    }
    
    if (confirmPurchaseBtn) {
        confirmPurchaseBtn.addEventListener('click', purchaseRank);
    }
    
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', () => {
            confirmPurchaseBtn.disabled = !termsCheckbox.checked;
        });
    }
    
    // Rank details modal
    const rankDetailsModal = document.getElementById('rankDetailsModal');
    const closeRankDetailsBtn = document.querySelector('.close-rank-details');
    
    if (closeRankDetailsBtn) {
        closeRankDetailsBtn.addEventListener('click', () => {
            rankDetailsModal.classList.remove('active');
        });
    }
    
    // Discord modal
    const discordModal = document.getElementById('discordModal');
    const cancelRedirectBtn = document.getElementById('cancelRedirect');
    const goNowBtn = document.getElementById('goNow');
    
    if (cancelRedirectBtn) {
        cancelRedirectBtn.addEventListener('click', () => {
            clearInterval(discordRedirectTimer);
            discordModal.classList.remove('active');
        });
    }
    
    if (goNowBtn) {
        goNowBtn.addEventListener('click', redirectToDiscord);
    }
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Payment options
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Initialize floating elements animation
function initFloatingElements() {
    const floatItems = document.querySelectorAll('.float-item');
    floatItems.forEach(item => {
        const randomX = Math.random() * 80 + 10;
        const randomY = Math.random() * 80 + 10;
        const randomDuration = Math.random() * 20 + 20;
        const randomDelay = Math.random() * 10;
        
        item.style.left = `${randomX}%`;
        item.style.top = `${randomY}%`;
        item.style.animationDuration = `${randomDuration}s`;
        item.style.animationDelay = `${randomDelay}s`;
    });
}

// Set up scroll effects
function setupScrollEffects() {
    const header = document.querySelector('header');
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        // Header scroll effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
}

// Set up notification system
function setupNotifications() {
    // Create notification container if it doesn't exist
    if (!document.getElementById('notificationContainer')) {
        const container = document.createElement('div');
        container.id = 'notificationContainer';
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
}

// Show notification
function showNotification(title, message, type = 'info', duration = 5000) {
    const container = document.getElementById('notificationContainer');
    
    const notification = document.createElement('div');
    notification.className = `toast-notification toast-${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-times-circle' : 
                 type === 'warning' ? 'fa-exclamation-triangle' : 
                 'fa-info-circle';
    
    notification.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
        <div class="toast-progress">
            <div class="toast-progress-bar"></div>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after duration
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
}

// Initialize particles
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${Math.random() > 0.5 ? 'var(--primary)' : 'var(--accent)'};
            border-radius: 50%;
            left: ${posX}%;
            top: -20px;
            opacity: ${Math.random() * 0.3 + 0.1};
            pointer-events: none;
        `;
        
        particle.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
            { transform: `translateY(${Math.random() * 100 + 100}vh) rotate(${Math.random() * 360}deg)`, opacity: 0.5 },
            { transform: `translateY(${Math.random() * 100 + 200}vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            iterations: Infinity
        });
        
        container.appendChild(particle);
    }
}

// Scroll to ranks section
function scrollToRanks() {
    document.getElementById('ranks').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Show rank guide
function showRankGuide() {
    showNotification(
        "Rank Guide",
        "Each rank includes all features from lower ranks. Upgrade anytime by contacting staff!",
        "info",
        7000
    );
}

// Select a rank
function selectRank(rankId) {
    const rank = ranksData[rankId];
    if (!rank) return;
    
    currentRank = rankId;
    
    // Update modal content
    document.getElementById('modalRankName').textContent = `Purchase ${rank.name}`;
    document.getElementById('modalRankNameText').textContent = rank.name;
    document.getElementById('modalRankPrice').textContent = rank.price;
    document.getElementById('modalRankIcon').innerHTML = `<i class="${rank.icon}"></i>`;
    
    // Update benefits list
    const benefitsList = document.getElementById('modalRankBenefits');
    benefitsList.innerHTML = '';
    rank.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        benefitsList.appendChild(li);
    });
    
    // Reset form
    document.getElementById('agreeTerms').checked = false;
    document.getElementById('confirmPurchase').disabled = true;
    
    // Show modal
    document.getElementById('purchaseModal').classList.add('active');
}

// Show rank details
function showRankDetails(rankId) {
    const rank = ranksData[rankId];
    if (!rank) return;
    
    // Update modal header
    document.getElementById('detailsRankName').textContent = rank.name;
    document.getElementById('detailsRankPrice').textContent = rank.price;
    document.getElementById('detailsHeader').style.background = `linear-gradient(135deg, ${rank.color}, ${rank.color}66)`;
    document.querySelector('.details-rank-icon').innerHTML = `<i class="${rank.icon}"></i>`;
    document.querySelector('.details-rank-icon').style.background = `linear-gradient(135deg, ${rank.color}, ${rank.color}cc)`;
    
    // Update modal content
    const content = document.getElementById('rankDetailsContent');
    content.innerHTML = `
        <div class="rank-full-description">
            <p>${rank.description}</p>
        </div>
        
        <div class="rank-all-features">
            <h3><i class="fas fa-star"></i> All Features Included:</h3>
            <ul class="full-features-list">
                ${rank.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div class="rank-technical-details">
            <h3><i class="fas fa-cogs"></i> Technical Details:</h3>
            <div class="details-grid">
                <div class="detail-item">
                    <h4><i class="fas fa-terminal"></i> Commands</h4>
                    <p>${rank.details.commands}</p>
                </div>
                <div class="detail-item">
                    <h4><i class="fas fa-user-shield"></i> Permissions</h4>
                    <p>${rank.details.permissions}</p>
                </div>
                <div class="detail-item">
                    <h4><i class="fas fa-ban"></i> Restrictions</h4>
                    <p>${rank.details.restrictions}</p>
                </div>
                <div class="detail-item">
                    <h4><i class="fas fa-headset"></i> Support</h4>
                    <p>${rank.details.support}</p>
                </div>
            </div>
        </div>
        
        <div class="rank-purchase-cta">
            <button class="btn-primary" onclick="selectRank('${rankId}')">
                <i class="fas fa-shopping-cart"></i> Purchase ${rank.name} - ${rank.price}
            </button>
        </div>
    `;
    
    // Show modal
    document.getElementById('rankDetailsModal').classList.add('active');
}

// Purchase rank (simulated)
function purchaseRank() {
    if (!currentRank) return;
    
    const rank = ranksData[currentRank];
    
    // Simulate purchase process
    showNotification(
        "Processing Purchase",
        `Purchasing ${rank.name}...`,
        "info",
        2000
    );
    
    setTimeout(() => {
        // Close purchase modal
        document.getElementById('purchaseModal').classList.remove('active');
        
        // Show success message
        showNotification(
            "Purchase Successful! 🎉",
            `Your ${rank.name} has been activated! Rejoin the server to access your new privileges.`,
            "success",
            10000
        );
        
        // Reset
        currentRank = null;
    }, 2000);
}

// Show Discord redirect modal
function showDiscordRedirect() {
    const modal = document.getElementById('discordModal');
    const countdownElement = document.getElementById('countdown');
    const timerText = document.getElementById('timerCount');
    
    countdownValue = 3;
    countdownElement.textContent = countdownValue;
    timerText.textContent = countdownValue;
    
    modal.classList.add('active');
    
    // Start countdown
    discordRedirectTimer = setInterval(() => {
        countdownValue--;
        countdownElement.textContent = countdownValue;
        timerText.textContent = countdownValue;
        
        if (countdownValue <= 0) {
            clearInterval(discordRedirectTimer);
            redirectToDiscord();
        }
    }, 1000);
}

// Redirect to Discord
function redirectToDiscord() {
    clearInterval(discordRedirectTimer);
    
    // Close modal
    document.getElementById('discordModal').classList.remove('active');
    
    // Show redirecting notification
    showNotification(
        "Redirecting...",
        "Taking you to our Discord server!",
        "info",
        2000
    );
    
    // Open Discord in new tab
    setTimeout(() => {
        window.open(DISCORD_URL, '_blank');
    }, 500);
}

// Toggle FAQ answer
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');
    
    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        icon.style.transform = 'rotate(0deg)';
    } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    }
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    const purchaseModal = document.getElementById('purchaseModal');
    const rankDetailsModal = document.getElementById('rankDetailsModal');
    const discordModal = document.getElementById('discordModal');
    
    if (purchaseModal && purchaseModal.classList.contains('active')) {
        if (!e.target.closest('.purchase-modal-content') && !e.target.closest('.rank-select-btn')) {
            purchaseModal.classList.remove('active');
        }
    }
    
    if (rankDetailsModal && rankDetailsModal.classList.contains('active')) {
        if (!e.target.closest('.rank-details-content') && !e.target.closest('.rank-info-btn')) {
            rankDetailsModal.classList.remove('active');
        }
    }
    
    if (discordModal && discordModal.classList.contains('active')) {
        if (!e.target.closest('.discord-modal-content') && !e.target.closest('#discordBtn, #mainDiscordBtn')) {
            clearInterval(discordRedirectTimer);
            discordModal.classList.remove('active');
        }
    }
});