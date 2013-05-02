var SelectBox = function(domId){
  this.el = $("#"+domId);

  this.el.addClass("select-box");
  this.el.html(
    '<div class="ui-resizable-handle ui-resizable-n"></div>'+
    '<div class="ui-resizable-handle ui-resizable-e"></div>'+
    '<div class="ui-resizable-handle ui-resizable-s"></div>'+
    '<div class="ui-resizable-handle ui-resizable-w"></div>'+
    '<div class="ui-resizable-handle ui-resizable-ne"></div>'+
    '<div class="ui-resizable-handle ui-resizable-se"></div>'+
    '<div class="ui-resizable-handle ui-resizable-sw"></div>'+
    '<div class="ui-resizable-handle ui-resizable-nw"></div>'
  );

  $(".ui-resizable-handle").css({
    "background-color": "rgba(0,0,0,.75)",
    "width": "8px",
    "height": "8px"
  });

  
  $(".ui-resizable-n").css({
    "top": "-8px"
  });
  $(".ui-resizable-e").css({
    "right": "-8px"
  });
  $(".ui-resizable-s").css({
    "bottom": "-8px"
  });
  $(".ui-resizable-w").css({
    "left": "-8px"
  });
  $(".ui-resizable-ne").css({
    "top": "-8px",
    "right": "-8px"
  });
  $(".ui-resizable-se").css({
    "bottom": "-8px",
    "right": "-8px"
  });
  $(".ui-resizable-sw").css({
    "bottom": "-8px",
    "left": "-8px"
  });
  $(".ui-resizable-nw").css({
    "left": "-8px",
    "top": "-8px"
  });

  this.setHandlesPosition = function(width, height){
    $('.ui-resizable-n').css('left', (width/2-4)+'px');
    $('.ui-resizable-e').css('top', (height/2-4)+'px');
    $('.ui-resizable-s').css('left', (width/2-4)+'px');
    $('.ui-resizable-w').css('top', (height/2-4)+'px');
  };

  var _this = this;

  this.el.mouseover(function(){
    _this.el.css("cursor", "move");
  });

  this.el.resizable({ 
    handles: {
      'n':'.ui-resizable-n', 
      'e':'.ui-resizable-e',
      's':'.ui-resizable-s',
      'w':'.ui-resizable-w',
      'ne': '.ui-resizable-ne',
      'se': '.ui-resizable-se',
      'sw': '.ui-resizable-sw',
      'nw': '.ui-resizable-nw'
    },
    grid: [ 10, 10 ],
    create: function( event, ui ) {
      var width = $(event.target).width();
      var height = $(event.target).height();
      _this.setHandlesPosition(width, height);
    },
    resize: function(event, ui){
      var $el = $(event.target);
      var x1 = $el.position().left;
      var y1 = $el.position().top;
      var w1 = $el.width();
      var h1 = $el.height();
      _this.setHandlesPosition(w1, h1);
      //
      _this.target.resize(_this.x0, _this.y0, _this.w0, _this.h0, x1, y1, w1, h1);
    },
    start: function( event, ui ) {
      var $el = $(event.target);
      _this.x0 = $el.position().left;
      _this.y0 = $el.position().top;
      _this.w0 = $el.width();
      _this.h0 = $el.height();
    },
    stop: function( event, ui ) {
      _this.target.snapshot();
    }

  });

  this.el.draggable({
    cursor: "move",
    grid: [ 10, 10 ],
    drag: function( event, ui ) {

      var left = ui.position.left;
      var top = ui.position.top;
      //
      var dx = ui.position.left - _this.originalPosition.left;
      var dy = ui.position.top - _this.originalPosition.top;
      _this.target.move(dx, dy);
    },
    start: function( event, ui ) {
      $t = $(event.target); 
      _this.originalPosition = {left: $t.position().left, top: $t.position().top};
    },
    stop: function( event, ui ) {
      _this.target.snapshot();
    }
  });
};

SelectBox.prototype.setPosition = function(left, top){
  this.el.css({
    'top': top+'px',
    'left': left+'px'
  });
};

SelectBox.prototype.setSize = function(width, height){
  this.el.css({
    'width': width+'px',
    'height': height+'px',
  });
  this.setHandlesPosition(width, height);
};

SelectBox.prototype.hide = function(){
  this.el.css({
    'display': 'none'
  });
};

SelectBox.prototype.show = function(){
  this.el.css({
    'display': 'block'
  });
};

SelectBox.prototype.stickTo = function(target){
  this.target = target;
  //将目标的位置大小 赋给 selectbox
  var bound = this.target.getBound();
  if(bound!=null) {
    this.setPosition(bound.left, bound.top);
    this.setSize(bound.width, bound.height);
    this.setHandlesPosition(bound.width, bound.height);
    this.show();
  }else{
    this.hide();
  }
};