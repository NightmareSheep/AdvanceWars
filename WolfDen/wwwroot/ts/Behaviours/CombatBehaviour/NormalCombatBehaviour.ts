namespace TurnBasedBoardGame {
    export class NormalCombatBehaviour implements IExecuteMove, ICombatBehaviour, IDestroy, IHealth {
        
        Game: Game;
        Unit: Unit;
        MaxHealth: number;
        CurrentHealth: number;
        DamageChart: DamageChart;
        UnitType: UnitType;
        PixiText: PIXI.Text;
        Id: string;
        MoveBehaviour: IMoveBehaviour;
        AttackNumber: number = 0;

        constructor() {
        }

        GetPreview(defender: ICombatBehaviour): Preview {
            var attackPreview = this.AttackPreview(defender);
            return new Preview(attackPreview, defender.DefendPreview(this, attackPreview));
        }

        Initialize() {
            let self: NormalCombatBehaviour = this;

            let style = new PIXI.TextStyle({
                fill: "white",
                fontFamily: "Times New Roman",
                strokeThickness: 5,
                fontSize: 15
            });
            let health = Math.ceil(this.CurrentHealth);
            let healthText = health < 100 ? health.toString() : "";
            this.PixiText = new PIXI.Text(healthText, style);
            this.PixiText.x = 0;
            this.PixiText.y = -5;
            this.Unit.Container.addChild(this.PixiText);

            
            this.Unit.ActiveClickEvent[this.Id] = function (e) {
                self.SpawnAttackIndicators();
                self.SpawnDamageIndicators();
            };
        }

        SpawnAttackIndicators() {
            let self = this;
            let reachableTiles = self.MoveBehaviour.GetReachableTiles();

            // We need to spawn attack indicators. 
            // For each attack indicator there are 1-4 neighbouring tiles from which the attack can come.
            // In this object we store a list of these 1-4 neighbouring tiles for each attack indicator.
            // We use these lists later to instantiate the attack indicators.
            let attackIndicators = {};

            // Loop over reachable tiles
            reachableTiles.forEach((tile: Tile) => {

                // Check all adjacent tiles for enemies

                if (tile.Piece == self.Unit || tile.Piece == null) {
                    tile.Neighbours.forEach((neighbour: Tile) => {
                        let enemyUnit = neighbour.Piece as Unit;



                        // Check if there is an enemy unit on the tile
                        if (neighbour.Piece != null && neighbour.Piece.Owner.Team != self.Unit.Owner.Team && self.IsValidTarget(enemyUnit)) {

                            // Check if this unit was encountered from a different tile already.
                            if (!attackIndicators[neighbour.X])
                                attackIndicators[neighbour.X] = {};
                            if (!attackIndicators[neighbour.X][neighbour.Y])
                                attackIndicators[neighbour.X][neighbour.Y] = { target: enemyUnit, from: [] };

                            // Add tile to list.
                            let list = attackIndicators[neighbour.X][neighbour.Y]["from"] as Tile[];
                            list.push(tile);
                        }
                    });
                }
            });

            // Instantiate attack indicators.
            for (let x in attackIndicators) {
                for (let y in attackIndicators[x]) {
                    self.Game.Indicators.push(new AttackIndicator(self.Game, true, self, attackIndicators[x][y]["from"] as Tile[], attackIndicators[x][y]["target"] as Unit));
                }
            }
        }

        SpawnDamageIndicators() {
            let self = this;
            let owner = self.Unit.Owner;
            this.Game.Players.forEach(ap => {
                if (ap.Team != owner.Team || (owner.Team === -1 && ap != owner)) {
                    ap.Pieces.forEach(p => {
                        let enemy = p as Unit;
                        let enemyTile = enemy.Node as Tile;
                        if (enemyTile == null) return;
                        let enemyCombatBehaviour = enemy.BehaviourList.find(IsICombatBehaviour) as ICombatBehaviour;
                        let preview = self.DamagePreview(enemyCombatBehaviour);
                        self.Game.Indicators.push(new DamageIndicator(preview, enemyTile.XCoord, enemyTile.YCoord));
                    });
                }
            });
        }


        GetAttackMultiplier(defenderUnitType: UnitType, callback: (attackMultiplier: number) => void) {
            let self = this;
            let owner = this.Unit.Owner;
            let co = owner.CO;
            this.AttackNumber++;
            let baseDamage = self.DamageChart.BaseDamage(self.UnitType, defenderUnitType);
            this.Game.GetRandom(this.Unit.Id + this.Id + this.AttackNumber, function (random) {
                let randomBonus = baseDamage === 0 ? 0 : random;
                let attackMultieplier = Math.floor((Math.floor(baseDamage * co.Attack / 100) + randomBonus) * self.CurrentHealth / self.MaxHealth);
                callback(Math.max(0, attackMultieplier));
            });            
        }

        DamagePreview(defender: ICombatBehaviour): number {
            let self = this;
            let owner = this.Unit.Owner;
            let co = owner.CO;
            let baseDamage = self.DamageChart.BaseDamage(self.UnitType, defender.UnitType);
            let damage = (baseDamage * co.Attack / 100) * self.CurrentHealth / self.MaxHealth;
            let preview = Math.floor(damage * defender.GetDefenceMultiplier());
            return preview;
        }

        AttackPreview(defender: ICombatBehaviour): number {
            return defender.CurrentHealth - this.DamagePreview(defender);
        }

        DefendPreview(attacker: ICombatBehaviour, attackPreview: number): number {
            let self = this;
            let owner = this.Unit.Owner;
            let co = owner.CO;
            let baseDamage = self.DamageChart.BaseDamage(self.UnitType, attacker.UnitType);
            let damage = (baseDamage * co.Attack / 100) * attackPreview / self.MaxHealth;
            let preview = attacker.CurrentHealth - Math.floor(damage * attacker.GetDefenceMultiplier());
            return preview;
        }

        GetDefenceMultiplier(): number {
            let coDefence = 100;
            if (this.Unit.Owner)
                coDefence = this.Unit.Owner.CO.Defence;

            let tile = this.Unit.Node as Tile;
            if (tile == null || tile == undefined) throw { "message": "Tile of this unit is null when loading damage indicators", "Unit": this.Unit }
            return (200 - (coDefence + Math.floor(tile.Stars * 10 * this.CurrentHealth / this.MaxHealth))) / 100;
        }        

        SetCurrentHealth(value: number) {
            var self = this;
            self.CurrentHealth = value;
            let health = Math.ceil(this.CurrentHealth);
            let healthText = health < 100 ? health.toString() : "";
            self.PixiText.text = healthText;
            if (self.CurrentHealth <= 0)
                self.Unit.Destroy();
        }

        ExecuteMove(move: any): boolean {
            let self = this;
            let enemy = this.Game.Pieces[move.target] as Unit;
            this.MoveBehaviour.ExecuteMoveAndCallback(move.moveCommand, function (moveEnd) {
                let attackAnimation = new AttackAnimation(self.Unit, self.Unit.Node as Tile, enemy, enemy.Node as Tile, () => { moveEnd(); });
                self.AttackUnit(enemy);                
            });
            return true;
        }

        GetAttackCommand(from: Tile, target: Unit) {
            let moveCommand = this.MoveBehaviour.GetMoveCommand(from);
            return { "id": this.Unit.Id, "data": { "id": this.Id, "data": { "moveCommand": moveCommand.data.data, "target": target.Id } } };
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
            this.GetAttackMultiplier(enemyCombatBehaviour.UnitType, function (attackMultiplier) { enemyCombatBehaviour.DefendAndCounter(self, attackMultiplier); });
        }

        DefendAndCounter(damageSource: ICombatBehaviour, attackMultiplier: number) {
            this.SetCurrentHealth(this.CurrentHealth - Math.floor(attackMultiplier * this.GetDefenceMultiplier()));
            this.GetAttackMultiplier(damageSource.UnitType, function (attackMultiplier) { damageSource.Defend(this, attackMultiplier); });            
        }

        Defend(damageSource: ICombatBehaviour, attackMultiplier: number) {
            this.SetCurrentHealth(this.CurrentHealth - Math.floor(attackMultiplier * this.GetDefenceMultiplier()));
        }

        IsValidTarget(unit: Unit): boolean {
            let enemyCombatBehaviour = unit.BehaviourList.find(IsICombatBehaviour) as ICombatBehaviour;
            return ((this.DamageChart.BaseDamage(this.UnitType, enemyCombatBehaviour.UnitType)) != 0);
        }

        Destroy(): void {
            delete this.Game.CommandEvent[this.Id + this.Unit.Id];
        }
    }
}