fs = require('fs-extra');
var addCustomerPage = require('../pageObjects/addCustomer.po.js');

describe('flatFile', function() {
    beforeAll(function() {
        browser.get('http://www.way2automation.com/angularjs-protractor/banking/#/manager');
    });
    it('Add Customer', function() {

        var data = readData('./testData/flatFile.txt').split(',');
        addCustomerPage.addCustomerWithArguments(data[0], data[1], data[2]);
        browser.sleep(2000);
        var alert = browser.switchTo().alert();
        expect(alert.getText()).toContain('Customer added successfully with customer id :');
        alert.accept();

    });
})

function readData(filePath) {
    return fs.readFileSync(filePath, 'utf8', (err, data) => {
        if (err) console.log(err);
        return data.toString();
    });
};