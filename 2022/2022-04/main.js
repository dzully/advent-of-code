const { readFileSync, promises: fsPromises } = require("fs");

const range = (from, to, inclusive = true) => {
  if (to < from) {
    [from, to] = [to, from];
  }

  const size = to - from + (inclusive ? 1 : 0);
  return Array(size)
    .fill()
    .map((_, i) => i + from);
};

const intersection = (...params) => {
  const counts = new Map();
  for (let arr of params) {
    const unique = [...new Set(arr)];

    for (let val of unique) {
      if (!counts.has(val)) {
        counts.set(val, 0);
      }
      const current_count = counts.get(val);
      counts.set(val, current_count + 1);
    }
  }

  const intersected = [...counts.entries()]
    .filter(([key, count]) => count === params.length)
    .map(([key]) => key);

  return intersected;
};

const readFile = ({ filename }) => {
  const contents = readFileSync(filename, "utf-8");
  const dataFromFile = contents
    .split(/\r?\n/)
    .map((v) => v.split(",").map((v) => v.split("-").map((v) => parseInt(v))));

  return dataFromFile;
};

const partOne = (filename) => {
  const containedPairs = readFile({ filename }).filter(([a, b]) => {
    const a_range = range(...a);
    const b_range = range(...b);
    const max_size = Math.max(a_range.length, b_range.length);

    const uniques = [...new Set(a_range.concat(b_range))];
    return uniques.length === max_size;
  });

  const totalScore = containedPairs.length;
  console.log({ "Part One:": totalScore });
};

const partTwo = (filename) => {
  const intersectingPairs = readFile({ filename }).filter(([a, b]) => {
    const a_range = range(...a);
    const b_range = range(...b);
    const overlapping = intersection(a_range, b_range);

    return overlapping.length > 0;
  });

  const totalScore = intersectingPairs.length;
  console.log({ "Part Two:": totalScore });
};

const fileName = "./input.txt";
partOne(fileName);
partTwo(fileName);
