namespace TurnBasedBoardGame {
    export class RepairCoordinator {
        Player: AdvanceWarsPlayer;
        TurnRepairCosts: number = 0;
        CalcRepairCostsEvent: any = {};
        ExecuteRepairsEvent: any = {};
        IncomeCoordinator: IncomeCoordinator;
        Id: string = guid();

        Initialize() {
            this.IncomeCoordinator.PostIncomeEvent[this.Id] = (players) => { this.CoordinateRepairs(players); };
        }

        CoordinateRepairs(activePlayers: AdvanceWarsPlayer[]) {
            if (activePlayers.indexOf(this.Player) == -1)
                return;

            this.TurnRepairCosts = 0;
            this.RaiseCalcRepairCostsEvent();
            if (this.TurnRepairCosts <= this.Player.Gold)
                this.RaiseExecuteRepairsEvent();
            this.TurnRepairCosts = 0;
        }

        RaiseCalcRepairCostsEvent() {
            for (let key in this.CalcRepairCostsEvent) {
                if (typeof this.CalcRepairCostsEvent[key] === "function")
                    this.CalcRepairCostsEvent[key]();
            }
        }

        RaiseExecuteRepairsEvent() {
            for (let key in this.ExecuteRepairsEvent) {
                if (typeof this.ExecuteRepairsEvent[key] === "function")
                    this.ExecuteRepairsEvent[key]();
            }
        }

    }
}