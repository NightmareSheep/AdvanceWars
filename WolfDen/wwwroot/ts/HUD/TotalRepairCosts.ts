namespace TurnBasedBoardGame {
    export class TotalRepairCosts {
        Id: string = guid();
        Game: Game;
        RepairCoordinator: RepairCoordinator;
        Animation: TextDisappearAnimation;
        RepairText: PIXI.Text;
        RepairSprite: PIXI.Sprite;

        constructor(game: Game) {
            this.Game = game;
            let self = this;
            this.RepairCoordinator = this.Game.CurrentPlayer.RepairCoordinator;

            let style = PixiTextStyle1();
            this.RepairText = new PIXI.Text("", style);
            pixiApp.stage.addChild(this.RepairText);

            this.RepairSprite = gameResources.icons.repair();
            this.RepairSprite.alpha = 0;
            pixiApp.stage.addChild(this.RepairSprite);

            this.RepairCoordinator.ExecuteRepairsEvent[this.Id] = function () {
                if (self.RepairCoordinator.TurnRepairCosts <= 0)
                    return;

                let pos = self.GetTextPosition();
                self.RepairText.x = pos.x;
                self.RepairText.y = pos.y;
                self.RepairText.alpha = 1;
                self.RepairText.text = "-" + self.RepairCoordinator.TurnRepairCosts.toString();
                SpriteDisappearAnimation(self.RepairText, () => { });

                self.RepairSprite.x = self.RepairText.x + self.RepairText.width;
                self.RepairSprite.y = self.RepairText.y + 5;
                self.RepairSprite.alpha = 1;
                SpriteDisappearAnimation(self.RepairSprite, () => { });
            }
        }

        GetTextPosition(): PIXI.Point {
            let incomeText = this.Game.HUD.GoldDisplay.IncomeText;
            let x = incomeText.x + incomeText.width + 3;
            let y = incomeText.y;
            return new PIXI.Point(x, y);
        }
    }
}