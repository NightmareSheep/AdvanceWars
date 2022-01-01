using System.Collections.Generic;
using WolfDen.Lobbies.LobbyBehaviour;
using WolfDen.Models;

namespace WolfDen.Lobbies.AdvanceWarsLobbies
{
    public class AdvanceWarsSlot : Slot
    {
        public SlotColor Color { get; set; }
        
        public SlotCommander Commander { get; set; }

        public AdvanceWarsSlot(int team, SlotColor color, SlotCommander commander) : base(team)
        {
            Color = color;
            Commander = commander;
        }
        
        public AdvanceWarsSlot(int team, PlayerColor color, List<PlayerColor> colors, List<PlayerColor> availableColors, List<string> commanders) : base(team)
        {
            Color = new SlotColor(this, colors, availableColors, color);
            Commander = new SlotCommander(this, commanders);
        }
    }
}
