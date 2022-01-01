/// <reference path="../../Unit.ts" />

namespace TurnBasedBoardGame {
    export class NormalCombatBehaviourTemplate implements IBehaviourTemplate {
        
        Class: string;
        MaxHealth: number = 0;
        UnitType: UnitType = UnitType.Infantry;
        DamageChart: DamageChart;

        AddBehaviour(unit: Unit): void {
            let self = this;
            let combatBehaviour = new NormalCombatBehaviour();
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