using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game;

namespace WolfDen.Game.Tiles
{
    public class HQ : Building
    {
        public Game Game { get; set; }

        public HQ(int x, int y, Game game, TurnResolver turnResolver, int income = 1000, TileType tileType = TileType.HQ, int baseMovementCost = 1, Dictionary<MovementType, int> movementCosts = null) : base(x, y, turnResolver, income, tileType, baseMovementCost, movementCosts)
        {
            Game = game;
            Stars = 4;
            BuildingCaptureEventHandler handler = null;
            BuildingCaptureEvent += handler = (self, buildingCaptureEventArgs) =>
            {
                var player = buildingCaptureEventArgs.PreviousOwner;
                player.Defeated = true;

                for (int i = buildingCaptureEventArgs.PreviousOwner.Pieces.Count - 1; i >= 0; i--)
                    buildingCaptureEventArgs.PreviousOwner.Pieces[i].Destroy();
                foreach (Node node in game.Board.Nodes.Values)
                {
                    var building = node as Building;
                    if (building != null && building.Owner == buildingCaptureEventArgs.PreviousOwner)
                        building.Owner = null;
                }
                BuildingCaptureEvent -= handler;
                TileType = TileType.City;
            };
        }
    }
}