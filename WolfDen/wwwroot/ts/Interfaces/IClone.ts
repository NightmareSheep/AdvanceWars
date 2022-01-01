namespace TurnBasedBoardGame {
    export interface IClone {
        Id: string;
        Clone(references: any, game: Game): Object;
    }
}