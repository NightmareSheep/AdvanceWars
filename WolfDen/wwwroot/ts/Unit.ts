/// <reference path="Piece.ts" />

namespace TurnBasedBoardGame {
    export class Unit extends Piece implements IActive {
        ActiveClickEvent: any = {};
        Container: PIXI.Container = new PIXI.Container();
        Animations: any = {};
        Resources: any;
        private _active: boolean = false;
        NonOwnerClickEvent: any = {};

        get Active() {
            return this._active;
        }

        set Active(value: boolean) {
            this._active = value;
            let unitFilters = [];
            if (this.Container.filters !== null)
                unitFilters = this.Container.filters;
            if (this.Owner && !value && unitFilters.indexOf(filters.Inactive) === -1)
                unitFilters.push(filters.Inactive);
            else if (value && unitFilters.indexOf(filters.Inactive) !== -1)
                unitFilters.splice(this.Container.filters.indexOf(filters.Inactive), 1);
            this.Container.filters = unitFilters;
        }

        constructor() {
            super();
        }

        GetResource(name: string, path: string): any {
            let subPaths = path.split(".");
            let resource = gameResources;
            for (let subPath of subPaths) {
                resource = resource[subPath]
            }
            return resource;
        }

        Initialize() {
            let self = this;

            for (let key in this.Resources) {
                self.Animations[key] = self.GetResource(key, self.Resources[key])();
            }

            Object.keys(self.Animations).forEach(function (key) { self.Animations[key].visible = false; })

            self.Animations.idle.visible = true;
            self.Animations.idle.interactive = true;
            self.Animations.idle.buttonMode = true;
            if (self.Container.filters === null)
                self.Container.filters = [];
            let unitFilters = self.Container.filters;
            var advanceWarsOwner = self.Owner;
            if (advanceWarsOwner !== null && filters[advanceWarsOwner.Color + "Team"])
                unitFilters.push(filters[advanceWarsOwner.Color + "Team"]);
            self.Container.filters = unitFilters;            

            Object.keys(self.Animations).forEach(function (key) {
                self.Container.addChildAt(self.Animations[key],0);
            });
            

            if (this.Node === null)
                return;

            self.Game.UnitContainer.addChild(self.Container);
            let tile = this.Node as Tile;
            let x = tile.X ? tile.X : 0;
            let y = tile.Y ? tile.Y : 0;
            self.Container.x = x * self.Animations.idle.width;
            self.Container.y = y * self.Animations.idle.height;

            self.Animations.idle.on("pointertap", function (e) {

                if (self.Owner != self.Game.CurrentPlayer)
                    for (let funct in self.NonOwnerClickEvent) { self.NonOwnerClickEvent[funct](e); }

                if (self.Owner != self.Game.CurrentPlayer || !self.Game.TurnResolver.IsActive(self.Owner) || !self.Active)
                    return;

                self.Game.ClearIndicators();
                for (let key in self.ActiveClickEvent) {
                    if (typeof self.ActiveClickEvent[key] === "function")
                        self.ActiveClickEvent[key](e);
                }
            });

            self.Game.TurnResolver.StartTurnEvent[self.Id] = function (activePlayers) {
                if (unitFilters.indexOf(filters.Inactive) !== -1)
                    unitFilters.splice(self.Container.filters.indexOf(filters.Inactive), 1);
            }
        }

        Destroy() {
            super.Destroy();
            this.Game.UnitContainer.removeChild(this.Container);
            let self = this;
            for (let key in this.Behaviours) {
                if (typeof self.Behaviours[key] === "object" && "Destroy" in self.Behaviours[key]) {
                    (self.Behaviours[key] as IDestroy).Destroy();
                }
            }
            delete self.Game.TurnResolver[self.Id];
        }

        ExecuteMove(move: any) {
            if (this.Active && super.ExecuteMove(move)) {
                this.Active = false;
                return true;
            }
            return false;
        }
    }
}