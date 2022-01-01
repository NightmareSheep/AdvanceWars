using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WolfDen.Lobbies;

namespace WolfDen.Hubs
{
    public interface ILobbyClient
    {
        Task GetMessage(string message);
        Task Ready(string connectionId, bool ready);
        Task Leave(string connectionId);
        Task Join(LobbyPlayer player, int index);
        Task Start(string serializedLobby);
        Task Switch(Guid positionId, Guid destinationId);
        Task ChangeColor(Guid slotId, int colorId);
        Task ChangeCommander(Guid slotId, string commander);
        Task StartGame();
    }
}
