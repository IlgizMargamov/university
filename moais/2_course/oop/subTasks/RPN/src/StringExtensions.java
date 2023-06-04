public class StringExtensions {
    public static String getExpressionSplittable(String expression) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < expression.length(); i++) {
            result.append(" ").append(expression.charAt(i));
        }
        return result.toString();
    }
}
