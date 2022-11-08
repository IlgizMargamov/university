using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delegates.Reports
{
    public interface IFormatter
    {
        string MakeCaptionInFormat(string caption);
        string MakeItemInFormat(string property, string stats);
        string BeginListInFormat();
        string EndListInFormat();
    }

    public class HtmlFormatter : IFormatter
    {
        public string MakeCaptionInFormat(string caption)
        {
            return $"<h1>{caption}</h1>";
        }

        public string MakeItemInFormat(string property, string stats)
        {
            return $"<li><b>{property}</b>: {stats}";
        }

        public string BeginListInFormat()
        {
            return "<ul>";
        }

        public string EndListInFormat()
        {
            return "</ul>";
        }
    }

    public class MarkdownFormatter : IFormatter
    {
        public string MakeCaptionInFormat(string caption)
        {
            return $"## {caption}\n\n";
        }

        public string MakeItemInFormat(string property, string stats)
        {
            return $" * **{property}**: {stats}\n\n";
        }

        public string BeginListInFormat()
        {
            return "";
        }

        public string EndListInFormat()
        {
            return "";
        }
    }

    public interface IStatisticsMaker
    {
        string Caption { get; }
        object MakeStatistics(IEnumerable<double> data);
    }

    public class MedianStatisticsMaker : IStatisticsMaker
    {
        public string Caption => "Median";

        public object MakeStatistics(IEnumerable<double> _data)
        {
            var list = _data.OrderBy(z => z).ToList();
            if (list.Count % 2 == 0)
                return (list[list.Count / 2] + list[list.Count / 2 - 1]) / 2;

            return list[list.Count / 2];
        }
    }

    public class MeanAndStdStatisticsMaker : IStatisticsMaker
    {
        public string Caption => "Mean and Std";

        public object MakeStatistics(IEnumerable<double> _data)
        {
            var data = _data.ToList();
            var mean = data.Average();
            var std = Math.Sqrt(data.Select(z => Math.Pow(z - mean, 2)).Sum() / (data.Count - 1));

            return new MeanAndStd
            {
                Mean = mean,
                Std = std
            };
        }
    }

    public class ReportMaker
    {
        private string MakeReport(IEnumerable<Measurement> measurements, IStatisticsMaker statisticsMaker,
            IFormatter formatter)
        {
            var data = measurements.ToList();
            var result = new StringBuilder();
            result.Append(formatter.MakeCaptionInFormat(statisticsMaker.Caption));
            result.Append(formatter.BeginListInFormat());
            result.Append(formatter.MakeItemInFormat("Temperature",
                statisticsMaker.MakeStatistics(data.Select(z => z.Temperature)).ToString()));
            result.Append(formatter.MakeItemInFormat("Humidity",
                statisticsMaker.MakeStatistics(data.Select(z => z.Humidity)).ToString()));
            result.Append(formatter.EndListInFormat());
            return result.ToString();
        }

        public string MakeMedianHtmlReport(IEnumerable<Measurement> measurements)
        {
            return MakeReport(measurements, new MedianStatisticsMaker(), new HtmlFormatter());
        }

        public string MakeMeanAndStdMarkdownReport(IEnumerable<Measurement> measurements)
        {
            return MakeReport(measurements, new MeanAndStdStatisticsMaker(), new MarkdownFormatter());
        }

        public string MakeMedianMarkdownReport(IEnumerable<Measurement> measurements)
        {
            return MakeReport(measurements, new MedianStatisticsMaker(), new MarkdownFormatter());
        }

        public string MakeMeanAndStdHtmlReport(IEnumerable<Measurement> measurements)
        {
            return MakeReport(measurements, new MeanAndStdStatisticsMaker(), new HtmlFormatter());
        }
    }

    public static class ReportMakerHelper
    {
        public static string MeanAndStdHtmlReport(IEnumerable<Measurement> measurements)
        {
            return new ReportMaker().MakeMeanAndStdHtmlReport(measurements);
        }

        public static string MedianMarkdownReport(IEnumerable<Measurement> measurements)
        {
            return new ReportMaker().MakeMedianMarkdownReport(measurements);
        }

        public static string MeanAndStdMarkdownReport(IEnumerable<Measurement> measurements)
        {
            return new ReportMaker().MakeMeanAndStdMarkdownReport(measurements);
        }

        public static string MedianHtmlReport(IEnumerable<Measurement> measurements)
        {
            return new ReportMaker().MakeMedianHtmlReport(measurements);
        }
    }
}