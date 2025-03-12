/**
 * Initializes the game and sets up event listeners for the new game and guess submission buttons.
 * 
 * The `document.addEventListener('DOMContentLoaded', () => { ... })` block is executed when the HTML document has finished loading. It performs the following tasks:
 * 
 * 1. Creates instances of the `GameManager` and `UIManager` classes.
 * 2. Retrieves references to the "New Game" button, "Submit Guess" button, and the guess input field.
 * 3. Adds a click event listener to the "New Game" button, which initializes a new game with the selected word length and resets the UI display.
 * 4. Adds a click event listener to the "Submit Guess" button, which retrieves the user's guess, passes it to the `makeGuess()` method of the current game, and updates the UI display with the result.
 * 5. Initializes the first game with a word length of 5.
 */
document.addEventListener('DOMContentLoaded', () => {
    const gameManager = new GameManager();
    const uiManager = new UIManager();
    let currentGame;

    const newGameBtn = document.getElementById('newGame');
    const submitGuessBtn = document.getElementById('submitGuess');
    const guessInput = document.getElementById('guessInput');

    newGameBtn.addEventListener('click', () => {
        const wordLength = parseInt(document.getElementById('wordLength').value);
        currentGame = gameManager.initializeGame(wordLength);
        uiManager.resetDisplay();
    });

    submitGuessBtn.addEventListener('click', () => {
        const guess = guessInput.value.toUpperCase();
        if (guess.length === currentGame.wordBank.wordLength) {
            const result = currentGame.makeGuess(guess);
            uiManager.updateGameDisplay(result);
            guessInput.value = '';
        }
    });

    // Initialize first game
    currentGame = gameManager.initializeGame(5);
});