let decToFloatStr = "decToFloat";
let floatToDecStr = "floatToDec";
const arg = "1/0"
const floatArg = floatConverter(decToFloatStr, arg)
console.log(floatArg)

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
    const number = Number(numberInDec)
    const floatInBin = getFloatInBin(number)

    return getFloatInHex(floatInBin);

    function getFloatInHex(floatInBin = "") {
        let floatInHex = floatInBin[0] + "x";
        floatInBin = floatInBin[1]

        for (let i = 0; i < floatInBin.length; i += 4) {
            let fourDigit = ""
            for (let j = i; j < i + 4; j++) {
                fourDigit += floatInBin[j]
            }
            floatInHex += parseInt(fourDigit, 2).toString(16)
        }

        return floatInHex;
    }

    function getFloatInBin(number) {
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
                return getBinary(number);
        }
    }

    function getBinary(number = "") {
        const numberInBin = number.toString(2).split("."),
            wholePart = numberInBin[0],
            fractionPart = numberInBin[1];

        if (wholePart.length === 1) {
            if (wholePart === "0") {
                const extent = fractionPart.indexOf("1") + 1
                const mantissa = fractionPart.substring(extent).substring(0, 23)
                // TODO
                return
            } else if (wholePart !== "0") {
                const extent = wholePart.length - 1

            }
        }

        return numberInBin;
    }
}


function isNan(numberToCheckInBin = "") {
    let number = numberToCheckInBin.slice(9)
    for (let symbol in number) {
        if (symbol !== "0") return true;
    }

    return false;
}

function floatToNumber(numberInHex = "") {

}


function showHelp() {
    console.log("Mistake")
}