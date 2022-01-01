namespace TurnBasedBoardGame {
    export class TransportBehaviour implements IExecuteMove, IDestroy, ITransportBehaviour {      
        Unit: Unit;
        Game: Game;
        TransportedUnit: Unit;
        Id: string;
        MoveBehaviour: IMoveBehaviour;
        UnloadIndicator: PIXI.Sprite;

        Initialize() {
            let self = this;
            self.UnloadIndicator = gameResources.indicators.unloadIndicator();
            self.UnloadIndicator.visible = self.TransportedUnit ? true : false;
            self.Unit.Container.addChild(self.UnloadIndicator);

            if (this.MoveBehaviour)
                this.MoveBehaviour.ClickEvent[this.Id] = function (tile: Tile) {
                    if (self.TransportedUnit)
                        self.SpawnTransportIndicatorsAroundTile(tile);
                };
        }

        ExecuteMove(move: TransportBehaviourMove): boolean {
            let self = this;
            let tile = this.Game.Board.Nodes[move.nodeId] as Tile;
            this.MoveBehaviour.ExecuteMoveAndCallback(move.moveCommand, function (moveEnd) {
                self.UnloadUnit(tile);
                moveEnd();
            });
            return true;            
        }

        Destroy(): void {
            this.Unit.Container.removeChild(this.UnloadIndicator);
            this.UnloadIndicator.destroy();
        }        

        SpawnTransportIndicatorsAroundTile(tile: Tile) {
            let self = this;
            if (!self.TransportedUnit) return;
            let transportedUnitMoveBehaviour = self.TransportedUnit.BehaviourList.find(IsIMoveBehaviour) as IMoveBehaviour;
            if (!transportedUnitMoveBehaviour) return;

            tile.Neighbours.forEach(function (neighbourNode) {
                let neighbour = neighbourNode as Tile;
                if (neighbour.Piece == null && transportedUnitMoveBehaviour.DistanceFunction(neighbour, self.TransportedUnit) < 10)
                    self.Game.Indicators.push(new UnloadTransportIndicator(self, neighbour, tile));
            })
        }

        LoadUnit(Unit: Unit) {
            this.TransportedUnit = Unit;
            Unit.Node.Piece = null;
            Unit.Node = null;
            Unit.Container.visible = false;
            this.UnloadIndicator.visible = true;
            return true;
        }

        UnloadUnit(tile: Tile) {
            tile.Piece = this.TransportedUnit;
            this.TransportedUnit.Container.x = tile.X * terrainWidth;
            this.TransportedUnit.Container.y = tile.Y * terrainHeight;
            this.TransportedUnit.Active = false;
            this.TransportedUnit.Node = tile;
            this.TransportedUnit.Container.visible = true;
            this.TransportedUnit = null;
            this.UnloadIndicator.visible = false;
            return true;
        }
    }
}