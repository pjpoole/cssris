(function () {
if (typeof CSSris === "undefined") {
  window.CSSris = {};
}

var Piece = CSSris.Piece = function (board) {
  this.board = board;
  this.pos = [5,0];
};

// 1. I
// 2. O
// 3. L
// 4. J
// 5. S
// 6. Z
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

Piece.prototype.move = function (dir) {

};

Piece.prototype.rotate = function (dir) {

};

Piece.prototype.drop = function () {

};

Piece.prototype.reset = function () {

};
})();
