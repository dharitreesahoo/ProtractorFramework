class customer {
    constructor() {
        this.customerBtn = element(by.buttonText('Customers'));
        this.searchBox = element(by.model('searchCustomer'));
        this.tableHeader = element.all(by.xpath('.//table[@class="table table-bordered table-striped"]/thead/tr/td'));
    }

    getColumnHeaders() {
        return this.tableHeader.getText();
    }

    getCellValue(columnName1, columnValue, columnName2) {
        return this.getColumnHeaders().then(function(val) {
            console.log('All Column Headers: ' + val);
            // 'First Name', 'Last Name', 'pcode', 'Account Number',
            var providedColumnNameIndex = val.indexOf(columnName1);
            console.log('Provided Column idx : ' + providedColumnNameIndex);
            var requestedColumnNameIndex = val.indexOf(columnName2);
            console.log('Requested Column idx : ' + requestedColumnNameIndex);

            return element.all(by.xpath('.//table[@class="table table-bordered table-striped"]/tbody/tr/td[' + (providedColumnNameIndex + 1) + ']')).getText().then(function(columnValues) {
                console.log('-->'+columnValues);
                var rowIndex = columnValues.indexOf(columnValue);
                console.log('Row Index : ' + rowIndex);
                return element(by.xpath('.//table[@class="table table-bordered table-striped"]/tbody/tr[' + (rowIndex + 1) + ']/td[' + (requestedColumnNameIndex + 1) + ']')).getText();

            });
        });
    }

    deleteRecord(columnName, columnValue) {
        return this.getColumnHeaders().then(function(val) {
            var columnName2 = 'Delete Customer';
            console.log('All Column Headers: ' + val);
            'First Name', 'Last Name', 'pcode', 'Account Number',
            console.log('CoumnNames : ' + val);
            var providedColumnNameIndex = val.indexOf(columnName);
            console.log('Provided Column idx : ' + providedColumnNameIndex);
            var requestedColumnNameIndex = val.indexOf(columnName2);
            console.log('Requested Column idx : ' + requestedColumnNameIndex);
            return element.all(by.xpath('.//table[@class="table table-bordered table-striped"]/tbody/tr/td[' + (providedColumnNameIndex + 1) + ']')).getText().then(function(columnValues) {
                var rowIndex = columnValues.indexOf(columnValue);
                console.log('Row Index : ' + rowIndex);
                return element(by.xpath('.//table[@class="table table-bordered table-striped"]/tbody/tr[' + (rowIndex + 1) + ']/td[' + (requestedColumnNameIndex + 1) + ']/button')).click();
            });
        });
    }
}

module.exports = new customer();