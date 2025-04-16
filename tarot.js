let tarotDeck = null;
let isDeckShuffled = false;
let currentReadings = {
    past: null,
    present: null,
    future: null
};
let drawnCards = []; // Track drawn cards

// Load the tarot cards data
fetch('tarot_cards.json')
    .then(response => response.json())
    .then(data => {
        tarotDeck = data;
    })
    .catch(error => console.error('Error loading tarot cards:', error));

function shuffleDeck() {
    if (!tarotDeck) return;
    
    // Play shuffle sound
    const shuffleSound = new Audio('sounds/shuffle.mp3');
    shuffleSound.play();
}

function revealCards() {
    if (!tarotDeck) return;
    
    // Hide the shuffle card and button
    const shuffleContainer = document.querySelector('.shuffle-container');
    shuffleContainer.style.opacity = '0';
    setTimeout(() => {
        shuffleContainer.style.display = 'none';
    }, 500);
    
    // Get the cards container
    const cardsContainer = document.querySelector('.cards-container');
    
    // Enable the reading cards after animation
    setTimeout(() => {
        isDeckShuffled = true;
        
        // Show the cards container with a dramatic entrance
        cardsContainer.style.display = 'flex'; // Make it visible
        setTimeout(() => { // Delay to allow display change before animation
            cardsContainer.style.opacity = '1';
            cardsContainer.style.transform = 'scale(1.05)';
            cardsContainer.style.boxShadow = '0 0 30px rgba(232, 195, 125, 0.6)';
        }, 50); 

        // Emphasize that cards are ready for selection
        const readingCards = document.querySelectorAll('.cards-container .card');
        readingCards.forEach(card => {
            card.style.boxShadow = '0 0 20px rgba(232, 195, 125, 0.9)';
            setTimeout(() => {
                card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
            }, 1200);
        });
        
        // Return cards container to normal size after the glow effect
        setTimeout(() => {
            cardsContainer.style.transform = 'scale(1)';
            cardsContainer.style.boxShadow = '0 0 15px rgba(232, 195, 125, 0.3)';
        }, 1500);
    }, 700); // Reduced delay since we don't need the full shuffle animation
}

function getRandomCard() {
    if (!tarotDeck) return null;

    // Combine all cards into one array
    const allCards = [
        ...tarotDeck.major_arcana,
        ...tarotDeck.minor_arcana.wands,
        ...tarotDeck.minor_arcana.cups,
        ...tarotDeck.minor_arcana.swords,
        ...tarotDeck.minor_arcana.pentacles
    ];

    // Filter out already drawn cards
    const availableCards = allCards.filter(card => !drawnCards.includes(card));

    // If no cards are available, reset the drawn cards array
    if (availableCards.length === 0) {
        drawnCards = [];
        return getRandomCard();
    }

    // Get a random card from available cards
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const selectedCard = availableCards[randomIndex];
    
    // Add the selected card to drawn cards
    drawnCards.push(selectedCard);
    
    return selectedCard;
}

function flipCard(card, position) {
    // Only allow card flipping if the deck has been shuffled
    if (!isDeckShuffled) {
        // Highlight the shuffle card to indicate it needs to be clicked first
        const shuffleCard = document.querySelector('.shuffle-card');
        shuffleCard.style.boxShadow = '0 0 20px rgba(52, 152, 219, 0.8)';
        setTimeout(() => {
            shuffleCard.style.boxShadow = '';
        }, 1000);
        return;
    }
    
    if (!card.classList.contains('flipped')) {
        const randomCard = getRandomCard();
        if (randomCard) {
            card.classList.add('flipped');
            const nameSpan = card.querySelector('.card-name');
            nameSpan.textContent = randomCard.name;
            currentReadings[position] = randomCard;
            updateReadingDisplay();
        }
    }
}

function updateReadingDisplay() {
    const readingDisplay = document.getElementById('readingDisplay');
    const readingTitle = document.getElementById('readingTitle');
    const readingText = document.getElementById('readingText');
    const resetButton = document.querySelector('.reset-button');
    
    // Check if all cards are flipped
    const allFlipped = Object.values(currentReadings).every(reading => reading !== null);
    
    if (allFlipped) {
        readingDisplay.style.display = 'block';
        readingTitle.textContent = 'Your Reading';
        
        let readingContent = '';
        readingContent += `<strong>Past:</strong><br>`;
        readingContent += `<div class="reading-section">`;
        readingContent += `<div class="reading-language">English:</div>`;
        readingContent += `<div class="reading-text">${currentReadings.past.fullReading}</div>`;
        readingContent += `<div class="reading-language">Burmese:</div>`;
        readingContent += `<div class="reading-text">${currentReadings.past.fullReadingBurmese}</div>`;
        readingContent += `</div><br>`;
        
        readingContent += `<strong>Present:</strong><br>`;
        readingContent += `<div class="reading-section">`;
        readingContent += `<div class="reading-language">English:</div>`;
        readingContent += `<div class="reading-text">${currentReadings.present.fullReading}</div>`;
        readingContent += `<div class="reading-language">Burmese:</div>`;
        readingContent += `<div class="reading-text">${currentReadings.present.fullReadingBurmese}</div>`;
        readingContent += `</div><br>`;
        
        readingContent += `<strong>Future:</strong><br>`;
        readingContent += `<div class="reading-section">`;
        readingContent += `<div class="reading-language">English:</div>`;
        readingContent += `<div class="reading-text">${currentReadings.future.fullReading}</div>`;
        readingContent += `<div class="reading-language">Burmese:</div>`;
        readingContent += `<div class="reading-text">${currentReadings.future.fullReadingBurmese}</div>`;
        readingContent += `</div>`;
        
        readingText.innerHTML = readingContent;
        
        // Show the reset button after reading is displayed
        resetButton.style.display = 'block';
        setTimeout(() => {
            resetButton.style.opacity = '1';
        }, 300);
    } else {
        readingDisplay.style.display = 'none';
        resetButton.style.opacity = '0';
        setTimeout(() => {
            resetButton.style.display = 'none';
        }, 500);
    }
}

function resetCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('flipped');
        const nameSpan = card.querySelector('.card-name');
        nameSpan.textContent = '';
    });
    
    currentReadings = {
        past: null,
        present: null,
        future: null
    };
    
    // Reset the shuffle state
    isDeckShuffled = false;
    
    // Hide the reset button
    const resetButton = document.querySelector('.reset-button');
    resetButton.style.opacity = '0';
    setTimeout(() => {
        resetButton.style.display = 'none';
    }, 500);
    
    // Reset the cards container styling and hide it
    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.style.opacity = '0'; // Fade out
    cardsContainer.style.transform = 'scale(1)';
    cardsContainer.style.boxShadow = 'none';
    setTimeout(() => {
        cardsContainer.style.display = 'none'; // Hide after fade out
        
        // Show the shuffle container again
        const shuffleContainer = document.querySelector('.shuffle-container');
        shuffleContainer.style.display = 'flex';
        setTimeout(() => {
            shuffleContainer.style.opacity = '1';
        }, 50);
    }, 500); // Match the transition duration
    
    document.getElementById('readingDisplay').style.display = 'none';
}

function resetDrawnCards() {
    drawnCards = [];
}

function drawCards() {
    // Reset drawn cards when starting a new reading
    resetDrawnCards();
    
    // Clear previous cards
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';
    
    // Hide reading display
    document.getElementById('readingDisplay').style.display = 'none';
    
    // Create three card placeholders
    for (let i = 0; i < 3; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.position = i;
        card.addEventListener('click', () => revealCard(i));
        cardContainer.appendChild(card);
    }
    
    // Reset selected cards
    selectedCards = [null, null, null];
}