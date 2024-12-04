import * as fs from "fs/promises";
import * as path from "path";

const regex = new RegExp(/mul\([0-9]{1,3},[0-9]{1,3}\)/g);
const main = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, "./input.txt"), {
      encoding: "utf-8",
    });

    let total = 0;
    if (data) {
      data.match(regex)?.forEach(
        (op) => (
          (total += op
            .replace("mul(", "")
            .replace(")", "")
            .split(",")
            .map(Number)
            .reduce((a, b) => a * b)),
          0
        )
      );

      console.log("total", total);
      return total;
    }
  } catch (error) {
    console.warn("Exception occured");
    console.error(error);
    process.exit(0);
  }
};
main();
