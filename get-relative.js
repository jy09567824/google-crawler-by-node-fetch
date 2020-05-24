const fs = require('fs')
const fetch = require('./utils/node-fetch')
const line_to_array = require('./utils/lines-to-array')
const sleep = require('./utils/sleep')
const cheerio = require('cheerio')

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
    // Cheerio 抓搜尋建議
    const readHtml = fs.readFileSync(`./keyword/${keyword}.html`)
    const $ = cheerio.load(readHtml)
    const results = []
    let id = 1
    $('.nVcaUb').each(function(i, elem) {
      const result = {}
      result.id = id++
      result.keyword = keyword 
      result.name = $(this).text()
      // result.url = $(this).attr('href')
      results.push(result)
    })
    fs.writeFileSync(`./relative/${keyword}.json`, JSON.stringify(results, null, 2))
  }
}



getKeyword()

