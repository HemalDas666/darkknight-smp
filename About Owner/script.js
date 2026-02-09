// About Me Page JavaScript - SIMPLIFIED WORKING VERSION

console.log("About Me script loaded");

// Your Personal Information
const personalInfo = {
    name: "Devasis Pal",
    title: "Founder Of Dark Knight SMP",
    location: "Kolkata, India",
    age: "16",
    education: "11TH CLASS",
    profession: "Web Developer",
    email: "dashemal08@example.com",
    description: "Passionate Minecraft server developer with over 5 years of experience in creating immersive gaming experiences. I specialize in custom plugins, server optimization, and community building.",
    quote: "Creating epic adventures, one block at a time."
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);
    
    // Setup all event listeners
    setupEventListeners();
    
    // Setup scroll effects
    setupScrollEffects();
    
    console.log("Setup complete!");
});

// Setup event listeners
function setupEventListeners() {
    console.log("Setting up event listeners...");
    
    // Menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.navigation');
    
    if (menuToggle && navigation) {
        menuToggle.addEventListener('click', function() {
            navigation.classList.toggle('active');
            menuToggle.innerHTML = navigation.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Card buttons
    const professionalBtn = document.querySelector('.card-btn:nth-child(1)');
    const personalBtn = document.querySelector('.card-btn:nth-child(2)');
    
    if (professionalBtn) {
        professionalBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showSide('front');
        });
    }
    
    if (personalBtn) {
        personalBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showSide('back');
        });
    }
    
    // Profile card click
    const profileCard = document.getElementById('profileCard');
    if (profileCard) {
        profileCard.addEventListener('click', function(e) {
            // Don't flip if clicking on buttons or links
            if (!e.target.closest('.card-btn') && 
                !e.target.closest('.social-link') && 
                !e.target.closest('.flip-hint')) {
                flipCard();
            }
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('contactName')?.value;
            const email = document.getElementById('contactEmail')?.value;
            const subject = document.getElementById('contactSubject')?.value;
            const message = document.getElementById('contactMessage')?.value;
            
            // Validate
            if (!name || !email || !subject || !message) {
                alert("Please fill in all fields");
                return;
            }
            
            // Simulate sending
            alert("Message sent! (This is a demo)");
            contactForm.reset();
            document.getElementById('contactModal').classList.remove('active');
            document.getElementById('successModal').classList.add('active');
        });
    }
    
    // Modal close buttons
    document.querySelectorAll('.close-contact-modal, #cancelContact').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('contactModal').classList.remove('active');
        });
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    console.log("Event listeners setup complete");
}

// Setup scroll effects
function setupScrollEffects() {
    const header = document.querySelector('header');
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!header || !backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
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

// FLIP CARD FUNCTIONS - WORKING VERSION
function flipCard() {
    console.log("Flipping card...");
    const profileCard = document.getElementById('profileCard');
    if (profileCard) {
        profileCard.classList.toggle('flipped');
        updateCardButtons();
        console.log("Card flipped:", profileCard.classList.contains('flipped') ? "Back side" : "Front side");
    }
}

function showSide(side) {
    console.log("Showing side:", side);
    const profileCard = document.getElementById('profileCard');
    if (profileCard) {
        if (side === 'front') {
            profileCard.classList.remove('flipped');
        } else {
            profileCard.classList.add('flipped');
        }
        updateCardButtons();
    }
}

function updateCardButtons() {
    const profileCard = document.getElementById('profileCard');
    const professionalBtn = document.querySelector('.card-btn:nth-child(1)');
    const personalBtn = document.querySelector('.card-btn:nth-child(2)');
    
    if (profileCard && professionalBtn && personalBtn) {
        const isFlipped = profileCard.classList.contains('flipped');
        professionalBtn.classList.toggle('active', !isFlipped);
        personalBtn.classList.toggle('active', isFlipped);
    }
}

// Other page functions
function scrollToProfile() {
    const profileSection = document.getElementById('profile');
    if (profileSection) {
        profileSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

function showContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function joinDiscord() {
    alert("Redirecting to Discord... (Update the link in script.js)");
}

// Make functions available globally for onclick attributes
window.flipCard = flipCard;
window.showSide = showSide;
window.scrollToProfile = scrollToProfile;
window.showContactModal = showContactModal;
window.closeSuccessModal = closeSuccessModal;
window.joinDiscord = joinDiscord;