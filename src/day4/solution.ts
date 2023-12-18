// https://adventofcode.com/2023/day/4

import { data } from "./data.js";

// PART 1

function calculatePoints(card: string) {
  const numbers = card.split(":")[1].split("|");
  const winningNumbers = numbers[0].split(" ").filter((num) => num !== "");
  const actualNumbers = numbers[1].split(" ").filter((num) => num !== "");

  let count = 0;
  let score = 0;

  winningNumbers.forEach((num) => {
    if (actualNumbers.includes(num)) {
      console.log(num);
      count++;
      score = count === 1 ? 1 : score * 2;
    }
  });

  return score;
}

const testData = [
  "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
  "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
  "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
  "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
  "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
  "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
];

testData.forEach((string) => {
  calculatePoints(string);
});

const testDataSolutionPt1 = testData.reduce(
  (acc, cur) => acc + calculatePoints(cur),
  0
);

const solutionPt1 = data.reduce((acc, cur) => acc + calculatePoints(cur), 0);

console.log({ testDataSolutionPt1, solutionPt1 });

// PART 2
