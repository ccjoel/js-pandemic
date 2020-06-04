/*
   concat both strings
   split('') -> array
   Set ()
   sort arrays
   join the array into a string
 */

function unique(arr) {
  return [...(new Set(arr))];
}

/*
   Take 2 strings s1 and s2 including only letters from a to z. Return a new sorted string, the longest possible, containing distinct letters,

   each taken only once - coming from s1 or s2.
   #Examples:
   a = "b", b = "ac" longest(a, b) -> "abc"
   a = "xyaabbbccccdefww" b = "xxxxyyyyabklmopq" longest(a, b) -> "abcdefklmopqwxy"

 */
function longest(a, b) {
  // potentially assert or validate [a-z] only

  const combinedArray = (a + b).split('');

  return unique(combinedArray)
    .sort()
    .join('');
}

function frequencies(word) {
  return word
    .split('')
    .reduce((acc, currValue) => {
      acc[currValue] = acc[currValue] || 0;
      acc[currValue]++;
      return acc;
    }, {});
}

function loop(acc, idx, coll) {
  const value = coll[idx];

  if (!value) {
    return acc;
  } else {
    acc[value] = acc[value] || 0;
    acc[value]++; // this is actually the reducer fn -> what we do with the acc value.
    return loop(acc, ++idx, coll);
  }
}

// ** Aha! moment- reduce is an abstraction of a common pattern that arises in recursion!
// Especially when working with collections-> you have an inner recursive fn that receives an empty accumulator,
// we have an index and can obtain the curr value,
// we have a references to the collection (in order to calc the value from index)
// and we have an end condition -> we traversed and got to the end of the collection
// this is similar in nature to what we would do with map and filter-> we use a base coll
// and generate a result in an accumulator, recursively. Returning it at the end.
// harcoded a simple test implementation here, where we loop,
// and hardcode the reducer function with the loop function,
// for simplicity purposes
function reduceArrRecursive(word) {
  const asColl = word.split('');

  const idx = 0,
        acc = {};
  return loop(acc, idx, asColl);
}

function orderWord(word) {
  return word
    .split('')
    .sort()
    .join('');
}

// may be slower, since we sort and then do a compare
// but in practice many times quicksoprt is nlogn and compare is n,
// so most of the time this is O(n) anyways.
const slowerAnagram = (word1, word2) => orderWord(word1) === orderWord(word2);


const shallowCompare = (obj1, obj2) => {

  const sameLength = Object.keys(obj1).length === Object.keys(obj2).length;

  return sameLength && Object
    .keys(obj1)
    .every(key =>
      obj2
        .hasOwnProperty(key) &&
                obj1[key] === obj2[key]
    );
}

// potentially faster than slowerAnagram, but depends on how we compare frequencies
// ~ O(n)
function isAnagram(word1, word2) {
  /* loop through a word at a time and
     store letter frequencies in an object
     compare that object/hash-map- which is bounded by 26 items (the alphabet)
     to the hash-map of word2
   */
  const f1 = frequencies(word1); // n
  const f2 = frequencies(word2); // n
  
  return shallowCompare(f1, f2); // 26
}

/*
* returns dict of arrays with column locations of words in the file
   * TODO
*/
function search(filename, arrWords) {
  /* create a hash-map from arrWords to arr, then push to these arrays whenever a word is found
   */
  return {};
}

//console.log(frequencies('helloo'));
// => { h: 1, e: 1, l: 2, o: 2 }

/* console.log(isAnagram('hello', 'olleh')); */
/* => true */

/* console.log(isAnagram('hello', 'solleh')); */
// => false

//console.log(slowerAnagram('hello', 'olleh'));
// => true

/* console.log(reduceArrRecursive('hello')); */
// => { h: 1, e: 1, l: 2, o: 1 }
