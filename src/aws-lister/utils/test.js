var AWS = require('aws-sdk');

new AWS.EC2(
		{ 
			region: 'eu-west-1' , 
			secretAccessKey:"1T4/aojuWHPTqV3tBgs9rVFSGQJaBXhTAt3S11FO", 
			accessKeyId:"AKIAILQRT3KJCAI3DYJQ"
		}
	).describeInstances(function(error, data) {
		if (error) {
			console.log(error); // an error occurred
		} else {
			console.log(data); // request succeeded
		}
	});