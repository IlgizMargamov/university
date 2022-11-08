"use strict"

function decToFloat(number) {
    let str = ""

    return str // hex
}

function floatToDec(hex) {
    let str = ""

    return str // binary
}

let specialValues = {
    "+0": "00000000000000000000000000000000",
    "-0": "10000000000000000000000000000000",
    "+inf": "01111111100000000000000000000000",
    "-inf": "11111111100000000000000000000000",
}

function isNan(numberToCheck = "") {
    let number = numberToCheck.slice(9)
    for (let symbol in number) {
        if (symbol !== "0") return true;
    }

    return false;
}

const DIGITS = "0 1 2 3 4 5 6 7 8 9".split(" ")

class Float3 {
    number
    text

    constructor(number="") {
        this.number = this.isInputCorrect(number) ? parseInt(number, 10).toString(2) : new Error("Your input is incorrect");
    }

    isInputCorrect(numberToCheck) {
        for (let symbol of numberToCheck) {
            if (!(symbol in DIGITS)) {
                return false;
            }
        }
        return true;
    }


}

let float = new Float3("123")
console.log(float)