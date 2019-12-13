var addCustomerPage = require('../pageObjects/addCustomer.po.js');
var openAccountPage = require('../pageObjects/openAccount.po.js');
var customerPage = require('../pageObjects/customerDetails.po.js');
var accNumber;
var testData = [{
    "firstName": "Somesh",
    "lastName": "Marati",
    "pCode": "878787",
    "fullName": "",
    "currency": "Pound"
}, {
    "firstName": "Naresh",
    "lastName": "Kanagala",
    "pCode": "565656",
    "fullName": "",
    "currency": "Rupee"
}]
describe('EndToEndFlow', function() {
    beforeAll(function() {
        browser.get('http://www.way2automation.com/angularjs-protractor/banking/#/manager');
    });

    dataProvider(testData, function(data) {
        it('Add Customer', function() {
            addCustomerPage.fillCustomerInfo(data);
            var alert = browser.switchTo().alert();
            expect(alert.getText()).toContain('Customer added successfully with customer id :');
            alert.accept();
        });

        it('Open Account', function() {
            data.fullName = data.firstName + ' ' + data.lastName;
            openAccountPage.openAccount(data.fullName, data.currency);

            var alert = browser.switchTo().alert();
            accNumber = alert.getText().then(function(accNum) {
                //  Account created successfully with account Number:1234
                // [Account created successfully with account Number,1234]
                accNum = accNum.split(':');
                // console.log('Complete Array : '+accNum);
                // console.log('accNum : '+accNum[1]);
                return accNum[1];
            });
            //browser.sleep(3000);
            expect(alert.getText()).toContain('Account created successfully with account Number');
            alert.accept();
        });

        it('Vaidate Column Headers', function() {
            bActions.clickOn(customerPage.customerBtn);
            customerPage.getColumnHeaders().then(function(colHeaders) {
                //console.log('Column Headers: '+colHeaders);
            });
            expect(customerPage.getColumnHeaders()).toContain('First Name', 'Last Name', 'Post Code', 'Account Number', 'Delete Customer');
        });
   
        it('Vaidate Account Number ', function() {
        	browser.sleep(10000);

            customerPage.getCellValue('Last Name', data.lastName, 'Account Number').then(function(acNumber){
                console.log('Actual Account Number :'+acNumber);
            });

            expect(customerPage.getCellValue('Last Name', data.lastName, 'Account Number')).toEqual(accNumber);
        });

        // it('Delete Customer', function() {
        //     expect(customerPage.deleteRecord('First Name', data.firstName)).toEqual(true);
        // });

    });

})