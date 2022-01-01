using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WolfDen.Game.Interfaces
{
    public interface IBehaviour : IExecuteMove
    {
        void Destroy();
    }
}
