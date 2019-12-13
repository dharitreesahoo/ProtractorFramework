class openAccountPage{
	constructor(){
		this.openAccountBtn = element(by.buttonText('Open Account')),
		this.customerDropdown = element(by.id('userSelect')),
		this.currencyDropdown = element(by.id('currency')),
		this.processBtn = element(by.buttonText('Process'))
	}

	 openAccount(customerName,currency){
       bActions.clickOn(this.openAccountBtn,'Click on Open Account Button');
       bActions.selectItemByTextvalue(this.customerDropdown ,customerName);
       bActions.selectItemByTextvalue(this.currencyDropdown ,currency);
       browser.sleep(2000);
       bActions.clickOn(this.processBtn,'Click on Process button');
	}
}

module.exports = new openAccountPage();

