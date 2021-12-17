import ExcelJS from 'exceljs/dist/exceljs'
import { saveAs } from 'file-saver'

const imgBase64 = (url, workbook, worksheet, excelCell, resolve) => {
  return new Promise((res, rej) => {
      request.get(url, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');
              res(data)
          }
      })
  });
}


export const saveAsExcel = async () => {
    const wb = new ExcelJS.Workbook()

    const ws = wb.addWorksheet()

    const row = ws.addRow(['a', 'b', 'c'])
    row.font = { bold: true }

    const buf = await wb.xlsx.writeBuffer()

    saveAs(new Blob([buf]), 'abc.xlsx')
}