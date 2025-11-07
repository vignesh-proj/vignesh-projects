// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('.theme-icon');
const html = document.documentElement;

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle?.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// ===== Mobile Menu Toggle =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
        mobileMenuToggle?.classList.remove('active');
    });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .service-card, .work-preview-card, .gallery-item, .tool-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Work Gallery Filter =====
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== Toast Notification =====
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }
}

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            id: Date.now().toString(),
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value || 'N/A',
            service: document.getElementById('service').value || 'N/A',
            message: document.getElementById('message').value,
            contactMethods: Array.from(document.querySelectorAll('input[name="contactMethod"]:checked')).map(cb => cb.value),
            timestamp: new Date().toISOString(),
            status: 'pending'
        };
        
        // Save to localStorage
        const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
        submissions.push(formData);
        localStorage.setItem('submissions', JSON.stringify(submissions));
        
        // Show initial notification
        showToast('Request submitted successfully! Your request has been saved.', 3000);
        
        // Track submission in browsing network
        trackSubmission(formData);
        
        // Reset form
        contactForm.reset();
        
        // Handle contact methods based on user preference
        handleContactMethods(formData);
    });
}

// ===== Submission Tracking (Browsing Network) =====
function trackSubmission(submission) {
    // Track submission in a "browsing network" - storing submission history
    const networkData = {
        submissionId: submission.id,
        timestamp: submission.timestamp,
        userInfo: {
            name: submission.name,
            email: submission.email,
            phone: submission.phone
        },
        service: submission.service,
        status: 'submitted'
    };
    
    // Store in browsing network storage
    const network = JSON.parse(localStorage.getItem('browsingNetwork') || '[]');
    network.push(networkData);
    localStorage.setItem('browsingNetwork', JSON.stringify(network));
    
    // Update notification badge if exists
    updateNotificationBadge();
}

// ===== Notification Badge =====
function updateNotificationBadge() {
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    const pendingCount = submissions.filter(s => s.status === 'pending').length;
    
    // Create or update notification badge in nav
    let badge = document.getElementById('notificationBadge');
    if (!badge && pendingCount > 0) {
        badge = document.createElement('span');
        badge.id = 'notificationBadge';
        badge.className = 'notification-badge';
        badge.textContent = pendingCount;
        
        const contactLink = document.querySelector('a[href="contact.html"]');
        if (contactLink) {
            contactLink.style.position = 'relative';
            contactLink.appendChild(badge);
        }
    } else if (badge) {
        if (pendingCount > 0) {
            badge.textContent = pendingCount;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    }
}

// ===== Load Submission History =====
function loadSubmissionHistory() {
    const historyList = document.getElementById('historyList');
    if (!historyList) return;
    
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    
    if (submissions.length === 0) {
        historyList.innerHTML = '<p class="no-history">No submissions yet. <a href="contact.html">Submit a request</a> to get started!</p>';
        return;
    }
    
    // Sort by timestamp (newest first)
    submissions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    historyList.innerHTML = submissions.map(submission => {
        const date = new Date(submission.timestamp).toLocaleString();
        return `
            <div class="history-item">
                <div class="history-item-header">
                    <div class="history-item-title">${submission.name} - ${submission.service !== 'N/A' ? submission.service : 'General Inquiry'}</div>
                    <div class="history-item-date">${date}</div>
                </div>
                <div class="history-item-details">
                    <p><strong>Email:</strong> ${submission.email}</p>
                    <p><strong>Phone:</strong> ${submission.phone}</p>
                    <p><strong>Service:</strong> ${submission.service !== 'N/A' ? submission.service : 'Not specified'}</p>
                    <p><strong>Message:</strong> ${submission.message}</p>
                    <p><strong>Contact Methods:</strong> ${submission.contactMethods.join(', ')}</p>
                </div>
                <span class="history-item-status">${submission.status}</span>
            </div>
        `;
    }).join('');
}

// ===== Clear History =====
const clearHistoryBtn = document.getElementById('clearHistory');
if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all submission history? This cannot be undone.')) {
            localStorage.removeItem('submissions');
            localStorage.removeItem('browsingNetwork');
            loadSubmissionHistory();
            showToast('History cleared successfully!', 3000);
        }
    });
}

// ===== Export History =====
const exportHistoryBtn = document.getElementById('exportHistory');
if (exportHistoryBtn) {
    exportHistoryBtn.addEventListener('click', () => {
        const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
        
        if (submissions.length === 0) {
            showToast('No history to export!', 3000);
            return;
        }
        
        // Create CSV content
        const headers = ['Date', 'Name', 'Email', 'Phone', 'Service', 'Message', 'Contact Methods', 'Status'];
        const rows = submissions.map(s => [
            new Date(s.timestamp).toLocaleString(),
            s.name,
            s.email,
            s.phone,
            s.service,
            s.message.replace(/,/g, ';'), // Replace commas to avoid CSV issues
            s.contactMethods.join(';'),
            s.status
        ]);
        
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');
        
        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vichuufx-submissions-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showToast('History exported successfully!', 3000);
    });
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Load submission history if on history page
    if (document.getElementById('historyList')) {
        loadSubmissionHistory();
    }
    
    // Update notification badge
    updateNotificationBadge();
    
    // Add notification badge styles
    if (!document.getElementById('notificationBadgeStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationBadgeStyles';
        style.textContent = `
            .notification-badge {
                position: absolute;
                top: -8px;
                right: -8px;
                background-color: #ff4444;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add smooth transitions to all interactive elements
    document.querySelectorAll('a, button, .feature-card, .service-card').forEach(el => {
        el.style.transition = 'all 0.3s ease';
    });
});

// ===== Handle Contact Methods =====
function handleContactMethods(formData) {
    // Create email body
    const emailBody = `
New Contact Form Submission from Vichuufx Website

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service}
Message: ${formData.message}
Preferred Contact Methods: ${formData.contactMethods.join(', ')}
Submitted: ${new Date(formData.timestamp).toLocaleString()}
    `.trim();
    
    // Create mailto link
    const mailtoLink = `mailto:vichuufx2@gmail.com?subject=New Contact Form Submission from ${formData.name}&body=${encodeURIComponent(emailBody)}`;
    
    // Create WhatsApp link
    const whatsappMessage = `Hello Vichuufx! I'm ${formData.name}. ${formData.message}. Email: ${formData.email}, Phone: ${formData.phone}`;
    const whatsappLink = `https://wa.me/916369986674?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Create Instagram DM link
    const instagramMessage = `Hello! I'm ${formData.name}. ${formData.message}`;
    const instagramLink = `https://www.instagram.com/vichuufx_/`;
    
    // Create Telegram link
    const telegramLink = `https://t.me/vichuupage`;
    
    // Process each selected contact method
    const methods = formData.contactMethods;
    let processedMethods = [];
    
    // Email - Always send email notification
    setTimeout(() => {
        try {
            window.location.href = mailtoLink;
            processedMethods.push('Email sent');
        } catch (error) {
            console.error('Error opening email client:', error);
        }
    }, 500);
    
    // WhatsApp - If selected
    if (methods.includes('whatsapp')) {
        setTimeout(() => {
            window.open(whatsappLink, '_blank');
            processedMethods.push('WhatsApp opened');
        }, 1000);
    }
    
    // Instagram - If selected
    if (methods.includes('instagram')) {
        setTimeout(() => {
            window.open(instagramLink, '_blank');
            processedMethods.push('Instagram opened');
        }, 1500);
    }
    
    // Telegram - If selected
    if (methods.includes('telegram')) {
        setTimeout(() => {
            window.open(telegramLink, '_blank');
            processedMethods.push('Telegram opened');
        }, 2000);
    }
    
    // Show success message with details
    setTimeout(() => {
        showToast(
            `Request submitted! Methods: ${processedMethods.join(', ')}. Check submission history.`, 
            6000
        );
    }, 2500);
}

// ===== Network Status Indicator =====
function showNetworkStatus() {
    // Check if browser is online
    if (navigator.onLine) {
        console.log('Browser is online - submissions will be saved locally and can be sent via email/WhatsApp');
    } else {
        showToast('You are offline. Submissions will be saved locally.', 5000);
    }
}

// Listen for online/offline events
window.addEventListener('online', () => {
    showToast('You are back online!', 2000);
});

window.addEventListener('offline', () => {
    showToast('You are offline. Submissions will be saved locally.', 3000);
});

// Initialize network status
showNetworkStatus();

// ===== Form Validation =====
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            emailInput.style.borderColor = '#ff4444';
            showToast('Please enter a valid email address', 3000);
        } else {
            emailInput.style.borderColor = '';
        }
    });
}

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', () => {
        // Allow only numbers and common phone characters
        phoneInput.value = phoneInput.value.replace(/[^\d+\-() ]/g, '');
    });
}

