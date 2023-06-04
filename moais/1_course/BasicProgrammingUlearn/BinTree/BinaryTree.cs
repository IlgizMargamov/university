using System;
using System.Collections;
using System.Collections.Generic;

namespace BinaryTrees
{
    public class BinaryTree<T> : IEnumerable<T> where T : IComparable
    {
        private T _value;
        private int weight = 1;
        private BinaryTree<T> left;
        private BinaryTree<T> right;
        private bool isInitialized;

        public BinaryTree()
        {
        }

        private BinaryTree(T value)
        {
            _value = value;
            isInitialized = true;
        }

        public void Add(T key)
        {
            if (!isInitialized)
            {
                _value = key;
                isInitialized = true;
                return;
            }

            var parentNodeToAdd = this;
            AddNode(key, parentNodeToAdd);
        }

        public bool Contains(T key)
        {
            if (!isInitialized)
                return false;
            var parentNodeToAdd = this;
            return ContainsInternal(key, parentNodeToAdd);
        }

        public T this[int i]
        {
            get
            {
                var root = this;
                return GetRootValue(i, root, 0);
            }
        }

        public IEnumerator<T> GetEnumerator() => GetEnumeratorForNode(this);


        private static void AddNode(T key, BinaryTree<T> parentNodeToAdd)
        {
            while (true)
            {
                parentNodeToAdd.weight++;
                if (parentNodeToAdd._value.CompareTo(key) > 0)
                {
                    if (parentNodeToAdd.left != null)
                        parentNodeToAdd = parentNodeToAdd.left;
                    else
                    {
                        parentNodeToAdd.left = new BinaryTree<T>(key);
                        break;
                    }
                }
                else
                {
                    if (parentNodeToAdd.right != null)
                        parentNodeToAdd = parentNodeToAdd.right;
                    else
                    {
                        parentNodeToAdd.right = new BinaryTree<T>(key);
                        break;
                    }
                }
            }
        }

        private static bool ContainsInternal(T key, BinaryTree<T> parentNodeToAdd)
        {
            while (true)
            {
                var compareResult = parentNodeToAdd._value.CompareTo(key);
                if (compareResult == 0)
                {
                    return true;
                }

                if (compareResult > 0)
                {
                    if (parentNodeToAdd.left == null)
                        return false;
                    parentNodeToAdd = parentNodeToAdd.left;
                }
                else
                {
                    if (parentNodeToAdd.right == null)
                        return false;
                    parentNodeToAdd = parentNodeToAdd.right;
                }
            }
        }

        private static T GetRootValue(int i, BinaryTree<T> root, int parentWeight)
        {
            while (true)
            {
                if (root == null) continue;
                var currentNodeIndex = (root.left?.weight ?? 0) + parentWeight;
                if (i == currentNodeIndex)
                    return root._value;
                if (i < currentNodeIndex)
                    root = root.left;
                else
                {
                    root = root.right;
                    parentWeight = currentNodeIndex + 1;
                }
            }
        }

        private static IEnumerator<T> GetEnumeratorForNode(BinaryTree<T> root)
        {
            if (root == null || !root.isInitialized)
                yield break;
            var enumeratorForTreeNode = GetEnumeratorForNode(root.left);
            while (enumeratorForTreeNode.MoveNext())
                yield return enumeratorForTreeNode.Current;
            yield return root._value;
            enumeratorForTreeNode = GetEnumeratorForNode(root.right);
            while (enumeratorForTreeNode.MoveNext())
                yield return enumeratorForTreeNode.Current;
        }

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }
}