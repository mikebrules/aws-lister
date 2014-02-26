Feature: As a web page I want to retrieve a list of Amazon resources from the server

Scenario: List types

  	Given I set accept json headers
  	When I request the index route
  	Then I should see the resource [Types]

  	Where:	
		Types
		EC2