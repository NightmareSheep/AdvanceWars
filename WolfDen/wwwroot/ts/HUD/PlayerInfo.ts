namespace TurnBasedBoardGame {
    export class PlayerInfo {
        Player: AdvanceWarsPlayer;
        GoldText: PIXI.Text;
        Id: string;
        CommanderImage: PIXI.Sprite;

        constructor(player: AdvanceWarsPlayer, game: Game) {
            var self = this;
            this.Player = player;
            this.Id = guid();

            // Display commander
            this.CommanderImage = gameResources.commanders[self.Player.CO.Name]();
            this.CommanderImage.x = 10;
            this.CommanderImage.y = 10;
            if (game.TurnResolver.ActivePlayers.indexOf(player) == -1)
                this.CommanderImage.alpha = 0.5;
            pixiApp.stage.addChild(this.CommanderImage);

            // Display color
            const rectangle = PIXI.Sprite.from(PIXI.Texture.WHITE as any);
            rectangle.x = 10;
            rectangle.y = 62;
            rectangle.width = 50;
            rectangle.height = 3;
            rectangle.tint = parseInt(colourNameToHex(player.Color).replace(/^#/, ''), 16);
            
            pixiApp.stage.addChild(rectangle);

            game.TurnResolver.StartTurnEvent[this.Id] = function (activePlayers: AdvanceWarsPlayer[]) {
                if (activePlayers.indexOf(self.Player) != -1) { self.CommanderImage.alpha = 1; }
                else { self.CommanderImage.alpha = 0.5; }
            };

            game.TurnResolver.SubscribeToPlayerEndTurnEvent((player: AdvanceWarsPlayer) => {
                if (player == self.Player) {
                    self.CommanderImage.alpha = 0.5;
                }
            });
        }
    }
}