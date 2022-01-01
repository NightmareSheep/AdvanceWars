namespace TurnBasedBoardGame {
    // Get the sprite for the current tile.
    // The input is the tiletypes of all surrounding tiles in order:
    // Top left, top, top right, left, current tile, right, bottom left, bottom, bottom right
    export function GetTerrain(tiles: number[]): PIXI.Sprite {
        if (!tiles || tiles.length != 9)
            throw new Error("Input invalid while getting terrain sprite.");

        let currentTiletype = tiles[4];

        switch (currentTiletype) {
            case 15:
                return LoadPipe(tiles);
            case 16:
                return LoadDestroyedPipe(tiles);
        }
        return null;
    }

    function LoadPipe(tiles: number[]): PIXI.Sprite {
        let bitString = "";
        // Tiles in order: top, right, bottom, left
        let relevantTiles = [tiles[1], tiles[5], tiles[7], tiles[3]]
        for (let n = 0; n < relevantTiles.length; n ++) {
            if (relevantTiles[n] == 15 || relevantTiles[n] == 16)
                bitString += "1";
            else
                bitString += "0";
        }
        let sprite: PIXI.Sprite = gameResources.terrain["pipe" + bitString]();
        return sprite;
    }

    function LoadDestroyedPipe(tiles: number[]): PIXI.Sprite {
        let bitString = "";
        if ((tiles[1] == 15 || tiles[1] == 16) && (tiles[7] == 15 || tiles[7] == 16))
            bitString = "1010";
        else
            bitString = "0101";

        let sprite: PIXI.Sprite = gameResources.terrain["destroyedPipe" + bitString]();
        return sprite;
    }
}