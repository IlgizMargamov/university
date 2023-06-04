using System.Collections.Generic;
using System.Linq;

namespace TextAnalysis
{
    static class FrequencyAnalysisTask
    {
        public static Dictionary<string, string> GetMostFrequentNextWords(List<List<string>> text)
        {
            var result = new Dictionary<string, string>();
            /*var tripleGramms = GetNGramm(text, 3);
            var biGramms = GetNGramm(text, 2);
            CountKeys(tripleGramms, result);
            CountKeys(biGramms, result);*/
            GetNGramm(text);
            return result;
        }

        private static Dictionary<string, string> GetNGramm(List<List<string>> text)
        {
            var nGramms = new Dictionary<string, string>();
            var nGramm = GetFrequencies(text);
            foreach (var key in nGramm.Keys)
            {
                var usedValue = nGramm[key].First().Key;
                usedValue = UsedValue(nGramm, key, usedValue);

                nGramms.Add(key, usedValue);
            }

            return nGramms;
        }

        private static string UsedValue(Dictionary<string, 
                Dictionary<string, int>> nGramm, 
                string key, string usedValue)
        {
            foreach (var unusedValue in nGramm[key].Keys)
            {
                if (nGramm[key][unusedValue] >= nGramm[key][usedValue])
                {
                    if (nGramm[key][unusedValue] == nGramm[key][usedValue])
                    {
                        if (string.CompareOrdinal(usedValue, unusedValue) > 0)
                            usedValue = unusedValue;
                    }
                    else
                        usedValue = unusedValue;
                }

                if (nGramm[key][usedValue] != 1) continue;
                foreach (var otherValue in nGramm[key].Keys)
                    if (string.CompareOrdinal(usedValue, otherValue) > 0)
                        usedValue = otherValue;
            }

            return usedValue;
        }

        private static Dictionary<string, Dictionary<string, int>> GetFrequencies(List<List<string>> text)
        {
            var frequencyValue = new Dictionary<string, Dictionary<string, int>>();
            var indexes = new int[] {1, 2};
            foreach (var sentence in text)
            {
                for (int i = 1; i <= indexes.Length; i++)
                {
                    for (var letter = i; letter < sentence.Count; letter++)
                    {
                        string key;
                        var symbol = sentence[letter];
                        key = KeyValue(i, sentence[letter - 1],
                            WhatIsFirstIndex(i) == 2 ? sentence[letter - 2] : null);
                        if (!frequencyValue.ContainsKey(key))
                            frequencyValue.Add(key, new Dictionary<string, int>());
                        if (!frequencyValue[key].ContainsKey(symbol))
                            frequencyValue[key].Add(symbol, 0);
                        frequencyValue[key][symbol]++;
                    }
                }
            }

            return frequencyValue;
        }

        private static string KeyValue(int whichNGramm, string sentencePart1, string sentencePart2)
        {
            return WhatIsFirstIndex(whichNGramm) == 2 ? sentencePart2 + " " + sentencePart1 : sentencePart1;
        }

        private static int WhatIsFirstIndex(int whichNGramm)
        {
            return (whichNGramm == 3) ? 2 : 1;
        }

        private static void CountKeys(Dictionary<string, string> someGramms, Dictionary<string, string> result)
        {
            foreach (var key in someGramms.Keys)
                result.Add(key, someGramms[key]);
        }
    }
}