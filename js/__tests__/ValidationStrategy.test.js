const ValidationStrategy = require('../ValidationStrategy');

describe('ValidationStrategy', () => {
    let validator;

    beforeEach(() => {
        validator = new ValidationStrategy();
    });

    test('should correctly identify exact matches', () => {
        const result = validator.validate('HELLO', 'HELLO');
        expect(result.correct).toEqual([0, 1, 2, 3, 4]);
        expect(result.misplaced).toEqual([]);
        expect(result.wrong).toEqual([]);
    });

    test('should identify misplaced letters', () => {
        const result = validator.validate('HEART', 'EARTH');
        expect(result.correct).toEqual([]);
        expect(result.misplaced).toEqual([0, 1, 2, 3, 4]);
        expect(result.wrong).toEqual([]);
    });

    test('should identify wrong letters', () => {
        const result = validator.validate('SMART', 'BRAIN');
        expect(result.correct).toEqual([2]);
        expect(result.misplaced).toEqual([3]);
        expect(result.wrong).toEqual([0, 1, 4]);
    });
});