require('async');
var bodyParser = require('body-parser');
var token = require("../services/tokenService.js");

async function getToken(req, res, next){

  return await token.getToken(req, res, next);

}

module.exports =  {
  getToken : getToken
};