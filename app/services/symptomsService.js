var request = require('request-promise');
var url = require("../../baseURLs.json");


async function getProposedSymptoms(req, res){


  const options = {
    method: 'GET',
    uri: url.baseUrl + url.loadProposedSymptoms,
    qs : {
    	symptoms : JSON.stringify([13]), 
    	gender : "male",
    	year_of_birth : 1994,
    	language : "en-gb",
    	format : "json",
    	token : req.token
    },
    headers : {
            "Authorization" : req.token
    }
  }

  return  request( options ).then(function(result){
    console.log("Proposed Symptoms Obtained ");
    res.status(200).send({"speech" : "Following are the Proposed Symptoms", "followupEvent" : { "data" : JSON.parse(result) }, "name" : "Proposed Symptoms"});

  }).catch(function(err){
    console.log("symptoms was not Obtained from API medic");
        res.status(400).send({"speech" : "Proposed Symptoms Not found or Symptom Id is wrong", "followupEvent" : { "data" : [] }, "name" : "Proposed Symptoms"});

    console.log(err);
  });

}


module.exports =  {
  "getProposedSymptoms" : getProposedSymptoms
};
