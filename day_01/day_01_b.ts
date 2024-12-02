import * as fs from "fs/promises";
import * as path from "path";

const main = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, "./input.txt"), {
      encoding: "utf-8",
    });

    const leftList: number[] = [];
    const rightList: number[] = [];
    data
      .trim()
      .split("\n")
      .map((number) => {
        const [left, right] = number.split(/\s+/);
        leftList.push(+left);
        rightList.push(+right);
      });

    let similarity = 0;
    for (let i = 0; i < leftList.length; i++) {
      const occurrences = rightList.filter((num) => num === leftList[i]).length;
      similarity = similarity + occurrences * leftList[i];
    }

    console.log("SIMILARITY", similarity);
  } catch (error) {
    console.warn(`Execution error #%d`);
    console.error(error);
    return null;
  }
};

main();
