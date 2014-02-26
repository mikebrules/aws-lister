var AWS = require('aws-sdk')
var Loader = require('utils/loader')
var Q = require('q');
var Config = require('utils/util')
var fs = require('fs');
/*
 * GET home page.
 */
exports.index = function(req, res){

	var ec2 = new AWS.EC2(Config);
	Loader.load(ec2)
  	.then(function(data){
  		res.json({"success":true,"content":data});
  	})
  	.fail(function(error){
  		res.setHeader('Content-Type', 'application/json');
  		res.json({"success":false,"reason":error});	
  	})

};