using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inheritance.DataStructure
{
    public class Category : IComparable
    {
        private readonly string productName;
        private readonly MessageType messageType;
        private readonly MessageTopic messageTopic;

        public Category(string _productName, MessageType _messageType, MessageTopic _messageTopic)
        {
            productName = _productName;
            messageType = _messageType;
            messageTopic = _messageTopic;
        }

        public int CompareTo(object obj)
        {
            if (!(obj is Category category)) return 1;
            var isThisProductNameGreater = string.Compare(productName, category.productName, StringComparison.Ordinal);
            if (isThisProductNameGreater != 0) return isThisProductNameGreater;
            var isThisMessageTypeGreater = messageType.CompareTo(category.messageType);
            if (isThisMessageTypeGreater != 0) return isThisMessageTypeGreater;
            var isThisMessageTopicGreater = messageTopic.CompareTo(category.messageTopic);
            if (isThisMessageTopicGreater != 0) return isThisMessageTopicGreater;

            return 0;
        }

        public static bool operator >(Category leftOperand, Category rightOperand)
        {
            return leftOperand.CompareTo(rightOperand) > 0;
        }

        public static bool operator <(Category leftOperand, Category rightOperand)
        {
            return leftOperand.CompareTo(rightOperand) < 0;
        }

        public static bool operator >=(Category leftOperand, Category rightOperand)
        {
            return leftOperand > rightOperand || leftOperand.Equals(rightOperand);
        }

        public static bool operator <=(Category leftOperand, Category rightOperand)
        {
            return leftOperand < rightOperand || leftOperand.Equals(rightOperand);
        }

        public override bool Equals(object obj)
        {
            if (!(obj is Category category)) return false;
            return productName == category.productName && messageType == category.messageType &&
                   messageTopic == category.messageTopic;
        }

        public override int GetHashCode()
        {
            unchecked
            {
                return productName.GetHashCode()+messageType.GetHashCode()*31+messageTopic.GetHashCode()*41;
            }
        }

        public override string ToString()
        {
            return $"{productName}.{messageType}.{messageTopic}";
        }
    }
}