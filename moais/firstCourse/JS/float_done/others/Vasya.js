'use strict'

const fs = require('fs');
const commands = process.argv;
let command = commands[2];
let myNumber = commands[3];

console.log(main(command, myNumber));
function main(command, myNumber) {
    switch (command) {
        case 'floatToDec':
            return floatToDec(myNumber);
        case 'decToFloat':
            return decToFloat(myNumber);
        case '-h':
            console.log(fs.readFileSync('help.txt',"utf-8"))
        default: {
            return;
        }
    }
}

function decToFloat(strNumber) {
    let number = Number(strNumber);
    if (number === Infinity)
        return (binaryToHex('01111111100000000000000000000000'));
    else if (number === -Infinity)
        return (binaryToHex('11111111100000000000000000000000'));
    else if (isNaN(number))
        return (binaryToHex('01111111110000000000000000000000'));
    else if (strNumber.length === 2 && strNumber ==='-0')
        return (binaryToHex('10000000000000000000000000000000'));
    else if (number === 0)
        return (binaryToHex('00000000000000000000000000000000'));
    else if (strNumber.substring(1, 9) === 0 && Number(strNumber.substring(1)) !== 0)
        return ;
    return binaryToHex(getBinary(number));
}

function getBinary(number) {
    let binaryNumber = number.toString(2);
    let sign = 0;
    if (binaryNumber < 0) {
        sign = 1
        binaryNumber = binaryNumber.substring(1);
    }
    let parts = binaryNumber.split('.');
    let integerPart = parts[0];
    let fractionalPart = parts[1] === undefined ? '' : parts[1];
    if (integerPart.length === 1) {
        if (integerPart === '0') {
            //для чисел, меньших 1
            var extent = fractionalPart.indexOf('1') + 1;
            if (extent > 126) {
                //денормализованные числа
                var mantissa = fractionalPart.substring(126, 126 + 23);
                var scrap = fractionalPart.substring(126 + 23);
                var extent = '00000000';
            } else {
                //нормализованные числа, которые меньше 1
                var mantissa = fractionalPart.substring(extent).substring(0, 23).toString(2);
                var scrap = fractionalPart.substring(extent).substring(23);
                extent = '0' + (-extent + 127).toString(2);
            }
        }
    } else {
        // нормализованные числа больше 1
        var extent = (integerPart.length - 1 + 127).toString(2);
        var mantissa = (integerPart + fractionalPart).substring(1).substring(0,23);
        var scrap = (integerPart + fractionalPart).substring(1).substring(23);
    }
    mantissa = fillMantissa(mantissa);
    let withoutSign = extent + mantissa;
    if (scrap[0] === '1')
        withoutSign = increment(withoutSign);
    withoutSign = checkExceptions(withoutSign);
    return sign + withoutSign;
}
function checkExceptions (withoutSign) {
    let extent = withoutSign.substring(0,8);
    let oneExtent = '11111111';
    let mantissa = withoutSign.substring(8);
    if (extent === oneExtent)
        return '1111111100000000000000000000000';
    return withoutSign;
}
function increment(number)  {
    let numberArray = number.split('');
    for (let i = numberArray.length - 1; i > -1; i--) {
        if (numberArray[i] === '1')
            numberArray[i] = '0';
        else if (numberArray[i] === '0') {
            numberArray[i] = '1';
            break;
        }
    }

    let withoutSign = numberArray.join('');
    if (Number(withoutSign.substring(0,8)) === 0 && Number(withoutSign.substring(8)) === 0)
        withoutSign = '1111111100000000000000000000000';
    return withoutSign;
}

function fillMantissa(mantissa) {
    while (mantissa.length !== 23)
        mantissa += '0';
    return mantissa;
}

function binaryToHex(number) {
    let splitNumber = number.match(/.{1,4}/g);
    let hex = ''
    for (let i = 0; i < splitNumber.length; i++) {
        hex += parseInt(splitNumber[i], 2).toString(16);
    }

    return hex;
}
function floatToDec(hex) {
    let number = hexToBinary(hex);
    if (number.length !== 32) return;
    let sign = number[0];
    let extent = number.substring(1,9);
    let mantissa = number.substring(9);
    let type = getType(extent, mantissa);
    switch (type) {
        case 'zero': {
            if (sign === '0')
                return 0;
            else
                return -0;
        } case 'inf': {
            if (sign === '0') {
                return Infinity;
            } else
                return -Infinity;
        } case 'NaN':
            return NaN;
        case 'normal' : {
            return convert(sign, parseInt(extent, 2) - 127, mantissa, 1);
        }
        case 'denormal': {
            return convert(sign, -126, mantissa, 0);
        }
    }
}

function convert(sign, realExtent, mantissa, leadingNumber) {
    let realMantissa = leadingNumber + binaryMantissaToDec(mantissa);
    let result = realMantissa*2**realExtent;
    return result;
}
function binaryMantissaToDec(mantissa) {
    let value = 0;
    for (let i = 0; i < mantissa.length; i++) {
        value += Number(mantissa[i])*2**(-i - 1);
    }
    return value;
}

function getType(extent, mantissa) {
    if (Number(extent) === 0 && Number(mantissa) === 0)
        return 'zero';
    else if (extent === '11111111' && Number(mantissa) === 0)
        return 'inf';
    else if (extent === '11111111' && Number(mantissa) !== 0)
        return 'NaN';
    else if (Number(extent) === 0 && Number(mantissa) !== 0)
        return 'denormal';
    else
        return 'normal';
}

function hexToBinary(hex) {
    let number = '';
    for (let i = 2; i < hex.length; i++) {
        let current = parseInt(hex[i], 16).toString(2);
        while (current.length < 4) current = '0' + current;
        number += current;
    }

    return number;
}
