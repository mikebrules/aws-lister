var chai = require('chai')
var Loader = require('../utils/loader');
var InvalidParamsException = require('../exceptions/exception').InvalidParamsException;
var util = require('util')
var sinon = require('sinon')
var AWS = require('aws-sdk')
var fs = require('fs')
var Q = require('q')

var Config = require('utils/util').Config

var expect = chai.expect;

        
describe('Load methods', function () {

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

	})
	

	it('should get a successful response', function (done) {

		//this.timeout(10000);
		
		var ec2 = new AWS.EC2(Config);

		var stub = sinon.stub(ec2,"describeInstances").yields(0,fixture);

		Loader.load(ec2)
			.then(function(data){
				var json = JSON.parse(data);
				expect(json.Reservations.length).to.equal(69);
				done();
			})
			.fail(function(error){
				console.log(error);
			});
	});

	it('should accept a second parameter to filter the collection', function (done) {

		this.timeout(10000);
		
		var ec2 = new AWS.EC2(Config);

		var stub = sinon.stub(ec2,"describeInstances").yields(0,fixture);

		/**
		*	Pass a second param to filter the resultset
		*
		*/
		Loader.load(ec2, 
			function(rawData){
				var reservations = [];
				reservations.push(rawData.Reservations[0]);
				return {"Reservations":reservations};
			})
			.then(function(data){
				expect(data.Reservations.length).to.equal(1);
				done();
			})
			.fail(function(error){
				console.log(error)
			});
	});
});


describe('Check Type',function(){

	it('should be a static library',function(){
		expect(Loader).to.be.a('object');
	});

	it('should be have a state option',function(){
		expect(Loader).to.have.property('state');
	});

	it('should have a load method',function(){
		expect(Loader).to.have.property('load');
	});

});
