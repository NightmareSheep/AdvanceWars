using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WolfDen.Models
{
    public class SavedAdvanceWarsPlayer
    {
        public int SavedAdvanceWarsPlayerId { get; set; }
        public string Color { get; set; } = "Orange";
        public byte Team { get; set; }
        public string CoName { get; set; }
        public string UserId { get; set; }
        public string Username { get; set; }
    }
}
