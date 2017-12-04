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
	else if(req.body.result.action === "Diagnosis" || req.body.result.action === "DiagnosisList")
	  	getDiagnosis(req, res);
	else if(req.body.result.action === "IssueInfo" || req.body.result.action === "Userasksquestion.Userasksquestion-yes" ||
		req.body.result.action === "Userasksquestion.Userasksquestion-yes.Userasksquestion-yes-yes")
		getIssueInfo(req, res);

    
  });
};