using System;
using System.Collections.Generic;
using System.Text;

namespace Delegates.Observers
{
    public class StackOperationsLogger
    {
        private readonly StringBuilder log = new StringBuilder();

        public void SubscribeOn<T>(ObservableStack<T> stack)
        {
            stack.EventHandler += HandleEvent;
        }

        public string GetLog()
        {
            return log.ToString();
        }

        private void HandleEvent(object eventData)
        {
            log.Append(eventData);
        }
    }

    public class ObservableStack<T>
    {
        public event Action<StackEventData<T>> EventHandler;

        List<T> data = new List<T>();

        public void Push(T obj)
        {
            data.Add(obj);
            EventHandler?.Invoke(new StackEventData<T> {IsPushed = true, Value = obj});
        }

        public T Pop()
        {
            if (data.Count == 0)
                throw new InvalidOperationException();
            var result = data[data.Count - 1];
            EventHandler?.Invoke(new StackEventData<T> {IsPushed = false, Value = result});
            return result;
        }
    }
}