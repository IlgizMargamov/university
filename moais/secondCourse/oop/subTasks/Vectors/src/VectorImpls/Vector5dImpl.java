package VectorImpls;

import BaseVector.BaseVector;
import BaseVector.Operation;

/**
 * Vector in 5d
 */
final public class Vector5dImpl extends BaseVector {
    public Vector5dImpl(int[] components) {
        super(components);
    }

    @Override
    public Vector5dImpl processOperation(BaseVector another, Operation operation) {
        int[] anotherComponentsArray = another.getComponentsArray();
        if (this.getComponentsArray().length != anotherComponentsArray.length) throw new IllegalArgumentException();

        int[] componentsArray=this.getComponentsArray();

        int[] result = executeOperation(operation, componentsArray, anotherComponentsArray);
        return new Vector5dImpl(result);
    }
}
