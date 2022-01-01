using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;
using WolfDen.Game.Interfaces;
using WolfDen.Game.Tiles;

namespace WolfDen.Game.Behaviours.MoveBehaviour
{
    public class NormalMoveBehaviour : IMoveBehaviour
    {
        public string Class { get { return GetType().Name; } }
        public Unit Unit { get; set; }
        public string Id { get; set; }
        public int Speed { get; set; }
        public MovementType MovementType { get; }
        public Game Game { get; set; }
        public event EventHandler MoveEvent;

        public NormalMoveBehaviour(Unit unit, Game game, int speed = 6, MovementType movementType = MovementType.Foot)
        {
            Unit = unit;
            Game = game;
            Speed = speed;
            MovementType = movementType;
        }

        public bool ExecuteMove(dynamic data)
        {
            try
            {
                JArray jsonPath = data.path;
                string[] path = jsonPath.ToObject<string[]>();
                var destinationId = path[path.Length - 1];
                var owner = Unit.Owner;

                var distance = 0;
                Tile previousTile = (Tile)Unit.Node;
                Tile tile;
                for (int i = 1; i < path.Length; i++)
                {
                    tile = (Tile)Game.Board.Nodes[path[i]];
                    if (!previousTile.Neighbours.Contains(tile))
                        return false;

                    if (tile.Piece != null && tile.Piece.Owner.Team != owner.Team)
                        return false;

                    distance += tile.GetMoveCost(MovementType);
                    previousTile = tile;
                }
                if (distance > Speed)
                    return false;

                var destination = Game.Board.Nodes[destinationId];
                if (destination != null || destination.Piece == null)
                {
                    if (destination != Unit.Node)
                        RaiseMoveEvent();
                    Unit.Node.Piece = null;
                    Unit.Node = destination;
                    destination.Piece = Unit;
                    return true;
                }

                return false;
            }
            catch (Exception exception)
            {
                return false;
            }
        }

        protected virtual void RaiseMoveEvent()
        {
            MoveEvent?.Invoke(this, new EventArgs());
        }

        public void Destroy()
        {
        }
    }
}
