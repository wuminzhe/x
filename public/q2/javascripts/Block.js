function Block(domId, paper){
  this.paper = paper;
  this.el = $("#"+domId);
  this.el.addClass("block");
  this.el.css({
    "left": "100px",
    "top": "200px",
    "width": "100px",
    "height": "60px"
  });
  this.contentEl = $('<div class="content"></div>');
  this.el.append(this.contentEl);
  var _this = this;
  this.el.click(function(e){
    if(e.shiftKey){
      _this.paper.selectBlock(_this);
    }else{
      _this.paper.selectOneBlockOnly(_this);
    }
  });
};

Block.prototype.remove = function(){
  this.el.remove();
};

Block.prototype.snapshot = function(){
  this.snap = this.getBound();
  return this.snap;
};

Block.prototype.moveFromSnapshot = function(dx, dy) {
  var left = this.snap.left + dx;
  var top = this.snap.top + dy;
  this.setPosition(left, top);
};

Block.prototype.move = function(dx, dy) {
  var p = this.el.position();
  this.el.css({
    'top': (p.top+dy)+'px',
    'left': (p.left+dx)+'px'
  });
};

Block.prototype.getBound = function(){
  var w = this.el.width();
  var h = this.el.height();
  var top = this.el.position().top;
  var left = this.el.position().left;
  return {width:w, height:h, left:left, top:top}
};

Block.prototype.setPosition = function(x, y){
  this.el.css({
    "left": x+"px",
    "top": y+"px",
  });
};

Block.prototype.setSize = function(width, height){
  this.el.css({
    "width": width+"px",
    "height": height+"px"
  });
};

Block.prototype._getDuplicateBound = function(className, bound) {
  var newBound = {left: bound.left+10, top: bound.top+10, width: bound.width, height: bound.height};
  var rects = this.paper.getBlocksByBound(newBound.left, newBound.top, newBound.width, newBound.height, className);
  if(rects.length>0){
    return this._getDuplicateBound(className, newBound);
  }else{
    return newBound;
  }
};