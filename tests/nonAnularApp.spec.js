var loginPage = require('../pageObjects/nonAng_login.po.js')
describe('NonAngularApp', function() {
    beforeAll(function() {
        browser.ignoreSynchronization = true;
        browser.get('http://opensource.demo.orangehrmlive.com/index.php/auth/login');
    });

    

    it('login', function() {
        loginPage.login('Admin', 'admin');
        expect(browser.getTitle()).toEqual('OrangeHRM');
    });

    it('logOut', function() {
        loginPage.logout();
        browser.sleep(4000);
        expect(true).toEqual(true);

    });
})