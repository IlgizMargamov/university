using System;
using System.Collections.Generic;
using System.Linq;

namespace TextAnalysis
{
    static class TextGeneratorTask
    {
        public static string ContinuePhrase(Dictionary<string, string> nextWords,
            string phraseBeginning, int wordsCount)
        {
            var words = phraseBeginning.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries).ToList();
            for (var i = 0; i < wordsCount; i++)
            {
                var lastWord = words[words.Count - 1];
                var preLastWord = (words.Count > 1) ? words[words.Count - 2] : "";
                var key = preLastWord + " " + lastWord;

                if (nextWords.ContainsKey(key))
                    words.Add(nextWords[key]);
                else if (nextWords.ContainsKey(lastWord))
                    words.Add(nextWords[lastWord]);
                else
                    break;
            }
            return String.Join(" ", words);
        }
    }
}