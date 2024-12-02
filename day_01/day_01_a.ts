import * as fs from "fs/promises";
import * as path from "path";

const main = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, "./input.txt"), {
      encoding: "utf-8",
    });

    data
      .trim()
      .split("\n")
      .map((number) => {
        const [left, right] = number.split(/\s+/);
        leftList.push(+left);
        rightList.push(+right);
      });
    const leftList: number[] = [];
    const rightList: number[] = [];

    leftList.sort();
    rightList.sort();

    let sum = 0;
    for (let i = 0; i < leftList.length; i++) {
      sum += Math.abs(leftList[i] - rightList[i]);
    }
    console.log(sum);
  } catch (error) {
    console.error(`Execution error #%d`, error);
    return null;
  }
};

main();
