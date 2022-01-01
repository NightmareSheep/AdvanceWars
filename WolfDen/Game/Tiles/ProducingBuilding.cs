using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using WolfDen.Game;
using WolfDen.Game.Interfaces;

namespace WolfDen.Game.Tiles
{
    public class ProducingBuilding : Building, IExecuteMove
    {
        [JsonIgnore]
        public Dictionary<string, ProducingBuildingListing> Listings { get { return Owner?.Listings[BuildingType]; } }
        public Game Game { get; }
        public BuildingType BuildingType { get; set; }

        public ProducingBuilding(int x, int y, TurnResolver turnResolver, Game game, int income = 1000, TileType tileType = TileType.Plain, int baseMovementCost = 1, Dictionary<MovementType, int> movementCosts = null, BuildingType buildingType = BuildingType.factory) : base(x, y, turnResolver, income, tileType, baseMovementCost, movementCosts)
        {
            Game = game;
            BuildingType = buildingType;
        }

        public bool ExecuteMove(dynamic data)
        {
            try
            {
                var listingId = data.listing.ToObject<string>();
                var listing = Owner != null ? Listings[listingId] : null;
                if (Piece == null && Owner != null && Owner.Gold >= listing.Cost)
                {
                    Owner.Gold -= listing.Cost;
                    listing.UnitTemplate.GenerateUnit(Game, this, Owner);
                }

                return true;
            }
            catch (Exception exception)
            {
                return false;
            }
        }
    }
}