let syndromeMatrix = null;
let parityMatrix = null;
var SyndromeEditWindow = null;
var numberOfSyndromeRows = 0;
var numberOfParityBits = 0;

//*************************************************************************
//
//	FUNCTION : log2
//
//	INPUTS : operand:  the number for which log base 2 will be
//					returned
//
//	DESCRIPTION : returns log2(operand)
//
//	OUTPUTS : none
//
//	RETURNS : returns log2(operand)
//*************************************************************************
function log2(operand) {
    return Math.log(operand) / Math.LN2;
}

//*************************************************************************
//
//	FUNCTION : numberIsValid
//
//	INPUTS : inputString:  A string that holds an signed digit number
//				to check
//		radix:  The radix of the signed decimal number
//
//	DESCRIPTION : Examines each character of inputString
//			and determines whether	the character represents a
//			valid digit given radix
//
//	OUTPUTS : none
//
//	RETURNS : Returns true if inputString is a valid signed digit
//		representation in radix, false otherwise.
//
//*************************************************************************
function numberIsValid(inputString, radix) {
    var digitsAreValid = true;
    var currentDigit = 0;

    i = 0;
    while (i < inputString.length && digitsAreValid === true) {
        currentDigit = parseInt(inputString.charAt(i), radix);

        if (isNaN(currentDigit)) {
            digitsAreValid = false;
        }
        i++;
    }

    return digitsAreValid;
}

//*************************************************************************
//
//	FUNCTION : stringToBinaryArray
//
//	INPUTS : inputString:  A string that holds a binary or hex number
//						to convert to a binary array
//			radix:  The radix of the signed decimal number
//			resultantArray: The array that will hold the number after conversion
//			requiredNumberOfDigits: the total number of digits that the
//								returned array should hold.
//
//	DESCRIPTION : Converts each digit in inputString to its numeric value (0,1)
//		and places the value in resultantArray. If the input string is in
//		hex, the hex string is converted to binary before converting it into
//		an array.
//
//		If requiredNumberOfDigits is greater than the length of inputString,
//		the beginning of the array is padded with 0's to create a total of
//		requiredNumberOfDigits positions in resultantArray.  If
//		requiredNumberOfDigits is less than the length of inputString,
//		requiredNumberOfDigits is ignored.
//
//	OUTPUTS : resultantArray
//
//	RETURN : true if conversion succeeded, false otherwise
//
//*************************************************************************
function stringToBinaryArray(radix, inputString, resultantArray, requiredNumberOfDigits) {
    var value = 0
    var currentResultantArrayIndex = requiredNumberOfDigits - 1;
    var tempInputString = "";
    var hexDigit,
        binDigits;
    var i = 0,
        j = 0;

    //  If inputString does not represent a valid value in the give radix, return
    if ((!numberIsValid(inputString, radix)) || (inputString.length === 0)) {
        resultantArray.length = 0;
        return false;
    }

    //  If the input string is in hex, convert the hex string to binary before
    //  converting it into an array.
    if (radix === 16) {
        for (i = inputString.length; i > 0; i--) {
            hexDigit = inputString.charAt(inputString.length - i);

            switch (hexDigit) {
                case "0":
                    binDigits = "0000";
                    break;
                case "1":
                    binDigits = "0001";
                    break;
                case "2":
                    binDigits = "0010";
                    break;
                case "3":
                    binDigits = "0011";
                    break;
                case "4":
                    binDigits = "0100";
                    break;
                case "5":
                    binDigits = "0101";
                    break;
                case "6":
                    binDigits = "0110";
                    break;
                case "7":
                    binDigits = "0111";
                    break;
                case "8":
                    binDigits = "1000";
                    break;
                case "9":
                    binDigits = "1001";
                    break;
                case "a":
                case "A":
                    binDigits = "1010";
                    break;
                case "b":
                case "B":
                    binDigits = "1011";
                    break;
                case "c":
                case "C":
                    binDigits = "1100";
                    break;
                case "d":
                case "D":
                    binDigits = "1101";
                    break;
                case "e":
                case "E":
                    binDigits = "1110";
                    break;
                case "f":
                case "F":
                    binDigits = "1111";
            }

            tempInputString = tempInputString.concat(binDigits);
        }
    } else {
        tempInputString = inputString;
    }

    //  Convert binary string to an array of 1's and 0's
    if (requiredNumberOfDigits > tempInputString.length) {
        resultantArray.length = requiredNumberOfDigits;
    } else {
        resultantArray.length = tempInputString.length;
    }

    //  Zero pad the array if necessary to get requiredNumberOfDigits
    //  number of digits
    j = resultantArray.length - 1;
    if (requiredNumberOfDigits !== undefined) {
        //  zero pad the beginning of the array
        for (j = resultantArray.length - 1; j >= tempInputString.length; j--)
            resultantArray[j] = 0;
    }
    currentResultantArrayIndex = j;

    //  Convert each character of inputString to a number and add the
    //  resultant number to the end of resultantArray.
    i = 0;
    while (i < tempInputString.length) {
        if (tempInputString.charAt(i) === "0") {
            value = 0;
        } else {
            value = 1;
        }

        //  Place value in resultantArray starting at the MOST SIGNIFICANT BIT
        resultantArray[currentResultantArrayIndex] = value;
        currentResultantArrayIndex--;
        i++;
    }
    return true;
}

//*************************************************************************
//
//	FUNCTION : binaryArrayToString
//
//	INPUTS : inputArray:  An array such that each element holds a digit
//						of a binary number (0 or 1) to convert to a
//						string.	inputArray[0] is the LSB.
//
//	DESCRIPTION : Converts each digit in inputArray to its string
//				representation ("0","1") and places the value in
//				resultantString.
//
//	OUTPUTS : none
//
//	RETURNS : The string representation of inputArray.
//			String will be empty if the resultant string does
//			not represent a valid binary number
//
//*************************************************************************
function binaryArrayToString(inputArray) {
    var value = 0;
    var i = 0;
    var resultantString = new String();

    for (i = inputArray.length - 1; i >= 0; i--)
        resultantString = resultantString + inputArray[i].toString();

    //  make sure that the new string is represents a valid
    //  binary number
    if (!numberIsValid(resultantString, 2)) {
        return resultantString = "";
    }

    return resultantString;
}

//*************************************************************************
//
//	FUNCTION : syndromeMatrixIsValid
//
//	INPUTS : none
//
//	DESCRIPTION : This function checks	the syndrome matrix to ensure that:
//			1.  each syndrome is unique
//			2.  no syndrome is all 0's (this value is reserved for the
//				"no error" condition)
//
//	OUTPUTS : none
//
//	RETURNS : true if the syndrome matrix is valid, false if errors are found
//
//*************************************************************************
function syndromeMatrixIsValid() {
    var currentSyndrome,
        otherSyndrome;
    var currentSyndromeString,
        otherSyndromeString;
    var i = 0,
        j = 0,
        k = 0,
        numberOfOnes = 0;
    var numberOfSyndromeColumns = 0;

    //  syndromeStrings is an array with one entry for each column in the
    //  syndrome matrix
    var syndromeStrings;

    //   syndromeArray holds a column of the syndrome matrix
    //   so it can be made into strings for error syndrome comparison
    var syndromeArray = new Array(numberOfSyndromeRows);

    if (numberOfSyndromeRows == 0) {
        return;
    } else {
        if (document.inputForm.Base[0].checked)  //  binary
        {
            inputDataLength = document.inputForm.inputDataTextbox.value.length;
        } else  // hex
        {
            inputDataLength = document.inputForm.inputDataTextbox.value.length * 4;
        }

        numberOfSyndromeColumns = inputDataLength;

        syndromeStrings = new Array(numberOfSyndromeColumns);

        //  Build the syndromeStrings array
        for (i = 0; i < inputDataLength; i++) {
            for (j = 0; j < numberOfSyndromeRows; j++)
                syndromeArray[j] = syndromeMatrix[j][i];

            syndromeStrings[i] = binaryArrayToString(syndromeArray);
        }
    }

    for (i = 0; i < syndromeStrings.length; i++) {
        currentSyndromeString = syndromeStrings[i];

        //  if syndrome is all 0's, return false
        if (parseInt(currentSyndromeString) == 0) {
            return false;
        }

        // Ensure that each syndrome is unique
        for (j = i + 1; j < syndromeMatrix.length; j++) {
            otherSyndromeString = syndromeStrings[j];

            if (currentSyndromeString == otherSyndromeString) {
                return false;
            }
        }
    }
    return true;
}

//*************************************************************************
//
//	FUNCTION : checkInputs
//
//	INPUTS : none
//
//	DESCRIPTION : Checks the user entered parameters for validity.
//
//	OUTPUTS : none
//
//	RETURNS : true if user entered inputs are valid, false otherwise.
//
//*************************************************************************
function checkInputs() {
    var message = new String();

    if (document.inputForm.inputDataTextbox.value.length == 0) {
        alert("You must enter a value to encode.");
        return false;
    }

    if (document.inputForm.Base[1].checked) {
        if (!numberIsValid(document.inputForm.inputDataTextbox.value, 16)) {
            alert("You entered an invalid hex number for the value to encode.");
            return false;
        }
    } else {
        if (!numberIsValid(document.inputForm.inputDataTextbox.value, 2)) {
            alert("You entered an invalid binary number for the value to encode.");
            return false;
        }
    }

    return true;
}

//*************************************************************************
//
//	FUNCTION : createSyndromeAndParityMatrices
//
//	INPUTS :
//		useExtraParityBit : true if an extra parity bit is to be used
//
//	DESCRIPTION :
//
//	OUTPUTS : none
//
//	RETURNS : none
//
//*************************************************************************
function createSyndromeAndParityMatrices(useExtraParityBit,
                                         inputDataLength) {
    var i = 0,
        j = 0;
    var syndrome = 1;
    var syndromeArray = new Array(numberOfSyndromeRows);
    var parityColumn = 0,
        syndromeColumn = 0;

    //  find number of parity bits
    numberOfParityBits = 0;
    while (Math.pow(2.0, numberOfParityBits) < (numberOfParityBits + inputDataLength + 1))
        numberOfParityBits++;

    numberOfSyndromeRows = Math.ceil(log2(inputDataLength + numberOfParityBits + 1));

    //  Add an extra parity bit if the extra parity bit
    //  is in use.  The number of syndrome rows is adjusted
    //  at the end of the function (this makes it easier
    //  to build the syndrome array).
    if (useExtraParityBit == true) {
        numberOfParityBits++;
        numberOfSyndromeRows++;
    }

    // Initialize parityMatrix
    parityMatrix = new Array(numberOfSyndromeRows);
    for (i = 0; i < numberOfSyndromeRows; i++) {
        parityMatrix[i] = new Array(numberOfParityBits);

        for (j = 0; j < numberOfParityBits; j++)
            parityMatrix[i][j] = 0;
    }

    // Initialize syndromeMatrix and parityMatrix
    syndromeMatrix = new Array(numberOfSyndromeRows);
    for (i = 0; i < numberOfSyndromeRows; i++) {
        syndromeMatrix[i] = new Array(inputDataLength);

        for (j = 0; j < inputDataLength; j++)
            syndromeMatrix[i][j] = 0;

        for (j = 0; j < numberOfParityBits; j++)
            parityMatrix[i][j] = 0;
    }

    // Generate syndromes for syndromeMatrix and parityMatrix
    for (i = 0; i < numberOfParityBits + inputDataLength; i++) {
        //  Create an array that holds the syndrome
        //  translated to a binary number.  Note that if
        //  the extra parity bit is in use, the number
        //  of digits in the syndrome is numberOfSyndromeRows - 1
        //  because the last row of the syndrome matrix will be all 1's
        if (useExtraParityBit == true) {
            stringToBinaryArray(2,
                syndrome.toString(2),
                syndromeArray,
            numberOfSyndromeRows - 1);
        } else {
            stringToBinaryArray(2,
                syndrome.toString(2),
                syndromeArray,
                numberOfSyndromeRows);
        }

        //  If the current syndrome is a power of 2, then it belongs
        //  to the parity matrix
        if (syndrome.valueOf() == Math.pow(2, parityColumn)) {
            //  Add the syndrome to the parity matrix
            for (j = 0; j < syndromeArray.length; j++)
                parityMatrix[j][parityColumn] = syndromeArray[j];

            parityColumn++;
        }
        //  Otherwise, the syndrome applies to a data bit
        else {
            //  Add the syndrome to the syndrome matrix
            for (j = 0; j < syndromeArray.length; j++)
                syndromeMatrix[j][syndromeColumn] = syndromeArray[j];

            syndromeColumn++;
        }

        syndrome++;
    }

    //  if we are to use an extra parity bit, append the extra
    //  bit to both the syndrome and the parity matrices
    if (useExtraParityBit == true) {
        for (i = 0; i < inputDataLength; i++)
            syndromeMatrix[numberOfSyndromeRows - 1][i] = 1;

        //  if the extra parity bit is being used, the parity
        //  matrix that was passed in already has the correct
        //  size.  All that needs to be done here is to add the
        //  extra parity bits.
        for (i = 0; i < numberOfParityBits; i++)
            parityMatrix[numberOfSyndromeRows - 1][i] = 1;
    }
}

//*************************************************************************
//
//	FUNCTION : displayParityEquations
//
//	INPUTS : document : the document to which the output will be written
//			useExtraParityBit : true if an extra parity bit is to be used
//
//	DESCRIPTION : Creates and displays the parity equations based on
//				the syndrome table
//
//	OUTPUTS : none
//
//	RETURNS : none
//
//*************************************************************************
function displayParityEquations(document,
                                inputDataLength,
                                useExtraParityBit) {
    var displayLine = "",
        parityString = "";
    var FLAG = 1; //  Flag indicates whether the "+" sign should be
    //  written
    var i = 0,
        j = 0,
        k = 0;

    displayLine += "<h2>Parity Scheme</h2>"

    for (i = 0; i < numberOfParityBits; i++) {
        FLAG = 1;
        displayLine += "P<SUB>" + i + "</SUB> = ";

        for (j = 0; j < inputDataLength; j++) {
            if (syndromeMatrix[i][j] == 1) {
                if (FLAG) {
                    displayLine += "D<SUB>" + j + "</SUB>";
                    FLAG = 0;
                } else {
                    displayLine += " + " + "D<SUB>" + j + "</SUB>";
                }
            }
        }
        for (k = 0; k < numberOfParityBits; k++) {
            if (k != i) {
                if (parityMatrix[i][k] == 1) {
                    if (FLAG) {
                        displayLine += "P<SUB>" + k + "</SUB>";
                        FLAG = 0;
                    } else {
                        displayLine += " + " + "P<SUB>" + k + "</SUB>";
                    }
                }
            }
        }
        displayLine += "<BR>";
    }

    document.write(displayLine);
}

//*************************************************************************
//
//	FUNCTION : displayDataLengthStatistics
//
//	INPUTS : inputDataLength : the length of the data to be encoded
//		codewordLength : inputDataLength + numberOfParityBits
//		document : the document to which the output will be written
//
//	DESCRIPTION : Displays the number of bits in the input data, the number
//				of parity bits, and the total length of the encoded data.
//
//	OUTPUTS : none
//
//	RETURNS : none
//
//*************************************************************************
function displayDataLengthStatistics(document, inputDataLength, codewordLength) {
    var displayLine = "";

    displayLine = "<TABLE BORDER>"
    displayLine += "<TR>"
    displayLine += "<TH>Length of Data Sequence</TH> <TH>Number of Parity Bits</TH> <TH>Length of CodeWord</TH>"
    displayLine += "</TR><TR>"
    displayLine += "<TD ALIGN=CENTER>" + inputDataLength + "</TD>"
    displayLine += "<TD ALIGN=CENTER>" + numberOfParityBits + "</TD>"
    displayLine += "<TD ALIGN=CENTER>" + codewordLength + "</TD>"
    displayLine += "</TR></TABLE>"

    document.write(displayLine);
}

//*************************************************************************
//
//	FUNCTION : displaySyndromeTable
//
//	INPUTS : document : the document to which the output will be written
//			inputDataLength : the length of the data to be encoded
//			codewordLength : inputDataLength + numberOfParityBits
//
//	DESCRIPTION : Displays the syndromes in a table that shows the combinations
//				of incorrect parity checks (syndromes), and the data bits
//				that are in error based on those syndromes.
//
//	OUTPUTS : none
//
//	RETURNS : none
//
//*************************************************************************
function displaySyndromeTable(document,
                              inputDataLength,
                              codewordLength) {
    var displayLine = "";

    displayLine = "<TABLE BORDER>"
    displayLine += "<h2>Syndrome Table</h2>"
    displayLine += "<TR>"
    displayLine += "<TH ALIGN=CENTER> STATE </TH><TH ALIGN=CENTER> Parity Bit(s)in error </TH>"
    displayLine += "<TH ALIGN=CENTER> Syndrome </TH>"
    displayLine += "</TR><TR>"
    displayLine += "<TD>No Error</TD><TD HALIGN=CENTER>None</TD>"
    displayLine += "<TD ALIGN=CENTER>"
    for (i = 0; i < numberOfParityBits; i++) {
        displayLine += "0"
    }
    displayLine += "</TD>"
    for (i = 0; i < numberOfParityBits; i++) {
        displayLine += "</TR><TR>"
        displayLine += "<TD>P<SUB>" + i + "</SUB> error</TD><TD HALIGN=CENTER>"
        for (j = numberOfSyndromeRows - 1; j >= 0; j--) {
            if (parityMatrix[j][i] == 1) {
                displayLine += "P<SUB>" + j + "</SUB>, "
            }
        }
        displayLine += "<TD ALIGN=CENTER>"

        for (j = numberOfSyndromeRows - 1; j >= 0; j--)
            displayLine += parityMatrix[j][i]
        displayLine += "</TD>"
    }

    for (i = 0; i < inputDataLength; i++) {
        displayLine += "</TR><TR>"
        displayLine += "<TD>D<SUB>" + i + "</SUB> error</TD><TD HALIGN=CENTER>"
        for (j = numberOfSyndromeRows - 1; j >= 0; j--) {
            if (syndromeMatrix[j][i] == 1) {
                displayLine += "P<SUB>" + j + "</SUB>, "
            }
        }
        displayLine += "<TD ALIGN=CENTER>"

        for (j = numberOfSyndromeRows - 1; j >= 0; j--)
            displayLine += syndromeMatrix[j][i]

        displayLine += "</TD>"
    }
    displayLine += "</TR></TABLE>"

    document.write(displayLine);
}

//*************************************************************************
//
//	FUNCTION : displayCheckMatrix
//
//	INPUTS : document : the document to which the output will be written
//			inputDataLength : the length of the data to be encoded
//			codewordLength : inputDataLength + numberOfParityBits
//			useExtraParityBit: true if the extra parity bit is to be used
//			allowModification : true if the user should be allowed to
//						change the state assignments of the syndrome bits
//			errorSyndrome ; a string that holds the error syndrome for a
//						received code word.  Note that all zeros is a valid
//						syndrome.
//
//	DESCRIPTION : Displays the syndromes in a matrix format.  This function
//				also highlights a given syndrome that corresponds to an
//				erroneous received code word if errorSyndromeString is
//				defined.
//
//	OUTPUTS : none
//
//	RETURNS : none
//
//*************************************************************************
function displayCheckMatrix(document,
                            inputDataLength,
                            useExtraParityBit,
                            allowModification,
                            errorSyndrome) {
    var i = 0,
        j = 0;
    var displayLine = "";
    var numberOfSyndromeColumns = 0;
    var row = 0,
        column = 0,
        syndromeErrorColumn = -1,
        parityErrorColumn = -1;
    //  syndromeStrings has one entry for each column in the syndrome
    //  matrix
    var syndromeStrings = new Array(numberOfSyndromeRows);

    // parityStrings has one for each column in the parity matrix
    var parityStrings = new Array(numberOfSyndromeRows);

    //   parityArray and syndromeArray hold the columns of each matrix
    //   so they can be made into strings for error syndrome comparison
    var parityArray = new Array(numberOfSyndromeRows),
        syndromeArray = new Array(numberOfSyndromeRows);

    if (numberOfSyndromeRows == 0) {
        return;
    } else {
        numberOfSyndromeColumns = syndromeMatrix[1].length;
    }

    //*************************************************************
    //  Determine which column in the syndrome or parity matrices
    //  holds the error syndrome
    //*************************************************************
    if (parseInt(errorSyndrome) != 0) {
        //  Build the syndromeStrings array
        for (i = 0; i < inputDataLength; i++) {
            for (j = 0; j < numberOfSyndromeRows; j++)
                syndromeArray[j] = syndromeMatrix[j][i];

            syndromeStrings[i] = binaryArrayToString(syndromeArray);
        }

        for (i = 0; i < numberOfParityBits; i++) {
            for (j = 0; j < numberOfSyndromeRows; j++)
                parityArray[j] = parityMatrix[j][i];

            parityStrings[i] = binaryArrayToString(parityArray);
        }

        //  check the string arrays for the error syndrome
        for (i = 0; i < syndromeStrings.length && (syndromeErrorColumn == -1); i++)
            if (syndromeStrings[i] == errorSyndrome) {
                syndromeErrorColumn = i;
            }

        if (syndromeErrorColumn == -1) {
            for (i = 0; i < parityStrings.length && (parityErrorColumn == -1); i++)
                if (parityStrings[i] == errorSyndrome) {
                    parityErrorColumn = i;
                }
        }
    }

    displayLine = "<h2>Syndrome Matrix</h2>";
    displayLine += "<FORM><TABLE  BORDER>";

    //  print header line
    displayLine += "<TR>"
    for (i = syndromeMatrix[numberOfSyndromeRows - 1].length - 1; i >= 0; i--)
        displayLine += "<TH ALIGN=CENTER WIDTH=25>D<SUB>" + i + "</SUB></TH>";

    for (i = numberOfParityBits - 1; i >= 0; i--)
        displayLine += "<TH ALIGN=CENTER WIDTH=25>P<SUB>" + i + "</SUB></TH>";

    //  start a new row
    displayLine += "</TR>"

    //*********************************
    //  print syndrome and parity data
    //*********************************
    for (row = numberOfSyndromeRows - 1; row >= 0; row--) {
        //  start a new row
        displayLine += "<TR>"

        //  syndrome bits
        for (column = inputDataLength - 1; column >= 0; column--) {
            //  if modification of the check matrix is allowed, assign an event
            //  handler for each of the syndrome bit entries
            if (allowModification == true) {
                displayLine += "<TD WIDTH=25><INPUT SIZE=4 TYPE=\"text\" VALUE="
                    + syndromeMatrix[row][column]
                    + " readonly"
                    + " ONFOCUS=\"handleSyndromeElementChange(" + row + "," + column + ")\"></TD>";
            } else {
                //  highlight the entry if it is part of the error syndrome
                if (column == syndromeErrorColumn) {
                    displayLine += "<TD WIDTH=25 BGCOLOR=yellow >" + syndromeMatrix[row][column] + "</TD>";
                } else {
                    displayLine += "<TD WIDTH=25>" + syndromeMatrix[row][column] + "</TD>";
                }
            }
        }
        //  parity bits
        for (column = numberOfParityBits - 1; column >= 0; column--) {
            //  if modification of the check matrix is allowed, assign an event
            //  handler for each of the syndrome bit entries
            if (allowModification == true) {
                //  Allow edit of extra parity bit only
                if (useExtraParityBit && (row == numberOfSyndromeRows - 1)) {
                    displayLine += "<TD WIDTH= 25><INPUT SIZE=4 TYPE=\"text\" VALUE="
                        + parityMatrix[row][column]
                        + " readonly"
                        + " ONFOCUS=\"handleParityElementChange(" + row + "," + column + ")\"></TD>";
                } else {
                    displayLine += "<TD WIDTH=25>" + parityMatrix[row][column] + "</TD>";
                }
            } else {
                //  highlight the entry if it is part of the error syndrome
                if (column == parityErrorColumn) {
                    displayLine += "<TD WIDTH=25 BGCOLOR=yellow>" + parityMatrix[row][column] + "</TD>";
                } else {
                    displayLine += "<TD WIDTH=25>" + parityMatrix[row][column] + "</TD>";
                }
            }
        }

        //  end the row
        displayLine += "</TR>"
    }
    displayLine += "</TABLE></FORM>"

    //  If we are not modifying the matrix,
    //  Print a caption under the matrix to explain what is being shown
    if (allowModification == false) {
        if (parseInt(errorSyndrome) == 0) {
            displayLine += "<BR>The check matrix shows that <FONT COLOR=green><B>the received codeword contains no errors</B></FONT>.</BR>";
        } else {
            if (useExtraParityBit == true) {
                //  if the error syndrome is not 0, but it is not found in the syndrome
                //  or parity matrices, assume a double bit error
                if ((syndromeErrorColumn == -1) && (parityErrorColumn == -1)) {
                    displayLine += "<BR>The error syndrome " + errorSyndrome + " indicates that <FONT COLOR=red><B>the received codeword contains a <U>double bit</U> error</B></FONT>.</BR>";
                } else {
                    displayLine += "<BR>The check matrix shows that <FONT COLOR=red><B>the received codeword contains an error</B></FONT>.  The erroneous bit is indicated by the highlighted column.</BR>";
                }
            } else {
                displayLine += "<BR>The check matrix shows that <FONT COLOR=red><B>the received codeword contains an error</B></FONT>.  The erroneous bit is indicated by the highlighted column.</BR>";
            }
        }
    }

    document.write(displayLine);
}

//*************************************************************************
//
//	FUNCTION : displayResults
//
//	INPUTS : document : the document to which the output will be written
//			inputDataLength : the length of the data to be encoded
//			codewordLength : inputDataLength + numberOfParityBits
//			errorSyndromeString ; a string that holds the error syndrome
//						for a received code word
//			useExtraParityBit : true if an extra parity bit is to be used
//
//	DESCRIPTION : This function handles the click event for an element of
//				the syndrome matrix.
//
//	OUTPUTS : none
//
//	RETURNS : none
//
//*************************************************************************
function displayResults(document,
                        inputDataLength,
                        codewordLength,
                        useExtraParityBit,
                        errorSyndromeString) {
    Top = "<HTML><HEAD><TITLE>Results</TITLE></HEAD><BODY bgcolor = beige>"
    parent.resultsFrame.document.open()
    parent.resultsFrame.document.write(Top);

    //  Display lengths of the components of the encoded data
    displayDataLengthStatistics(parent.resultsFrame.document,
        inputDataLength,
        codewordLength);

    parent.resultsFrame.document.write("<BR><BR>");

    // Generate and display the Parity Scheme
    displayParityEquations(parent.resultsFrame.document,
        inputDataLength,
        useExtraParityBit);

    parent.resultsFrame.document.write("<BR><BR>");

    // Display the syndrome table
    /*	displaySyndromeTable(parent.resultsFrame.document,
                        inputDataLength,
                        codewordLength);

        parent.resultsFrame.document.write("<BR><BR>");
    */

    displayCheckMatrix(parent.resultsFrame.document,
        inputDataLength,
        useExtraParityBit,
        false,
        errorSyndromeString);

    parent.resultsFrame.document.write("<BR><BR>");

    Bottom = "</BODY> </HTML>"
    parent.resultsFrame.document.write(Bottom);
    parent.resultsFrame.document.close();
}

//*************************************************************************
//
//	FUNCTION : handleSyndromeMatrixChange
//
//	INPUTS : row,
//			col : The row and col in the syndromeMatrix array that holds
//				the data to be modified
//	DESCRIPTION : This function handles the onBlur event for an input box
//				when editing the syndrome matrix displayed by displayCheckMatrix().
//
//	OUTPUTS : none
//
//	RETURNS : none
//
//*************************************************************************
function handleSyndromeMatrixChange(row, col) {
    var command = new String();

    if (syndromeMatrix[row][col] == 1) {
        syndromeMatrix[row][col] = 0;
    } else {
        syndromeMatrix[row][col] = 1;
    }

    //  show new value in matrix
    viewAndModifySyndromes();
}

//*************************************************************************
//
//	FUNCTION : handleParityMatrixChange
//
//	INPUTS : row,
//			col : The row and col in the ParityMatrix array that holds
//				the data to be modified
//
//	DESCRIPTION : This function handles the onBlur event for an input box
//				when editing the syndrome matrix displayed by displayCheckMatrix().
//
//	OUTPUTS : none
//
//	RETURNS : none
//
//*************************************************************************
function handleParityMatrixChange(row, col) {
    if (parityMatrix[row][col] == 1) {
        parityMatrix[row][col] = 0;
    } else {
        parityMatrix[row][col] = 1;
    }

    //  show new value in matrix
    viewAndModifySyndromes();
}

//*************************************************************************
//
//	FUNCTION : viewAndModifySyndromes
//
//	INPUTS : none
//
//	DESCRIPTION :  Displays the syndrome matrix in a new window in an editable
//					format.
//
//	OUTPUTS : none
//
//	RETURNS : none
//
//*************************************************************************
function viewAndModifySyndromes() {

    var inputDataLength = 0;

    if (document.inputForm.Base[0].checked)  //  binary
    {
        inputDataLength = document.inputForm.inputDataTextbox.value.length;
    }

    if (checkInputs()) {
        if ((syndromeMatrix == null) || (parityMatrix == null)) {
            createSyndromeAndParityMatrices(document.inputForm.useExtraParityBitCheckbox.checked,
                inputDataLength);
        }

        if (SyndromeEditWindow == null) {
            SyndromeEditWindow = window.open("", "", "scrollbars=yes, resizable=yes, width=500, height=400");
        } else {
            if (SyndromeEditWindow.closed) {
                SyndromeEditWindow = window.open("", "", "scrollbars=yes, resizable=yes, width=500, height=400");
            }
        }
        SyndromeEditWindow.opener = self;

        //  Insert script to handle syndrome data changes
        SyndromeEditWindow.document.open();
        SyndromeEditWindow.document.write("<HTML><HEAD><TITLE>Edit Syndromes</TITLE>");

        SyndromeEditWindow.document.write ("<SCRIPT LANGUAGE=\"JavaScript\">");

        SyndromeEditWindow.document.write ("function handleSyndromeElementChange(row, col)");
        SyndromeEditWindow.document.write ("{opener.handleSyndromeMatrixChange(row, col);}");
        SyndromeEditWindow.document.write ("function handleParityElementChange(row, col)");
        SyndromeEditWindow.document.write ("{opener.handleParityMatrixChange(row, col);}");

        SyndromeEditWindow.document.write ("</SCRIPT></HEAD><BODY BGCOLOR=beige>");

        SyndromeEditWindow.document.write("<B>The syndrome matrix is shown below...simply click a bit to toggle it.  The syndromes must follow the following rules:");
        SyndromeEditWindow.document.write("<OL type=1><LI>Each syndrome must be unique");
        SyndromeEditWindow.document.write("<LI>No syndrome may be all 0's (this value is reserved for the \"no error\" condition)</OL></B>");

        //  Write syndrome matrix in editable format
        displayCheckMatrix(SyndromeEditWindow.document,
            inputDataLength,
            document.inputForm.useExtraParityBitCheckbox.checked,
            true,
            "0");

//		SyndromeEditWindow.document.write("<FORM><input onclick=window.close() type=button value=\"Close\" name=closeEdtWindowButton LANGUAGE=javascript ></FORM>");
        SyndromeEditWindow.document.write("</BODY></HTML>");
    }
}

//*************************************************************************
//
//	FUNCTION : inputDataTextbox_onchange
//
//	INPUTS : form: the form that holds the received data textbox
//
//	DESCRIPTION : Clears the receivedDataTextbox control if the data
//			to encode is changed.  This prevents the user from
//			calculating and error syndrome based on a syndrome
//			matrix that was created for the previously entered
//			data to encode value.
//
//	OUTPUTS : none
//
//	RETURNS : none.
//
//*************************************************************************
function inputDataTextbox_onchange() {
    document.inputForm.receivedDataTextbox.value = "";
    parent.resultsFrame.location.href = "results.html"

    syndromeMatrix = null;
    parityMatrix = null;
    numberOfSyndromeRows = 0;
    numberOfParityBits = 0;
}

//*************************************************************************
//
//	FUNCTION : Base_onclick
//
//	INPUTS : NONE
//
//	DESCRIPTION : Deletes the syndromeMatrix and ParityMatrix so that the will
//					be recalculated based on the changed data
//
//	OUTPUTS : none
//
//	RETURNS : none.
//
//*************************************************************************
function Base_onclick() {
    document.inputForm.receivedDataTextbox.value = "";

    syndromeMatrix = null;
    parityMatrix = null;
    numberOfSyndromeRows = 0;
    numberOfParityBits = 0;
}

//*************************************************************************
//
//	FUNCTION : useExtraParityBitCheckbox_onclick
//
//	INPUTS : NONE
//
//	DESCRIPTION : Deletes the syndromeMatrix and ParityMatrix so that the will
//					be recalculated based on the changed data
//
//	OUTPUTS : none
//
//	RETURNS : none.
//
//*************************************************************************
function useExtraParityBitCheckbox_onclick() {
    document.inputForm.receivedDataTextbox.value = "";

    syndromeMatrix = null;
    parityMatrix = null;
    numberOfSyndromeRows = 0;
    numberOfParityBits = 0;
}

//*************************************************************************
//
//	FUNCTION : ResetForm
//
//	INPUTS : none
//
//	DESCRIPTION : Clears the input form
//
//	OUTPUTS : none
//
//	RETURNS : none.
//
//*************************************************************************
function ResetForm() {
    document.inputForm.inputDataTextbox.value = "";
    document.inputForm.receivedDataTextbox.value = "";
    document.inputForm.useExtraParityBitCheckbox.checked = false;
    parent.resultsFrame.location.href = "results.html"

    syndromeMatrix = null;
    parityMatrix = null;
    numberOfSyndromeRows = 0;
    numberOfParityBits = 0;
}

//*************************************************************************
//
//	FUNCTION : computeHammingCode
//
//	INPUTS : none
//
//	DESCRIPTION : Computes the Hamming code for the given input data word.
//
//	OUTPUTS : none
//
//	RETURNS : none.
//
//*************************************************************************
function computeHammingCode() {
    var codewordLength = 0;
    var inputDataLength = 0;
    var codewordLength = 0;
    var inputDataParity = new String();
    var extraParityBit = new String();
    var parityBit = 0;
    var i = 0,
        j = 0;
    var parityValue = 0;
    var inputDataArray;
    var returnValue = false;

    //  Validate user input
    if (checkInputs()) {
        //  convert input data to binary array for parity bits
        //  calculation
        if (document.inputForm.Base[0].checked)  //  binary
        {
            inputDataLength = document.inputForm.inputDataTextbox.value.length;
            inputDataArray = new Array(inputDataLength);

            returnValue = stringToBinaryArray(2,
                document.inputForm.inputDataTextbox.value,
                inputDataArray,
                inputDataLength);
        }

        if (returnValue != true) {
            alert("Could not convert input data to binary array.  Check that all input data digits are valid for the selected radix.");
            return;
        }

        if ((syndromeMatrix == null) || (parityMatrix == null))
            // Create syndromeMatrix and parityMatrix
        {
            createSyndromeAndParityMatrices(document.inputForm.useExtraParityBitCheckbox.checked,
                inputDataLength);
        } else {	//  If the syndromeMatrix already exists, make sure that the syndrome matrix
            //  is valid
            if (!syndromeMatrixIsValid()) {
                message = "The syndrome matrix contains an error.  Click the \"View/Modify Syndromes\" button and make sure that:\r\n";
                message += "   1.  each syndrome is unique\r\n";
                message += "   2.  no syndrome is all 0's (this value is reserved for the \"no error\" condition)\r\n";

                alert(message);
                return;
            }
        }

        codewordLength = numberOfParityBits + inputDataLength;

        //  calculate parity
        //  Start with most significant parity bit, bitwise AND the
        //  input data with each row of the syndrome matrix and
        //  XOR the resulting bits to obtain each parity value
        for (parityBit = numberOfParityBits - 1; parityBit >= 0; parityBit--) {
            parityValue = syndromeMatrix[parityBit][0] & inputDataArray[0];
            for (i = 1; i < inputDataLength; i++)
                parityValue = parityValue ^ (syndromeMatrix[parityBit][i] & inputDataArray[i]);

            inputDataParity += parityValue.toString();
        }

        //  if using the extra parity bit, calculate the extra parity for all of the other bits
        if (document.inputForm.useExtraParityBitCheckbox.checked) {
            //  start at index 1 in the inputDataParity string to skip the extra parity bit
            parityValue = parseInt(inputDataParity.charAt(1));
            for (i = 2; i < inputDataParity.length; i++)
                parityValue = parityValue ^ parseInt(inputDataParity.charAt(i));

            for (i = 0; i < inputDataArray.length; i++)
                parityValue = parityValue ^ parseInt(inputDataArray[i]);

            //  set the extra parity bit (character 0 in the inputDataParity string)
            inputDataParity = parityValue.toString() + inputDataParity.substring(1, inputDataParity.length);
        }

        //  Display results
        displayResults(parent.resultsFrame.document,
            inputDataLength,
            codewordLength,
            document.inputForm.useExtraParityBitCheckbox.checked,
            "0");

        //  Fill in the receivedDataTextbox with the codeword
        document.inputForm.receivedDataTextbox.value = binaryArrayToString(inputDataArray) + inputDataParity;

    }
}

//*************************************************************************
//
//	FUNCTION : calculateErrorSyndrome
//
//	INPUTS : none
//
//	DESCRIPTION : Computes the error syndrome for the erroneous received
//				data word entered by the user.
//
//	OUTPUTS : none
//
//	RETURNS : none.
//
//*************************************************************************
function calculateErrorSyndrome() {
    var receivedData = document.inputForm.receivedDataTextbox.value;
    var inputDataLength = 0;
    var receivedDataArray = new Array(receivedData.length);
    var syndromeValue = 0;
    var syndromeBit = 0;
    var receivedDataArray;
    var returnValue = false;
    var syndromeValueString = String();

    if (document.inputForm.Base[0].checked)  //  binary
    {
        inputDataLength = document.inputForm.inputDataTextbox.value.length;
    } else  // hex
    {
        inputDataLength = document.inputForm.inputDataTextbox.value.length * 4;
    }

    //  Make sure that received data is the same length as the data
    //  to be encoded plus the parity bits
    if (receivedData.length != inputDataLength + numberOfParityBits) {
        alert("Received code word length must be [length_of_data_sequence + number_of_parity_bits] long.");
        return;
    }

    //  Make sure that the syndrome matrix and parity matrix have been calculated based on the
    //  current data
    if ((parityMatrix == null) || (syndromeMatrix == null)) {
        alert("The Hamming code for the current inputs must be calculated before simulating an error.  Click the \"Compute Hamming Code\" button and try again.");
        return;
    }

    //  Make sure that the syndrome matrix is valid
    if (!syndromeMatrixIsValid()) {
        message = "The syndrome matrix contains an error.  Click the \"View/Modify Syndromes\" button and make sure that:\r\n";
        message += "   1.  each syndrome is unique\r\n";
        message += "   2.  no syndrome is all 0's (this value is reserved for the \"no error\" condition)\r\n";

        alert(message);
        return;
    }

    //  convert received data to binary array for parity bits calculation
    returnValue = stringToBinaryArray(2,
        receivedData,
        receivedDataArray,
        receivedData.length);

    if (returnValue != true) {
        alert("Could not convert received data to binary array.  Check that all input data digits are valid for the selected radix.");
        return;
    }

    //  Calculate error syndrome
    //  Start with most significant parity bit, bitwise AND the input data with
    //  each row of the syndrome matrix and XOR the resulting bits to obtain
    //  each parity value
    for (syndromeBit = numberOfSyndromeRows - 1; syndromeBit >= 0; syndromeBit--) {
        syndromeValue = parityMatrix[syndromeBit][0] & receivedDataArray[0];
        //  Parity matrix
        for (i = 1; i < numberOfParityBits; i++)
            syndromeValue = syndromeValue ^ (parityMatrix[syndromeBit][i] & receivedDataArray[i]);

        //  Syndrome matrix
        for (j = i; j < receivedDataArray.length; j++)
            syndromeValue = syndromeValue ^ (syndromeMatrix[syndromeBit][j - numberOfParityBits] & receivedDataArray[j]);

        syndromeValueString += syndromeValue.toString();
    }

    //  Display results
    displayResults(parent.resultsFrame.document,
        inputDataLength,
        receivedData.length,
        document.inputForm.useExtraParityBitCheckbox.checked,
        syndromeValueString);
}

//--></SCRIPT>