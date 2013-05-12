function Button(paper, left, top, width, height, label) {
  Block.apply(this, arguments);
  this.type = "Button";
  this.label = label ? label : "确定";
};

extend(Button, Block);

Button.prototype.render = function() {
  Block.prototype.render.call(this, arguments);
  this.el.addClass("button");
  this.el.addClass("border-solid");
  this.labelEl = $('<span class="label">确定</span>');
  this.contentEl.append(this.labelEl);
};

Button.prototype.update = function() {
  Block.prototype.update.call(this, arguments);
  this.labelEl.html(this.label);
};

Button.prototype.clone = function() {
  return new Button(this.paper, this.left, this.top, this.width, this.height, this.label);
};

Button.prototype.duplicate = function() {
  var bound = this._getDuplicateBound("Button", this.getBound());
  var c = this.paper.addButton(bound.left, bound.top, bound.width, bound.height);
  c.setLabel(this.getLabel());
  return c;
};