const fs = require('fs')
const fetch = require('./utils/fetch')
const cheerio = require('./utils/cheerio')
const shuffle = require('./utils/shuffle')

const keyword = '測試關鍵字'
const url = `https://www.google.com/search?q=${encodeURI(keyword)}&num=20`

async function main() {
  const html = await fetch(url)
  fs.writeFileSync(`./keyword/${keyword}.html`, html)
  // const html = fs.readFileSync('test.html')
  const array = cheerio(html)
  const selected = shuffle(array, 5)
  console.log(array)
}

main()