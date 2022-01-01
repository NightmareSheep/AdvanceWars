/// <reference path="../../Unit.ts" />

namespace TurnBasedBoardGame {
    export class NormalCaptureBehaviourTemplate implements IBehaviourTemplate {
        BaseCaptureStrength: number = 0;
        CaptureCompletion: number = 0;
        Class: string;

        AddBehaviour(unit: Unit): void {
            let self = this;
            let captureBehaviour = new NormalCaptureBehaviour();
            Object.assign(captureBehaviour, self);
            let moveBehaviour = null;
            for (let key in unit.Behaviours)
                if (IsIMoveBehaviour(unit.Behaviours[key]))
                    moveBehaviour = unit.Behaviours[key];
            let combatBehaviour = null;
            for (let key in unit.Behaviours)
                if (IsIHealth(unit.Behaviours[key]))
                    combatBehaviour = unit.Behaviours[key];
            captureBehaviour.MoveBehaviour = moveBehaviour;
            captureBehaviour.HealthStats = combatBehaviour;
            captureBehaviour.Unit = unit;
            captureBehaviour.Game = unit.Game;  
            captureBehaviour.Id = unit.Id + self.Class;
            captureBehaviour.Initialize();
            
            unit.Behaviours[captureBehaviour.Id] = captureBehaviour;
        }
    }
}