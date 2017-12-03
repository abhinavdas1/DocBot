require('async');
var bodyParser = require('body-parser');
var symptoms = require("../services/symptomsService.js");

async function getProposedSymptoms(req, res){
	
	console.log("Getting Proposed Symtoms");
  return await symptoms.getProposedSymptoms(req, res);

}

module.exports =  {
  getProposedSymptoms : getProposedSymptoms
};