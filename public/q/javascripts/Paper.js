var Paper = function(domId){
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
      _this.selectBox.stickTo(_this.selectedBlocks);
    }
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

Paper.prototype.select = function(){
  this.selectBox.stickTo(this.selectedBlocks);
};

Paper.prototype.addRectangle = function(x, y, width, height){
  var block_id = "b"+(this.last_block_id++);

  this.el.append('<div id="'+block_id+'" />');

  var block = new Rectangle(block_id, this);
  block.setPosition(x, y);
  block.setSize(width, height);
  block.snapshot();
  this.blocks.push(block);
  return block;
};

Paper.prototype.addButton = function(x, y, width, height){
  var block_id = "btn"+(this.last_block_id++);

  this.el.append('<div id="'+block_id+'" />');

  var button = new Button(block_id, this);
  button.setPosition(x, y);
  button.setSize(width, height);
  button.snapshot();
  this.blocks.push(button);
  return button;
};

Paper.prototype.addPlaceholder = function(x, y, width, height){
  var block_id = "b"+(this.last_block_id++);

  this.el.append('<div id="'+block_id+'" />');

  var block = new Placeholder(block_id, this);
  block.setPosition(x, y);
  block.setSize(width, height);
  block.snapshot();
  this.blocks.push(block);
  return block;
};