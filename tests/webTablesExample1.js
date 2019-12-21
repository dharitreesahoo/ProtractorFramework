
describe('EndToEndFlow', function () {
    beforeAll(function () {
        browser.get('http://www.way2automation.com/angularjs-protractor/webtables/');
    });

    it('delete row in webtable', function () {
		let rows  =element.all(by.repeater('dataRow in displayedCollection'));
		browser.sleep(2000);
		rows.each(function(row){
			let cell  = row.$$('td');
			cell.get(0).getText().then(function(txt){
				if(txt=='Tom'){
					cell.get(9).$('button').click();
					browser.sleep(20000);
				}
			})
		})
	});


});