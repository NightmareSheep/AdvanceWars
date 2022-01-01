using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WolfDen.Lobbies.AdvanceWarsLobbies;
using WolfDen.Models;
using WolfDen.Other;
using WolfDen.Services;

namespace WolfDen.Hubs
{
    public class AdvanceWarsLobbyHub : LobbyHub
    {
        public AdvanceWarsLobbyHub(UserManager<ApplicationUser> userManager, IAutosaveService autosaveService) :  base(userManager, autosaveService)
        {

        }

        public void ChangeColor(Guid lobbyId, Guid slotId, int colorId)
        {
            ConcurrencyObjects.ConcurentOperation<AdvanceWarsLobby>(lobbyId, (lobby) =>
            {
                if (lobby?.GetSlot(slotId)?.Color?.ChangeColor(Context.ConnectionId, colorId) ?? false)
                    Clients.Group(HubPrefix + lobby.Id.ToString()).ChangeColor(slotId, colorId);
            });
        }

        public void ChangeCommander(Guid lobbyId, Guid slotId, string commander)
        {
            ConcurrencyObjects.ConcurentOperation<AdvanceWarsLobby>(lobbyId, (lobby) =>
            {
                if (lobby?.GetSlot(slotId)?.Commander?.ChangeCommander(Context.ConnectionId, commander) ?? false)
                    Clients.Group(HubPrefix + lobby.Id.ToString()).ChangeCommander(slotId,commander);
            });
        }
    }
}
