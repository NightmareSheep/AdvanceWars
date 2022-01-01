namespace TurnBasedBoardGame {
    export class EndTurnButton implements IExecuteMove {
        Id: string;
        Owner: AdvanceWarsPlayer;
        TurnResolver: TurnResolver;

        ExecuteMove(move: any): boolean {
            this.TurnResolver.EndTurn(this.Owner);
            $("#EndTurn" + this.Owner.Id).removeClass("btn-warning");
            return true;
        }

        Initialize() {
            let self = this;
            if (document.getElementById("EndTurn" + self.Owner.Id))
                $("#EndTurn" + self.Owner.Id).click(function () {
                    Game.Instance.GiveCommand({ "id": self.Id, "data": null });
                });
            hotkeyEvents.space[this.Id] = () => {
                Game.Instance.GiveCommand({ "id": self.Id, "data": null });
            };

            Game.Instance.TurnResolver.StartTurnEvent[this.Id] = (activePlayers: AdvanceWarsPlayer[]) => {
                if (activePlayers.indexOf(self.Owner) !== -1)
                    $("#EndTurn" + self.Owner.Id).addClass("btn-warning");
                else
                    $("#EndTurn" + self.Owner.Id).removeClass("btn-warning");

            };
        }
    }
}