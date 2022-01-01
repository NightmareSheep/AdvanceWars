/// <reference path="../../Unit.ts" />

namespace TurnBasedBoardGame {
    export class RangedCombatBehaviourTemplate extends NormalCombatBehaviourTemplate {
        MinRange: number;
        MaxRange: number;

        AddBehaviour(unit: Unit): void {
            let self = this;
            let combatBehaviour = new RangedCombatBehaviour();
            Object.assign(combatBehaviour, self);
            let moveBehaviour = null;
            for (let key in unit.Behaviours)
                if (IsIMoveBehaviour(unit.Behaviours[key]))
                    moveBehaviour = unit.Behaviours[key];
            combatBehaviour.MoveBehaviour = moveBehaviour;
            combatBehaviour.Unit = unit;
            combatBehaviour.Game = unit.Game;
            combatBehaviour.CurrentHealth = self.MaxHealth;
            combatBehaviour.Id = unit.Id + self.Class;
            combatBehaviour.Initialize();
            unit.Behaviours[combatBehaviour.Id] = combatBehaviour;
        }
    }
}