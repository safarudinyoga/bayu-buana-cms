import ExcelJS, { string } from 'exceljs/dist/exceljs'
import { saveAs } from 'file-saver'
import $ from "jquery"
const request = require('request').defaults({ encoding: null });

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


export const saveAsExcel = async (title="data", dt) => {
  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet()
  
  console.log(dt.tables().column(1))
  const vCol = String.fromCharCode(64+5)
  ws.mergeCells(`A1:${vCol}1`)
  const mergedCell = ws.getCell(`${vCol}1`)
  mergedCell.value = title
  mergedCell.alignment = { vertical: 'middle', horizontal: 'center' };

  let data = [
    'https://bbdev.monstercode.net/files/3d08158b-b1df-4440-9f93-58b8087cb1b5.png', 
    'https://bbdev.monstercode.net/files/bb7c325c-5d4f-4ef9-93b3-923f603867fa.png', 
    'https://bbdev.monstercode.net/files/ff830c3f-d493-4d02-ac65-849332d68ebe.png']
  let dataB64 = []
  for (let i = 0; i< data.length; i++) {
    let convertImg = await imgBase64(data[i])
    const image = wb.addImage({
      base64: convertImg,
      // const row = ws.addRow(dataB64)
      // row.font = { bold: true }
    
      extension: 'png',
    });
    ws.addImage(image, {
      tl: { col: i+1, row: i+1 },
      br: { col: i+2, row: i+2 }
    });
    dataB64.push(convertImg)
  }


  const buf = await wb.xlsx.writeBuffer()
  saveAs(new Blob([buf]), `${title}.xlsx`)
}