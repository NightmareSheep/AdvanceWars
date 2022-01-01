namespace TurnBasedBoardGame {
    export class TransportableBehaviour implements IExecuteMove, IDestroy {
        Unit: Unit;
        MoveBehaviour: IMoveBehaviour;
        Id: string;
        Game: Game;

        Initialize() {
            let self = this;
            this.Unit.ActiveClickEvent[this.Id] = function (e) {
                var reachableTiles = self.MoveBehaviour.GetReachableTilesAndPaths();
                reachableTiles.reachableNodes.forEach((tile: Tile) => {
                    if (tile.Piece != null && tile.Piece.Owner == self.Unit.Owner) {
                        let unit = tile.Piece as Unit;
                        let transportBehaviour = unit.BehaviourList.find(IsITransportBehaviour) as ITransportBehaviour;
                        if (transportBehaviour && !transportBehaviour.TransportedUnit) {
                            self.Game.Indicators.push(new LoadTransportIndicator(self.Unit, self, transportBehaviour, tile, reachableTiles.GetIdPath(tile)));
                        }
                    }

                });
            };
        }


        Destroy(): void {
        }

        ExecuteMove(move: any): boolean {
            var self = this;
            let transportBehaviourUnit = Game.Instance.Pieces[move.unitId] as Unit;
            let transportBehaviour = transportBehaviourUnit.BehaviourList.find(IsITransportBehaviour) as ITransportBehaviour;
            let animation = new PathAnimation(move.path, self.Unit, null);
            return transportBehaviour.LoadUnit(self.Unit);
              
        }
    }
}