var Rectangle = function(domId, paper) {
  Block.apply(this, arguments);
  this.el.addClass("rectangle");
  this.el.addClass("bordered");
}

extend(Rectangle, Block);