using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game;
using WolfDen.Game.Interfaces;

namespace WolfDen.Game.Templates
{
    public class NormalCaptureBehaviourTemplate : IBehaviourTemplate
    {
        public string Class { get { return GetType().Name; } }
        public int BaseCaptureStrength { get; set; }
        public int CaptureCompletion { get; set; }



        public void AddBehaviour(Unit unit)
        {
            var moveBehaviour = unit.Behaviours.Values.OfType<IMoveBehaviour>().FirstOrDefault();
            if (moveBehaviour == null)
                throw new Exception("No move behaviour found while generating capture behaviour. Make sure it comes earlier in the list.");
            var iHealth = unit.Behaviours.Values.OfType<IHealth>().FirstOrDefault();
            if (iHealth == null)
                throw new Exception("No IHealth (or combatbehaviour) found while generating capture behaviour. Make sure it comes earlier in the list.");
            var captureBehaviour = new NormalCaptureBehaviour(unit.Game, unit, BaseCaptureStrength, CaptureCompletion, moveBehaviour, iHealth);
            captureBehaviour.Id = unit.Id + Class;
            unit.Behaviours.Add(captureBehaviour.Id, captureBehaviour);
        }
    }
}