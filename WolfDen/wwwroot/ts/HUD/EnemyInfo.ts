namespace TurnBasedBoardGame {
    export class EnemyInfo {
        Enemies: AdvanceWarsPlayer[];
        EnemyCommanderImage: PIXI.Sprite[] = [];
        Id: string;


        constructor(enemies: AdvanceWarsPlayer[], game: Game) {
            this.Id = guid();
            var self = this;
            this.Enemies = enemies;
            this.Enemies.sort(function (a, b) { return a.Team - b.Team });

            self.Enemies.forEach(function (player, index) {
                // Display commander
                let commanderImage = gameResources.commanders[player.CO.Name + "Mirror"]();
                self.EnemyCommanderImage.push(commanderImage);
                pixiApp.stage.width - 10 - terrainWidth
                commanderImage.x = screen.width - 10 - terrainWidth - index * 60;
                commanderImage.y = 10;
                if (game.TurnResolver.ActivePlayers.indexOf(player) == -1)
                    commanderImage.alpha = 0.5;
                pixiApp.stage.addChild(commanderImage);

                // Display color
                const rectangle = PIXI.Sprite.from(PIXI.Texture.WHITE as any);
                rectangle.x = commanderImage.x;
                rectangle.y = 62;
                rectangle.width = 50;
                rectangle.height = 3;
                rectangle.tint = parseInt(colourNameToHex(player.Color).replace(/^#/, ''), 16);
                pixiApp.stage.addChild(rectangle);
            });

            game.TurnResolver.StartTurnEvent[this.Id] = function (activePlayers: AdvanceWarsPlayer[]) {
                self.Enemies.forEach(function (player, index) {
                    if (activePlayers.indexOf(player) != -1) { self.EnemyCommanderImage[index].alpha = 1; }
                    else { self.EnemyCommanderImage[index].alpha = 0.5; }
                });                
            };

            game.TurnResolver.SubscribeToPlayerEndTurnEvent((player: AdvanceWarsPlayer) => {
                let index = self.Enemies.indexOf(player);
                if (index != -1) {
                    let sprite = self.EnemyCommanderImage[index];
                    sprite.alpha = 0.5;
                }
            });
        }
    }
}