using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delegates.PairsAnalysis
{
    public static class Analysis
    {
        public static int FindMaxPeriodIndex(params DateTime[] data)
        {
            return data.Pairs().Select(x => (x.Item2 - x.Item1).TotalSeconds).MaxIndex();
        }

        public static double FindAverageRelativeDifference(params double[] data)
        {
            return data.Pairs().Average(x => (x.Item2 - x.Item1) / x.Item1);
        }
    }

    public static class AnalysisExtensions
    {
        public static IEnumerable<Tuple<T, T>> Pairs<T>(this IEnumerable<T> data)
        {
            var firstIteration = true;
            T last = default;
            foreach (var elem in data)
            {
                if (firstIteration)
                {
                    last = elem;
                    firstIteration = false;
                    continue;
                }
                yield return Tuple.Create(last, elem);
                last = elem;
            }
        }
        
        public static int MaxIndex<T>(this IEnumerable<T> data)
            where T : IComparable
        {
            return data.Select((value, index) => new {Value = value, Index = index})
                .Aggregate((a, b) => (a.Value.CompareTo(b.Value) > 0) ? a : b)
                .Index;
        }
    }
}