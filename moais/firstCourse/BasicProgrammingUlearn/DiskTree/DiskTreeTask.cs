using System;
using System.Collections.Generic;
using System.Linq;

namespace DiskTree
{
    internal static class DiskTreeTask
    {
        public static IEnumerable<string> Solve(IEnumerable<string> directories)
        {
            var diskTree = new DiskTree();
            diskTree.Add(directories);
            return diskTree.GetDiskTreeList();
        }
    }

    internal class DiskTree
    {
        private readonly List<TreeNode> rootDir;

        public DiskTree()
        {
            rootDir = new List<TreeNode>();
        }

        public void Add(IEnumerable<string> directories)
        {
            foreach (var dir in directories)
                Add(dir);
        }

        public IEnumerable<string> GetDiskTreeList()
        {
            var result = new List<string>();
            var queue = new Stack<TreeNode>();
            foreach (var treeNode in rootDir.OrderByDescending(x => x.Name, StringComparer.Ordinal))
            {
                queue.Push(treeNode);
            }

            ReorderDirs(queue, result);

            return result;
        }

        private static void ReorderDirs(Stack<TreeNode> queue, List<string> result)
        {
            while (queue.Count > 0)
            {
                var node = queue.Pop();
                foreach (var dir in node.ChildrenDirectories
                    .OrderByDescending(x => x.Name, StringComparer.Ordinal))
                    queue.Push(dir);
                result.Add(node.Name.PadLeft(node.Name.Length + node.Level));
            }
        }

        private void Add(string directory)
        {
            AddInternal(directory.Split('\\'), rootDir);
        }

        private static void AddInternal(IReadOnlyList<string> dirs, List<TreeNode> root)
        {
            for (var i = 0; i < dirs.Count; i++)
            {
                var name = dirs[i];
                var treeNode = new TreeNode(name, i);
                if (root.All(x => x.Name != dirs[i]))
                {
                    root.Add(treeNode);
                    root = treeNode.ChildrenDirectories;
                }
                else
                {
                    var existNode = root.FirstOrDefault(x => x.Name == dirs[i]);
                    if (existNode != null) root = existNode.ChildrenDirectories;
                }
            }
        }

        internal class TreeNode
        {
            public int Level { get; }
            public string Name { get; }
            public List<TreeNode> ChildrenDirectories { get; }

            public TreeNode(string name, int level)
            {
                Name = name;
                Level = level;
                ChildrenDirectories = new List<TreeNode>();
            }
        }
    }
}