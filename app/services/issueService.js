var request = require('request-promise');
var url = require("../../baseURLs.json");


async function getInfo(req, res){


  const options = {
    method: 'GET',
    uri: url.baseUrl + url.loadIssueInfo + "/" + req.body.issueID + "/info",
    qs : {
    	language : "en-gb",
    	format : "json",
    	token : req.token
    },
    headers : {
            "Authorization" : req.token
    }
  }

  return  request( options ).then(function(result){
    console.log("Issue Information Obtained ");
    res.status(200).send({"speech" : "Following are the DEtails about the Issues", "followupEvent" : { "data" : JSON.parse(result) }, "name" : "Issue Information"});

  }).catch(function(err){
    console.log("sIssue Information was not Obtained from API medic");
        res.status(400).send({"speech" : "Issue Information Not found or Issue Id is wrong", "followupEvent" : { "data" : [] }, "name" : "Issue Information"});

    console.log(err);
  });

}


module.exports =  {
  "getInfo" : getInfo
};
