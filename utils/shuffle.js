// 亂數排列指定的陣列
const fs = require('fs')

function shuffle(arr) {
    var i,
        j,
        temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

module.exports = function (array, num) {
  const shuffled = shuffle(array)
  return shuffled.slice(0, num)
}

// 1. Read Results.json to Array
// const data = JSON.parse(fs.readFileSync('results.json'))

// 2. Call shuffle function to shuffle array
// const shuffled = shuffle(data)

// 3. Print the top 8 results
// for (let i = 0; i < 8; i++) {
//     console.log(shuffled[i].title)
//     console.log(shuffled[i].description)
// }