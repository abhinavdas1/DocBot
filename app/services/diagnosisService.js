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
    result = JSON.parse(result);
    let speech = [];
    if (result.length > 2) {
      speech.push("Umm, most likely you are suffering through " 
        + result[0].Issue.Name 
        + ".If not this, you might be having " 
        + result[1].Issue.Name + " or "
        + result[2].Issue.Name + ".If you want, I can tell you more about these or how these can be treated?");
      
      speech.push("High chances are that you are suffering through " 
        + result[0].Issue.Name 
        + ". It could also be " 
        + result[1].Issue.Name + " or "
        + result[2].Issue.Name + ".If you want I can tell you more about these or how you can treat them.");

    }else if (result.length == 2){
      speech.push("Most probably you are suffering through " 
        + result[0].Issue.Name
        + ". It is also possible that you are having" 
        + result[1].Issue.Name); 
    }else {
      speech.push("High chances are that you are suffering through " 
        + result[0].Issue.Name); 
    }
    console.log("Speech" + speech[Math.floor(Math.random()*speech.length)])
    res.status(200).send({"speech" : speech[Math.floor(Math.random()*speech.length)], "followupEvent" : {"data" : {"Issues" : speech}, "name" : "diagnosisResult"}});

  }).catch(function(err){
    console.log("Diagnosis was not Obtained from API medic");
    res.status(400).send({"speech" : "Ahhh.. I did not exactly get what you are suffering through. It would be great if you can be more specific about your symptoms", "followupEvent" : { "data" : [] , "name" : "diagnosisResult"}});

    console.log(err);
  });

}


module.exports =  {
  "getDiagnosis" : getDiagnosis
};
