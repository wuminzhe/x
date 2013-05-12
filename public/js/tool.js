if (typeof String.prototype.start_with != 'function') {
  String.prototype.start_with = function (str){
    return this.slice(0, str.length) == str;
  };
}

function inspect(e, options) {
  if(options==null){
    options = {};
  }
  var onlykey = options['onlykey']==null ? false : options['onlykey']
  var prefix = options['prefix']==null ? '' : options['prefix']
  var msg = new Array();
  for (prop in e) {
    if(prop.start_with(prefix)){
      if(onlykey==true){
        msg.push(prop);
      }else{
        msg.push(prop + ": " + e[prop]);
      }
    }

  };

  if(onlykey==true){
    alert(msg.join(', '));
  }else{
    alert(msg.join('\n'));
  }

}

function extend(Child, Parent) {
  var F = function(){};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.constructor = Child;
  Child.uber = Parent.prototype;
}

function round_by_ten(num) {
  var tmp = Math.round(num/10);
  return [tmp*10, num-tmp*10];
}

function isType(obj, className){
  if(obj.constructor.toString().indexOf(className)!=-1){
    return true;
  }else{
    return false
  }
}