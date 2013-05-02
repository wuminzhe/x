var Button = function(domId, paper) {
  Block.apply(this, arguments);
  this.el.addClass("button");
  this.el.addClass("bordered");
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