import { readFile } from "../../helpers/fileHelper";
import * as path from "path";

const SAMPLE_INPUT = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const FILENAME = path.join(__dirname, "./input2.txt");
const INPUT = readFile(FILENAME);

const reports = INPUT.split("\n").map((levels) =>
  levels.split(" ").map(Number)
);

function isAllIncreasing(inputArray: number[]): boolean {
  for (let i = 1; i < inputArray.length; i++) {
    if (inputArray[i] < inputArray[i - 1]) {
      return false;
    }
  }
  return true;
}

function isAllDecreasing(inputArray: number[]): boolean {
  for (let i = 1; i < inputArray.length; i++) {
    if (inputArray[i] > inputArray[i - 1]) {
      return false;
    }
  }
  return true;
}

function isGradual(inputArray: number[]) {
  return isAllIncreasing(inputArray) || isAllDecreasing(inputArray);
}

function isValidDistance(distance: number): boolean {
  return distance >= 1 && distance <= 3;
}

function isAdjascentDistanceValid(inputArray: number[]) {
  const consecutiveLevesDistances = inputArray.slice(1).map((item, index) => {
    return Math.abs(item - inputArray[index]);
  });

  const isDistanceValid = consecutiveLevesDistances.every((distance) =>
    isValidDistance(distance)
  );
  return isDistanceValid;
}

function isSafe(inputArray: number[]): boolean {
  const isSafe = isAdjascentDistanceValid(inputArray) && isGradual(inputArray);
  return isSafe;
}

let totalSafeReports: number = reports.reduce((total, level) => {
  return total + (isSafe(level) ? 1 : 0);
}, 0);

function validateAndAdjustArray(inputArray: number[]): boolean {
  if (isSafe(inputArray)) {
    return true;
  }

  for (let i = 0; i < inputArray.length; i++) {
    const newArray = [...inputArray.slice(0, i), ...inputArray.slice(i + 1)];
    if (isSafe(newArray)) {
      return true;
    }
  }
  return false;
}

let totalSafeReports2 = reports.reduce((total, level) => {
  const isValid = validateAndAdjustArray(level);
  return total + (isValid ? 1 : 0);
}, 0);

console.log(`Total of safe levels part one: ${totalSafeReports}`);
console.log(`Total of safe levels part two: ${totalSafeReports2}`);
