namespace TurnBasedBoardGame {
    export class LoadTransportIndicator implements IIndicator {
        
        sprite: PIXI.Sprite;

        constructor(private unit: Unit, private transportableBehaviour: TransportableBehaviour, transportBehaviour: ITransportBehaviour, private tile: Tile, private path: string[]) {
            let self = this;
            this.sprite = gameResources.indicators.unloadAtIndicator();
            this.sprite.x = this.tile.X * terrainWidth;
            this.sprite.y = this.tile.Y * terrainHeight;
            this.sprite.alpha = 0.5;
            this.sprite.interactive = true;
            this.sprite.buttonMode = true;
            
            this.sprite.on("pointertap", function (e) {
                let move = { "id": self.unit.Id, "data": { "id": self.transportableBehaviour.Id, "data": { "type": 0, "unitId": transportBehaviour.Unit.Id, "path": path } } }
                Game.Instance.GiveCommand(move);
            });
            this.sprite.on("mouseover", function (e) {
                self.sprite.tint = 0xa83232;
            });
            this.sprite.on("mouseout", function (e) {
                self.sprite.tint = 0xFFFFFF;
            });
            mainContainer.addChild(this.sprite);
        }

        CoversTile(tile: Tile): boolean {
            return tile === this.tile;
        }
        Click(): void {
            throw new Error("Method not implemented.");
        }
        Clear(): void {
            mainContainer.removeChild(this.sprite);
            this.sprite.destroy();
        }
    }
}