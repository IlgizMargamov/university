import rpn.Notation;
import rpn.ReversePolishNotationImpl;

public class Main {
    public static void main(String[] args) {
        Notation reversePolishNotation = new ReversePolishNotationImpl();
        System.out.println(reversePolishNotation.calculateExpression("233+**"));
    }
}
