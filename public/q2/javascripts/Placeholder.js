function Placeholder(domId, paper) {
  Block.apply(this, arguments);
  this.el.addClass("placeholder");
  this.el.addClass("border-solid");
  this.contentEl.append($('<img src="./images/placeholder.svg" alt="placeholder">'));
}

extend(Placeholder, Block);

Placeholder.prototype.duplicate = function() {
  var bound = this._getDuplicateBound("Placeholder", this.getBound());
  var c = this.paper.addPlaceholder(bound.left, bound.top, bound.width, bound.height);
  return c;
};