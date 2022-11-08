using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Memory.API
{
    public class APIObject : IDisposable
    {
        private readonly int number;
        private bool isDisposed;
        public APIObject(int _number)
        {
            number = _number;
            isDisposed = false;
            MagicAPI.Allocate(_number);
        }

        private void ReleaseUnmanagedResources(bool fromDisposeMethod)
        {
            if (!isDisposed)
            {
                if (fromDisposeMethod)
                {
                    MagicAPI.Free(number);
                }

                isDisposed = true;
            }
        }

        public void Dispose()
        {
            ReleaseUnmanagedResources(true);
            GC.SuppressFinalize(this);
        }

        ~APIObject()
        {
            ReleaseUnmanagedResources(true);
        }
    }
}
