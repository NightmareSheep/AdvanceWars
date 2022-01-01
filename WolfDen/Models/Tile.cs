using WolfDen.Game;
using WolfDen.Game.Tiles;

namespace WolfDen.Models
{
    public class Tile
    {
        public int MapID { get; set; }
        public int ID { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public TileType tileType { get; set; }
        public short Owner { get; set; } = -1;

        public UnitType Unit { get; set; } = UnitType.None;
        public short UnitOwner { get; set; } = -1;
    }
}