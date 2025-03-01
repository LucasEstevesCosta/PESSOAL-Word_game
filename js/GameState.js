class GameState {
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