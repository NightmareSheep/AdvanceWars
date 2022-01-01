/// <reference path="RangedCombatBehaviour.ts" />

namespace TurnBasedBoardGame {
    export class CannotAttackCombatBehaviour extends RangedCombatBehaviour {
        Initialize() {
            super.Initialize();
            delete this.Unit.ActiveClickEvent[this.Id];
        }
    }
}