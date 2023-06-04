import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ReversePolishNotation_Tests {
    private final Notation reversePolishNotation = new ReversePolishNotationImpl();
    private final Map<String, String> tests = Map.of(
            "12+", "3",
             "465*-", "-26",
             "1362/*+1-", "9",
            "56-13*52+33/-*+", "17"
    );

    @Test
    void check() {
        for (String key : tests.keySet()) {
            String expected = tests.get(key);
            String actual = reversePolishNotation.calculate(key);
            assertEquals(expected, actual);
        }
    }
}
