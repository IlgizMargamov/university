package VectorImpls;

import BaseVector.BaseVector;
import BaseVector.Operation;


/**
 * Vector in 3d
 */
final public class Vector3dImpl extends BaseVector {
    public Vector3dImpl(int[] components) {
        super(components);
    }

    @Override
    public Vector3dImpl processOperation(BaseVector another, Operation operation) {
        int[] anotherComponentsArray = another.getComponentsArray();
        if (this.getComponentsArray().length != anotherComponentsArray.length) throw new IllegalArgumentException();

        int[] componentsArray=this.getComponentsArray();

        int[] result = executeOperation(operation, componentsArray, anotherComponentsArray);

        return new Vector3dImpl(result);
    }
}
