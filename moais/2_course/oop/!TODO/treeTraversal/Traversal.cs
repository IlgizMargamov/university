using System;
using System.Collections.Generic;
using System.Linq;

namespace Delegates.TreeTraversal
{
    public static class Traversal
    {
        public static IEnumerable<Product> GetProducts(ProductCategory root)
        {
            return SearchTree(
                root,
                x => x.Products.Count > 0,
                x => x.Categories,
                x => x.Products
            ).SelectMany(x => x);
        }

        public static IEnumerable<Job> GetEndJobs(Job root)
        {
            return SearchTree(
                root,
                x => x.Subjobs.Count == 0,
                x => x.Subjobs,
                x => x
            );
        }

        public static IEnumerable<T> GetBinaryTreeValues<T>(BinaryTree<T> root)
        {
            return SearchTree(
                root,
                x => x.Left == null && x.Right == null,
                x => new List<BinaryTree<T>> {x.Left, x.Right}
                    .Where(y => y != null),
                x => x.Value
            );
        }

        private static IEnumerable<R> SearchTree<T, R>
            (T root, Func<T, bool> filter, Func<T, IEnumerable<T>> childSelector, Func<T, R> resultSelector)
        {
            if (filter(root))
                yield return resultSelector(root);

            foreach (var child in childSelector(root))
            {
                foreach (var tree in SearchTree(child, filter, childSelector, resultSelector))
                    yield return tree;
            }
        }
    }
}