using System.Threading.Tasks;
using System;
using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using WolfDen.Other;
using WolfDen.Services;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using WolfDen.Game;
using Microsoft.Extensions.Configuration;
using WolfDen.Models.SaveAndLoad;

//TODO: Implements error messages for if things go wrong.

namespace WolfDen.Hubs
{
    public class GameHub : Hub<IGameClient>
    {
        public const string GamePrefix = "game_";
        public static readonly ConcurrentDictionary<Guid, object> Locks = new ConcurrentDictionary<Guid, object>();
        public static readonly ConcurrentDictionary<Guid, Game.Game> Games = new ConcurrentDictionary<Guid, Game.Game>();
        private readonly SanityService sanityService;
        private readonly ISavingService savingService;
        private readonly IConfiguration configuration;

        protected string _queryStringParameter { get { return Statics.GameQueryParameter; } }
        
        public GameHub(SanityService sanityService, ISavingService savingService, IConfiguration configuration)
        {
            this.sanityService = sanityService;
            this.savingService = savingService;
            this.configuration = configuration;
        }

        public void ExecuteMove(dynamic data)
        {
            var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            GameOperation(GetGameId(), (game) =>
            {
                
                if (game.ExecuteMove(userId, data))
                {
                    var sanityId = sanityService.GetSanityId(game as AdvanceWarsGame);
                    Clients.Group(GamePrefix + game.Id.ToString()).ExecuteMove(data, sanityId);
                }
            });
        }

        public void Next()
        {
            var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            GameOperation(GetGameId(), (game) =>
            {
                
                if (game.History.Replay.Next())
                {
                    var move = game.History.Moves[game.History.Replay.CurrentMove - 1];
                    var sanityId = sanityService.GetSanityId(game as AdvanceWarsGame);
                    Clients.Group(GamePrefix + game.Id.ToString()).ExecuteMove(move.Data, sanityId);
                }
            });
        }

        public async Task SanityCheckFailed()
        {
            Save save = null;
            GameOperation(GetGameId(), (game) =>
            {
                save = savingService.GetSave("Failed sanity check: " + game.Id.ToString(), game as AdvanceWarsGame);
            });
            var adminUserId = configuration.GetValue<string>("AdminUserId");
            if (save == null || adminUserId == null)
                return;
            
            await savingService.Save(adminUserId,save);
        }

        public int GetRandom(string id)
        {
            int random = -1;
            GameOperation(GetGameId(), (game) =>
            {
                random = game.GetRandom(id);
            });
            return random;
        }

        public override async Task OnConnectedAsync()
        {
            GameOperation(GetGameId(), (game) =>
            {
                Groups.AddToGroupAsync(Context.ConnectionId, GamePrefix + game.Id.ToString());
                Clients.Client(Context.ConnectionId).Start(game);
            });
            await base.OnConnectedAsync();
        }

        public static void GameOperation(Guid gameId, Action<Game.Game> action)
        {
            object lockObject = new object();
            Game.Game game;
            Locks.TryGetValue(gameId, out lockObject);
            Games.TryGetValue(gameId, out game);
            if (lockObject != null && game != null)
                lock (lockObject)
                    action(game);
        }

        public static void RemoveGame(Guid gameId)
        {
            GameOperation(gameId, (game) =>
            {
                Locks.TryRemove(gameId, out var o);
                Games.TryRemove(gameId, out var g);
            });
        }

        private Guid GetGameId()
        {
            return new Guid(Context.GetHttpContext().Request.Query[_queryStringParameter].ToString());
        }
    }
}
