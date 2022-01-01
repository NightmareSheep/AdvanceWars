/// <reference path="../Node.ts" />

namespace TurnBasedBoardGame {
    export class Tile extends Node {
        X: number = 0;
        Y: number = 0;
        TileType: number;
        Sprite: PIXI.Sprite;
        Container: PIXI.Container = new PIXI.Container();
        BaseMovementCost: number;
        MovementCosts: any;
        Stars: number;
        SpecialTileTypes: number[] = [ 1, 9, 8, 2, 3, 15, 16 ];

        constructor() {
            super();
        }

        Initialize() {
            if (this.SpecialTileTypes.indexOf(this.TileType) != -1)
                this.LoadSpecialTileTypes(this.TileType);
            else
                this.Sprite = gameResources.terrain[this.TileType]();
            this.Container.x = this.X * terrainWidth;
            this.Container.y = this.Y * terrainHeight;
            this.Container.addChild(this.Sprite);

            Game.Instance.TerrainContainers[this.Y].addChildAt(this.Container, 0);
        }

        get XCoord() {
            return this.X * terrainWidth;
        }

        get YCoord() {
            return this.Y * terrainHeight;
        }

        LoadSpecialTileTypes(tileType: number) {
            let tileTypes: number[] = [];
            var map = Game.Instance.Board;

            for (let y = this.Y - 1; y <= this.Y + 1; y++) {
                for (let x = this.X - 1; x <= this.X + 1; x++) {
                    if (map.Tiles[x] && map.Tiles[x][y])
                        tileTypes.push(map.Tiles[x][y].TileType)
                    else
                        tileTypes.push(-1);
                }
            }

            if (tileType == 9)
                this.LoadSea();
            if (tileType == 1)
                this.LoadRoad();
            if (tileType == 3)
                this.LoadBridge();
            if (tileType == 2)
                this.LoadRiver();
            if (tileType == 8)
                this.LoadBeach();
            if (tileType == 15 || tileType == 16) {
                this.Sprite = GetTerrain(tileTypes);
            }
        }

        LoadSea() {
            var map = Game.Instance.Board;
            var bits = [1,1,1,1,0,1,1,1,1];
            for (let x = -1; x < 2; x++) {
                for (let y = -1; y < 2; y++) {
                    if (map.Tiles[this.X + x] === undefined || map.Tiles[this.X + x][this.Y + y] === undefined) { 
                        bits[x + 1 + (y + 1) * 3] = 0;
                        continue;
                    }
                    var tile = map.Tiles[this.X + x][this.Y + y];
                    if (tile.TileType === 9 || tile.TileType === 10 || tile.TileType === 8)
                        bits[x + 1 + (y + 1) * 3] = 0;
                }
            }
            if (bits[1]) { bits[0] = 0; bits[2] = 0; }
            if (bits[3]) { bits[0] = 0; bits[6] = 0; }
            if (bits[5]) { bits[2] = 0; bits[8] = 0; }
            if (bits[7]) { bits[6] = 0; bits[8] = 0; }
            let bitString = "";
            for (let bit of bits)
                bitString += bit;

            this.Sprite = gameResources.terrain["Sea" + bitString]();

        }

        LoadRoad() {
            let map = Game.Instance.Board;
            let leftTile = map.Tiles[this.X - 1] ? map.Tiles[this.X - 1][this.Y] : null;
            let topTile = map.Tiles[this.X][this.Y - 1];
            let rightTile = map.Tiles[this.X + 1] ? map.Tiles[this.X + 1][this.Y] : null;
            let bottomTile = map.Tiles[this.X][this.Y + 1];

            var tiles = [topTile, rightTile, bottomTile, leftTile];
            var bitString = "";
            for (let tile of tiles) {
                bitString += tile && tile.TileType === 1 ? 1 : 0;
            }
            this.Sprite = gameResources.terrain["Road" + bitString]();

        }

        LoadBridge() {
            let map = Game.Instance.Board;
            let leftTile = map.Tiles[this.X - 1] ? map.Tiles[this.X - 1][this.Y] : null;
            let topTile = map.Tiles[this.X][this.Y - 1];
            let rightTile = map.Tiles[this.X + 1] ? map.Tiles[this.X + 1][this.Y] : null;
            let bottomTile = map.Tiles[this.X][this.Y + 1];
            if (leftTile && ([2, 8, 9].indexOf(leftTile.TileType) !== -1) && rightTile && ([2, 8, 9].indexOf(rightTile.TileType) !== -1)) {
                this.Sprite = gameResources.terrain["BridgeVertical"]();
                return;
            }
            if (topTile && ([2, 8, 9].indexOf(topTile.TileType) !== -1) && bottomTile && ([2, 8, 9].indexOf(bottomTile.TileType) !== -1)) {
                this.Sprite = gameResources.terrain["BridgeHorizontal"]();
                return;
            }
        }

        LoadBeach() {
            let map = Game.Instance.Board;
            let leftTile = map.Tiles[this.X - 1] ? map.Tiles[this.X - 1][this.Y] : null;
            let topTile = map.Tiles[this.X][this.Y - 1];
            let rightTile = map.Tiles[this.X + 1] ? map.Tiles[this.X + 1][this.Y] : null;
            let bottomTile = map.Tiles[this.X][this.Y + 1];
            var tiles = [topTile, rightTile, bottomTile, leftTile];
            var bitString = "";
            for (let tile of tiles) {
                if (!tile) {
                    bitString += 2;
                    continue;
                }

                let tileType = tile.TileType;
                if (tileType === 9 || tileType === 10 || tileType === 3)
                    bitString += 0;
                else if (tileType === 8)
                    bitString += 2;
                else
                    bitString += 1;
            }

            let bitstring2 = [];
            for (let i = 0; i < 4; i++) {
                bitstring2.push(bitString[i]);
            }

            for (let i = 0; i < 4; i++) {
                if (bitString[i] === '1' && bitString[(i + 2) % 4] === '2')
                    bitstring2[(i + 2) % 4] = '0';
            }
            bitString = "";
            for (let i = 0; i < 4; i++) {
                bitString += bitstring2[i];
            }

            this.Sprite = gameResources.terrain[bitString + "Beach"]();
        }

        LoadRiver() {
            let map = Game.Instance.Board;
            let leftTile = map.Tiles[this.X - 1] ? map.Tiles[this.X - 1][this.Y] : null;
            let topTile = map.Tiles[this.X][this.Y - 1];
            let rightTile = map.Tiles[this.X + 1] ? map.Tiles[this.X + 1][this.Y] : null;
            let bottomTile = map.Tiles[this.X][this.Y + 1];
            var tiles = [topTile, rightTile, bottomTile, leftTile];
            var bitString = "";
            for (let tile of tiles) {
                if (!tile) {
                    bitString += 1;
                    continue;
                }

                let tileType = tile.TileType;
                if (tileType === 2 || tileType === 3)
                    bitString += 1;
                else
                    bitString += 0;
            }
            this.Sprite = gameResources.terrain["River" + bitString]();
        }
    }
}