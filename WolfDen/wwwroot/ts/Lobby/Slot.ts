namespace TurnBasedBoardGame {
    export class Slot {
        Id: string;
        Team: number;
        SlotOptions: any;
        Lobby: Lobby;
        _lobbyPlayer: LobbyPlayer;

        set LobbyPlayer(value) {
            this._lobbyPlayer = value;
            if (value != null) {
                $("#slot" + this.Index + " .slotName h3").html(value.Name);
            }
            else {
                $("#slot" + this.Index + " .slotName h3").html("--Empty--");
            }
        }

        get LobbyPlayer(): LobbyPlayer{

            return this._lobbyPlayer;
        }

        get Index(): number {
            return Lobby.Instance.Slots.findIndex(slot => slot.Id == this.Id) ?? -1;
        }

        get IsCurrentPlayer(): boolean {
            return Lobby.Instance.GetCurrentSlot() === this;
        }

        constructor() {
        }

        Initialize() {
            var self = this;
            if (this.IsCurrentPlayer) {
                $("#positionNumber b").html(self.Team + "#");
            }
            $("#slot" + self.Index + " .slotTeam").html(self.Team + "#");
        }
    }
}