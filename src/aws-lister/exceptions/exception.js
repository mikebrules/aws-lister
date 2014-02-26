var InvalidParamsException = function(){
	return {
		message:"Params were not as expected"
	}
}

var TooFewArgumentsException = function(){
	return {
		message:"Too few arguments"
	}
}

var TagsIdenticalException = function(){
	return {
		message:"You can only have one tag or each Name"
	}
}

module.exports.InvalidParamsException = InvalidParamsException;
module.exports.TooFewArgumentsException = TooFewArgumentsException;
module.exports.TagsIdenticalException = TagsIdenticalException;