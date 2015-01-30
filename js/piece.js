(function () {
if (typeof CSSris === "undefined") {
  window.CSSris = {};
}

var Piece = CSSris.Piece = function (board) {
  this.board = board;
  this.pos = [6,0];
  this._piece = this.randomPiece();
};

// 1. O
// 2. I
// 3. S
// 4. Z
// 5. L
// 6. J
// 7. T

Piece.pieces = [
  {
    name: 'O',
    size: 1,
    offsets: [
      [[-1, 0],[ 0, 0],[-1, 1],[ 0, 1]]
    ]
  },
  {
    name: 'I',
    size: 2,
    offsets: [
      [[-2, 0],[-1, 0],[ 0, 0],[ 1, 0]],
      [[ 0,-1],[ 0, 0],[ 0, 1],[ 0, 2]]
    ]
  },
  {
    name: 'S',
    size: 2,
    offsets: [
      [[-1, 0],[ 0, 0],[-2, 1],[-1, 1]],
      [[-2,-1],[-2, 0],[-1, 0],[-1, 1]]
    ]
  },
  {
    name: 'Z',
    size: 2,
    offsets: [
      [[-2, 0],[-1, 0],[-1, 1],[ 0, 1]],
      [[ 0,-1],[-1, 0],[ 0, 0],[-1, 1]]
    ]
  },
  {
    name: 'L',
    offsets: [
      [[-2, 0],[-1, 0],[ 0, 0],[-2, 1]],
      [[-2,-1],[-1,-1],[-1, 0],[-1, 1]],
      [[ 0, 0],[-2, 1],[-1, 1],[ 0, 1]],
      [[-1,-1],[-1, 0],[-1, 1],[ 0, 1]]
    ]
  },
  {
    name: 'J',
    size: 4,
    offsets: [
      [[-2, 0],[-1, 0],[ 0, 0],[ 0, 1]],
      [[-1,-1],[-1, 0],[-2, 1],[-1, 1]],
      [[-2, 0],[-2, 1],[-1, 1],[ 0, 1]],
      [[-1,-1],[ 0,-1],[-1, 0],[-1, 1]]
    ]
  },
  {
    name: 'T',
    size: 4,
    offsets: [
      [[-2, 0],[-1, 0],[ 0, 0],[-1, 1]],
      [[-1,-1],[-2, 0],[-1, 0],[-1, 1]],
      [[-1, 0],[-2, 1],[-1, 1],[ 0, 1]],
      [[-1,-1],[-1, 0],[ 0, 0],[-1, 1]]
    ]
  }
];

Piece.prototype.randomPiece = function () {
  this.offset = 0;
  return Piece.pieces[Math.floor(Math.random() * 6)];
};

Piece.prototype.step = function () {
  this.drop();
};

Piece.prototype.stop = function () {
  if (this.pos[1] === 0 || this.pos[1] === 1) {
    this.board.gameOver();
  } else {
    var callback = function (offs) {
      this.board.set(offs[0], offs[1], true);
    });
    this.currentPiece(callback);
    this.board.stop();
    this.reset();
  }
};

Piece.prototype.rotate = function (dir) {
  var offset = dir === 'L' ? -1 : 1,
      idx = (this.offset + this._piece.size + offset) % this._piece.size,
      pos = this.pos,
      tempPiece = this._piece.offsets(idx).map(function (offs) {
        return [pos[0] + offs[0], pos[1] + offs[1]];
      });

  if (this.testPos(tempPiece)) {
    this.offset = idx;
  }

};

Piece.prototype.move = function (dir) {
  var offset = dir === 'L' ? -1 : 1,
      callback = function (offs) {
        return [this.pos[0] + offset, this.pos[1]];
      },
      tempPiece = this.currentPiece(callback);

  if (this.testPos(tempPiece)) {
    this.pos[0] += offset;
  }
};

Piece.prototype.drop = function () {
  var newPos = [this.pos[0], this.pos[1] + 1],
      callback = function (offs) {
        return [this.pos[0], this.pos[1] + 1];
      },
      tempPiece = this.currentPiece(callback);

  if (this.testPos(tempPiece)) {
    this.pos = newPos;
  } else {
    this.stop();
  }
};

Piece.prototype.testPos = function (pos_ary) {
  return pos_ary.every(function (offset) {
    return !this.board.get(offset[0], offset[1]);
  }, this);
};

Piece.prototype.currentPiece = function (callback) {
  callback = callback || function (offs) {
    return [this.pos[0] + offs[0], this.pos[1] + offs[1]];
  };

  return this._piece.offsets[this.offset].map(callback, this);
};

Piece.prototype.reset = function () {
  this.pos = [0,6];
  this._piece = this.randomPiece();
};
})();
