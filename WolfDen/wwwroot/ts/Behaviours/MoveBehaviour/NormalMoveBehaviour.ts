namespace TurnBasedBoardGame {
    export class NormalMoveBehaviour implements IExecuteMove, IMoveBehaviour, IDestroy {     
        Unit: Unit;
        Id: string;
        Speed: number;
        Game: Game;
        ClickEvent: any = {};
        MoveEvent: any = {};
        MovementType: number = 0;

        public RaiseClickEvent(tile: Tile, path: string[]) {
            var self = this;
            self.Game.ClearIndicators();

            for (let key in self.ClickEvent)
               self.ClickEvent[key](tile);

            if (self.Game.Indicators.length == 0)
                self.Game.GiveCommand(self.GetMoveCommand(tile));
            else if (self.Game.Indicators.length == 1 && self.Game.Indicators.some(indicator => indicator.CoversTile(tile)))
                self.Game.Indicators[0].Click();
            else if (!self.Game.Indicators.some(indicator => indicator.CoversTile(tile))) 
                self.Game.Indicators.push(new MoveIndicator(this, tile, function () {
                    Game.Instance.GiveCommand(self.GetMoveCommand(tile));
                }));
        }

        private TriggerMoveEvent() {
            for (let key in this.MoveEvent) {
                if (typeof this.MoveEvent[key] === "function")
                    this.MoveEvent[key]();
            }
        }

        constructor() {
        }

        DistanceFunction(tile: Tile, unit: Unit): number {
            var owner = unit.Owner;
            if (tile.Piece != null && (!tile.Piece.Owner || tile.Piece.Owner.Team != owner.Team))
                return 9999;

            if (tile.MovementCosts[MovementType[this.MovementType]])
                return tile.MovementCosts[MovementType[this.MovementType]];
            return tile.BaseMovementCost;
        };

        Initialize() {
            let self = this;
            this.Unit.ActiveClickEvent[this.Id] = function (e) {
                let reachableTileAndPaths = self.GetReachableTilesAndPaths();
                reachableTileAndPaths.reachableNodes.forEach(function (tile) {
                    if (tile.Id != self.Unit.Node.Id && tile.Piece == null)
                        Game.Instance.Indicators.push(new MoveIndicator(self, tile, function () { self.RaiseClickEvent(tile, reachableTileAndPaths.GetIdPath(tile)); }));
                });

                // If there is no indicator at our position, we create a cancel indicator.
                var position = self.Unit.Node as Tile;
                if (!self.Game.Indicators.some(indicator => indicator.CoversTile(position)))
                    Game.Instance.Indicators.push(new MoveIndicator(self, position, function () { self.Game.ClearIndicators(); }));
            };

            this.Unit.NonOwnerClickEvent[this.Id] = function () {
                let reachableTileAndPaths = self.GetReachableTilesAndPaths();
                for (let tile of reachableTileAndPaths.reachableNodes) 
                    Game.Instance.Indicators.push(new MoveIndicator(self, tile, function () { self.Game.ClearIndicators(); }));
            }
        }        

        GetReachableTilesAndPaths(): Graph.ReachableNodesAndPaths<Tile> {
            let self = this;
            let reachableTilesAndPaths = Graph.GetReachableNodesAndPaths<Tile>(this.Unit.Node as Tile, function (a, b) { return self.DistanceFunction(b as Tile, self.Unit); }, this.Speed);
            return reachableTilesAndPaths;
        }

        GetReachableTiles(): Tile[] {
            return this.GetReachableTilesAndPaths().reachableNodes;
        }

        GetMoveCommand(tile: Tile): any {
            let reachableTilesAndPaths = this.GetReachableTilesAndPaths();
            let path = reachableTilesAndPaths.GetIdPath(tile);
            return { "id": this.Unit.Id, "data": { "id": this.Id, "data": { "path": path } } };       
        }

        ExecuteMove(move: any): boolean {
            return this.ExecuteMoveAndCallback(move, null);
        }

        ExecuteMoveAndCallback(move: MoveCommand, callback: (moveEnd: () => void) => void) {
            let self = this;
            this.Unit.Node.Piece = null;
            let path: string[] = move.path;
            var destination = this.Game.Board.Nodes[path[path.length - 1]] as Tile;
            if (this.Unit.Node.Id != destination.Id)
                this.TriggerMoveEvent();

            // If unit moves to the right, make him face the right side.
            var tile = this.Unit.Node as Tile;
            if (tile.X < destination.X) {
                this.Unit.Animations.idle.anchor.set(1, 0);
                this.Unit.Animations.idle.scale.x = -Math.abs(this.Unit.Animations.idle.scale.x);
            }
            else {
                this.Unit.Animations.idle.anchor.set(0, 0);
                this.Unit.Animations.idle.scale.x = Math.abs(this.Unit.Animations.idle.scale.x);
            }

            this.Unit.Node = destination;
            destination.Piece = this.Unit;

            self.Unit.Container.visible = false;
            self.Game.MoveResolver.SetMoveInProgress();
            let moveAnimation = new PathAnimation(path, self.Unit, () => {
                self.Unit.Container.visible = true;
                self.Unit.Container.x = destination.X * terrainWidth;
                self.Unit.Container.y = destination.Y * terrainHeight;

                if (callback != null)
                    callback(() => { self.Game.MoveResolver.MoveCompleted(); });
                else
                    self.Game.MoveResolver.MoveCompleted();
            });
            return true;
        }

        Destroy(): void {
            delete this.Game.CommandEvent[this.Id + this.Unit.Id];
        }
    }
}