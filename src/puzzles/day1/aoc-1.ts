import { readFile } from "../../helpers/fileHelper";
import * as path from "path";

const FILENAME = path.join(__dirname, "./input.txt");
const SAMPLE_INPUT = `3   4
4   3
2   5
1   3
3   9
3   3`;

function splitStringColumns(input: string): number[][] {
  let leftArray: number[] = [];
  let rightArray: number[] = [];

  input.split("\n").map((line) => {
    const pair = line.split("   ");
    leftArray.push(+pair[0]);
    rightArray.push(+pair[1]);
  });
  return [leftArray, rightArray]
}

// Read file
const pairArrays = readFile(FILENAME);

// Split arrays
const [leftArray, rightArray] = splitStringColumns(pairArrays);

// Sort arrays ascending
leftArray.sort();
rightArray.sort();

let distances: number[] = [];
// Subtract pairs
leftArray.forEach((item, index) => {
  distances.push(Math.abs(item - rightArray[index]));
});

// Sum distances
const result = distances.reduce((acc, current) => acc + current, 0);
console.log(`result ${result}`);
