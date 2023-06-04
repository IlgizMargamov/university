'use strict';

/**
 * Складывает два целых числа
 * @param {Number} a Первое целое
 * @param {Number} b Второе целое
 * @throws {TypeError} Когда в аргументы переданы не числа
 * @returns {Number} Сумма аргументов
 */
function abProblem(a, b) {
    if (typeof (a) !== 'number' || typeof (b) !== 'number') throw new TypeError()
    return a + b
}

/**
 * Определяет век по году
 * @param {Number} year Год, целое положительное число
 * @throws {TypeError} Когда в качестве года передано не число
 * @throws {RangeError} Когда год – отрицательное значение
 * @returns {Number} Век, полученный из года
 */
function centuryByYearProblem(year) {
    if (typeof (year) !== 'number') throw new TypeError()
    if (year < 0) throw new RangeError()
    return Math.ceil(year / 100)
}

/**
 * Переводит цвет из формата HEX в формат RGB
 * @param {String} hexColor Цвет в формате HEX, например, '#FFFFFF'
 * @throws {TypeError} Когда цвет передан не строкой
 * @throws {RangeError} Когда значения цвета выходят за пределы допустимых
 * @returns {String} Цвет в формате RGB, например, '(255, 255, 255)'
 */
function colorsProblem(hexColor) {
    if (typeof (hexColor) !== 'string') throw  new TypeError()
    if (!(new RegExp("#[0-9a-fA-F]{6}").test(hexColor))) throw new RangeError()
    let nums = []
    for (let i = 0; i < hexColor.length; i++) {
        if (i === 0) continue
        let current = Number.parseInt(hexColor[i] + hexColor[++i], 16)
        nums.push(current)
    }
    let string = "";
    for (let i = 0; i < nums.length; i++) {
        string += nums[i]
        if (i < nums.length - 1) string += ", "
    }
    return `(${string})`
}

/**
 * Находит n-ое число Фибоначчи
 * @param {Number} n Положение числа в ряде Фибоначчи
 * @throws {TypeError} Когда в качестве положения в ряде передано не число
 * @throws {RangeError} Когда положение в ряде не является целым положительным числом
 * @returns {Number} Число Фибоначчи, находящееся на n-ой позиции
 */
function fibonacciProblem(n) {
    if (typeof (n) !== "number") throw  new TypeError()
    if (n <= 0) throw  new RangeError()
    let first = 0;
    let second = 1;
    for (let i = 0; i < n; i++) {
        let next = first + second
        first = second
        second = next
    }
    return first
}

/**
 * Транспонирует матрицу
 * @param {(Any[])[]} matrix Матрица размерности MxN
 * @throws {TypeError} Когда в функцию передаётся не двумерный массив
 * @returns {(Any[])[]} Транспонированная матрица размера NxM
 */
function matrixProblem(matrix) {
    if (!(matrix instanceof Array)) {
        throw new TypeError();
    }
    if (matrix.length === 0) {
        throw new TypeError();
    }
    if (!(matrix[0] instanceof Array)) {
        throw new TypeError();
    }
    let m = matrix[0].length;
    if (m === 0 || matrix.some(row=>!(row instanceof Array) || row.length !== m)) {
        throw new TypeError();
    }

    return Object.keys(matrix[0]).map(x=>matrix.map(y=>y[x]))
}

/**
 * Переводит число в другую систему счисления
 * @param {Number} n Число для перевода в другую систему счисления
 * @param {Number} targetNs Система счисления, в которую нужно перевести (Число от 2 до 36)
 * @throws {TypeError} Когда переданы аргументы некорректного типа
 * @throws {RangeError} Когда система счисления выходит за пределы значений [2, 36]
 * @returns {String} Число n в системе счисления targetNs
 */
function numberSystemProblem(n, targetNs) {
    if (typeof (n) !== 'number' || typeof (targetNs) !== 'number') throw new TypeError()
    if (targetNs < 2 || targetNs > 36) throw new RangeError()
    return n.toString(targetNs)
}

/**
 * Проверяет соответствие телефонного номера формату
 * @param {String} phoneNumber Номер телефона в формате '8–800–xxx–xx–xx'
 * @throws {TypeError} Когда в качестве аргумента передаётся не строка
 * @returns {Boolean} Если соответствует формату, то true, а иначе false
 */
function phoneProblem(phoneNumber) {
    if (typeof (phoneNumber) !== 'string') {
        throw new TypeError();
    }

    if (phoneNumber.length !== 15) {
        return false;
    }

    return /8-800-\d{3}-\d{2}-\d{2}/.test(phoneNumber);
}

/**
 * Определяет количество улыбающихся смайликов в строке
 * @param {String} text Строка в которой производится поиск
 * @throws {TypeError} Когда в качестве аргумента передаётся не строка
 * @returns {Number} Количество улыбающихся смайликов в строке
 */
function smilesProblem(text) {
    if (typeof (text) !== 'string') throw new TypeError()
    let count = 0;
    for (let i = 0; i + 2 < text.length; i++) {
        const substr = text.substr(i, 3)
        if (substr === ':-)' || substr === '(-:') {
            count++
        }
    }
    return count
}

/**
 * Определяет победителя в игре "Крестики-нолики"
 * Тестами гарантируются корректные аргументы.
 * @param {(('x' | 'o')[])[]} field Игровое поле 3x3 завершённой игры
 * @returns {'x' | 'o' | 'draw'} Результат игры
 */
function ticTacToeProblem(field) {
    for (let i = 0; i < field.length; i++) {
        if (field[i][0] === field[i][1] && field[i][0] === field[i][2]) {
            return field[i][0];
        } else if (field[0][i] === field[1][i] && field[0][i] === field[2][i]) {
            return field[0][i];
        }
    }
    if (field[0][0] === field[1][1] && field[0][0] === field[2][2]) {
        return field[0][0];
    } else if (field[0][2] === field[1][1] && field[0][2] === field[2][0]) {
        return field[0][2];
    }
    return 'draw';
}

module.exports = {
    abProblem,
    centuryByYearProblem,
    colorsProblem,
    fibonacciProblem,
    matrixProblem,
    numberSystemProblem,
    phoneProblem,
    smilesProblem,
    ticTacToeProblem
};