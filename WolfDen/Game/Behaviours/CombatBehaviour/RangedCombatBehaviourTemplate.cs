using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game;
using WolfDen.Game.Interfaces;

namespace WolfDen.Game.Behaviours.CombatBehaviour
{
    public class RangedCombatBehaviourTemplate : NormalCombatBehaviourTemplate
    {
        public int MinRange { get; set; }
        public int MaxRange { get; set; }

        public override void AddBehaviour(Unit unit)
        {
            var moveBehaviour = unit.Behaviours.Values.OfType<IMoveBehaviour>().FirstOrDefault();
            if (moveBehaviour == null)
                throw new Exception("No movebehaviour found while generating combat behaviour. Make sure movebehaviour is added first.");
            var combatBehaviour = new RangedCombatBehaviour(unit.Game, unit, MaxHealth, UnitType, moveBehaviour, DamageChart, MinRange, MaxRange);
            combatBehaviour.Id = unit.Id + Class;
            unit.Behaviours.Add(combatBehaviour.Id, combatBehaviour);
        }
    }
}
