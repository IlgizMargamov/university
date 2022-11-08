/*
let toEncode = "1"
let toDecode = encode(toEncode);
console.log(toDecode)
console.log(decode(toDecode))
console.log(decode(["1111", toDecode[1]]))
*/

function changeBit(word, i) {
    return word[i]==="1"?word.slice(0, i)+"0"+word.slice(i+1):word.slice(0, i)+"1"+word.slice(i+1)
}
console.log(changeBit("10111", 0))

function decode(input) {
    let toDecode = input, matrixM=getMatrixM(), syndrome = getSyndrome(matrixM, toDecode);
    return evalSyndrome(syndrome);
}

function evalSyndrome(syndrome = []) {
    let lastInd = syndrome.length - 1, parityBits = syndrome.slice(0, lastInd),
        controlBit = syndrome[lastInd].toString(),
        output = "", allZeros = isAllZeros(parityBits),
        temp = parseInt(parityBits.reverse().join(""), 2);
    if (controlBit === "0") {
        if (allZeros) output = "Ok, no mistakes"
        if (!allZeros) output = "Two mistakes"
    } else if (controlBit === "1") {
        if (allZeros) output = `Mistake in last bit`
        if (!allZeros) output = `Mistake in ${temp} bit`
    }

    return output

    function isAllZeros(parityBits = []) {
        for (let i = 0; i < parityBits.length; i++) {
            if (parityBits[i] === "1") {
                return false
            }
        }
        return true
    }
}

function getSyndrome(matrixM = [], toDecode = "") {
    let output = [], decodeM = makeDecodeMatrix(matrixM), vector = toDecode.split("");
    for (let i = 0; i < decodeM.length; i++) {
        let temp = 0
        for (let j = 0; j < decodeM[0].length && j < vector.length; j++) {
            temp += decodeM[i][j] * vector[j]
        }
        output.push((temp % 2).toString())
    }

    return output
}

function makeDecodeMatrix(matrixM) {
    let decodeM = copyMatrix(matrixM)
    decodeM[decodeM.length] = []
    for (let i = 0; i < decodeM.length - 1; i++) {
        decodeM[i].push("0")
    }
    for (let i = 0; i < decodeM[0].length; i++) {
        decodeM[decodeM.length - 1].push("1")
    }

    return decodeM

    function copyMatrix(toCopy = []) {
        let output = []
        for (let i = 0; i < toCopy.length; i++) {
            output[i] = []
            for (let j = 0; j < toCopy[0].length; j++) {
                output[i][j] = toCopy[i][j]
            }
        }

        return output
    }
}

function transpose(toTranspose) {
    let output = []
    for (let i = 0; i < toTranspose[0].length; i++) {
        output[i] = []
        for (let j = 0; j < toTranspose.length; j++) {
            output[i][j] = toTranspose[j][i]
        }
    }
    return output
}

function getWordFromArr(arr = []) {
    let output = arr
    return output.join("").split(",").join("")
}

function encode(input) {
    let [d, p] = getBytesLength(input), encodedWordLen = d + p,
        matrixOfStraightBin = firstlyFillMatrix(encodedWordLen, p),
        matrixM = getMatrixM(encodedWordLen, p, matrixOfStraightBin),
        vector = getZeroVector(encodedWordLen, input),
        parityBits = getParityBits(encodedWordLen, p, vector, matrixM),
        encodedWordArr = getEncodedArr(encodedWordLen, parityBits, input);
    return getWordFromArr(encodedWordArr);
}

function getEncodedArr(encodedWordLen, parityBits, input) {
    let output = []
    for (let i = 0, inpIndex = 0, pow = 0, j = 0;
         i < encodedWordLen && inpIndex < input.length; i++) {
        if (i + 1 === Math.pow(2, pow)) {
            output.push(parityBits[j])
            j++
            pow++
            continue
        }
        output.push(input[inpIndex])
        inpIndex++
    }
    getControlBit();

    return output

    function getControlBit() {
        let count = 0
        for (let i = 0; i < output.length; i++) {
            count += parseInt(output[i])
        }
        output.push((count % 2).toString())
    }
}

function getParityBits(encodedWordLen, p, vector, matrixH) {
    let result = []
    for (let i = 0; i < matrixH.length; i++) {
        let temp = 0
        for (let j = 0; j < matrixH[0].length; j++)
            temp += matrixH[i][j] * vector[j]
        result.push((temp % 2).toString())
    }
    return result
}

function getZeroVector(encodedWordLen, input) {
    let output = []
    for (let i = 0, inpIndex = 0, pow = 0; i < encodedWordLen && inpIndex < input.length; i++) {
        if (i + 1 === Math.pow(2, pow)) {
            output.push("0")
            pow++
            continue
        }
        output.push(input[inpIndex])
        inpIndex++
    }

    return output
}

function getMatrixM(encodedWordLen, p, matrixOfStraightBin) {
    let length = matrixOfStraightBin.length, output = initOutput(length);
    for (let i = 0; i < matrixOfStraightBin[0].length; i++) {
        for (let j = 0; j < length; j++) {
            let element = matrixOfStraightBin[j].split("").reverse().join("")
            output[j].push(element[i])
        }
    }

    return transpose(output)

    function initOutput(length) {
        let output = []
        for (let i = 0; i < length; i++) {
            output.push([])
        }

        return output
    }
}

function firstlyFillMatrix(encodedWordLen, p) {
    let matrixOfBin = []
    for (let i = 1; i < encodedWordLen + 1; i++) {
        matrixOfBin.push(makeConstLength(i, p))
    }
    return matrixOfBin;
}

function makeConstLength(i = Number(), p) {
    let numberInBin = i.toString(2)
    for (let j = numberInBin.length; j < p; j++) {
        numberInBin = "0" + numberInBin
    }
    return numberInBin;
}

function getBytesLength(input) {
    let d = input.length,
        p = Math.ceil(Math.log2(Math.abs(d) + 1 +
        Math.ceil(Math.log2(Math.abs(d) + 1))))

    return [d, p]
}