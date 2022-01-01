namespace TurnBasedBoardGame {
    export class Lobby {
        Id: string;
        Slots: Slot[];
        Connection: any;
        UserId: string;
        static Instance: Lobby;

        constructor() {
            Lobby.Instance = this;           
            this.UserId = $("#lobby").attr("userid");
        }        

        GetCurrentSlot(): Slot {
            let self = this;
            return this.Slots.find((s: Slot) => { return s.LobbyPlayer != null && s.LobbyPlayer.Id == self.UserId; });
        }

        GetCurrentPlayer(): LobbyPlayer {
            return this.GetCurrentSlot().LobbyPlayer;
        }

        Initialize() {
        }

        StateHasChanged() {
            this.Slots.forEach(function (slot: Slot) {
                if (slot.LobbyPlayer != null)
                    slot.LobbyPlayer.Ready = false;
            });
        }

        Join(lobbyPlayer: LobbyPlayer, index: number) {
            let player = Object.assign(new LobbyPlayer, lobbyPlayer);
            this.Slots[index].LobbyPlayer = player;
            this.StateHasChanged();            
        }

        Leave(connectionId: string) {
            let slot = this.Slots.find((s: Slot) => { return s.LobbyPlayer != null && s.LobbyPlayer.ConnectionId == connectionId; });
            // This is needed to change html
            slot.LobbyPlayer.Ready = false;
            slot.LobbyPlayer = null;
            this.StateHasChanged();
        }

        Ready(connectionId: string, ready: boolean) {
            this.Slots.find((s: Slot) => { return s.LobbyPlayer != null && s.LobbyPlayer.ConnectionId == connectionId; }).LobbyPlayer.Ready = true;
        }

        Switch(positionId: string, destinationId) {
            let positionSlot = this.Slots.find((s: Slot) => { return s.Id == positionId });
            let destinationSlot = this.Slots.find((s: Slot) => { return s.Id == destinationId });

            destinationSlot.LobbyPlayer = positionSlot.LobbyPlayer;
            positionSlot.LobbyPlayer = null;
            this.StateHasChanged();
        }
    }
}