using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game.Other;
using WolfDen.Game.Tiles;

namespace WolfDen.Game
{
    public class AdvanceWarsPlayer
    {
        public string Class { get { return GetType().Name; } }
        public string Id { get; set; }
        public List<Piece> Pieces = new List<Piece>();
        public string Name { get; set; }

        public string Color { get; set; } = "Orange";
        public byte Team { get; set; }
        public bool Defeated { get; set; }

        public int Gold { get; set; }
        public CO CO { get; set; }
        public string CoName { get; set; }
        public Dictionary<BuildingType, Dictionary<string, ProducingBuildingListing>> Listings => CO.Listings;
        public RepairCoordinator RepairCoordinator { get; set; }


        public AdvanceWarsPlayer()
        {
            RepairCoordinator = new RepairCoordinator(this);
        }
    }
}