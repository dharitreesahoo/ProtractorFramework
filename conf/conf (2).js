// An example configuration file.
exports.config = {


    //Specs to execute
    specs: ['./specs/sample4.spec.js'],

    suites:{
        smoke: ['./specs/sample*.*.js'],
        full: ['./specs/webTables.*.js']
    },

    // multiCapabilities:[{
    // directConnect : true,
    //  browserName: 'chrome',
    //  //count:3
    //  // shardTestFiles: true,
    //  // maxInstances:2,
    //  specs: ['./specs/webTables.spec.js'],
    //  //exclude:['./specs/nonAnularApp.spec.js'],

    // },{
    //  browserName: 'firefox',
    //  //count:3
    //  // shardTestFiles: true,
    //  // maxInstances:2,
    //  specs: ['./specs/nonAnularApp.spec.js'],
    //  seleniumAddress: 'http://localhost:4444/wd/hub',

    // },
    // {
    //  browserName: 'internet explorer',
    //  //count:3
    //  // shardTestFiles: true,
    //  // maxInstances:2,
    //  specs: ['./specs/sample3.spec.js'],
    //  seleniumAddress: 'http://localhost:4444/wd/hub',

    // }],

    params:{
        "url":"http://www.way2automation.com/angularjs-protractor/registeration/#/login",
        "user2":'angular',
        "password":""
    },

    baseUrl:"http://www.way2automation.com",
    //Json Report , Pass the location where to save the json Report
    resultJsonOutputFile: './ReportInJasonFormat.json',


    onPrepare: function() {

        bActions = require('./utils/actions.js');
        dataProvider = require('jasmine-data-provider');
        val1 = '';
        MAXWAITTIME = 40000;
        rootPath = __dirname;

        url = 'http://www.way2automation.com/angularjs-protractor/registeration/#/login';
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

        //PO references


        //html report  protractor-jasmine-screenshot-reporter
        var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

        jasmine.getEnv().addReporter(new HtmlScreenshotReporter({
            dest: 'Reports/screenshots',
            filename: 'my-report.html'
        }));

        //allure Reporter
        //allure Report

        AllureReporter = require('jasmine-allure-reporter');

        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: './allure-results'
        }));
        
        jasmine.getEnv().addReporter(new AllureReporter());
        jasmine.getEnv().afterEach(function(done) {
            browser.takeScreenshot().then(function(png) {
                allure.createAttachment('Screenshot', function() {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
            })
        });

       
        ///XML report 

        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './',
            filePrefix: 'xmlresults'
        }));

        var fs = require('fs-extra');
        fs.emptyDir('screenshots/', function(err) {
            console.log(err);
        });

        //loggers Config
        log4js = require('log4js');
        log4js.configure({
            appenders: { myApp: { type: 'file', filename: './logs/executionLog.log' } },
            categories: { default: { appenders: ['myApp'], level: 'ALL' } }
        });
        logger = log4js.getLogger('myApp');
    },
    onComplete: function() {

        // cmd = require('node-cmd');
        // cmd.run('AllureReporter.bat');

        // var browserName, browserVersion;
        // var capsPromise = browser.getCapabilities();

        // capsPromise.then(function(caps) {
        //     browserName = caps.get('browserName');
        //     browserVersion = caps.get('version');

            var HTMLReport = require('protractor-html-reporter');

            testConfig = {
                reportTitle: 'Test Execution Report',
                outputPath: './JasmineRports',
                screenshotPath: './screenshots',
                testBrowser: 'chrome',
                browserVersion: '66',
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: false
            };
            new HTMLReport().from('xmlresults.xml', testConfig);
        // });
    },
};