using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WolfDen.Hubs;
using WolfDen.Lobbies.LobbyBehaviour;
using WolfDen.Models;

namespace WolfDen.Lobbies.AdvanceWarsLobbies
{
    public class AdvanceWarsLobby : Lobby
    {
        public List<AdvanceWarsSlot> AdvanceWarsSlots { get; set; }

        public new AdvanceWarsSlot GetSlot(Guid id) => AdvanceWarsSlots.FirstOrDefault(s => s.Id == id);

        public AdvanceWarsLobby(string name, List<AdvanceWarsSlot> advanceWarsSlots, Map map, IHubContext<LobbyHub, ILobbyClient> hub) : base(name, advanceWarsSlots.ConvertAll(s => (Slot)s), map, hub)
        {
            AdvanceWarsSlots = advanceWarsSlots;
        }

        public static AdvanceWarsLobby CreateLobby(string name, Map map, IHubContext<LobbyHub, ILobbyClient> hub, int[] teams, List<PlayerColor> colors, List<string> commanders)
        {
            return new AdvanceWarsLobby(name, CreateSlots(teams, colors, commanders), map, hub);
        }

        private static List<AdvanceWarsSlot> CreateSlots(int[] teams, List<PlayerColor> colors, List<string> commanders)
        {
            var slots = new List<AdvanceWarsSlot>();
            var remainingColors = colors.Skip(teams.Length).ToList();
            for (int i = 0; i < teams.Length; i++)
            {
                slots.Add(new AdvanceWarsSlot(teams[i], colors[i], colors, remainingColors, commanders));
            }
            return slots;
        }
    }
}
