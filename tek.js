/* Write a javascript program that takes a list of domain names
   and classify each of them in categories:
   1) If the domain ends with .com it should be classified as COMPANY
   2) If the domain ends with .edu it should be classified as UNIVERSITY
   3) If the domain ends with .org it should be classified as ORGANIZATION
   4) If the domain contains the word ‘money’ it should be classified
   as FINANCIAL
   5) If the second-level-domain (SLD) is any longer than 10 letters
   (excluding the top-level-domain (TLD), prefixes,
   or subdomains like .com, www, or app.*), it should be classified
   as LONG

   6) If a domain goes unclassified, classify it as UNKNOWN
   PS: A given domain can be classified in more than one category

   Output of the program should be one Domain name on each line along
   with the Categories(s) that it is classified with. Here are the domains
   to test with:

   www.sparksgrove.com
   ftp.harvard.edu
   app.planes.io
   code.org
   www.northhighland.com
   www.homebrew.dev
   scheduler.now
   moneycompany.com
 */


const matchers = [
  /\.(com)$/,
  /\.(edu)$/,
  /\.(org$)/,
  /.*(money).+\.[a-z]{3}/
];

const mappings = {
  'com': 'COMPANY',
  'edu': 'UNIVERSITY',
  'org': 'ORGANIZATION',
  'money': 'FINANCIAL'
};

const captureGroupIndex = 1;

function matchesTLD(str) {
  return matchers.reduce((acc, m) => {
    const match = str.match(m);

    if (match) {
      const category = mappings[match[captureGroupIndex]];
      acc.push(category);
    }

    return acc;
  }, []);
}

const sample = [
  'www.sparksgrove.com',
  'ftp.harvard.edu',
  'app.planes.io',
  'code.org',
  'www.northhighland.com',
  'www.homebrew.dev',
  'scheduler.now',
  'moneycompany.com'
];

const answer = sample.reduce((acc, currValue) => {

  const classifications = matchesTLD(currValue);

  const lengthMatch = currValue.match(/(?:.*\.)*(.*)\..+$/);
  if (lengthMatch && lengthMatch[captureGroupIndex].length > 10) {
    classifications.push('LONG');
  }

  if (!classifications.length) {
    classifications.push('UNKNOWN');
  }

  acc[currValue] = classifications.join(', ');

  return acc;

}, {});

console.log(answer);
