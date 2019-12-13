describe('Temp', function(){
	beforeAll(function(){
		browser.get('http://www.way2automation.com/angularjs-protractor/registeration/#/login');

	})
	it('Get Title', function(){
	// 	browser.getTitle().then(function(val){ // Reference 
	// 	console.log('Title '+val);
	// });


	//Expect logic
	// 	browser.getTitle().then(function(val){ // Reference 
	// 	return val;
	// });
	// var title = browser.getTitle();
	expect(browser.getTitle()).toContain('Registration');
	})
})