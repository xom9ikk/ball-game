const {getRandomInt, getColumn, setColumn,copyMatrix, checkValid, write, E} = require('./helper');

class Generator {
  constructor(p, options) {
    let count = 0;
    this.process = p;
    this.maxTries = options.maxTries;
    this.confirmMap = options.confirmMap;
    this.slides = options.slides;
    this.size = options.size;
    console.log(`Start with`, options)
    while (true) {
      this.generate(count++);
    }
  }
  tryGrid(initialX, initialY, initialGrid, tries) {
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
  generate(count) {
    // console.log('generate ',count)
    const rows = getRandomInt(this.size.min, this.size.max);
    const columns = getRandomInt(this.size.min, this.size.max);
    const initialGrid = [];
    for (let i = 0; i < rows; i += 1) {
      initialGrid[i] = new Array(columns).fill(E.Wall);
    }
    const maxSlide = getRandomInt(this.slides.min, this.slides.max);
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
    let {isValid} = this.tryGrid(initialX, initialY, initialGrid, this.maxTries);
    let totalMoves = 0;
    if (isValid) {
      for (let i = 0; i < this.confirmMap; i += 1) {
        const {isValid: isValidN, moves} = this.tryGrid(initialX, initialY, initialGrid, this.maxTries);
        totalMoves += moves;
        if (!isValidN) {
          isValid = false;
          break;
        }
      }
      if (isValid) {
        const map = {
            moves: Math.ceil(totalMoves / this.confirmMap),
            initialX,
            initialY,
            initialGrid: copyMatrix(initialGrid),
          };
        this.process.send(JSON.stringify(map));
        // result.push({
        //   moves: Math.ceil(totalMoves / confirmMap),
        //   initialX,
        //   initialY,
        //   initialGrid: copyMatrix(initialGrid),
        // })
        // const sorted = [...result];
        // sorted.sort((a,b)=>a.moves-b.moves);
        // console.log(`Attempt: ${count} Total maps: ${sorted.length}`);
        // write(filename, JSON.stringify(sorted));
      }
    }
    return isValid;
  };
  main(p) {

  }
}
module.exports = Generator;
