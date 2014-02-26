var casper_chai = require('casper-chai');
var chai = require('chai');
var English = require('yadda').localisation.English;
var util = require('util')
var fs = require('fs')

module.exports = (function() {

	chai.use(casper_chai);
  chai.use(require('chai-fuzzy'));

	var expect = chai.expect
	var should  = chai.should;


  var req_params;

  	return English.library()
      .given("I set accept json headers",function(next){
          req_params = {
            method: 'get',
            headers: {
              'Accept': 'json'
            }
          };
      })
    	.when("I request the index route",function(next){
    		  casper.open("http://127.0.0.1:3000/",req_params)
    	})
    	.then("I should see the resource $TYPES",function(type, next){
      		  casper.then(function(){
            var content = JSON.parse(this.getPageContent());
            expect(content.content).to.have.property("Reservations");
            expect(content.content.Reservations[0]).to.have.property("Instances");
          })
    	})
    	
})();

