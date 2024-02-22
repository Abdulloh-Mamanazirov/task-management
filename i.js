function createPhoneNumber(numbers) {
  let first = `(${numbers.slice(0, 3).join("")}) `;
  let second = numbers.slice(3, 6).join("");
  let third = numbers.slice(6, 9).join("");

  return `${first} ${second}-${third}`;
}

// console.log(createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));

const rps = (p1, p2) => {
  let scissors = "scissors";
  let paper = "paper";
  let rock = "rock";
  if (p1 === p2) return "Draw!";
  if (p1 === scissors && p2 === paper) return "Player 1 won!";
  if (p1 === paper && p2 === scissors) return "Player 2 won!";
  if (p1 === rock && p2 === scissors) return "Player 1 won!";
  if (p1 === scissors && p2 === rock) return "Player 2 won!";
  if (p1 === rock && p2 === paper) return "Player 2 won!";
  if (p1 === paper && p2 === rock) return "Player 1 won!";
};

// console.log(rps("paper", "scissors"));

function solve(s) {
  let u = 0,
    l = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i].charCodeAt() >= 97 && s[i].charCodeAt() <= 122) l++;
    else u++;
  }
  if (u > l) return s.toUpperCase();
  else return s.toLowerCase();
}

// console.log(solve("cODe"));

function isTriangle(a, b, c) {
  if (a + b > c && a + c > b && b + c > a) return true;
  return false;
}

// console.log(isTriangle(7, 2, 2));

function getMiddle(text) {
  const boshLetter = Math.floor(text.length / 2);
  let result;
  if (text.length % 2 === 0) {
    result = text[boshLetter - 1] + text[boshLetter];
  } else {
    result = text[boshLetter];
  }

  return result;
}

// console.log(getMiddle("ibrohim"));

function toCamelCase(str) {
  function startsWithLowerCase(word) {
    if (word[0].charCodeAt() >= 97 && word[0].charCodeAt() <= 122) return true;
    else return false;
  }

  let s = str.split("_");

  for (let i = 0; i < s.length; i++) {
    if (s[i].includes("-")) s[i] = s[i].split("-");
  }
  s = s
    .flat(Infinity)
    .reduce((s, c) => s + (c.charAt(0).toUpperCase() + c.slice(1)));

  return s;
}

// console.log(toCamelCase("the-stealth-warrior"));

function consecutive(arr, a, b) {
  return (
    arr.join(",").includes([a, b].join(",")) ||
    arr.join(",").includes([b, a].join(","))
  );
}

// console.log(consecutive([1, -3, 5, 7], -3, 1));

function getCount(str) {
  const vowels = ["a", "e", "i", "o", "u"];
  let count = 0;
  for (i = 0; i < str.length; i++) {
    for (v = 0; v < vowels.length; v++) {
      str[i] === vowels[v] && count++;
    }
  }
  return count;
}

// console.log(getCount("abracadabra"));

function persistence(num) {
  let number = String(num);
  if (number.length === 1) return 0;
  do {
    number = String(number.split("").reduce((a, b) => a * b));
    if (number.length === 1) return Number(number);
  } while (number.length !== 1);
}

console.log(persistence(25));
