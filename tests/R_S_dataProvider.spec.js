var loginPage = require('../pageObjects/login.po.js');
var loginData = require('../testData/dataProviderTestData.json');
var loginData2 = require('../testData/dataProviderTestData2.json');


describe('First Suite', function() {
    beforeAll(function() {
        //browser.get('http://www.way2automation.com/angularjs-protractor/registeration/#/login');
    });
    dataProvider(loginData, function(data, description) {
        it('First Step', function() {
            browser.get(url);
            console.log('Description :' + description);
            loginPage.login(data.user1, data.password, data.user2);
            expect(loginPage.homePageLbl.getText()).toEqual(data.title);
        });
    });
});



// pass DataObject to a method instead of individual parameters

fdescribe('Second Suite', function() {
    beforeAll(function() {
        //browser.get('http://www.way2automation.com/angularjs-protractor/registeration/#/login');
    });
    dataProvider(loginData2, function(data, description) {
        it('First Step', function() {
            browser.get(url);
            console.log('Description :' + description);
            loginPage.loginWithDataObject(data);
            expect(loginPage.homePageLbl.getText()).toEqual(data.title);
        });
    });
});