using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WolfDen.Other;
using WolfDen.Lobbies;
using System.Security.Claims;
using System.IO;
using WolfDen.Lobbies.AdvanceWarsLobbies;
using Newtonsoft.Json;
using WolfDen.Models;
using WolfDen.Services;

namespace WolfDen.Hubs
{
    public class LobbyHub : Hub<ILobbyClient>
    {
        protected string HubPrefix { get { return Statics.LobbyPrefix; } }
        protected string _queryStringParameter { get { return Statics.LobbyQueryParameter; } }
        private UserManager<ApplicationUser> _userManager;
        private readonly IAutosaveService _autosaveService;

        public LobbyHub(UserManager<ApplicationUser> userManager, IAutosaveService autosaveService)
        {
            _userManager = userManager;
            _autosaveService = autosaveService;
        }

        public override async Task OnConnectedAsync()
        {
            var objectId = new Guid(Context.GetHttpContext().Request.Query[_queryStringParameter].ToString());
            var user = await _userManager.GetUserAsync(Context.User);
            ConcurrencyObjects.ConcurentOperation(objectId, (obj) => {
                var lobby = (Lobby)obj;
                var userId = user.Id;
                var username = user.DisplayName;
                var lobbyPlayer = new LobbyPlayer(userId, Context.ConnectionId, username);
                var index = -1;
                var joinSuccesfull = lobby?.Join(lobbyPlayer, out index) ?? false;
                if (joinSuccesfull)
                    Clients.Group(HubPrefix + lobby.Id.ToString()).Join(lobbyPlayer, index);
                Groups.AddToGroupAsync(Context.ConnectionId, HubPrefix + lobby.Id.ToString());

                var serializer = new JsonSerializer();
                serializer.PreserveReferencesHandling = PreserveReferencesHandling.All;
                serializer.ReferenceLoopHandling = ReferenceLoopHandling.Serialize;
                string serializedLobby;
                using (StringWriter sw = new StringWriter())
                using (JsonWriter writer = new JsonTextWriter(sw))
                {
                    serializer.Serialize(writer, lobby);
                    serializedLobby = sw.ToString();
                }

                Clients.Client(Context.ConnectionId).Start(serializedLobby);

            });
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var objectId = new Guid(Context.GetHttpContext().Request.Query[_queryStringParameter].ToString());
            ConcurrencyObjects.ConcurentOperation(objectId, (obj) => {
                var lobby = (Lobby)obj;
                lobby.Leave(Context.ConnectionId);
                Clients.Group(HubPrefix + lobby.Id.ToString()).Leave(Context.ConnectionId);
                if (lobby.IsEmpty())
                    ConcurrencyObjects.RemoveObjectWithoutLocking(objectId);
            });
            await base.OnDisconnectedAsync(exception);
        }

        public void Ready(string lobbyId, bool ready)
        {
            ConcurrencyObjects.ConcurentOperation(new Guid(lobbyId), (obj) =>
            {
                var lobby = obj as Lobby;
                if (!lobby.Ready(Context.ConnectionId, ready))
                    Clients.Group(HubPrefix + lobby.Id.ToString()).Ready(Context.ConnectionId, ready);
                else
                {
                    Clients.Group(HubPrefix + lobby.Id.ToString()).StartGame();
                    Game.Game game;
                    if (GameHub.Games.TryGetValue(lobby.Id, out game))
                        _autosaveService.RegisterGame(game);
                }

            });
        }

        public async void SendMessage(string lobbyId, string message)
        {
            var user = await _userManager.GetUserAsync(Context.User);
            var username = user.DisplayName;          
            Clients.Group(HubPrefix + lobbyId)?.GetMessage(username + ": " + message);
        }

        public void Switch(Guid lobbyId, Guid positionId, Guid destinationId)
        {
            ConcurrencyObjects.ConcurentOperation<Lobby>(lobbyId, (lobby) =>
            {
                if (lobby.Switch(Context.ConnectionId, positionId, destinationId))
                    Clients.Group(HubPrefix + lobby.Id.ToString()).Switch(positionId, destinationId);
            });
        }
    }
}
