var Block = function(domId, paper){
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
    _this.paper.selectedBlocks.clear();
    _this.paper.selectedBlocks.addBlock(_this);
    _this.paper.select();
    //
    for(var i=0;i<paper.blocks.length;i++){
      var block = paper.blocks[i];
      block.el.removeClass("ui-selected");
    }
    _this.el.addClass("ui-selected");
    
  });
};

Block.prototype.snapshot = function(){
  this.snap = this.getBound();
}

Block.prototype.move = function(dx, dy) {
  var left = this.snap.left + dx;
  var top = this.snap.top + dy;
  this.setPosition(left, top);
}

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