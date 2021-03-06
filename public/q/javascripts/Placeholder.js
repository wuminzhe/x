function Placeholder(paper, left, top, width, height) {
  Block.apply(this, arguments);
}

extend(Placeholder, Block);

Placeholder.prototype.render = function() {
  Block.prototype.render.call(this, arguments);
  this.el.addClass("placeholder");
  this.el.addClass("border-solid");
  this.contentEl.append($('<img src="./images/placeholder.svg" alt="placeholder">'));
};

Placeholder.prototype.clone = function() {
  return new Placeholder(this.paper, this.left, this.top, this.width, this.height);
};

Placeholder.prototype.duplicate = function() {
  var bound = this._getDuplicateBound("Placeholder", this.getBound());
  var c = this.paper.addPlaceholder(bound.left, bound.top, bound.width, bound.height);
  return c;
};