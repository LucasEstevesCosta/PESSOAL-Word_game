/**
 * GameManager is a singleton class that manages the game state.
 */
class GameManager {
    /**
     * Creates an instance of GameManager.
     * @constructor
     */
    constructor() {
        if (GameManager.instance) {
            return GameManager.instance;
        }
        GameManager.instance = this;
        this.gameState = null;
    }

    /**
     * Initializes the game with the given word length.
     * @param {number} wordLength - The length of the word to be used in the game.
     * @returns {GameState} The initialized game state.
     * @description This method creates a new game state using three main components (classes):
     * - WordBank: Manages the collection of words with the specified length
     * - ValidationStrategy: Handles the validation rules for word guesses
     * - GameState: Maintains the current state of the game including the word to guess,
     *   player attempts, and game progress
     */
    initializeGame(wordLength) {
        const wordBank = new WordBank(wordLength);
        const validator = new ValidationStrategy();
        this.gameState = new GameState(wordBank, validator);
        return this.gameState;
    }
}