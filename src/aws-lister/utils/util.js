var AWS = require('aws-sdk');

exports.Config = function(){
	return AWS.config.loadFromPath('./config/awsconfig.json');
}();


exports.Types = function(){
	return {
		EC2:"EC2",
		S3:"S3"
	}
}();