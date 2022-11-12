package BaseVector;

/**
 * Interface for geometric vectors
 */
public interface Vector {
    /**
     * Method that adds vector
     *
     * @param another vector to add
     * @return resulting vector
     */
    BaseVector add(BaseVector another);

    /**
     * Method that subtracts vector
     *
     * @param another vector to subtract
     * @return resulting vector
     */
    BaseVector subtract(BaseVector another);

    /**
     * Method that multiplies vector by scalar
     *
     * @param another vector by which to multiply
     * @return resulting vector
     */
    BaseVector scalarProduct(BaseVector another);

    /**
     * Method that checks whether two vectors are equal by components
     *
     * @param another vector with which to compare
     * @return true if all components are equal, otherwise is false
     */
    boolean equalsByComponent(BaseVector another);
}
