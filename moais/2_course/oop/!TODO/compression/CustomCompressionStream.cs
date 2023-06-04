using System;
using System.Collections.Generic;
using System.IO;

namespace Streams.Compression
{
    public class CustomCompressionStream : Stream
    {
        private readonly Stream baseStream;
        private readonly bool read;

        private readonly Queue<byte> decoded = new Queue<byte>();

        public CustomCompressionStream(Stream _baseStream, bool _read)
        {
            baseStream = _baseStream;
            read = _read;
        }

        public override int Read(byte[] buffer, int offset, int count)
        {
            var readBytes = 0;
            var key = true;

            var repeatCount = 0;

            while (decoded.Count < count)
            {
                var currentByte = baseStream.ReadByte();
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
                readBytes++;
            }
            
            return readBytes;
        }

        public override void Write(byte[] buffer, int offset, int count)
        {
            if (offset + count > buffer.Length || offset >= buffer.Length)
                return;
            
            var countToWrite = 0;
            var output = new List<byte>();
            
            for (var i = 0; i < count && offset+i+2<buffer.Length; i++)
            {
                var first = buffer[offset+i];
                var second = buffer[offset+i+1];
                var third = buffer[offset+i+2];
                var arr = new List<byte>();
                var repeatCount = 0;
                if (first == second && second == third)
                {
                    for (var j = i; j < count &&j+1<buffer.Length && buffer[j]==buffer[j+1]; j++)
                    {
                        arr.Add(buffer[j]);
                        repeatCount++;
                        i++;
                        if (repeatCount==129) break;
                    }
                    output.Add((byte)(repeatCount+125+1));
                    output.Add( buffer[i]);
                }
                else
                {
                    for (var j = i; j < count && j+1<buffer.Length&& !(buffer[j]==buffer[j+1] && buffer[j+1]==buffer[j+2]); j++)
                    {
                        repeatCount++;
                        arr.Add(buffer[j]);
                        i++;
                        if (repeatCount == 127) break;
                    }
                    output.Add((byte)(repeatCount-1));
                    output.AddRange(arr);
                    i--;
                }

                countToWrite = i;
            }
            
            baseStream.Write(output.ToArray(), 0, countToWrite);
        }

        public override bool CanRead => read;
        public override bool CanWrite => !read;
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