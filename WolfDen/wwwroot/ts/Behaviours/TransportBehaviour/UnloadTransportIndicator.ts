namespace TurnBasedBoardGame {
    export class UnloadTransportIndicator implements IIndicator {
        Sprite: PIXI.Sprite;

        constructor(private transportBehaviour: TransportBehaviour, private tile: Tile, private from: Tile) {
            let self = this;
            this.Sprite = gameResources.indicators.unloadAtIndicator();
            this.Sprite.x = this.tile.X * terrainWidth;
            this.Sprite.y = this.tile.Y * terrainHeight;
            this.Sprite.interactive = true;
            this.Sprite.buttonMode = true;
            mainContainer.addChild(this.Sprite);
            this.Sprite.on("pointertap", function (e) {
                let move = { "id": self.transportBehaviour.Unit.Id, "data": { "id": self.transportBehaviour.Id, "data": { "type": 1, "nodeId": tile.Id, "moveCommand": transportBehaviour.MoveBehaviour.GetMoveCommand(from).data.data } } }
                Game.Instance.GiveCommand(move);
            });
            this.Sprite.on("mouseover", function (e) {
                self.Sprite.tint = 0xa83232;
            });
            this.Sprite.on("mouseout", function (e) {
                self.Sprite.tint = 0xFFFFFF;
            });
        }

        CoversTile(tile: Tile): boolean {
            return (tile === this.tile);
        }
        Click(): void {
            throw new Error("Method not implemented.");
        }
        Clear(): void {
            mainContainer.removeChild(this.Sprite);
            this.Sprite.destroy();
        }
    }
}