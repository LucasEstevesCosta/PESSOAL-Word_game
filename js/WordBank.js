class WordBank {
    constructor(wordLength) {
        this.wordLength = wordLength;
        this.words = [];
        this.currentWord = '';
        this.loadWords();
    }

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

    selectRandomWord() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        this.currentWord = this.words[randomIndex];
    }
}