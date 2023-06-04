'use strict';

/**
 * Телефонная книга
 */
let phoneBook = new Map();

/**
 * Вызывайте эту функцию, если есть синтаксическая ошибка в запросе
 * @param {number} lineNumber – номер строки с ошибкой
 * @param {number} charNumber – номер символа, с которого запрос стал ошибочным
 */
function syntaxError(lineNumber, charNumber) {
    throw new Error(`SyntaxError: Unexpected token at ${lineNumber}:${charNumber}`);
}

/**
 * Выполнение запроса на языке pbQL
 * @param {string} query
 * @returns {string[]} - строки с результатами запроса
 */
function run(query) {
    let help = []
    let queries = query.split(";").filter(x => x.length > 0)
    let result = []
    for (const queriesKey of queries) {
        let queryCommands = queriesKey.split(' ')
        let ruleCommand = queryCommands[0]

        let keys;
        let next;
        switch (ruleCommand) {
            case "Создай":
                help = ["контакт"]
                if (checkSyntax(queryCommands.slice(1, 2), help)) {
                    phoneBook.set(queryCommands[2], {email: [], phones: []})
                }
                break;
            case "Удали"://delete email and phone

                if (checkSyntax(queryCommands.slice(1, 2), help)) {
                    let isDeleted = phoneBook.delete(queryCommands[2])
                }
                break;
            case "Добавь":
                keys=phoneBook.entries()
                next = keys.next()
                let contact =queryCommands[queryCommands.length-1]
                while (!next.done){
                    for (let i = 1; i < queryCommands.length; i++) {
                        if (queryCommands[i]==="телефон"){
                            let number = queryCommands[i+1]
                            if (next.value[0]===contact){
                                next.value[1].phones.push(number)
                            }
                        }
                        else if (queryCommands[i]==="почту"){
                            let email = queryCommands[i+1]
                            next.value[1].email.push(email)
                        }

                    }
                    next=keys.next()
                }
                break;
            case "Покажи":
                keys=phoneBook.entries()
                next = keys.next()
                while (!next.done) {
                    let current = ""
                    let filter = queryCommands[queryCommands.length - 1]
                    const val = next.value
                    for (let i = 1; i < queryCommands.length; i++) {
                        if (queryCommands[i] === "имя") {
                            if (val[0].includes(filter)) {
                                current += val[0] + ";"
                            }
                        } else if (queryCommands[i] === "почты") {
                            if (val[0].includes(filter)){
                                for (const emailElement of val[1].email) {
                                    current+=emailElement
                                }
                            }
                        } else if (queryCommands[i] === "телефоны") {
                            if (val[0].includes(filter)){
                                for (let j = 0; j < val[1].phones.length; j++){
                                    const phone = val[1].phones[j];
                                    const regexp = /(\d{3})(\d{3})(\d{2})(\d{2})/;
                                    const phoneRegex = phone.replace(regexp, "+7 ($1) $2-$3-$4");
                                    current+=phoneRegex
                                    current+=j<val[1].phones.length-1?",":";"
                                }
                            }
                        }
                    }
                    if (current.length>0)
                        result.push(current)
                    next = keys.next()

                }
        }
    }

    return result;
}

function checkSyntax(expected = [String], actual = [String]) {
    for (let i = 0; i < expected.length; i++) {
        if (expected[i] !== actual[i]) return false;
    }
    return true;
}

module.exports = {phoneBook, run};


function test(expected = [String], actual = [String], num) {
    for (let i = 0; i < expected.length; i++) {
        if (expected[i] !== actual[i]) {
            console.log(num + " test failed")
            phoneBook = new Map()
            return false;
        }
    }
    console.log(num + " test passed")
    phoneBook = new Map()
    return true;
}

// Пример 1
test([], run('Покажи имя для контактов, где есть ий;'), 1)

// Пример 2
test([
        'Григорий;',
        'Василий;',
        'Иннокентий;',
    ],
    run(
        'Создай контакт Григорий;' +
        'Создай контакт Василий;' +
        'Создай контакт Петр;' +
        'Создай контакт Иннокентий;' +
        'Покажи имя для контактов, где есть ий;'
    ), 2)

// Пример 3
test([
        'Григорий;Григорий;Григорий;',
        'Василий;Василий;Василий;',
        'Иннокентий;Иннокентий;Иннокентий;'
    ],
    run(
        'Создай контакт Григорий;' +
        'Создай контакт Василий;' +
        'Создай контакт Петр;' +
        'Создай контакт Иннокентий;' +
        'Покажи имя и имя и имя для контактов, где есть ий;'
    ), 3)

// Пример 4
test([
        'Григорий;',
        'Григорий;'
    ]
    , run(
        'Создай контакт Григорий;' +
        'Создай контакт Петр;' +
        'Покажи имя для контактов, где есть ий;' +
        'Покажи имя для контактов, где есть ий;'
    ), 4)

// Пример 5
test([],
    run(
        'Создай контакт Григорий;' +
        'Создай контакт Петр;' +
        'Удали контакт Григорий;' +
        'Покажи имя для контактов, где есть ий;'
    ), 5)

// Пример 6
test([
        'Григорий;+7 (555) 666-77-87,+7 (555) 666-77-88;grisha@example.com'
    ],
    run(
        'Создай контакт Григорий;' +
        'Добавь телефон 5556667787 для контакта Григорий;' +
        'Добавь телефон 5556667788 и почту grisha@example.com для контакта Григорий;' +
        'Покажи имя и телефоны и почты для контактов, где есть ий;'
    ), 6)

// Пример 7
test([
        'Григорий;'
    ],
    run(
        'Создай контакт Григорий;' +
        'Создай контакт Петр;' +
        'Добавь телефон 5556667788 для контакта Григорий;' +
        'Удали телефон 5556667788 для контакта Григорий;' +
        'Покажи имя и телефоны для контактов, где есть ий;'
    ), 7)