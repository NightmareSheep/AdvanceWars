namespace TurnBasedBoardGame {
    export class AttackIndicator implements IIndicator {        
        Sprite: PIXI.Sprite;
        AttackText: PIXI.Text;
        DefendText: PIXI.Text;
        AttackingUnit: Unit;
        DefendingUnit: Unit;
        TileThatIsAttacked: Tile;
        ClickAction: () => void;

        constructor(game: Game, primaryIndicator: boolean, combatBehaviour: ICombatBehaviour, from: Tile[], target: Unit) {
            let self = this;
            let attackedTile = target.Node as Tile;
            let attackingTile = combatBehaviour.Unit.Node as Tile;
            self.TileThatIsAttacked = attackedTile;
            self.DefendingUnit = target;

            // Find enemy combat behaviour.
            let enemyCombatBehaviour: ICombatBehaviour;
            for (let key in target.Behaviours)
                if (IsICombatBehaviour(target.Behaviours[key]))
                    enemyCombatBehaviour = target.Behaviours[key] as ICombatBehaviour;

            // Show previews.
            let preview = combatBehaviour.GetPreview(enemyCombatBehaviour);
            let attackPreview = preview.attackPreview;
            let defendPreview = preview.defendPreview;
            let style = new PIXI.TextStyle({
                fill: 'yellow',
                fontFamily: "Times New Roman",
                strokeThickness: 5,
                fontSize: 16
            });
            this.AttackText = new PIXI.Text(Math.max(0, Math.ceil(attackPreview)).toString(), style);
            this.DefendText = new PIXI.Text(Math.min(100, Math.max(0, Math.ceil(defendPreview))).toString(), style);
            this.AttackText.x = attackedTile.X * terrainWidth;
            this.AttackText.y = attackedTile.Y * terrainHeight - 5;

            this.DefendText.x = attackingTile.X * terrainWidth;
            this.DefendText.y = attackingTile.Y * terrainHeight - 5;
            this.AttackText.alpha = 0;
            this.DefendText.alpha = 0;
            self.AttackingUnit = combatBehaviour.Unit;
            


            this.Sprite = gameResources.indicators.attackIndicator();
            //if (Tile.X < attackTile.X)
            //    this.Sprite = gameResources.indicators.attackIndicatorRight();
            //if (Tile.X > attackTile.X)
            //    this.Sprite = gameResources.indicators.attackIndicatorLeft();
            //if (Tile.Y < attackTile.Y)
            //    this.Sprite = gameResources.indicators.attackIndicatorDown();
            //if (Tile.Y > attackTile.Y)
            //    this.Sprite = gameResources.indicators.attackIndicatorUp();
            
            self.Sprite.alpha = 0.5;
            this.Sprite.interactive = true;
            this.Sprite.buttonMode = true;

            // If this is a secondary indicator we need to spawn it on the tile its attack from instead of the tile its attacking.
            if (primaryIndicator) {
                self.Sprite.x = self.TileThatIsAttacked.X * terrainWidth;
                self.Sprite.y = self.TileThatIsAttacked.Y * terrainHeight;
            }
            else {
                self.Sprite.x = from[0].X * terrainWidth;
                self.Sprite.y = from[0].Y * terrainHeight;
            }

            // If we click the indidicator:
            self.ClickAction = () => {

                // If we can only attack from one side, we attack.
                if (from.length == 1) {
                    let attackCommand = combatBehaviour.GetAttackCommand(from[0], target);
                    Game.Instance.GiveCommand(attackCommand);
                }
                // Otherwise we spawn new attack indicators for each side.
                else {
                    game.ClearIndicators();
                    from.forEach((tile: Tile) => {
                        game.Indicators.push(new AttackIndicator(game, false, combatBehaviour, [tile], attackedTile.Piece as Unit));
                    });
                }
                
            }

            // Mobile
            this.Sprite.on("pointertap", function (e) {
                self.ClickAction();
            });

            // Hover effects
            this.Sprite.on("mouseover", function (e) {
                self.Sprite.tint = 0xa83232;
                self.AttackText.alpha = 1;
                self.DefendText.alpha = 1;
            });
            this.Sprite.on("mouseout", function (e) {
                self.Sprite.tint = 0xFFFFFF;
                self.AttackText.alpha = 0;
                self.DefendText.alpha = 0;
            });

            mainContainer.addChild(self.Sprite);
            mainContainer.addChild(self.AttackText);
            mainContainer.addChild(self.DefendText);
        }

        Click() {
            this.ClickAction();
        }

        Clear() {
            mainContainer.removeChild(this.Sprite);
            mainContainer.removeChild(this.DefendText);
            mainContainer.removeChild(this.AttackText);
        }

        CoversTile(tile: Tile): boolean {
            if (this.TileThatIsAttacked === tile)
                return true;
            return false;
        }


    }
}