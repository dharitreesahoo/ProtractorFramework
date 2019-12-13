class BrowserActions {


    // waitAndFindElement(oElement, timeout) {
    //     var EC = protractor.ExpectedConditions;
    //     timeout = timeout || MAXWAITTIME;
    //     return browser.wait(EC.elementToBeClickable(oElement), timeout);
    // };

    waitAndFindElement(oElement, timeout) {
        var errMsg;
        timeout = timeout || 20000;
        return browser.wait(function() {
            return oElement.isPresent().then(function(isDisplayed) {
                    logger.info('INFO', 'Element Found');
                    return isDisplayed;
                },
                function(error) {
                    browser.sleep(2000);
                    logger.error('ERROR', error.message);
                    return false
                });
        }, timeout);
    }

    clickOn(oElement, message) {
        try {
            this.waitAndFindElement(oElement, MAXWAITTIME).then(function(flag) {
                message = message || 'Performed Click Operation ';
                if (flag) {
                    oElement.click().then(function() {
                        logger.info('PASS', message);
                    });
                }
            });
        } catch (error) {
            logger.info('ERROR', error.message);
        }
    };

    clearText(oElement, message) {
        this.waitAndFindElement(oElement, MAXWAITTIME).then(function(flag) {
            message = message || 'Clearing the Text field';
            if (flag) {
                return oElement.clear().then(function() {
                    logger.info('PASS', message);
                    return true;
                });
            } else {
                logger.info('ERROR', "Unable to perform clear operation on ext field " + oElement);
                return false;
            }
        })
    };

    type(oElement, value, message) {
        this.waitAndFindElement(oElement, MAXWAITTIME).then(function(flag) {
            message = message || 'Entering ' + value + ' in text field';
            if (flag) {
                return oElement.sendKeys(value).then(function() {
                    logger.info('PASS', message);
                    return true;
                });
            } else {
                logger.info('ERROR', "Unable to Enter text " + oElement);
                return false;
            }
        })
    };

    check(oElement, message) {
        this.waitAndFindElement(oElement, MAXWAITTIME).then(function(flag) {
            message = message || 'Check the checkbox element' + oElement;
            oElement.getAttribute('class').then(function(classAttr) {
                if ((classAttr.toString()).indexOf("ng-not-empty") < 0) {
                    return oElement.click().then(function() {
                        logger.info('PASS', message);
                        return true;
                    });
                } else {
                    logger.info('ERROR', "Checkbox is already in checked state");
                    return false;
                }
            });
        });
    };

    unCheck(oElement, message) {
        this.waitAndFindElement(oElement, MAXWAITTIME).then(function(flag) {
            message = message || 'unCheck the checkbox element' + oElement;
            oElement.getAttribute('class').then(function(classAttr) {
                if ((classAttr.toString()).indexOf("ng-not-empty") > 0) {
                    return oElement.click().then(function() {
                        logger.info('PASS', message);
                        return true;
                    });
                } else {
                    logger.info('ERROR', "Checkbox is already in unchecked state");
                    return false;
                }
            });
        });
    };

    getTableHeader() {

        browser.sleep(10000);

        return element.all(by.xpath('.//div[@wj-part="ch"]//div[@class="wj-cell wj-header"]')).reduce(function(acc, elem) {
            return elem.getText().then(function(text) {
                console.log('==>' + acc);
                return acc + text + ',';
            });
        }, '');
    };

    getAllOptionsDropdown(oElement, message) {
        this.waitAndFindElement(oElement, MAXWAITTIME).then(function(flag) {
            message = message || 'Fetching all options from dropdown';
            if (flag) {
                try {
                    return oElement.all(by.tagName('option')).then(function(values) {
                        logger.info('PASS', message);
                        return values.getText();
                    });
                } catch (err) {
                    logger.info('ERROR', "Failed to fetch all options from dropdown " + oElement);
                    return null;
                };
            }
        });
    };

    getSelectedOptions(oElement, message) {
        this.waitAndFindElement(oElement, MAXWAITTIME).then(function(flag) {
            message = message || 'Fetching the selected Items/Options from dropdown';
            if (flag) {
                try {
                    return oElement.all(by.css('option[selected="selected"]')).then(function(values) {
                        logger.info('PASS', message);
                        return values.getText();
                    });
                } catch (err) {
                    logger.info('ERROR', "Failed to get the select option from drop down" + oElement + err);
                    return null;
                };
            }
        });
    };

    selectByIndexValue(oElement, indexvalue, message) {
        this.waitAndFindElement(oElement, MAXWAITTIME).then(function(flag) {
            message = message || 'select the option from drop down based on given index';
            if (flag) {
                try {
                    oElement.all(by.css('option:nth-child("' + indexvalue + '")')).click().then(function() {
                        logger.info('PASS', message);
                        return true;
                    });
                } catch (err) {
                    logger.info('ERROR', "Failed to select the option based on index " + indexvalue + " from drop down " + oElement + err);
                    return false;
                };
            }
        });

    };
    selectByPartialText(oElement, inputText, message) {
        this.waitAndFindElement(oElement, MAXWAITTIME).then(function(flag) {
            message = message || 'select the option from drop down based on given partial text ' + inputText;
            if (flag) {
                try {
                    oElement.all(by.cssContainingText('option', inputText)).click().then(function() {
                        logger.info('PASS', message);
                        return true;
                    });
                } catch (err) {
                    logger.info('ERROR', "Failed to select the option based on given partial text " + inputText + " from drop down" + oElement);
                    return false;
                }
            }
        });
    };

    selectItemByTextvalue(oElement, inputText, message) {
        this.waitAndFindElement(oElement, MAXWAITTIME).then(function(flag) {
            message = message || 'select the option from drop down based on given text ' + inputText;
            if (flag) {
                try {
                    oElement.all(by.xpath('//option[text()="' + inputText + '"]')).click().then(function() {
                        logger.info('PASS', message);
                        return true;
                    })
                } catch (err) {
                    logger.info('ERROR', "Failed to select the option based on given text " + inputText + " from drop down" + oElement);
                    return false;
                };
            }
        });
    };

    getItemCount(oElement, message) {
        this.waitAndFindElement(oElement, MAXWAITTIME).then(function(flag) {
            message = message || 'Get the count of options from drop down';
            if (flag) {
                try {
                    var itencount = 0;
                    return oElement.all(by.tagName('option')).count().then(function(intItemsCount) {
                        return intItemsCount;
                    });

                } catch (err) {
                    logger.info('ERROR', "unable to get the count from drop down " + oElement);
                };
            }
        });

    };

    /**
     * Check is element disable status on current page
     */
    isElementDisabled(oElement, message) {
        this.waitAndFindElement(oElement, MAXWAITTIME);
        var result = false;
        message = message || 'Perform isElementDisabled Operation on ' + oElement;
        oElement.isEnabled().then(function(expStatus) {
            expect(expStatus).toBeFalsy();
            logger.info('INFO', message + ':' + expStatus);
            return expStatus;
        });
    };

    getElementText(oElement, message) {
        try {
            message = message || 'Reading inner text of' + oElement;
            this.waitAndFindElement(oElement, MAXWAITTIME);
            return oElement.getText().then(function(txt) {
                if (typeof txt === 'object') {
                    txt = txt.toString();
                };
                if (txt.length !== 0) {
                    logger.info('PASS', message);
                    return txt;
                } else return 'Blank';
            })
        } catch (err) {

            logger.info('Failed to open the application due to  ' + err.message);
            return false;
        };
    };

    switchToWindow(index, message) {
        try {
            message = message || 'Switching to window with index';
            return browser.getAllWindowHandles().then(function(handles) {
                if (handles.length >= 1) {
                    return browser.switchTo().window(handles[index]).then(function() {
                        browser.sleep(500);
                        logger.info('PASS', message);
                        return true;
                    });
                }
            })
        } catch (err) {
            logger.info('ERROR', "Failed to switching window due to " + err.message);
            return false;
        }
    };

    //============================Commons================
    /**
     * To generate a random number of given length
     * @param  {String} type (Number or String)
     * @param  {Number} length of the string required
     * @return {Number or String} returns number/string of length provided with random alphabets
     */
    randomNo(type, length) {
        try {
            var oresult = undefined;
            switch (type.toUpperCase()) {
                case 'STRING':
                    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    for (var i = 0; i < length; i++) {
                        oresult = oresult + str.charAt(Math.floor(Math.random() * str.length));
                    }
                    logger.info('Random string of length ' + length + ' is :' + oresult + ' Generated');
                    break;
                case 'NUMBER':
                    var oresult = Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
                    logger.info('random number of length ' + length + ' is :' + oresult + ' Generated');
                    break;
                default:
                    oresult = undefined;
                    break;
            }
        } catch (err) {
            logger.info('ERROR', "Failed to retrieving text from alert due to " + err.message);
            return false;
        }
        return oresult;
    };
    //==============================Key==========
    /**
     * To Press hot keys Like Enter, TAB, Ctrl and Chift ..with out interacting with Objects / elements
     * @param  {String} type (Keys - String)
     * @return {Number or String} returns True after passing button inlut
     */
    pressKey(keyValue, message) {
        var message = message || 'Enter the Key' + keyValue;
        try {
            switch (keyValue.toUpperCase()) {

                case 'ENTER':
                    browser.actions().sendKeys(protractor.Key.ENTER).perform().then(function() {
                        logger.info('PASS', message);
                        return true;
                    })
                    break;

                case 'TAB':
                    browser.actions().sendKeys(protractor.Key.TAB).perform().then(function() {
                        logger.info('PASS', message);
                        return true;
                    })
                    break;

                default:
                    time = undefined;
                    break;
            }
        } catch (err) {
            console.log("catch error and the error is: " + err.message);
            logger.info('ERROR', "Failed to press Key due to " + err.message);
            return false;
        }
    };
}

module.exports = new BrowserActions();