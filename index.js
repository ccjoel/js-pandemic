
// ========================= Conventions ===============================

/**
 * - Use NOTE for meta on solution, mostly over explains for interview purposes.
 *   Example: Declare with `const` if variable does not change, UPPERCASE_CONVENTION if real constant (eg PI)
 * - Use camelcase for fn and variable names
 * - Use snake_case for solution variations
 * - Use Startcase for original question fn names (eg Q1), which are "public" fns
 **/

// =========================== Solutions ===============================

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

function Q1(number1, number2) {
    let returnValue = primes(number1, number2);
    return returnValue.join(' ');
}

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
 * nextPalindrome: given a number, returns the next number which is a palindrome, up to 1,000,000 digits.
 * @param {BigInt|string} num - a number which will be used as base for next palindrome number.  * @returns {BigInt}
 **/
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

/**
 *
 * ...   |string|number
 * If it is a number,
 * it must be less than Number.MAX_SAFE_INTEGER...
 **/
function nextPalindrome(num) {
    // TODO validate, and call _nextPalindrome
}


/**
 * Given a positive integer K of max 1,000,000 digits
 * return the next palindrome number, if it exists;
 * 1,000,000 digits is larger than javascript's maximum JS number.
 * Returns null if, given a valid input, cannot find the next palindrome within
 * javascript's integer constraints.
 **/
function Q2(K) {
    if (!Number.isInteger(K)) {
        throw new TypeError(`Q2 expects an integer. Received "${K}" of type "${typeof K}".`);
    }
    if (K < 0 || K > Number.MAX_SAFE_INTEGER) {
        throw new RangeError(`Q2 expects a positive integer up to ${Number.MAX_SAFE_INTEGER}.`);
    }

    // Can still go over safest integer while searching
    for (let counter = K + 1; counter < Number.MAX_SAFE_INTEGER; counter++) {
        if (isPalindrome(counter)) {
            return counter;
        }
    }

    return null;
}

/**
 * Scans a string for the length of the character repeating itself until
 * a different character is found.
 * That is,
 * Given 'a', and 'aaab', returns 3.
 * Given 'a', and 'abb', returns 1.
 * Given 'a', and 'b', returns 0.
 * @returns {number}
 **/
function scanRepeated(character, str) {
    const re = new RegExp(`${character}+`);
    const result = str.match(re);

    return result ? result[0].length : 0; // can use lodash/get
}

// Compress lookahead, with partial regex
// snake_case convention for variations of same fn
function compress_scan(string1) {
    let accumulator = '';
    let index = 0;

    while (index < string1.length) {
        const currentChar = string1[index];
        const occurrences = scanRepeated(currentChar, string1.substring(index));
        const displayCount = occurrences === 1 ? '' : occurrences;

        accumulator += currentChar + displayCount;
        index += occurrences;
    }

    return accumulator;
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
// NOTE Full regex solution, lone capture group is a character
const compress_regex = string1 =>
      string1.replace(
          /(.)\1+/g,
          (fullMatch, character) => character + fullMatch.length
      );

const compress_algorithms = {
    mixed: compress_scan,
    regex: compress_regex,
    lookahead: compress_lookahead
};

/**
 * Compresses a string.
 * eg: "bdddda" => "bd4a"
 **/
function Q3(string1, algo='lookahead') {
    if (typeof string1 !== 'string') {
        throw new TypeError(`Q3: Expected argument for "string1" to be a string, received: ${string1}`);
    }
    const compress = compress_algorithms[algo];

    if (!compress) {
        const available = Object.getOwnPropertyNames(compress_algorithms).join(', ');
        throw new RangeError(`Q3: Expected algo algorithm to be one of ${available}, but got ${algo}.`);
    }

    return compress[algo](string1);
    // return compress_lookahead(string1);
}
