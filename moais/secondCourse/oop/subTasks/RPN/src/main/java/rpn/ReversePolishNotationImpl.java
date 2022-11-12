package rpn;

import java.util.Stack;

/**
 * Class for calculating in Reverse Polish Notation
 */
public class ReversePolishNotationImpl implements Notation {
    private final char[] operations = new char[]{'+', '-', '*', '/', '^'};

    /**
     * @param expression is expression in RPN which you want to calculate
     * @return string representation of calculated expression
     * */
    @Override
    public String calculateExpression(String expression) {
        Stack<java.io.Serializable> stack = new Stack<>();

        for (int i = 0; i < expression.length(); i++) {
            char current = expression.charAt(i);
            if (tryGetOperation(current) == ' ') {
                stack.push(current);
            } else {
                if (stack.size() < 2) return "Error: operand is missing";
                int rightOperand = Integer.parseInt(stack.pop().toString());
                int leftOperand = Integer.parseInt(stack.pop().toString());

                String x = evaluate(stack, current, rightOperand, leftOperand);

                if (x != null) return x;
            }
        }
        return stack.size() > 1 ? "Error: operator is missing" : stack.pop().toString();
    }

    private String evaluate(Stack<java.io.Serializable> stack, char current, int rightOperand, int leftOperand) {
        switch (current) {
            case '+' -> stack.push(leftOperand + rightOperand);
            case '-' -> stack.push(leftOperand - rightOperand);
            case '*' -> stack.push(leftOperand * rightOperand);
            case '/' -> {
                if (rightOperand == 0) return "Error: denominator is zero";
                stack.push(leftOperand / rightOperand);
            }
        }

        return null;
    }

    private char tryGetOperation(char current) {
        for (char operation : operations) {
            if (current == operation) {
                return current;
            }
        }

        return ' ';
    }
}
