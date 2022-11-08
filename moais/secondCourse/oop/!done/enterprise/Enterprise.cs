using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Incapsulation.EnterpriseTask
{
    public class Enterprise
    {
        public Guid Guid { get; }
        public string Name { get; set; }
        public DateTime EstablishDate { get; set; }
        public TimeSpan ActiveTimeSpan => DateTime.Now - EstablishDate;

        public string Inn
        {
            get => inn;
            set
            {
                if (value.Length != 10 || !value.All(char.IsDigit))
                    throw new ArgumentException();
                inn = value;
            }
        }

        private string inn;

        public Enterprise(Guid guid)
        {
            Guid = guid;
        }

        public double GetTotalTransactionsAmount()
        {
            DataBase.OpenConnection();
            var amount = 0.0;
            foreach (var t in DataBase.Transactions().Where(z => z.EnterpriseGuid == Guid))
                amount += t.Amount;
            return amount;
        }
    }
}