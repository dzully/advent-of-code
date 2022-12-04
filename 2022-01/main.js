const { readFileSync, promises: fsPromises } = require("fs");

function calorieCount(filename) {
  const contents = readFileSync(filename, "utf-8");
  const dataFromFile = contents.split(/\r?\n/);

  let calories = [];
  let listOfCalories = [];
  const dataLength = dataFromFile.length;
  let currentId = 0;
  for (const elem of dataFromFile) {
    currentId += 1;
    if (elem !== "") {
      const convertToInt = Number(elem);
      calories = [...calories, convertToInt];
    } else {
      listOfCalories = [...listOfCalories, calories];
      calories = [];
    }

    if (dataLength === currentId) {
      listOfCalories = [...listOfCalories, calories];
    }
  }

  let listOfTotalCalories = [];
  for (const elem of listOfCalories) {
    let totalCalories = 0;
    for (const listOfCaloriesItem of elem) {
      totalCalories += listOfCaloriesItem;
    }

    listOfTotalCalories = [...listOfTotalCalories, totalCalories];
  }

  const findTopThree = listOfTotalCalories.sort(function (a, b) {
    return b - a;
  });
  const calculateTopThree =
    (findTopThree[0] || 0) + (findTopThree[1] || 0) + (findTopThree[2] || 0);

  console.log({ "Highest Calories:": Math.max(...listOfTotalCalories) });
  console.log({
    "Sum of top three calories:": calculateTopThree,
  });
}

let fileName = "./input.txt";
calorieCount(fileName);
