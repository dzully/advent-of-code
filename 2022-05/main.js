const { readFileSync, promises: fsPromises } = require("fs");

const readFile = ({ fileName }) => {
  const contents = readFileSync(fileName, "utf-8");
  const dataFromFile = contents.split(/\r?\n/);

  return dataFromFile;
};

const indexingValue = (dataIndexes, param) => {
  return dataIndexes
    .map((value) => {
      const stack = param[value];
      return stack[stack.length - 1];
    })
    .join("");
};

const supplyStack = ({ fileName }) => {
  const containedPairs = readFile({ fileName });
  let textInLine = [];
  for (const arr of containedPairs) {
    if (arr !== "") {
      textInLine = [...textInLine, arr];
    }
    if (arr === "") {
      break;
    }
  }

  let hashData = {};
  let dataIndexes = [];
  for (const arr of textInLine) {
    let dataId = 0;
    for (const words of arr) {
      if (words !== "[" && words !== "]" && words !== " ") {
        if (isNaN(words)) {
          hashData = {
            ...hashData,
            [dataId]: hashData[dataId] ? [...hashData[dataId], words] : [words],
          };
        }
        if (!isNaN(words)) {
          dataIndexes = [...dataIndexes, words];
        }
      }
      dataId++;
    }
  }

  let combinedHash = {};
  let hashId = 1;
  for (const el in hashData) {
    const childElement = hashData[el].reverse();
    combinedHash = { ...combinedHash, [hashId]: childElement };
    hashId++;
  }

  let moveText = [];
  for (const arr of containedPairs) {
    moveText = [...moveText, arr];
    if (arr === "") {
      moveText = [];
    }
  }

  let moveStack = [];
  for (const arr of moveText) {
    const words = arr.split(" ");
    const quantity = Number(words[1]);
    const fromData = Number(words[3]);
    const toData = Number(words[5]);
    moveStack = [...moveStack, { quantity, fromData, toData }];
  }

  const cloneStack = JSON.parse(JSON.stringify(combinedHash));
  for (const move of moveStack) {
    for (let i = 0; i < move.quantity; i++) {
      const hashingPop = cloneStack[move.fromData].pop();
      cloneStack[move.toData].push(hashingPop);
    }
  }
  const partOneAnswer = indexingValue(dataIndexes, cloneStack);

  const cloneStackTwo = JSON.parse(JSON.stringify(combinedHash));
  for (const move of moveStack) {
    const crates = cloneStackTwo[move.fromData].splice(
      -move.quantity,
      move.quantity
    );
    cloneStackTwo[move.toData] = cloneStackTwo[move.toData].concat(crates);
  }
  const partTwoAnswer = indexingValue(dataIndexes, cloneStackTwo);

  console.log({ "Part One:": partOneAnswer });
  console.log({ "Part Two:": partTwoAnswer });
};

const fileName = "./input.txt";
supplyStack({ fileName });
