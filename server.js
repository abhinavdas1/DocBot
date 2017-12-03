require('babel-core/register');
require("babel-polyfill");
var express  = require('express');
var app      = express();
var bodyParser = require('body-parser');
var router = require('./app/routes');
var jwt = require('jwt-simple');
var token =  require('./app/controllers/tokenController.js');


app.use(bodyParser.json());

app.use(token.getToken);

require('./app/routes.js')(app);


app.listen(process.env.PORT || 3000);
console.log("App listening on port 3000");