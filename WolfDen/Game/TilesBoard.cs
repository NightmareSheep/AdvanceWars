using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game.Tiles;

namespace WolfDen.Game
{
    public class AdvanceWarsBoard : Board
    {
        public int MapId { get; set; }
        public Tile[,] Tiles { get; set; }
    }
}