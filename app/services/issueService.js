var request = require('request-promise');
var url = require("../../baseURLs.json");


async function getInfo(req, res){

  let eventName;

  if (req.body.result.parameters.MoreDetail) {
    eventName = "moreIssueInfo";
  }
  else if (req.body.result.parameters.MoreSymptoms){
    eventName = "issueRelatedSymtoms";
  }
  else if (req.body.result.parameters.Treatment){
    eventName = "issueTreatment";
  }
  const options = {
    method: 'GET',
    uri: url.baseUrl + url.loadIssueInfo + "/" + req.body.result.parameters.Symptoms + "/info",
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
    result = JSON.parse(result);
    result["Symptoms"] = req.body.result.parameters.Symptoms;
    if (req.body.result.parameters.MoreSymptoms){
      result.PossibleSymptoms = result.PossibleSymptoms.split(",").slice(0,3);
    }
    res.status(200).send({
                        "followupEvent" : { 
                          "data" : result,
                          "name" : eventName
                          }
                        });

  }).catch(function(err){
    console.log("sIssue Information was not Obtained from API medic");
        res.status(400).send({"speech" : "Issue Information Not found or Issue Id is wrong", "followupEvent" : { "data" : [] }, "name" : "issueInformation"});

    console.log(err);
  });

}


module.exports =  {
  "getInfo" : getInfo
};
