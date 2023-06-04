using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Incapsulation.Failures
{
    public class ReportMaker
    {
        /// <summary>
        /// </summary>
        /// <param name="day"></param>
        /// <param name="failureTypes">
        /// 0 for unexpected shutdown, 
        /// 1 for short non-responding, 
        /// 2 for hardware failures, 
        /// 3 for connection problems
        /// </param>
        /// <param name="deviceId"></param>
        /// <param name="times"></param>
        /// <param name="devices"></param>
        /// <returns></returns>
        public static List<string> FindDevicesFailedBeforeDateObsolete(int day, int month, int year, int[] failureTypes,
            int[] deviceId, object[][] times, List<Dictionary<string, object>> devices)
        {
            var timeBeforeWhichToCheck = new DateTime(year, month, day);

            var dateTimesToCheck = times
                .Select(x => new DateTime((int) x[2], (int) x[1], (int) x[0]))
                .ToArray();

            var failureTypesArray = Enum.GetValues(typeof(FailureType));
            var failureTypesEnum = failureTypes
                .Select(x => (FailureType) failureTypesArray.GetValue(x))
                .ToArray();

            var devicesNewFormat = devices
                .Select(x => new Device((int) x["DeviceId"], (string) x["Name"]))
                .ToList();

            var failures = dateTimesToCheck
                .Select((t, i) => new Failure(t, failureTypesEnum[i], devicesNewFormat[i]))
                .ToList();

            return FindDevicesFailedBeforeDate(timeBeforeWhichToCheck, new FailureStatistics(failures));
        }

        private static List<string> FindDevicesFailedBeforeDate(
            DateTime beforeTime,
            FailureStatistics failureStatistics
        )
        {
            var problematicDevices = failureStatistics.GetFailures()
                .Where(x=>FailureStatistics.IsFailureSerious(x.FailureType) && x.OccurrenceTime<beforeTime)
                .Select(x=>x.Device.DeviceId);
            
            var result = new List<string>();
            foreach (var device in failureStatistics.GetFailures().Select(x=>x.Device))
            {
                if (problematicDevices.Contains(device.DeviceId))
                    result.Add(device.Name);
            }

            return result;
        }
    }

    public class Failure
    {
        public DateTime OccurrenceTime { get; }
        public FailureType FailureType { get; }
        public Device Device { get; }
        
        public Failure(DateTime occurrenceTime, FailureType failureType, Device device)
        {
            OccurrenceTime = occurrenceTime;
            FailureType = failureType;
            Device = device;
        }
    }

    public class FailureStatistics
    {
        private readonly List<Failure> failures;

        public FailureStatistics(List<Failure> failures)
        {
            this.failures = failures;
        }

        public List<Failure> GetFailures() => failures;

        public static bool IsFailureSerious(FailureType failureType)
        {
            switch (failureType)
            {
                case FailureType.UnexpectedShutdown:
                    return true;
                case FailureType.ShortNonResponding:
                    break;
                case FailureType.HardwareFailures:
                    return true;
                case FailureType.ConnectionProblems:
                    break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(failureType), failureType, null);
            }
            return false;
        }
    }

    public class Device
    {
        public int DeviceId { get; }
        public string Name { get; }

        public Device(int deviceId, string name)
        {
            DeviceId = deviceId;
            Name = name;
        }
    }

    public enum FailureType
    {
        UnexpectedShutdown,
        ShortNonResponding,
        HardwareFailures,
        ConnectionProblems,
    }
}