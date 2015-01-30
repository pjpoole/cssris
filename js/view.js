(function () {
if (typeof CSSris === "undefined") {
  window.CSSris = {};
}

// The view handles user interaction and screen updates.
var View = CSSris.View = function (options) {
  console.log(options)
  this.$el = options.$el;
  this.tick = options.tick || 10; // game clock tick in ms
  this.level = options.level || 1;
  this.tickCounter = (25 - this.level);

  this.board = new CSSris.Board();

  this.build();
  this.bindListener();

  // setInterval(function () {
  //   this.step();
  // }.bind(this), this.tick)
};

View.prototype.step = function () {
  if (--this.tickCounter === 0) {
    this.board.step();
  }
  this.render();
};

View.prototype.render = function () {

};

View.prototype.build = function () {
  var $ul, $li, x, y;

  for (y = 0; y < CSSris.Board.Y_DIM; y++) {
    $ul = $('<ul>');
    for (x = 0; x < CSSris.Board.X_DIM; x++) {
      $li = $('<li>');
      $ul.append($li);
    }
    this.$el.append($ul);
  }
};

View.prototype.bindListener = function () {
  var piece = this.board.piece;

  $(document).on('keydown', function (key) {
    key.preventDefault();

    switch (key.which) {
    case 37:
      piece.move("L");
      break;
    case 38:
      piece.rotate("R");
      break;
    case 39:
      piece.move("R");
      break;
    case 40:
      piece.drop();
      break;
    default:
      break;
    }
  });
};

})();
