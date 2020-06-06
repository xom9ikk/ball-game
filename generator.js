const E = {
  Wall: 0,
  Empty: 1,
  Filled: 2,
}

const getRandomInt = (min, max) => {
  if (min > max) {
    return max >= 0 ? max : min;
  }
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
};

const getColumn = (data, columnIndex) => data.map((row) => row[columnIndex]);
const setColumn = (data, columnIndex, column) => {
  column.forEach((cell, index) => {
    data[index][columnIndex] = cell;
  });
  return data;
};

const tryGrid = (initialX, initialY, initialGrid, tries) => {
  // console.log(initialGrid)
  let grid = initialGrid.map((row) => [...row]);
  let y = initialY;
  let x = initialX;
  const rows = grid.length;
  const columns = grid[0].length;
  for (let i = 0; i < tries; i += 1) {
    const direction = getRandomInt(0, 3);
    switch (direction) {
      case 0: { // up
        const column = getColumn(grid, x);
        let count = y;
        while ((column[count] === E.Empty || column[count] === E.Filled)
        && count > 0) {
          column[count] = E.Filled;
          count -= 1;
        }
        if (count + 1 < rows - 1) {
          grid = setColumn([...grid], x, column);
          y = count + 1;
        }
        break;
      }
      case 1: { // down
        const column = getColumn(grid, x);
        let count = y;
        while ((column[count] === E.Empty || column[count] === E.Filled)
          && count < rows - 1
          ) {
          column[count] = E.Filled;
          count += 1;
        }
        if (count - 1 >= 0) {
          grid = setColumn([...grid], x, column);
          y = count - 1;
        }
        break;
      }
      case 2: { // left
        const row = grid[y];
        let count = x;
        while ((row[count] === E.Empty || row[count] === E.Filled)
        && count > 0) {
          row[count] = E.Filled;
          count -= 1;
        }
        if (count + 1 < columns - 1) {
          const newGrid = [...grid];
          newGrid[y] = row;
          grid = newGrid;
          x = count + 1;
        }
        break;
      }
      case 3: { // right
        const row = grid[y];
        let count = x;
        while ((row[count] === E.Empty || row[count] === E.Filled)
          && count < columns - 1
          ) {
          row[count] = E.Filled;
          count += 1;
        }
        if (count - 1 >= 0) {
          const newGrid = [...grid];
          newGrid[y] = row;
          grid = newGrid;
          x = count - 1;
        }
        break;
      }
      default: break;
    }
  }
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
};

const generate = (count) => {
  const minSize = 8;
  const maxSize = 12;
  const rows = getRandomInt(minSize, maxSize);
  const columns = getRandomInt(minSize, maxSize);
  const initialGrid = [];
  // const initialGrid: IGrid = [
  //   ...new Array(rows)
  //     .fill(
  //       new Array(columns)
  //         .fill(E.Wall),
  //     ),
  // ];
  // console.log('rows', rows);
  // console.log('columns', columns);
  for (let i = 0; i < rows; i += 1) {
    initialGrid[i] = new Array(columns).fill(E.Wall);
  }
  const maxSlide = Math.ceil((rows * columns) / 3);
  let x = getRandomInt(0, rows - 1); // select row
  let y = getRandomInt(0, columns - 1); // select col
  const initialY = x;
  const initialX = y;
  // console.log('x', x);
  // console.log('y', y);
  // console.log(`patch x[${x}] y[${y}]`);
  // console.log('patch', initialGrid[x]);
  initialGrid[x][y] = E.Empty;
  // console.log('patched', initialGrid[x]);

  for (let i = 0; i < maxSlide; i += 1) {
    const direction = getRandomInt(0, 3);

    switch (direction) {
      case 0: { // up
        const newX = getRandomInt(0, x - 1);
        // console.log(`[${x}][${y}] -> [${newX}][${y}]`);
        if (newX >= 0) {
          for (let j = newX; j <= x; j += 1) {
            initialGrid[j][y] = E.Empty;
          }
          x = newX;
        }
        break;
      }
      case 1: { // down
        const newX = getRandomInt(x + 1, rows - 1);
        // console.log(`[${x}][${y}] -> [${newX}][${y}]`);
        if (newX <= rows) {
          for (let j = x; j <= newX; j += 1) {
            initialGrid[j][y] = E.Empty;
          }
          x = newX;
        }
        break;
      }
      case 2: { // left
        const newY = getRandomInt(y + 1, columns - 1);
        // console.log(`[${x}][${y}] -> [${x}][${newY}]`);
        if (newY <= columns) {
          for (let j = y; j <= newY; j += 1) {
            initialGrid[x][j] = E.Empty;
          }
          y = newY;
        }
        break;
      }
      case 3: { // right
        const newY = getRandomInt(0, y - 1);
        // console.log(`[${x}][${y}] -> [${x}][${newY}]`);
        if (newY >= 0) {
          for (let j = newY; j <= y; j += 1) {
            initialGrid[x][j] = E.Empty;
          }
          y = newY;
        }
        break;
      }
      default: break;
    }
  }
  let isValid = tryGrid(initialX, initialY, initialGrid, 10000);
  if (isValid) {
    console.log('Potential valid');
    // }));
    for (let i = 0; i < 50; i += 1) {
      console.log('Try potential valid');
      if (!tryGrid(initialX, initialY, initialGrid, 10000)) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      console.log('VALID', count);
      console.log(JSON.stringify({
        initialX,
        initialY,
        initialGrid,
      }));
    }
  }
  // else {
  // console.log('invalid');
  // return generate();
  // }
  return {
    initialX, initialY, initialGrid, isValid,
  };
};


const main = ()=>{
  let isValid = false;
  let count = 0;
  while(!isValid) {
    generate(count++);
    isValid=false;
    // isValid = generate();
  }
}

main();
