using System;
using System.Collections.Generic;
using System.Linq;

namespace SRP.ControlDigit
{
    public static class Extensions
    {
        public static IEnumerable<int> GetDigitsFromLeastSignificant(this long number)
        {
            return number.ToString().ToArray().Select(x => int.Parse(x.ToString())).Reverse();
        }

        public static int SumDigitWithFactor(this IEnumerable<int> digits, int initFactor, Func<int, int> changeFactor)
        {
            return digits.Select((x, i) =>
            {
                if (i == 0) return x * initFactor;
                initFactor = changeFactor(initFactor);
                return x * initFactor;
            }).Sum();
        }
    }

    public static class ControlDigitAlgo
    {
        public static int Upc(long number)
        {
            var digits = number.GetDigitsFromLeastSignificant().ToList();
            var sum = digits.SumDigitWithFactor(3, f => 4 - f);

            var result = sum % 10;
            if (result != 0)
                result = 10 - result;
            return result;
        }

        public static char Isbn10(long number)
        {
            var digits = number.GetDigitsFromLeastSignificant().ToList();
            var sum = digits.SumDigitWithFactor(2, f => f + 1);

            if (sum % 11 == 0) return '0';
            var result = 11 - sum % 11;
            return result == 10 ? 'X' : char.Parse(result.ToString());
        }

        public static int Luhn(long number)
        {
            var digits = number.GetDigitsFromLeastSignificant().ToList();
            var sum = digits.SumForLuhn(2, f => f % 2 + 1);

            var result = sum % 10;
            return result == 0 ? 0 : 10 - result;
        }

        private static int SumForLuhn(this List<int> digits, int initFactor, Func<int, int> changeFactor)
        {
            return digits.Select((x, i) =>
            {
                if (i == 0)
                    return x * initFactor > 9 ? x * initFactor - 9 : x * initFactor;
                initFactor = changeFactor(initFactor);
                return x * initFactor > 9 ? x * initFactor - 9 : x * initFactor;
            }).Sum();
        }
    }
}

namespace SRP.ControlDigit1
{
    public static class Extensions
    {
        public static IEnumerable<int> DigitsRightToLeft(this long number)
        {
            do
            {
                yield return (int)(number % 10);
                number /= 10;
            } 
            while (number > 0);
        }

        public static int Sum(this IEnumerable<int> enumerable, Func<int, int, int> selector)
        {
            var sum = 0;
            var i = 0;
            
            foreach (var element in enumerable)
                sum += selector(element, i++);

            return sum;
        }
    }

    public static class ControlDigitAlgo
    {
        public static int Upc(long number)
        {
            var sum = number.DigitsRightToLeft()
                .Sum((digit, index) => (index % 2 == 0 ? 3 : 1) * digit);

            return (10 - sum % 10) % 10;
        }

        public static char Isbn10(long number)
        {
            var sum = number.DigitsRightToLeft()
                .Sum((digit, index) => digit * (index + 2));

            var result = (11 - sum % 11) % 11;
            return result < 10 ? (char)(result + '0') : 'X';
        }

        public static int Luhn(long number)
        {
            var sum = number.DigitsRightToLeft()
                .Sum((digit, index) => LuhnSelector(digit, index % 2 == 0));

            return (10 - sum % 10) % 10;
        }

        private static int LuhnSelector(int digit, bool isEven)
        {
            if (!isEven) return digit;
            
            var evenValue = 2 * digit;
            evenValue = evenValue > 9 ? evenValue - 9 : evenValue;
            
            return evenValue;
        }
    }
}
