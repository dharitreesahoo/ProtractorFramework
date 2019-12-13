class loginPage {
    constructor() {
        this.userNameTxt = element(by.model('Auth.user.name')),
            this.passwordTxt = element(by.model('Auth.user.password')),
            this.userName2Txt = element(by.id('formly_1_input_username_0')),
            this.loginBtn = element(by.buttonText('Login')),
            this.homePageLbl = element(by.xpath('.//h1'))
    }

    // login(userName, password, userName2) {
    //     this.userNameTxt.sendKeys(userName);
    //     logger.info('Enter '+userName+' at user1 field');
    //     this.passwordTxt.sendKeys(password);
    //     logger.info('Enter '+password+' at password field');
    //     this.userName2Txt.sendKeys(userName2);
    //     logger.info('Enter '+userName2+' at user2 field');
    //     browser.sleep(4000);
    //     this.loginBtn.click();
    //     logger.info('Clicked on Login button');
    // }

     login(userName, password, userName2) {
        bActions.type(this.userNameTxt,userName,'Enter '+userName+' at user1 field');
        //this.userNameTxt.sendKeys(userName);
        bActions.type(this.passwordTxt,password,'Enter '+password+' at password field');
        //this.passwordTxt.sendKeys(password);
        bActions.type(this.userName2Txt,userName2,'Enter '+userName2+' at user2 field');
        browser.sleep(5000);
        //this.userName2Txt.sendKeys(useclickOnrName2);
        bActions.clickOn(this.loginBtn,'Clicking on Login Button');
        //this.loginBtn.click();
    }

    loginWithDataObject(dataObj) {
        this.userNameTxt.sendKeys(dataObj.userName);
        this.passwordTxt.sendKeys(dataObj.password);
        this.userName2Txt.sendKeys(dataObj.userName2);
        browser.sleep(4000);
        this.loginBtn.click();
    }
}

module.exports = new loginPage();