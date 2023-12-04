const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .flatMap((v) => {
    let [op, n] = v.split(" ");
    if (op === "addx") {
      n = parseInt(n, 10);

      if (Number.isNaN(n)) {
        throw v;
      }

      /**
       * Simplify cycles logic by inserting `noop` instructions
       * before every `addx` call to account for fact that
       * `addx` takes two cycles.
       */
      return [{ op: "noop" }, { op: "addx", n }];
    } else {
      return [{ op: "noop" }];
    }
  });

module.exports = {
  input,
};

const partOne = () => {
  let register = 1;

  const signal_strengths = new Map();

  for (let cycle = 1; cycle <= input.length; cycle++) {
    const cycle_index = cycle - 1;
    const { op, n } = input[cycle_index];

    // Middle of instruction executing, store signal strength
    signal_strengths.set(cycle, cycle * register);

    if (op === "addx") {
      register += n;
    }
  }

  const sum =
    signal_strengths.get(20) +
    signal_strengths.get(60) +
    signal_strengths.get(100) +
    signal_strengths.get(140) +
    signal_strengths.get(180) +
    signal_strengths.get(220);

  return sum;
};

const partTwo = () => {
  let register = 1;

  // You count the pixels on the CRT: 40 wide and 6 high.
  const frame = Array(6)
    .fill()
    .map(() => Array(40).fill(" "));

  for (let cycle = 1; cycle <= input.length; cycle++) {
    const cycle_index = cycle - 1;
    const { op, n } = input[cycle_index];

    // Middle of instruction executing, record our pixel
    const frame_row = Math.floor(cycle_index / 40);
    const position = cycle_index % 40;
    const in_sprite = position >= register - 1 && position <= register + 1;
    // Use different chars to make reading the ASCII easier
    const char = in_sprite ? "█" : " ";
    frame[frame_row][position] = char;

    if (op === "addx") {
      register += n;
    }
  }

  return frame.map((r) => r.join("")).join("\n");
};

console.log({ partOne: partOne() });
console.log({ partTwo: partTwo() });
