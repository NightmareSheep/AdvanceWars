using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game;
using WolfDen.Game.Interfaces;

namespace WolfDen.Game.Behaviours.CombatBehaviour
{
    public class CannotAttackCombatBehaviour : NormalCombatBehaviour
    {
        public CannotAttackCombatBehaviour(Game game, Unit unit, int maxHealth, UnitType unitType, IExecuteMove moveBehaviour, DamageChart damageChart) : base(game, unit, maxHealth, unitType, moveBehaviour, damageChart)
        {
        }

        public override void DefendAndCounter(ICombatBehaviour source, float damageMultiplier)
        {
            Defend(source, damageMultiplier);
        }

        public override bool ExecuteMove(dynamic data)
        {
            return false;
        }
    }
}
