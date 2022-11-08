using System;

namespace Incapsulation.Weights
{
    public class Indexer
    {
        public int Length { get; }
        private readonly double[] weights;
        private readonly int startIndex;

        public Indexer(double[] array, int start, int length)
        {
            if (length < 0 || start < 0 || length > array.Length || start + length > array.Length)
                throw new ArgumentException();
            weights = array;
            startIndex = start;
            Length = length;
        }

        public double this[int index]
        {
            get
            {
                CheckIndex(index);
                return weights[startIndex + index];
            }
            set
            {
                CheckIndex(index);
                weights[startIndex + index] = value;
            }
        }

        private void CheckIndex(int index)
        {
            if (index < 0 || index >= Length) throw new IndexOutOfRangeException();
        }
    }
}