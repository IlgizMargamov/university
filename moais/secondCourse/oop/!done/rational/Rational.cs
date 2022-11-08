using System;

namespace Incapsulation.RationalNumbers
{
    public class Rational
    {
        public static readonly Rational Nan = new Rational(1, 0);
        public int Numerator { get; private set; }
        public int Denominator { get; private set; }

        public bool IsNan => Denominator == 0;

        public Rational(int numerator, int denominator = 1)
        {
            Numerator = numerator;
            Denominator = denominator;
            if (Numerator > 0 && Denominator > 0 || Numerator < 0 && Denominator < 0)
            {
                Numerator = Math.Abs(Numerator);
            }
            else if (Numerator > 0 && Denominator < 0)
            {
                Numerator *= -1;
            }

            Denominator = Math.Abs(Denominator);

            SimplifyRational();
        }

        public static Rational operator +(Rational firstOperand, Rational secondOperand)
        {
            return new Rational(
                firstOperand.Numerator * secondOperand.Denominator + firstOperand.Denominator * secondOperand.Numerator,
                firstOperand.Denominator * secondOperand.Denominator);
        }

        public static Rational operator -(Rational firstOperand, Rational secondOperand)
        {
            return new Rational(
                firstOperand.Numerator * secondOperand.Denominator - firstOperand.Denominator * secondOperand.Numerator,
                firstOperand.Denominator * secondOperand.Denominator);
        }

        public static Rational operator *(Rational firstOperand, Rational secondOperand)
        {
            return new Rational(
                firstOperand.Numerator * secondOperand.Numerator,
                firstOperand.Denominator * secondOperand.Denominator);
        }

        public static Rational operator /(Rational firstOperand, Rational secondOperand)
        {
            if (firstOperand.IsNan || secondOperand.IsNan) return Rational.Nan;
            var divisionResult = new Rational(
                firstOperand.Numerator * secondOperand.Denominator,
                firstOperand.Denominator * secondOperand.Numerator);
            return divisionResult;
        }

        public static explicit operator int(Rational rational)
        {
            return rational.Denominator == 1 ? rational.Numerator : throw new Exception();
        }

        public static implicit operator Rational(int integer)
        {
            return new Rational(integer);
        }

        public static implicit operator double(Rational rational)
        {
            return rational.IsNan
                ? double.NaN
                : (double) rational.Numerator / rational.Denominator;
        }

        private void SimplifyRational()
        {
            var isNumeratorLessThanZero = Numerator < 0;
            Numerator = isNumeratorLessThanZero ? -Numerator : Numerator;
            var nod = GetGCD(Numerator, Denominator);
            if (nod == 0) return;
            Numerator = (Numerator / nod) * (isNumeratorLessThanZero ? -1 : 1);
            Denominator /= nod;
        }

        private int GetGCD(int num, int den)
        {
            while (num != 0 && den != 0)
                if (num > den) num -= den;
                else den -= num;

            return Math.Max(num, den);
        }
    }
}