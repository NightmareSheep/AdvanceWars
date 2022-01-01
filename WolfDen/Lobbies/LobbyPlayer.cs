using System;
using Newtonsoft.Json;

namespace WolfDen.Lobbies
{
    public class LobbyPlayer
    {
        public string Class { get { return GetType().Name; } }
        public string Id { get; set; }
        public string ConnectionId { get; set; }
        public string Name { get; set; }
        public bool Ready { get; set; }

        public LobbyPlayer(string id, string connectionId, string name)
        {
            Id = id;
            ConnectionId = connectionId;
            Name = name;
        }
    }
}