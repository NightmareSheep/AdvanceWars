using System;
using System.Collections.Generic;

namespace WolfDen.Game
{
    public class Board
    {
        public string Class { get { return GetType().Name; } }
        public Dictionary<string, Node> Nodes = new Dictionary<string, Node>();
    }
}