import * as fs from "fs/promises";
import * as path from "path";

const minDiffer = 1,
  maxDiffer = 3;

const main = async () => {
  const data = await fs.readFile(path.join(__dirname, "./input.txt"), {
    encoding: "utf-8",
  });

  let okReports = 0;
  const matrix = data
    .trim()
    .split("\n")
    .map((n) => n.trim().split(" "));

  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    let isSafe = true;
    let onlyAsc = true;
    let onlyDesc = true;

    for (let j = 0; j < row.length - 1; j++) {
      const level = +row[j + 1] - +row[j];
      if (level > 0) {
        onlyDesc = false;
      }

      if (level < 0) {
        onlyAsc = false;
      }

      if (!(Math.abs(level) >= minDiffer && Math.abs(level) <= maxDiffer)) {
        isSafe = false;
        break;
      }
    }

    if (isSafe && (onlyAsc || onlyDesc)) {
      okReports++;
    }
  }

  console.log(okReports);
};

main();
