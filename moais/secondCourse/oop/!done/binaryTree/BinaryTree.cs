using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generics.BinaryTrees
{
    public class BinaryTree<T> : IEnumerable<T>
        where T : IComparable
    {
        public BinaryTree<T> Left { get; private set; }
        public BinaryTree<T> Right { get; private set; }
        public T Value { get; private set; }

        private bool hasElements;

        public BinaryTree()
        {
            hasElements = false;
        }

        private BinaryTree(T el)
        {
            Value = el;
            hasElements = true;
        }

        public void Add(T el)
        {
            if (!hasElements)
            {
                Value = el;
                hasElements = true;
            }
            else
            {
                if (Value.CompareTo(el) >= 0)
                {
                    if (Left is null) Left = new BinaryTree<T>(el);
                    else Left.Add(el);
                }
                else
                {
                    if (Right is null) Right = new BinaryTree<T>(el);
                    else Right.Add(el);
                }
            }
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        public IEnumerator<T> GetEnumerator()
        {
            if (!hasElements) yield break;
            if (!(Left is null))
                foreach (var val in Left)
                {
                    yield return val;
                }

            yield return Value;
            if (Right is null) yield break;
            {
                foreach (var val in Right)
                {
                    yield return val;
                }
            }
        }
    }

    public static class BinaryTree
    {
        private static BinaryTree<int> tree;

        public static BinaryTree<int> Create(params int[] elements)
        {
            tree = new BinaryTree<int>();
            foreach (var el in elements)
            {
                tree.Add(el);
            }

            return tree;
        }
    }
}