"use strict";
var Q = require('q')
var InvalidParamsException = require('exceptions/exception').InvalidParamsException;
var Loader = function(){
	
	return {
		/**
		*	Make the request to AWS. 
		*	@param ec2 The ec2 object on which to make the request
		*	@param filterFunction An optional function to filter the resultset
		*
		*/
		load:function (ec2,filterFunction) {
			//return Q.ninvoke(ec2, "describeInstances",{"Filters":[{"Name":"tags"}]});
			if(!filterFunction){
				return Q.ninvoke(ec2, "describeInstances");	
			} else {
				return Q.ninvoke(ec2, "describeInstances")
					.then(function(data){
						return filterFunction.apply(this,[JSON.parse(data)]);
					})
					.fail(function(error){
						console.dir(error);
					})
			}
		},
		state:""
	}
}();

module.exports = Loader;