import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import rpn.Notation;
import rpn.ReversePolishNotationImpl;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class Tests {
    private static Notation reversePolishNotation;

    @BeforeAll
    static void setUp() {
        reversePolishNotation = new ReversePolishNotationImpl();
    }

    @Test
    void additionTest() {
        checkOperation("23+", "5");
        checkOperation("123++", "6");
    }

    @Test
    void subtractionTest() {
        checkOperation("23-", "-1");
        checkOperation("234--", "3");
    }

    @Test
    void multiplicationTest() {
        checkOperation("23*", "6");
        checkOperation("234**", "24");
    }

    @Test
    void divisionTest() {
        checkOperation("62/", "3");
        checkOperation("662//", "2");
        checkOperation("01/", "0");
    }

    @Test
    void multiOperationTest() {
        checkOperation("623+-", "1");
        checkOperation("623+*", "30");
    }

    @Test
    void exceptionsTests() {
        checkOperation("34-21+55*", "Error: operator is missing");
        checkOperation("11-0/", "Error: denominator is zero");
        checkOperation("1/", "Error: operand is missing");
    }

    private void checkOperation(String expression, String expected) {
        String actual = reversePolishNotation.calculateExpression(expression);
        assertEquals(expected, actual);
    }
}
