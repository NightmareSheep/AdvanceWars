using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game;
using WolfDen.Game.Interfaces;
using WolfDen.Game.Templates;

namespace WolfDen.Game.Behaviours.CombatBehaviour
{
    public class NormalCombatBehaviourTemplate : IBehaviourTemplate
    {
        public string Class { get { return GetType().Name; } }
        public int MaxHealth { get; set; }
        public UnitType UnitType { get; set; }
        public DamageChart DamageChart { get; set; } = DamageChart.Instance;

        public virtual void AddBehaviour(Unit unit)
        {
            var moveBehaviour = unit.Behaviours.Values.OfType<IMoveBehaviour>().FirstOrDefault();
            // Note: if the unit has a movebehaviour make sure it was added before this.
            var combatBehaviour = new NormalCombatBehaviour(unit.Game, unit, MaxHealth, UnitType, moveBehaviour, DamageChart);
            combatBehaviour.Id = unit.Id + Class;
            unit.Behaviours.Add(combatBehaviour.Id, combatBehaviour);
        }
    }
}
