namespace TurnBasedBoardGame {
    export interface IIndicator{
        CoversTile(tile: Tile): boolean;
        Click(): void;
        Clear(): void;
    }

    export function IsIIndicator(object: any): boolean {
        if (object["CoversTile"] && object["Clear"])
            return true;
        return false;
    }
}