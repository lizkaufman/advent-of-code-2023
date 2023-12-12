// https://adventofcode.com/2023/day/2
import { rawData } from "./data.js";
const targetPt1 = { red: 12, blue: 14, green: 13 };
function formatData(gameString) {
    const splitGameInfo = gameString.split(":");
    const draws = splitGameInfo[1].split(";").map((draw) => draw.trim());
    const countedColors = draws.map(countColors).reduce((acc, { red, blue, green }) => {
        if (red > acc.red) {
            acc = { ...acc, red };
        }
        if (blue > acc.blue) {
            acc = { ...acc, blue };
        }
        if (green > acc.green) {
            acc = { ...acc, green };
        }
        return acc;
    }, { red: 0, blue: 0, green: 0 });
    return { gameId: Number(splitGameInfo[0].split(" ")[1]), countedColors };
}
function countColors(draw) {
    let count = { red: 0, blue: 0, green: 0 };
    const colorStrings = draw.split(", ");
    colorStrings.forEach((str) => {
        const splitString = str.split(" ");
        if (splitString[1] === "red") {
            count = { ...count, red: Number(splitString[0]) };
        }
        if (splitString[1] === "blue") {
            count = { ...count, blue: Number(splitString[0]) };
        }
        if (splitString[1] === "green") {
            count = { ...count, green: Number(splitString[0]) };
        }
    });
    return count;
}
function checkGameAgainstTarget(countedColors, target) {
    return (countedColors.red <= target.red &&
        countedColors.blue <= target.blue &&
        countedColors.green <= target.green);
}
const testData = [
    "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
    "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
].map((row) => formatData(row));
const possibleGames = testData.reduce((acc, cur) => checkGameAgainstTarget(cur.countedColors, targetPt1)
    ? [...acc, cur.gameId]
    : acc, []);
console.log(testData, possibleGames);
const data = rawData.map((row) => formatData(row));
const solutionPt1 = data
    .reduce((acc, cur) => checkGameAgainstTarget(cur.countedColors, targetPt1)
    ? [...acc, cur.gameId]
    : acc, [])
    .reduce((acc, cur) => acc + cur, 0);
console.log({ solutionPt1 });
