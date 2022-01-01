/// <reference path="../Lobby.ts" />

namespace TurnBasedBoardGame {
    export class AdvanceWarsLobby extends Lobby {
        AdvanceWarsSlots: AdvanceWarsSlot[];

        constructor() {
            super();
            let self = this;
            $("#ready-button").click(function () {
                self.Connection.invoke("Ready", self.Id, true);
            });
        }
    }
}