/// <reference path="../../Unit.ts" />
/// <reference path="NormalCombatBehaviourTemplate.ts" />

namespace TurnBasedBoardGame {
    export class CannotAttackCombatBehaviourTemplate extends NormalCombatBehaviourTemplate {

        AddBehaviour(unit: Unit): void {
            let self = this;
            let combatBehaviour = new CannotAttackCombatBehaviour();
            Object.assign(combatBehaviour, self);
            combatBehaviour.Unit = unit;
            combatBehaviour.Game = unit.Game;
            combatBehaviour.CurrentHealth = self.MaxHealth;
            combatBehaviour.Id = unit.Id + self.Class;
            combatBehaviour.Initialize();
            
            unit.Behaviours[combatBehaviour.Id] = combatBehaviour;
        }
    }
}