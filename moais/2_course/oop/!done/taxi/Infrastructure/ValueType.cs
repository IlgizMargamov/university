using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Ddd.Infrastructure
{
    /// <summary>
    /// Базовый класс для всех Value типов.
    /// </summary>
    public class ValueType<T> where T : ValueType<T>
    {
        private static readonly List<PropertyInfo> props;

        static ValueType()
        {
            props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance).OrderBy(x=>x.Name).ToList();
        }

        public bool Equals(T tObj)
        {
            return Equals((object) tObj);
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(this, obj)) return true;
            if (!(obj is T tObj)) return false;

            foreach (var prop in props)
            {
                var thisValue = prop.GetValue(this);
                var tObjValue = prop.GetValue(tObj);
                if (thisValue is null && tObjValue is null) return true;
                if (thisValue is null || tObjValue is null) return false;
                if (!thisValue.Equals(tObjValue)) return false;
            }

            return true;
        }

        public override string ToString()
        {
            return $"{GetType().Name}({string.Join("; ", props.Select(x=> $"{x.Name}: {x.GetValue(this)}"))})";
        }

        public override int GetHashCode()
        {
            var sum = 0;
            var i = 45;
            foreach (var info in props)
            {
                unchecked
                {
                    sum += (info.GetValue(this).GetHashCode() * i++) ^ 17;
                }
            }

            return sum;
        }
    }
}