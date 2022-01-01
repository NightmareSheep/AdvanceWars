using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WolfDen.Game.Other.History
{
    public class Move
    {
        public string Class { get { return GetType().Name; } }
        public string UserId { get; set; }
        public dynamic Data { get; set; }
    }
}
