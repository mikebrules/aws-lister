"use strict";
var InvalidParamsException = require('../exceptions/exception').InvalidParamsException
var Types = require('utils/util').Types;

var Resource = function(name, type){

	//private
	var _name = "";
	var _type = "";
	var _tags = [];

	if(name === undefined || (Types[type] === undefined)){
		throw new InvalidParamsException();
	}


	var _parse = function(json){
		if(typeof json !== 'object'){
			return false;
		}
		return true;
	}

	var _getTags = function(){
		return _tags;
	}

	var _addTag = function(tag){
		if(!_tagIsObject(tag) ){
			throw new InvalidParamsException();		
		}
		_tags.push(tag)
	}

	var _tagIsObject = function(tag){
		return (typeof tag !== 'object') ? true : false;
	}


	//public
	return {
		name:_name,
		type:_type,
		parse:_parse,
		getTags: _getTags,
		addTag: _addTag
	}

}

module.exports = Resource;

