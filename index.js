const isNodeEnv = typeof module !== 'undefined' && module.exports;

// ============================== SOME HELPERS =================================

function reverseString(str) {
    return str
        .split('')
        .reverse('')
        .join('');
}

/**
 * Given a positive integer, returns if it is a palindrome.
 **/
function isPalindrome(num) {
    const asString = num.toString();
    const reversed = reverseString(asString);
    return asString === reversed;
}

/**
 * Returns a string without its last character.
 **/
function shaveLast(str) {
    return str.substring(0, str.length - 1);
}

/**
 * Returns a string without its first character.
 **/
function shaveFirst(str) {
    return str.substring(1);
}

const _even = num => num % 2 === 0;
const _odd = num => !_even(num);

// ================================= MAIN fns ==================================


/**
 * See https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
 **/
function primes(start, end) {
    const n = end + 1;

    const sieve = new Array(n).fill(true);

    for (let x = 2; x <= Math.sqrt(n); x++) {
        if (sieve[x]) {
            for (let y = Math.pow(x, 2); y <= n; y += x) {
                sieve[y] = false;
            }
        }
    }

    return sieve.reduce((acc, isPrime, index) => {
        return (isPrime && index >= start && index > 1) ?
            [...acc, index] :
            acc;
    }, []);

}

/**
 * _nextPalindrome: given a numeric string, returns the next number which is a palindrome, up to 1,000,000 digits.
 * @param {string} asString - a number as string which will be used as base for next palindrome number.
 *
 * Nomenclature:
 * A number can have odd or even length.
 *
 * For a given number 123456 of even length:
 *   left | middle | right = '123' | '' | '456'
 * given a number of odd length 1234567:
 *   left | middle | right = '123' | '4' | '567'
 *
 * In a simplified even-length example with 123267:
 * palindrome basis = 123. Used to reverse and calculate the rest of the palindrome.
 * then a proper rightReplacement = 321 for use on the rest of the palindrome.
 *
 * @returns {bigint}
 **/
function _nextPalindrome(asString) {
    const isOddLength = _odd(asString.length);
    const pivotIndex = Math.floor(asString.length / 2);

    // Given that some strings have odd length, add logic for the presence of a middle number, or none (for even length)
    const left = asString.substring(0, pivotIndex);
    const middle = isOddLength ? asString[pivotIndex] : '';
    const right = asString.substring(pivotIndex + (isOddLength ? 1 : 0));

    let rightReplacement = reverseString(left); // Reverse left without middle

    let basis = left + middle;

    // When original right value is greater than replacement
    //   then increase the basis of the palindrome and recalculate replacement
    if (right >= rightReplacement) {
        const newBasis = (BigInt(basis) + 1n).toString();
        const didDigitsIncrease = newBasis.length > basis.length;

        basis = newBasis;
        rightReplacement = reverseString(basis);

        if (didDigitsIncrease) { // For example, basis went from 99 to 100 (now 3 digits)
            basis = shaveLast(basis);
        }
        if (isOddLength) { // Remove middle from right replacement
            rightReplacement = shaveFirst(rightReplacement);
        }
    }

    return BigInt(basis + rightReplacement);
}

function nextPalindrome(num) {
    if (typeof num === 'number' && num > Number.MAX_SAFE_INTEGER) {
        throw RangeError('nextPalindrome: when using numbers, please ensure to provide a positive safe js integer.');
    }
    if (Array.isArray(num)) {
        throw TypeError('nextPalindrome: expected a numeric string, number, or bigint, but received an array.');
    }
    if (num <= 0) {
        throw RangeError('nextPalindrome: please provide a positive (> 0) numberic (or equivalent) value.');
    }

    return _nextPalindrome(num.toString());
}


/**
 * Given that lookbehind (store and compare to previous char) was more involved,
 * implement by compressing and looking ahead.
 **/
function compress_lookahead(string1) {

    let accumulator = '';

    for (
        let index = 0,
            repeatCounter = 0;

        index < string1.length;
        index++
    ) {
        repeatCounter++;
        const current = string1[index];
        const next = string1[index + 1];

        if (current !== next) {
            const displayCount = repeatCounter === 1 ? '' : repeatCounter;
            accumulator += current + displayCount;
            repeatCounter = 0;
        }
    }

    return accumulator;
}

// Full regex solution, lone capture group is a character
const compress_regex = string1 =>
      string1.replace(
          /(.)\1+/g,
          (fullMatch, character) => character + fullMatch.length
      );

const compress_algorithms = {
    regex: compress_regex,
    lookahead: compress_lookahead
};


if (isNodeEnv) {
    module.exports = {
        primes,
        nextPalindrome,
        compress_regex
    };
}
