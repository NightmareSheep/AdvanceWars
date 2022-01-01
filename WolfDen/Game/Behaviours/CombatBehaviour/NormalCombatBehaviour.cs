using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using WolfDen.Game;
using WolfDen.Game.Tiles;
using WolfDen.Game.Interfaces;

namespace WolfDen.Game.Behaviours.CombatBehaviour
{
    public class NormalCombatBehaviour : ICombatBehaviour, IBehaviour, IHealth
    {
        public string Id { get; set; }
        public string Class { get { return GetType().Name; } }
        public Unit Unit { get; set; }
        public int MaxHealth { get; set; }
        public IExecuteMove MoveBehaviour { get; set; }
        public DamageChart DamageChart { get; set; }
        public UnitType UnitType { get; set; }

        private int _currentHealth;
        public int AttackNumber { get; set; } = 0;

        public int CurrentHealth
        {
            get
            {
                return _currentHealth;
            }
            set
            {
                _currentHealth = value;
                if (_currentHealth <= 0)
                    Unit.Destroy();
            }
        }

        public float GetAttackMultiplier(UnitType attacker, UnitType defender)
        {
            var owner = Unit.Owner;
            var co = owner.CO;
            AttackNumber++;
            var baseDamage = DamageChart.BaseDamage(attacker, defender);
            var random = baseDamage == 0 ? 0 : Game.GetRandom(Unit.Id.ToString() + Id.ToString() + AttackNumber, 9);
            var attackMultiplier = (baseDamage * co.Attack / 100 + random) * CurrentHealth / MaxHealth;
            return Math.Max(0, attackMultiplier);
        }


        [JsonIgnore]
        public float DefenceMultiplier
        {
            get
            {
                var coDefence = Unit?.Owner?.CO?.Defence ?? 100;
                var tile = Unit.Node as Tile;
                return (200 - (coDefence + tile.Stars * 10 * CurrentHealth / MaxHealth)) / 100f;
            }
        }

        public Game Game { get; set; }

        public NormalCombatBehaviour(Game game, Unit unit, int maxHealth, UnitType unitType, IExecuteMove moveBehaviour, DamageChart damageChart)
        {
            Game = game;
            Unit = unit;
            MaxHealth = maxHealth;
            CurrentHealth = maxHealth;
            MoveBehaviour = moveBehaviour;
            DamageChart = damageChart;
            UnitType = unitType;
        }

        public virtual bool ExecuteMove(dynamic data)
        {
            try
            {
                if (MoveBehaviour.ExecuteMove(data.moveCommand))
                {
                    var targetId = data.target.ToObject<string>();
                    Unit target = Game.Pieces[targetId] as Unit;
                    var owner = Unit.Owner;
                    if (target.Owner.Team == owner.Team)
                        return false;

                    AttackUnit(target);
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public void Defend(ICombatBehaviour source, float damageMultiplier)
        {
            CurrentHealth -= (int)Math.Floor(damageMultiplier * DefenceMultiplier);
        }

        public virtual void DefendAndCounter(ICombatBehaviour source, float damageMultiplier)
        {
            CurrentHealth -= (int)Math.Floor(damageMultiplier * DefenceMultiplier);
            source.Defend(this, GetAttackMultiplier(UnitType, source.UnitType));
        }

        public virtual void AttackUnit(Unit target)
        {
            var targetCombatBehaviour = target.Behaviours.Values.OfType<ICombatBehaviour>().FirstOrDefault();
            targetCombatBehaviour?.DefendAndCounter(this, GetAttackMultiplier(UnitType, targetCombatBehaviour.UnitType));
        }

        public void Destroy()
        {
        }
    }
}
