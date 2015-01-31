(function () {
if (typeof CSSris === "undefined") {
  window.CSSris = {};
}

// The view handles user interaction and screen updates.
var View = CSSris.View = function (options) {
  this.$el = options.$el;
  this.tick = options.tick || 10; // game clock tick in ms
  this.level = options.level || 1;
  this.tickCounter = 1;

  this.board = new CSSris.Board();

  this.build();
  this.bindListener();

  setInterval(function () {
    this.step();
  }.bind(this), this.tick)
};

View.prototype.step = function () {
  if (--this.tickCounter === 0) {
    this.board.step();
    this.tickCounter = (25 - this.level);
  }
  this.render();
};

View.prototype.render = function () {
  var view = this;

  this.$el.find('ul').each(function (y) {
    $(this).find('li').each(function (x) {
      var $li = $(this);
      $li.removeClass();
      $li.addClass(view.board.get(x,y));
    });
  });
};

View.prototype.build = function () {
  var $ul, $li, x, y;

  for (y = 0; y < CSSris.Board.Y_DIM; y++) {
    $ul = $('<ul>');
    for (x = 0; x < CSSris.Board.X_DIM; x++) {
      $li = $('<li>');
      $ul.append($li);
    }
    if (y < 2) $ul.addClass('buffer');
    this.$el.append($ul);
  }
};

View.prototype.bindListener = function () {
  var piece = this.board.piece;

  $(document).on('keydown', function (key) {
    var keyCode = key.which;

    if(keyCode >= 37 && keyCode <= 40) {
      key.preventDefault();
    }

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
