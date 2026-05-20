# 🍸 Cocktail Menu Website

An elegant, interactive cocktail menu website with a sophisticated black and gold theme, featuring a smart quiz system, advanced filtering, and bilingual support (English/Traditional Chinese).

## ✨ Features

### 🎯 Interactive Quiz System
Guide users to their perfect cocktail menu through a 4-step quiz:
1. **Taste Preferences** - Sweet & Fruity, Refreshing & Light, Balanced & Smooth, Bold & Zesty
2. **Occasion** - Wedding, Corporate, Party, Casual Gathering
3. **Strength Level** - Light & Easy, Medium Strength, A bit Stronger
4. **Optional Ingredients** - Customize with specific spirits, liqueurs, juices, mixers, and flavors

### 🎨 Sophisticated Design
- **Black & Gold Theme** - Deep black (#0A0A0A) with elegant gold accents (#e2a30a)
- **Premium Typography** - Raleway font family for a luxurious feel
- **Animated Particles** - Floating gold particles create an ambient atmosphere
- **Smooth Animations** - Fade-in effects and transitions throughout
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices

### 🌐 Bilingual Support
- **English** and **Traditional Chinese (繁體中文)**
- Real-time language switching
- All content translates instantly:
  - Quiz questions and options
  - Ingredient names
  - Cocktail descriptions
  - Filter labels
  - Button text
  - Menu captions

### 🔍 Advanced Filtering System
- **Strength Filters** - Filter by Light, Medium, or Strong cocktails
- **Ingredient Filters** - Add/remove ingredients with an intuitive modal
- **Smart Matching** - Cocktails must contain ALL selected ingredients
- **Filter Persistence** - Selections remain when switching between pages
- **Clear All** - Reset filters with one click

### 📋 Menu Display
- **Side-by-Side Layout:**
  - **Left (40%):** Menu images from previous events with navigation arrows
  - **Right (60%):** Matching cocktail cards with descriptions
- **Menu Navigation** - Browse through multiple menu pages with ‹ › arrows
- **Page Indicators** - Shows current page number (e.g., "2 / 5")
- **Consistent Layout** - Maintains size even when no results match filters

### 🍹 Cocktail Database
**60 Premium Cocktails** including:
- Classics: Margarita, Mojito, Old Fashioned, Negroni, Manhattan
- Modern: Espresso Martini, French Martini, Pornstar Martini
- Tropical: Mai Tai, Piña Colada, Blue Hawaiian, Zombie
- Whiskey: Whiskey Sour, Mint Julep, Boulevardier, Sazerac
- And many more!

Each cocktail includes:
- Name (English & Chinese)
- Full description (English & Chinese)
- Complete ingredient list
- Preparation method
- Emoji icon
- Associated menu pages

### 📱 Social Integration
- **Instagram** - Link to @xoxobeverages
- **WhatsApp** - Direct contact via WhatsApp
- **Website** - Link to xoxobeverages.com
- **Event Enquiry** - External link to event enquiry form

## 🚀 Quick Start

### Local Development
1. **Clone or download** this repository
2. **Open terminal** and navigate to the project folder:
   ```bash
   cd "/Users/apple/Downloads/cocktail/Menu Website"
   ```
3. **Start a local server:**
   ```bash
   python3 -m http.server 8000
   ```
4. **Open in browser:** `http://localhost:8000`

### File Structure
```
Menu Website/
├── index.html           # Main HTML structure
├── app.js              # Core JavaScript logic
├── Instagram_icon.png  # Instagram icon image
├── Menu1.png           # Menu image 1
├── Menu2.png           # Menu image 2
├── Menu3.png           # Menu image 3
├── Menu4.png           # Menu image 4
├── Menu5.png           # Menu image 5
├── Menu6.png           # Menu image 6
└── README.md           # This file
```

## 🛠️ Technical Stack

### Core Technologies
- **HTML5** - Semantic markup
- **CSS3** - Custom styling with Tailwind utility classes
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **Google Fonts** - Raleway font family

### Key Features Implementation
- **State Management** - Pure JavaScript objects for quiz answers and selections
- **Filtering Algorithm** - Set-based ingredient matching with strength filters
- **Language System** - Translation objects with dynamic content updates
- **Modal System** - Custom modals for recipes and ingredient selection
- **Responsive Design** - CSS Grid and Flexbox with media queries
- **Particle Animation** - Canvas-based floating particles
- **Menu Navigation** - Array-based page system with navigation controls

## 📝 Customization Guide

### Adding New Cocktails
Edit the `cocktails` array in `app.js`:
```javascript
{
    id: 61,
    name: 'Your Cocktail Name',
    nameCn: '您的雞尾酒名稱',
    ingredients: ['vodka', 'lime-juice', 'simple-syrup'],
    description: 'English description here',
    descriptionCn: '中文描述在這裡',
    method: 'Preparation instructions',
    image: '🍹',
    menus: ['menu1', 'menu2']
}
```

### Adding New Ingredients
Edit the `ingredients` object in `app.js`:
```javascript
spirits: [
    { 
        id: 'new-spirit', 
        name: 'New Spirit', 
        nameCn: '新烈酒',
        image: '🥃' 
    }
]
```

### Adding Menu Images
1. Add your menu image file (PNG/JPG) to the project folder
2. Update `menuSources` in `app.js`:
```javascript
menuSources: {
    menu7: {
        name: 'New Menu Name',
        images: ['Menu7.png'],
        type: 'premium'
    }
}
```

### Color Customization
Modify CSS in `index.html`:
- **Background:** `#0A0A0A` (Deep Black)
- **Gold Accent:** `#e2a30a` (Luxe Gold)
- **Light Gold:** `#F5E8C7` (Cream Gold)
- **Card Background:** `#1C1C1C` (Dark Gray)

### Translation Updates
Edit the `translations` object in `app.js`:
```javascript
translations: {
    en: {
        // English translations
    },
    zh: {
        // Traditional Chinese translations
    }
}
```

## 🌟 User Flow

1. **Landing Page** - Animated particles, language selector, start quiz button
2. **Quiz Page 1** - Select taste preference (5 options)
3. **Quiz Page 2** - Select occasion (5 options)
4. **Quiz Page 3** - Select strength level (4 options)
5. **Quiz Page 4** - Optional ingredient selection (5 categories)
6. **Results Page** - View recommended menus and matching cocktails
7. **Filtering** - Refine results with strength and ingredient filters
8. **Recipe Modal** - View full cocktail details
9. **See All Menus** - Browse complete menu catalog

## 📱 Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ iOS Safari
- ✅ Chrome Mobile
- ✅ Samsung Internet

## 🎯 Performance

- **Lightweight** - ~50KB HTML + ~80KB JavaScript (uncompressed)
- **Fast Load** - No external dependencies except Google Fonts
- **Smooth Animations** - 60fps particle effects
- **Optimized Images** - Menu images served as static assets
- **Efficient Filtering** - Set-based algorithms for instant results

## 📄 License

Custom project for XOXO Beverages cocktail catering services.

## 🔗 Links

- **Website:** [xoxobeverages.com](https://xoxobeverages.com)
- **Instagram:** [@xoxobeverages](https://www.instagram.com/xoxobeverages)
- **WhatsApp:** [+852 9764 7174](https://wa.me/85297647174)
- **Event Enquiry:** [xoxobeverages.com/event-enquiry](https://xoxobeverages.com/event-enquiry/)

---

**Perfect for:** Weddings, Corporate Events, Private Parties, Luxury Gatherings 🥂
