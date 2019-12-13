class login {
    constructor() {
        this.user = element(by.id('txtUsername'));
        this.pwd = element(by.id('txtPassword'));
        this.loginBtn = element(by.id('btnLogin'));
        this.welcomeIcon = element(by.id('welcome'));
        this.logoutLnk = element(by.linkText('Logout'));
    }

    login(user, pwd) {
        this.user.sendKeys(user)
        this.pwd.sendKeys(pwd);
        this.loginBtn.click();
    }

    logout() {
        this.welcomeIcon.click();
        browser.sleep(500);
        this.logoutLnk.click();
    }
}

module.exports = new login();