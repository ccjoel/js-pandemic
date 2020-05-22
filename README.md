# JS

Some javascript functions I played with during the pandemic.


Tested with mocha/chai on node -v 12.16.1. Not setting engines strictly in package.json.

## Question 1

Generate all prime numbers between two given numbers.
The two numbers are parameters that can be passed into the function. A prime number is one that is only
divisible by 1 and itself. Output the results into the results element below.

### Example

Primes between 1 and 10

```
2
3
5
7
```
    
    
## Question 2

A positive integer is called a palindrome if its representation in the decimal 
system is the same when read from left to right and from right to left.
For a given positive integer K of not more than 1000000 digits, write the 
value of the smallest palindrome larger than K to output.
Numbers are always displayed without leading zeros.

### Example

Number Given: `808`

Output: `818`

Number Given: `2133`

Output: `2222`
    
    
## Question 3

Write a simple string compression algorithm.

If a character `ch` occurs `n > 1` times in a row, then it will be represented by `<ch><n>`.

### Example

String Given: `aaaa`

Output: `a4`

String Given: `aaabaaaaccaaaaba`

Output: `a3ba4c2a4ba`

String Given: `abcd`

Output: `abcd`
