using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace GaussAlgorithm
{
    public class Solver
    {
        public double[] Solve(double[][] matrix, double[] freeMembers)
        {
            var count = 0;
            var m = matrix.Clone() as double[][];
            for (var i = 0; i < m.Length; i++)
            {
                var j = count;
                while (j < m.Length && m[j][i] == 0) j++;
                if (count != j)
                {
                    matrix.SwapTwoRows(j, count, freeMembers);
                }
                m.SumOfRows();
            }
        }
    }

    internal static class Matrix_Extensions
    {
        public static void DeleteEmpty(this double[][] matrix, int row, double[] freeMembers)
        {
        }

        public static void SwapTwoRows(this double[][] matrix, int fromRow, int toRow, double[] freeMembers)
        {
            double temp;
            for (var elem = 0; elem < matrix[fromRow].Length; elem++)
            {
                matrix.SwapTwoElems(fromRow, toRow, elem);
            }

            temp = freeMembers[toRow];
            freeMembers[toRow] = freeMembers[fromRow];
            freeMembers[fromRow] = temp;
        }

        private static void SwapTwoElems(this IReadOnlyList<double[]> matrix, int row1, int row2, int elem)
        {
            double temp;
            temp = matrix[row2][elem];
            matrix[row2][elem] = matrix[row1][elem];
            matrix[row1][elem] = temp;
        }

        public static void SumOfRows(this double[][] matrix, double multiplier, int row1, int row2,
            double[] freeMembers)
        {
            for (var elem = 0; elem < matrix[row1].Length; elem++)
            {
                matrix[row1][elem] += multiplier * matrix[row2][elem];
            }

            freeMembers[row1] += multiplier * freeMembers[row2];
        }
    }

    class Maths
    {
        /// <summary>
        /// Метод Гаусса (Решение СЛАУ)
        /// </summary>
        /// <param name="Matrix">Начальная матрица</param>
        /// <returns></returns>
        public static double[] Gauss(double[,] Matrix)
        {
            var n = Matrix.GetLength(0); //Размерность начальной матрицы (строки)
            var Matrix_Clone = new double[n, n + 1]; //Матрица-дублер
            for (var i = 0; i < n; i++)
            for (var j = 0; j < n + 1; j++)
                Matrix_Clone[i, j] = Matrix[i, j];

            //Прямой ход (Зануление нижнего левого угла)
            for (var k = 0; k < n; k++) //k-номер строки
            {
                for (var i = 0; i < n + 1; i++) //i-номер столбца
                    Matrix_Clone[k, i] =
                        Matrix_Clone[k, i] /
                        Matrix[k, k]; //Деление k-строки на первый член !=0 для преобразования его в единицу
                for (var i = k + 1; i < n; i++) //i-номер следующей строки после k
                {
                    var K = Matrix_Clone[i, k] / Matrix_Clone[k, k]; //Коэффициент
                    for (var j = 0; j < n + 1; j++) //j-номер столбца следующей строки после k
                        Matrix_Clone[i, j] =
                            Matrix_Clone[i, j] -
                            Matrix_Clone[k, j] *
                            K; //Зануление элементов матрицы ниже первого члена, преобразованного в единицу
                }

                for (var i = 0; i < n; i++) //Обновление, внесение изменений в начальную матрицу
                for (var j = 0; j < n + 1; j++)
                    Matrix[i, j] = Matrix_Clone[i, j];
            }

            //Обратный ход (Зануление верхнего правого угла)
            for (var k = n - 1; k > -1; k--) //k-номер строки
            {
                for (var i = n; i > -1; i--) //i-номер столбца
                    Matrix_Clone[k, i] = Matrix_Clone[k, i] / Matrix[k, k];
                for (var i = k - 1; i > -1; i--) //i-номер следующей строки после k
                {
                    var K = Matrix_Clone[i, k] / Matrix_Clone[k, k];
                    for (var j = n; j > -1; j--) //j-номер столбца следующей строки после k
                        Matrix_Clone[i, j] = Matrix_Clone[i, j] - Matrix_Clone[k, j] * K;
                }
            }

            //Отделяем от общей матрицы ответы
            var Answer = new double[n];
            for (var i = 0; i < n; i++)
                Answer[i] = Matrix_Clone[i, n];

            return Answer;
        }
    }
}