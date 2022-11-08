using System;
using System.Collections.Generic;
using System.IO;

namespace Streams.Compression
{
    public class CustomCompressionStream1 : Stream
    {
        private readonly Stream _baseStream;
        private readonly bool _read;


        public CustomCompressionStream1(Stream baseStream, bool read)
        {
            _baseStream = baseStream;
            _read = read;
        }

        public override int Read(byte[] buffer, int offset, int count)
        {
            var decoded = new Queue<byte>();
            var read = 0;
            var key = true;

            var repeatCount = 0;

            while (decoded.Count < count)
            {
                var currentByte = _baseStream.ReadByte();
                if (currentByte == -1)
                    break;
                
                if (key)
                {
                    repeatCount = currentByte;
                }
                else
                {
                    for (int i = 0; i < repeatCount; i++)
                    {
                        decoded.Enqueue((byte)currentByte);
                    }
                }
                    
                key = !key;
            }

            if (!key)
                throw new InvalidOperationException();
            
            for (var i = 0; i < count; i++)
            {
                if (decoded.Count < 1)
                    break;

                buffer[offset + i] = decoded.Dequeue();
                read++;
            }
            
            return read;
        }

        public override void Write(byte[] buffer, int offset, int count)
        {
            if (offset + count > buffer.Length || offset >= buffer.Length)
                return;

            var repeatCount = (byte)0;
            var charCount = 0;
            var buf = new List<byte>();
            var current = buffer[offset];
            
            for (var i = 0; i < count; i++)
            {
                var previous = current;
                current = buffer[offset + i];

                if (current == previous && repeatCount < 255 && i != count - 1)
                {
                }
                else
                {
                    if (i == count - 1)
                        repeatCount++;

                    buf.Add(repeatCount);
                    buf.Add(previous);
                    repeatCount = 0;
                    charCount += 2;
                }

                repeatCount++;
            }
            
            _baseStream.Write(buf.ToArray(), 0, charCount);
        }

        public override bool CanRead => _read;
        public override bool CanWrite => !_read;
        public override bool CanSeek => false;
        
        public override void Flush() { }

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