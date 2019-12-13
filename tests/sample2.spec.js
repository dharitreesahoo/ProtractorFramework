var loginPage = require('../pageObjects/login.po.js');
describe('First Suite', function() {
    beforeAll(function() {
        browser.get('http://www.way2automation.com/angularjs-protractor/registeration/#/login');
    });
    it('First Step', function() {
        loginPage.user1.sendKeys('angular');
        loginPage.password.sendKeys('password')
        loginPage.user2.sendKeys('angular');
        loginPage.loginBtn.click();
        expect(loginPage.homePageLbl.getText()).toEqual('Home');
    })
})


/*element - driver.findElement
by  - By;
element.all - driver.findElements*/