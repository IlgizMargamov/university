'use strict';

const fs = require('fs');

let dictionary = {
    [Infinity]: "01111111100000000000000000000000",
    "01111111100000000000000000000000": Infinity,
    [-Infinity]: "11111111100000000000000000000000",
    "11111111100000000000000000000000": -Infinity,
    [NaN]: "01111111100000000000000000000001",
    "01111111100000000000000000000001": NaN,
    ["0"]: "0000000000000000000000000000000",
    "0000000000000000000000000000000": "0",
    ["-0"]: "1000000000000000000000000000000",
    "1000000000000000000000000000000": "-0"
};

let argv = process.argv;
main(argv)

function main(argv) {
    if (argv.length === 3 && argv[2] === '-t') {
        runTests();
    } else if (argv.length !== 4) {
        showHelp()
    } else if (argv[2] === '--float2dec') {
        console.log(floatToDec(argv[3]));
    } else if (argv[2] === '--dec2float') {
        console.log(decToFloat(argv[3]));
    } else {
        showHelp()
    }
}

function decToFloat1(data) {
    if (dictionary[data] !== undefined)
        return convertInHex(dictionary[data]);
    let number = Number(data);
    if (dictionary[number] !== undefined)
        return convertInHex(dictionary[number]);

    let float = getFloat(number);

    return convertInHex(float.sign + float.extent + float.mantissa);
}

function getFloat(number) {
    let sign = number < 0 ? 1 : 0;
    if (sign === 1) number = -number;
    let binary = Number(number).toString(2),
        extent = Math.floor(Math.log2(number)),
        mantissa = findMantissa(binary),
        exception = findException(sign, extent, number);

    if (exception !== undefined) return exception;

    let unitedExpAndMantissa = completeFloat(extent, mantissa);
    extent = unitedExpAndMantissa.substring(0, 8);
    mantissa = unitedExpAndMantissa.substring(8, 31);

    return {
        mantissa,
        sign,
        extent
    };

    function findMantissa(binary) {
        let mantissa = "",
            parts = binary.split("."),
            wholePart = parts[0],
            fractionPart = parts[1];
        if (wholePart.length === 1 &&
            wholePart[0] === "0" &&
            binary.length > 1) {
            let indexOfOne = fractionPart.indexOf("1") + 1;
            mantissa = indexOfOne > 126
                ? binary.substring(128, binary.length)
                : mantissa = fractionPart.substring(indexOfOne);
        } else {
            for (let i = 1; i < binary.length; i++) {
                if (binary[i] !== ".") {
                    mantissa += binary[i];
                }
            }
        }

        return mantissa;
    }

    function findException(sign, extent, number) {
        if (Number(number) === 0) {
            let newVar = {
                sign: number.length === 2 && number[0] === "-" ? 1 : 0,
                extent: "00000000",
                mantissa: "00000000000000000000000"
            };
            return newVar
        }

        if (isNaN(Number(number))) {
            return {
                sign: 0,
                extent: "11111111",
                mantissa: "00000000000000000000001"
            };
        }

        if (extent > 127) {
            return {
                sign: sign,
                extent: dictionary[Infinity].substring(1, 9),
                mantissa: dictionary[Infinity].substring(9, 32)
            }
        }
    }


    function completeFloat(extent, mantissa) {
        let binaryExp = (127+(extent< -126?-127:extent)).toString(2);
        binaryExp=getOfNeededLen(binaryExp, 8, true)
        mantissa=getOfNeededLen(mantissa, 23)

        let unitedExpAndMantissa=roundFloat((binaryExp + mantissa).split(""))

        return floatToString(unitedExpAndMantissa).substring(0, 31);

        function roundFloat(floatNumber="") {
            let output=floatNumber;
            if (output.length > 32 && output[output.length-1] === "1") {
                for (let i = 31; i > 0; i--) {
                    if (output[i] === "1") {
                        output[i] = "0"
                    } else {
                        output[i] = "1"
                        break;
                    }
                }
            }
            return output;
        }

        function getOfNeededLen(toEnlarge="", timesToEnlarge=0, side=false) {
            let output=toEnlarge;
            while (output.length<timesToEnlarge){
                if (side) output="0"+output;
                else if (!side) output+="0"
            }

            return output;
        }

        function floatToString(float) {
            let result = "";
            for (let i = 0; i < float.length; i++)
                result += float[i];
            return result;
        }
    }
}



function floatToDec(hex) {
    let float = convertInBinary(hex),
        sign = float[0] === "0" ? 1 : -1,
        extent = float.substring(1, 9),
        mantissa = float.substring(9, 32);
    if (extent.valueOf() === "11111111") {
        if (Number(mantissa) === 0) {
            return sign * Infinity;
        } else {
            return NaN;
        }
    }
    let fracMantissa = extent.valueOf() !== "00000000"
        ? 1 + convertFractionalBinaryToDecimal(mantissa)
        : 0 + convertFractionalBinaryToDecimal(mantissa);
    let ext = Number(extent) !== 0 ? parseInt(extent, 2) - 127 : -126;

    return sign * fracMantissa * Math.pow(2, ext);

    function convertFractionalBinaryToDecimal(binary) {
        let result = 0;
        for (let i = 1; i < binary.length + 1; i++) {
            result += Math.pow(2, -i) * binary[i - 1];
        }
        return Math.round(result * 1e16) / 1e16;
    }
}

/// Converts string number from binary to hex
function convertInHex(number) {
    let binary = number.toString();
    let result = "0x"
    let temp = "";
    for (let i = 0; i < binary.length; i++) {
        temp += binary[i];
        if (temp.length === 4) {
            result += parseInt(temp, 2).toString(16);
            temp = "";
        }
    }
    return result;
}

/// Converts string number from hex to binary
function convertInBinary(hex) {
    let result = "";
    for (let i = 2; i < hex.length; i++) {
        let temp = parseInt(hex[i], 16).toString(2);
        while (temp.length < 4) temp = 0 + temp;
        result += temp;
    }

    return result;
}

function showHelp() {
  //  console.log(fs.readFileSync("documentation.txt", 'utf-8'))
}

function decToFloat(number = "") {
    let absOfNumber = Math.abs(Number(number)),
        numberInDec = Number(number);
    if (number in dictOfExceptions) return dictOfExceptions[number];
    if (numberInDec in dictOfExceptions) return dictOfExceptions[numberInDec]

    const sign = number > 0 ? "0" : "1";
    let numberInBin = absOfNumber.toString(2),
        extent = Math.floor(Math.log10(absOfNumber) / Math.log10(2)),
        mantissa = getMantissa(numberInBin),
        bigNumber = getBigNumber(sign, extent)

    let floatNumber = getFloatNumber(sign, extent, mantissa);
    return bigNumber === undefined
        ? toHex(convertToString(floatNumber))
        : bigNumber;

    function toHex(number="") {
        let output="0x"
        for (let i = 0; i < number.length; i+=4) {
            let temp=""
            for (let j = i; j < 4+i; j++) {
                temp+=number[j]
            }
            output+=parseInt(temp, 2).toString(16)
        }

        return output;
    }

    function convertToString(floatNumber) {
        let output=""
        for (let item of floatNumber) {
            output+=item
        }

        return output;
    }

    function getFloatNumber(sign, extent, mantissa) {
        const left = true, right = false;
        let exponentInBin = (127 + (extent < -126 ? -127 : extent)).toString(2);
        exponentInBin = getOfNeededLen(exponentInBin, 8, left)
        mantissa = getOfNeededLen(mantissa, 23, right)

        let floatNumber=roundFloat((sign+exponentInBin+mantissa).split(""));

        return convertToString(floatNumber);

        function roundFloat(floatNumber="") {
            let output=floatNumber;
            if (output.length > 31 && output[32] === "1") {
                for (let i = 31; i > 0; i--) {
                    if (output[i] === "1") {
                        output[i] = "0"
                    } else {
                        output[i] = "1"
                        break;
                    }
                }
            }
            return output.toString().split(",").join("").substring(0, 31);
        }

        function getOfNeededLen(toEnlarge = "", timesToEnlarge = 0, sideZeroAt = false) {
            let output = toEnlarge;
            while (output.length < timesToEnlarge) {
                if (sideZeroAt) {
                    output = "0" + output;
                } else if (!sideZeroAt) output += "0"
            }

            return output;
        }
    }

    function getMantissa(whereToLook) {
        let mantissa = "",
            parts = whereToLook.split("."),
            wholePart = parts[0],
            fractionPart = parts[1];
        if (wholePart.length === 1 && wholePart[0] === "0" && whereToLook.length > 1) {
            let indexOfOne = fractionPart.indexOf("1") + 1;
            mantissa = indexOfOne > 126
                ? whereToLook.substring(128, whereToLook.length)
                : mantissa = fractionPart.substring(indexOfOne);
        } else {
            for (let i = 1; i < whereToLook.length; i++) {
                if (whereToLook[i] !== ".") {
                    mantissa += whereToLook[i];
                }
            }
        }

        return mantissa;
    }


    function getBigNumber(sign, extent) {
        if (extent > 127) {
            return {
                sign: sign,
                mantissa: "0000000000000000000000",
                extent: "11111111",
            }
        }
    }
}


let dictOfExceptions = {
    ["-0"]: "10000000000000000000000000000000",
    ["0"]: "00000000000000000000000000000000",
    [-Infinity]: "11111111100000000000000000000000",
    [Infinity]: "01111111100000000000000000000000",
    [NaN]: "01111111100000000000000000000001",
    "10000000000000000000000000000000": ["-0"],
    "00000000000000000000000000000000": ["0"],
    "11111111100000000000000000000000": [-Infinity],
    "01111111100000000000000000000000": [Infinity],
    "01111111100000000000000000000001": [NaN]
}
runTests()
function runTests() {
    test(1, "12.625", "01000001010010100000000000000000", "0x414a0000")
    test(2, "0.5262", "00111111000001101011010100001011", "0x3f06b50b")
    test(3, "0.375111", "00111110110000000000111010001101", "0x3ec00e8d")
    test(4, "0.6126171", "00111111000111001101010001111001", "0x3f1cd479")
    test(5, "16171.7", "01000110011111001010111011001101", "0x467caecd")
    //Denormalized numbers
    test(6, "1.17549e-40", "00000000000000010100011110101110", "0x000147ae");
    test(7, "-1.17517E-40", "10000000000000010100011110010111", "0x80014797");
    //Denormalized numbers
    test(8, "3.4028235E+38", "01111111011111111111111111111111", "0x7f7fffff");
    test(9, "3.40282e+39", "01111111100000000000000000000000", "0x7f800000");
    test(10, "-3.40282e+39", "11111111100000000000000000000000", "0xff800000");
    test(11, "has", "01111111100000000000000000000001", "0x7f800001");
    test(12, "-1.2771884e8", "11001100111100111001101010110111", "0xccf39ab7");
    test(13, "0", "00000000000000000000000000000000", "0x00000000");
}

function test(testNumber, argument, expectedResult) {
    let float = decToFloat(argument);
    console.log("Тест номер: ", testNumber);
    let wrong = false;

    if (float.valueOf() !== expectedResult.valueOf()) {
        wrong = true;
        console.log("Ожидаемый результат не совпадает\n",
            "\tExpected: \t", expectedResult, "\n\tActual: \t", float);
    }

    if (!wrong)
        console.log("Прошел успешно");

    if (convertInHex(float).valueOf() !== expectedHex.valueOf()) {
        console.log("Ожидаемый хекс вид не совпадает\n",
            "\tExpected: \t", expectedHex, "\n\tActual: \t", decToFloat(argument));
        wrong = true;
    }

    if (!wrong) {
        console.log("Прошел успешно");
    }
}