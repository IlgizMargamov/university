using System;
using System.Globalization;
using System.Collections.Generic;
using System.Linq;
using Ddd.Infrastructure;

namespace Ddd.Taxi.Domain
{
    // In real aplication it whould be the place where database is used to find driver by its Id.
    // But in this exercise it is just a mock to simulate database
    public class DriversRepository
    {
        public Driver GetDriverFromDb(int driverId)
        {
            if (driverId == 15)
            {
                return new Driver(driverId, new PersonName("Drive", "Driverson"),
                     new Car("Baklazhan", "Lada sedan", "A123BT 66"));
            }
            else
                throw new Exception("Unknown driver id " + driverId);
        }
    }

    public class TaxiApi : ITaxiApi<TaxiOrder>
    {
        private readonly DriversRepository driversRepo;
        private readonly Func<DateTime> currentTime;
        private int idCounter;

        public TaxiApi(DriversRepository driversRepo, Func<DateTime> currentTime)
        {
            this.driversRepo = driversRepo;
            this.currentTime = currentTime;
        }

        public TaxiOrder CreateOrderWithoutDestination(string firstName, string lastName, string street,
            string building)
        {
            return new TaxiOrder(idCounter++)
                .SetClientName(new PersonName(firstName, lastName))
                .SetStartAddress(new Address(street, building))
                .SetCreationTime(currentTime());
        }

        public void UpdateDestination(TaxiOrder order, string street, string building)
        {
            order.UpdateDestination(new Address(street, building));
        }

        public void AssignDriver(TaxiOrder order, int driverId)
        {
            var driver= driversRepo.GetDriverFromDb(driverId);
            order.SetDriver(driver);
            order.AssignDriver(currentTime());
        }

        public void UnassignDriver(TaxiOrder order)
        {
            order.UnassignDriver();
        }

        public string GetDriverFullInfo(TaxiOrder order)
        {
            if (order.TimingInfo.Status == TaxiOrderStatus.WaitingForDriver) return null;
            return string.Join(" ",
                "Id: " + order.Driver.Id,
                "DriverName: " + FormatName(order.Driver.DriverName),
                "Color: " + order.Driver.Car.Color,
                "CarModel: " + order.Driver.Car.Model,
                "PlateNumber: " + order.Driver.Car.PlateNumber);
        }

        private string FormatName(PersonName driverName)
        {
            return FormatName(driverName.FirstName, driverName.LastName);
        }

        public string GetShortOrderInfo(TaxiOrder order)
        {
            return string.Join(" ",
                "OrderId: " + order.Id,
                "Status: " + order.TimingInfo?.Status,
                "Client: " + FormatName(order.ClientName?.FirstName, order.ClientName?.LastName),
                "Driver: " + FormatName(order.Driver?.DriverName.FirstName, order.Driver?.DriverName.LastName),
                "From: " + FormatAddress(order.Start?.Street, order.Start?.Building),
                "To: " + FormatAddress(order.Destination?.Street, order.Destination?.Building),
                "LastProgressTime: " + GetLastProgressTime(order)
                    .ToString("yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture));
        }

        private DateTime GetLastProgressTime(TaxiOrder order)
        {
            switch (order.TimingInfo.Status)
            {
                case TaxiOrderStatus.WaitingForDriver:
                    return order.TimingInfo.CreationTime;
                case TaxiOrderStatus.WaitingCarArrival:
                    return order.TimingInfo.DriverAssignmentTime;
                case TaxiOrderStatus.InProgress:
                    return order.TimingInfo.StartRideTime;
                case TaxiOrderStatus.Finished:
                    return order.TimingInfo.FinishRideTime;
                case TaxiOrderStatus.Canceled:
                    return order.TimingInfo.CancelTime;
                default:
                    throw new NotSupportedException(order.TimingInfo.Status.ToString());
            }
        }

        private string FormatName(string firstName, string lastName)
        {
            return string.Join(" ", new[] {firstName, lastName}.Where(n => n != null));
        }

        private string FormatAddress(string street, string building)
        {
            return string.Join(" ", new[] {street, building}.Where(n => n != null));
        }

        public void Cancel(TaxiOrder order)
        {
            order.Cancel(currentTime());
        }

        public void StartRide(TaxiOrder order)
        {
            order.StartRide(currentTime());
        }

        public void FinishRide(TaxiOrder order)
        {
            order.FinishRide(currentTime());
        }
    }

    public class TaxiOrder : Entity<int>
    {
        public int Id { get; }
        public PersonName ClientName { get; private set; }
        public Address Start { get; private set; }
        public Address Destination { get; private set; }
        public Driver Driver { get; private set; }
        public TimingInfo TimingInfo { get; private set; }

        public TaxiOrder(int id) : base(id)
        {
        }

        public void AssignDriver(DateTime dateTime)
        {
            if (TimingInfo.Status == TaxiOrderStatus.InProgress)
                throw new InvalidOperationException($"{nameof(TimingInfo.Status)} is {TaxiOrderStatus.InProgress}");
            TimingInfo.DriverAssignmentTime = dateTime;
            TimingInfo.Status = TaxiOrderStatus.WaitingCarArrival;
        }

        public void Cancel(DateTime dateTime)
        {
            if (TimingInfo.Status == TaxiOrderStatus.InProgress)
                throw new InvalidOperationException($"{nameof(TimingInfo.Status)} is {TaxiOrderStatus.InProgress}");
            TimingInfo.Status = TaxiOrderStatus.Canceled;
            TimingInfo.CancelTime = dateTime;
        }

        public void UpdateDestination(Address address)
        {
            Destination = address;
        }

        public void StartRide(DateTime currentTime)
        {
            if (Driver is null)
                throw new InvalidOperationException(
                    $"{nameof(Driver)} has not been assigned " +
                    $"or {nameof(TimingInfo.Status)} is {TaxiOrderStatus.WaitingForDriver}");

            TimingInfo.Status = TaxiOrderStatus.InProgress;
            TimingInfo.StartRideTime = currentTime;
        }

        public void FinishRide(DateTime currentTime)
        {
            if (Driver is null)
                throw new InvalidOperationException(
                    $"{nameof(Driver)} has not been assigned " +
                    $"or {nameof(TimingInfo.Status)} is {TaxiOrderStatus.WaitingForDriver}");
            if (TimingInfo.Status == TaxiOrderStatus.WaitingCarArrival || TimingInfo.Status == TaxiOrderStatus.Canceled)
                throw new InvalidOperationException(
                    $"{nameof(TimingInfo.Status)} is {TaxiOrderStatus.WaitingForDriver}");
            TimingInfo.Status = TaxiOrderStatus.Finished;
            TimingInfo.FinishRideTime = currentTime;
        }

        public void UnassignDriver()
        {
            if (Driver is null || TimingInfo.Status == TaxiOrderStatus.WaitingForDriver ||
                TimingInfo.Status == TaxiOrderStatus.InProgress)
                throw new InvalidOperationException(
                    $"{nameof(Driver)} has not been assigned" +
                    $" or {nameof(TimingInfo.Status)} is {TaxiOrderStatus.WaitingForDriver}");
            Driver = null;
            TimingInfo.Status = TaxiOrderStatus.WaitingForDriver;
        }

        public void SetDriver(Driver driver)
        {
            if (!(Driver is null)) throw new InvalidOperationException($"{Driver} is already assigned");
            Driver = driver;
        }

        public TaxiOrder SetClientName(PersonName clientName)
        {
            ClientName = clientName;
            return this;
        }

        public TaxiOrder SetStartAddress(Address startAddress)
        {
            Start = startAddress;
            return this;
        }

        public TaxiOrder SetCreationTime(DateTime creationTime)
        {
            if (TimingInfo is null) TimingInfo = new TimingInfo() {CreationTime = creationTime};
            else TimingInfo.CreationTime = creationTime;
            return this;
        }
    }

    public class TimingInfo : ValueType<TimingInfo>
    {
        public TaxiOrderStatus Status { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime DriverAssignmentTime { get; set; }
        public DateTime CancelTime { get; set; }
        public DateTime StartRideTime { get; set; }
        public DateTime FinishRideTime { get; set; }
    }

    public class Car : ValueType<Car>
    {
        public string Color { get; private set; }
        public string Model { get; private set; }
        public string PlateNumber { get; private set; }

        public Car(string color, string model, string plateNumber)
        {
            Color = color;
            Model = model;
            PlateNumber = plateNumber;
        }
    }

    public class Driver : Entity<int>
    {
        public PersonName DriverName { get; private set; }

        public Car Car { get; private set; }

        public Driver(int id, PersonName driverName, Car car) : base(id)
        {
            DriverName = driverName;
            Car = car;
        }

        public void ClearCar()
        {
            Car = null;
        }
    }
}