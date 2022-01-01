namespace TurnBasedBoardGame {
    export function SpriteDisappearAnimation(sprite: PIXI.Sprite, callback: () => void, duration: number = 3000) {
        let elapsedTime = 0;
        let startingY = sprite.y;

        let tickerFunction = function (deltaTime) {
            elapsedTime += PIXI.ticker.shared.elapsedMS;

            if (elapsedTime >= duration) {
                sprite.y = startingY - (elapsedTime - duration) * 0.01;
                sprite.alpha = 1 - (elapsedTime - duration) * 0.005;
            }


            if (elapsedTime >= duration + 1000) {
                pixiApp.ticker.remove(tickerFunction);
                callback();
            }
        };
        pixiApp.ticker.add(tickerFunction);
    }

    
}