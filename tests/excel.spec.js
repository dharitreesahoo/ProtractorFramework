const XlsxPopulate = require('xlsx-populate');
var commons = require('../utils/commons.js');
var addCustomerPage = require('../pageObjects/addCustomer.po.js');

var fileName = rootPath + '/testData/customerInfo.xlsx';
var fName,lName,pCode;

//var fileName2 = rootPath + '/testData/accountResult.xlsx';

describe('EndToEndFlow', function() {

    beforeAll(function() {
        XlsxPopulate.fromFileAsync(fileName).then(workbook => {
            //read from the workbook. 
            console.log('============BeforeAll================');
            fName = workbook.sheet('Sheet1').cell('A1').value();
            console.log('fName' + fName);
            lName = workbook.sheet('Sheet1').cell('B1').value();
            console.log('lName' + lName);
            pCode = workbook.sheet('Sheet1').cell('C1').value();
            console.log('pCode' + pCode);
        });
        browser.sleep(5000);
    });


    it('Add Customer', function() {
        browser.get('http://www.way2automation.com/angularjs-protractor/banking/#/manager');
        bActions.clickOn(addCustomerPage.addCustomerBtn);
        bActions.type(addCustomerPage.firstName, fName);
        bActions.type(addCustomerPage.lastName, lName);
        bActions.type(addCustomerPage.pCode, pCode);
        bActions.clickOn(addCustomerPage.submit);
        var alert = browser.switchTo().alert();
        expect(alert.getText()).toContain('Customer added successfully with customer id :');
        alert.accept();
        XlsxPopulate.fromFileAsync(fileName).then(workbook => {
            workbook.sheet('Sheet1').cell('D1').value('PASS');
            return workbook.toFileAsync(fileName);
        });

        browser.sleep(5000);
    });
});