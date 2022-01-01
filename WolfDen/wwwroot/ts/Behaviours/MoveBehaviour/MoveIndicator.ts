namespace TurnBasedBoardGame {
    export class MoveIndicator implements IIndicator {
        Action: () => void;
        Graphics: PIXI.Graphics;
        Rectangle: PIXI.Rectangle;

        constructor(private NormalMoveBehaviour: NormalMoveBehaviour, private Tile: Tile, action: () => void, private Color: number = 0xFFFFFF, private HoverColor: number = 0xa83232) {
            let self = this;
            this.Action = action;
            this.Graphics = new PIXI.Graphics();
            this.Graphics.x = Tile.XCoord;
            this.Graphics.y = Tile.YCoord;
            this.Graphics.width = terrainWidth;
            this.Graphics.height = terrainHeight;
            this.Graphics.beginFill(self.Color);
            this.Graphics.drawRect(0, 0, terrainWidth, terrainHeight);
            this.Graphics.endFill();
            this.Graphics.alpha = 0.5;
            this.Graphics.interactive = true;
            this.Graphics.buttonMode = true;

            this.Graphics.on("pointertap", function (e) {
                action();
            });
            this.Graphics.on("mouseover", function (e) {
                self.Graphics.tint = self.HoverColor;
            });
            this.Graphics.on("mouseout", function (e) {
                self.Graphics.tint = 0xFFFFFF;
            });

            mainContainer.addChild(this.Graphics);

        }

        CoversTile(tile: Tile) {
            if (this.Tile === tile)
                return true;
            return false;
        }

        Click() {
            this.Action();
        }

        public Clear() {
            mainContainer.removeChild(this.Graphics);
            this.Graphics.destroy();
        }


    }
}