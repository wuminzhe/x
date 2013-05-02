var express = require('express');

var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public')); //注意顺序，为了能够用到404，要把这个提前。
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  console.log("Warning: Server in Development Mode, add NODE_ENV=production",true);
});

app.configure('production', function(){
  app.use(express.errorHandler());
  console.log("Production Mode");
});

app.get('/*', function(req, res){
  res.end("404");
});

app.listen(3002);
console.log('Listening on port 3002');