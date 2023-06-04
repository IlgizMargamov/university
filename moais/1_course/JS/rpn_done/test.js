import {infixToPostFix, postfixToInfix} from "./rpn.js";

function test() {
    let testNum = 0
    console.log("inToPost")
    check(testNum++, infixToPostFix("((A+B)^Q)*C/D+E*A"), "AB+Q^C*D/EA*+")
    check(testNum++, infixToPostFix("A+B^C*(A^E+D)^B"), "ABC^AE^D+B^*+")
    check(testNum++, infixToPostFix("A+B*(C^(D+E*F^(G-H)))"), "ABCDEFGH-^*+^*+")
    check(testNum++, infixToPostFix("A+B^C*E"), "ABC^E*+")
    check(testNum++, infixToPostFix("A^(C+D*E/B)+B"), "ACDE*B/+^B+")
    check(testNum++, infixToPostFix("(A+B)*(C+D)-E"), "AB+CD+*E-")
    check(testNum++, infixToPostFix("A+B"), "AB+")
    check(testNum++, infixToPostFix("A+B*C^D"), "ABCD^*+")
    check(testNum++, infixToPostFix("A+B*C/(D-E)^F"), "ABC*DE-F^/+")
    check(testNum++, infixToPostFix("(A+B*C)/(D+E*F-G)-H+(J/(K+L)+M)*N"), "ABC*+DEF*+G-/H-JKL+/M+N*+")

    testNum=0
    console.log()
    console.log("postToIn")
    check(testNum++, postfixToInfix("AB+CD^*E^"), "((A+B)*C^D)^E")
    check(testNum++, postfixToInfix("AB+Q^C*D/EA*+"), "(A+B)^Q*C/D+E*A")
    check(testNum++, postfixToInfix("ABC^AE^D+B^*+"),"A+B^C*(A^E+D)^B")
    check(testNum++, postfixToInfix("ABC^E*+"),"A+B^C*E")
    check(testNum++, postfixToInfix("ACDE*B/+^B+"),"A^(C+D*E/B)+B")
    check(testNum++, postfixToInfix("AB+CD+*E-"),"(A+B)*(C+D)-E")
    check(testNum++, postfixToInfix("AB+Q^C*D/EA*+"),"(A+B)^Q*C/D+E*A")
    check(testNum++, postfixToInfix("ABCDEFGH-^*+^*+"),"A+B*C^(D+E*F^(G-H))")
    check(testNum++, postfixToInfix("AB+"),"A+B")
    check(testNum++, postfixToInfix("ABCD^*+"),"A+B*C^D")
    check(testNum++, postfixToInfix("ABC*DE-F^/+"),"A+B*C/(D-E)^F")
    check(testNum++, postfixToInfix("ABC*+DEF*+G-/H-JKL+/M+N*+"),"(A+B*C)/(D+E*F-G)-H+(J/(K+L)+M)*N")

    console.log()
    console.log("errors")
    check(testNum++, infixToPostFix("(((A+B)*C^D)^E"), "AB+CD^*E^")

    function check(number, actual, expected) {
        if (actual === expected) {
            console.log(`${number} is ok`)
        } else {
            console.log(`${number} failed`)
        }
    }
}

test()