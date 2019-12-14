class addCustomer {
	//click the delete button based on a given name. What's the best way to find this in Protractor?
	//got this code in stack overflow
	//https://stackoverflow.com/questions/25878496/how-to-handle-table-data-in-protractor
	//http://www.protractortest.org/#/api?view=ElementArrayFinder.prototype.filter
	table() {
		var name = 'some name';

		// This is like element.all(by.css(''))
		return $$('.table.table-stripe tr').filter(function (row) {
			// Get the second column's text.
			return row.$$('td').get(2).getText().then(function (rowName) {
				// Filter rows matching the name you are looking for.
				return rowName === name;
			});
		}).then(function (rows) {
			// This is an array. Find the button in the row and click on it.
			rows[0].$('button').click();
		});
	}

	deleteFriend = function(nameString) {
        return this.rows.filter(function(row) {
            // find the row with the name we want...
            return row.$$('td').get(1).getText().then(function(name) {
                return name === nameString;
            });
        }).then(function(filteredRows) {
            filteredRows[0].$('i.icon-trash').click();
        });
    };
}
