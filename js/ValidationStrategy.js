/**
 * @typedef {Object} GuessResult
 * @property {boolean} success - Whether the guess was valid
 * @property {string} word - The guessed word
 * @property {Object} validation - Validation results
 * @property {number[]} validation.correct - Indices of correct letters
 * @property {number[]} validation.misplaced - Indices of misplaced letters
 * @property {number[]} validation.wrong - Indices of wrong letters
 * @property {number} attempts - Number of attempts made
 * @property {string} targetWord - The word to guess
 * @property {boolean} isComplete - Whether the word was guessed correctly
 */

class ValidationStrategy {
    /**
     * Validates a guess against a target word
     * @param {string} guess - The player's guess
     * @param {string} target - The target word
     * @returns {Object} validation result
     */
    validate(guess, target) {
        const result = {
            correct: [],
            misplaced: [],
            wrong: []
        };

        const guessArray = guess.toUpperCase().split('');
        const targetArray = target.toUpperCase().split('');

        guessArray.forEach((letter, index) => {
            if (letter === targetArray[index]) {
                result.correct.push(index);
            } else if (targetArray.includes(letter)) {
                result.misplaced.push(index);
            } else {
                result.wrong.push(index);
            }
        });

        return result;
    }
}