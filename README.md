# JS

Some javascript functions I played with during the pandemic.


Tested with mocha/chai on node -v 12.16.1. Not setting engines strictly in package.json.

## Question 1

Generate all prime numbers between two given numbers.
The two numbers are parameters that can be passed into the function. A prime number is one that is only
divisible by 1 and itself. Output the results into the results element below.

### Example

Primes between 3 and 10

```
3
5
7
```
    
    
## Question 2

A positive integer is called a palindrome if its representation in the decimal 
system is the same when read from left to right and from right to left.
For a given positive integer of not more than 1000000 digits, write the 
value of the next smallest palindrome.

### Example

Number Given: `809`

Output: `818`

Number Given: `2134`

Output: `2222`
    
    
## Question 3

Simple string compression.

If a character occurs `n > 1` times in a row, then it will be represented by `<character><n>`.

### Example

String Given: `aabaaaaccaaaaba`

Output: `a2ba4c2a4ba`

String Given: `fghd`

Output: `fghd`
