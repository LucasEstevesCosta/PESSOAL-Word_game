const WordBank = require('../WordBank');

describe('WordBank', () => {
    let wordBank;

    beforeEach(() => {
        global.fetch = jest.fn();
        console.error = jest.fn();
    });

    describe('loadWords', () => {
        test('should load words successfully', async () => {
            const mockWords = 'HELLO\nWORLD\nSTART';
            global.fetch.mockResolvedValueOnce({
                text: () => Promise.resolve(mockWords)
            });

            wordBank = new WordBank(5);
            await wordBank.loadWords();

            expect(global.fetch).toHaveBeenCalledWith('data/word_bank_5_letter.txt');
            expect(wordBank.words).toEqual(['HELLO', 'WORLD', 'START']);
        });

        test('should handle loading errors', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network error'));
            
            wordBank = new WordBank(5);
            await wordBank.loadWords();

            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('selectRandomWord', () => {
        test('should select a random word', () => {
            const mockMath = Object.create(global.Math);
            mockMath.random = () => 0.5;
            global.Math = mockMath;

            wordBank = new WordBank(5);
            wordBank.words = ['HELLO', 'WORLD', 'START'];
            wordBank.selectRandomWord();

            expect(wordBank.currentWord).toBe('WORLD');
            global.Math = Math; // restore original Math
        });
    });
});