using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WolfDen.Other
{
    public class ConcurrencyObjects
    {
        public static readonly ConcurrentDictionary<Guid, object> Locks = new ConcurrentDictionary<Guid, object>();
        public static readonly ConcurrentDictionary<Guid, object> Objects = new ConcurrentDictionary<Guid, object>();

        public static void ConcurentOperation(Guid objectId, Action<object> action) => ConcurentOperation<object>(objectId, action);

        public static void ConcurentOperation<T>(Guid objectId, Action<T> action)
        {
            object lockObject;
            object concurrentObject;
            Locks.TryGetValue(objectId, out lockObject);
            Objects.TryGetValue(objectId, out concurrentObject);
            var concurrentObjectWithCorrectType = (T)concurrentObject;

            if (lockObject != null && concurrentObject != null && concurrentObjectWithCorrectType != null)
                lock (lockObject)
                    action(concurrentObjectWithCorrectType);
        }

        public static void RemoveObject(Guid objectId)
        {
            ConcurentOperation(objectId, (obj) => {
                RemoveObjectWithoutLocking(objectId);
            });
        }

        public static void RemoveObjectWithoutLocking(Guid objectId)
        {
            Locks.TryRemove(objectId, out var o);
            Objects.TryRemove(objectId, out var g);
        }
    }
}
