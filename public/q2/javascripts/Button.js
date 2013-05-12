function Button(domId, paper) {
  Block.apply(this, arguments);
  this.el.addClass("button");
  this.el.addClass("border-solid");
  this.labelEl = $('<span class="label">确定</span>');
  this.contentEl.append(this.labelEl);
};

extend(Button, Block);

Button.prototype.setSize = function(width, height){
  this.el.css({
    "width": width+"px",
    "height": height+"px",
    "line-height": height+"px"
  });
};

Button.prototype.setLabel = function(lable){
  this.labelEl.html(lable);
};

Button.prototype.getLabel = function(){
  return this.labelEl.html();
};

Button.prototype.duplicate = function() {
  var bound = this._getDuplicateBound("Button", this.getBound());
  var c = this.paper.addButton(bound.left, bound.top, bound.width, bound.height);
  c.setLabel(this.getLabel());
  return c;
};