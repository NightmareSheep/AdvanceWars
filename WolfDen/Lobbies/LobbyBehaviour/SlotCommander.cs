using System;
using System.Collections.Generic;

namespace WolfDen.Lobbies.LobbyBehaviour
{
    public class SlotCommander
    {
        public string Class { get { return GetType().Name; } }
        public Slot Slot { get; }
        public string Commander { get; set; }
        public List<string> AvailableCommanders;

        public SlotCommander(Slot slot, List<string> availableCommanders)
        {
            Slot = slot;
            if (availableCommanders == null || availableCommanders.Count == 0)
                throw new Exception("Slot initialized with no commanders");
            AvailableCommanders = availableCommanders;
            Commander = AvailableCommanders[0];
        }

        public bool ChangeCommander(string connectionId, string commander)
        {
            if (Slot?.LobbyPlayer?.ConnectionId == connectionId && AvailableCommanders.Contains(commander))
            {
                Commander = commander;
                return true;
            }
            return false;
        }
    }
}
