using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game;

namespace WolfDen.Game.EventArguments
{
    public delegate void ListOfPlayersEventHandler(object sender, ListOfPlayersEventArgs e);
    public class ListOfPlayersEventArgs : EventArgs
    {
        public List<AdvanceWarsPlayer> Players { get; }

        public ListOfPlayersEventArgs(List<AdvanceWarsPlayer> players)
        {
            Players = players;
        }
    }
}