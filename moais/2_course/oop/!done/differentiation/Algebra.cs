using System;
using System.Linq.Expressions;
using System.Reflection;

namespace Reflection.Differentiation
{
    public static class Algebra
    {
        private static readonly MethodInfo mathCos = typeof(Math).GetMethod(nameof(Math.Cos), new[] {typeof(double)});
        private static readonly MethodInfo mathSin = typeof(Math).GetMethod(nameof(Math.Sin), new[] {typeof(double)});

        public static Expression<Func<double, double>> Differentiate(Expression<Func<double, double>> function)
        {
            return Expression.Lambda<Func<double, double>>(Differentiate(function.Body), function.Parameters);
        }

        private static Expression Differentiate(Expression body)
        {
            switch (body)
            {
                case ConstantExpression _:
                    return Expression.Constant(0.0);
                case ParameterExpression _:
                    return Expression.Constant(1.0);
                case BinaryExpression operation:
                    return ResolveExpressionNodeType(body, operation.Left, operation.Right);
                case MethodCallExpression methodCall:
                    return Expression.Multiply(ResolveExpressionMethodName(methodCall, methodCall.Arguments[0]),
                        Differentiate(methodCall.Arguments[0]));
                default:
                    throw new ArgumentException($"Function {nameof(ToString)} is not supported");
            }
        }

        private static Expression ResolveExpressionMethodName(MethodCallExpression methodCall, Expression args)
        {
            switch (methodCall.Method.Name)
            {
                case nameof(Math.Sin):
                    return Expression.Call(
                        mathCos ?? throw new InvalidOperationException($"Function {nameof(ToString)} is not supported"),
                        args);
                case nameof(Math.Cos):
                    return Expression.Negate(Expression.Call(
                        mathSin ?? throw new InvalidOperationException($"Function {nameof(ToString)} is not supported"),
                        args));
                default:
                    throw new ArgumentException($"Function {nameof(Math.Max)} is not supported");
            }
        }

        private static Expression ResolveExpressionNodeType(Expression body, Expression leftOperand,
            Expression rightOperand)
        {
            switch (body.NodeType)
            {
                case ExpressionType.Add:
                    return Expression.Add(Differentiate(leftOperand), Differentiate(rightOperand));
                case ExpressionType.Multiply:
                    return Expression.Add(Expression.Multiply(Differentiate(leftOperand), rightOperand),
                        Expression.Multiply(leftOperand, Differentiate(rightOperand)));
                default:
                    throw new ArgumentException($"{body.NodeType} is not supported");
            }
        }
    }
}