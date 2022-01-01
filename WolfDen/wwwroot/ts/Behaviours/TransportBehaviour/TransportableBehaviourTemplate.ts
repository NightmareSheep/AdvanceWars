/// <reference path="../../Unit.ts" />

namespace TurnBasedBoardGame {
    export class TransportableBehaviourTemplate implements IBehaviourTemplate {

        Class: string;

        AddBehaviour(unit: Unit): void {
            let self = this;
            let Behaviour = new TransportableBehaviour();
            Object.assign(Behaviour, self);
            let moveBehaviour = unit.BehaviourList.find(IsIMoveBehaviour) as IMoveBehaviour;
            Behaviour.MoveBehaviour = moveBehaviour;
            Behaviour.Unit = unit;
            Behaviour.Game = unit.Game;
            Behaviour.Id = unit.Id + self.Class;
            Behaviour.Initialize();
            unit.Behaviours[Behaviour.Id] = Behaviour;
        }
    }
}