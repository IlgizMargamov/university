import BaseVector.BaseVector;
import VectorImpls.Vector3dImpl;
import VectorImpls.Vector5dImpl;
import VectorImpls.VectorNdImpl;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.*;

/**
 * Tests for classes inheriting Vector
 */
public class Tests {
    private Random random;

    @Before
    public void setUp() {
        random = new Random();
    }

    /**
     * Tests for equalByComponent and addition methods
     */
    @Test
    public void equalsByComponentTest() { // addTest as well due to operation used
        for (int i = 0; i < 25; i++) {
            BaseVector v1 = new Vector3dImpl(new int[]{random.nextInt(), random.nextInt(), random.nextInt()});
            BaseVector v2 = new Vector3dImpl(new int[]{random.nextInt(), random.nextInt(), random.nextInt()});

            BaseVector actual = v1.add(v2);

            BaseVector expected = new Vector3dImpl(new int[]{
                    v1.getComponent(0) + v2.getComponent(0),
                    v1.getComponent(1) + v2.getComponent(1),
                    v1.getComponent(2) + v2.getComponent(2)
            });

            boolean areEqual = Arrays.equals(expected.getComponentsArray(), actual.getComponentsArray());

            Assert.assertEquals(areEqual, expected.equalsByComponent(actual));
        }
    }

    /**
     * Tests for subtraction method
     */
    @Test
    public void subtractTest() {
        for (int i = 0; i < 25; i++) {
            BaseVector v1 = new Vector5dImpl(new int[]{random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt()});
            BaseVector v2 = new Vector5dImpl(new int[]{random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt()});

            BaseVector actual = v1.subtract(v2);

            BaseVector expected = new Vector5dImpl(new int[]{
                    v1.getComponent(0) - v2.getComponent(0),
                    v1.getComponent(1) - v2.getComponent(1),
                    v1.getComponent(2) - v2.getComponent(2),
                    v1.getComponent(3) - v2.getComponent(3),
                    v1.getComponent(4) - v2.getComponent(4)
            });

            Assert.assertTrue(actual.equalsByComponent(expected));
        }
    }

    /**
     * Tests for multiplying
     */
    @Test
    public void multiplicationTest() {
        for (int i = 0; i < 25; i++) {
            BaseVector v1 = new VectorNdImpl(new int[]{random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt()});
            BaseVector v2 = new VectorNdImpl(new int[]{random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt()});

            BaseVector actual = v1.scalarProduct(v2);

            BaseVector expected = new VectorNdImpl(new int[]{
                    v1.getComponent(0) * v2.getComponent(0),
                    v1.getComponent(1) * v2.getComponent(1),
                    v1.getComponent(2) * v2.getComponent(2),
                    v1.getComponent(3) * v2.getComponent(3),
                    v1.getComponent(4) * v2.getComponent(4),
                    v1.getComponent(5) * v2.getComponent(5),
            });

            Assert.assertTrue(actual.equalsByComponent(expected));
        }
    }

    /**
     * Test for equals and hashcode
     */
    @Test
    public void equalsTest(){
        String test = "Test";
        Map<Vector3dImpl, String> vectors = new HashMap<>();
        vectors.put(new Vector3dImpl(new int[]{1, 1, 1}), test);

        String vectorsName = vectors.get(new Vector3dImpl(new int[]{1, 1, 1}));

        Assert.assertEquals(test, vectorsName);
    }

    /**
     * Test for contains and hashcode
     */
    @Test
    public void hashcodeTest(){
        Set<Vector3dImpl> vectors1 = new HashSet<>();
        Vector3dImpl first = new Vector3dImpl(new int[]{1, 1, 1});
        Vector3dImpl second = new Vector3dImpl(new int[]{1, 1, 1});

        vectors1.add(first);

        Assert.assertTrue(vectors1.contains(second));
    }

    /**
     * Test for getClass and polymorphism(?)
     */
    @Test
    public void getClassTest(){
        BaseVector baseVector = new Vector3dImpl(new int[]{1,1,1});
        BaseVector baseVectorCopy = new Vector3dImpl(new int[]{1,1,1});

        Class<? extends BaseVector> className = (baseVector).add(baseVectorCopy).getClass();

        Assert.assertEquals(baseVector.getClass(), className);
    }
}
