var request = require('request-promise');
var CryptoJS = require("crypto-js");
var url = require("../../baseURLs.json");
var config = require("../../config.json");

async function getToken(req, res, next){

  console.log("Trying to Obtain token");
  var uri = url.login;
  var api_key = config.username;      
  var computedHash = CryptoJS.HmacMD5(uri, config.password);
  var computedHashString = computedHash.toString(CryptoJS.enc.Base64);   

  const options = {
    method: 'POST',
    headers : {
            "Authorization" : "Bearer " +  api_key +  ":" +  computedHashString
    },
    uri: uri,
    json: true
  }

  request(options).then(function(result){
    console.log("Token Obtained ");
    req.token = result.Token;
    next();
  }).catch(function(err){
    console.log("Token was not Obtained from API medic");
    err.printStackTrace();
  });
  

}


module.exports =  {
  getToken : getToken
};