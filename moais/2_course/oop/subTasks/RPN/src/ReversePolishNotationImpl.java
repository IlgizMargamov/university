import java.util.Stack;

public class ReversePolishNotationImpl implements Notation {

    @Override
    public String calculate(String toCalculate) {
        Stack<java.io.Serializable> stack=new Stack<>();

        String[] toCalculateArr = StringExtensions
                .getExpressionSplittable(toCalculate)
                .trim()
                .split(" ");

        for (String current : toCalculateArr){
            if (tryGetOperation(current) == null){
                stack.push(current);
                continue;
            }
            else {
                int rightOperand=Integer.parseInt(stack.pop().toString());
                int leftOperand=Integer.parseInt(stack.pop().toString());

                if (current.equals("+")){
                    stack.push(leftOperand+rightOperand);
                }
                if (current.equals("-")){
                    stack.push(leftOperand-rightOperand);
                }
                if (current.equals("*")){
                    stack.push(leftOperand*rightOperand);
                }
                if (current.equals("/")){
                    if (rightOperand==0) throw new ArithmeticException();
                    stack.push(leftOperand/rightOperand);
                }
            }
        }

        return stack.pop().toString();
    }

    private String tryGetOperation(String current){
        for (String operation : operations) {
            if (current.equals(operation)) {
                return current;
            }
        }

        return null;
    }

    private final String[] operations = new String[]{"+", "-", "*", "/", "^"};
}
