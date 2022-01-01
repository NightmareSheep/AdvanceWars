namespace TurnBasedBoardGame {
    export interface ITransportBehaviour {
        LoadUnit(Unit: Unit): boolean;
        TransportedUnit: Unit;
        Unit: Unit;
        Id: string;
    }

    export function IsITransportBehaviour(object: any): boolean {
        if (object["LoadUnit"]
        )
            return true;
        return false;
    }
} 