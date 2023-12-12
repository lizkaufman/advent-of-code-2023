// https://adventofcode.com/2023/day/1
// PART ONE:
import { data } from "./data.js";
function calculateCalibrationValue(line) {
    const digits = typeof line === "number"
        ? line.toString().split("")
        : line.split("").filter((char) => /\d/.test(char));
    if (digits.length === 1) {
        return Number(`${digits[0]}${digits[0]}`);
    }
    return Number(`${digits[0]}${digits[digits.length - 1]}`);
}
const calibrationValuesPt1 = data.map((line) => calculateCalibrationValue(line));
const solutionPt1 = calibrationValuesPt1.reduce((acc, cur) => acc + cur, 0);
// PART TWO:
const spelledOutDigits = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};
function calculateCalibrationValuePt2(line) {
    if (typeof line === "number") {
        return calculateCalibrationValue(line);
    }
    const includedSpelledNumbers = Object.keys(spelledOutDigits).reduce((acc, cur) => {
        return line.includes(cur) ? [...acc, cur] : acc;
    }, []);
    if (!includedSpelledNumbers.length) {
        return calculateCalibrationValue(line);
    }
    const digits = line
        .split("")
        .filter((char) => /\d/.test(char))
        .map((digit) => digit.toString());
    const orderedNumbers = [...includedSpelledNumbers, ...digits]
        .map((str) => {
        const index = line.indexOf(str);
        return { string: str, index };
    })
        .sort((a, b) => a.index - b.index)
        .map(({ string }) => {
        return isNaN(Number(string))
            ? spelledOutDigits[string]
            : Number(string);
    });
    if (orderedNumbers.length === 1) {
        return Number(`${orderedNumbers[0]}${orderedNumbers[0]}`);
    }
    return Number(`${orderedNumbers[0]}${orderedNumbers[orderedNumbers.length - 1]}`);
}
const testCases = [
    2389,
    "dkjfow2dksjfao4kldjfH8",
    "two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen",
];
for (let i = 0; i < testCases.length; i++) {
    console.log({
        case: testCases[i],
        value: calculateCalibrationValuePt2(testCases[i]),
    });
}
const calibrationValuesPt2 = data.map((line) => calculateCalibrationValuePt2(line));
const solutionPt2 = calibrationValuesPt2.reduce((acc, cur) => acc + cur, 0);
console.log({ solutionPt1, solutionPt2 });
