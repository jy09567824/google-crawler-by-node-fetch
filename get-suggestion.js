const fs = require('fs')
const fetch = require('node-fetch')
const cheerio = require('cheerio')

const keyword = '美樂家會員'
const url = `https://www.google.com/search?q=${encodeURI(keyword)}&num=20`

fetch(url, { 
  headers: { 
    "User-Agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
    }
  })
  .then(res => res.text())
  .then(body => fs.writeFileSync(`.${keyword}.html`, body.toString()))

const html = fs.readFileSync(`.${keyword}.html`)
const $ = cheerio.load(html)

const results = []
let id = 1

$('.nVcaUb').each(function(i, elem) {
  const result = {}

  result.id = id++
  result.name = $(this).text()
  result.url = $(this).attr('href')
  
  results.push(result)
})

fs.writeFileSync(`.${keyword}.json`, JSON.stringify(results, null, 2))

return results