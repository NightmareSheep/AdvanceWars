using System;
using System.Collections.Generic;
using System.Linq;
using WolfDen.Models;

namespace WolfDen.Lobbies.LobbyBehaviour
{
    public class SlotColor
    {
        public string Class { get { return GetType().Name; } }
        public Guid Id { get; } = Guid.NewGuid();
        public PlayerColor Color { get; set; }
        public List<PlayerColor> Colors { get; set; }
        public List<PlayerColor> AvailableColors { get; set; }
        public Slot Slot { get; set; }

        public SlotColor(Slot slot, List<PlayerColor> colors, List<PlayerColor> availableColors, PlayerColor playerColor)
        {
            Colors = colors;
            AvailableColors = availableColors;
            Color = playerColor;
            Slot = slot;
        }

        public bool ChangeColor(string ConnectionId, int colorId)
        {
            if (Slot?.LobbyPlayer?.ConnectionId != ConnectionId)
                return false;

            var newColor = AvailableColors.Where(c => c.ID == colorId).FirstOrDefault();
            if (newColor != null)
            {
                AvailableColors.Add(Color);
                AvailableColors.Remove(newColor);
                Color = newColor;
                return true;
            }
            return false;
        }
    }
}