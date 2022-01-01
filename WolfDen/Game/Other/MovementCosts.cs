using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WolfDen.Game.Tiles;

namespace WolfDen.Game.Other
{
    public static class MovementCosts
    {
        public static Dictionary<MovementType, int> GetMovementCosts(TileType tiletype)
        {
            var movementCosts = new Dictionary<MovementType, int>();

            switch (tiletype)
            {
                case TileType.Plain:
                case TileType.DestroyedPipe:
                    movementCosts.Add(MovementType.Tires, 2);
                    movementCosts.Add(MovementType.Sea, 99);
                    movementCosts.Add(MovementType.Lander, 99);
                    break;
                case TileType.Forest:
                    movementCosts.Add(MovementType.Threads, 2);
                    movementCosts.Add(MovementType.Tires, 3);
                    movementCosts.Add(MovementType.Sea, 99);
                    movementCosts.Add(MovementType.Lander, 99);
                    break;
                case TileType.HQ:
                    movementCosts.Add(MovementType.Sea, 99);
                    movementCosts.Add(MovementType.Lander, 99);
                    break;
                case TileType.Factory:
                    movementCosts.Add(MovementType.Sea, 99);
                    movementCosts.Add(MovementType.Lander, 99);
                    break;
                case TileType.Airfield:
                    movementCosts.Add(MovementType.Sea, 99);
                    movementCosts.Add(MovementType.Lander, 99);
                    break;
                case TileType.City:
                    movementCosts.Add(MovementType.Sea, 99);
                    movementCosts.Add(MovementType.Lander, 99);
                    break;
                case TileType.Mountain:
                    movementCosts.Add(MovementType.Foot, 2);
                    movementCosts.Add(MovementType.Mech, 1);
                    movementCosts.Add(MovementType.Air, 1);
                    movementCosts.Add(MovementType.Sea, 99);
                    movementCosts.Add(MovementType.Lander, 99);
                    break;
                case TileType.River:
                    movementCosts.Add(MovementType.Foot, 2);
                    movementCosts.Add(MovementType.Mech, 1);
                    movementCosts.Add(MovementType.Air, 1);
                    movementCosts.Add(MovementType.Sea, 99);
                    movementCosts.Add(MovementType.Lander, 99);
                    break;
                case TileType.Sea:
                    movementCosts.Add(MovementType.Air, 1);
                    movementCosts.Add(MovementType.Sea, 1);
                    movementCosts.Add(MovementType.Lander, 1);
                    break;
                case TileType.Reef:
                    movementCosts.Add(MovementType.Air, 1);
                    movementCosts.Add(MovementType.Sea, 2);
                    movementCosts.Add(MovementType.Lander, 2);
                    break;
                case TileType.Beach:
                    movementCosts.Add(MovementType.Sea, 99);
                    break;
                case TileType.Road:
                    movementCosts.Add(MovementType.Sea, 99);
                    movementCosts.Add(MovementType.Lander, 99);
                    break;
                case TileType.Bridge:
                    movementCosts.Add(MovementType.Sea, 99);
                    movementCosts.Add(MovementType.Lander, 99);
                    break;
                case TileType.Pipe:
                    break;


            }
            return movementCosts;
        }

        public static int GetBaseMovementCost(TileType tiletype)
        {
            switch (tiletype)
            {
                case TileType.Pipe:
                    return 99;
                case TileType.Sea:
                    return 99;
                case TileType.Reef:
                    return 99;
                case TileType.Mountain:
                    return 99;
                case TileType.River:
                    return 99;
            }

            return 1;
        }
    }
}
