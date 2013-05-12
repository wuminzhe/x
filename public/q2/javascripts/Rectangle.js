function Rectangle(domId, paper) {
  Block.apply(this, arguments);
  this.el.addClass("rectangle");
  this.el.addClass("border-solid");
}

extend(Rectangle, Block);

Rectangle.prototype.setBorderStyle = function(styleIndex) { //0:solid, 1:dashed, 2:dotted
  var classNames = ["border-solid", "border-dashed", "border-dotted"];

  for(var i=0;i<3;i++){
    if( i == styleIndex && !this.el.hasClass(classNames[i])){
      this.el.addClass(classNames[i]);
    }else{
      this.el.removeClass(classNames[i]);
    }
  }
};

Rectangle.prototype.duplicate = function() {
  var bound = this._getDuplicateBound("Rectangle", this.getBound());
  var c = this.paper.addRectangle(bound.left, bound.top, bound.width, bound.height);
  return c;
};

