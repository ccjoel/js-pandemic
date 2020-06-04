const { expect } = require('chai');
const package = require('.');
const { primes, nextPalindrome, compress_regex } = package;

/**
 * shorthand to serialize bigints; chai or mocha doesn't know how to serialize them when comparing.
 **/
const s = bi => bi.toString();

describe('nextPalindrome', () => {

    /**
     * Nomenclature example:
     * For a given number 1234567n:
     * left = 123; middle = 4 (if odd); right = 467; reversed(left) = 321.
     **/
    it('given even number with right higher than reversed(left) half', () => {
        const input = '123456';
        const expected = s(124421n);
        const actual = nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('given even number with right lower than reversed(left) half', () => {
        const input = '123256';
        const expected = s(123321n);
        const actual = nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('given odd number with right higher than reversed(left) half', () => {
        const input = '1234567';
        const expected = s(1235321n);
        const actual = nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('given odd number with right lower than left half', () => {
        const input = '1234267';
        const expected = s(1234321n);
        const actual = nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('given odd number with right lower than left reversed(half), middle is 9', () => {
        const input = '1239267';
        const expected = s(1239321n);
        const actual = nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('given odd number with right higher than reversed(left) half, middle is 9', () => {
        const input = '1239467';
        /**
         *  1240 _0_421
         **/
        const expected = s(1240421n);
        const actual = nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('is fast with big number input, close to MAX_SAFE_INTEGER', () => {
        const input = 4503599627370495; // Math.floor(Number.MAX_SAFE_INTEGER / 2)
        const expected = s(4503599669953054n);
        const actual = nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('works for bigger string numbers', () => {
        const input = '34873445035996273704953894738946'; // wont work with regular Number (> max number)
        const expected = s(34873445035996277269953054437843n);
        const actual = nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });


    it('works for bigints bigger than Number.MAX_VALUE (browser)', () => {
        const input = '17976931348623157081452742373170435679807056752584499659891747680315726078002853876058955863276687817154045895351438246423432132688946418276846754670353751698604991057655128207624549009038932894407586850845513394230458323690322294816580855933212334827479782620414472316873817718091929988125040402618412485832368'; // wont work with regular Number (> max number)

        const expected = s(17976931348623157081452742373170435679807056752584499659891747680315726078002853876058955863276687817154045895351438246423432132688946418276846754670353751715735307645764867281464988623123432464283415359854045171878667236855985067835820087062751308674719895699448525765070897653407137324725418075132684313967971n);

        const actual = nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('works for numbers less than 2 digits (split left and right)', () => {
        const input = '7';
        const expected = s(8);
        const actual = nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('works for exactly the number 9, which has edge cases such as increases to two digits from only one (no halves)', () => {
        const input = '9';
        const expected = s(11);
        const actual = nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('works for exactly the number 99, which has edge cases such as increases length', () => {
        const input = '99';
        const expected = s(101);
        const actual = nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('works for exactly the number 999, which has edge cases such as increases length', () => {
        const input = '999';
        const expected = s(1001);
        const actual = nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('other scenarios I did not consider', () => {
        expect(s(nextPalindrome(989))).to.equal(s(999));
        expect(s(nextPalindrome(19))).to.equal(s(22));
        expect(s(nextPalindrome(98))).to.equal(s(99));
        expect(s(nextPalindrome(116))).to.equal(s(121));
        expect(s(nextPalindrome(99399))).to.equal(s(99499));
        expect(s(nextPalindrome(99352))).to.equal(s(99399));
    });

    it('works for small numbers', () => {
        const input = '10';
        const expected = s(11);
        const actual = nextPalindrome(input);

        expect(s(actual)).to.equal(expected);
    });

    it('Works as expected with various numeric equivalent input types', () => {

        const good = [
            nextPalindrome(123n), // bigint
            nextPalindrome('17'), // numeric string '17'
            nextPalindrome(9) // number
        ];

        expect(s(good)).to.equal('131,22,11');

    });

    it('throws exceptions since we cant work with these as bigints', () => {
        const syntaxErrorInputs = [
            {},
            'a'
        ];

        syntaxErrorInputs.forEach(bad => {
            expect(nextPalindrome.bind(null, bad))
                .to.throw(SyntaxError);
        });

        const typeErrorInputs = [
            [],
            undefined
        ];

        typeErrorInputs.forEach(bad => {
            expect(nextPalindrome.bind(null, bad))
                .to.throw(TypeError);
        });

        const rangeErrorInputs = [
            -1,
            -2n,
            '-2',
            0,
            '0',
            '-0',
            null
        ];

        rangeErrorInputs.forEach(bad => {
            expect(nextPalindrome.bind(null, bad))
                .to.throw(RangeError);
        });

    });
});

describe('primes', () => {
    it('given start = 1, end = 25', () => {
        expect(primes(1, 25)).to.eql([ 2, 3, 5, 7, 11, 13, 17, 19, 23 ]);
    });

    it('given start = 7, end = 46', () => {
        expect(primes(7, 46)).to.eql([7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43]);
    });
});

describe('compress_regex', () => {
    it('given string with various chars, compressed when occurrence > 1', () => {
        expect(compress_regex('sdjjfejfhewwshhhd7')).to.eql('sdj2fejfhew2sh3d7');
    });
});
