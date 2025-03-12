/**
 * Class responsible for validating word guesses against a target word
 */
class ValidationStrategy {
    /**
     * Validates a guess word against a target word and returns the validation result
     * @param {string} guess - The word guessed by the player
     * @param {string} target - The target word to compare against
     * @returns {Object} result - Object containing arrays of letter positions
     * @returns {number[]} result.correct - Indexes of correctly placed letters
     * @returns {number[]} result.misplaced - Indexes of letters that exist in target but in wrong position
     * @returns {number[]} result.wrong - Indexes of letters that don't exist in target word
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

module.exports = ValidationStrategy;