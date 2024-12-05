import { readFile } from "../../helpers/fileHelper";
import * as path from "path";

const SAMPLE_INPUT =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

const FILENAME = path.join(__dirname, "./input3.txt");
const INPUT = readFile(FILENAME);

// exact match of mul( )
// [0-9] numbers between 0 and 9
// {1,3} each number having 1 to 3 digits
const regex = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;
const matches = INPUT.match(regex);

const numberMatches = matches ? matches?.map((match) => {
    // match parenthesis exatcly
    // (\d+) groups digits
    const numberMatch = /\((\d+),(\d+)\)/.exec(match);
    return numberMatch ? parseInt(numberMatch[1], 10) * parseInt(numberMatch[2], 10) : 0;
}) : [];

const total =  numberMatches ? numberMatches.reduce((acc, current) => acc + current, 0) : null;
console.log(`Result ${total}`);
// special thanks to https://www.regular-expressions.info/reference.html
