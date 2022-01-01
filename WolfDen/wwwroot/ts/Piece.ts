namespace TurnBasedBoardGame {
    export class Piece implements IExecuteMove {

        Node: Node;
        public Behaviours: any = {};
        Id: string;
        Owner: AdvanceWarsPlayer;
        Game: Game;

        get BehaviourList(): {}[] {
            return Object.values(this.Behaviours);;
        }

        constructor() {

        }

        ExecuteMove(move: any): boolean {
            var behaviour = this.Behaviours[move.id] as IExecuteMove;
            return behaviour.ExecuteMove(move.data);
        }

        Destroy() {
            delete this.Game.Pieces[this.Id];
            this.Owner.Pieces.splice(this.Owner.Pieces.indexOf(this), 1);
            this.Node.Piece = null;
        }
    }
}