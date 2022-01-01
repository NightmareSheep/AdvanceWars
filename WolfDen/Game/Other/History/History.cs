using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WolfDen.Game.Other.History
{
    public class History
    {
        public string Class { get { return GetType().Name; } }
        public int Turn { get; set; }
        public List<Move> Moves { get; set; } = new List<Move>();
        public Replay Replay { get; set; }
    }
}
