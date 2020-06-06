const string = '0 1 1 1 1 1 1 1 1 \n' +
  '0 0 0 0 1 1 1 1 1 \n' +
  '0 0 0 0 1 0 0 1 1 \n' +
  '0 0 0 0 1 0 0 1 1 \n' +
  '0 0 0 0 1 0 0 1 1 \n' +
  '0 0 0 0 0 0 0 1 1 \n' +
  '0 0 0 0 0 0 0 1 1 \n' +
  '0 0 0 0 0 0 0 0 0 ';
const initialX = 4;
const initialY = 4;
const initialGrid = []

const parse = () => {
  const rows = string.split('\n');
  rows.forEach((row, i) => {
    initialGrid[i] = row.split(' ');
  });

  console.log(JSON.stringify({initialX, initialY, initialGrid}));
}
parse();
