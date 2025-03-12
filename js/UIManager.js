/**
 * Manages the user interface elements and updates for the word game
 * @class UIManager
 */
class UIManager {
    /**
     * Creates an instance of UIManager and initializes DOM element references
     * @constructor
     */
    constructor() {
        this.gameBoard = document.getElementById('gameBoard');
        this.attemptsDiv = document.getElementById('attempts');
        this.correctLetters = document.getElementById('correctLetters');
        this.misplacedLetters = document.getElementById('misplacedLetters');
        this.wrongLetters = document.getElementById('wrongLetters');
    }

    /**
     * Updates the game display with the latest guess result
     * @param {Object} result - The result object containing game state information
     * @param {boolean} result.success - Indicates if the guess was valid
     * @param {number} result.attempts - Current number of attempts
     * @param {string} result.word - The guessed word
     * @param {Object} result.validation - Validation results for the guess
     */
    updateGameDisplay(result) {
        if (!result || !result.success) return;
        
        this.updateAttempts(result.attempts);
        this.updateGameBoard(result);
        this.updateLetterStats(result);
        this.checkGameEnd(result);
    }

    /**
     * Updates the attempts counter display
     * @param {number} attempts - Current number of attempts
     */
    updateAttempts(attempts) {
        this.attemptsDiv.textContent = `Attempts: ${attempts}/6`;
    }

    /**
     * Updates the game board with the new guess row
     * @param {Object} result - The result object containing guess information
     */
    updateGameBoard(result) {
        const guessRow = document.createElement('div');
        guessRow.className = 'guess-row';
        
        for (let i = 0; i < result.word.length; i++) {
            const letterBox = this.createLetterBox(result.word[i], result.validation, i);
            guessRow.appendChild(letterBox);
        }
        
        this.gameBoard.appendChild(guessRow);
    }

    /**
     * Creates a letter box element with appropriate styling based on validation
     * @param {string} letter - The letter to display
     * @param {Object} validation - Validation results containing correct, misplaced indices
     * @param {number} index - The index of the letter in the word
     * @returns {HTMLElement} The created letter box element
     */
    createLetterBox(letter, validation, index) {
        const letterBox = document.createElement('div');
        letterBox.className = 'letter-box';
        letterBox.textContent = letter;

        if (validation.correct.includes(index)) {
            letterBox.classList.add('letter-correct');
        } else if (validation.misplaced.includes(index)) {
            letterBox.classList.add('letter-misplaced');
        } else {
            letterBox.classList.add('letter-wrong');
        }

        return letterBox;
    }

    /**
     * Updates the letter statistics display
     * @param {Object} result - The result object containing letter statistics
     * @param {Object} result.allLetters - Object containing arrays of correct, misplaced, and wrong letters
     */
    updateLetterStats(result) {
        this.correctLetters.textContent = 'Correct: ' + result.allLetters.correct.join(', ');
        this.misplacedLetters.textContent = 'Misplaced: ' + result.allLetters.misplaced.join(', ');
        this.wrongLetters.textContent = 'Wrong: ' + result.allLetters.wrong.join(', ');
    }

    /**
     * Checks if the game has ended (win or loss) and displays appropriate message
     * @param {Object} result - The result object containing game state
     * @param {string} result.targetWord - The target word to guess
     * @param {number} result.attempts - Current number of attempts
     * @param {Object} result.validation - Validation results for the guess
     */
    checkGameEnd(result) {
        if (result.validation.correct.length === result.word.length) {
            alert('Congratulations! You won!');
        } else if (result.attempts >= 6) {
            alert('Game Over! The word was: ' + result.targetWord);
        }
    }

    /**
     * Resets the game display to initial state
     */
    resetDisplay() {
        this.gameBoard.innerHTML = '';
        this.attemptsDiv.textContent = 'Attempts: 0/6';
        this.correctLetters.textContent = 'Correct: ';
        this.misplacedLetters.textContent = 'Misplaced: ';
        this.wrongLetters.textContent = 'Wrong: ';
    }
}