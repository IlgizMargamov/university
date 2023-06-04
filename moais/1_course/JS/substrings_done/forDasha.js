import fs from "fs";

const [commandInput, stringFile, substringFile] = process.argv.slice(2)
const command = commandInput.slice(2).toLowerCase() ?? null
const string = fs.readFileSync(stringFile) ?? null
const substring = fs.readFileSync(substringFile) ?? null

switch (command) {
    case "bf":
        console.time("Time")
        let [foundBF, comparesBF] = bruteForce(string, substring);
        console.timeEnd("Time")
        let indexesUntilTenBF = Math.min(10, foundBF.length);
        console.log(`Compared times: ${comparesBF}
First ${indexesUntilTenBF} ${"index" + (indexesUntilTenBF > 1 ? "es" : "")}: ${foundBF.slice(0, indexesUntilTenBF)}`)
        break;
    case "hs":
        let [substringHashHS, movingHashHS] = hashBfFirstly(string, substring)
        console.time("Time")
        let [foundHS, comparesHS, collisionsHS] = hashSum(string, substring, substringHashHS, movingHashHS)
        let indexesUntilTenHS = Math.min(10, foundHS.length)
        console.timeEnd("Time")
        console.log(`Compared times: ${comparesHS}
First ${indexesUntilTenHS} ${"index" + (indexesUntilTenHS > 1 ? "es" : "")}: ${foundHS.slice(0, indexesUntilTenHS)}
Collisions: ${collisionsHS}`)
        break;
    case "hrk":
        let [substringHashRK, movingHashRK] = hashRKFirstly(string, substring)
        console.time("Time")
        let [foundRK, comparesRK, collisionsRK] = rabinKarp(string, substring, substringHashRK, movingHashRK)
        let indexesUntilTenRK = Math.min(10, foundRK.length)
        console.timeEnd("Time")
        console.log(`Compared times: ${comparesRK}
First ${indexesUntilTenRK} ${"index" + (indexesUntilTenRK > 1 ? "es" : "")}: ${foundRK.slice(0, indexesUntilTenRK)}
Collisions: ${collisionsRK}`)
        break;
    case "automata":
        buildAutomaton(string, substring)
        break;
    default:
        console.log("You mistyped")
}

function bruteForce(string, substring) {
    let compares = 0
    let indexes = []

    for (let i = 0; i <= string.length - substring.length; ++i) {
        let match = true;
        for (let j = 0; j < substring.length; ++j) {
            if (string[i + j] !== substring[j]) {
                compares++;
                match = false;
                break;
            }
        }
        if (match) {
            indexes.push(i)
        }
    }
    return [indexes, compares];
}

function hashSum(string, substring, substringHash, movingHash) {
    let found = []
    let compares = 0
    let collisions = 0
    let substringLen = substring.length

    let match = true;
    for (let i = 0; i < string.length; i++) {
        if (substringHash !== movingHash) {
            movingHash = movingHash - string[i] + string[substringLen + i]
            continue;
        }
        collisions++
        for (let j = i, k = 0; j < substring.length + i; j++, k++) {
            compares++
            if (string[j] !== substring[k]) {
                match = false;
                break
            }
        }
        if (match) {
            found.push(i)
        }
        movingHash = movingHash - string[i] + string[substringLen + i]
    }

    return [found, compares, collisions - found.length];
}

function hashBfFirstly(string, substring) {
    const substringHash = countHash(substring);
    let movingHash = countHash(string.subarray(0, substring.length))

    return [substringHash, movingHash];

    function countHash(whatToCount) {
        let output = 0
        for (let i = 0; i < whatToCount.length; i++) {
            output += whatToCount[i]
        }

        return output;
    }
}

function rabinKarp(string, substring, substringHash, movingHash) {
    let found = []
    let compares = 0
    let collisions = 0
    let substringLen = substring.length;
    let currentSubstring = string.slice(0, substringLen)
    for (let i = 1; i < string.length; i++) {
        if (substringHash === movingHash) {
            let j
            for (j = 0; j < substringLen; j++) {
                compares++
                if (string[i + j - 1] !== substring[j]) {
                    collisions++
                    break
                }
            }
            if (j === substringLen) found.push(i - 1)
        }
        currentSubstring = string.slice(i, i + substringLen)
        movingHash = hashRK(currentSubstring)
    }

    return [found, compares, collisions];
}

function hashRKFirstly(string, substring) {
    return [hashRK(substring), hashRK(string.subarray(0, substring.length))];
}

function hashRK(string) {
    let prime = 999007
    let hash = 0
    let length = string.length;
    for (let i = 0; i < length; i++) {
        hash <<= 1
        hash += string[i]
        hash %= prime
    }

    return hash
}

