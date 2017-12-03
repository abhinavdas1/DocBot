import {getProposedSymptoms} from './controllers/symptomsController.js';
import {getDiagnosis} from './controllers/diagnosisController.js';
import {getIssueInfo} from './controllers/issueController.js';

var bodyParser = require('body-parser');

module.exports = function(app) {

  	app.post('/', function(req, res){
  
	let rows = {};
	console.log(req.body);
	if(req.body.result.action === "ProposedSymptoms")
	  	getProposedSymptoms(req, res);
	else if(req.body.result.action === "Diagnosis")
	  	getDiagnosis(req, res);
	else if(req.body.result.action === "IssueInfo")
		getIssueInfo(req, res);

    
  });
};