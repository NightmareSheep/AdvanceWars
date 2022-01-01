namespace TurnBasedBoardGame {
    export class MoveResolver {
        
        Game: Game;
        CommandCompletedEvent: any = {};
        MoveInProgress: boolean = false;
        MoveQueue: any[] = [];
        SanityQueue: SanityResult[] = [];
        CurrentSanity: SanityResult;

        constructor() {

        }

        SetMoveInProgress() {
            this.MoveInProgress = true;
        }

        MoveCompleted() {
            if (!SanityCheck(this.Game, this.CurrentSanity)) {
                this.Game.Hub.invoke("sanityCheckFailed");
            }

            this.MoveInProgress = false;
            if (this.MoveQueue.length > 0) {
                let move = this.MoveQueue.shift();
                let sanityResult = this.SanityQueue.shift();
                this.ExecuteMove(move, sanityResult);
            }
        }

        ExecuteMove(move: any, sanityResult: SanityResult): boolean {

            // Check if a move is already in progress
            if (this.MoveInProgress) {
                this.MoveQueue.push(move);
                this.SanityQueue.push(sanityResult);
                return false;
            }

            console.log("Execute move" + sanityResult.MoveNumber + ": " + JSON.stringify(move));
            this.CurrentSanity = sanityResult;
            let succes = false;

            //  Check if move is for a piece
            if (this.Game.Pieces[move.id]) {
                let piece = this.Game.Pieces[move.id] as Piece;
                succes = piece.ExecuteMove(move.data);
            }

            // Check if move is for a tile
            if (this.Game.Board.Nodes[move.id]) {
                let node = this.Game.Board.Nodes[move.id] as IExecuteMove;
                succes = node.ExecuteMove(move.data);
            }

            // Call command completed event if move was succesfull
            if (succes) {
                for (let key in this.CommandCompletedEvent) {
                    if (typeof this.CommandCompletedEvent[key] === "function")
                        this.CommandCompletedEvent[key]();
                }
                if (!this.MoveInProgress)
                    this.MoveCompleted();
            }

            return false;
        }
    }
}