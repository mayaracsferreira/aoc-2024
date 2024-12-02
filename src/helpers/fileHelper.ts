import * as fs from "fs";

export function readFile(filename: string) {
  return fs.readFileSync(filename, "utf-8");
}
