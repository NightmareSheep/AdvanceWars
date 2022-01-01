using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace WolfDen.Game
{
    public class Node
    {
        public string Id;
        public List<Node> Neighbours = new List<Node>();
        public Piece Piece { get; set; }

        public Node()
        {
        }
    }
}