class addCustomer{
	 constructor(){
	 	this.addCustomerBtn = element(by.buttonText('Add Customer')),
	 	this.firstName = element(by.model('fName')),
	 	this.lastName = element(by.model('lName')),
	 	this.pCode = element(by.model('postCd')),
	 	this.submit = element(by.xpath('.//button[@class="btn btn-default"]'))
	 }

	 fillCustomerInfo(custInfo){
	 	bActions.clickOn(this.addCustomerBtn,'Click on Add Customer button');
	 	bActions.type(this.firstName,custInfo.firstName,'Enter '+custInfo.firstName+' in first Name');
	 	bActions.type(this.lastName,custInfo.lastName,'Enter '+custInfo.lastName+' in last Name');
	 	bActions.type(this.pCode,custInfo.pCode,'Enter '+custInfo.pCode+' in Post Code');
	 	browser.sleep(4000);
	 	bActions.clickOn(this.submit,'Click on Submit(Add Customer) button');
	 }
	 
	 getTitle(){
	 	return browser.getTitle();
	 }

}
module.exports = new addCustomer();