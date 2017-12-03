require('async');
var bodyParser = require('body-parser');
var issue = require("../services/issueService.js");

async function getIssueInfo(req, res){
	
	console.log("Getting Issue Information");
  	return await issue.getInfo(req, res);

}

module.exports =  {
  getIssueInfo : getIssueInfo
};