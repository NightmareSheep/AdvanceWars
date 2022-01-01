/// <reference path="../../Unit.ts" />

namespace TurnBasedBoardGame {
    export class RepairBehaviourTemplate implements IBehaviourTemplate {
        Class: string;

        AddBehaviour(unit: Unit): void {
            let self = this;
            let repairBehaviour = new RepairBehaviour();
            Object.assign(repairBehaviour, self);
            let unitHealth = null;
            for (let key in unit.Behaviours)
                if (IsICombatBehaviour(unit.Behaviours[key]))
                    unitHealth = unit.Behaviours[key] as IHealth;
            repairBehaviour.UnitHealth = unitHealth;
            repairBehaviour.Unit = unit;
            repairBehaviour.Game = unit.Game;
            repairBehaviour.Id = unit.Id + self.Class;
            repairBehaviour.Initialize();
            unit.Behaviours[repairBehaviour.Id] = repairBehaviour;
        }
}
}