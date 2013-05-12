function Paper(domId){
  this.el = $("#"+domId);
  this.el.addClass('paper');
  var _this = this;
  //
  this.el.selectable({
    tolerance: "fit",
    filter: ".block",
    cancel: ".block",
    start: function( event, ui ) {
      _this.selectedBlocks.clear();
    },
    selected: function( event, ui ) {

      //TODO: 放入hash，直接取，可增加性能
      for (var i = 0; i < _this.blocks.length; i++) {
        var block = _this.blocks[i];

        if(block.el.attr("id") == $(ui.selected).attr('id')){
          _this.selectedBlocks.addBlock(block);
        }
      }
    },
    stop: function( event, ui ) {

      _this._stick();
    }
  });

  //
  $(document).bind('keydown', 'ctrl+a', function(){
    _this.selectAllBlocks();
  });
  $(document).bind('keydown', 'ctrl+c', function(){
    _this.copySelectedBlocks();

  });
  $(document).bind('keydown', 'ctrl+v', function(){
    _this.pasteSelectedBlocks();

  });


  $(document).keydown(function(e){
    console.log(e.which);

    if(e.which == 8){ //delete
      _this.deleteSelectedBlocks();
    }

    //37:left, 38:up, 39:right, 40:down
    if(e.which == 37){
      //
      _this.selectedBlocks.move(-10, 0);
      _this.selectedBlocks.update();
      //
      _this.selectBox.move(-10, 0);
    }

    if(e.which == 38){
      //
      _this.selectedBlocks.move(0, -10);
      _this.selectedBlocks.update();
      //
      _this.selectBox.move(0, -10);
    }

    if(e.which == 39){
      //
      _this.selectedBlocks.move(10, 0);
      _this.selectedBlocks.update();
      //
      _this.selectBox.move(10, 0);
    }

    if(e.which == 40){
      //
      _this.selectedBlocks.move(0, 10);
      _this.selectedBlocks.update();
      //
      _this.selectBox.move(0, 10);
    }

    e.preventDefault();
  });

  //
  this.last_block_id = 0;
  //
  this.blocks = [];
  this.selectedBlocks = new BlockGroup();
  //
  this.el.append('<div id="select_box" />');
  this.selectBox = new SelectBox("select_box");

};

Paper.prototype._stick = function(){
  this.selectBox.stickTo(this.selectedBlocks);
};


//
Paper.prototype.deleteSelectedBlocks = function(){
  for(var i=0;i<this.selectedBlocks.blocks.length;i++){
    var block = this.selectedBlocks.blocks[i];
    //从列表中删除
    this.blocks = _.without(this.blocks, block);
    //从dom中删除
    block.remove();
  }

  this.selectedBlocks.clear();
  //
  this._stick();
};

Paper.prototype.selectAllBlocks = function(){
  for(var i=0;i<this.blocks.length;i++){
    var block = this.blocks[i];
    if(!this.selectedBlocks.contains(block)){
      this.selectedBlocks.addBlock(block);
    }
  }
  //
  this._setBlocksSelectedStyle();
  //
  this._stick();
}

Paper.prototype.selectBlock = function(block){
  //
  this.selectedBlocks.addBlock(block);
  //
  this._setBlocksSelectedStyle();
  //
  this._stick();
};

Paper.prototype.selectOneBlockOnly = function(block){
  this.selectedBlocks.clear();
  //
  this.selectedBlocks.addBlock(block);
  //
  this._setBlocksSelectedStyle();
  //
  this._stick();
};

Paper.prototype.pasteSelectedBlocks = function() {
  
  var newBlocks = [];
  for(var i=0;i<this.blocksCopyed.length;i++){
    var blockCopyed = this.blocksCopyed[i];
    var newBlock = blockCopyed.clone();
    //
    var bound = this.getDuplicateBound( newBlock.type, newBlock.getBound() );
    newBlock.setSize(bound.width, bound.height);
    newBlock.setPosition(bound.left, bound.top);
    newBlock.render();
    //
    this.blocks.push(newBlock);
    newBlocks.push(newBlock);
  }
  this.selectedBlocks.blocks = newBlocks;
  //
  this._setBlocksSelectedStyle();
  //
  this._stick();
};

Paper.prototype.copySelectedBlocks = function() {
  this.blocksCopyed = [];
  for(var i=0;i<this.selectedBlocks.blocks.length;i++){
    var block = this.selectedBlocks.blocks[i];
    this.blocksCopyed.push(block.clone());
  }
};

Paper.prototype._setBlocksSelectedStyle = function(){
  for(var i=0;i<this.blocks.length;i++){
    var block = this.blocks[i];
    block.el.removeClass("ui-selected");
  }
  for(var i=0;i<this.selectedBlocks.blocks.length;i++){
    var block = this.selectedBlocks.blocks[i];
    block.el.addClass("ui-selected");
  }
};

Paper.prototype.getDuplicateBound = function(type, bound) {
  var newBound = {left: bound.left+10, top: bound.top+10, width: bound.width, height: bound.height};
  var rects = this.getBlocksByBound(newBound.left, newBound.top, newBound.width, newBound.height, type);
  if(rects.length>0){
    return this.getDuplicateBound(type, newBound);
  }else{
    return newBound;
  }
};

Paper.prototype.getBlockId = function() {
  return "b_"+this.last_block_id++;
};

//
Paper.prototype.addBlock = function(className, x, y, width, height){
  var block = eval("new "+className+"(this, x, y, width, height)");
  block.render();
  this.blocks.push(block);
  return block;
};

Paper.prototype.addRectangle = function(x, y, width, height){
  var rect = new Rectangle(this, x, y, width, height);
  rect.render();
  this.blocks.push(rect);
  return rect;
};

Paper.prototype.addButton = function(x, y, width, height){
  var btn = new Button(this, x, y, width, height);
  btn.render();
  this.blocks.push(btn);
  return btn;
};

Paper.prototype.addPlaceholder = function(x, y, width, height){
  var b = new Placeholder(this, x, y, width, height);
  b.render();
  this.blocks.push(b);
  return b;
};

Paper.prototype.addText = function(x, y, width, height){
  var b = new Text(this, x, y, width, height);
  b.render();
  this.blocks.push(b);
  return b;
  
};

//
Paper.prototype.getBlocksByBound = function(x, y, width, height, type){
  var result = [];
  
  for(var i=0;i<this.blocks.length;i++){
    var block = this.blocks[i];
    var bound = block.getBound();
    if(bound.left == x && bound.top == y && bound.width == width && bound.height == height){
      if(type){
        if(block.type == type){
          result.push(block);
        }
      }else{
        result.push(block);
      }
      
    }
  }
  return result;
}
