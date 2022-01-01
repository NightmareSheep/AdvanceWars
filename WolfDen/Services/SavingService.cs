using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Threading.Tasks;
using WolfDen.Data;
using WolfDen.Game;
using WolfDen.Models;
using WolfDen.Models.SaveAndLoad;

namespace WolfDen.Services
{
    public class SavingService : ISavingService
    {
        private readonly ISerializationService _serializationService;
        private readonly ApplicationDbContext _context;

        public SavingService(ISerializationService serializationService, ApplicationDbContext context)
        {
            _serializationService = serializationService;
            _context = context;
        }

        

        public Save GetSave(string name, AdvanceWarsGame game)
        {
            if (name == null || game == null)
                return null;

            var save = new Save()
            {
                MapId = game.AdvancewarsBoard.MapId,
                Name = name,
                Seed = game.Seed
            };
            foreach (var player in game.AdvancewarsPlayers)
            {
                save.Players.Add(new SavedAdvanceWarsPlayer() { CoName = player.CoName, Color = player.Color, Team = player.Team, UserId = player.Id, Username = player.Name });
            }
            var moves = game.History.Moves.Select(m => {
                return new SerializableMove() { UserId = m.UserId, Data = (m.Data as JObject).ToString(Newtonsoft.Json.Formatting.None) };
            }).ToList();
            var compressedMoves = _serializationService.Serialize(moves);
            save.CompressedMoves = compressedMoves;
            return save;
        }

        public async Task Save(string userId, string name, AdvanceWarsGame game) => await Save(userId, GetSave(name, game));

        public async Task Save(string userId, Save save)
        {
            var user = await _context.Users.Where(u => u.Id == userId).Include(u => u.Saves).FirstOrDefaultAsync();
            if (user == null)
                return;

            var duplicates = user.Saves.Where(s => s.Name == save.Name).ToList();
            foreach(var duplicate in duplicates)
            {
                user.Saves.Remove(duplicate);
            }
            user.Saves.Add(save);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSave(string userId, int saveId)
        {
            var user = await _context.Users.Where(u => u.Id == userId).Include(u => u.Saves).FirstOrDefaultAsync();
            if (user == null)
                return;

            var save = user.Saves.Find(s => s.SaveId == saveId);
            if (save != null)
            {
                user.Saves.Remove(save);
                await _context.SaveChangesAsync();
            }
        }


    }
}
