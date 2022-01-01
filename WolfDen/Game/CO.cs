using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game.Tiles;

namespace WolfDen.Game
{
    public class CO
    {
        public string Class { get { return GetType().Name; } }
        public string Name { get; set; }
        public int Attack { get; set; }
        public int Defence { get; }
        public Dictionary<BuildingType, Dictionary<string, ProducingBuildingListing>> Listings { get; set; } = new Dictionary<BuildingType, Dictionary<string, ProducingBuildingListing>>();

        public CO(string name, int attack, int defence)
        {
            Name = name;
            Attack = attack;
            Defence = defence;
        }
    }
}