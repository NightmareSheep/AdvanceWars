using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WolfDen.Data;
using WolfDen.Game;
using WolfDen.Game.Factories;
using WolfDen.Game.Other.History;
using WolfDen.Models.SaveAndLoad;
using Microsoft.EntityFrameworkCore;
using WolfDen.Hubs;


namespace WolfDen.Services
{
    public class LoadService
    {
        private readonly ISerializationService serializationService;
        private readonly ApplicationDbContext context;

        public LoadService(ISerializationService serializationService, ApplicationDbContext context)
        {
            this.serializationService = serializationService;
            this.context = context;
        }

        public async Task<Game.Game> GetInitialGame(Save save)
        {
            var map = await context.Maps.Include(m => m.Tiles).FirstOrDefaultAsync(m => m.ID == save.MapId);
            if (map == null)
                throw new Exception("Map not found while loading");

            var players = save.Players.Select(p => new AdvanceWarsPlayer() { Id = p.UserId, Name = p.Username, Team = p.Team, Color = p.Color, CoName = p.CoName }).ToList();
            var gameFactory = new GameFactory();
            var game = gameFactory.GetGame(map, players);
            game.Id = Guid.NewGuid();
            game.SetRandom(save.Seed);
            return game;
        }

        public async Task<Guid> Load(Save save)
        {
            var game = await GetInitialGame(save);
            var serializableMoves = serializationService.Deserialize(save.CompressedMoves) as List<SerializableMove>;
            var moves = serializableMoves.Select(m => new Move() { UserId = m.UserId, Data = JObject.Parse(m.Data) });
            foreach (var move in moves)
            {
                game.ExecuteMove(move.UserId, move.Data);
            }

            GameHub.Locks.TryAdd(game.Id, new object());
            GameHub.Games.TryAdd(game.Id, game);
            return game.Id;
        }

        public async Task<Guid> LoadReplay(Save save)
        {
            var game = await GetInitialGame(save);
            var serializableMoves = serializationService.Deserialize(save.CompressedMoves) as List<SerializableMove>;
            var moves = serializableMoves.Select(m => new Move() { UserId = m.UserId, Data = JObject.Parse(m.Data) });
            game.History.Moves = moves.ToList();
            game.History.Replay = new Replay(game.History, game);

            GameHub.Locks.TryAdd(game.Id, new object());
            GameHub.Games.TryAdd(game.Id, game);
            return game.Id;
        }
    }
}
