var addCustomerPage = require('../pageObjects/addCustomer.po.js');
var fs = require('fs-extra');
var dataObj;

describe('EndToEndFlow', function() {
    beforeAll(function() {
        convertXLSXToJson();
    });

    afterAll(function() {
        xlsx = require('tfk-json-to-xlsx')
        // fs.writeJson('./outPut.json', dataObj)
        //     .then(() => {
        xlsx.write('./myOutPut.xlsx', JSON.stringify(dataObj), function(error) {
            // Error handling here
            if (error) {
                console.error(error)
            }
        });
        // })
        // .catch(err => {
        //     console.error(err)
        // })
    });


    it('Add Customer', function() {

        var testDataRef = require('../testData/xlsxtoJson.json');
        //var testData = JSON.stringify(data[0]);
        //console.log('\nAll Rows:' + JSON.stringify(data));
        //console.log('\nRow:' + JSON.stringify(data[0]));
        //addCustomerPage.addCustomer(data[0].toString());
        //console.log('Specific Element (Fname) : ' + JSON.stringify(data[1].fName));
        //var dataObj = JSON.stringify(data[0]);
        //console.log(dataObj);
        dataProvider(testDataRef, function(data) {
            browser.get('http://www.way2automation.com/angularjs-protractor/banking/#/manager');
            addCustomerPage.fillCustomerInfo(data);
            var alert = browser.switchTo().alert();
            expect(alert.getText()).toContain('Customer added successfully with customer id :');
            alert.accept();
            data.Status = "PASSED";
            dataObj = dataObj + data;
        });


        //addCustomerPage.addCustomerWithArguments(JSON.stringify(data[0].fName), JSON.stringify(data[0].lName), JSON.stringify(data[0].pCode));
    });

});


//inputFile = "E:\\May2018Batch\\testData\\xlsxtoJson.xlsx";
//output: "E:\\May2018Batch\\testData\\xlsxtoJson.json"
function convertXLSXToJson() {

    xlsxj = require("xlsx-2-json");
    console.log(' I am in');
    xlsxj({
        input: "E:\\May2018Batch\\testData\\xlsxtoJson.xlsx",
        output: "E:\\May2018Batch\\testData\\xlsxtoJson.json"
    }, function(err, result) {
        if (err) {
            console.error(ERROR);
        }
    });
};