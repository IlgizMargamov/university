'use strict';
const fs = require('fs');

let dictionary = {
    [Infinity]: "01111111100000000000000000000000",
    "01111111100000000000000000000000": Infinity,
    [-Infinity]: "11111111100000000000000000000000",
    "11111111100000000000000000000000": -Infinity,
    [NaN]: "01111111100000000000000000000001",
    "01111111100000000000000000000001": NaN,
    0: "0000000000000000000000000000000",
    "0000000000000000000000000000000": "0",
    ["-0"]: "1000000000000000000000000000000",
    "1000000000000000000000000000000": "-0"
};

if (process.argv.length !== 2)
    main(process.argv);
else
    main([0, 0, "--float2dec", "0x000147ae"])

function main(argv) {
    if (argv.length === 3 && argv[2] == '-t') runTests();
    else if (argv.length !== 4) errorArgs()
    else if (argv[2] === '--float2dec') console.log(floatToDec(argv[3]));
    else if (argv[2] === '--dec2float') console.log(decToFloat(argv[3]));
    else errorArgs()
}

function errorArgs() {
    console.log(fs.readFileSync("documentation.txt", 'utf-8'))
}

function runTests() {
    testFloat(1, "12.625", "01000001010010100000000000000000", "0x414a0000")
    testFloat(2, "0.5262", "00111111000001101011010100001011", "0x3f06b50b")
    testFloat(3, "0.375111", "00111110110000000000111010001101", "0x3ec00e8d")
    testFloat(4, "0.6126171", "00111111000111001101010001111001", "0x3f1cd479")
    testFloat(5, "16171.7", "01000110011111001010111011001101", "0x467caecd")
    //Denormalized numbers
    testFloat(6, "1.17549e-40", "00000000000000010100011110101110", "0x000147ae");
    testFloat(7, "-1.17517E-40", "10000000000000010100011110010111", "0x80014797");
    //Denormalized numbers
    testFloat(8, "3.4028235E+38", "01111111011111111111111111111111", "0x7f7fffff");
    testFloat(9, "3.40282e+39", "01111111100000000000000000000000", "0x7f800000");
    testFloat(10, "-3.40282e+39", "11111111100000000000000000000000", "0xff800000");
    testFloat(11, "has", "01111111100000000000000000000001", "0x7f800001");
    testFloat(12, "-1.2771884e8", "11001100111100111001101010110111", "0xccf39ab7");
    testFloat(13, "0", "00000000000000000000000000000000", "0x00000000");
}

function decToFloat(data) {
    if (dictionary[data] !== undefined) return fromBinaryToHex(dictionary[data]);
    let number = Number(data);
    if (dictionary[number] !== undefined) return fromBinaryToHex(dictionary[number]);

    let float = getFloat(number);
    return fromBinaryToHex(float.sign + float.extent + float.mantissa);
}

function getFloat(number) {
    let sign = number < 0 ? 1 : 0;
    if (sign === 1) number = -number;
    let binary = Number(number).toString(2),
        extent = Math.floor(Math.log2(number)), mantissa = findMantissa(binary),
        exception = findException(sign, extent, number);

    if (exception !== undefined) return exception;
    if (extent < -126) extent = -127;

    let unitedExpAndMantissa = completeFloat(extent, mantissa);
    extent = unitedExpAndMantissa.substring(0, 8);
    mantissa = unitedExpAndMantissa.substring(8, 31);

    return {
        mantissa,
        sign,
        extent
    };
}

function findMantissa(binary) {
    let mantissa = "", parts = binary.split("."), wholePart = parts[0], fractPart = parts[1];
    if (wholePart.length === 1 && wholePart[0] === "0" && binary.length > 1) {
        let indexOfOne = fractPart.indexOf("1") + 1;
        mantissa = indexOfOne > 126 ? binary.substring(128, binary.length) : mantissa = fractPart.substring(indexOfOne);
    } else
        for (let i = 1; i < binary.length; i++) {
            if (binary[i] !== ".")
                mantissa += binary[i];
        }
    return mantissa;
}

function findException(sign, extent, number) {
    if (Number(number) === 0) {
        return {
            sign: number.length === 2 && number[0] === "-" ? 1 : 0,
            extent: "00000000",
            mantissa: "00000000000000000000000"
        }
    }

    if (isNaN(Number(number))) return {
        sign: 0,
        extent: "11111111",
        mantissa: "00000000000000000000001"
    };

    if (extent > 127) {
        return {
            sign: sign,
            extent: dictionary[Infinity].substring(1, 9),
            mantissa: dictionary[Infinity].substring(9, 32)
        }
    }
}

function floatToDec(hex) {
    let float = fromHexToBinary(hex),
        sign = float[0] === "0" ? 1 : -1,
        extent = float.substring(1, 9),
        mantissa = float.substring(9, 32);
    if (extent.valueOf() === "11111111") {
        if (Number(mantissa) === 0) return sign * Infinity;
        else return NaN;
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

function fromBinaryToHex(number) {
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

function fromHexToBinary(hex) {
    let result = "";
    for (let i = 2; i < hex.length; i++) {
        let temp = parseInt(hex[i], 16).toString(2);
        while (temp.length < 4) temp = 0 + temp;
        result += temp;
    }

    return result;
}

function completeFloat(extent, mantissa) {
    let binaryExp = (127 + extent).toString(2);

    while (binaryExp.length !== 8)
        binaryExp = 0 + binaryExp;

    while (mantissa.length < 23)
        mantissa += 0;

    let unitedExpAndMantissa = (binaryExp + mantissa).split("");

    if (mantissa.length > 23 && mantissa[23] == 1)
        for (let i = 31; i > 0; i--) {
            if (unitedExpAndMantissa[i] == 1)
                unitedExpAndMantissa[i] = "0";
            else {
                unitedExpAndMantissa[i] = 1
                break;
            }
        }

    return floatToString(unitedExpAndMantissa).substring(0, 31);
}

function floatToString(float) {
    let result = "";
    for (let i = 0; i < float.length; i++)
        result += float[i];
    return result;
}

function testFloat(testNumber, argument, expectedBinary, expectedHex) {
    let float = getFloat(Number(argument));
    let binary = float.sign + float.extent + float.mantissa;
    let wrong = false;
    console.log("Тест номер: ", testNumber);
    if (expectedBinary.valueOf() !== binary.valueOf()) {
        console.log("Ожидаемый бинарный вид не совпадает\n",
            "\tExpected: \t", expectedBinary, "\n\tActual: \t", binary);
        wrong = true;
    }

    if (fromBinaryToHex(binary).valueOf() !== expectedHex.valueOf()) {
        console.log("Ожидаемый хекс вид не совпадает\n",
            "\tExpected: \t", expectedHex, "\n\tActual: \t", decToFloat(argument));
        wrong = true;
    }

    if (!wrong)
        console.log("Прошел успешно");
}



function bruteForce(substr, str){
    for (let i = 0; i < str.length; i++) {
        for (let j = i; j < substr.length+i; j++) {
            if (str[i]===substr[j])
        }
    }
}