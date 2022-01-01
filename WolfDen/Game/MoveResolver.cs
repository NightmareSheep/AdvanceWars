using System;
using Newtonsoft.Json;
using WolfDen.Game.Interfaces;

namespace WolfDen.Game
{
    public class MoveResolver
    {
        [JsonIgnore]
        public dynamic currentMove;
        public Game Game { get; set; }
        public string Class { get { return GetType().Name; } }

        public MoveResolver(Game game)
        {
            Game = game;
        }

        public bool ExecuteMove(string userId, dynamic data)
        {
            try
            {
                string id = data.id;
                Piece piece;

                if (Game.Pieces.TryGetValue(id, out piece) && piece.Owner.Id == userId)
                    return piece.ExecuteMove(data.data);
                if (Game.Board.Nodes.ContainsKey(id))
                    return (Game.Board.Nodes[id] as IExecuteMove).ExecuteMove(data.data);
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}