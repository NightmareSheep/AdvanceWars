namespace TurnBasedBoardGame {
    export class IncomeCoordinator {
        Id: string = guid();
        PreIncomeEvent: any = {};
        IncomeEvent: any = {};
        PostIncomeEvent: any = {};

        Initialize() {
            var self = this;
            Game.Instance.TurnResolver.StartTurnEvent[this.Id] = (activePlayers: AdvanceWarsPlayer[]) => {
                self.RaisePreIncomeEvent(activePlayers);
                self.RaiseIncomeEvent(activePlayers);
                self.RaisePostIncomeEvent(activePlayers);
            };
        }

        RaisePreIncomeEvent(players: AdvanceWarsPlayer[]) {
            for (let key in this.PreIncomeEvent) {
                if (typeof this.PreIncomeEvent[key] === "function")
                    this.PreIncomeEvent[key](players);
            }
        }

        RaiseIncomeEvent(players: AdvanceWarsPlayer[]) {
            for (let key in this.IncomeEvent) {
                if (typeof this.IncomeEvent[key] === "function")
                    this.IncomeEvent[key](players);
            }
        }

        RaisePostIncomeEvent(players: AdvanceWarsPlayer[]) {
            for (let key in this.PostIncomeEvent) {
                if (typeof this.PostIncomeEvent[key] === "function")
                    this.PostIncomeEvent[key](players);
            }
        }
    }
}