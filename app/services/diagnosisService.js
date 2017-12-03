var request = require('request-promise');
var url = require("../../baseURLs.json");
async function getDiagnosis(req, res){


  const options = {
    method: 'GET',
    uri: url.baseUrl + url.loadDiagnosis,
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
    console.log("Diagnosis Obtained ");
    res.status(200).send({"speech" : "Following is the Diagnosis", "followupEvent" : { "data" : JSON.parse(result) }, "name" : "Diagnosis"});

  }).catch(function(err){
    console.log("Diagnosis was not Obtained from API medic");
    res.status(400).send({"speech" : "Diagnosis Not found or Symptom Id is wrong", "followupEvent" : { "data" : [] }, "name" : "Diagnosis"});

    console.log(err);
  });

}


module.exports =  {
  "getDiagnosis" : getDiagnosis
};
