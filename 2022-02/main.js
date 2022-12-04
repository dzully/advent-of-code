const { readFileSync, promises: fsPromises } = require("fs");

function partOne(filename) {
  const contents = readFileSync(filename, "utf-8");
  const dataFromFile = contents.split(/\r?\n/);

  let totalScore = 0;
  for (const data of dataFromFile) {
    const opponent = data.split(" ")[0];
    const yourTurn = data.split(" ").pop();
    if (opponent === "A") {
      if (yourTurn === "X") totalScore += 1 + 3;
      if (yourTurn === "Y") totalScore += 2 + 6;
      if (yourTurn === "Z") totalScore += 3 + 0;
    }
    if (opponent === "B") {
      if (yourTurn === "X") totalScore += 1 + 0;
      if (yourTurn === "Y") totalScore += 2 + 3;
      if (yourTurn === "Z") totalScore += 3 + 6;
    }
    if (opponent === "C") {
      if (yourTurn === "X") totalScore += 1 + 6;
      if (yourTurn === "Y") totalScore += 2 + 0;
      if (yourTurn === "Z") totalScore += 3 + 3;
    }
  }

  console.log({ "Part One:": totalScore });
}

function partTwo(filename) {
  const contents = readFileSync(filename, "utf-8");
  const dataFromFile = contents.split(/\r?\n/);

  let totalScore = 0;
  for (const data of dataFromFile) {
    const opponent = data.split(" ")[0];
    const yourTurn = data.split(" ").pop();
    if (opponent === "A") {
      if (yourTurn === "X") totalScore += 0 + 3;
      if (yourTurn === "Y") totalScore += 3 + 1;
      if (yourTurn === "Z") totalScore += 6 + 2;
    }
    if (opponent === "B") {
      if (yourTurn === "X") totalScore += 0 + 1;
      if (yourTurn === "Y") totalScore += 3 + 2;
      if (yourTurn === "Z") totalScore += 6 + 3;
    }
    if (opponent === "C") {
      if (yourTurn === "X") totalScore += 0 + 2;
      if (yourTurn === "Y") totalScore += 3 + 3;
      if (yourTurn === "Z") totalScore += 6 + 1;
    }
  }

  console.log({ "Part Two:": totalScore });
}

let fileName = "./input.txt";
partOne(fileName);
partTwo(fileName);
