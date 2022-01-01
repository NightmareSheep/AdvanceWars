using System.Collections.Generic;

namespace WolfDen.Models
{
    public class Map
    {
        public string Name { get; set; }
        public int NumberOfPlayers { get; set; }
        public string Thumbnail { get; set; }
        public int ID { get; set; }
        public List<Tile> Tiles { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
    }
}