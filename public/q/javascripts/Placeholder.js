var Placeholder = function(domId, paper) {
  Rectangle.apply(this, arguments);
  this.el.addClass("placeholder");
  this.contentEl.append($('<img src="./images/placeholder.svg" alt="placeholder">'));
}

extend(Placeholder, Rectangle);