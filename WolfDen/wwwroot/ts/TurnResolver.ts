namespace TurnBasedBoardGame {
    export class TurnResolver {
        Game: Game;
        ActiveGroupIndex: number;
        TurnOrder: AdvanceWarsPlayer[][];
        ActivePlayers: AdvanceWarsPlayer[];
        Id: string;
        StartTurnEvent: any = {};
        StartTurnModal: StartTurnModal;
        IncomeCoordinator: IncomeCoordinator;
        private PlayerEndTurnEvent: ((player: AdvanceWarsPlayer) => void)[] = [];

        SubscribeToPlayerEndTurnEvent(funct: (player: AdvanceWarsPlayer) => void) {
            this.PlayerEndTurnEvent.push(funct);
        }

        UnsubscribeToPlayerEndTurnEvent(funct: (player: AdvanceWarsPlayer) => void) {
            this.PlayerEndTurnEvent.splice(this.PlayerEndTurnEvent.indexOf(funct),1);
        }

        RaisePlayerEndTurnEvent(player: AdvanceWarsPlayer) {
            for (let f of this.PlayerEndTurnEvent)
                f(player);
        }

        constructor() {
            this.StartTurnModal = new StartTurnModal(this);
        }

        public IsActive(player: AdvanceWarsPlayer) {
            return this.ActivePlayers.indexOf(player) != -1;
        }

        EndTurn(player: AdvanceWarsPlayer) {
            this.RaisePlayerEndTurnEvent(player);
            this.ActivePlayers.splice(this.ActivePlayers.indexOf(player), 1);
            if (player.Id === this.Game.CurrentPlayer.Id)
                $(".endTurnButton").first().prop("disabled", true);
            for (let piece of player.Pieces) {
                if ("Active" in piece) {
                    var activatable = piece as IActive;
                    activatable.Active = false;
                }
            }

            if (this.ActivePlayers.length === 0) {

                while (true) {
                    this.ActiveGroupIndex = (this.ActiveGroupIndex + 1) % this.TurnOrder.length;
                    if (this.TurnOrder[this.ActiveGroupIndex].map(p => p.Defeated).indexOf(false) != -1)
                        break;
                }

                for (let player of this.TurnOrder[this.ActiveGroupIndex]) {
                    this.ActivePlayers.push(player);
                }
                for (let player of this.Game.Players)
                    for (let piece of player.Pieces)
                        if ("Active" in piece) {
                            var activatable = piece as IActive;
                            activatable.Active = true;
                        }
                if (this.ActivePlayers.indexOf(this.Game.CurrentPlayer) != -1)
                    $(".endTurnButton").first().prop("disabled", false);
                this.RaiseStartTurnEvent();
                this.StartTurnModal.StartTurn(this.ActivePlayers);                
            }
        }

        RaiseStartTurnEvent() {
            for (let key in this.StartTurnEvent) {
                if (typeof this.StartTurnEvent[key] === "function")
                    this.StartTurnEvent[key](this.ActivePlayers);
            }
        }
    }
}