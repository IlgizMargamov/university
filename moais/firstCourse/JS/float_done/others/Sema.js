let arg = 0x3F8CCCCF
let float = floatConv('floatToDec', arg)
console.log(float)

function floatConv(type, arg) {
    if (type === 'decToFloat') {
        return decToFloat(arg)
    } else if (type === "floatToDec") {
        return floatToDec(arg)
    }
}

function decToFloat(number) {
    let num = Number(number),
        binary,
        hex;

    if (num === Infinity) {
        binary = "01111111100000000000000000000000"
    } else if (num === -Infinity) {
        binary = "11111111100000000000000000000000"
    } else if (isNaN(num)) {
        binary = "01111111100000000000000000000001" //at least 1 sign in mantissa is 1
    } else if (num === 0) {
        binary = "00000000000000000000000000000000"
    } else if (num === -0) {
        binary = "10000000000000000000000000000000"
    } else {
        binary = getBinary(num);
    }
    hex = binToHex(binary)
    console.log(hex)
    return binary

    function getBinary(num) {
        let mantissa = mantissaOfNumber(num),
            extent = extentOfNumber(num),
            sign = num > 0 ? 1 : 0,
            binary;
        mantissa = mantissa.substring(0, 23)
        binary = sign + extent + mantissa

        binary = roundNumber(mantissa, binary);
        return binary;


        function roundNumber(mantissa, binary) {
            let roundSign = mantissa[23];
            if (roundSign == 1) {
                let bin = binary.split("").reverse().join("")
                bin = bin.split("")
                for (let i = 0; i < bin.length - 1; i++) {
                    if (bin[i] == 0) {
                        bin[i] = 1
                        break
                    } else {
                        bin[i] = 0
                    }
                }
                bin = bin.join("")
                binary = bin.split("").reverse().join("")

                return binary
            }

            return binary
        }
    }
}

function floatToDec(hex) {
    let binCode = hexToBin(hex),
        s = binCode[0] + "",
        extent = binCode.substring(1, 9),
        mantissa = binCode.substring(9, 32),
        e = parseInt(extent, 2).toString(10),
        m = "1." + mantissa,
        number = ((-1) ** s) * m * 2 ** (e - 127);
    return number
}

function extentOfNumber(number) {
    let parts = getPartsOfBinNumber(number),
        firstPart = parts[0],
        secondPart = parts[1],
        extent = "00000000";
    if (firstPart.length === 1) {
        if (firstPart === '0') {
            let whereExtent = secondPart.indexOf('1') + 1
            extent = (127 - whereExtent).toString(2)
            while (extent.length < 8) {
                extent = "0" + extent
            }
        }
    } else {
        extent = firstPart.length - 1
    }
    return extent
}

function mantissaOfNumber(number) {
    let parts = getPartsOfBinNumber(number)
    let firstPart = parts[0]
    let secondPart = parts[1]
    let mantissa = "00000000000000000000000"
    if (firstPart.length === 1) {
        if (firstPart === '0') {
            let whereExtent = secondPart.indexOf('1') + 1
            mantissa = secondPart.substring(whereExtent).substring(0, 24)
        }
    }

    return mantissa
}

function binToHex(binary) {
    let hex = ""
    for (let i = 0; i < binary.length; i += 4) {
        let partOfHex = binary.substring(i, i + 4)
        partOfHex = parseInt(partOfHex, 2).toString(16)
        hex += partOfHex
    }
    return hex
}

function hexToBin(hex) {
    let bin = ""
    let hexStr = hex.toString(16)
    for (let i = 0; i < hexStr.length; i++) {
        let hexSymb = parseInt(hexStr[i], 16).toString(2)
        if (hexSymb.length < 4) {
            while (hexSymb.length < 4) {
                hexSymb = "0" + hexSymb
            }
        }
        bin += hexSymb
    }
    return bin
}

function getPartsOfBinNumber(number) {
    let binCode = number.toString(2)
    let parts = binCode.split(".")
    return parts
}