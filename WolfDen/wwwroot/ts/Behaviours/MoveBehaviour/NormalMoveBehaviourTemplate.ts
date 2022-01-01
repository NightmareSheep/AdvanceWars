/// <reference path="../../Unit.ts" />

namespace TurnBasedBoardGame {
    export class NormalMoveBehaviourTemplate implements IBehaviourTemplate {
        
        Class: string;
        Speed: number = 0;
        MovementType: MovementType = MovementType.Foot;

        AddBehaviour(unit: Unit): void {
            let self = this;
            let movebehaviour = new NormalMoveBehaviour();
            movebehaviour.Unit = unit;
            movebehaviour.Speed = self.Speed;
            movebehaviour.Game = unit.Game;
            movebehaviour.MovementType = self.MovementType;
            movebehaviour.Id = unit.Id + self.Class;
            movebehaviour.Initialize();            
            unit.Behaviours[movebehaviour.Id] = movebehaviour;
        }
    }
}