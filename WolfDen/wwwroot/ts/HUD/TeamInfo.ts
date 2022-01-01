namespace TurnBasedBoardGame {
    export class TeamInfo {
        Id; string;
        TeamMates: AdvanceWarsPlayer[];        
        TeammateCommanderImage: PIXI.Sprite[] = [];        

        constructor(teammates: AdvanceWarsPlayer[], game: Game) {
            this.Id = guid();
            var self = this;
            this.TeamMates = teammates;

            self.TeamMates.forEach(function (player, index) {
                let commanderImage = gameResources.commanders[player.CO.Name]();
                self.TeammateCommanderImage.push(commanderImage);
                commanderImage.x = 80 + index * 60;
                commanderImage.y = 10;
                if (game.TurnResolver.ActivePlayers.indexOf(player) == -1)
                    commanderImage.alpha = 0.5;
                pixiApp.stage.addChild(commanderImage);

                const rectangle = PIXI.Sprite.from(PIXI.Texture.WHITE as any);
                rectangle.x = commanderImage.x;
                rectangle.y = 62;
                rectangle.width = 50;
                rectangle.height = 3;
                rectangle.tint = parseInt(colourNameToHex(player.Color).replace(/^#/, ''), 16);
                pixiApp.stage.addChild(rectangle);
            });

            game.TurnResolver.StartTurnEvent[this.Id] = function (activePlayers: AdvanceWarsPlayer[]) {
                self.TeamMates.forEach(function (player, index) {
                    if (activePlayers.indexOf(player) != -1) { self.TeammateCommanderImage[index].alpha = 1; }
                    else { self.TeammateCommanderImage[index].alpha = 0.5; }
                });
            };

            game.TurnResolver.SubscribeToPlayerEndTurnEvent((player: AdvanceWarsPlayer) => {
                let index = self.TeamMates.indexOf(player);
                if (index != -1) {
                    let sprite = self.TeammateCommanderImage[index];
                    sprite.alpha = 0.5;
                }
            });
        }
    }
}