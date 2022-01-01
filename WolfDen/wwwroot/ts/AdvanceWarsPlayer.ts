namespace TurnBasedBoardGame {
    export class AdvanceWarsPlayer{
        Pieces: Piece[];
        Id: string;
        Name: string;
        Color: string;
        Team: number;
        Defeated: boolean;
        _gold: number = 0;
        CO: CO;
        Listings: any;
        RepairCoordinator: RepairCoordinator;

        get Gold(): number {
            return this._gold;
        }

        set Gold(value: number) {
            this._gold = value;
        }
        
    }
}