using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TextAnalysis
{
    static class SentencesParserTask
    {
        public static List<List<string>> ParseSentences(string text)
        {
            var sentencesList = new List<List<string>>();
            var separators = new char[] {';', '.', '!', '?', ';', ':', '(', ')'};
            text = text.ToLower();
            var separatedText = text.Split(separators, StringSplitOptions.RemoveEmptyEntries);
            var builder = new StringBuilder();
            foreach (var sentence in separatedText)
            {
                var temporalList = new List<string>();
                foreach (var letter in sentence)
                {
                    if (char.IsLetter(letter) || letter == '\'')
                        builder.Append(letter);
                    else
                        AvoidAddingEmpties(builder, temporalList);
                }
				
                AvoidAddingEmpties(builder, temporalList);
                if (temporalList.Count > 0)
                    sentencesList.Add(temporalList);
                builder.Clear();
            }

            return sentencesList;
        }

        private static void AvoidAddingEmpties(StringBuilder builder, List<string> temporalList)
        {
            if (builder.Length <= 0) return;
            temporalList.Add(builder.ToString());
            builder.Clear();
        }
    }
}