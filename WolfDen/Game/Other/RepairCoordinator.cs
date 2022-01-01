using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WolfDen.Game.EventArguments;

namespace WolfDen.Game.Other
{
    public class RepairCoordinator
    {
        public string Class { get { return GetType().Name; } }
        public AdvanceWarsPlayer Player { get; set; }
        public int TurnRepairCosts { get; set; }
        public event Action CalcRepairCostsEvent;
        public event Action ExecuteRepairsEvent;
        public IncomeCoordinator IncomeCoordinator { get; set; }


        public RepairCoordinator(AdvanceWarsPlayer player)
        {
            Player = player;
        }

        public void Initialize(IncomeCoordinator incomeCoordinator)
        {
            IncomeCoordinator = incomeCoordinator;
            incomeCoordinator.PostIncomeEvent += CoordinateRepairs;
        }

        private void CoordinateRepairs(object sender, ListOfPlayersEventArgs args)
        {
            if (!args.Players.Contains(Player))
                return;

            TurnRepairCosts = 0;
            RaiseCalcRepairCostsEvent();
            if (TurnRepairCosts <= Player.Gold)
                RaiseExecuteRepairsEvent();
            TurnRepairCosts = 0;
        }

        private void RaiseCalcRepairCostsEvent() => CalcRepairCostsEvent?.Invoke();
        private void RaiseExecuteRepairsEvent() => ExecuteRepairsEvent?.Invoke();
    }
}
