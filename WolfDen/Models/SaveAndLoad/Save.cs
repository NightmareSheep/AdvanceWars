using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WolfDen.Models.SaveAndLoad
{
    public class Save
    {
        public int SaveId { get; set; }
        public string Name { get; set; }
        public byte[] CompressedMoves { get; set; }
        public List<SavedAdvanceWarsPlayer> Players { get; set; } = new List<SavedAdvanceWarsPlayer>();
        public int MapId { get; set; }
        public int Seed { get; set; }

    }
}
