namespace TurnBasedBoardGame {
    export class CaptureIndicator implements IIndicator {        
        Sprite: any;
        ClickAction: () => void;

        constructor(captureBehaviour: NormalCaptureBehaviour, private building: Building) {
            let self = this;
            this.Sprite = gameResources.indicators.captureIndicator();
            this.Sprite.x = building.X * this.Sprite.width;
            this.Sprite.y = building.Y * this.Sprite.height;
            self.Sprite.alpha = 0.5;
            this.Sprite.interactive = true;
            this.Sprite.buttonMode = true;
            self.ClickAction = () => {
                let captureCommand = captureBehaviour.GetMoveCommand(building);
                Game.Instance.GiveCommand(captureCommand);
            }
            this.Sprite.on("pointertap", function (e) {
                self.ClickAction();
            });
            this.Sprite.on("mouseover", function (e) {
                self.Sprite.tint = 0xa83232;
            });
            this.Sprite.on("mouseout", function (e) {
                self.Sprite.tint = 0xFFFFFF;
            });
            mainContainer.addChild(this.Sprite);

        }

        Click() {
            this.ClickAction();
        }

        public Clear() {
            mainContainer.removeChild(this.Sprite);
        }

        CoversTile(tile: Tile): boolean {
            if (this.building === tile)
                return true;
            return false;
        }
    }
}