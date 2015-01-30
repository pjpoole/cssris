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
Board.Y_DIM = 20;

Board.prototype.step = function () {
  this.piece.step();
};

Board.prototype.stop = function () {

};

Board.prototype.gameOver = function () {

};

Board.prototype.die = function () {
  this.highscore = Math.max(this.points, this.highscore);
  this.points = 0;
  this.lines = 0;

  this.clearBoard();
};

Board.prototype.clearBoard = function () {
  var x, y;

  for (x = 0; x < Board.X_DIM; x++) {
    for (y = 0; y < Board.Y_DIM; y++) {
      this.set(x, y, true);
    }
  }
};

Board.prototype.get = function (x, y) {
  if (this.inbounds(x, y)) {
    return this.grid()[x][y];
  } else {
    return undefined;
  }
},

Board.prototype.set = function (x, y, val) {
  if (this.inbounds(x, y)) {
    this.grid()[x][y] = val;
  }
},

Board.prototype.inbounds = function (x, y) {
  return ((x > 0 && x < Board.X_DIM) && (y > 0 && y < Board.Y_DIM));
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
        str += "+";
      } else {
        str += " ";
      }
    }
    str += "\n";
  }

  return str;
};


})();
