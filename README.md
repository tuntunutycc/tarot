# Tarot Card Reading Web App

A responsive web application for tarot card readings with support for English and Burmese languages.

## Features

- Interactive tarot card shuffling and selection
- Three-card spread for past, present, and future readings
- Detailed card interpretations in both English and Burmese
- Responsive design that works on mobile, tablet, and desktop devices
- Smooth animations and transitions
- Audio effects for card shuffling

## Technologies Used

- HTML5
- CSS3 (with responsive design)
- JavaScript (Vanilla JS)
- JSON for card data

## How to Use

1. Open the application in your web browser
2. Click the "Reveal Cards" button to show the three-card spread
3. Click on each card to flip and reveal its interpretation
4. Read the detailed past, present, and future predictions
5. Click "Reset" at the bottom of the reading to start over

## Structure

- `index.html` - Main HTML structure
- `styles.css` - CSS styling with responsive design
- `tarot.js` - JavaScript functionality
- `tarot_cards.json` - Database of tarot cards with interpretations
- `images/` - Card images and backgrounds
- `sounds/` - Sound effects

## Setup

No special setup required. Simply clone the repository and open `index.html` in a web browser.

```bash
git clone https://github.com/yourusername/tarot-card-reading.git
cd tarot-card-reading
```

Alternatively, you can run a local server:

```bash
python -m http.server
```

Then visit `http://localhost:8000` in your browser.

## License

[MIT License](LICENSE)

## Credits

- Card interpretations sourced from traditional tarot meanings
- Burmese translations provided alongside English readings 