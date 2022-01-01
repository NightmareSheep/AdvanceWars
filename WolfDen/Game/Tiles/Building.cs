using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game;
using WolfDen.Game.EventArguments;

namespace WolfDen.Game.Tiles
{
    public class Building : Tile
    {
        public TurnResolver TurnResolver { get; }
        public int Income { get; set; }
        public AdvanceWarsPlayer Owner { get; set; }
        public delegate void BuildingCaptureEventHandler(object sender, BuildingCaptureEventArgs e);
        public event BuildingCaptureEventHandler BuildingCaptureEvent;

        public Building(int x, int y, TurnResolver turnResolver, int income = 1000, TileType tileType = TileType.City, int baseMovementCost = 1, Dictionary<MovementType, int> movementCosts = null) : base(x, y, tileType, baseMovementCost, movementCosts)
        {
            TurnResolver = turnResolver;
            Income = income;
            if (turnResolver != null)
                turnResolver.IncomeCoordinator.IncomeEvent += AddIncome;
            MovementCosts.Add(MovementType.Sea, 99);
            MovementCosts.Add(MovementType.Lander, 99);
            Stars = 3;
        }

        public void AddIncome(object sender, ListOfPlayersEventArgs e)
        {
            if (Owner != null && e.Players.Contains(Owner))
                Owner.Gold += Income;
        }

        public virtual void RaiseBuildingCaptureEvent(AdvanceWarsPlayer previousOwner, AdvanceWarsPlayer newOwner)
        {
            if (BuildingCaptureEvent != null)
                BuildingCaptureEvent(this, new BuildingCaptureEventArgs(previousOwner, newOwner));
        }
    }
}