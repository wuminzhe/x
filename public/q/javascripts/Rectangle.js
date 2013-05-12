function Rectangle(paper, left, top, width, height, borderStyle) {
  Block.apply(this, arguments);
  this.type = "Rectangle";
  this.borderStyle = borderStyle ? borderStyle : 0; //0:solid, 1:dashed, 2:dotted
}

extend(Rectangle, Block);

Rectangle.prototype.render = function(){
  Block.prototype.render.call(this, arguments);
  this.el.addClass("rectangle");
  this._setBorderStyle();
};

Rectangle.prototype.update = function() {
  Block.prototype.update.call(this, arguments);
  this._setBorderStyle();
};

Rectangle.prototype.clone = function() {
  return new Rectangle(this.paper, this.left, this.top, this.width, this.height, this.borderStyle);
};

Rectangle.prototype._setBorderStyle = function() { 
  var classNames = ["border-solid", "border-dashed", "border-dotted"];
  var className = classNames[this.borderStyle];
  if( !this.el.hasClass(className) ) {
    //删掉其他的
    for( var i=0; i<classNames.length; i++ ) {
      if( classNames[i]!=className && this.el.hasClass(classNames[i]) ){
        this.el.removeClass(classNames[i]);
      }
    }
    //
    this.el.addClass(className);
  }
};

Rectangle.prototype.duplicate = function() {
  var bound = this._getDuplicateBound("Rectangle", this.getBound());
  var c = this.paper.addRectangle(bound.left, bound.top, bound.width, bound.height);
  return c;
};
