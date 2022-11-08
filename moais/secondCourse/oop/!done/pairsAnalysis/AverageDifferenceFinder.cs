using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delegates.PairsAnalysis
{
    public class AverageDifferenceFinder : PairsAnalyzer<double, double, double>
    {
        protected override double Aggregate(List<double> temp)
        {
            var sum = temp.Sum();
            return sum / temp.Count;
        }

        protected override double Process(double source1, double source2)
        {
            return (source2 - source1) / source1;
        }
    }
}
