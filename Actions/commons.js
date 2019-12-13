class commons {

    getCellFromExcel(fileName, sheetName, columnName, row) {
        var cell = columnName + row;
        return XlsxPopulate.fromFileAsync(fileName).then(workbook => {
            console.log('==>' + workbook.sheet(sheetName).cell(cell).value())
            return workbook.sheet("Sheet1").cell(cell).value();
        });
    };
    writeToExcel(fileName, sheetName, columnName, row, value) {
        var cellNumber = columnName + row;
        console.log('cellNumber :' + cellNumber);
        try {
            XlsxPopulate.fromFileAsync(fileName).then(workbook => {
                //Modify the workbook. 
                workbook.sheet(sheetName).cell(cellNumber).value(value);
                return workbook.toFileAsync(fileName);
            });
        } catch (err) {
            console.log('Error:' + err.message);
        }
    }
}

module.exports = new commons();