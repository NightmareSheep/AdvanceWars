using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game;
using WolfDen.Game.Interfaces;

namespace WolfDen.Game.Behaviours.CombatBehaviour
{
    public class RangedCombatBehaviour : NormalCombatBehaviour
    {
        public int MinRange { get; set; }
        public int MaxRange { get; set; }

        public RangedCombatBehaviour(Game game, Unit unit, int maxHealth, UnitType unitType, IExecuteMove moveBehaviour, DamageChart damageChart, int minRange, int maxRange) : base(game, unit, maxHealth, unitType, moveBehaviour, damageChart)
        {
            MinRange = minRange;
            MaxRange = maxRange;
        }

        public override void DefendAndCounter(ICombatBehaviour source, float damageMultiplier)
        {
            Defend(source, damageMultiplier);
        }

        public override void AttackUnit(Unit target)
        {
            var targetCombatBehaviour = target.Behaviours.Values.OfType<ICombatBehaviour>().FirstOrDefault();
            targetCombatBehaviour?.Defend(this, GetAttackMultiplier(UnitType, targetCombatBehaviour.UnitType));
        }
    }
}
