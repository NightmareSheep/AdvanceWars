namespace TurnBasedBoardGame {
    export enum TransportBehaviourMoveType { Load, Unload }
    export class TransportBehaviourMove { constructor(public type: TransportBehaviourMoveType, public nodeId: string, public unitId: string, public moveCommand: any) { } }
}