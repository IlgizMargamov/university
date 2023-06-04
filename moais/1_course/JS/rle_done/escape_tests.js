import mocha from "mocha";
import chai from "chai";
import {encodeEsc, decodeEsc} from "./escape.js";
import fs from "fs"

// TODO: generate random byte-sequences arrays and check equality

const toEncode = fs.readFileSync("firstTome.txt")
fs.open("output.txt", "w", err => console.log(err))

function testOnTolstoy() {
    let encodedOnce = encodeEsc(toEncode)
    let encodedTwice = encodeEsc(encodedOnce)
    let decodeOnce = decodeEsc(encodedTwice)
    let actual = decodeEsc(decodeOnce);
    console.log(Buffer.compare(actual, toEncode))
    fs.writeFileSync("output.txt", actual)
    //chai.assert.equal(actual, toEncode)
}

testOnTolstoy()
// fc /b  firstTome.txt output.txt
// Сравнение файлов firstTome.txt и OUTPUT.TXT
// FC: различия не найдены