const XlsxPopulate = require('xlsx-populate');
//var excel2Json = require('my-xls-to-json');
XlsxPopulate.fromFileAsync('../testData/accountInfo.xlsx').then(workbook => {
    //Modify the workbook. 
    console.log(workbook.sheet("Sheet1").cell("C2").value());
    //return workbook.toFileAsync("./testData/out.xlsx");
});

// XlsxPopulate.fromFileAsync('../testData/out.xlsx').then(workbook => {

            //     workbook.sheet("Sheet1").range("A1:C3").value('9');
            //     return workbook.toFileAsync("../testData/out2.xlsx");
            // });

// excel2Json('./data/out2.xlsx'),
//     function(err, output) {
//         console.log(output)

//     };


// var xlsx2json = require('node-xlsx2json');
// xlsx2json('./data/out.xlsx', function(error, result) {
//     if (error) return console.error(error);
//     console.log(result);
// });