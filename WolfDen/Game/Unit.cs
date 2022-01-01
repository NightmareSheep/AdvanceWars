using System;
using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;
using WolfDen.Game.Tiles;
using WolfDen.Game.Interfaces;

namespace WolfDen.Game
{
    public partial class Unit : Piece, IActive
    {
        public string Class { get { return GetType().Name; } }
        public bool Active { get; set; } = false;
        public Dictionary<string, string> Resources { get; set; } = new Dictionary<string, string>();
        [JsonIgnore]
        public Tile Tile { get { return (Tile)Node; } }

        public Unit(Game game) : base(game) { }

        public override bool ExecuteMove(dynamic data)
        {
            if (Active && Game.TurnResolver.PlayerIsActive(Owner) && base.ExecuteMove(data as object))
            {
                Active = false;
                return true;
            }
            return false;
        }


    }
}
