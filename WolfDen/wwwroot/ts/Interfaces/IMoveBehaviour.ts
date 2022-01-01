namespace TurnBasedBoardGame {
    export interface IMoveBehaviour extends IExecuteMove {
        GetReachableTiles(): Tile[];
        GetReachableTilesAndPaths(): Graph.ReachableNodesAndPaths<Tile>; 
        ExecuteMoveAndCallback(move: any, callback: (moveEnd: ()=> void) => void): boolean;
        GetMoveCommand(tile: Tile): any;
        ClickEvent: any;
        MoveEvent: any;
        DistanceFunction(tile: Tile, unit: Unit): number;
    }

    export function IsIMoveBehaviour(object: any): boolean {
        if (object["GetReachableTiles"]
            && object["ExecuteMoveAndCallback"]
            && object["GetMoveCommand"]
            && object["MoveEvent"]
            && object["DistanceFunction"]
        )
            return true;
        return false;
    }
}