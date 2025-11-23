// Define your menu items
const menu = [
  {name: "Breakfast Plate", image: "images_cafe/breakfast.jpeg", price: 10},
  {name: "Cup of Coffee", image: "images_cafe/coffee.jpeg", price: 6},
  {name: "Tiramisu", image: "images_cafe/tiramisu.jpeg", price: 6},
  {name: "Waffle with Ice Cream", image: "images_cafe/waffle_ice_cream.jpeg", price: 9},
  {name: "Pancake", image: "images_cafe/pancake.jpg", price: 7},
  {name: "Cheese Sandwich", image: "images_cafe/sandwich.jpg", price: 8},
  {name: "Yoghurt with Granola", image: "images_cafe/yoghurt.jpg", price: 8}
];

// Function to animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Simple video initialization
function initVideo() {
    const video = document.getElementById('bg-video');
    if (video) {
        // Try to play the video
        video.play().catch(error => {
            console.log('Video autoplay failed, will play on click');
            // If autoplay fails, play on first user interaction
            document.addEventListener('click', function playVideo() {
                video.play().catch(e => console.log('Video play failed:', e));
                document.removeEventListener('click', playVideo);
            });
        });
    }
}

// Enhanced modal function with animations
function openModal(img, item) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const caption = document.getElementById("caption");
    
    if (modal && modalImg && caption) {
        modal.style.display = "block";
        modalImg.src = img.src;
        caption.innerHTML = `<strong>${item.name}</strong> - $${item.price}`;
        
        // Trigger animation after a small delay
        setTimeout(() => {
            modal.classList.add("show");
        }, 10);
    }
}

function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) {
        modal.classList.remove("show");
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }
}

// Function to create menu with staggered animations
function createMenuWithAnimations() {
    const menuDiv = document.getElementById("menu");
    
    if (menuDiv) {
        menu.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "menu-item";
            div.style.animationDelay = `${0.1 * index}s`; // Stagger animation
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
            `;
            menuDiv.appendChild(div);

            // Open modal on image click with animation
            const img = div.querySelector("img");
            img.onclick = function() {
                openModal(this, item);
            };
        });
    }
}

// Function to initialize gallery animations
function initGalleryAnimations() {
    const galleryImages = document.querySelectorAll('.photo-grid img');
    galleryImages.forEach((img, index) => {
        img.style.animationDelay = `${0.1 * index}s`;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize video
    initVideo();
    
    // Initialize scroll animations
    animateOnScroll();
    
    // Initialize menu if we're on the menu page
    if (document.getElementById("menu")) {
        createMenuWithAnimations();
    }
    
    // Initialize gallery animations if we're on the gallery page
    if (document.querySelector('.photo-grid')) {
        initGalleryAnimations();
    }
    
    // Add hover animations to all buttons
    const buttons = document.querySelectorAll('.btn, nav a');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Close modal when user clicks "X"
document.addEventListener('click', function(e) {
    if (e.target.id === 'close') {
        closeModal();
    }
    
    // Close modal when clicking outside the image
    if (e.target.classList.contains('modal')) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});