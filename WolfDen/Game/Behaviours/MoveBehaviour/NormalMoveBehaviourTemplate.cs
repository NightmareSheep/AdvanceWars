using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game.Behaviours.MoveBehaviour;

namespace WolfDen.Game.Templates
{
    public class NormalMoveBehaviourTemplate : IBehaviourTemplate
    {
        public string Class { get { return GetType().Name; } }
        public int Speed { get; set; } = 3;
        public MovementType MovementType { get; set; } = MovementType.Foot;

        public void AddBehaviour(Unit unit)
        {
            var moveBehaviour = new NormalMoveBehaviour(unit, unit.Game, Speed, MovementType);
            moveBehaviour.Id = unit.Id + Class;
            unit.Behaviours.Add(moveBehaviour.Id, moveBehaviour);
        }
    }
}