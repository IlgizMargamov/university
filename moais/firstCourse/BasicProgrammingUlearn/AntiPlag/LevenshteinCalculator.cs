using DocumentTokens = System.Collections.Generic.List<string>;
using System.Collections.Generic;
using System.Linq;

namespace Antiplagiarism
{
    public class LevenshteinCalculator
    {
        public List<ComparisonResult> CompareDocumentsPairwise(List<DocumentTokens> documents)
        {
            var output = new List<ComparisonResult>();
            var documentsCount = documents.Count;
            for (var i = 0; i < documentsCount; i++)
            for (var j = i + 1; j < documentsCount; j++)
                output.Add(CalcLevenshteinDistance(documents[i], documents[j]));
            return output;
        }

        private static ComparisonResult CalcLevenshteinDistance(DocumentTokens first, DocumentTokens second)
        {
            var opt = InitOpt(first, second);
            for (var i = 1; i <= first.Count; i++)
            for (var j = 1; j <= second.Count; j++)
            {
                var tokenDistance = TokenDistanceCalculator.GetTokenDistance(first[i - 1], second[j - 1]);
                if (tokenDistance == 0)
                    opt[i, j] = opt[i - 1, j - 1];
                else
                    opt[i, j] = new[]
                    {
                        opt[i - 1, j] + 1,
                        opt[i, j - 1] + 1,
                        opt[i - 1, j - 1] + tokenDistance
                    }.Min();
            }

            return new ComparisonResult(first, second, opt[first.Count, second.Count]);
        }

        private static double[,] InitOpt(DocumentTokens first, DocumentTokens second)
        {
            var opt = new double[first.Count + 1, second.Count + 1];
            for (var i = 0; i <= first.Count; i++)
                opt[i, 0] = i;
            for (var i = 0; i <= second.Count; i++)
                opt[0, i] = i;
            return opt;
        }
    }
}