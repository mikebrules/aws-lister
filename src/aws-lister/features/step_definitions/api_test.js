var fs = require('fs');
//var casper = require('casper').create();
var async = require('async');
var Yadda = require('yadda');
var xpath = require('casper').selectXPath; 

var parser = new Yadda.parsers.FeatureParser();
var library = require('api_library');

var yadda = new Yadda.Yadda(library);

Yadda.plugins.casper(yadda, casper);

new Yadda.FeatureFileSearch('features/step_definitions').each(function(file) {
    console.log(file)
	var feature = parser.parse(fs.read(file));
    
    casper.test.begin(feature.title, function suite(test) {
        async.eachSeries(feature.scenarios, function(scenario, next) {
            casper.start();
            casper.test.info(scenario.title);
            casper.yadda(scenario.steps);
            casper.run(function() {
                next();
            });
        }, function(err) {
            casper.test.done();
        });
    });
});