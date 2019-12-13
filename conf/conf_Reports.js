// An example configuration file.
exports.config = {
    //directConnect: true,
    seleniumAddress: 'http://localhost:4444/wd/hub',


    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'firefox'
    },

    // Framework to use. Jasmine is recommended.
    framework: 'jasmine2',

    // Spec patterns are relative to the current working directory when
    // protractor is called.
    specs: ['./specs/endToEndDemo.spec.js'],
    //specs: ['./specs/usingExcelData.spec.js'],

    // json report 
    // no need to install any node module , just give the path and file name where to save the json report
    resultJsonOutputFile: './ReportInJson.json',

    onPrepare: function() {
        browserActions = require('./utils/actions.js');
        dataProvider = require('jasmine-data-provider');
        browser.manage().window().maximize();
        //to display the descriptions of Spec in green or Red based on status
        SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: 'all'
            }
        }));

        global.MAXWAITTIME = 20000;
        var logFilePath = Number(new Date());

        //loggers
        log4js = require('log4js');
        log4js.configure({
            appenders: { SampleDemo: { type: 'file', filename: './logs/executionLog_' + logFilePath + '.log' } },
            categories: { default: { appenders: ['SampleDemo'], level: 'info' } }
        });
        logger = log4js.getLogger('SampleDemo');

        /*html reports 
        // npm install "protractor-jasmine2-html-reporter" 
        jasmine 
        */
        Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: './reports/',
                screenshotsFolder: './reports/images',
                takeScreenshots: true
                //takeScreenshotsOnlyOnFailures: true
            })
        );

        var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
        jasmine.getEnv().addReporter(new HtmlScreenshotReporter({
            dest: './results/screenshots',
            filename: './results/my-report.html',
            captureOnlyFailedSpecs: true
        }));

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

        jasmine.getEnv().addReporter({
            specDone: function(result) {
                if (result.status == 'failed') {
                    browser.getCapabilities().then(function(caps) {
                        var browserName = caps.get('browserName');

                        browser.takeScreenshot().then(function(png) {
                            var stream = fs.createWriteStream('screenshots/' + browserName + '-' + result.fullName + '.png');
                            stream.write(new Buffer(png, 'base64'));
                            stream.end();
                        });
                    });
                }
            }
        });

        //allure Report

        var AllureReporter = require('jasmine-allure-reporter');

        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: './node_modules/jasmine-allure-reporter/allure-results'
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
    },

    onComplete: function() {

        cmd = require('node-cmd');
        cmd.run('AllureReporter.bat');

        var browserName, browserVersion;
        var capsPromise = browser.getCapabilities();

        capsPromise.then(function(caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');

            var HTMLReport = require('protractor-html-reporter');

            testConfig = {
                reportTitle: 'Test Execution Report',
                outputPath: './JasmineRports',
                screenshotPath: './screenshots',
                testBrowser: browserName,
                browserVersion: browserVersion,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: true
            };
            new HTMLReport().from('xmlresults.xml', testConfig);
        });
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 3000000
    }

};