/// <reference path="../Piece.ts" />

namespace TurnBasedBoardGame {
    export class WinCondition extends Piece {
        HQs: HQ[];
        RemainingPlayers: AdvanceWarsPlayer[];

        constructor() {
            super();
        }

        Initialize() {
            let self = this;
            for (let hq of self.HQs) {
                hq.captureEvent[self.Id] = (previousOwner: AdvanceWarsPlayer, futureOwner: AdvanceWarsPlayer) => {
                    self.RemainingPlayers.splice(self.RemainingPlayers.indexOf(previousOwner), 1);
                    let remainingTeams = [];
                    for (let player of self.RemainingPlayers)
                        if (remainingTeams.indexOf(player.Team) == -1)
                            remainingTeams.push(player.Team);
                    if (remainingTeams.length == 1) {
                        $('#gameOverModal').modal();
                    }
                    delete hq.captureEvent[self.Id];
                }
            }
        }
    }
}