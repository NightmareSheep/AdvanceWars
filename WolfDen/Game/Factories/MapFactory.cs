using System;
using System.Collections.Generic;
using WolfDen.Game;
using WolfDen.Game.Other;
using WolfDen.Game.Tiles;

namespace WolfDen.Game.Factories
{
    public class MapFactory
    {
        public Tile GetTile(Game game, Models.Tile tile, List<AdvanceWarsPlayer> players, TurnResolver turnResolver)
        {
            AdvanceWarsPlayer owner = tile.Owner != -1 ? players[tile.Owner] : null;
            var baseMovementCost = MovementCosts.GetBaseMovementCost(tile.tileType);
            var movementCosts = MovementCosts.GetMovementCosts(tile.tileType);
            var x = tile.X;
            var y = tile.Y;

            switch (tile.tileType)
            {
                case TileType.Plain:
                    return new Tile(x, y, TileType.Plain, baseMovementCost, movementCosts, 1);
                case TileType.Forest:
                    return new Tile(x, y, TileType.Forest, baseMovementCost, movementCosts, 2);
                case TileType.HQ:
                    return GetHQ(tile.X, tile.Y, game, players[tile.Owner], turnResolver);
                case TileType.Factory:
                    return GetProducingBuilding(tile.X, tile.Y, owner, turnResolver, game, TileType.Factory, BuildingType.factory);
                case TileType.Airfield:
                    return GetProducingBuilding(tile.X, tile.Y, owner, turnResolver, game, TileType.Airfield, BuildingType.airfield);
                case TileType.Shipyard:
                    return GetProducingBuilding(tile.X, tile.Y, owner, turnResolver, game, TileType.Shipyard, BuildingType.shipyard);
                case TileType.City:
                    return GetCity(tile.X, tile.Y, owner, turnResolver);
                case TileType.Mountain:
                    return new Tile(x, y, TileType.Mountain, baseMovementCost, movementCosts, 4);
                case TileType.River:
                    return new Tile(x, y, TileType.River, baseMovementCost, movementCosts, 0);
                case TileType.Sea:
                    return new Tile(x, y, TileType.Sea, baseMovementCost, movementCosts, 0);
                case TileType.Reef:
                    return new Tile(x, y, TileType.Reef, baseMovementCost, movementCosts, 1);
                case TileType.Beach:
                    return new Tile(x, y, TileType.Beach, baseMovementCost, movementCosts, 0);
                case TileType.Road:
                    return new Tile(x, y, TileType.Road, baseMovementCost, movementCosts, 0);
                case TileType.Bridge:
                    return new Tile(x, y, TileType.Bridge, baseMovementCost, movementCosts, 0);
                case TileType.Pipe:
                    return new Tile(x, y, TileType.Pipe, baseMovementCost, movementCosts, 0);
                case TileType.DestroyedPipe:
                    return new Tile(x, y, TileType.DestroyedPipe, baseMovementCost, movementCosts, 1);

            }

            throw new Exception();
        }

        public Tile GetTile(int x, int y)
        {
            return new Tile(x, y);
        }

        public Tile GetHQ(int x, int y, Game game, AdvanceWarsPlayer owner, TurnResolver turnResolver)
        {
            var building = new HQ(x, y, game, turnResolver);
            building.Owner = owner;
            return building;
        }

        public Tile GetProducingBuilding(int x, int y, AdvanceWarsPlayer owner, TurnResolver turnResolver, Game game, TileType tileType, BuildingType buildingType)
        {
            var producingBuilding = new ProducingBuilding(x, y, turnResolver, game);
            producingBuilding.Owner = owner;
            producingBuilding.TileType = tileType;
            producingBuilding.BuildingType = buildingType;
            return producingBuilding;
        }

        public Tile GetCity(int x, int y, AdvanceWarsPlayer owner, TurnResolver turnResolver)
        {
            var city = new Building(x, y, turnResolver);
            city.Owner = owner;
            return city;
        }
    }
}
