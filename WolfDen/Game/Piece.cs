using System;
using System.Collections.Generic;
using WolfDen.Game.Interfaces;

namespace WolfDen.Game
{
    public class Piece : IExecuteMove
    {
        public Node Node { get; set; }
        public Dictionary<string, IBehaviour> Behaviours = new Dictionary<string, IBehaviour>();
        public string Id;
        public Game Game { get; set; }
        public AdvanceWarsPlayer Owner { get; set; }

        public Piece(Game game)
        {
            Game = game;
        }

        public virtual bool ExecuteMove(dynamic data)
        {
            try
            {
                string id = data.id;
                return Behaviours[id].ExecuteMove(data.data);
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public void Destroy()
        {
            Game.Pieces.Remove(Id);
            Owner?.Pieces?.Remove(this);
            Node.Piece = null;
            foreach (var behaviour in Behaviours.Values)
            {
                behaviour.Destroy();
            }
        }
    }
}
