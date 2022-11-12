package rpn;

/**
 * Notation for calculating in different notations
 * */
public interface Notation {
    /**
     * Method which calculates in Reverse Polish Notation
     */
    String calculateExpression(String expression);
}
