using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WolfDen.Game;

namespace WolfDen.Game.Interfaces
{
    public interface ICombatBehaviour
    {
        UnitType UnitType { get; }
        void AttackUnit(Unit target);
        void DefendAndCounter(ICombatBehaviour source, float attackMultiplier);
        void Defend(ICombatBehaviour source, float attackMultiplier);
    }
}
