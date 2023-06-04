using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generics.Tables
{
    public class TableObj<Row, Column, Value>
    {
        private readonly Dictionary<Row, Dictionary<Column, Value>> tableFirstParam;
        private readonly Dictionary<Column, Dictionary<Row, Value>> tableSecondParam;
        private bool isOpen;

        public TableObj(bool _isOpen)
        {
            tableFirstParam = new Dictionary<Row, Dictionary<Column, Value>>();
            isOpen = _isOpen;
        }

        public IReadOnlyDictionary<Row, Dictionary<Column, Value>> Rows =>tableFirstParam;
        public IReadOnlyDictionary<Column, Dictionary<Row, Value>> Columns => tableSecondParam;


        public Value this[Row firstParam, Column secondParam]
        {
            get
            {
                if (!isOpen)
                {
                    if (!tableFirstParam.ContainsKey(firstParam)) return  default;
                    if (!tableSecondParam.ContainsKey(secondParam)) return default;
                    return tableFirstParam[firstParam].Count ==0? default: tableFirstParam[firstParam][secondParam];
                }

                if (!tableFirstParam.ContainsKey(firstParam)) throw new ArgumentException($"Key {firstParam} doesn't exist");
                if (!tableSecondParam.ContainsKey(secondParam)) throw new ArgumentException($"Key {secondParam} doesn't exist");
                if (isOpen)
                    return tableFirstParam[firstParam].Count == 0 ? default: tableFirstParam[firstParam][secondParam];
                if (!isOpen )
                    return tableFirstParam[firstParam].Count == 0
                        ? throw new ArgumentException()
                        : tableFirstParam[firstParam][secondParam];

                throw new ArgumentException();
            }
            set
            {
                if (!isOpen)
                {
                    if (!tableFirstParam.ContainsKey(firstParam) && !tableSecondParam.ContainsKey(secondParam))
                    {
                        tableFirstParam.Add(firstParam, 
                            new Dictionary<Column, Value> {{secondParam, value}});
                        tableSecondParam.Add(secondParam,
                            new Dictionary<Row, Value> {{firstParam, value}});
                    }

                    if (tableFirstParam[firstParam].Count == 0)
                    {
                        tableFirstParam[firstParam][secondParam] = value;
                        tableSecondParam[secondParam][firstParam] = value;
                    }
                }
                else
                {
                    if (!tableFirstParam.ContainsKey(firstParam)) throw new ArgumentException($"Key {firstParam} doesn't exist");
                    if (!tableSecondParam.ContainsKey(secondParam)) throw new ArgumentException($"Key {secondParam} doesn't exist");
                    tableFirstParam[firstParam][secondParam] = value;
                    tableSecondParam[secondParam][firstParam] = value;
                }
            }
        }

        public TableObj<Row, Column, Value> GetOpen()
        {
            isOpen = false;
            return this;
        }

        public TableObj<Row, Column, Value> GetProtected()
        {
            isOpen = true;
            return this;
        }

        public void AddColumn(Column secondParam, Dictionary<Row, Value> outParams)
        {
            if (!tableSecondParam.ContainsKey(secondParam)) tableSecondParam.Add(secondParam, outParams);
        }

        public void AddRow(Row firstParam, Dictionary<Column,Value> outParams)
        {
            if(!tableFirstParam.ContainsKey(firstParam)) tableFirstParam.Add(firstParam, outParams);
        }
    }

    public class Table<TFirstParam, TSecondParam, TOutParam>
    {
        private TableObj<TFirstParam, TSecondParam, TOutParam> open =
            new TableObj<TFirstParam, TSecondParam, TOutParam>(true);
        private TableObj<TFirstParam, TSecondParam, TOutParam> existed =
            new TableObj<TFirstParam, TSecondParam, TOutParam>(false);


        public TableObj<TFirstParam, TSecondParam, TOutParam> Open => open;

        public TableObj<TFirstParam, TSecondParam, TOutParam> Existed => existed;

        public IReadOnlyDictionary<TFirstParam, Dictionary<TSecondParam, TOutParam>> Rows => open.Rows;
        public IReadOnlyDictionary<TSecondParam, Dictionary<TFirstParam, TOutParam>> Columns => open.Columns;

        public void AddRow(TFirstParam firstParam)
        {
            open.AddRow(firstParam, new Dictionary<TSecondParam, TOutParam>());
        }

        public void AddColumn(TSecondParam secondParam)
        {
            open.AddColumn(secondParam, new Dictionary<TFirstParam, TOutParam>());
        }
    }
}