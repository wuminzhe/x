function BlockGroup(){
  this.blocks = [];
}

BlockGroup.prototype.addBlock = function(block){
  this.blocks.push(block);
};

BlockGroup.prototype.removeBlock = function(block){
  this.blocks = _.without(this.blocks, block);
};

BlockGroup.prototype.clear = function() {
  this.blocks = [];
};

BlockGroup.prototype.contains = function(block) {
  _.indexOf(this.blocks, block);
};

BlockGroup.prototype.getBound = function() {
  if(this.blocks.length>0) {
    var minLeft = 10000;
    var minTop = 10000;
    var maxRight = 0;
    var maxBottom = 0;
    for(var i=0;i<this.blocks.length;i++) {
      var block = this.blocks[i];
      var bound = block.getBound();
      if(bound.left < minLeft) {
        minLeft = bound.left;
      }
      if(bound.top < minTop) {
        minTop = bound.top;
      }
      if((bound.left+bound.width) > maxRight) {
        maxRight = bound.left+bound.width;
      }
      if((bound.top+bound.height) > maxBottom) {
        maxBottom = bound.top+bound.height;
      }
    }
    return {'width': (maxRight-minLeft) , 'height': (maxBottom-minTop), 'left':minLeft, 'top':minTop}
  } else {
    return null;
  }
  

  
};

BlockGroup.prototype.snapshot = function(){
  for(var i=0;i<this.blocks.length;i++){
    var block = this.blocks[i];
    block.snapshot();
  }
};

BlockGroup.prototype.moveFromSnapshot = function(dx, dy){
  for(var i=0;i<this.blocks.length;i++){
    var block = this.blocks[i];
    block.moveFromSnapshot(dx, dy);
  }
};

BlockGroup.prototype.move = function(dx, dy){
  for(var i=0;i<this.blocks.length;i++){
    var block = this.blocks[i];
    block.move(dx, dy);
  }
};

BlockGroup.prototype.resize = function(x0, y0, w0, h0, x1, y1, w1, h1) {
  for(var i=0;i<this.blocks.length;i++){
    var block = this.blocks[i];
    var m0 = block.snap.left;
    var n0 = block.snap.top;
    var a0 = block.snap.width;
    var b0 = block.snap.height;
    var m1 = (w0*x1+w1*m0-w1*x0)/w0;
    var n1 = (h0*y1+h1*n0-h1*y0)/h0;
    var a1 = (a0*w1)/w0;
    var b1 = (b0*h1)/h0;
    
    //需要和单元格对其，所以对结果再处理
    var r1 = round_by_ten(m1);
    var m1_new = r1[0];
    var a1_new = round_by_ten(a1 + r1[1])[0];

    var r2 = round_by_ten(n1);
    var n1_new = r2[0];
    var b1_new = round_by_ten(b1 + r2[1])[0];

    // if(block.el.attr('id')=='b0'){
    //   $("#log").html(m1+","+n1+"==="+m1_new+","+n1_new);
    // }
    
    block.setPosition(m1_new, n1_new);
    block.setSize(a1_new, b1_new);
  }
};

