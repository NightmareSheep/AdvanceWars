namespace TurnBasedBoardGame {
    export class TextDisappearAnimation {
        Text: PIXI.Text;
        Duration: number = 3000;

        constructor(text: string, style: PIXI.TextStyle, x: number, y: number, container: PIXI.Container) {
            var self = this;
            this.Text = new PIXI.Text(text, style);
            this.Text.x = x;
            this.Text.y = y;
            container.addChild(self.Text);
            let elapsedTime = 0;
            let tickerFunction = function (deltaTime) {
                elapsedTime += PIXI.ticker.shared.elapsedMS;

                if (elapsedTime >= self.Duration) {
                    self.Text.y = y - (elapsedTime - self.Duration) * 0.01;
                    self.Text.alpha = 1 - (elapsedTime - self.Duration) * 0.005;
                }


                if (elapsedTime >= self.Duration + 1000) {
                    pixiApp.ticker.remove(tickerFunction);
                    container.removeChild(self.Text);
                    self.Text.destroy();
                }
            };
            pixiApp.ticker.add(tickerFunction);
        }
    }
}