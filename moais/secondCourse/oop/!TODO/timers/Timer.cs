using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Memory.Timers
{
    public class Timer : IDisposable
    {
        private readonly Stopwatch stopwatch;
        private readonly StringWriter writer;
        private readonly string name;
        private readonly List<Timer> children;
        private readonly int level;
        private string report;

        private Timer(StringWriter _writer, string _name, int _level)
        {
            writer = _writer;
            name = _name;
            level = _level;
            stopwatch = Stopwatch.StartNew();
            children = new List<Timer>();
        }

        public static Timer Start(StringWriter _writer, string _name = "\\*")
        {
            return new Timer(_writer, _name, 0);
        }

        public Timer StartChildTimer(string _name)
        {
            var timer = new Timer(writer, _name, level + 1);
            children.Add(timer);
            return timer;
        }

        public void Dispose()
        {
            stopwatch.Stop();
            report = GetLine();
            if (level != 0) return;
            
            var reports = GetReports();
            var stringBuilder = new StringBuilder();
            foreach (var value in reports)
                stringBuilder.Append(value);

            writer.Write(stringBuilder.ToString());
            writer?.Dispose();
        }

        private List<string> GetReports()
        {
            var result = new List<string> {report};
            CreateReport(children, result);
            result.Add(AppendDifferenceBetweenFatherAndChildrenTime(this));
            return result;
        }

        private void CreateReport(List<Timer> timers, List<string> result)
        {
            foreach (var timer in timers)
            {
                if (timer.children.Count != 0)
                {
                    result.Add(timer.report);
                    CreateReport(timer.children, result);
                    result.Add(AppendDifferenceBetweenFatherAndChildrenTime(timer));
                }
                else result.Add(timer.report);
            }
        }

        private string GetLine()
        {
            return FormatReportLine(name, level, stopwatch.ElapsedMilliseconds);
        }

        private string AppendDifferenceBetweenFatherAndChildrenTime(Timer timer)
        {
            const string rest = "Rest";
            var timeFromChildren = timer.children
                .Select(x => x.report.Split(':', '\n'))
                .SelectMany(y => y).Select(z => z.Trim())
                .Select(x =>
                {
                    var success = long.TryParse(x, out var result);
                    return success ? result : 0;
                }).Sum();
            return FormatReportLine(rest, timer.level + 1, Math.Abs(stopwatch.ElapsedMilliseconds - timeFromChildren));
        }

        // Use this method in your solution to fit report formatting requirements from the tests
        private static string FormatReportLine(string _timerName, int _level, long _value)
        {
            var intro = new string(' ', _level * 4) + _timerName;
            return $"{intro,-20}: {_value}\n";
        }
    }
}