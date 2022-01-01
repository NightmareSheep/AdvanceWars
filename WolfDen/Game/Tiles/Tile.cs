using System;
using System.Collections.Generic;
using WolfDen.Game;

namespace WolfDen.Game.Tiles
{
    public class Tile : Node
    {
        public string Class { get { return GetType().Name; } }
        public int X { get; set; }
        public int Y { get; set; }
        public int BaseMovementCost { get; set; }
        public Dictionary<MovementType, int> MovementCosts { get; set; }
        public int Stars { get; set; }
        public TileType TileType { get; set; }

        public Tile(int x, int y, TileType tileType = TileType.Plain, int baseMovementCost = 1, Dictionary<MovementType, int> movementCosts = null, int stars = 0) : base()
        {
            Id = "X:"+x+",Y:"+y;
            X = x;
            Y = y;
            TileType = tileType;
            BaseMovementCost = baseMovementCost;
            MovementCosts = movementCosts ?? new Dictionary<MovementType, int>();
            Stars = stars;
        }

        public int GetMoveCost(MovementType movementType)
        {
            if (MovementCosts.ContainsKey(movementType))
                return MovementCosts[movementType];
            return BaseMovementCost;
        }

        public int DistanceTo(Tile tile) => Math.Abs(tile.X - X) + Math.Abs(tile.Y - Y);
    }
}
