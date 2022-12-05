const { readFileSync, promises: fsPromises } = require("fs");

const a_code = "a".charCodeAt(0);
const A_code = "A".charCodeAt(0);

const intersection = (...params) => {
  const counts = {};
  for (let arr of params) {
    const unique = [...new Set(arr)];

    for (let val of unique) {
      if (!counts[val]) {
        counts[val] = 0;
      }
      counts[val]++;
    }
  }

  const intersected = Object.entries(counts)
    .filter(([char, count]) => count === params.length)
    .map(([char]) => char);

  return intersected;
};

const chunk = (arr, num) => {
  const chunks = [];
  const end = Math.ceil(arr.length / num);

  for (let i = 0; i < end; i++) {
    const from = i * num;
    const to = (i + 1) * num;
    chunks.push(arr.slice(from, to));
  }

  return chunks;
};

const validateValue = ({ same }) => {
  if (/[a-z]/.test(same)) {
    return same.charCodeAt(0) - a_code + 1;
  } else {
    return same.charCodeAt(0) - A_code + 27;
  }
};

const partOne = (filename) => {
  const contents = readFileSync(filename, "utf-8");
  const dataFromFile = contents.split(/\r?\n/);

  const charCodes = dataFromFile.map((line) => {
    const left = line.slice(0, line.length / 2);
    const right = line.slice(line.length / 2);
    const [same] = intersection(left, right);
    return validateValue({ same });
  });

  const totalScore = charCodes.reduce((a, b) => a + b);
  console.log({ "Part One:": totalScore });
};

const partTwo = (filename) => {
  const contents = readFileSync(filename, "utf-8");
  const dataFromFile = contents.split(/\r?\n/);

  const chunks = chunk(
    dataFromFile.map((v) => v.split("")),
    3
  );

  const charCodes = chunks.map((chunk) => {
    const [same] = intersection(...chunk);
    return validateValue({ same });
  });

  const totalScore = charCodes.reduce((a, b) => a + b);
  console.log({ "Part Two:": totalScore });
};

let fileName = "./input.txt";
partOne(fileName);
partTwo(fileName);
