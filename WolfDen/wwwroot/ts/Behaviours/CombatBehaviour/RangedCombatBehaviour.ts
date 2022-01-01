/// <reference path="NormalCombatBehaviour.ts" />

namespace TurnBasedBoardGame {
    export class RangedCombatBehaviour extends NormalCombatBehaviour {
        MinRange: number;
        MaxRange: number;

        Initialize() {
            super.Initialize();
            if (this.MoveBehaviour)
                delete this.MoveBehaviour.ClickEvent[this.Id];
        }

        SpawnAttackIndicators() {
            let self = this;
            let tile = self.Unit.Node as Tile;
            var nodesInRange = Graph.BreadFirstSearch(tile, this.MaxRange);
            nodesInRange.forEach((node: Node) => {
                let tileInRange = node as Tile;
                var range = Math.abs(tile.X - tileInRange.X) + Math.abs(tile.Y - tileInRange.Y);
                if (range >= self.MinRange && tileInRange.Piece != null && tileInRange.Piece.Owner != self.Unit.Owner)
                    self.Game.Indicators.push(new AttackIndicator(self.Game, true, self, [tile], tileInRange.Piece as Unit));
            });
        }

        AttackUnit(unit: Unit): void {
            let self = this;
            let enemyCombatBehaviour: ICombatBehaviour;
            for (let key in unit.Behaviours) {
                if (typeof unit.Behaviours[key] === "object" && "DefendAndCounter" in unit.Behaviours[key]) {
                    enemyCombatBehaviour = unit.Behaviours[key] as ICombatBehaviour;
                    break;
                }
            }
            this.GetAttackMultiplier(enemyCombatBehaviour.UnitType, function (attackMultiplier) { enemyCombatBehaviour.Defend(self, attackMultiplier); });
        }

        DefendAndCounter(damageSource: ICombatBehaviour, attackMultiplier: number) {
            this.Defend(damageSource, attackMultiplier);
        }

        GetPreview(defender: ICombatBehaviour): Preview {
            var attackPreview = this.AttackPreview(defender);
            return new Preview(attackPreview, this.CurrentHealth);
        }

        DefendPreview(attacker: ICombatBehaviour, attackPreview: number): number {
            return attacker.CurrentHealth;
        }
    }
}