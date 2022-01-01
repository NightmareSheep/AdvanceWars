/// <reference path="Tile.ts" />

namespace TurnBasedBoardGame {
    export class Building extends Tile {
        Income: number;
        private _owner: AdvanceWarsPlayer;
        TurnResolver: TurnResolver;
        captureEvent: any = {};

        get Owner() {
            return this._owner;
        }

        set Owner(value: AdvanceWarsPlayer) {
            this._owner = value;
            if (value != null)
                this.Container.filters = [filters[value.Color + "Team"]];
            else
                this.Container.filters = [filters["Neutral"]];
            // TODO: add grey colors if owner is null
        }

        constructor() {
            super();
        }

        Initialize() {
            super.Initialize();
            var self = this;
            self.TurnResolver.IncomeCoordinator.IncomeEvent[self.Id] = function (players: AdvanceWarsPlayer[]) {
                if (self.Owner != null && players.indexOf(self.Owner) != -1)
                    self.Owner.Gold += self.Income;
            }
        }

        TriggerCaptureEvent(previousOwner: AdvanceWarsPlayer, newOwner: AdvanceWarsPlayer) {
            for (let key in this.captureEvent) {
                let captureFunction = this.captureEvent[key];
                captureFunction(previousOwner, newOwner);
            }
        }
    }

    export function IsBuilding(object: any): boolean {
        if (
            object["Income"]
            && object["Owner"]
            && object["captureEvent"]
        )
            return true;
        return false;
    }
}