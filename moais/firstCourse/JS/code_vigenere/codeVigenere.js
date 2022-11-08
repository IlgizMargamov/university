import fs from "fs"

const [func, keyFile, inputFile, outputFile]=process.argv.slice(2)
const keyText=fs.readFileSync(keyFile)
const inputText=fs.readFileSync(inputFile)
let output=""
let length = keyText.length;
``
console.log(keyText, inputText)
if (func==="-e") {
    for (let i = 0; i < inputText.length; i++) {
        output += String.fromCharCode((inputText[i] + keyText[i % length]) % 255)
    }
}

if (func==="-d"){
    // make up frequency table via counting same letters in string and substring, then move one symbol and repeat.
    // this way we will now the shift
    // then, using table of frequency for Russian, we will be able to decode.
    // https://habr.com/ru/post/103055/
}

fs.writeFileSync(outputFile, output)