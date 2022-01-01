namespace TurnBasedBoardGame {
    export interface ICombatBehaviour extends IExecuteMove {
        Unit: Unit;
        UnitType: UnitType;
        IsValidTarget(unit: Unit): boolean;
        AttackUnit(unit: Unit): void;
        DefendAndCounter(damageSource: ICombatBehaviour, attackMultiplier: number);
        Defend(damageSource: ICombatBehaviour, attackMultiplier: number);
        GetAttackCommand(from: Tile, target: Unit): any;
        CurrentHealth: number;
        MaxHealth: number;
        GetDefenceMultiplier(): number;
        GetPreview(defender: ICombatBehaviour): Preview;
        DefendPreview(attacker: ICombatBehaviour, attackPreview: number): number;
        SetCurrentHealth(value: number): void;
    }

    export function IsICombatBehaviour(object: any): boolean {
        if (
            object["IsValidTarget"]
            && object["AttackUnit"]
            && object["DefendAndCounter"]
            && object["Defend"]
            && object["DefendAndCounter"]
            && object["GetAttackCommand"]
            && object["CurrentHealth"]
            && object["GetDefenceMultiplier"]
            && object["GetPreview"]
        )
            return true;
        return false;
    }
}