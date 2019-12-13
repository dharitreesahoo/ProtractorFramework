describe('First Suite', function() {
    beforeAll(function() {
        browser.get(url);
    });
    it('First Step', function() {
        expect(browser.getTitle()).toEqual('ABCD');
        // element(by.model('Auth.user.name')).sendKeys('angular');
        // element(by.model('Auth.user.password')).sendKeys('password')
        // element(by.id('formly_1_input_username_0')).sendKeys('angular');
        // element(by.buttonText('Login')).click();
        // expect(element(by.xpath('.//h1')).getText()).toEqual('Home');
    })
})


/*element - driver.findElement
by  - By;
element.all - driver.findElements*/