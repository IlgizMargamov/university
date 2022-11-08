using System;
using System.Collections.Generic;

namespace Antiplagiarism
{
    public static class LongestCommonSubsequenceCalculator
    {
        public static List<string> Calculate(List<string> first, List<string> second)
        {
            var opt = CreateOptimizationTable(first, second);
            return RestoreAnswer(opt, first, second);
        }

        private static int[,] CreateOptimizationTable(List<string> first, List<string> second)
        {
            var firstCount = first.Count;
            var secondCount = second.Count;
            var opt = new int[firstCount + 1, secondCount + 1];
            for (var i = firstCount - 1; i >= 0; i--)
            for (var j = secondCount - 1; j >= 0; j--)
                opt[i, j] = TokenDistanceCalculator.GetTokenDistance(first[i], second[j]) == 0
                    ? 1 + opt[i + 1, j + 1]
                    : Math.Max(opt[i + 1, j], opt[i, j + 1]);
            return opt;
        }

        private static List<string> RestoreAnswer(int[,] opt, List<string> first, List<string> second)
        {
            var output = new List<string>();
            for (int i = 0, j = 0; opt[i, j] != 0 && i < first.Count && j < second.Count;)
            {
                if (TokenDistanceCalculator.GetTokenDistance(first[i], second[j]) != 0)
                {
                    if (opt[i, j] == opt[i + 1, j]) i++;
                    else j++;
                    continue;
                }

                output.Add(first[i]);
                i++;
                j++;
            }

            return output;
        }
    }
}