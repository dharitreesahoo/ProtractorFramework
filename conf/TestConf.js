// An example configuration file.
exports.config = {

    //Specs to execute
    //specs: ['./specs/sample3.spec.js', './specs/nonAnularApp.spec.js'],

    specs: ['./specs/params.spec.js'],
    //Json Report , Pass the location where to save the json Report
    resultJsonOutputFile: './ReportInJasonFormat.json',

    params :{
            "env":"GOOGLE",
            "password":"password"
        },
    onPrepare: function() {

        if(browser.params.env === "GOOGLE"){
            url = "https://www.simplyhired.com/",
            userName="",
            password=browser.params.password
        }
        else if(browser.params.env === "DEV"){
            url = "http://opensource.demo.orangehrmlive.com/index.php/admin/viewSystemUsers",
            userName="devUser",
            password=browser.params.password
        }


        bActions = require('./utils/actions.js');
        dataProvider = require('jasmine-data-provider');
        val1 = '';
        MAXWAITTIME = 40000;

        //url = 'http://www.way2automation.com/angularjs-protractor/registeration/#/login';
        SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: 'all'
            }
        }));

        //HTML report protractor-jasmine2-html-reporter
        var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath: 'result',
            screenshotsFolder: 'images',
            takeScreenshots: true,
            takeScreenshotsOnlyOnFailures: true,
            fileNamePrefix: 'Demo_MayBatch',
            consolidate: true,
            consolidateAll: true
        }));


        //html report  protractor-jasmine-screenshot-reporter
        var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

        jasmine.getEnv().addReporter(new HtmlScreenshotReporter({
            dest: 'Reports/screenshots',
            filename: 'my-report.html'
        }));

        //loggers Config
        log4js = require('log4js');
        log4js.configure({
            appenders: { myApp: { type: 'file', filename: './logs/executionLog.log' } },
            categories: { default: { appenders: ['myApp'], level: 'ALL' } }
        });
        logger = log4js.getLogger('myApp');
    }
};