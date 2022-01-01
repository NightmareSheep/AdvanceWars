namespace TurnBasedBoardGame {
    export class CaptureAnimation {
        private Container: PIXI.Container;
        PixiText: PIXI.Text;
        Runtime: number = 2000;

        constructor(private Unit: Unit, tile: Tile, startingPercentage: number, endingPercentage: number, callback: () => void) {
            var self = this;
            var gameSpeed = Unit.Game.GameSpeed;
            self.Runtime /= gameSpeed;
            let style = new PIXI.TextStyle({
                fill: '#3afeda',
                fontFamily: "Times New Roman",
                strokeThickness: 5,
                fontSize: 15
            });

            self.PixiText = new PIXI.Text(startingPercentage + "%", style);
            self.PixiText.x = 18;
            self.PixiText.y = 31;

            self.Unit.Container.visible = false;
            let animation: PIXI.extras.AnimatedSprite = self.Unit.Animations["capture"];
            self.Container = new PIXI.Container();
            var advanceWarsOwner = Unit.Owner;
            self.Container.filters = [filters[advanceWarsOwner.Color + "Team"]];  

            self.Container.x = tile.X * terrainWidth;
            self.Container.y = tile.Y * terrainHeight;
            self.Container.addChild(animation);
            self.Container.addChild(self.PixiText);
            mainContainer.addChild(self.Container);
            animation.visible = true;
            let startingTime = Date.now();

            let tickerFunction = () => {
                let currentPercentage = Math.min(endingPercentage, Math.round(startingPercentage + (endingPercentage - startingPercentage) * (Date.now() - startingTime) / (self.Runtime - 800)));
                self.PixiText.text = currentPercentage + "%";
            }
            pixiApp.ticker.add(tickerFunction);
            setTimeout(() => {
                pixiApp.ticker.remove(tickerFunction);
                animation.visible = false;
                self.Container.destroy();
                self.PixiText.destroy();
                self.Unit.Container.visible = true;
                callback();
            }, self.Runtime);

        }
    }
}