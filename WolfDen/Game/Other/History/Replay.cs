using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WolfDen.Game.Other.History
{
    public class Replay
    {
        public string Class { get { return GetType().Name; } }
        public int CurrentMove { get; set; } = 0;
        public History History { get; set; }
        public Game Game { get; set; }

        public Replay(History history, Game game)
        {
            History = history;
            Game = game;
        }

        public bool Next()
        {
            if (History == null || History.Moves.Count <= CurrentMove || CurrentMove < 0)
                return false;

            var move = History.Moves[CurrentMove];
            if (Game.MoveResolver.ExecuteMove(move.UserId, move.Data))
            {
                CurrentMove++;
                return true;
            }
            return false;
        }
    }
}
