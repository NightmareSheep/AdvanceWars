namespace TurnBasedBoardGame {
    export class Node implements Graph.INode {
        Id: string;
        Neighbours: Node[];
        Piece: Piece;

        constructor() {

        }
    }
}