function Text(domId, paper) {
  Block.apply(this, arguments);
  this.el.addClass("text");
  this.contentEl.html("I’ll have what she’s having");
};

extend(Text, Block);

Text.prototype.setHtml = function(html){
  this.contentEl.html(html);
};

Text.prototype.getHtml = function(){
  return this.contentEl.html();
};

Text.prototype.duplicate = function() {
  var bound = this._getDuplicateBound("Text", this.getBound());
  var c = this.paper.addText(bound.left, bound.top, bound.width, bound.height);
  c.setHtml(this.getHtml());
  return c;
};

Text.prototype.copy = function(){
  this.infos = this.getBound();
  this.infos.className = "Text";
  this.infos.html = this.getHtml();
};

Text.prototype.paste = function(){
  // this.infos
  
};