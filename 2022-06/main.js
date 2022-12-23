const { readFileSync } = require("fs");

const readFile = ({ fileName }) => {
  const contents = readFileSync(fileName, "utf-8");
  const dataFromFile = contents.toString().trim().split("");

  return dataFromFile;
};

const tuningTroubleFunction = ({ fileName, count }) => {
  const containedPairs = readFile({ fileName });

  const window = [];
  for (let i = 0; i < containedPairs.length; i++) {
    window.push(containedPairs[i]);
    if (window.length === count) {
      const unique_chars = new Set(window);
      if (unique_chars.size === count) {
        return i + 1;
      }
      window.shift();
    }
  }

  return -1;
};

const fileName = "./input.txt";
const tuningTrouble = tuningTroubleFunction({ fileName, count: 4 });
const tuningTroublePartTwo = tuningTroubleFunction({ fileName, count: 14 });
console.log({ tuningTrouble });
console.log({ tuningTroublePartTwo });
