// const {Matrix} = require('ml-matrix')


let input = "11";
let encoded = encode(input);
console.log(encoded)
console.log(getSyndrome(encoded))
console.log(getSyndrome("1101"))

function multiplyMatrix(A, B) {
    let rowsA = A.length, colsA = A[0].length
    let rowsB = B.length, colsB = B[0].length
    let C = [];

    if (colsA !== rowsB) return false;

    for (let i = 0; i < rowsA; i++) C[i] = [];

    for (let i = 0; i < colsB; i++) {
        for (let j = 0; j < rowsA; j++) {
            let temp = 0;
            for (let k = 0; k < rowsB; k++) temp += A[j][k] * B[k][i];
            C[j][i] = temp;
        }
    }
    return C;
}

function transpose(A) {
    let m = A.length, n = A[0].length, AT = [];
    for (let i = 0; i < n; i++) {
        AT[i] = [];
        for (let j = 0; j < m; j++) AT[i][j] = parseInt(A[j][i]);
    }
    return AT;
}

function getRow(x, i) {
    let c = []
    for (let j = 0; j < x[i].length; j++) {
        c[j] = x[i][j]
    }
    return c
}

function addToCount(x, count) {
    while (x.length < count) {
        x = "0" + x
    }
    return x
}

function encode(x) {
    let code = []
    let count = Math.ceil(Math.log2(x.length + 1 + Math.ceil(Math.log2(x.length + 1))))
    let g = [[]]

    for (let i = 1; i < x.length + count + 1; i++) {
        let h = i.toString(2)
        h = addToCount(h, count)
        for (let j = 0; j < count; j++) {
            if (g[j] === undefined) g[j] = []
            g[j][i] = parseInt(h[h.length - j - 1])
        }
    }
    for (let i = 0; i < count; i++) {
        g[i] = g[i].slice(1)
    }

    let k = 0
    for (let i = 1; i < x.length + count + 1; i++) {
        if (Math.log2(i) === Math.ceil(Math.log2(i))) code[i] = 0
        else {
            code[i] = parseInt(x[k])
            k++
        }
    }
    code = code.slice(1)
    let encode = code
    code = transpose([code])
    for (let i = 1; i < x.length + count; i *= 2) {
        let m = getRow(g, Math.log2(i))
        encode[i - 1] = multiplyMatrix([m], code)[0][0] % 2
    }
    let s = 0
    for (let i = 0; i < encode.length; i++) {
        s += encode[i]
    }
    encode[encode.length] = s % 2
    return encode.join('')
}

function getSyndrome(x) {
    let count = Math.ceil(Math.log2(x.length))
    let g = []
    for (let i = 1; i < x.length; i++) {
        let k = i.toString(2)
        k = addToCount(k, count)
        for (let j = 0; j < count; j++) {
            if (g[j] === undefined) g[j] = []
            g[j][i] = parseInt(k[k.length - j - 1])
        }
    }
    for (let i = 0; i < count; i++) {
        g[i] = g[i].slice(1)
    }
    for (let i = 0; i < count; i++) {
        g[i][g[i].length] = 0
    }
    let array = []
    for (let i = 0; i < x.length; i++) {
        array[i] = 1
    }
    let code = transpose([x])
    g[g.length] = array
    let encode = []
    for (let i = 0; i < g.length; i ++) {
        let m = getRow(g, i)
        encode[Math.pow(2,i) - 1] = multiplyMatrix([m], code)[0][0] % 2
    }


    let result = encode.join('')
    let f = result.slice(0, result.length - 1)
    let num = parseInt(f.split('').reverse().join(''), 2)

    return encode.join('')
}
