(function () {
if (typeof CSSris === "undefined") {
  window.CSSris = {};
}

// This is where the logic for the game gets stored and interpreted.
var Board = CSSris.Board = function () {
  // TODO: save highscore

  this.clearBoard();

  this.piece = new CSSris.Piece(this);

  this.highscore = 0;
  this.points = 0;
  this.lines = 0;

};

// Standard Tetris board size
Board.X_DIM = 10;
Board.Y_DIM = 22;

Board.prototype.step = function () {
  this.piece.step();
};

Board.prototype.stop = function () {
  var counter, rows = 0, x, y;
  for (y = 0; y < Board.Y_DIM; y++) {
    counter = 0;
    for (x = 0; x < Board.X_DIM; x++) {
      if (this.get(x, y)) {
        counter++;
      }
    }
    if (counter === Board.X_DIM) {
      this.clearRow(y);
      rows++;
    }
  }
};

Board.prototype.clearRow = function (y_source) {
  var x, y;
  for (y = y_source; y >= 1; y--) {
    for (x = 0; x < Board.X_DIM; x++) {
      this.set(x, y, this.get(x, y - 1));
    }
  }
};

Board.prototype.gameOver = function () {
  this.highscore = Math.max(this.points, this.highscore);
  this.points = 0;
  this.lines = 0;

  this.clearBoard();
};

Board.prototype.clearBoard = function () {
  var x, y;

  for (x = 0; x < Board.X_DIM; x++) {
    for (y = 0; y < Board.Y_DIM; y++) {
      this.set(x, y, false);
    }
  }
};

Board.prototype.get = function (x, y) {
  if (this.inbounds(x, y)) {
    return this.grid()[x][y];
  } else {
    return true;
  }
},

Board.prototype.set = function (x, y, val) {
  if (this.inbounds(x, y)) {
    this.grid()[x][y] = val;
  }
},

Board.prototype.isValid = function (x, y) {
  return (!this.get(x, y));
};

Board.prototype.inbounds = function (x, y) {
  return ((x >= 0 && x < Board.X_DIM) && (y >= 0 && y < Board.Y_DIM));
};

Board.prototype.grid = function () {
  var x;

  if (!this._grid) {
    this._grid = new Array(Board.X_DIM);
    for (x = 0; x < Board.X_DIM; x++) {
      this._grid[x] = new Array(Board.Y_DIM);
    }
  }

  return this._grid;
};

Board.prototype.render = function () {
  var val, x, y;

  str = "";

  for (y = 0; y < Board.Y_DIM; y++) {
    for (x = 0; x < Board.X_DIM; x++) {
      val = this.get(x, y);

      if (val) {
        str += "val";
      } else {
        str += " ";
      }
    }
    str += "\n";
  }

  return str;
};


})();
