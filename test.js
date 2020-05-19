const { expect } = require('chai');

function reverseString(str) {
    return str
        .split('')
        .reverse('')
        .join('');
}

function _nextPalindrome(num) {
    const asString = num.toString();
    const isEven = asString.length % 2 === 0;

    const half = asString.length / 2;

    if (isEven) {
        const left = asString.substring(0, half);
        const right = asString.substring(half);
        const reversedLeft = reverseString(left);

        // right < reversed(left), it fits!
        if (right < reversedLeft) {
            return BigInt(left + reversedLeft);
        }

        // else reversed(left) < right, doesn't fit and we have to increment left
        const increased = (BigInt(left) + 1n).toString();
        return BigInt(increased + reverseString(increased));
    }

    // else odd

    const pivotIndex = Math.floor(half);
    const left = asString.substring(0, pivotIndex);
    const middle = asString[pivotIndex];
    const right = asString.substring(pivotIndex + 1);

    const reversedLeft = reverseString(left);

    // right < reversed(left), it fits!
    if (right < reversedLeft) {
        return BigInt(left + middle + reversedLeft);
    }

    // else reversed(left) < right, doesn't fit and we have to increment middle
    const increased = (BigInt(left + middle) + 1n).toString();
    return BigInt(increased + reverseString(increased.substring(0, increased.length - 1)));
}

// ================================================= Tests =================================================

const globals = {
    _nextPalindrome
};

/**
 * shorthand to serialize bigints, chai or mocha doesn't know what to do with em'.
 **/
const s = bi => bi.toString();

describe('_nextPalindrome', () => {

    /**
     * Nomenclature example:
     * For a given number 1234567n:
     * left = 123; middle = 4 (if odd); right = 467; reversed(left) = 321.
     **/
    it('given even number with right higher than reversed(left) half', () => {
        const input = 123456;
        const expected = s(124421n);
        const actual = globals._nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('given even number with right lower than reversed(left) half', () => {
        const input = 123256;
        const expected = s(123321n);
        const actual = globals._nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('given odd number with right higher than reversed(left) half', () => {
        const input = 1234567n;
        const expected = s(1235321n);
        const actual = globals._nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('given odd number with right lower than left half', () => {
        const input = 1234267n;
        const expected = s(1234321n);
        const actual = globals._nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('given odd number with right lower than left reversed(half), middle is 9', () => {
        const input = 1239267n;
        const expected = s(1239321n);
        const actual = globals._nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('given odd number with right higher than reversed(left) half, middle is 9', () => {
        const input = 1239467n;
        const expected = s(1240421n);
        const actual = globals._nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('is fast with big number input, close to MAX_SAFE_INTEGER', () => {
        const input = 4503599627370495; // Math.floor(Number.MAX_SAFE_INTEGER / 2)
        const expected = s(4503599669953054n);
        const actual = globals._nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('works for bigger string numbers', () => {
        const input = '34873445035996273704953894738946'; // wont work with regular Number (> max number)
        const expected = s(34873445035996277269953054437843n);
        const actual = globals._nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });


    it('works for bigints bigger than Number.MAX_VALUE (browser)', () => {
        const input = 17976931348623157081452742373170435679807056752584499659891747680315726078002853876058955863276687817154045895351438246423432132688946418276846754670353751698604991057655128207624549009038932894407586850845513394230458323690322294816580855933212334827479782620414472316873817718091929988125040402618412485832368n; // wont work with regular Number (> max number)

        const expected = s(17976931348623157081452742373170435679807056752584499659891747680315726078002853876058955863276687817154045895351438246423432132688946418276846754670353751715735307645764867281464988623123432464283415359854045171878667236855985067835820087062751308674719895699448525765070897653407137324725418075132684313967971n);

        const actual = globals._nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('works for numbers less than 2 digits (split left and right)', () => {
        const input = 7;
        const expected = s(8);
        const actual = globals._nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('works for small numbers', () => {
        const input = 10;
        const expected = s(11);
        const actual = globals._nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

});
