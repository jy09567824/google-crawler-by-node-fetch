// 使用 node-fetch module 爬取指定頁面的 HTML
const fetch = require('node-fetch');
// 使用 fs 將結果存擋
const fs = require('fs');

// 輸入URL，爬取頁面body中的內容
module.exports = function (url) {
  return fetch(url, {
      headers: {
        "User-Agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
      }
    }).then(res => res.text())
    .then(body => {
    //  fs.writeFileSync('test.html', body.toString())
      return body.toString();
    });
}