"use strict"

switch (process.argv[2]) {
    case "-h":
        console.log("Введите -float или -dec для получения float и dec соответственно.\n" +
            "Далее через пробел вводите число, которое необходимо проебразовать:\n" +
            "Примеры: node float3.js -getFloat 13\n" +
            "         node float3.js -getDec 41500000\n");
        break;
    case "-getFloat":
        decToFloat(process.argv[3]);
        break;
    case "-getDec":
        floatToDec(process.argv[3]);
        break;
}

function floatToDec(hex){
    let binaryHex = hexToBin(hex);
    let internalRep = {
        exponent: binaryHex.slice(1, 9),
        mantissa: binaryHex.slice(9),
    }
    //exception = '9' - denormalizeNumber; exception = '1' - normalizeNumber;
    let exception = checkOnException(internalRep);
    let dec;
    if (isNaN(exception)){
        console.log(exception.toString());
    }
    if (exception === '0' || exception === Infinity){
        dec = binaryHex[0] === '1' ? ('-' + exception).toString() : exception.toString();
        console.log(dec);
    }
    dec = binaryHex[0] === '1' ? '-' : '';
    if (exception === '9'){
        dec += getDenormalizeNumber(internalRep);
        console.log(dec);
    }
    if (exception === '1'){
        dec += getNormalizeNumber(internalRep);
        console.log(dec);
    }
}

function decToFloat(number){
    let internalRep = internalRepresentationNumbers(number.toString());
    let stringInternalRep = internalRep.sign + internalRep.exponent + internalRep.mantissa;
    let hex = "0x"+binToHex(stringInternalRep);
    console.log(hex);
}

function internalRepresentationNumbers(number){
    let internalRep = {
        sign: 0,
        exponent: "",
        mantissa: "",
    }
    if (number[0] === "-"){
        internalRep.sign = 1;
        number = number.slice(1)
    }
    let extentAndTruncateMantissa = getExtentAndTruncateMantissa(number);
    let exponent = (extentAndTruncateMantissa.extent + 127).toString(2);
    let truncateMantissa = extentAndTruncateMantissa.truncateMantissa;
    setExponentAndMantissa(internalRep, exponent, truncateMantissa);
    return internalRep;
}
function getExtentAndTruncateMantissa(number) {
    let extentAndMantissa = {
        extent: 0,
        truncateMantissa: ''
    };
    if (checkOnExceptionAndDenormal(extentAndMantissa, number))
        return extentAndMantissa;
    let binaryNumber = Number(number).toString(2);
    let integerAndFractional = binaryNumber.split('.');
    let integer = integerAndFractional[0];
    let fractional = integerAndFractional[1] !== undefined
        ? integerAndFractional[1]
        : '0';
    setExtentAndTruncateMantissa(extentAndMantissa, integer, fractional);
    return extentAndMantissa;
}

function checkOnExceptionAndDenormal(extentAndMantissa, number) {
    if (number === '0'){
        extentAndMantissa.extent = -127;
        extentAndMantissa.truncateMantissa = '0';
        return true;
    }
    else if (isNaN(Number(number))){
        extentAndMantissa.extent = 128;
        extentAndMantissa.truncateMantissa = '1';
        return true;
    }
    else if (Number(number) > (2 - 2**-23) * 2**127){
        extentAndMantissa.extent = 128;
        extentAndMantissa.truncateMantissa = '0';
        return true;
    }
    else if(Number(number) < 2**-126){
        extentAndMantissa.extent = -127;
        let binary126Length = (2**-126).toString(2).slice(2).length;
        let binaryNumber = Number(number).toString(2);
        let fractional = binaryNumber.split('.')[1];
        for (let i = 0; i < fractional.length; i++)
            if (fractional[i] === '0' && fractional[i + 1] === '1'){
                extentAndMantissa.truncateMantissa = fractional.slice(binary126Length);
            }
        return true;
    }
}
function setExtentAndTruncateMantissa(extentAndMantissa, integer, fractional) {
    for (let i = 0; i < integer.length; i++)
        if (integer[i] === '1'){
            extentAndMantissa.extent = integer.length - i - 1;
            extentAndMantissa.truncateMantissa = integer.slice(i + 1) + fractional;
            return;
        }
    for (let i = 0; i < fractional.length; i++)
        if (fractional[i] === '1'){
            extentAndMantissa.extent = -(i + 1);
            extentAndMantissa.truncateMantissa = fractional.slice(i + 1);
            return;
        }
}
function setExponentAndMantissa(internalRep, exponent, truncateMantissa) {
    for (let i = 0; i < 8 - exponent.length; i++)
        internalRep.exponent += '0';
    internalRep.exponent += exponent;
    internalRep.mantissa = truncateMantissa.slice(0, 23);
    for (let i = 0; i < 23 - truncateMantissa.length; i++)
        internalRep.mantissa += '0';
}
function checkOnException(internalRep) {
    let exponentIsZero = checkOnZeroOrOne(internalRep.exponent, '0');
    let exponentIsOne = checkOnZeroOrOne(internalRep.exponent, '1');
    let mantissaIsZero = checkOnZeroOrOne(internalRep.mantissa, '0');
    let exception;
    if (exponentIsZero && mantissaIsZero)
        exception = '0';
    else if (exponentIsOne && mantissaIsZero)
        exception = Infinity;
    else if (exponentIsOne && !mantissaIsZero)
        exception = NaN;
    else if (exponentIsZero && !mantissaIsZero)
        exception = '9';
    else
        exception = '1';
    return exception;
}

function checkOnZeroOrOne(str, operand) {
    let check = true;
    for (let elem of str)
        check = check && elem === operand;
    return check;
}

function getDenormalizeNumber(internalRep) {
    let denormalizeNumber = 2**-126;
    let mantissa = internalRep.mantissa;
    let extent = -1;
    for (let i = mantissa.length - 1; i >= 0; i--)
        if (mantissa[i] === '1')
            extent *= mantissa.slice(0, i + 1).length;
    denormalizeNumber *= 2**extent;
    return denormalizeNumber;
}

function getNormalizeNumber(internalRep) {
    let binNormalizeNumber = '';
    let mantissa = internalRep.mantissa;
    let floatingCount = parseInt(internalRep.exponent, 2) - 127;
    for (let i = mantissa.length - 1; i >= 0; i--)
        if (mantissa[i] === '1'){
            binNormalizeNumber += mantissa.slice(0, i + 1);
            break;
        }
    let fractional = getFractional(binNormalizeNumber);
    let normalizeNumber = (fractional + 1) * 2**floatingCount;
    return normalizeNumber;
}

function getFractional(binaryFractional) {
    let fractional = 0;
    for (let i = 0; i < binaryFractional.length; i++)
        fractional += binaryFractional[i] * 2**((i + 1) * -1);
    return fractional;
}

function binToHex(bin){
    let binToHexDict = {
        "0000": '0',
        "0001": '1',
        "0010": '2',
        "0011": '3',
        "0100": '4',
        "0101": '5',
        "0110": '6',
        "0111": '7',
        "1000": '8',
        "1001": '9',
        "1010": 'a',
        "1011": 'b',
        "1100": 'c',
        "1101": 'd',
        "1110": 'e',
        "1111": 'f',
    }
    let ar = [];
    let tempStr = "";
    for (let i = 1; i < bin.length + 1; i++){
        tempStr += bin[i - 1];
        if (i % 4 === 0){
            ar.push(tempStr);
            tempStr = "";
        }
    }
    let textHex = "";
    for(let binEl of ar) {
        textHex += binToHexDict[binEl];
    }
    return textHex;
}
function hexToBin(hex){
    let hexToBinDict = {
        '0': "0000",
        '1': "0001",
        '2': "0010",
        '3': "0011",
        '4': "0100",
        '5': "0101",
        '6': "0110",
        '7': "0111",
        '8': "1000",
        '9': "1001",
        'a': "1010",
        'b': "1011",
        'c': "1100",
        'd': "1101",
        'e': "1110",
        'f': "1111",
    }
    let textBinary = "";
    for(let hexEl of hex) {
        textBinary += hexToBinDict[hexEl];
    }
    return textBinary;
}