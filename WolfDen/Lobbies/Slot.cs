using System;
using WolfDen.Lobbies.LobbyBehaviour;

namespace WolfDen.Lobbies
{
    public class Slot
    {
        public string Class { get { return GetType().Name; } }
        public Guid Id { get; } = Guid.NewGuid();
        public int Team { get; set; }
        public LobbyPlayer LobbyPlayer { get; set; }

        public Slot(int team) {
            Team = team;
        }

        
    }
}