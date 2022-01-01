namespace TurnBasedBoardGame {
    export class RepairBehaviour implements IDestroy {
        Unit: Unit;
        Id: string;
        FullRepairCost: number;
        UnitHealth: ICombatBehaviour;
        Game: Game;
        Animation: TextDisappearAnimation;
        RepairCoordinator: RepairCoordinator;

        Initialize() {
            let self = this;
            this.RepairCoordinator = this.Unit.Owner.RepairCoordinator;
            this.RepairCoordinator.CalcRepairCostsEvent[this.Unit.Id + " " + this.Id] = () => { self.CalcRepairCosts(); };
            this.RepairCoordinator.ExecuteRepairsEvent[this.Unit.Id + " " + this.Id] = () => { self.RepairUnit(); };
        }

        CalcRepairCosts() {
            let repairCosts = this.GetRepairCosts();
            this.RepairCoordinator.TurnRepairCosts += repairCosts.goldNeeded;
        }

        GetRepairCosts() {
            if (this.Unit.Node && IsBuilding(this.Unit.Node) && (this.Unit.Node as Building).Owner == this.Unit.Owner && this.UnitHealth.CurrentHealth < this.UnitHealth.MaxHealth) {

                // Check how much to repair.
                let missingHealth = this.UnitHealth.MaxHealth - this.UnitHealth.CurrentHealth;

                // Max repair is 20%.
                let percentageToRepair = Math.floor(Math.min(20, missingHealth * 100 / this.UnitHealth.MaxHealth));

                // Check if owner has enough gold.
                let goldNeeded = Math.floor(percentageToRepair * this.FullRepairCost / 100);
                return { goldNeeded: goldNeeded, percentageToRepair: percentageToRepair };
            }
            return { goldNeeded: 0, percentageToRepair: 0 };
        }

        RepairUnit() {
            let awOwner = this.Unit.Owner;
            let repairCosts = this.GetRepairCosts();

            if (repairCosts.goldNeeded == 0 && repairCosts.percentageToRepair == 0)
                return;

            // Substract gold and repair the unit.
            awOwner.Gold -= repairCosts.goldNeeded;
            this.UnitHealth.SetCurrentHealth(this.UnitHealth.CurrentHealth + Math.floor(this.UnitHealth.MaxHealth * repairCosts.percentageToRepair / 100));

            // Update HUD
            var tile = this.Unit.Node as Tile;
            var textStyle = PixiTextStyle1();
            textStyle.fill = "#46eb34";
            this.Animation = new TextDisappearAnimation("+" + repairCosts.percentageToRepair.toString(), textStyle, tile.X * terrainWidth + 20, tile.Y * terrainHeight - 5, mainContainer);
        }


        Destroy(): void {
            delete this.RepairCoordinator.CalcRepairCostsEvent[this.Unit.Id + " " + this.Id];
            delete this.RepairCoordinator.ExecuteRepairsEvent[this.Unit.Id + " " + this.Id];
        }
}
}