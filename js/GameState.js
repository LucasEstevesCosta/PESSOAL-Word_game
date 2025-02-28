class GameState {
    constructor(wordBank, validator) {
        this.wordBank = wordBank;
        this.validator = validator;
        this.guesses = [];
        this.maxAttempts = 6;
        this.observers = [];
    }

    makeGuess(guess) {
        if (this.guesses.length >= this.maxAttempts) {
            return { success: false, message: 'Game over!' };
        }

        const validation = this.validator.validate(guess, this.wordBank.currentWord);
        this.guesses.push({ word: guess, validation });
        this.notifyObservers();

        return {
            success: true,
            validation,
            isComplete: validation.correct.length === this.wordBank.currentWord.length
        };
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => observer.update(this));
    }
}