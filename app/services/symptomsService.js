var request = require('request-promise');
var url = require("../../baseURLs.json");


async function getProposedSymptoms(req, res){

  let symptoms = new Array(req.body.result.parameters.Symptoms);
  console.log("symptoms" + symptoms);
  const options = {
    method: 'GET',
    uri: url.baseUrl + url.loadProposedSymptoms,
    qs : {
    	symptoms : JSON.stringify(symptoms), 
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
  console.log("request:" + options)
  return  request( options ).then(function(result){
    result = JSON.parse(result);
    let speech = "okay! So, are you feeling any of these " + result[0].Name + ", " + result[1].Name + " or, " + result[2].Name +"?"; 
    res.status(200).send({"speech" : "Following are the Proposed Symptoms", "followupEvent" : { "data" : {"symptomsProp" : speech} , "name" : "symtomProposal"}});

  }).catch(function(err){
    console.log("symptoms was not Obtained from API medic");
        res.status(400).send({"speech" : "Proposed Symptoms Not found or Symptom Id is wrong", "followupEvent" : { "data" : [] }, "name" : "Proposed Symptoms"});

    console.log(err);
  });

}


module.exports =  {
  "getProposedSymptoms" : getProposedSymptoms
};
