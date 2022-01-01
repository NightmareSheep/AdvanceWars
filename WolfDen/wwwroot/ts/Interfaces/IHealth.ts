namespace TurnBasedBoardGame {
    export interface IHealth {
        MaxHealth: number;
        CurrentHealth: number;
    }

    export function IsIHealth(object: any): boolean {
        if (object["MaxHealth"] && object["CurrentHealth"])
            return true;
        return false;
    }
}