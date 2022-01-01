using SQLitePCL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WolfDen.Game.EventArguments;
using WolfDen.Game.Interfaces;
using WolfDen.Game.Other;
using WolfDen.Game.Tiles;

namespace WolfDen.Game.Behaviours.RepairBehaviour
{
    public class RepairBehaviour : IBehaviour
    {
        public string Class { get { return GetType().Name; } }
        public string Id { get; set; }
        public IHealth UnitHealth { get; set; }
        public Unit Unit { get; set; }
        public int FullRepairCost { get; set; }
        public RepairCoordinator RepairCoordinator { get; set; }
        
        public Game Game;

        public RepairBehaviour(Game game, Unit unit)
        {
            Game = game;
            var awPlayer = unit.Owner;
            RepairCoordinator = awPlayer.RepairCoordinator;
            RepairCoordinator.CalcRepairCostsEvent += CalcRepairCosts;
            RepairCoordinator.ExecuteRepairsEvent += RepairUnit;            
        }

        public void CalcRepairCosts()
        {
            int repairCosts = 0;
            int percentageToRepair = 0;
            GetRepairCosts(ref repairCosts, ref percentageToRepair);
            RepairCoordinator.TurnRepairCosts += 0;
        }

        public void GetRepairCosts(ref int repairCosts, ref int percentageToRepair)
        {
            repairCosts = 0;
            percentageToRepair = 0;
            if (Unit.Tile is Building building && building.Owner == Unit.Owner)
            {
                // Check how much to repair.
                var missingHealth = UnitHealth.MaxHealth - UnitHealth.CurrentHealth;

                // Max repair is 20%.
                percentageToRepair = Math.Min(20, missingHealth * 100 / UnitHealth.MaxHealth);

                // Check if owner has enough gold.
                repairCosts = percentageToRepair * FullRepairCost / 100;
            }
        }

        public void RepairUnit()
        {
            int repairCosts = 0;
            int percentageToRepair = 0;
            GetRepairCosts(ref repairCosts, ref percentageToRepair);
            var awOwner = Unit.Owner;
            awOwner.Gold -= repairCosts;
            UnitHealth.CurrentHealth += UnitHealth.MaxHealth * percentageToRepair / 100;
        }

        // Not used for this behaviour. Bad design, sad times.
        public bool ExecuteMove(dynamic data)
        {
            throw new NotImplementedException();
        }

        public void Destroy()
        {
            RepairCoordinator.CalcRepairCostsEvent -= CalcRepairCosts;
            RepairCoordinator.ExecuteRepairsEvent -= RepairUnit;
        }
    }
}
