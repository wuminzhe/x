function Block(paper, left, top, width, height){
  this.paper = paper;
  this.type = "Block";
  this.level = paper.getLevel();
  this.left = left;
  this.top = top;
  this.width = width;
  this.height = height;
};

Block.prototype.render = function(){
  this.id = paper.getBlockId();
  this.el = $('<div id="'+this.id+'" />');
  this.el.addClass("block");
  this.el.css("z-index", this.level);
  this.paper.el.append(this.el);

  //content element
  this.contentEl = $('<div class="content"></div>');
  this.el.append(this.contentEl);

  //bind event
  var _this = this;
  this.el.click(function(e){
    if(e.shiftKey){
      _this.paper.selectBlock(_this);
    }else{
      _this.paper.selectOneBlockOnly(_this);
    }
  });
  
  this.el.css({
    "left": this.left+"px",
    "top": this.top+"px",
    "width": this.width+"px",
    "height": this.height+"px"
  });
};

Block.prototype.update = function() {
  this.el.css({
    "left": this.left+"px",
    "top": this.top+"px",
    "width": this.width+"px",
    "height": this.height+"px",
    "z-index": this.level
  });
};

Block.prototype.levelUp = function() {
  
  for( var i=0; i<this.paper.blocks.length; i++ ) {
    var block = this.paper.blocks[i];
    if( block.level==this.level+1 ) {
      block.level = block.level - 1;
      block.update();
    }
  }
  
  this.level = this.level + 1;
  this.update();
};

Block.prototype.levelTop = function() {
  var theBlockBefore = null;
  for( var i=0; i<this.paper.blocks.length; i++ ) {
    var block = this.paper.blocks[i];
    if( block.level==this.level+1 ) {
      theBlockBefore = block;
    }
  }
  
  if( theBlockBefore ){
    theBlockBefore.level--;
    this.level++;
  }
};

Block.prototype.remove = function() {
  this.el.remove();
};

Block.prototype.snapshot = function(){
  return ( this.snap = this.getBound() );
};

Block.prototype.moveFromSnapshot = function( dx, dy ) {
  this.setPosition( this.snap.left+dx, this.snap.top+dy );
};

Block.prototype.move = function( dx, dy ) {
  this.setPosition( this.left+dx, this.top+dy );
};

Block.prototype.getBound = function() {
  return { width:this.width, height:this.height, left:this.left, top:this.top }
};

Block.prototype.setPosition = function( left, top ) {
  this.left = left;
  this.top = top;
};

Block.prototype.setSize = function( width, height ) {
  this.width = width;
  this.height = height;
};

Block.prototype.resize = function( x0, y0, w0, h0, x1, y1, w1, h1 ) {
  this.setPosition(x1, y1);
  this.setSize(w1, h1);
};