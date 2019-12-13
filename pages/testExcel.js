const XlsxPopulate = require('xlsx-populate');
 
// Load an existing workbook
XlsxPopulate.fromFileAsync("../testData/customerInfo.xlsx")
    .then(workbook => {
        // Modify the workbook.
        const value = workbook.sheet("Sheet1").cell("A1").value();
        
        // Log the value.
        console.log(value);
    });