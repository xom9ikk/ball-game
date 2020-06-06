const fs = require('fs');
const random = require('random')

const E = {
  Wall: 0,
  Empty: 1,
  Filled: 2,
}

const result = [];

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

const tryGrid = (initialX, initialY, initialGrid, tries) => {
  let grid = copyMatrix(initialGrid)
  let y = initialY;
  let x = initialX;
  let moves = 0;
  for (let i = 0; i < tries; i += 1) {
    moves += 1;
    const direction = getRandomInt(0, 3);
    switch (direction) {
      case 0: { // up
        const column = getColumn(grid, x);
        let count = y;
        while ((column[count] === E.Empty || column[count] === E.Filled)
          ) {
          column[count] = E.Filled;
          count -= 1;
        }
        grid = setColumn([...grid], x, column);
        y = count + 1;
        break;
      }
      case 1: { // down
        const column = getColumn(grid, x);
        let count = y;
        while ((column[count] === E.Empty || column[count] === E.Filled)
          ) {
          column[count] = E.Filled;
          count += 1;
        }
        grid = setColumn([...grid], x, column);
        y = count - 1;
        break;
      }
      case 2: { // left
        const row = grid[y];
        let count = x;
        while ((row[count] === E.Empty || row[count] === E.Filled)
          ) {
          row[count] = E.Filled;
          count -= 1;
        }
        // if (count + 1 < columns - 1) {
        const newGrid = [...grid];
        newGrid[y] = row;
        grid = newGrid;
        x = count + 1;
        // }
        break;
      }
      case 3: { // right
        const row = grid[y];
        let count = x;
        while ((row[count] === E.Empty || row[count] === E.Filled)
          ) {
          row[count] = E.Filled;
          count += 1;
        }
        const newGrid = [...grid];
        newGrid[y] = row;
        grid = newGrid;
        x = count - 1;
        break;
      }
      default:
        break;
    }
    if (checkValid(grid)) {
      break;
    }
  }
  return {
    isValid: checkValid(grid),
    moves,
  };
};

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

const generate = () => {
  const minSize = 10;
  const maxSize = 20;
  const rows = getRandomInt(minSize, maxSize);
  const columns = getRandomInt(minSize, maxSize);
  const initialGrid = [];
  for (let i = 0; i < rows; i += 1) {
    initialGrid[i] = new Array(columns).fill(E.Wall);
  }
  const maxSlide = getRandomInt(50, 80);
  let x = getRandomInt(0, rows - 1); // select row
  let y = getRandomInt(0, columns - 1); // select col
  const initialY = x;
  const initialX = y;
  initialGrid[x][y] = E.Empty;

  for (let i = 0; i < maxSlide; i += 1) {
    const direction = getRandomInt(0, 3);
    switch (direction) {
      case 0: { // up
        const newX = getRandomInt(0, x - 1);
        if (newX >= 0) {
          for (let j = newX; j < x; j += 1) {
            initialGrid[j][y] = E.Empty;
          }
          x = newX;
        }
        break;
      }
      case 1: { // down
        const newX = getRandomInt(x + 1, rows - 1);
        if (newX <= rows) {
          for (let j = x; j <= newX; j += 1) {
            initialGrid[j][y] = E.Empty;
          }
          x = newX;
        }
        break;
      }
      case 2: { // left
        const newY = getRandomInt(0, y - 1);
        if (newY >= 0) {
          for (let j = newY; j < y; j += 1) {
            initialGrid[x][j] = E.Empty;
          }
          y = newY;
        }
        break;
      }
      case 3: { // right
        const newY = getRandomInt(y + 1, columns - 1);
        if (newY <= columns) {
          for (let j = y; j <= newY; j += 1) {
            initialGrid[x][j] = E.Empty;
          }
          y = newY;
        }
        break;
      }
      default:
        break;
    }
  }
  let {isValid} = tryGrid(initialX, initialY, initialGrid, 10000);
  let totalMoves = 0;
  if (isValid) {
    const confirmMap = 50;
    for (let i = 0; i < confirmMap; i += 1) {
      const {isValid: isValidN, moves} = tryGrid(initialX, initialY, initialGrid, 10000);
      totalMoves += moves;
      if (!isValidN) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      result.push({
        moves: Math.ceil(totalMoves / confirmMap),
        initialX,
        initialY,
        initialGrid: copyMatrix(initialGrid),
      })
      console.log(result.length);
      write(JSON.stringify(result));
    }
  }
  return isValid;
};
const filename = `generated_${new Date().getTime()}.json`;

const write = (data) => {
  fs.writeFileSync(filename, data, 'utf8');
}

const main = () => {
  let isValid = false;
  let count = 0;
  while (!isValid) {
    generate(count++);
    isValid = false;
    // isValid = generate();
  }
}

main();
