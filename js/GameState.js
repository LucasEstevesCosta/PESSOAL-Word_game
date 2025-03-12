/**
 * Represents the state of the game.
 * Manages the word bank, validator, guesses, and tracking of correct, misplaced, and wrong letters.
 * Provides methods to make guesses and retrieve game state information.
 */
class GameState {
    /**
     * Creates a new instance of the GameState class.
     * @param {WordBank} wordBank - The word bank to use for the game.
     * @param {Validator} validator - The validator to use for validating guesses.
     */
    constructor(wordBank, validator) {
        this.wordBank = wordBank;
        this.validator = validator;
        this.guesses = [];
        this.maxAttempts = 6;
        this.allCorrect = new Set();
        this.allMisplaced = new Set();
        this.allWrong = new Set();
        this.observers = [];
    }

    /**
     * Makes a guess in the game and updates the game state accordingly.
     * @param {string} guess - The word to guess.
     * @returns {object} An object containing information about the guess, including success, word, validation, attempts, target word, completion status, all guesses, and all letters.
     */
    makeGuess(guess) {
        if (this.guesses.length >= this.maxAttempts) {
            return { success: false, message: 'Game over!' };
        }

        const validation = this.validator.validate(guess, this.wordBank.currentWord);
        
        // Update cumulative letter sets
        validation.correct.forEach(i => this.allCorrect.add(guess[i]));
        validation.misplaced.forEach(i => this.allMisplaced.add(guess[i]));
        validation.wrong.forEach(i => this.allWrong.add(guess[i]));

        // Store the guess with its validation
        this.guesses.push({ word: guess, validation });

        return {
            success: true,
            word: guess,
            validation: validation,
            attempts: this.guesses.length,
            targetWord: this.wordBank.currentWord,
            isComplete: validation.correct.length === guess.length,
            allGuesses: this.guesses,
            allLetters: {
                correct: Array.from(this.allCorrect),
                misplaced: Array.from(this.allMisplaced),
                wrong: Array.from(this.allWrong)
            }
        };
    }
}