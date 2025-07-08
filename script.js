// Apply theme immediately to prevent flash of wrong theme
(function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update theme-color meta tag for mobile browsers
    const updateThemeColor = (theme) => {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.content = theme === 'dark' ? '#09090b' : '#fafafa';
        }
    };
    
    updateThemeColor(savedTheme);
})();

document.addEventListener('DOMContentLoaded', () => {

    const cursor = document.querySelector('.cursor');
    
    if (!cursor) return;
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Initialize with opacity 0
    cursor.style.opacity = '0';
    cursor.textContent = 'CLICK';
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Position cursor above mouse position
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Show cursor only on clickable elements
    document.addEventListener('mouseover', (e) => {
        const target = e.target;
        const isClickable = 
            target.tagName === 'A' || 
            target.tagName === 'BUTTON' || 
            target.closest('a') || 
            target.closest('button') ||
            target.tagName === 'INPUT' ||
            target.tagName === 'LABEL' ||
            target.tagName === 'TEXTAREA' ||
            target.classList.contains('project') || 
            target.closest('.project') ||
            target.classList.contains('overview-card') || 
            target.closest('.overview-card') ||
            target.classList.contains('featured-project') || 
            target.closest('.featured-project') ||
            target.getAttribute('role') === 'button' ||
            target.hasAttribute('onclick');
            
        if (isClickable) {
            cursor.style.opacity = '1';
        } else {
            cursor.style.opacity = '0';
        }
    });
    
    // Handle mouse leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Add active state for click
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.9)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Dark mode toggle handling
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update theme-color meta tag
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.content = newTheme === 'dark' ? '#09090b' : '#fafafa';
        }
    };

    // Add click event to all theme toggle buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.theme-toggle')) {
            toggleTheme();
        }
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
        });
    }
});
