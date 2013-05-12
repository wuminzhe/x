function Text(paper, left, top, width, height, html) {
  Block.apply(this, arguments);
  this.type = "Text";
  this.html = html ? html : "I’ll have what she’s having";
};

extend(Text, Block);

Text.prototype.render = function() {
  Block.prototype.render.call(this, arguments);
  this.el.addClass("text");
  this.contentEl.html(this.html);
};

Text.prototype.update = function() {
  Block.prototype.update.call(this, arguments);
  this.contentEl.html(this.html);
};

Text.prototype.clone = function() {
  return new Text(this.paper, this.left, this.top, this.width, this.height, this.html);
};

Text.prototype.duplicate = function() {
  var bound = this._getDuplicateBound("Text", this.getBound());
  var c = this.paper.addText(bound.left, bound.top, bound.width, bound.height);
  c.setHtml(this.getHtml());
  return c;
};