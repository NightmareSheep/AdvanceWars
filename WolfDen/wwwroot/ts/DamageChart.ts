namespace TurnBasedBoardGame {
    export class DamageChart {
        DmgChart: any;

        BaseDamage(attacker: UnitType, defender: UnitType): number {
            if (this.DmgChart[UnitType[attacker]] && this.DmgChart[UnitType[attacker]][UnitType[defender]])
                return this.DmgChart[UnitType[attacker]][UnitType[defender]];
            return 0;
        }

    }
}