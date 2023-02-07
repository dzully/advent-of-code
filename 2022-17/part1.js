const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf8");

const rocks = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
];

const jets = input.split("").map((x) => (x === "<" ? -1 : 1));

const arenaWidth = 7;
let arena = [];

let restingRocks = 0;
let jIndex = 0;
while (restingRocks < 2022) {
  const rock = createRock(arena, rocks[restingRocks % rocks.length]);
  let atRest = false;
  while (!atRest) {
    const blow = jets[jIndex % jets.length];

    if (
      rock.every(
        ([x, y]) => arena[y][x + blow] !== undefined && !arena[y][x + blow]
      )
    ) {
      move(rock, blow, 0);
    }
    if (rock.every(([x, y]) => y - 1 > -1 && !arena[y - 1][x])) {
      move(rock, 0, -1);
    } else {
      atRest = true;
    }

    jIndex += 1;
  }

  for (const [x, y] of rock) {
    arena[y][x] = true;
  }

  restingRocks++;
}

const result = arena.findIndex((row) => row.every((x) => !x));

function move(rock, xDir, yDir) {
  for (const piece of rock) {
    piece[0] += xDir;
    piece[1] += yDir;
  }
}

function createRock(arena, rockShape) {
  let peak = arena.findIndex((row) => row.every((x) => !x));
  if (peak !== -1) {
    peak--;
  }

  const rockHeight = Math.max(...rockShape.map(([, y]) => y)) + 1;
  const bornHeight = peak + rockHeight + 3;
  const rowsToAdd = bornHeight - arena.length + 1;
  for (let i = 0; i < rowsToAdd; i++) {
    arena.push(Array(arenaWidth).fill(false));
  }

  return rockShape.map(([x, y]) => [x + 2, bornHeight - y]);
}

console.log({ partOne: result });
