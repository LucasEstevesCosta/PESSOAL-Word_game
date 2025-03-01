class UIManager {
    constructor() {
        this.gameBoard = document.getElementById('gameBoard');
        this.attemptsDiv = document.getElementById('attempts');
        this.correctLetters = document.getElementById('correctLetters');
        this.misplacedLetters = document.getElementById('misplacedLetters');
        this.wrongLetters = document.getElementById('wrongLetters');
    }

    updateGameDisplay(result) {
        if (!result || !result.success) return;
        
        this.updateAttempts(result.attempts);
        this.updateGameBoard(result);
        this.updateLetterStats(result);
        this.checkGameEnd(result);
    }

    updateAttempts(attempts) {
        this.attemptsDiv.textContent = `Attempts: ${attempts}/6`;
    }

    updateGameBoard(result) {
        const guessRow = document.createElement('div');
        guessRow.className = 'guess-row';
        
        for (let i = 0; i < result.word.length; i++) {
            const letterBox = this.createLetterBox(result.word[i], result.validation, i);
            guessRow.appendChild(letterBox);
        }
        
        this.gameBoard.appendChild(guessRow);
    }

    createLetterBox(letter, validation, index) {
        const letterBox = document.createElement('div');
        letterBox.className = 'letter-box';
        letterBox.textContent = letter;

        if (validation.correct.includes(index)) {
            letterBox.classList.add('letter-correct');
        } else if (validation.misplaced.includes(index)) {
            letterBox.classList.add('letter-misplaced');
        } else {
            letterBox.classList.add('letter-wrong');
        }

        return letterBox;
    }

    updateLetterStats(result) {
        const letters = this.collectUniqueLetters(result);
        
        this.correctLetters.textContent = 'Correct: ' + Array.from(letters.correct).join(', ');
        this.misplacedLetters.textContent = 'Misplaced: ' + Array.from(letters.misplaced).join(', ');
        this.wrongLetters.textContent = 'Wrong: ' + Array.from(letters.wrong).join(', ');
    }

    collectUniqueLetters(result) {
        return {
            correct: new Set(result.validation.correct.map(i => result.word[i])),
            misplaced: new Set(result.validation.misplaced.map(i => result.word[i])),
            wrong: new Set(result.validation.wrong.map(i => result.word[i]))
        };
    }

    checkGameEnd(result) {
        if (result.validation.correct.length === result.word.length) {
            alert('Congratulations! You won!');
        } else if (result.attempts >= 6) {
            alert('Game Over! The word was: ' + result.targetWord);
        }
    }

    resetDisplay() {
        this.gameBoard.innerHTML = '';
        this.attemptsDiv.textContent = 'Attempts: 0/6';
        this.correctLetters.textContent = 'Correct: ';
        this.misplacedLetters.textContent = 'Misplaced: ';
        this.wrongLetters.textContent = 'Wrong: ';
    }
}