using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game;
using WolfDen.Game.Interfaces;

namespace WolfDen.Game.Behaviours.CombatBehaviour
{
    public class CannotAttackCombatBehaviourTemplate : NormalCombatBehaviourTemplate
    {
        public override void AddBehaviour(Unit unit)
        {
            // If unit has move behaviour make sure it was added before this behaviour.
            var moveBehaviour = unit.Behaviours.Values.OfType<IMoveBehaviour>().FirstOrDefault();
            var combatBehaviour = new CannotAttackCombatBehaviour(unit.Game, unit, MaxHealth, UnitType, moveBehaviour, DamageChart);
            combatBehaviour.Id = unit.Id + Class;
            unit.Behaviours.Add(combatBehaviour.Id, combatBehaviour);
        }
    }
}
