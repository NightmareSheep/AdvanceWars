using System.Drawing;
using System.Collections.Generic;
using System;
using WolfDen.Game;
using WolfDen.Game.Tiles;
using WolfDen.Game.GameMechanics;
using System.Linq;
using WolfDen.Game.Other;

namespace WolfDen.Game.Factories
{
    public class GameFactory
    {
        public Game GetGame(Models.Map map, List<AdvanceWarsPlayer> players)
        {

            var mapFactory = new MapFactory();
            var game = new AdvanceWarsGame();
            var coFactory = new CoFactory();
            var turnResolver = new TurnResolver(players, game);
            game.TurnResolver = turnResolver;
            game.AdvancewarsBoard.MapId = map.ID;
            players.ForEach(player => player.CO = coFactory.GetCO(player.CoName, game, turnResolver));
            var tiles = new Tile[map.Width, map.Height];
            foreach (Models.Tile tile in map.Tiles)
                tiles[tile.X, tile.Y] = mapFactory.GetTile(game, tile, players.ConvertAll(x => (AdvanceWarsPlayer)x), turnResolver);

            for (int x = 0; x < tiles.GetLength(0); x++)
                for (int y = 0; y < tiles.GetLength(1); y++)
                {
                    var tile = tiles[x, y];
                    var neighbours = new Point[4] { new Point(x - 1, y), new Point(x, y - 1), new Point(x + 1, y), new Point(x, y + 1) };
                    foreach (Point neighbour in neighbours)
                        if (neighbour.X >= 0 && neighbour.X < tiles.GetLength(0) && neighbour.Y >= 0 && neighbour.Y < tiles.GetLength(1))
                            tile.Neighbours.Add(tiles[neighbour.X, neighbour.Y]);
                }

            foreach (AdvanceWarsPlayer player in players)
            {
                game.Players.Add(player);
                var endTurnButton = new EndTurnButton(game, turnResolver, player);
                game.Pieces.Add(endTurnButton.Id, endTurnButton);
            }

            foreach (Tile tile in tiles)
                game.Board.Nodes.Add(tile.Id, tile);
            game.AdvancewarsBoard.Tiles = tiles;
            var winCondition = new WinCondition(game);
            game.Pieces.Add(winCondition.Id, winCondition);

            // Add player controlled units
            var unitFactory = new UnitTemplateFactory();

            var neutralPlayer = new AdvanceWarsPlayer() { CO = coFactory.Andy, Color = "gray", RepairCoordinator = null };
            foreach (Models.Tile tile in map.Tiles.Where(t => t.Unit != UnitType.None))
            {
                var gameTile = tiles[tile.X, tile.Y];

                if (tile.Unit == UnitType.DestructablePipe)
                {
                    var topTile = tile.Y > 0 ? tiles[tile.X, tile.Y - 1] : null;
                    if (topTile != null && (topTile.TileType == TileType.Pipe || topTile.TileType == TileType.DestroyedPipe))
                        unitFactory.GetUnitTemplate("VerticalDestructablePipe").GenerateUnit(game, gameTile, neutralPlayer);
                    else
                        unitFactory.GetUnitTemplate("HorizontalDestructablePipe").GenerateUnit(game, gameTile, neutralPlayer);
                }
                else
                {
                    var owner = players.ElementAtOrDefault(tile.Owner);
                    unitFactory.GetUnitTemplate(tile.Unit.ToString()).GenerateUnit(game, gameTile, owner);
                }
                
            }

            turnResolver.StartTurn();
            return game;
        }


        public Game GetGame()
        {
            var MapFactory = new MapFactory();
            var game = new Game();
            var coFactory = new CoFactory();

            var tiles = new Tile[5, 5];
            for (int x = 0; x < tiles.GetLength(0); x++)
                for (int y = 0; y < tiles.GetLength(1); y++)
                    tiles[x, y] = MapFactory.GetTile(x, y);

            for (int x = 0; x < tiles.GetLength(0); x++)
                for (int y = 0; y < tiles.GetLength(1); y++)
                {
                    var tile = tiles[x, y];
                    var neighbours = new Point[4] { new Point(x - 1, y), new Point(x, y - 1), new Point(x + 1, y), new Point(x, y + 1) };
                    foreach (Point neighbour in neighbours)
                        if (neighbour.X >= 0 && neighbour.X < tiles.GetLength(0) && neighbour.Y >= 0 && neighbour.Y < tiles.GetLength(1))
                            tile.Neighbours.Add(tiles[neighbour.X, neighbour.Y]);
                }

            foreach (Tile tile in tiles)
                game.Board.Nodes.Add(tile.Id, tile);

            var unitFactory = new UnitTemplateFactory();

            var player1 = new AdvanceWarsPlayer();
            player1.Name = "Frank";
            player1.Gold = 50000;
            player1.CO = coFactory.Andy;

            var player2 = new AdvanceWarsPlayer();
            player2.Name = "Evert";
            player2.Color = "Yellow";
            player2.Team = 1;
            player2.Gold = 2000;
            player2.CO = coFactory.Andy;
            game.Players.Add(player1);
            game.Players.Add(player2);

            unitFactory.GetInfantryTemplate().GenerateUnit(game, tiles[0, 0], player1);
            unitFactory.GetInfantryTemplate().GenerateUnit(game, tiles[0, 3], player2);



            var turnResolver = new TurnResolver(new List<AdvanceWarsPlayer>() { player1, player2 }, game);
            var endTurnButtonPlayer1 = new EndTurnButton(game, turnResolver, player1);
            game.Pieces.Add(endTurnButtonPlayer1.Id, endTurnButtonPlayer1);
            var endTurnButtonPlayer2 = new EndTurnButton(game, turnResolver, player2);
            game.Pieces.Add(endTurnButtonPlayer2.Id, endTurnButtonPlayer2);

            var building = new Building(1, 0, turnResolver);
            building.Owner = player1;
            game.Board.Nodes.Remove(tiles[1, 0].Id);
            game.Board.Nodes.Add(building.Id, building);
            building.Neighbours = tiles[1, 0].Neighbours;
            foreach (var neighbour in building.Neighbours)
            {
                neighbour.Neighbours.Remove(tiles[1, 0]);
                neighbour.Neighbours.Add(building);
            }

            var factory = new ProducingBuilding(2, 0, turnResolver, game, 1000, TileType.Factory);
            var listing = new ProducingBuildingListing("Infantry", unitFactory.GetInfantryTemplate(), 3000, "Infantry", "Idle1");
            var listing2 = new ProducingBuildingListing("OverpricedInfantry", unitFactory.GetMechTemplate(), 5000, "Overpriced infantry", "Idle1");
            var listings = new Dictionary<string, ProducingBuildingListing>();
            listings.Add(listing.Id, listing);
            listings.Add(listing2.Id, listing2);
            player1.Listings.Add(BuildingType.factory, listings);
            player2.Listings.Add(BuildingType.factory, listings);
            factory.Owner = player1;
            game.Board.Nodes.Remove(tiles[2, 0].Id);
            game.Board.Nodes.Add(factory.Id, factory);
            factory.Neighbours = tiles[2, 0].Neighbours;
            foreach (var neighbour in factory.Neighbours)
            {
                neighbour.Neighbours.Remove(tiles[2, 0]);
                neighbour.Neighbours.Add(factory);
            }

            var building2 = new Building(3, 0, turnResolver);
            building2.Owner = player2;
            game.Board.Nodes.Remove(tiles[3, 0].Id);
            game.Board.Nodes.Add(building2.Id, building2);
            building2.Neighbours = tiles[3, 0].Neighbours;
            foreach (var neighbour in building2.Neighbours)
            {
                neighbour.Neighbours.Remove(tiles[3, 0]);
                neighbour.Neighbours.Add(building2);
            }

            var forest = new Tile(3, 3, TileType.Forest, 2, MovementCosts.GetMovementCosts(TileType.Forest));
            game.Board.Nodes.Remove(tiles[3, 3].Id);
            game.Board.Nodes.Add(forest.Id, forest);
            forest.Neighbours = tiles[3, 3].Neighbours;
            foreach (var neighbour in forest.Neighbours)
            {
                neighbour.Neighbours.Remove(tiles[3, 3]);
                neighbour.Neighbours.Add(forest);
            }

            turnResolver.StartTurn();
            return game;
        }
    }
}