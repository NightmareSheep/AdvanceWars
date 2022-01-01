/// <reference path="Tile.ts" />

namespace TurnBasedBoardGame {
    export class HQ extends Building {
        Game: Game;

        constructor() {
            super();
        }


        Initialize() {
            super.Initialize();
            var self = this;

            this.captureEvent[this.Id] = (previousOwner: AdvanceWarsPlayer, futureOwner: AdvanceWarsPlayer) => {
                previousOwner.Defeated = true;
                for (let i = previousOwner.Pieces.length - 1; i >= 0; i--)
                    previousOwner.Pieces[i].Destroy();
                for (let key in self.Game.Board.Nodes) {
                    let building = self.Game.Board.Nodes[key] as Building;
                    if (building && building.Owner === previousOwner)
                        building.Owner = null;
                }
                self.Container.removeChild(self.Sprite);
                self.Sprite = gameResources.terrain.City();
                this.Container.addChild(this.Sprite);
                delete self.captureEvent[self.Id];
            }
        }
    }
}