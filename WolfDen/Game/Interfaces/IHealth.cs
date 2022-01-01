using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WolfDen.Game.Interfaces
{
    public interface IHealth
    {
        int MaxHealth { get; set; }
        int CurrentHealth { get; set; }
    }
}
