var chai = require('chai')
var Resource = require('../models/resource');
var InvalidParamsException = require('../exceptions/exception').InvalidParamsException;
var TagsIdenticalException = require('../exceptions/exception').TagsIdenticalException;
var Q = require('q');
var fs = require('fs');
var Types = require('utils/util').Types;

var expect = chai.expect;

describe('Check Resource',function(){

	var fixture;

	before(function(done){
		//Q.ninvoke(fs.readFile("fixtures/ec2-response.json"))
		Q.nfcall(fs.readFile, "fixtures/ec2-response.json", "utf-8")
		.then(function(f){
			fixture = f;
			done();
		})
		.fail(function(error){
			console.log(error);
		})

	});

	it('requires a name and type', function(){
		expect((function(){
         	var r = new Resource();
        })).to.throw(new InvalidParamsException());
	});

	it('should have a name property', function(){
		var h = new Resource("",Types.S3);
		expect(h).to.have.property('name')
	})

	it('should have a type property', function(){
		var h = new Resource("",Types.S3);
		expect(h).to.have.property('type')
	})

	it('should only support EC2 and S3', function(){
		expect((function(){
			new Resource("",Types.DBA);
		})).to.throw(new InvalidParamsException());	

		expect((function(){
			new Resource("",Types.EC2);
		})).not.to.throw(new InvalidParamsException());	

		expect((function(){
			new Resource("",Types.S3);
		})).not.to.throw(new InvalidParamsException());	
	})

	it('should have a accessor only tags list', function(){
		var h = new Resource("",Types.EC2);
		expect(h).not.to.have.property('tags')
		expect(h).to.have.property('addTag')
	})

	it('should have be able to store more than one tag', function(){
		var h = new Resource("",Types.EC2);
		expect(h.getTags()).to.be.an('array')
	})

	it('should have two tags',function(){
		var h = new Resource("",Types.EC2);
		h.addTag('Name','Value');
		h.addTag('Company','Value');
		expect(h.getTags().length).to.equal(2);
	});

	it('should only accept tags that are objects',function(){
		expect(function(){
			var h = new Resource("",Types.EC2);
			h.addTag("");
		}).to.throw(new InvalidParamsException())
	})

	it('should not be able to store more than one tag of the same name',function(){
		expect(function(){
			var h = new Resource("",Types.EC2);
			h.addTag('Name','Value');
			h.addTag('Name','Value');
		}).to.throw(new TagsIdenticalException())
		
	})

	it('should have a parse method',function(){
		var h = new Resource("",Types.EC2);
		expect(h).to.have.property('parse')	
	})

})

describe('Can Parse an AWS response',function(){

	it('should recieve a json object',function(){
		var h = new Resource("",Types.EC2);
		expect(h.parse({"one":"value"})).to.be.true
	})

	it('should reject non objects',function(){
		var h = new Resource("",Types.EC2);
		expect(h.parse("")).to.be.false
	})
})