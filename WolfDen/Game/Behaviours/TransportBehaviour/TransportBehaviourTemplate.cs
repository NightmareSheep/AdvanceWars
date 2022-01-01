using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game;
using WolfDen.Game.Interfaces;
using WolfDen.Game.Templates;

namespace WolfDen.Game.Behaviours.TransportBehaviour
{
    public class TransportBehaviourTemplate : IBehaviourTemplate
    {
        public string Class { get { return GetType().Name; } }

        public void AddBehaviour(Unit unit)
        {
            var moveBehaviour = unit.Behaviours.Values.OfType<IMoveBehaviour>().FirstOrDefault();
            if (moveBehaviour == null)
                throw new Exception("No movebehaviour found while generating combat behaviour. Make sure movebehaviour is added first.");
            var transportBehaviour = new TransportBehaviour(unit, unit.Game, moveBehaviour);
            transportBehaviour.Id = unit.Id + Class;
            unit.Behaviours.Add(transportBehaviour.Id, transportBehaviour);
        }
    }
}
