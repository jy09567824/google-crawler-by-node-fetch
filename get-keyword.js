const fs = require('fs')
const fetch = require('./utils/fetch')
const line_to_array = require('./utils/lines-to-array')
const sleep = require('./utils/sleep')

// 於此處""貼上需要搜尋的關鍵字，以空白分隔
// let str = ""
// // split(" ") 將字串轉換成陣列，並以逗號分隔
// let arr = str.split(" ");
// console.log(arr);
const arr = line_to_array('./keywords.txt')

// 設定陣列 fetch.js 以迴圈方式執行 arr 中的值
async function getKeyword() {
  for (i = 0; i < arr.length; i++) {
    //抓 arr[i] 的資料給 keyword 製作成 url，交給 fetch.js 執行後存成檔案
    const keyword = arr[i]
    const url = `https://www.google.com/search?q=${encodeURI(keyword)}&num=20`
    const html = await fetch(url)
    fs.writeFileSync(`./keyword/${keyword}.html`, html)
    console.log(`done keyword ${keyword}`)
    await sleep(3000)
  }
}

getKeyword()

