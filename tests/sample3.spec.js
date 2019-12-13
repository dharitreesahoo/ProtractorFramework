var loginPage = require('../pageObjects/login.po.js');
var loginData = require('../testData/login.json');

describe('First Suite', function() {
    beforeAll(function() {
        //browser.get(loginData.url);
        browser.get(browser.params.url);
        //browser.get(url);


    });
    it('First Step', function() {
        //loginPage.login(loginData.user1, loginData.password, loginData.user2);
        loginPage.login(loginData.user1, browser.params.password, browser.params.user2);

        expect(loginPage.homePageLbl.getText()).toEqual('Home');
    });
})

describe('Second Suite', function() {
    beforeAll(function() {
        browser.get(loginData.url);
    });
    
    it('Second Step', function() {
        loginPage.login(loginData.user1, loginData.password, loginData.user2);
        expect(loginPage.homePageLbl.getText()).toEqual(loginData.title);

        //expect(elementIsDisplayed('myElement')).toEqual(true)
    });
})