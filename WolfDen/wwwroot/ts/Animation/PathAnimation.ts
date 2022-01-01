namespace TurnBasedBoardGame {
    export class PathAnimation {
        Tiles: Tile[] = [];
        Speed: number = 0.2;
        Unit: Unit;
        container: PIXI.Container;

        constructor(path: string[], unit: Unit, callback: () => void) {
            var self = this;
            let gameSpeed = unit.Game.GameSpeed;
            this.Speed /= gameSpeed;
            this.container = new PIXI.Container();
            this.container.filters = unit.Container.filters;
            this.Unit = unit;
            path.forEach(function (tileId) {
                self.Tiles.push(Game.Instance.Board.Nodes[tileId] as Tile);
            });
            
            let tiles = this.Tiles;
            let x = tiles[0].X ? tiles[0].X : 0;
            let y = tiles[0].Y ? tiles[0].Y : 0;
            let animations = this.Unit.Animations;
            let usedAnimations = ["up", "down", "left", "right"]
            usedAnimations.forEach(a => self.container.addChild(animations[a]));
            this.container.x = x;
            this.container.y = y;
            mainContainer.addChild(this.container);
            let time = 0;
            let speed = this.Speed;
            let tileWidth = animations.up.width;
            let tileHeight = animations.up.height;
            let lastIndex = -1;
            let tickerFunction = function (delta) {
                time += delta;
                let progress = time / 100 / speed;
                let index = Math.floor(progress);

                if (index >= tiles.length - 1) {
                    pixiApp.ticker.remove(tickerFunction);
                    mainContainer.removeChild(self.container);
                    usedAnimations.forEach(a => animations[a].visible = false);
                    if (callback)
                        callback();
                }
                else {
                    let xPos = (tiles[index].X * (1 - progress % 1) + tiles[Math.min(index + 1, tiles.length - 1)].X * (progress % 1)) * tileWidth;
                    let yPos = (tiles[index].Y * (1 - progress % 1) + tiles[Math.min(index + 1, tiles.length - 1)].Y * (progress % 1)) * tileHeight;

                    if (lastIndex != index) {
                        usedAnimations.forEach(a => animations[a].visible = false);
                        if (tiles[index].X < tiles[Math.min(tiles.length - 1,index + 1)].X) { animations.right.visible = true; }
                        if (tiles[index].X > tiles[Math.min(tiles.length - 1,index + 1)].X) { animations.left.visible = true; }
                        if (tiles[index].Y < tiles[Math.min(tiles.length - 1,index + 1)].Y) { animations.down.visible = true; }
                        if (tiles[index].Y > tiles[Math.min(tiles.length - 1,index + 1)].Y) { animations.up.visible = true; }
                    }
                    lastIndex = index;
                    self.container.x = xPos;
                    self.container.y = yPos;
                }
            };
            pixiApp.ticker.add(tickerFunction);

        }
    }
}