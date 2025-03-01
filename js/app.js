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