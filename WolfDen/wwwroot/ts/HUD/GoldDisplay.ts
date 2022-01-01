namespace TurnBasedBoardGame {
    export class GoldDisplay {
        Player: AdvanceWarsPlayer;
        GoldText: PIXI.Text;
        IncomeText: PIXI.Text;
        Id: string = guid();
        GoldBeforeIncome: number = 0;
        PauseUpdates: boolean = false;
        

        constructor(player: AdvanceWarsPlayer, game: Game) {
            var self = this;
            this.Player = player;
            let style = PixiTextStyle1();
            style.fill = "yellow";
            this.GoldText = new PIXI.Text("Gold: " + player.Gold, style);
            this.GoldText.x = 10;
            this.GoldText.y = 70;
            pixiApp.stage.addChild(this.GoldText);

            let incomeStyle = PixiTextStyle1();
            incomeStyle.fill = "lightgreen";
            this.IncomeText = new PIXI.Text("", incomeStyle);
            pixiApp.stage.addChild(this.IncomeText);


            

            game.TurnResolver.IncomeCoordinator.PreIncomeEvent[this.Id] = function (players: AdvanceWarsPlayer[]) {
                if (players.indexOf(self.Player) == -1)
                    return;

                self.GoldBeforeIncome = self.Player.Gold;
                self.PauseUpdates = true;
                self.IncomeText.x = self.GoldText.x + self.GoldText.width + 3;
                self.IncomeText.y = self.GoldText.y;
                self.IncomeText.alpha = 1;
            };

            game.TurnResolver.IncomeCoordinator.PostIncomeEvent[this.Id] = function (players: AdvanceWarsPlayer[]) {
                if (players.indexOf(self.Player) == -1)
                    return;

                let income = self.Player.Gold - self.GoldBeforeIncome;
                self.IncomeText.text = "+" + income.toString();
                SpriteDisappearAnimation(self.IncomeText, () => {});
                setTimeout(function () {
                    self.PauseUpdates = false;
                    self.GoldText.text = "Gold: " + player.Gold;
                }, 3000);
                
            };

            game.MoveResolver.CommandCompletedEvent[this.Id] = function () {
                if (!self.PauseUpdates)
                    self.GoldText.text = "Gold: " + player.Gold;
            }
        }
    }
}