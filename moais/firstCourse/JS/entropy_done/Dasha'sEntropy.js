const fs = require('fs');
let text = fs.readFileSync(process.argv[2], "utf8")
    .split(/|\r\n/);

let arr = [];
let length = text.length;
for (let i = 0; i < length; i++) {
    const symbol = text[i];
    if (arr[symbol] !== undefined) {
        arr[symbol]++;
    } else {
        arr[symbol] = 1;
    }
}

let count = Object.keys(arr).length;
if (count === 0 || count === 1) {
    console.log(0);
    console.log(0);
} else {
    let result2 = 0;
    let resultArr = 0;

    for (let symbol in arr) {
        let arrElement = arr[symbol];
        let number = arrElement / length;
        resultArr += number * ((Math.log(number)) / Math.log(count));
        result2 += number * ((Math.log(number)) / Math.log(2));
    }

    console.log(-resultArr);
    console.log(-result2);
}