using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;
using WolfDen.Models;

namespace WolfDen.Other
{
    public class Seed
    {
        public List<Map> Maps = new List<Map>();
        public List<PlayerColor> Colors = new List<PlayerColor>();

        private Color[] GenerateTints(Color source)
        {
            var colors = new Color[6];
            colors[0] = Tint(source, Color.White, 0.8m);
            colors[1] = Tint(source, Color.White, 0.4m);
            colors[2] = source;
            colors[3] = Tint(source, Color.Black, 0.1m);
            colors[4] = Tint(source, Color.Black, 0.2m);
            colors[5] = Tint(source, Color.Black, 0.8m);
            return colors;
        }

        private Color Tint(Color source, Color tint, decimal alpha)
        {
            //(tint -source)*alpha + source
            var red = Convert.ToInt32(((tint.R - source.R) * alpha + source.R));
            var blue = Convert.ToInt32(((tint.B - source.B) * alpha + source.B));
            var green = Convert.ToInt32(((tint.G - source.G) * alpha + source.G));
            return Color.FromArgb(255, red, green, blue);
        }

        private string ToHexString(Color c) => $"{c.R:X2}{c.G:X2}{c.B:X2}";

        public Seed()
        {
            var map = new Map { ID = 1, Name = "2 Player", NumberOfPlayers = 2 };
            map.Tiles = new List<Tile>
            {
                new Tile { X = 0, Y = 0, tileType = Game.Tiles.TileType.HQ, Owner = 0 },
                new Tile { X = 1, Y = 0, tileType = Game.Tiles.TileType.Factory, Owner = 0 },
                new Tile { X = 2, Y = 0, tileType = Game.Tiles.TileType.Airfield, Owner = 0 },
                new Tile { X = 3, Y = 0 },
                new Tile { X = 4, Y = 0, tileType = Game.Tiles.TileType.Pipe },
                new Tile { X = 5, Y = 0 },
                new Tile { X = 6, Y = 0, tileType = Game.Tiles.TileType.Shipyard, Owner = 0 },

                new Tile { X = 0, Y = 1 },
                new Tile { X = 1, Y = 1 },
                new Tile { X = 2, Y = 1 },
                new Tile { X = 3, Y = 1 },
                new Tile { X = 4, Y = 1, tileType = Game.Tiles.TileType.Pipe },
                new Tile { X = 5, Y = 1 },
                new Tile { X = 6, Y = 1, tileType = Game.Tiles.TileType.Sea },

                new Tile { X = 0, Y = 2 },
                new Tile { X = 1, Y = 2 },
                new Tile { X = 2, Y = 2 },
                new Tile { X = 3, Y = 2 },
                new Tile { X = 4, Y = 2, tileType = Game.Tiles.TileType.DestroyedPipe },
                new Tile { X = 5, Y = 2 },
                new Tile { X = 6, Y = 2, tileType = Game.Tiles.TileType.Reef },

                new Tile { X = 0, Y = 3 },
                new Tile { X = 1, Y = 3, tileType = Game.Tiles.TileType.Factory, Owner = 0 },
                new Tile { X = 2, Y = 3, tileType = Game.Tiles.TileType.Factory, Owner = 1 },
                new Tile { X = 3, Y = 3, tileType = Game.Tiles.TileType.HQ, Owner = 1 },
                new Tile { X = 4, Y = 3, tileType = Game.Tiles.TileType.Pipe },
                new Tile { X = 5, Y = 3 },
                new Tile { X = 6, Y = 3, tileType = Game.Tiles.TileType.Beach },
            };

            map.Width = 4;
            map.Height = 4;
            Maps.Add(map);

            // Map 2 ---
            var map2 = new Map { ID = 2, Name = "Island duel", NumberOfPlayers = 2, Thumbnail = "http://photos1.blogger.com/blogger/5409/1375/320/vs%20synk%20day%205.gif" };
            map2.Tiles = new List<Tile>();

            var map2Tiles = new int[,] {
                { 9,9,9,9,9,    9,9,9,9,9,    9,9,9,9,9,      9,9,9,9, },
                { 9,9,9,9,9,    9,9,9,9,9,    9,9,0,11,0,     -1,0,11,9, },
                { 9,9,9,9,9,    9,9,9,4,1,    1,1,1,1,1,      1,-1,0,9, },
                { 9,9,9,9,9,    9,9,12,0,1,   0,11,0,4,4,     0,0,-1,9, },
                { 9,9,9,9,9,    11,0,11,11,1, 4,0,0,11,0,     11,0,9,9, },
            };
            map2.Width = 19;
            map2.Height = 10;

            for (int x = 0; x < map2Tiles.GetLength(1); x++)
                for (int y = 0; y < map2Tiles.GetLength(0); y++)
                {
                    if (map2Tiles[y, x] == -1)
                        continue;
                    map2.Tiles.Add(new Tile { X = x, Y = y, tileType = (Game.Tiles.TileType)map2Tiles[y, x] });
                    map2.Tiles.Add(new Tile { X = map2Tiles.GetLength(1) - 1 - x, Y = map2Tiles.GetLength(0) * 2 - 1 - y, tileType = (Game.Tiles.TileType)map2Tiles[y, x] });
                }

            map2.Tiles.Add(new Tile { X = 1, Y = 6, tileType = Game.Tiles.TileType.City, Owner = 0 });
            map2.Tiles.Add(new Tile { X = 2, Y = 7, tileType = Game.Tiles.TileType.HQ, Owner = 0 });
            map2.Tiles.Add(new Tile { X = 3, Y = 8, tileType = Game.Tiles.TileType.Factory, Owner = 0 });

            map2.Tiles.Add(new Tile { X = 15, Y = 1, tileType = Game.Tiles.TileType.Factory, Owner = 1 });
            map2.Tiles.Add(new Tile { X = 16, Y = 2, tileType = Game.Tiles.TileType.HQ, Owner = 1 });
            map2.Tiles.Add(new Tile { X = 17, Y = 3, tileType = Game.Tiles.TileType.City, Owner = 1 });

            Maps.Add(map2);
            // End Map 2 ---

            // Map 3 ---
            var map3 = new Map { ID = 3, Name = "Mountain conflict 4P", NumberOfPlayers = 4, Thumbnail = "http://photos1.blogger.com/blogger/5409/1375/320/vs%20synk%20day%205.gif" };
            map3.Tiles = new List<Tile>();

            var map3Tiles = new int[,] {
                { -1,-1, 0, 0, 0,12,12 },
                { -1, 6, 0, 4,11,12, 0 },
                {  0, 0, 4,11,11,11,11 },
                { 12,12, 0, 0,11, 0,11 },
                { 12, 4,11, 0, 0,11, 4 },
            };
            map3.Width = 14;
            map3.Height = 10;

            for (int x = 0; x < map3Tiles.GetLength(1); x++)
                for (int y = 0; y < map3Tiles.GetLength(0); y++)
                {
                    if (map3Tiles[y, x] == -1)
                        continue;
                    map3.Tiles.Add(new Tile { X = x, Y = y, tileType = (Game.Tiles.TileType)map3Tiles[y, x] });
                    map3.Tiles.Add(new Tile { X = map3.Width - 1 - x, Y = y, tileType = (Game.Tiles.TileType)map3Tiles[y, x] });
                    map3.Tiles.Add(new Tile { X = x, Y = map3.Height - 1 - y, tileType = (Game.Tiles.TileType)map3Tiles[y, x] });
                    map3.Tiles.Add(new Tile { X = map3.Width - 1 - x, Y = map3.Height - 1 - y, tileType = (Game.Tiles.TileType)map3Tiles[y, x] });
                }

            map3.Tiles.Add(new Tile { X = 0, Y = 0, tileType = Game.Tiles.TileType.HQ, Owner = 0 });
            map3.Tiles.Add(new Tile { X = 1, Y = 0, tileType = Game.Tiles.TileType.Factory, Owner = 0 });
            map3.Tiles.Add(new Tile { X = 0, Y = 1, tileType = Game.Tiles.TileType.Factory, Owner = 0 });

            map3.Tiles.Add(new Tile { X = 13, Y = 0, tileType = Game.Tiles.TileType.HQ, Owner = 1 });
            map3.Tiles.Add(new Tile { X = 12, Y = 0, tileType = Game.Tiles.TileType.Factory, Owner = 1 });
            map3.Tiles.Add(new Tile { X = 13, Y = 1, tileType = Game.Tiles.TileType.Factory, Owner = 1 });

            map3.Tiles.Add(new Tile { X = 0, Y = 9, tileType = Game.Tiles.TileType.HQ, Owner = 2 });
            map3.Tiles.Add(new Tile { X = 0, Y = 8, tileType = Game.Tiles.TileType.Factory, Owner = 2 });
            map3.Tiles.Add(new Tile { X = 1, Y = 9, tileType = Game.Tiles.TileType.Factory, Owner = 2 });

            map3.Tiles.Add(new Tile { X = 13, Y = 9, tileType = Game.Tiles.TileType.HQ, Owner = 3 });
            map3.Tiles.Add(new Tile { X = 13, Y = 8, tileType = Game.Tiles.TileType.Factory, Owner = 3 });
            map3.Tiles.Add(new Tile { X = 12, Y = 9, tileType = Game.Tiles.TileType.Factory, Owner = 3 });

            Maps.Add(map3);
            // End Map 3 ---

            // Map 4 ---
            map = new Map { ID = 4, Name = "River plains 3P", NumberOfPlayers = 3, Thumbnail = "http://photos1.blogger.com/blogger/5409/1375/320/vs%20synk%20day%205.gif" };
            map.Tiles = new List<Tile>();

            var tiles = new int[,] {
                {  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
                {  0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 2, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0 },
                {  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0 },
                {  0, 0, 1, 0, 0, 0, 0, 0, 0, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 },
                {  0,-1, 1,-1, 0, 4, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0,-1, 1,-1, 0 },
                {  0, 0, 1, 0, 0, 0, 0, 0, 5, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 },
                {  0,-1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 4, 0, 0, 0, 0, 0, 1,-1, 0 },
                {  0,-1, 1,-1, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 4, 0, 0, 0,-1, 1,-1, 0 },
                {  0,-1, 1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1,-1, 0 },
                {  0, 0, 1, 0, 0, 0, 2, 4, 0, 0, 2, 0, 5, 0, 0, 0, 0, 0, 0, 1, 0, 0 },
                {  0, 0, 1, 0, 0, 0, 2, 0, 4, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 },
                {  0,-1, 1,-1, 0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0,-1, 1,-1, 0 },
                {  0, 0, 1, 0, 0, 0, 2, 0, 5, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0 },
                {  0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0 },
                {  0, 0, 1, 0, 0, 0, 2, 0, 0, 4, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0 },
                {  0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0,-1, 4, 0, 0, 0, 2, 0, 0, 1, 0, 0 },
                {  0, 0, 1, 0, 0, 0, 2, 0, 0,-1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0 },
                {  4, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0,-1, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0 },
                {  0, 0, 1, 0, 0, 4, 2, 0, 0, 0,-1, 0, 0, 0, 0, 0, 2, 4, 0, 1, 0, 0 },
                {  0, 0, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 0, 0 },
                {  0, 4, 0, 0, 0, 0, 2,-1, 0,-1,-1,-1, 0, 0, 0,-1, 2, 0, 0, 0, 4, 0 },
                {  0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0 },
            };
            map.Width = 22;
            map.Height = 22;

            for (int x = 0; x < tiles.GetLength(1); x++)
                for (int y = 0; y < tiles.GetLength(0); y++)
                {
                    if (tiles[y, x] == -1)
                        continue;
                    map.Tiles.Add(new Tile { X = x, Y = y, tileType = (Game.Tiles.TileType)tiles[y, x] });
                }

            map.Tiles.Add(new Tile { X = 1, Y = 4, tileType = Game.Tiles.TileType.City, Owner = 0 });
            map.Tiles.Add(new Tile { X = 3, Y = 4, tileType = Game.Tiles.TileType.City, Owner = 0 });
            map.Tiles.Add(new Tile { X = 1, Y = 6, tileType = Game.Tiles.TileType.Factory, Owner = 0 });
            map.Tiles.Add(new Tile { X = 1, Y = 7, tileType = Game.Tiles.TileType.HQ, Owner = 0 });
            map.Tiles.Add(new Tile { X = 3, Y = 7, tileType = Game.Tiles.TileType.Factory, Owner = 0 });
            map.Tiles.Add(new Tile { X = 1, Y = 8, tileType = Game.Tiles.TileType.Factory, Owner = 0 });
            map.Tiles.Add(new Tile { X = 1, Y = 11, tileType = Game.Tiles.TileType.City, Owner = 0 });
            map.Tiles.Add(new Tile { X = 3, Y = 11, tileType = Game.Tiles.TileType.City, Owner = 0 });

            map.Tiles.Add(new Tile { X = 18, Y = 4, tileType = Game.Tiles.TileType.City, Owner = 1 });
            map.Tiles.Add(new Tile { X = 20, Y = 4, tileType = Game.Tiles.TileType.City, Owner = 1 });
            map.Tiles.Add(new Tile { X = 20, Y = 6, tileType = Game.Tiles.TileType.Factory, Owner = 1 });
            map.Tiles.Add(new Tile { X = 20, Y = 7, tileType = Game.Tiles.TileType.HQ, Owner = 1 });
            map.Tiles.Add(new Tile { X = 18, Y = 7, tileType = Game.Tiles.TileType.Factory, Owner = 1 });
            map.Tiles.Add(new Tile { X = 20, Y = 8, tileType = Game.Tiles.TileType.Factory, Owner = 1 });
            map.Tiles.Add(new Tile { X = 18, Y = 11, tileType = Game.Tiles.TileType.City, Owner = 1 });
            map.Tiles.Add(new Tile { X = 20, Y = 11, tileType = Game.Tiles.TileType.City, Owner = 1 });

            map.Tiles.Add(new Tile { X = 11, Y = 15, tileType = Game.Tiles.TileType.City, Owner = 2 });
            map.Tiles.Add(new Tile { X = 9, Y = 16, tileType = Game.Tiles.TileType.City, Owner = 2 });
            map.Tiles.Add(new Tile { X = 11, Y = 17, tileType = Game.Tiles.TileType.City, Owner = 2 });
            map.Tiles.Add(new Tile { X = 10, Y = 18, tileType = Game.Tiles.TileType.Factory, Owner = 2 });
            map.Tiles.Add(new Tile { X = 10, Y = 20, tileType = Game.Tiles.TileType.HQ, Owner = 2 });
            map.Tiles.Add(new Tile { X = 9, Y = 20, tileType = Game.Tiles.TileType.Factory, Owner = 2 });
            map.Tiles.Add(new Tile { X = 11, Y = 20, tileType = Game.Tiles.TileType.Factory, Owner = 2 });
            map.Tiles.Add(new Tile { X = 7, Y = 20, tileType = Game.Tiles.TileType.City, Owner = 2 });
            map.Tiles.Add(new Tile { X = 15, Y = 20, tileType = Game.Tiles.TileType.City, Owner = 2 });

            Maps.Add(map);
            // End map 4 ---

            // Map 5 ---
            map = new Map { ID = 5, Name = "Uneven war 1v1v1v2 5P", NumberOfPlayers = 5, Thumbnail = "http://photos1.blogger.com/blogger/5409/1375/320/vs%20synk%20day%205.gif" };
            map.Tiles = new List<Tile>();

            tiles = new int[,] {
                {  0,-1,-1,-1,-1, 1, 2, 0,-1,-1,-1,-1, 0, 2, 1,-1,-1,-1,-1, 0 },
                { -1, 0, 1, 0, 0, 1, 2, 0, 0, 1, 1, 0, 0, 2, 1, 0, 0, 1, 0,-1 },
                { 12, 0,-1,-1, 0, 1, 2,-1, 0, 4, 2, 0,-1, 2, 1, 0,-1,-1, 0,12 },
                {  0, 6, 0, 0, 5, 1, 2,11, 4, 1, 1, 4,11, 2, 1, 5, 0, 0, 6, 0 },
                {  0, 0, 0,11, 0, 1, 2, 0, 0, 1, 1, 0, 0, 2, 1, 0,11, 0, 0, 0 },
                {  4, 0, 0, 0, 0, 1, 2, 4, 0,-1,12, 0, 4, 2, 1, 0, 0, 0, 0, 4 },
                {  0, 0, 5,12, 2, 3, 2, 0, 0, 1,11, 0, 0, 2, 3, 2,12, 5, 0, 0 },
                {  0,11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,11, 0 },
                {  0, 0, 0,11, 0, 0, 4, 1, 0, 4, 4, 0, 1, 4, 0, 0, 0,11, 0, 0 },
                {  8, 8, 0, 0, 0, 0, 0, 1, 0,11,12, 0, 1, 0,11, 0, 0, 0, 8, 8 },
                {  9, 9,12, 0,11, 0, 0, 1, 0, 4, 0, 0,11, 0, 0,12, 0,11, 9, 9 },
                {  9, 9,11, 0,12, 0, 4,11, 0, 0, 5, 0, 1, 4, 0,11, 0,12, 9, 9 },
                {  8, 8, 0, 0,12, 0, 1, 1, 0,12,11, 0, 1, 1, 0,11, 0, 0, 8, 8 },
                {  0, 0, 0,11, 0, 0, 0, 1, 0, 4, 4, 0, 1, 0, 0, 0,11, 0, 0, 0 },
                {  0, 0, 0, 0, 0,11, 0, 1, 1, 1, 1, 1, 1, 0,11, 0, 0, 0, 0, 0 },
                {  0, 0, 4,11, 0,12, 0, 0, 5, 1, 1, 5, 0, 0,12, 0,11, 4, 0, 0 },
                {  0, 0, 0, 0, 0,11, 0, 0, 0, 1, 1, 0, 0, 0,11, 0, 0, 0, 0, 0 },
                {  0, 0, 0, 0, 6, 0,12, 0,11, 1, 1,11, 0,12, 0, 6, 0, 0, 0, 0 },
                {  8,11,-1, 1, 1, 1, 1,-1,-1, 1, 1,-1,-1, 1, 1, 1, 1,-1,11, 8 },
                {  9, 8, 0,11, 0, 0, 0,12,-1,-1,-1,-1,12, 0, 0, 0,11, 0, 8, 9 }
            };
            map.Width = 20;
            map.Height = 20;

            for (int x = 0; x < tiles.GetLength(1); x++)
                for (int y = 0; y < tiles.GetLength(0); y++)
                {
                    if (tiles[y, x] == -1)
                        continue;
                    map.Tiles.Add(new Tile { X = x, Y = y, tileType = (Game.Tiles.TileType)tiles[y, x] });
                }

            map.Tiles.Add(new Tile { X = 1, Y = 0, tileType = Game.Tiles.TileType.City, Owner = 0 });
            map.Tiles.Add(new Tile { X = 2, Y = 0, tileType = Game.Tiles.TileType.HQ, Owner = 0 });
            map.Tiles.Add(new Tile { X = 3, Y = 0, tileType = Game.Tiles.TileType.City, Owner = 0 });
            map.Tiles.Add(new Tile { X = 4, Y = 0, tileType = Game.Tiles.TileType.Factory, Owner = 0 });
            map.Tiles.Add(new Tile { X = 0, Y = 1, tileType = Game.Tiles.TileType.City, Owner = 0 });
            map.Tiles.Add(new Tile { X = 2, Y = 2, tileType = Game.Tiles.TileType.City, Owner = 0 });
            map.Tiles.Add(new Tile { X = 3, Y = 2, tileType = Game.Tiles.TileType.City, Owner = 0 });

            map.Tiles.Add(new Tile { X = 8, Y = 0, tileType = Game.Tiles.TileType.City, Owner = 1 });
            map.Tiles.Add(new Tile { X = 9, Y = 0, tileType = Game.Tiles.TileType.HQ, Owner = 1 });
            map.Tiles.Add(new Tile { X = 10, Y = 0, tileType = Game.Tiles.TileType.City, Owner = 1 });
            map.Tiles.Add(new Tile { X = 11, Y = 0, tileType = Game.Tiles.TileType.Factory, Owner = 1 });
            map.Tiles.Add(new Tile { X = 7, Y = 2, tileType = Game.Tiles.TileType.City, Owner = 1 });
            map.Tiles.Add(new Tile { X = 12, Y = 2, tileType = Game.Tiles.TileType.City, Owner = 1 });
            map.Tiles.Add(new Tile { X = 9, Y = 5, tileType = Game.Tiles.TileType.Airfield, Owner = 1 });

            map.Tiles.Add(new Tile { X = 18, Y = 0, tileType = Game.Tiles.TileType.City, Owner = 2 });
            map.Tiles.Add(new Tile { X = 17, Y = 0, tileType = Game.Tiles.TileType.HQ, Owner = 2 });
            map.Tiles.Add(new Tile { X = 16, Y = 0, tileType = Game.Tiles.TileType.City, Owner = 2 });
            map.Tiles.Add(new Tile { X = 15, Y = 0, tileType = Game.Tiles.TileType.Factory, Owner = 2 });
            map.Tiles.Add(new Tile { X = 19, Y = 1, tileType = Game.Tiles.TileType.City, Owner = 2 });
            map.Tiles.Add(new Tile { X = 17, Y = 2, tileType = Game.Tiles.TileType.City, Owner = 2 });
            map.Tiles.Add(new Tile { X = 16, Y = 2, tileType = Game.Tiles.TileType.City, Owner = 2 });

            map.Tiles.Add(new Tile { X = 2, Y = 18, tileType = Game.Tiles.TileType.Factory, Owner = 3 });
            map.Tiles.Add(new Tile { X = 7, Y = 18, tileType = Game.Tiles.TileType.Factory, Owner = 3 });
            map.Tiles.Add(new Tile { X = 8, Y = 18, tileType = Game.Tiles.TileType.City, Owner = 3 });
            map.Tiles.Add(new Tile { X = 8, Y = 19, tileType = Game.Tiles.TileType.City, Owner = 3 });
            map.Tiles.Add(new Tile { X = 9, Y = 19, tileType = Game.Tiles.TileType.HQ, Owner = 3 });

            map.Tiles.Add(new Tile { X = 17, Y = 18, tileType = Game.Tiles.TileType.Factory, Owner = 4 });
            map.Tiles.Add(new Tile { X = 12, Y = 18, tileType = Game.Tiles.TileType.Factory, Owner = 4 });
            map.Tiles.Add(new Tile { X = 11, Y = 18, tileType = Game.Tiles.TileType.City, Owner = 4 });
            map.Tiles.Add(new Tile { X = 11, Y = 19, tileType = Game.Tiles.TileType.City, Owner = 4 });
            map.Tiles.Add(new Tile { X = 10, Y = 19, tileType = Game.Tiles.TileType.HQ, Owner = 4 });

            Maps.Add(map);
            // End map 5 ---

            // Map 6 ---
            map = new Map { ID = 6, Name = "party islands 6P", NumberOfPlayers = 6, Thumbnail = "http://photos1.blogger.com/blogger/5409/1375/320/vs%20synk%20day%205.gif" };
            map.Tiles = new List<Tile>();

            tiles = new int[,] {
                {9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,             } ,
                {9,9,9,8,0,6,0,8,9,9,9,9,8,4,11,0,0,8,9,9,9,9,9,9,9,9,9,9,9,            } ,
                {9,9,8,0,11,1,12,0,4,9,9,8,0,0,12,0,6,0,8,9,9,9,8,0,6,0,9,9,9,          } ,
                {9,8,12,-1,0,1,0,11,0,8,8,11,0,0,1,1,0,11,0,9,9,4,11,1,0,11,0,9,9,      } ,
                {9,4,11,1,-1,1,5,0,-1,8,8,0,-1,1,1,0,12,0,0,8,8,0,12,1,0,0,12,0,9,      } ,
                {9,0,0,1,1,12,1,1,1,8,8,0,1,12,5,-1,0,-1,0,8,8,0,0,1,1,-1,-1,0,9,       } ,
                {9,0,0,0,1,4,1,0,11,8,8,12,1,1,1,1,11,0,0,8,8,-1,11,5,12,1,1,11,9,      } ,
                {9,12,0,11,0,0,0,0,4,8,8,0,4,11,0,1,1,1,4,8,8,0,1,1,1,1,0,4,9,          } ,
                {9,9,0,0,0,0,11,0,12,8,8,0,0,4,0,0,0,11,0,8,8,0,0,0,11,4,0,0,9,         } ,
                {9,9,11,0,4,12,0,0,0,8,8,0,0,0,0,0,0,12,0,8,8,12,0,0,0,0,11,12,9,       } ,
                {9,9,8,8,8,8,8,8,0,3,4,0,0,11,12,0,4,0,0,8,8,0,0,4,0,12,0,9,9,          } ,
                {9,9,8,8,8,8,8,8,3,2,3,8,8,8,8,8,8,8,0,3,4,0,11,0,0,0,4,9,9,            } ,
                {9,9,4,0,0,0,11,0,4,3,0,8,8,8,8,8,8,8,3,2,3,8,8,8,8,8,8,9,9,            } ,
                {9,9,0,12,0,4,0,0,8,8,0,0,4,0,12,11,0,0,4,3,0,8,8,8,8,8,8,9,9,          } ,
                {9,12,11,0,0,0,0,12,8,8,0,12,0,0,0,0,0,0,8,8,0,0,0,12,4,0,11,9,9,       } ,
                {9,0,0,4,11,0,0,0,8,8,0,11,0,0,0,4,0,0,8,8,12,0,11,0,0,0,0,9,9,         } ,
                {9,4,0,1,1,1,1,0,8,8,4,1,1,1,0,11,4,0,8,8,4,0,0,0,0,11,0,12,9,          } ,
                {9,11,1,1,12,5,11,-1,8,8,0,0,11,1,1,1,1,12,8,8,11,0,1,4,1,0,0,0,9,      } ,
                {9,0,-1,-1,1,1,0,0,8,8,0,-1,0,-1,5,12,1,0,8,8,1,1,1,12,1,1,0,0,9,       } ,
                {9,0,12,0,0,1,12,0,8,8,0,0,12,0,1,1,-1,0,8,8,-1,0,5,1,-1,1,11,4,9,      } ,
                {9,9,0,11,0,1,11,4,9,9,0,11,0,1,1,0,0,11,8,8,0,11,0,1,0,-1,12,8,9,      } ,
                {9,9,9,0,6,0,8,9,9,9,8,0,6,0,12,0,0,8,9,9,4,0,12,1,11,0,8,9,9,          } ,
                {9,9,9,9,9,9,9,9,9,9,9,8,0,0,11,4,8,9,9,9,9,8,0,6,0,8,9,9,9,            } ,
                { 9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9, }
            };
            map.Width = 29;
            map.Height = 24;

            for (int x = 0; x < tiles.GetLength(1); x++)
                for (int y = 0; y < tiles.GetLength(0); y++)
                {
                    if (tiles[y, x] == -1)
                        continue;
                    map.Tiles.Add(new Tile { X = x, Y = y, tileType = (Game.Tiles.TileType)tiles[y, x] });
                }

            map.Tiles.Add(new Tile { X = 3, Y = 3, tileType = Game.Tiles.TileType.Factory, Owner = 0 });
            map.Tiles.Add(new Tile { X = 4, Y = 4, tileType = Game.Tiles.TileType.Factory, Owner = 0 });
            map.Tiles.Add(new Tile { X = 8, Y = 4, tileType = Game.Tiles.TileType.HQ, Owner = 0 });

            map.Tiles.Add(new Tile { X = 12, Y = 4, tileType = Game.Tiles.TileType.Factory, Owner = 1 });
            map.Tiles.Add(new Tile { X = 17, Y = 5, tileType = Game.Tiles.TileType.Factory, Owner = 1 });
            map.Tiles.Add(new Tile { X = 15, Y = 5, tileType = Game.Tiles.TileType.HQ, Owner = 1 });

            map.Tiles.Add(new Tile { X = 21, Y = 6, tileType = Game.Tiles.TileType.HQ, Owner = 2 });
            map.Tiles.Add(new Tile { X = 25, Y = 5, tileType = Game.Tiles.TileType.Factory, Owner = 2 });
            map.Tiles.Add(new Tile { X = 26, Y = 5, tileType = Game.Tiles.TileType.Factory, Owner = 2 });

            map.Tiles.Add(new Tile { X = 2, Y = 18, tileType = Game.Tiles.TileType.Factory, Owner = 3 });
            map.Tiles.Add(new Tile { X = 3, Y = 18, tileType = Game.Tiles.TileType.Factory, Owner = 3 });
            map.Tiles.Add(new Tile { X = 7, Y = 17, tileType = Game.Tiles.TileType.HQ, Owner = 3 });

            map.Tiles.Add(new Tile { X = 11, Y = 18, tileType = Game.Tiles.TileType.Factory, Owner = 4 });
            map.Tiles.Add(new Tile { X = 16, Y = 19, tileType = Game.Tiles.TileType.Factory, Owner = 4 });
            map.Tiles.Add(new Tile { X = 13, Y = 18, tileType = Game.Tiles.TileType.HQ, Owner = 4 });

            map.Tiles.Add(new Tile { X = 25, Y = 20, tileType = Game.Tiles.TileType.Factory, Owner = 5 });
            map.Tiles.Add(new Tile { X = 24, Y = 19, tileType = Game.Tiles.TileType.Factory, Owner = 5 });
            map.Tiles.Add(new Tile { X = 20, Y = 19, tileType = Game.Tiles.TileType.HQ, Owner = 5 });

            Maps.Add(map);
            // End map 6 ---
            var tileId = 0;
            foreach (var m in Maps)
            {
                foreach (var tile in m.Tiles)
                {
                    tileId++;
                    tile.MapID = m.ID;
                    tile.ID = tileId;
                }
            }


            var colors = new Color[] { Color.Red, Color.DarkOrange, Color.Yellow, Color.Green, Color.LightGreen, Color.DarkBlue, Color.Blue, Color.LightBlue, Color.MediumPurple, Color.Purple, Color.LightPink, Color.Brown, Color.HotPink, Color.Aqua, Color.CadetBlue, Color.DarkKhaki };

            for (int i = 0; i < colors.Length; i++)
            {
                var color = colors[i];
                var tints = GenerateTints(color);
                var tintsString = string.Join(",", tints.Select(tint => ToHexString(tint)));
                var playerColor = new PlayerColor
                {
                    ID = i + 1,
                    Name = ColorTranslator.ToHtml(color),
                    Colors = tintsString
                };
                Colors.Add(playerColor);
            }
        }
    }
}
