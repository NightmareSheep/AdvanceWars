using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game;
using WolfDen.Game.EventArguments;
using WolfDen.Game.Tiles;

namespace WolfDen.Game.GameMechanics
{
    public class WinCondition : Piece
    {
        public string Class { get { return GetType().Name; } }
        public List<HQ> HQs { get; set; }
        public List<AdvanceWarsPlayer> RemainingPlayers { get; set; }

        public WinCondition(Game game) : base(game)
        {
            Id = "WinCondition";
            HQs = game.Board.Nodes.Values.OfType<HQ>().ToList();
            RemainingPlayers = HQs.Select(hq => hq.Owner).ToList();
            foreach (var hq in HQs)
                hq.BuildingCaptureEvent += HQCaptured;
        }

        private void HQCaptured(object sender, BuildingCaptureEventArgs e)
        {
            var hq = sender as HQ;
            hq.BuildingCaptureEvent -= HQCaptured;
            var player = e.PreviousOwner;
            RemainingPlayers.Remove(player);

            // TODO: Remove game
            //if (RemainingPlayers.Select(p => p.Team).Distinct().Count() == 1)
            //    GameHub.RemoveGame(Game.Id);
        }
    }
}