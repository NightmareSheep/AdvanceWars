 namespace TurnBasedBoardGame {
    export function SanityCheck(game: AdvanceWarsGame, sanityResult: SanityResult): boolean {
        let id = 0;
        let calculation = "";
        game.Players.forEach((player) => {
            id += player.Gold;
            calculation += player.Gold + " ";
        });
        

        let units: Unit[] = [];
        for (let prop in game.Pieces) {
            let obj = game.Pieces[prop];
            if ((obj instanceof Unit))
                units.push(obj as Unit);
        }

        units.sort((a, b) => (a.Id > b.Id) ? 1 : -1);
        units.forEach((unit: Unit) => {
            var tile = unit.Node as Tile;
            var health = unit.BehaviourList.find((b) => { return IsIHealth(b); }) as IHealth;
            if (tile) {
                id += tile.X * tile.Y * health.CurrentHealth;
                calculation += health.CurrentHealth + "x" + tile.X + "x" + tile.Y + " ";
            }
        });

        for (let x = 0; x < game.Board.Tiles.length; x++) {
            for (let y = 0; y < game.Board.Tiles[0].length; y++) {
                let tile = game.Board.Tiles[x][y];
                if (tile.Piece) {
                    var unit = tile.Piece as Unit;
                    var health = unit.BehaviourList.find((b) => { return IsIHealth(b); }) as IHealth;
                    id += tile.X * tile.Y * health.CurrentHealth;
                    calculation += health.CurrentHealth + "x" + tile.X + "x" + tile.Y + " ";
                }
            }
        }

        for (let x = 0; x < game.Board.Tiles.length; x++) {
            for (let y = 0; y < game.Board.Tiles[0].length; y++) {
                let tile = game.Board.Tiles[x][y];
                if (!IsBuilding(tile))
                    continue;
                var building = tile as Building;

                if (building.Owner != null) {
                    id += building.X * building.Y * building.Owner.Team;
                    calculation += building.X + "x" + building.Y + "x" + building.Owner.Team + " ";
                }
            }
        }


        console.log("Server: " + sanityResult.Calculation);
        console.log("Server move: " + sanityResult.MoveNumber);
        console.log("Client: " + calculation);
        if (game.History && game.History.Replay)
            console.log("Client move: " + (game.History.Replay.CurrentMove - 1));
        if (id != sanityResult.Id) {
            console.log("sanity check failed");
            return false;
        }
        return true;
            
    }
}