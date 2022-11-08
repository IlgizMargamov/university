console.log(main())

function main() {
    let decToFloatStr = "--decToFloat";
    let floatToDecStr = "--floatToDec";
    let [convertType, number] = process.argv.slice(2);
    let output

    switch (convertType) {
        case decToFloatStr:
            output=getNumberInBin(number)
            output = decToFloat(number)
            output = parseInt(output, 2).toString(16);
            return output;
        case floatToDecStr:
            number="00"+parseInt(number, 16).toString(2)
            output = floatToDec(number)
            return output;
        default:
            showHelp()
            break;
    }
}

function getNumberInBin(number) {
    number=Number(number)
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


function decToFloat(number) {
    let binary = numberToBinString(number);
    let sign = binary[0];
    let integer = binary[1];
    let fractional = binary[2];
    let result = sign;

    let p = 0;
    let pm = "";
    let f = "";

    if (integer.length > 0) {
        p = integer.length - 1;
    } else if (fractional.length > 0) {
        while (fractional.charAt(p) != '1')
            p++;
        p++;
        p *= -1;
    }

    if (isNaN(number)) {
        result = '0';
        pm = numberToBinString(255)[1];
        result += pm;
        while (result.length < 31)
            result += '0';
        result += '1';
        return result;
    }

    if (Math.abs(number) == Infinity || p + 127 >= 255) {
        result = number > 0 ? '0' : '1';
        pm = numberToBinString(255)[1];
        result += pm;
        while (result.length < 32)
            result += '0';
        return result;
    }

    if (number == 0 || p < -127) {
        result = (1 / number) === -Infinity || number < 0 ? '1' : '0';
        while (result.length < 32)
            result += '0';
        return result;
    }

    pm = numberToBinString(p + 127)[1];
    if (pm.length < 8) {
        while (pm.length < 8)
            pm = '0' + pm;
    }
    result += pm;

    if (p >= 0) {
        f = (integer + fractional).substring(1);
    } else {
        f = fractional.substring(p != -127 ? -p : -p - 1);
    }

    if (f.length > 23) {
        f = f.substr(0, 23);
    }

    result += f;

    while (result.length < 32)
        result += '0';

    return result;
}

function floatToDec(machineNum) {
    let i;
    let sign = machineNum.charAt(0);
    let p = binStringToNumber(['0', machineNum.substr(1, 8), ""]) - 127;
    let f = trimZeroesFrom('1' + machineNum.substring(9), "right");
    let result = binStringToNumber(['0', f, ""]);

    for (i = 0; i < f.length - 1; i++)
        result /= 2;
    for (i = 0; i < Math.abs(p); i++)
        result *= p > 0 ? 2 : 0.5;

    let isZero = true;
    for (i = 1; i < machineNum.length; i++)
        if (machineNum.charAt(i) == '1') {
            isZero = false;
        }

    if (isZero) {
        if (sign == '0') return 0;
        return -0;
    }

    if (p == 128) {
        if (binStringToNumber(['0', machineNum.substring(9), ""]) == 0) {
            if (sign == '0') return Infinity;
            return -Infinity;
        } else {
            return Number.NaN;
        }
    }

    return result * (sign == '0' ? 1 : -1);
}


function numberToBinString(x) {
    let sign = x >= 0 ? '0' : '1';
    if ((1 / x) === -Infinity && x === 0) sign = '1';
    let integer = trunc(Math.abs(x));
    let fraction = Math.abs(x) - integer;
    let resultInt = "";
    let resultFraction = "";

    let encounteredOne = false;
    let digits = 0;

    getExtent();
    getMantissa();

    if (x == 0) resultInt = "0";
    return [sign, resultInt, resultFraction];

    function getExtent() {
        while (integer > 0) {
            resultInt = (integer % 2 == 0 ? '0' : '1') + resultInt;
            integer = parseInt(integer / 2);
            encounteredOne = true;
            digits++;
        }
    }

    function getMantissa() {
        while (fraction > 0 && digits <= 24) {
            fraction *= 2;
            let currentDigit = trunc(fraction) == 0 ? '0' : '1';
            resultFraction += currentDigit;
            if (currentDigit == '1') encounteredOne = true;
            fraction -= trunc(fraction) == 0 ? 0 : 1;
            if (encounteredOne) {
                digits++;
            }
        }
    }
}

function binStringToNumber(binaryNumberParts) {
    let i;
    let result = 0;
    let sign = binaryNumberParts[0];
    let integer = binaryNumberParts[1];
    let fraction = binaryNumberParts[2];

    let pow2 = 1;
    for (i = integer.length - 1; i >= 0; i--) {
        if (integer.charAt(i) == '1') {
            result += pow2;
        }
        pow2 = pow2 << 1;
    }

    pow2 = 2;
    for (i = 0; i < fraction.length; i++) {
        if (fraction.charAt(i) == '1') {
            result += 1 / pow2;
        }
        pow2 = pow2 << 1;
    }

    if (sign == '1') {
        result *= -1;
    }

    return result;
}

function trimZeroesFrom(str, side) {
    let firstIn;
    if (side == "right") {
        for (firstIn = str.length; firstIn >= 0; firstIn--)
            if (str.charAt(firstIn) != '0') {
                return str.substring(0, firstIn);
            }
        return "";
    }

    for (firstIn = 0; firstIn < str.length; firstIn++)
        if (str.charAt(firstIn) != '0') {
            return str.substring(firstIn);
        }
    return str;
}

function trunc(number) {
    return number >= 0 ? Math.floor(number) : Math.floor(number) + 1;
}

function showHelp() {
    console.log("Hi!\n" +
        "This is a program for you to convert your decimal number into a float-number\n" +
        "To do this you have to type:\n" +
        "node floatKatya.js [--decToFloat/--floatToDec] [number]\n" +
        "number follows the rules:\n" +
        "if you decToFloat it should be decimal\n" +
        "else it should be in hex")
}