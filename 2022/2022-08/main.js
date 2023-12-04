const fs = require("fs");

function countVisibleTrees(heights) {
  // Initialize count of visible trees to the number of trees on the edges
  let count = Math.sqrt(heights.length);

  // Check visibility of trees in each row
  for (let i = 0; i < heights.length; i++) {
    let row = Math.floor(i / count);
    let col = i % count;
    let isVisible = true;
    for (let j = 0; j < col; j++) {
      if (heights[row * count + j] > heights[i]) {
        isVisible = false;
        break;
      }
    }
    for (let j = col + 1; j < count; j++) {
      if (heights[row * count + j] > heights[i]) {
        isVisible = false;
        break;
      }
    }
    if (isVisible) {
      count++;
    }
  }

  // Check visibility of trees in each column
  for (let i = 0; i < heights.length; i++) {
    let row = Math.floor(i / count);
    let col = i % count;
    let isVisible = true;
    for (let j = 0; j < row; j++) {
      if (heights[j * count + col] > heights[i]) {
        isVisible = false;
        break;
      }
    }
    for (let j = row + 1; j < count; j++) {
      if (heights[j * count + col] > heights[i]) {
        isVisible = false;
        break;
      }
    }
    if (isVisible) {
      count++;
    }
  }

  return count;
}

// Read input from file
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(countVisibleTrees(data));
});
