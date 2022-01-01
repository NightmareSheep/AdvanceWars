using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WolfDen.Game
{
    public class AdvanceWarsGame : Game
    {
        public List<AdvanceWarsPlayer> AdvancewarsPlayers { get { return Players.OfType<AdvanceWarsPlayer>().ToList(); } }
        public AdvanceWarsBoard AdvancewarsBoard { get { return (AdvanceWarsBoard)Board; } }

        public AdvanceWarsGame()
        {
            Board = new AdvanceWarsBoard();
        }
    }
}