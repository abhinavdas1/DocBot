require('async');
var bodyParser = require('body-parser');
var diagnosis = require("../services/diagnosisService.js");

async function getDiagnosis(req, res){
	
	console.log("Getting Diagnosis");
  	return await diagnosis.getDiagnosis(req, res);

}

module.exports =  {
  getDiagnosis : getDiagnosis
};