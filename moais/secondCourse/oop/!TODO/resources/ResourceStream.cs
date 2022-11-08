using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Streams.Resources
{
    public class ResourceReaderStream : Stream
    {
        public override bool CanRead => true;
        public override bool CanSeek => false;
        public override bool CanWrite => false;
        public override long Length => throw new NotSupportedException();

        public override long Position
        {
            get => throw new NotSupportedException();
            set => throw new NotSupportedException();
        }

        private readonly Stream underlyingStream;
        private readonly byte[] key;

        private bool isValueFound;
        private bool isValueRead;

        private byte[] value;
        private int valueIndex;

        public ResourceReaderStream(Stream stream, string _key)
        {
            underlyingStream = new BufferedStream(stream, Constants.BufferSize);
            key = Encoding.ASCII.GetBytes(_key);
        }

        public override int Read(byte[] buffer, int offset, int count)
        {
            if (!isValueFound) SeekValue();

            if (isValueRead) return 0;

            if (value == null)
                value = ReadKey();

            return CountReadBytes(buffer, offset, count);
        }

        private int CountReadBytes(IList<byte> buffer, int offset, int count)
        {
            var oldIndex = valueIndex;
            for (var i = 0; i < count && valueIndex < value.Length; valueIndex++, i++)
            {
                buffer[offset + i] = value[valueIndex];
            }

            if (valueIndex == value.Length)
                isValueRead = true;

            return valueIndex - oldIndex;
        }

        public override long Seek(long offset, SeekOrigin origin)
        {
            throw new NotSupportedException();
        }

        public override void SetLength(long value)
        {
            throw new NotSupportedException();
        }

        public override void Write(byte[] buffer, int offset, int count)
        {
            throw new NotSupportedException();
        }

        public override void Flush()
        {
            // nothing to do
        }

        private void SeekValue()
        {
            while (!isValueFound)
            {
                var readKey = ReadKey();

                if (CompareKeyWithFound(readKey))
                    isValueFound = true;
            }
        }

        private byte[] ReadKey()
        {
            var readKey = new List<byte>();
            while (true)
            {
                var nextByte = ReadNextByte();
                if (nextByte < 0)
                    break;

                readKey.Add((byte) nextByte);
            }

            return readKey.ToArray();
        }

        private bool CompareKeyWithFound(IReadOnlyCollection<byte> readKey)
        {
            if (key.Length != readKey.Count) return false;

            return !readKey.Where((t, i) => key[i] != t).Any();
        }

        private int ReadNextByte()
        {
            var first = underlyingStream.ReadByte();
            var second = first == 0 ? underlyingStream.ReadByte() : first;

            if (first == -1 || second == -1)
                throw new EndOfStreamException();
            if (first == 0 && second == 1)
                return -1;
            return second;
        }
    }
}