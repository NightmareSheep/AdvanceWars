using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WolfDen.Game.Interfaces
{
    public interface IClone
    {
        Guid Id { get; set; }
        object Clone(Dictionary<Guid, object> references, Game game);
    }
}
