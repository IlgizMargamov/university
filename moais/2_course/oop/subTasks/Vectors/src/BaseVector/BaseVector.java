package BaseVector;

import java.util.Arrays;
import java.util.Objects;

import static BaseVector.Operation.*;

public abstract class BaseVector implements Vector {
    private final int[] mi_componentsArray;
    private final int mi_componentsArrayLength;

    public BaseVector(int[] components) {
        mi_componentsArrayLength = components.length;
        mi_componentsArray = new int[mi_componentsArrayLength];

        System.arraycopy(components, 0, mi_componentsArray, 0, mi_componentsArrayLength);
    }

    @Override
    public BaseVector add(BaseVector another) {
        return processOperation(another, ADD);
    }

    @Override
    public BaseVector subtract(BaseVector another) {
        return processOperation(another, SUBTRACT);
    }

    @Override
    public BaseVector scalarProduct(BaseVector another) {
        return processOperation(another, MULTIPLY);
    }

    @Override
    public boolean equalsByComponent(BaseVector another) {
        if (this == another) return true;

        if (mi_componentsArrayLength != another.mi_componentsArrayLength) return false;

        for (int i = 0; i < mi_componentsArrayLength; i++) {
            if (mi_componentsArray[i] != another.mi_componentsArray[i]) return false;
        }

        return true;
    }

    @Override
    public String toString() {
        return "BaseVector.Vector: " + Arrays.toString(mi_componentsArray);
    }

    /**
     * Get component from vector
     *
     * @param index component number to return
     * @return component of vector
     */
    public int getComponent(int index) {
        return mi_componentsArray[index];
    }

    /**
     * Get all components of vector
     *
     * @return all components of vector
     */
    public int[] getComponentsArray() {
        return mi_componentsArray.clone();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BaseVector vector = (BaseVector) o;
        return mi_componentsArrayLength == vector.mi_componentsArrayLength && Arrays.equals(mi_componentsArray, vector.mi_componentsArray);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(mi_componentsArrayLength);
        result = 31 * result + Arrays.hashCode(mi_componentsArray);
        return result;
    }

    /**
     * Method for evaluating expressions with vectors
     *
     * @param another   vector which will be the second operand
     * @param operation what to do with vectors
     * @return resulting vector
     */
    public abstract BaseVector processOperation(BaseVector another, Operation operation);

    /**
     * Method which executes needed actions
     *
     * @param operation              operation to execute
     * @param componentsArray        components of one operand
     * @param anotherComponentsArray components of another operand
     * @return components of resulting array
     */
    protected int[] executeOperation(Operation operation, int[] componentsArray, int[] anotherComponentsArray){
        int[] result=new int[componentsArray.length];

        switch (operation) {
            case ADD:
                for (int i = 0; i < anotherComponentsArray.length; i++) {
                    result[i] = componentsArray[i] + anotherComponentsArray[i];
                }
                break;
            case SUBTRACT:
                for (int i = 0; i < anotherComponentsArray.length; i++) {
                    result[i] = componentsArray[i] - anotherComponentsArray[i];;
                }
                break;
            case MULTIPLY:
                for (int i = 0; i < anotherComponentsArray.length; i++) {
                    result[i] = componentsArray[i] * anotherComponentsArray[i];;
                }
                break;
        }
        return result;
    }
}
