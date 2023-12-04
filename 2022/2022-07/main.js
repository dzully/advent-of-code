const { input } = require("./input");
const { Filesystem, File } = require("./filesystem");

const drive = new Filesystem(input);
const dirs = [...drive].filter((v) => v.isDir);

let smallDirsSum = 0;
for (let item of dirs) {
  let size = item.size();
  if (size <= 100000) {
    smallDirsSum += size;
  }
}

let couldWork = new File("dummy", Number.MAX_VALUE);
for (let someDir of dirs) {
  const sizeWithout = drive.size(someDir);
  if (70000000 - sizeWithout >= 30000000) {
    if (someDir.size() < couldWork.size()) {
      couldWork = someDir;
    }
  }
}

console.log(smallDirsSum);
console.log(couldWork.size());
