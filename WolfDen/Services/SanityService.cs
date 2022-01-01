using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WolfDen.Game;
using WolfDen.Game.Interfaces;
using WolfDen.Game.Tiles;
using WolfDen.Models;
using WolfDen.Models.SaveAndLoad;

namespace WolfDen.Services
{
    public class SanityService
    {


        public SanityService()
        {
        }

        public SanityResult GetSanityId(AdvanceWarsGame game)
        {
            var id = 0;
            var calculation = "";
            foreach (var player in game.Players)
            {
                id += player.Gold;
                calculation += player.Gold + " ";
            }

            var sortedUnits = game.Pieces.Values.OfType<Unit>().OrderBy(u => u.Id).ToList();
            foreach (var unit in sortedUnits)
            {
                var tile = unit.Node as WolfDen.Game.Tiles.Tile;
                var unitHealth = unit.Behaviours.Values.OfType<IHealth>().FirstOrDefault();
                
                if (tile != null)
                {
                    id += unitHealth.CurrentHealth * tile.X * tile.Y;
                    calculation += unitHealth.CurrentHealth + "x" + tile.X + "x" + tile.Y + " ";
                }
            }

            for (int x = 0; x < game.AdvancewarsBoard.Tiles.GetLength(0); x++)
            {
                for (int y = 0; y < game.AdvancewarsBoard.Tiles.GetLength(1); y++)
                {
                    var tile = game.AdvancewarsBoard.Tiles[x, y];
                    if (tile.Piece != null)
                    {
                        var unit = tile.Piece as Unit;
                        var unitHealth = unit.Behaviours.Values.OfType<IHealth>().FirstOrDefault();
                        id += unitHealth.CurrentHealth * tile.X * tile.Y;
                        calculation += unitHealth.CurrentHealth + "x" + tile.X + "x" + tile.Y + " ";
                    }
                }
            }

            for (int x = 0; x < game.AdvancewarsBoard.Tiles.GetLength(0); x++)
            {
                for (int y = 0; y < game.AdvancewarsBoard.Tiles.GetLength(1); y++)
                {
                    var tile = game.AdvancewarsBoard.Tiles[x, y];
                    if (tile is Building building)
                    {
                        if (building.Owner != null)
                        {
                            id += building.X * building.Y * building.Owner.Team;
                            calculation += building.X + "x" + building.Y + "x" + building.Owner.Team + " ";
                        }
                    }
                }
            }

            var currentMove = game?.History?.Replay?.CurrentMove ?? -1;

            return new SanityResult() { Id = id, Calculation = calculation, MoveNumber = currentMove };
        }
    }
}
