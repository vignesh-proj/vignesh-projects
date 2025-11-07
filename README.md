# Vichuufx Website

A professional, modern website for Vichuufx_ - Creative Editor & Visual Designer.

## 🌐 Website URL
**www.vichuufx.com**

## 📋 Features

### 🎨 Design
- **Dark/Light Theme Toggle** - Switch between beautiful dark (gold & black) and light (blue) themes
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop
- **Smooth Animations** - Engaging animations and transitions throughout
- **High-Quality Images** - Uses your provided logo and background images

### 📄 Pages
1. **Home** - Overview of your brand, services, and featured works
2. **Work** - Gallery of your creative edits and promotions
3. **Services** - Detailed information about your offerings:
   - Editing Work
   - Promotion Work
   - Guide & Helping
   - Free Alight Motion CC
4. **About** - Information about you and your mission
5. **Contact** - Contact form and all your contact information
6. **History** - Submission history page for tracking requests

### 🛠️ Functionality
- **Contact Form** - Submissions are saved locally and can be sent via:
  - Email (opens email client)
  - WhatsApp (opens WhatsApp with pre-filled message)
  - Instagram (direct link)
  - Telegram (direct link)
- **Submission Tracking** - All form submissions are stored in browser localStorage
- **Submission History** - View, export, and manage all submissions
- **Notification System** - Toast notifications for user actions
- **Browsing Network** - Tracks submissions across sessions

### 🎯 Contact Information
- **Phone:** +91 6369986674
- **Email:** vichuufx2@gmail.com
- **Telegram:** t.me/vichuupage
- **Instagram:** @vichuufx_
- **YouTube:** @vichuufx

## 📁 File Structure

```
vichuu/
├── index.html          # Home page
├── work.html           # Work gallery page
├── services.html       # Services page
├── about.html          # About page
├── contact.html        # Contact page
├── history.html        # Submission history page
├── styles.css          # Main stylesheet (dark/light theme)
├── script.js           # JavaScript functionality
├── vichuuprofile.jpg   # Logo/Profile image
├── blue background.jpg # Light theme background
├── gold and black background.jpg # Dark theme background
└── README.md           # This file
```

## 🚀 Getting Started

### Local Development
1. Simply open `index.html` in your web browser
2. All files are self-contained - no build process required
3. The website works completely offline (after initial load)

### Web Hosting
1. Upload all files to your web hosting server
2. Ensure all image files are in the same directory as HTML files
3. Point your domain (www.vichuufx.com) to the hosting directory
4. The website is ready to use!

## 🎨 Theme Customization

The website uses CSS variables for easy theming. Edit `styles.css`:

```css
:root {
    /* Light Theme Colors */
    --bg-primary: #f5f7fa;
    --accent-color: #4a90e2;
    /* ... */
}

[data-theme="dark"] {
    /* Dark Theme Colors */
    --bg-primary: #0a0a0a;
    --accent-color: #ffd700;
    /* ... */
}
```

## 📱 Features Breakdown

### Contact Form
- Saves submissions to browser localStorage
- Opens email client with pre-filled email
- Option to open WhatsApp with message
- Tracks submission history
- Export history as CSV file

### Work Gallery
- Filterable by category (All, Editing, Promotion, Color Correction)
- Hover effects with overlay information
- Links to Instagram for viewing work

### Responsive Navigation
- Mobile-friendly hamburger menu
- Smooth scrolling
- Active page highlighting

### Theme System
- Remembers user's theme preference
- Smooth theme transitions
- Background images change with theme

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript (Vanilla)** - No dependencies
- **LocalStorage API** - For data persistence

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- No external dependencies
- Optimized images
- Efficient CSS animations
- Fast page loads

## 📝 Notes

### Form Submissions
- Form submissions are stored locally in the browser
- To actually send emails, you'll need to:
  1. Set up a backend service (PHP, Node.js, etc.)
  2. Use an email service (SendGrid, Mailgun, etc.)
  3. Or manually check the submission history page

### WhatsApp Integration
- Currently opens WhatsApp Web/App with pre-filled message
- Requires user to have WhatsApp installed
- Phone number format: +91 6369986674

### Instagram Integration
- Links directly to your Instagram profile
- Users can DM you from there

## 🎯 Future Enhancements (Optional)

1. Backend integration for email sending
2. Admin panel for managing submissions
3. Blog section for tutorials
4. Portfolio gallery with actual video previews
5. Payment integration for services
6. Newsletter subscription

## 👨‍💼 Owner
**Vignesh** - CEO of Vichuufx_

## 📄 License
All rights reserved. © 2024 Vichuufx_

---

**Need Help?** Contact via email: vichuufx2@gmail.com

