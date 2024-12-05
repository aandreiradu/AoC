import * as fs from "fs/promises";
import * as path from "path";

let out = 0;
const main = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, "./input.txt"), {
      encoding: "utf-8",
    });

    if (!data || !data.length) return;

    const rows = data.trim().split("\n");
    const matrix = rows.map((row) => row.trim().split(""));
    const directions = [
      [1, 1],
      [1, 0],
      [0, 1],
      [-1, 0],
      [-1, -1],
      [0, -1],
      [-1, 1],
      [1, -1],
    ];

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] === "X") {
          /* Get the close neighbours and recall */
          directions.forEach((dir) => helper(matrix, i, j, "M", dir));
        }
      }
    }

    console.log(out);
  } catch (error) {
    console.warn("Exception occurred");
    console.error(error);

    process.exit(1);
  }
};

function helper(
  matrix: Array<string[]>,
  i: number,
  j: number,
  c: string,
  dir: number[]
) {
  const newI = i + dir[0];
  const newJ = j + dir[1];

  /* We're still in the matrix */
  if (newI > -1 && newJ > -1 && newI < matrix.length && newJ < matrix.length) {
    if (matrix[newI][newJ] === c) {
      if (c === "S") {
        out++;
        return;
      } else {
        const nextChar = c === "M" ? "A" : "S";
        /* Letter found, recaall  */
        helper(matrix, newI, newJ, nextChar, dir);
      }
    }
  }
}

main();
