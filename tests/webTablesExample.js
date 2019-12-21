
describe('EndToEndFlow', function () {
    beforeAll(function () {
        browser.get('http://www.way2automation.com/angularjs-protractor/webtables/');
    });

    it('delete row in webtable', function () {
        var name = 'some name';

		// This is like element.all(by.css(''))
		return $$('.table.table-stripe tr').filter(function (row) {
			// Get the second column's text.
			return row.$$('td').get(2).getText().then(function (rowName) {
				// Filter rows matching the name you are looking for.
				return rowName === name;
			});
		});
    });


});