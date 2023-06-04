using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Streams.Resources
{
    public class ResourceReaderStream1 : Stream
    {
        private readonly Stream underlyingStream;
        private readonly byte[] key;
        private bool isValueFound;
        private bool isValueRead;
        
        private byte[] value;
        private int valueIndex;

        public ResourceReaderStream1(Stream stream, string key)
        {
            underlyingStream = new BufferedStream(stream, Constants.BufferSize);
            this.key = Encoding.ASCII.GetBytes(key);
        }

        public override int Read(byte[] buffer, int offset, int count)
        {
            if (!isValueFound) SeekValue();

            if (isValueRead) return 0;
            
            if (value == null)
                value = ReadNextField();

            var oldPosition = valueIndex;
            for (var i = 0; i < count && valueIndex < value.Length; valueIndex++, i++)
            {
                buffer[offset + i] = value[valueIndex];
            }

            if (valueIndex == value.Length)
                isValueRead = true;
                
            return valueIndex - oldPosition;
        }

        private void SeekValue()
        {
            while (true)
            {
                var nextField = ReadNextField();
                
                if (CompareFieldToKey(nextField))
                {
                    isValueFound = true;
                    return;
                }

                ReadNextField();
            }
        }
        
        private byte[] ReadNextField()
        {
            var field = new List<byte>();
            
            while (true)
            {
                var nextByte = ReadNextByte();
                if (nextByte < 0)
                    break;
                
                field.Add((byte)nextByte);
            }

            return field.ToArray();
        }

        private bool CompareFieldToKey(IReadOnlyList<byte> field)
        {
            if (key.Length != field.Count) 
                return false;

            for (var i = 0; i < field.Count; i++)
            {
                if (key[i] != field[i])
                    return false;
            }

            return true;
        }

        private int ReadNextByte()
        {
            var first = underlyingStream.ReadByte();
            var last = first == 0 ? underlyingStream.ReadByte() : first;

            if (first == -1 || last == -1)
                throw new EndOfStreamException();
            
            if (first == 0 && last == 1) return -1;
            return last;
        }

        public override bool CanRead => true;
        public override bool CanSeek => false;
        public override bool CanWrite => false;
        
        public override void Flush() { }

        public override void Write(byte[] buffer, int offset, int count) => throw new NotSupportedException();
        
        public override long Seek(long offset, SeekOrigin origin) => throw new NotSupportedException();

        public override void SetLength(long value) => throw new NotSupportedException();
        
        public override long Length => throw new NotSupportedException();

        public override long Position
        {
            get => throw new NotSupportedException(); 
            set => throw new NotSupportedException();
        }
    }
}