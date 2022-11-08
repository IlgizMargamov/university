import mocha from "mocha";
import chai from "chai";
import {decodeJmp, encodeJmp} from "./jump.js";
import fs from "fs";
const toEncode = fs.readFileSync("firstTome.txt")
fs.open("output.txt", "w", err => console.log(err))
function testOnTolstoy() {
    let encodedOnce = encodeJmp(toEncode)
    let encodedTwice = encodeJmp(encodedOnce)
    let decodeOnce = decodeJmp(encodedTwice)
    let actual = decodeJmp(decodeOnce);
    console.log(Buffer.compare(actual, toEncode))
    fs.writeFileSync("output.txt", actual)
    //chai.assert.equal(actual, toEncode)
}

testOnTolstoy()