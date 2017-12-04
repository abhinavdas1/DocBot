var request = require('request-promise');
var url = require("../../baseURLs.json");
async function getDiagnosis(req, res){

  let symptoms = new Array(req.body.result.parameters.Symptoms1);
  if (req.body.result.action == "DiagnosisList") {
    symptoms.push(req.body.result.parameters.Symptoms2);
  }

  const options = {
    method: 'GET',
    uri: url.baseUrl + url.loadDiagnosis,
    qs : {
    	symptoms : JSON.stringify(symptoms), 
    	gender : req.body.result.parameters.Gender,
    	year_of_birth : 2017-parseInt(req.body.result.parameters.Age.amount),
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
    res.status(200).send({"speech" : "Following is the Diagnosis", "followupEvent" : { "data" : {"issues" : JSON.parse(result) }, "name" : "diagnosisResult"}});

  }).catch(function(err){
    console.log("Diagnosis was not Obtained from API medic");
    res.status(400).send({"speech" : "Ahhh.. I did not exactly get what you are suffering through. It would be great if you can be more specific about your symptoms", "followupEvent" : { "data" : [] , "name" : "diagnosisResult"}});

    console.log(err);
  });

}


module.exports =  {
  "getDiagnosis" : getDiagnosis
};
