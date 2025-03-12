/**
 * Class representing a bank of words
 */
class WordBank {
    /**
     * Creates a new WordBank instance
     * @param {number} wordLength - The length of words to be loaded
     */
    constructor(wordLength) {
        this.wordLength = wordLength;
        this.words = [];
        this.currentWord = '';
        this.loadWords();
    }

    /**
     * Loads words from a text file based on the specified word length
     * The file must be located in the 'data' directory with naming pattern 'word_bank_X_letter.txt'
     * @returns {Promise<void>}
     */
    async loadWords() {
        try {
            const response = await fetch(`data/word_bank_${this.wordLength}_letter.txt`);
            const text = await response.text();
            this.words = text.split('\n').map(word => word.trim());
            this.selectRandomWord();
        } catch (error) {
            console.error('Error loading words:', error);
        }
    }

    /**
     * Selects a random word from the loaded word list
     */
    selectRandomWord() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        this.currentWord = this.words[randomIndex];
    }
}

module.exports = WordBank;