/*
// На ввод подаётся два числа, каждое -- с новой строки.
// Реализовано сложение чисел с разными знаками, поддержка
// денормализованных чисел и NaN.
// Можно вводить числа в станадртном виде (-5.2e+37).

let args=process.argv.slice(2)

let number1 = Number(args[1]);
let number2 = Number(args[2]);

let machine1 = decToFloat(number1);
let machine2 = decToFloat(number2);

console.log("#1\t", machine1);
console.log("#2\t", machine2);

let result = arithmetic(machine1, machine2);
console.log("#1 + #2\t", result);

console.log("m#1 -> decimal", floatToDec(machine1));
console.log("m#2 -> decimal", floatToDec(machine2));

let resultNum = floatToDec(result);
console.log("Actual result:  ", resultNum);
console.log("Expected result:", number1 + number2);

function numberToBinString(x) {
    let sign = x >= 0 ? '0' : '1';
    if ((1 / x) === -Infinity && x === 0) sign = '1';
    let integer = trunc(Math.abs(x));
    let fraction = Math.abs(x) - integer;
    let resultInt = "";
    let resultFract = "";

    let encounteredOne = false; // нужно для того, чтобы вести запись f
                                // (дробной части мантиссы) с первой единицы 
    let digits = 0; // Содержит кол-во цифр, которые попадут в мантиссу. max == 23

    while (integer > 0) {
        resultInt = (integer % 2 == 0 ? '0' : '1') + resultInt;
        integer = parseInt(integer / 2);
        encounteredOne = true;
        digits++;
    }

    while (fraction > 0 && digits <= 24) {
        fraction *= 2;
        let currentDigit = trunc(fraction) == 0 ? '0' : '1';
        resultFract += currentDigit;
        if (currentDigit == '1') encounteredOne = true;
        fraction -= trunc(fraction) == 0 ? 0 : 1;
        if (encounteredOne)
            digits++;
    }

    if (x == 0) resultInt = "0";

    return [sign, resultInt, resultFract];
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

    // Вычисление порядка числа
    if (integer.length > 0) {
        p = integer.length - 1;
    } else if (fractional.length > 0) {
        while (fractional.charAt(p) != '1')
            p++;
        p++;
        p *= -1;
    }
    // WSH.Echo("p", p);

    // NaN
    if (isNaN(number)) {
        result = '0';
        pm = numberToBinString(255)[1];
        result += pm;
        while (result.length < 31)
            result += '0';
        result += '1';
        return result;
    }

    // p' >= 255
    // Проверка на +- Infinity
    if (Math.abs(number) == Infinity || p + 127 >= 255) {
        result = number > 0 ? '0' : '1';
        pm = numberToBinString(255)[1];
        result += pm;
        while (result.length < 32)
            result += '0';
        return result;
    }

    // Проверка на 0 и числа с p < -127
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

    // Запись мантиссы
    if (p >= 0)
        f = (integer + fractional).substring(1);
    else f = fractional.substring(p != -127 ? -p : -p - 1);

    if (f.length > 23)
        f = f.substr(0, 23);

    result += f;

    while (result.length < 32)
        result += '0';

    // WSH.Echo("Sign, p\', p, f:", sign, pm, p, f);
    return result;
}

function floatToDec(machineNum) {
    let i;
    let sign = machineNum.charAt(0);
    let p = binStringToNumber(['0', machineNum.substr(1, 8), ""]) - 127;
    let f = trimZeroesFrom('1' + machineNum.substring(9), "right");
    let result = binStringToNumber(['0', f, ""]);

    // перемещаем запятую на нужное место
    for (i = 0; i < f.length - 1; i++)
        result /= 2;
    for (i = 0; i < Math.abs(p); i++)
        result *= p > 0 ? 2 : 0.5;

    // Проверка на 0
    let isZero = true;
    for (i = 1; i < machineNum.length; i++)
        if (machineNum.charAt(i) == '1')
            isZero = false;

    if (isZero) {
        if (sign == '0') return 0;
        return -0;
    }

    // проверка на денорм. числа при p' == 255
    if (p == 128) {
        if (binStringToNumber(['0', machineNum.substring(9), ""]) == 0) {
            if (sign == '0') return Infinity;
            return -Infinity;
        } else return Number.NaN;
    }

    return result * (sign == '0' ? 1 : -1);
}

function binStringToNumber(binaryNumberParts) {
    let i;
    let result = 0;
    let sign = binaryNumberParts[0];
    let integer = binaryNumberParts[1];
    let fraction = binaryNumberParts[2];

    let pow2 = 1;
    for (i = integer.length - 1; i >= 0; i--) {
        if (integer.charAt(i) == '1')
            result += pow2;
        pow2 = pow2 << 1;
    }

    pow2 = 2;
    for (i = 0; i < fraction.length; i++) {
        if (fraction.charAt(i) == '1')
            result += 1 / pow2;
        pow2 = pow2 << 1;
    }

    if (sign == '1')
        result *= -1;

    return result;
}

// Принимает числа в **машинном** виде.
// Возвращает результат сложения двух чисел также в машинном виде.

function arithmetic(number1, number2) {
    let d2, d1, i, dp,
        sign1 = number1.charAt(0),
        pm1 = number1.substring(1, 9),
        f1 = number1.substring(9),
        p1 = binStringToNumber(['0', pm1, ""]) - 127,
        pocket1 = p1 != -127 ? 1 : 0,
        sign2 = number2.charAt(0),
        pm2 = number2.substring(1, 9),
        f2 = number2.substring(9),
        p2 = binStringToNumber(['0', pm2, ""]) - 127,
        pocket2 = p2 != -127 ? 1 : 0;

    // Проверка на p' == 255
    if (p1 == 128) return number1;
    if (p2 == 128) return number2;

    // Приведение к общему порядку
    if (p1 != p2) {
        if (p1 > p2) {
            dp = p1 - p2;
            f2 = String(pocket2) + f2;
            for (i = 0; i < dp - 1; i++)
                f2 = '0' + f2;
            pocket2 = 0;
            p2 = p1;
            pm2 = pm1;
            f2 = f2.substr(0, 23);
        } else {
            dp = p2 - p1;
            f1 = String(pocket1) + f1;
            for (i = 0; i < dp - 1; i++)
                f1 = '0' + f1;
            pocket1 = 0;
            p1 = p2;
            pm1 = pm2;
            f1 = f1.substr(0, 23);
        }
    }

    /!* Если числа одинаковых знаков, то происходит сложение
    двух чисел и в конце дописывается их общий sign.
    Если же числа разных знаков, то результат будет того знака
    числа, что больше по модулю. Тогда из наибольшего по модулю
    вычитаеся меньшее и приписывается знак, найденный ранее.*!/

    let p = 0;
    let pocket = ""; // (pocket).f
    let f = "";
    let pm = "";
    let accum = 0;

    if (sign1 == sign2) { 
        // Сложение чисел одинаковых знаков
        // Сложение f1 и f2

        for (i = f1.length - 1; i >= 0; i--) {
            d1 = Number(f1.charAt(i));
            d2 = Number(f2.charAt(i));

            f = String((d1 + d2 + accum) % 2) + f;
            accum = parseInt((d1 + d2 + accum) / 2);
        }
        pocket = numberToBinString(pocket1 + pocket2 + accum)[1];
        f = (pocket + f).substr(1, 23); 
        p = p1 + pocket.length - 1; // Смещаем порядок
    } else { 
        // Сложение чисел разных знаков

        let n1 = floatToDec(number1);
        let n2 = floatToDec(number2);

        if (Math.abs(n1) == Math.abs(n2))
            return decToFloat(0);
        // Смена нужных частей чисел местами, чтобы не писать
        // такой же кусок кода, но с другими переменными

        if (Math.abs(n1) < Math.abs(n2)) {
            let tmpStr = f1;
            f1 = f2;
            f2 = tmpStr;
            let tmpNum = pocket1;
            pocket1 = pocket2;
            pocket2 = tmpNum
            sign1 = sign2;
        }

        // Теперь |number1| > |number2|. Вычитаем f2 из f1
        for (i = f1.length - 1; i >= 0; i--) {
            d1 = Number(f1.charAt(i));
            d2 = Number(f2.charAt(i));

            if (d1 + accum < d2) {
                f = String(2 + d1 + accum - d2) + f;
                accum = -1;
            } else {
                f = String(d1 + accum - d2) + f;
                accum = 0;
            }
        }
        pocket = numberToBinString(pocket1 - pocket2 + accum)[1];

        p = p1; // Смещаем порядок
        let tmp = pocket + f;
        for (i = 0; i < tmp.length; i++){
            if (tmp.charAt(i) == '1')
                break;
            p--;
        }

        f = (pocket + f).substr(1 + p1 - p, 23);
        while (f.length < 23)
            f += '0';
    }

    pm = numberToBinString(p + 127)[1];
    while (pm.length < 8)
        pm = '0' + pm;

    return sign1 + pm + f;
}

function trimZeroesFrom(str, side) {
    let firstIn;
    if (side == "right") {
        for (firstIn = str.length; firstIn >= 0; firstIn--)
            if (str.charAt(firstIn) != '0')
                return str.substring(0, firstIn);
        return "";
    }

    // Обрезаем слева
    for (firstIn = 0; firstIn < str.length; firstIn++)
    if (str.charAt(firstIn) != '0')
        return str.substring(firstIn);
    return str;
}

function trunc(number) {
    return number >= 0 ? Math.floor(number) : Math.floor(number) + 1;
} */


// Принимает числа в **машинном** виде.
// Возвращает результат сложения двух чисел также в машинном виде.

function plus(number1, number2) {
    let d2, d1, i, dp,
        sign1 = number1.charAt(0),
        pm1 = number1.substring(1, 9),
        f1 = number1.substring(9),
        p1 = binStringToNumber(['0', pm1, ""]) - 127,
        pocket1 = p1 != -127 ? 1 : 0,
        sign2 = number2.charAt(0),
        pm2 = number2.substring(1, 9),
        f2 = number2.substring(9),
        p2 = binStringToNumber(['0', pm2, ""]) - 127,
        pocket2 = p2 != -127 ? 1 : 0;

    // Проверка на p' == 255
    if (p1 == 128) return number1;
    if (p2 == 128) return number2;

    // Приведение к общему порядку
    if (p1 != p2) {
        if (p1 > p2) {
            dp = p1 - p2;
            f2 = String(pocket2) + f2;
            for (i = 0; i < dp - 1; i++)
                f2 = '0' + f2;
            pocket2 = 0;
            p2 = p1;
            pm2 = pm1;
            f2 = f2.substr(0, 23);
        } else {
            dp = p2 - p1;
            f1 = String(pocket1) + f1;
            for (i = 0; i < dp - 1; i++)
                f1 = '0' + f1;
            pocket1 = 0;
            p1 = p2;
            pm1 = pm2;
            f1 = f1.substr(0, 23);
        }
    }

    let p = 0;
    let pocket = ""; // (pocket).f
    let f = "";
    let pm = "";
    let accum = 0;

    if (sign1 == sign2) {
        // Сложение чисел одинаковых знаков
        // Сложение f1 и f2

        for (i = f1.length - 1; i >= 0; i--) {
            d1 = Number(f1.charAt(i));
            d2 = Number(f2.charAt(i));

            f = String((d1 + d2 + accum) % 2) + f;
            accum = parseInt((d1 + d2 + accum) / 2);
        }
        pocket = numberToBinString(pocket1 + pocket2 + accum)[1];
        f = (pocket + f).substr(1, 23);
        p = p1 + pocket.length - 1; // Смещаем порядок
    } else {
        // Сложение чисел разных знаков

        let n1 = floatToDec(number1);
        let n2 = floatToDec(number2);

        if (Math.abs(n1) == Math.abs(n2))
            return decToFloat(0);
        // Смена нужных частей чисел местами, чтобы не писать
        // такой же кусок кода, но с другими переменными

        if (Math.abs(n1) < Math.abs(n2)) {
            let tmpStr = f1;
            f1 = f2;
            f2 = tmpStr;
            let tmpNum = pocket1;
            pocket1 = pocket2;
            pocket2 = tmpNum
            sign1 = sign2;
        }

        // Теперь |number1| > |number2|. Вычитаем f2 из f1
        for (i = f1.length - 1; i >= 0; i--) {
            d1 = Number(f1.charAt(i));
            d2 = Number(f2.charAt(i));

            if (d1 + accum < d2) {
                f = String(2 + d1 + accum - d2) + f;
                accum = -1;
            } else {
                f = String(d1 + accum - d2) + f;
                accum = 0;
            }
        }
        pocket = numberToBinString(pocket1 - pocket2 + accum)[1];

        p = p1; // Смещаем порядок
        let tmp = pocket + f;
        for (i = 0; i < tmp.length; i++){
            if (tmp.charAt(i) == '1')
                break;
            p--;
        }

        f = (pocket + f).substr(1 + p1 - p, 23);
        while (f.length < 23)
            f += '0';
    }

    pm = numberToBinString(p + 127)[1];
    while (pm.length < 8)
        pm = '0' + pm;

    return sign1 + pm + f;
}
