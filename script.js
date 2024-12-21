// Variables
let currentStep = 0;
let subStep = 0; // For sub-questions
const gameMessage = document.getElementById('game-message');
const gameArea = document.getElementById('game-area');
const startBtn = document.getElementById('start-btn');

// Questions Data
const questions = [
    // First Question
    {
        type: "single",
        message: "What's my girl's go-to snack? ❤️",
        options: [
            { text: "Pani Puri", message: "That's like my girl! 💕", isCorrect: true },
            { text: "Chow-Chow", message: "Baby, you deserve better! 😘", isCorrect: false },
            { text: "Dahi Vada", message: "I'm already committed, you can't tempt me baby! 😏", isCorrect: false },
            { text: "Jhaal Mudhi", message: "Wallah, think of your habibi bhi baby! 😄", isCorrect: false }
        ]
    },
    // Second Question
    {
        type: "multi",
        subQuestions: [
            {
                message: "If you could live in a book world forever, which one would it be?",
                options: [
                    { text: "The Alchemist", message: "A journey of dreams and destiny, just like you! 🌟", isCorrect: true },
                    { text: "Brida", message: "Love, mystery, and magic—just like your soul! ❤️", isCorrect: true },
                    { text: "The Devil and Miss Prym", message: "Intriguing and thoughtful, just like you. 🧠", isCorrect: true }
                ]
            },
            {
                message: "Which of these makes your heart melt the most?",
                options: [
                    { text: "Chocolates", message: "Sweet like you, my chocolate-loving queen! 🍫", isCorrect: true },
                    { text: "Candles", message: "Lighting up the world, just like you light up my life! 🕯️", isCorrect: true },
                    { text: "Ribbons", message: "Tied together like us—forever! 🎀", isCorrect: true },
                    { text: "Kisses from me", message: "Now that's the sweetest choice! 😘", isCorrect: true }
                ]
            }
        ],
        finalMessage: "You’re like the perfect novel—sweet in all the right ways and impossible to put down (just like chocolate, but without the sugar). 💕"
    },
    // Third Question
    {
        type: "card",
        message: "Pick a card to reveal the special connection. ❤️",
        cards: [
            {
                text: "7 of Hearts",
                image: "7-of-hearts.jpg", // Replace with your image file
                result: "07/07, 7th July — The day our journey of this eternal relationship began. ❤️",
                isCorrect: true
            },
            {
                text: "6 of Diamonds",
                image: "6-of-diamonds.jpg", // Replace with your image file
                result: "Multiply 6 with the number of sides a diamond has, and then add another 6. Finally, add 6 to the number of sides of a diamond. That’s your birthday, 30th Oct! 💎(Well, you are no less than a diamond)",
                isCorrect: true
            }
        ]
    }
    
];

// Start Game
startBtn.addEventListener('click', startGame);

function startGame() {
    startBtn.style.display = 'none';
    nextStep();
}

// Update nextStep to include the new `story` question type

function showSingleQuestion(question) {
    gameMessage.innerText = question.message;
    gameArea.innerHTML = '';

    // Create a container for the options
    const optionsContainer = document.createElement('div');
    optionsContainer.setAttribute('id', 'options-container');

    // Display all options as true responses
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.classList.add('option-btn');
        button.addEventListener('click', () => handleSingleQuestion(option));
        optionsContainer.appendChild(button);
    });

    gameArea.appendChild(optionsContainer);

    // Create the Next button (hidden initially)
    const nextBtn = document.createElement('button');
    nextBtn.setAttribute('id', 'next-btn');
    nextBtn.innerText = 'Next';
    nextBtn.style.display = 'none'; // Initially hidden
    nextBtn.addEventListener('click', () => {
        currentStep++;
        nextStep();
    });

    gameArea.appendChild(nextBtn);
}

function handleSingleQuestion(option) {
    gameMessage.innerText = option.message;

    // Display the Next button after an option is clicked
    const nextBtn = document.getElementById('next-btn');
    nextBtn.style.display = 'block';
}


function showSubQuestion(question) {
    if (subStep >= question.subQuestions.length) {
        const finalMessage = document.createElement('p');
        finalMessage.innerText = question.finalMessage;
        gameArea.innerHTML = '';
        gameArea.appendChild(finalMessage);

        // Create the Next button
        const nextBtn = document.createElement('button');
        nextBtn.setAttribute('id', 'next-btn');
        nextBtn.innerText = 'Next';
        nextBtn.addEventListener('click', () => {
            currentStep++;
            nextStep();
        });
        gameArea.appendChild(nextBtn);
        return;
    }

    const subQuestion = question.subQuestions[subStep];
    gameMessage.innerText = subQuestion.message;
    gameArea.innerHTML = '';

    const optionsContainer = document.createElement('div');
    optionsContainer.setAttribute('id', 'options-container');

    subQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.classList.add('option-btn');
        button.addEventListener('click', () => handleSubQuestion(option, question));
        optionsContainer.appendChild(button);
    });

    gameArea.appendChild(optionsContainer);

    // Create a message display area for the option messages
    const messageDisplay = document.createElement('p');
    messageDisplay.setAttribute('id', 'message-display');
    gameArea.appendChild(messageDisplay);
}

function handleSubQuestion(option, question) {
    const messageDisplay = document.getElementById('message-display');
    messageDisplay.innerText = option.message; // Display the selected option's message

    // Proceed to the next sub-question
    subStep++;
    setTimeout(() => {
        showSubQuestion(question);
    }, 1000); // Add a short delay to allow the message to be read
}



function showCardQuestion(question) {
    gameMessage.innerText = question.message;
    gameArea.innerHTML = '';

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    question.cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        cardInner.addEventListener('click', () => handleCardClick(card, cardInner));

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.innerText = card.text;

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.innerText = card.result;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardElement.appendChild(cardInner);
        cardContainer.appendChild(cardElement);
    });

    gameArea.appendChild(cardContainer);

    // Create the Next button (hidden initially)
    const nextBtn = document.createElement('button');
    nextBtn.setAttribute('id', 'next-btn');
    nextBtn.innerText = 'Next';
    nextBtn.style.display = 'none'; // Initially hidden
    nextBtn.addEventListener('click', () => {
        currentStep++;
        nextStep();
    });
    gameArea.appendChild(nextBtn);
}

function handleCardClick(card, cardInner) {
    cardInner.classList.add('flipped'); // Flip the card

    // Display the card result
    gameMessage.innerText = card.result;

    // Display the Next button after the card is clicked
    const nextBtn = document.getElementById('next-btn');
    nextBtn.style.display = 'block';
}

// Add the fourth question to the `questions` array
questions.push({
    type: "story",
    message: "A Tale of Arashi Lands (Here's a story for u, something very close to a dream of us I had someday while reading The Alchemist ❤️❤️❤️)",
    story: [
        "Beneath the velvety sky of Arashi Lands, a world cradled by twin moons, Ashu, a quiet yet gifted wizard, often found solace under the canopy of constellations. The stars whispered to him, ancient secrets only the patient could decipher. But amidst his magical pursuits, he harbored a belief that his destiny was tied to another, someone whose soul echoed his own.",
        "Far across the enchanted meadows, Ara, a star-seeker, spent her nights charting the celestial movements. Her village called her eccentric, but Ara believed the stars were more than lights in the sky; they were guides, weaving the tapestry of destiny.",
        "One fateful evening, the moons aligned, casting a silvery glow upon the earth. Ashu, drawn by an inexplicable pull, ventured into the forest. Ara, too, felt the call and followed the starlit path, her heart beating in rhythm with the universe.",
        "They met by the Whispering Lake, where the water mirrored the heavens. Together, they listened to the celestial harmony, a melody that spoke of unity, love, and destiny. As the night deepened, Ashu wove illusions of light, conjuring images of stars dancing, while Ara traced constellations in the air, their magic intertwining in a dazzling display.",
        "Years later, the villagers often told tales of Ashu and Ara, the couple who danced with the stars. On clear nights, it was said you could see two radiant stars twinkling brighter than all the rest, always side by side—a celestial testament to a love written in the fabric of the universe."
    ]
});

// Function to show the story question
function showStoryQuestion(question) {
    let storyIndex = 0;
    gameMessage.innerText = question.message;
    gameArea.innerHTML = '';

    // Display the first page of the story
    const textContainer = document.createElement('div');
    textContainer.setAttribute('id', 'story-text');
    textContainer.innerText = question.story[storyIndex];
    gameArea.appendChild(textContainer);

    // Navigation Buttons
    const navContainer = document.createElement('div');
    navContainer.setAttribute('id', 'navigation');
    navContainer.style.marginTop = "20px"; // Add spacing above navigation buttons

    const prevBtn = document.createElement('button');
    prevBtn.setAttribute('id', 'prev-btn');
    prevBtn.innerText = 'Previous';
    prevBtn.style.marginRight = "10px"; // Add space between buttons
    prevBtn.disabled = true; // Disable Previous button on the first page
    prevBtn.addEventListener('click', () => {
        if (storyIndex > 0) {
            storyIndex--;
            textContainer.innerText = question.story[storyIndex];
            nextBtn.style.display = "inline"; // Ensure Next button is visible
            prevBtn.disabled = storyIndex === 0; // Disable Previous button on the first page
        }
    });

    const nextBtn = document.createElement('button');
    nextBtn.setAttribute('id', 'next-btn');
    nextBtn.innerText = 'Next';
    nextBtn.addEventListener('click', () => {
        if (storyIndex < question.story.length - 1) {
            storyIndex++;
            textContainer.innerText = question.story[storyIndex];
            prevBtn.disabled = false; // Enable Previous button
            if (storyIndex === question.story.length - 1) {
                nextBtn.style.display = 'none'; // Hide Next button on the last page
                transitionToNextStep();
            }
        }
    });

    navContainer.appendChild(prevBtn);
    navContainer.appendChild(nextBtn);
    gameArea.appendChild(navContainer);
}

// Function to transition directly to the next step
function transitionToNextStep() {
    const finalBtn = document.createElement('button');
    finalBtn.setAttribute('id', 'final-btn');
    finalBtn.innerText = "Welcome to Arashi Lands";
    finalBtn.style.marginTop = "20px"; // Add spacing above the final button
    finalBtn.addEventListener('click', () => {
        currentStep++;
        nextStep(); // Proceed to the next step directly
    });
    gameArea.appendChild(finalBtn);
}
function showFinalGift() {
    gameMessage.innerText = ""; // Clear the game message
    gameArea.innerHTML = '';

    // Create a container for the gift icon and message
    const giftContainer = document.createElement('div');
    giftContainer.setAttribute('id', 'gift-container');
    giftContainer.style.textAlign = 'center';

    // Add the gift image
    const giftIcon = document.createElement('img');
    giftIcon.setAttribute('src', 'gift-icon.jpg'); // Replace with your uploaded gift image path
    giftIcon.setAttribute('alt', 'Gift');
    giftIcon.setAttribute('id', 'gift-icon');
    giftIcon.style.cursor = 'pointer';
    giftIcon.style.width = '150px'; // Adjust size as needed
    giftIcon.style.borderRadius = '10px';
    giftIcon.addEventListener('click', playGiftVideo); // Add click event to play the video

    // Add the text prompt to unbox the gift
    const unboxText = document.createElement('p');
    unboxText.innerText = 'Click to unbox your gift';
    unboxText.style.marginTop = '10px';
    unboxText.style.fontSize = '18px';
    unboxText.style.color = '#333';

    // Append everything to the gift container
    giftContainer.appendChild(giftIcon);
    giftContainer.appendChild(unboxText);
    gameArea.appendChild(giftContainer);
}

function playGiftVideo() {
    gameArea.innerHTML = ''; // Clear the game area

    // Create a video element
    const videoContainer = document.createElement('div');
    videoContainer.setAttribute('id', 'video-container');
    videoContainer.style.textAlign = 'center';

    const video = document.createElement('video');
    video.setAttribute('controls', 'true');
    video.setAttribute('autoplay', 'true');
    video.setAttribute('width', '200'); // Adjust size as needed
    video.innerHTML = `<source src="surprise-vid2.mp4" type="video/mp4">`; // Replace with your uploaded video path

    // Add a message below the video
    const videoMessage = document.createElement('p');
    videoMessage.innerHTML = `🎄 Beneath the dusk of stars n' the shining moon🎄<br>  
                              🎆 Have these months passed n' will decades too soon 🎆<br>  
                              ❤️ Our love be cherished, by divine's benevolent bliss❤️<br>  
                              ✨Our hearts entwined, and sealed with a tender kiss✨`;

    videoMessage.style.marginTop = '20px';
    videoMessage.style.fontSize = '12px';
    videoMessage.style.fontWeight = 'bold';
    videoMessage.style.color = '#333';

    // Add the image below the poem
    const image = document.createElement('img');
    image.setAttribute('src', 'nyc.png'); // Replace with your uploaded image path
    image.setAttribute('alt', 'Merry Christmas & Happy New Year 2025, Love');
    image.style.marginTop = '10px';
    image.style.borderRadius = '10px';
    image.style.width = '150px'; // Adjust as needed

    // Append video, poem, and image to the container
    videoContainer.appendChild(video);
    videoContainer.appendChild(videoMessage);
    videoContainer.appendChild(image);
    gameArea.appendChild(videoContainer);
}

// Update nextStep function to show the final gift at the end
function nextStep() {
    if (currentStep >= questions.length) {
        showFinalGift(); // Show the final gift instead of the default message
        return;
    }

    const question = questions[currentStep];
    if (question.type === "single") {
        showSingleQuestion(question);
    } else if (question.type === "multi") {
        subStep = 0;
        showSubQuestion(question);
    } else if (question.type === "card") {
        showCardQuestion(question);
    } else if (question.type === "story") {
        showStoryQuestion(question);
    }
}
