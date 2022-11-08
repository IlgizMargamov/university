using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Reflection.Randomness
{
    public class FromDistribution : Attribute
    {
        private IContinuousDistribution distribution;
        private readonly double[] args;
        private readonly Type distributionType;

        public FromDistribution(Type _distributionType, params double[] _args)
        {
            distributionType = _distributionType;
            args = _args;
        }

        public double Generate(Random rnd)
        {
            if (distribution == null)
                distribution = GetDistribution();

            return distribution.Generate(rnd);
        }

        private IContinuousDistribution GetDistribution()
        {
            if (!typeof(IContinuousDistribution).IsAssignableFrom(distributionType))
                throw new ArgumentException($"{distributionType.Name} is not a distribution type");

            var continuousDistribution = (IContinuousDistribution) distributionType.GetConstructors()
                .FirstOrDefault(x => x.GetParameters().Length == args.Length)
                ?.Invoke(args.Select(x => x as object).ToArray());

            if (continuousDistribution is null) throw new ArgumentException(
                $"{distributionType.Name} does not have a {args.Length} parameters constructor");
            return continuousDistribution;
        }
    }

    public class Generator<T>
        where T : new()
    {
        private readonly (PropertyInfo propertyInfo, FromDistribution fromDistribution)[] props;

        public Generator()
        {
            props = typeof(T)
                .GetProperties()
                .Select(e => (e, e.GetCustomAttribute<FromDistribution>()))
                .Where(e => e.Item2 != null)
                .ToArray();
        }

        public T Generate(Random rnd)
        {
            var result = new T();

            foreach (var (propertyInfo, fromDistribution) in props)
                propertyInfo.SetValue(result, fromDistribution.Generate(rnd));

            return result;
        }
    }
}