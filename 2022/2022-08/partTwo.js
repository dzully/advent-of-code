const { input } = require("./input");
const { InfiniteGrid } = require("./infinite-grid");

const grid = new InfiniteGrid({
  load: input,
  parseAs: (cell) => {
    //Useobjectstogetreferentialequalityin`indexOf`calls
    return { value: parseInt(cell, 10) };
  },
});

function countTrees(slice, from) {
  //Wereturn`0`if`slice.length===0`
  let count = 0;

  for (let cell of slice) {
    //Alwaysincrement,youarelookingatthistree!
    count++;

    if (cell.value >= from.value) {
      //Thistreeistootall,youcan'tseeanythingpast.Breakfromloop
      break;
    }
  }

  return count;
}

let max_score = -1;

//NaiveO(n^2)way
for (let [cell_id, cell] of grid) {
  let [x, y] = InfiniteGrid.toCoords(cell_id);
  let row = grid.getRow(x, y, true);
  let col = grid.getCol(x, y, true);

  const rowIndex = row.indexOf(cell);
  const colIndex = col.indexOf(cell);

  let left = row.slice(0, rowIndex);
  let right = row.slice(rowIndex + 1);
  let top = col.slice(0, colIndex);
  let down = col.slice(colIndex + 1);

  //Iteratefrominsideout.`right`&`down`alreadyareorderedthisway
  left.reverse();
  top.reverse();

  let scenic_score =
    countTrees(left, cell) *
    countTrees(right, cell) *
    countTrees(top, cell) *
    countTrees(down, cell);

  max_score = Math.max(max_score, scenic_score);
}

console.log(max_score);
