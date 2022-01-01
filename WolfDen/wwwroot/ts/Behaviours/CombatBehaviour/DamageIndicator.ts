namespace TurnBasedBoardGame {
    export class DamageIndicator implements IIndicator {
        
        PixiText: PIXI.Text;

        constructor(damage: number, x: number, y: number) {
            let style = new PIXI.TextStyle({
                fill: 'red',
                fontFamily: "Times New Roman",
                strokeThickness: 5,
                fontSize: 15
            });
            this.PixiText = new PIXI.Text(damage.toString(), style);
            this.PixiText.x = x;
            this.PixiText.y = y + 11;
            mainContainer.addChild(this.PixiText);
        }

        CoversTile(tile: Tile): boolean {
            return false;
        }
        Click(): void {
            throw new Error("Method not implemented.");
        }
        Clear(): void {
            mainContainer.removeChild(this.PixiText);
        }
    }
}