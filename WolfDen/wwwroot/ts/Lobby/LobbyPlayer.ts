namespace TurnBasedBoardGame {
    export class LobbyPlayer {
        ConnectionId: string;
        Id: string;
        Name: string;

        _ready: boolean;
        get Ready(): boolean {
            return this._ready;
        }
        set Ready(value) {
            let slot = Lobby.Instance.Slots.find(s => s.LobbyPlayer == this);

            let element = $("#slot" + slot?.Index + " .slotStatus h3");
            let button = $("#ready-button");
            this._ready = value;
            if (value) {
                element.html("Ready");
                element.addClass("text-success");
                element.removeClass("text-danger");

                if (this == Lobby.Instance.GetCurrentPlayer()) {
                    button.html("Ready!");
                    button.addClass("btn-success");
                    button.removeClass("btn-warning");
                }
            }
            else {

                element.html("Not ready");
                element.addClass("text-danger");
                element.removeClass("text-success");
                if (this == Lobby.Instance.GetCurrentPlayer()) {
                    button.html("Click here to ready up!");
                    button.addClass("btn-warning");
                    button.removeClass("btn-success");
                }
                
            }
        }

        constructor() {
        }
    }
}