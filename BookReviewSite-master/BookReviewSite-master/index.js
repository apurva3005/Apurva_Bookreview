var express= require('express');
const session = require('express-session');
var app=express();
var server = require('http').createServer(app);
server.listen(process.env.Port||3000);
console.log("server running...");

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index2.html');
});
app.use( express.static( __dirname + '/client' ));


