package VectorImpls;

import BaseVector.BaseVector;
import BaseVector.Operation;

/**
 * Vector in Nd
 */
final public class VectorNdImpl extends BaseVector {
    public VectorNdImpl(int[] componentsArray) {
        super(componentsArray);
    }

    @Override
    public VectorNdImpl processOperation(BaseVector another, Operation operation) {
        int[] anotherComponentsArray = another.getComponentsArray();
        if (this.getComponentsArray().length != anotherComponentsArray.length) throw new IllegalArgumentException();

        int[] componentsArray=this.getComponentsArray();

        int[] result = executeOperation(operation, componentsArray, anotherComponentsArray);
        return new VectorNdImpl(result);
    }
}
