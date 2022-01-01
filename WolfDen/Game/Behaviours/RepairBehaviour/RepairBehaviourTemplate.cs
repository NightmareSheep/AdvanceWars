using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WolfDen.Game.Interfaces;
using WolfDen.Game.Templates;

namespace WolfDen.Game.Behaviours.RepairBehaviour
{
    public class RepairBehaviourTemplate : IBehaviourTemplate
    {
        public string Class { get { return GetType().Name; } }
        public int FullRepairCost { get; set; }
        public void AddBehaviour(Unit unit)
        {
            var unitHealth = unit.Behaviours.Values.OfType<IHealth>().FirstOrDefault();
            if (unitHealth == null)
                throw new Exception("No unitHealth/combatbehaviour found while generating repair behaviour. Make sure combatbehaviour is added first.");
            var repairBehaviour = new RepairBehaviour(unit.Game, unit);
            repairBehaviour.Id = unit.Id + Class;
            repairBehaviour.Unit = unit;
            repairBehaviour.UnitHealth = unitHealth;
            repairBehaviour.FullRepairCost = FullRepairCost;
            unit.Behaviours.Add(repairBehaviour.Id, repairBehaviour);
        }
    }
}
