namespace TurnBasedBoardGame {
    export class AttackAnimation {
        private AttackerContainer: PIXI.Container;
        private DefenderContainer: PIXI.Container;

        constructor(attacker: Unit, attackerTile: Tile, defender: Unit, defenderTile: Tile, callback: () => void) {
            let self = this;
            self.AttackerContainer = new PIXI.Container();
            self.DefenderContainer = new PIXI.Container();
            attacker.Container.visible = false;
            defender.Container.visible = false;
            self.AttackerContainer.x = attackerTile.XCoord;
            self.AttackerContainer.y = attackerTile.YCoord;
            self.DefenderContainer.x = defenderTile.XCoord;
            self.DefenderContainer.y = defenderTile.YCoord;
            let attackerAnimation = attacker.Animations["idle"] as PIXI.extras.AnimatedSprite;
            let defenderAnimation = defender.Animations["idle"] as PIXI.extras.AnimatedSprite;
            attackerAnimation.visible = true;
            defenderAnimation.visible = true;
            let attackerOwner = attacker.Owner;
            let defenderOwner = defender.Owner;
            self.AttackerContainer.filters = [filters[attackerOwner.Color + "Team"]];
            self.DefenderContainer.filters = filters[defenderOwner.Color + "Team"] ? [filters[defenderOwner.Color + "Team"]] : [];  
            self.AttackerContainer.addChild(attackerAnimation);
            self.DefenderContainer.addChild(defenderAnimation);
            mainContainer.addChild(self.AttackerContainer);
            mainContainer.addChild(self.DefenderContainer);

            let attackXDirection = defenderTile.X - attackerTile.X;
            attackXDirection = attackXDirection == 0 ? 0 : attackXDirection / Math.abs(attackXDirection);
            let attackYDirection = defenderTile.Y - attackerTile.Y;
            attackYDirection = attackYDirection == 0 ? 0 : attackYDirection / Math.abs(attackYDirection);

            let attackDuration = 100;
            let attackLength = terrainWidth * 0.3;
            let flashDuration = 100;

            let whiteFilter = new PIXI.filters.ColorMatrixFilter();
            whiteFilter.matrix = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

            var attackFunction = (delta) => {
                let deltaTime = delta * (1000 / 60);
                self.AttackerContainer.x += attackXDirection * attackLength * (deltaTime / attackDuration);
                self.AttackerContainer.y += attackYDirection * attackLength * (deltaTime / attackDuration);
            }
            pixiApp.ticker.add(attackFunction);

            setTimeout(() => {
                pixiApp.ticker.remove(attackFunction);
                self.AttackerContainer.x = attackerTile.XCoord;
                self.AttackerContainer.y = attackerTile.YCoord;
                let filters = self.DefenderContainer.filters;
                filters.push(whiteFilter);
                self.DefenderContainer.filters = filters;
            }, attackDuration);

            setTimeout(() => {
                self.DefenderContainer.filters.splice(self.DefenderContainer.filters.indexOf(whiteFilter), 1);
                attacker.Container.visible = true;
                defender.Container.visible = true;
                attacker.Container.addChildAt(attackerAnimation,0);
                defender.Container.addChildAt(defenderAnimation,0);
                self.AttackerContainer.destroy();
                self.DefenderContainer.destroy();
                callback();
            }, attackDuration + flashDuration);
        }
    }
}