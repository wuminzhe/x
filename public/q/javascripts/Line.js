function Line(paper, left, top, direction) {
  var arguments = [paper, left, top, 100, 20];
  Block.apply(this, arguments);
  this.type = "Line";
  this.direction = direction ? direction : 1; //0:vertical, 1:horizontal
  
  this.disabledHandles = [ 'n', 's', 'ne', 'se', 'sw', 'nw' ];
}

extend(Line, Block);

Line.prototype.render = function(){
  Block.prototype.render.call(this, arguments);
  this.el.addClass("line");
  
  if(this.direction==1){
    this.lineEl = $('<span class="line-horizontal"></span>');
  }else{
    this.lineEl = $('<span class="line-vertical"></span>');
  }
  
  this.contentEl.append(this.lineEl);
  
  this.update();
};

Line.prototype.update = function() {
  if(this.direction==1){
    this.lineEl.removeClass("line-vertical");
    this.lineEl.addClass("line-horizontal");
  }else{
    this.lineEl.removeClass("line-horizontal");
    this.lineEl.addClass("line-vertical");
  }
  
  Block.prototype.update.call(this, arguments);
};

Line.prototype.setDirection = function(direction) {
  this.direction = direction;
  if( this.direction==1 ) { 
    this.disabledHandles = [ 'n', 's', 'ne', 'se', 'sw', 'nw' ];
    this.width = 100;
    this.height = 20;
  } else {
    this.disabledHandles = [ 'w', 'e', 'ne', 'se', 'sw', 'nw' ];
    this.width = 20;
    this.height = 100;
  }
}

Line.prototype.clone = function() {
  return new Line(this.paper, this.left, this.top, this.direction);
};

