class ValidationStrategy {
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