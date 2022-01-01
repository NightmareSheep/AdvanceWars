using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WolfDen.Game.Interfaces
{
    public interface IMoveBehaviour : IBehaviour
    {
        event EventHandler MoveEvent;
    }
}
