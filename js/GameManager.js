class GameManager {
    constructor() {
        if (GameManager.instance) {
            return GameManager.instance;
        }
        GameManager.instance = this;
        this.gameState = null;
    }

    initializeGame(wordLength) {
        const wordBank = new WordBank(wordLength);
        const validator = new StandardValidation();
        this.gameState = new GameState(wordBank, validator);
        return this.gameState;
    }
}