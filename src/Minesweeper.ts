// Minesweeper.ts
function clamp(min: number, val: number, max: number) {
  return Math.min(Math.max(val, min), max);
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function reshape(array, rows, cols) {
  var copy = array.slice(0); // Copy all elements.
  array.length = 0; // Clear out existing array.

  for (var r = 0; r < rows; r++) {
    var row = [];
    for (var c = 0; c < cols; c++) {
      var i = r * cols + c;
      if (i < copy.length) {
        row.push(copy[i]);
      }
    }
    array.push(row);
  }
  return array;
}
export class Minesweeper {
  mines: number[][];
  board: number[][];
  revealed: number[][];

  width: number;
  height: number;
  num_mines: number;

  constructor(width: number, height: number, num_mines: number) {
    this.reset(width, height, num_mines);
  }
  reset(width: number, height: number, num_mines: number = null) {
    this.width = width;
    this.height = height;
    this.num_mines = num_mines;
    if (num_mines === null)
      num_mines = this.mines
        .reduce((a, b) => a.concat(b))
        .reduce((a, b) => a + b); // The current number of mines

    this.mines = reshape(
      shuffleArray(
        Array.apply(null, Array(num_mines))
          .map(() => true)
          .concat(
            Array.apply(null, Array(width * height - num_mines)).map(
              () => false
            )
          )
      ),
      width,
      height
    );

    this.board = reshape(Array(width * height), width, height);
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.board[x][y] = this.mines_around(x, y);
      }
    }
    this.revealed = reshape(
      shuffleArray(
        Array.apply(null, Array(width * height)).map(() => false)
      ),
      width,
      height
    );

  }

  reveal(x: number, y: number) {
    if (x < 0 || x >= this.width) return;
    if (y < 0 || y >= this.height) return;
    if (this.revealed[x][y]) return;

    let num_close_mines = this.board[x][y];
    this.revealed[x][y] = 1;
    if (num_close_mines === -1) {
      this.lose();
    } else if (num_close_mines === 0) {
      // Reveal all adjacent squares
      this.reveal(x - 1, y - 1);
      this.reveal(x - 1, y);
      this.reveal(x - 1, y + 1);
      this.reveal(x, y - 1);
      this.reveal(x, y + 1);
      this.reveal(x + 1, y - 1);
      this.reveal(x + 1, y);
      this.reveal(x + 1, y + 1);
    } 
  }

  lose() {
    console.log("U lost...");
  }

  mines_around(row: number, col: number) {
    if (this.mines[row][col]) {
      return -1;
    }
    let sx = row - 1;
    let ex = sx + 2;
    let sy = col - 1;
    let ey = sy + 2;
    sx = clamp(0, sx, this.width - 1);
    ex = clamp(0, ex, this.width - 1);
    sy = clamp(0, sy, this.height - 1);
    ey = clamp(0, ey, this.height - 1);
    return this.mines
      .slice(sx, ex + 1)
      .map((i) => i.slice(sy, ey + 1))
      .reduce((a, b) => a.concat(b))
      .reduce((a, b) => a + b);
  }
}
