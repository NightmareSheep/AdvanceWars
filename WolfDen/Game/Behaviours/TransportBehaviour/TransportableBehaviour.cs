using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game;
using WolfDen.Game.Interfaces;

namespace WolfDen.Game.Behaviours.TransportBehaviour
{
    public class TransportableBehaviour : IBehaviour
    {
        public string Id { get; set; }
        public string Class { get { return GetType().Name; } }
        public Unit Unit { get; }
        public Game Game { get; }
        public IMoveBehaviour MoveBehaviour { get; }

        public TransportableBehaviour(Unit unit, Game game, IMoveBehaviour moveBehaviour)
        {
            Unit = unit;
            Game = game;
            MoveBehaviour = moveBehaviour;
        }

        public bool ExecuteMove(dynamic data)
        {
            string transportBehaviourUnitIdString = data.unitId;
            string transportBehaviourUnitId = transportBehaviourUnitIdString;
            Unit transportBehaviourUnit = (Unit)Game.Pieces[transportBehaviourUnitId];
            TransportBehaviour transportBehaviour = transportBehaviourUnit.Behaviours.Values.OfType<TransportBehaviour>().FirstOrDefault();
            return transportBehaviour.LoadUnit(Unit);
        }

        public void Destroy()
        {
        }
    }
}
