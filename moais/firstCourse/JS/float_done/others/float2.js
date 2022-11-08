"use strict"

let decToFloatStr = "decToFloat";
let floatToDecStr = "floatToDec";
let output = floatConverter(decToFloatStr, -6.75)
console.log(output)

function floatConverter(converter, number) {
    switch (converter) {
        case decToFloatStr:
            return decToFloat(number)
        case floatToDecStr:
            return floatToDec(number)
        default:
            showHelp()
            break;
    }
}

function decToFloat(numberInDec = "") {
    let numberInFloat = {
        sign: numberInDec > 0 ? "0" : "1",
        exp: "",
        mantissa: "",
        input: numberInDec
    }

    let binNumberSplit = getNumberInBin(numberInDec).split(".")
    let intPart = binNumberSplit[0]
    const fractionPartToChek = binNumberSplit[1];
    let fractionPart = fractionPartToChek !== undefined ? fractionPartToChek : "0";
    binNumberSplit = [intPart, fractionPart]

    numberInFloat.exp = getExtent(binNumberSplit);
    numberInFloat.mantissa = getMantissa(binNumberSplit);


    console.log(numberInFloat)

}

function getExtent(parts) {
    let intPart = parts[0]
    let fraction = parts[1]
    let extent = "";

    if (intPart.length === 1) {
        if (intPart === '0') {
            let whereExtent = fraction.indexOf('1') + 1
            extent = (127 - whereExtent).toString(2)
        }
    } else {
        extent = intPart.length - 1

    }

    extent = (extent + 127).toString(2)
    extent = addToNeededLengthInFront("0", 8, extent)

    return extent
}

function addToNeededLengthInFront(toAdd = "", lengthNeeded = 0, addToWhat = "") {
    let output = addToWhat;

    while (output.length < lengthNeeded) {
        output = toAdd + output
    }

    return output;
}

function addToNeededLengthInTheBack(toAdd = "", lengthNeeded = 0, addToWhat = "") {
    let output = addToWhat;

    while (output.length < lengthNeeded) {
        output = output + toAdd
    }

    return output;
}

function getMantissa(parts) {
    let firstPart = parts[0][0]
    let secondPart = parts[0].split("").slice(0).join("")
    let mantissa = "00000000000000000000000";
    if (firstPart.length === 1) {
        if (firstPart === '0') {
            let whereExtent = secondPart.indexOf('1') + 1
            mantissa = secondPart.substring(whereExtent).substring(0, 24)
        } else {
            let whereExtent = secondPart.indexOf('1') + 1
            mantissa = secondPart.substring(whereExtent).substring(0, 24)
        }
    }

    mantissa=addToNeededLengthInTheBack("0", 23, mantissa)
    return mantissa
}

function getNumberInBin(number) {
    if (isNaN(number)) return "11111111100000000000000000000001";

    switch (number) {
        case +Infinity:
            return "01111111100000000000000000000000";
        case -Infinity:
            return "11111111100000000000000000000000";
        case 0:
            return "00000000000000000000000000000000";
        case -0:
            return "10000000000000000000000000000000";
        default:
            return Number(number).toString(2);
    }
}


function isNan(numberToCheckInBin = "") {
    let number = numberToCheckInBin.slice(9)
    for (let symbol in number) {
        if (symbol !== "0") return true;
    }

    return false;
}

function floatToDec(numberInHex = "") {

}


function showHelp() {
    console.log("Mistake")
}