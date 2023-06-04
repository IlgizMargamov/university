public class Main {
    public static void main(String[] args) {
        Notation reversePolishNotation = new ReversePolishNotationImpl();
        System.out.println(reversePolishNotation.calculate("10/"));
    }
}
