const random = require('random')
const fs = require('fs');

const E = {
  Wall: 0,
  Empty: 1,
  Filled: 2,
}

const getRandomInt = (min, max) => {
  if (min > max) {
    return max >= 0 ? max : min;
  }
  return random.int(min, max);
};

const getColumn = (data, columnIndex) => data.map((row) => row[columnIndex]);
const setColumn = (data, columnIndex, column) => {
  column.forEach((cell, index) => {
    data[index][columnIndex] = cell;
  });
  return data;
};

const copyMatrix = (data) => {
  return data.map((row) => [...row])
}

const checkValid = (grid) => {
  let isValid = true;
  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      if (grid[i][j] === E.Empty) {
        isValid = false;
        break;
      }
    }
  }
  return isValid;
}

const write = (filename, data) => {
  fs.writeFileSync(filename, data, 'utf8');
}

module.exports = {
  getRandomInt, getColumn, setColumn,copyMatrix, checkValid, write, E
}
