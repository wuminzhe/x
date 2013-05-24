function Menu(paper, left, top, width, height) {
  Block.apply(this, arguments);
  this.type = "Menu";
  
  this.menus = [
    {
      "title": "菜单一",
      "link": "http://www.52mxp.com"
    },
    {
      "title": "菜单二"
    },
    {
      "title": "菜单三"
    }
  ];
}

extend(Menu, Block);

Menu.prototype.render = function() {
  Block.prototype.render.call(this, arguments);
  this.el.addClass("menu");
  this.el.addClass("border-solid");
  
  this.update();
};

Menu.prototype.update = function() {
  Block.prototype.update.call(this, arguments);
  
  this.contentEl.empty();
  var html = ['<ul class="menu-vertical">'];
  for( var i=0; i<this.menus.length; i++ ) {
    var menu = this.menus[i];
    html.push('  <li>'+menu["title"]+'</li>');
  }
  html.push('</ul>');
  this.menuEl = $(html.join("\n"));
  
  this.contentEl.append(this.menuEl);
  
  
};

Menu.prototype.clone = function() {
  return new Menu(this.paper, this.left, this.top, this.width, this.height);
};