using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game;
using WolfDen.Game.Interfaces;
using WolfDen.Game.Tiles;

namespace WolfDen.Game.Behaviours.TransportBehaviour
{
    public class TransportBehaviour : IBehaviour
    {
        public string Id { get; set; }
        public string Class { get { return GetType().Name; } }
        public Unit Unit { get; }
        public Game Game { get; }
        public IExecuteMove MoveBehaviour { get; }
        public Unit TransportedUnit { get; set; }

        public TransportBehaviour(Unit unit, Game game, IMoveBehaviour moveBehaviour)
        {
            Unit = unit;
            Game = game;
            MoveBehaviour = moveBehaviour;
        }

        public bool ExecuteMove(dynamic data)
        {
            if (MoveBehaviour.ExecuteMove(data.moveCommand))
            {
                string nodeId = data.nodeId;
                return UnloadUnit((Tile)Game.Board.Nodes[nodeId]);
            }
            return false;
        }

        public bool UnloadUnit(Tile tile)
        {
            /// TODO: Add better check
            if (TransportedUnit == null)
                return false;

            tile.Piece = TransportedUnit;
            TransportedUnit.Node = tile;
            TransportedUnit.Active = false;
            TransportedUnit = null;
            return true;
        }

        public bool LoadUnit(Unit unit)
        {
            //TODO: add check if unit can be transported.

            TransportedUnit = unit;
            unit.Node.Piece = null;
            unit.Node = null;
            return true;
        }

        public void Destroy()
        {
        }
    }
}
