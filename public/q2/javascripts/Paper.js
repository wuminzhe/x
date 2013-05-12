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
      //
      _this.selectBox.move(-10, 0);
    }

    if(e.which == 38){
      //
      _this.selectedBlocks.move(0, -10);
      //
      _this.selectBox.move(0, -10);
    }

    if(e.which == 39){
      //
      _this.selectedBlocks.move(10, 0);
      //
      _this.selectBox.move(10, 0);
    }

    if(e.which == 40){
      //
      _this.selectedBlocks.move(0, 10);
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
    var block = this.blocksCopyed[i];
    var newBlock = block.duplicate();
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
    var bound = block.getBound();

    this.blocksCopyed.push(block);
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



//
Paper.prototype._addBlock = function(className, x, y, width, height){
  var block_id = "b"+(this.last_block_id++);

  this.el.append('<div id="'+block_id+'" />');

  var block = eval("new "+className+"(block_id, this)");
  block.setPosition(x, y);
  block.setSize(width, height);
  this.blocks.push(block);
  return block;
};

Paper.prototype.addRectangle = function(x, y, width, height){
  return this._addBlock("Rectangle", x, y, width, height);
};

Paper.prototype.addButton = function(x, y, width, height){
  return this._addBlock("Button", x, y, width, height);
};

Paper.prototype.addPlaceholder = function(x, y, width, height){
  return this._addBlock("Placeholder", x, y, width, height);
};

Paper.prototype.addText = function(x, y, width, height){
  return this._addBlock("Text", x, y, width, height);
};

//
Paper.prototype.getBlocksByBound = function(x, y, width, height, className){
  var result = [];
  
  for(var i=0;i<this.blocks.length;i++){
    var block = this.blocks[i];
    var bound = block.getBound();
    if(bound.left == x && bound.top == y && bound.width == width && bound.height == height){
      if(className){
        if(isType(block, className)){
          result.push(bound);
        }
      }else{
        result.push(bound);
      }
      
    }
  }
  return result;
}
