using WolfDen.Game;
using WolfDen.Game.Behaviours.CombatBehaviour;
using WolfDen.Game.Behaviours.RepairBehaviour;
using WolfDen.Game.Behaviours.TransportBehaviour;
using WolfDen.Game.Templates;

namespace WolfDen.Game.Factories
{
    public class UnitTemplateFactory
    {
        public UnitTemplate GetInfantryTemplate()
        {
            var unitTemplate = new UnitTemplate();
            unitTemplate.Name = "Infantry";
            unitTemplate.BehaviourTemplates.Add(new NormalMoveBehaviourTemplate());
            unitTemplate.BehaviourTemplates.Add(new NormalCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.Infantry });
            unitTemplate.BehaviourTemplates.Add(new NormalCaptureBehaviourTemplate() { BaseCaptureStrength = 10, CaptureCompletion = 20 });
            unitTemplate.BehaviourTemplates.Add(new TransportableBehaviourTemplate());
            unitTemplate.BehaviourTemplates.Add(new RepairBehaviourTemplate() { FullRepairCost = 1000 });

            unitTemplate.Resources.Add("idle", "units.OrangeStarInfantry.Idle");
            unitTemplate.Resources.Add("up", "units.OrangeStarInfantry.MoveUp");
            unitTemplate.Resources.Add("down", "units.OrangeStarInfantry.MoveDown");
            unitTemplate.Resources.Add("left", "units.OrangeStarInfantry.MoveLeft");
            unitTemplate.Resources.Add("right", "units.OrangeStarInfantry.MoveRight");
            unitTemplate.Resources.Add("capture", "units.OrangeStarInfantry.Capture");
            return unitTemplate;
        }

        public UnitTemplate GetMechTemplate()
        {
            var unitTemplate = new UnitTemplate();
            unitTemplate.Name = "Mech";
            unitTemplate.BehaviourTemplates.Add(new NormalMoveBehaviourTemplate() { Speed = 2, MovementType = MovementType.Mech });
            unitTemplate.BehaviourTemplates.Add(new NormalCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.Mech });
            unitTemplate.BehaviourTemplates.Add(new NormalCaptureBehaviourTemplate() { BaseCaptureStrength = 10, CaptureCompletion = 20 });
            unitTemplate.BehaviourTemplates.Add(new TransportableBehaviourTemplate());
            unitTemplate.BehaviourTemplates.Add(new RepairBehaviourTemplate() { FullRepairCost = 3000 });

            unitTemplate.Resources.Add("idle", "units.OrangeStarMech.Idle");
            unitTemplate.Resources.Add("up", "units.OrangeStarMech.MoveUp");
            unitTemplate.Resources.Add("down", "units.OrangeStarMech.MoveDown");
            unitTemplate.Resources.Add("left", "units.OrangeStarMech.MoveLeft");
            unitTemplate.Resources.Add("right", "units.OrangeStarMech.MoveRight");
            unitTemplate.Resources.Add("capture", "units.OrangeStarInfantry.Capture");
            return unitTemplate;
        }

        public UnitTemplate GetReconTemplate()
        {
            var unitTemplate = new UnitTemplate();
            unitTemplate.Name = "Recon";
            unitTemplate.BehaviourTemplates.Add(new NormalMoveBehaviourTemplate() { Speed = 8, MovementType = MovementType.Tires });
            unitTemplate.BehaviourTemplates.Add(new NormalCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.Recon });
            unitTemplate.BehaviourTemplates.Add(new RepairBehaviourTemplate() { FullRepairCost = 4000 });

            unitTemplate.Resources.Add("idle", "units.Recon.Idle");
            unitTemplate.Resources.Add("up", "units.Recon.MoveUp");
            unitTemplate.Resources.Add("down", "units.Recon.MoveDown");
            unitTemplate.Resources.Add("left", "units.Recon.MoveLeft");
            unitTemplate.Resources.Add("right", "units.Recon.MoveRight");
            return unitTemplate;
        }

        public UnitTemplate GetUnitTemplate(string name)
        {
            var unitTemplate = new UnitTemplate();
            unitTemplate.Name = name;
            switch (name)
            {
                case "AntiAir":
                    unitTemplate.BehaviourTemplates.Add(new NormalMoveBehaviourTemplate() { Speed = 6, MovementType = MovementType.Threads });
                    unitTemplate.BehaviourTemplates.Add(new NormalCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.AntiAir });
                    unitTemplate.BehaviourTemplates.Add(new RepairBehaviourTemplate() { FullRepairCost = 8000 });
                    LoadStandardResourcesAndBehaviour(unitTemplate, name);
                    return unitTemplate;
                case "Tank":
                    unitTemplate.BehaviourTemplates.Add(new NormalMoveBehaviourTemplate() { Speed = 6, MovementType = MovementType.Threads });
                    unitTemplate.BehaviourTemplates.Add(new NormalCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.Tank });
                    unitTemplate.BehaviourTemplates.Add(new RepairBehaviourTemplate() { FullRepairCost = 7000 });
                    LoadStandardResourcesAndBehaviour(unitTemplate, name);
                    return unitTemplate;
                case "MediumTank":
                    unitTemplate.BehaviourTemplates.Add(new NormalMoveBehaviourTemplate() { Speed = 5, MovementType = MovementType.Threads });
                    unitTemplate.BehaviourTemplates.Add(new NormalCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.MediumTank });
                    unitTemplate.BehaviourTemplates.Add(new RepairBehaviourTemplate() { FullRepairCost = 16000 });
                    LoadStandardResourcesAndBehaviour(unitTemplate, name);
                    return unitTemplate;
                case "NeoTank":
                    unitTemplate.BehaviourTemplates.Add(new NormalMoveBehaviourTemplate() { Speed = 6, MovementType = MovementType.Threads });
                    unitTemplate.BehaviourTemplates.Add(new NormalCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.NeoTank });
                    unitTemplate.BehaviourTemplates.Add(new RepairBehaviourTemplate() { FullRepairCost = 22000 });
                    LoadStandardResourcesAndBehaviour(unitTemplate, name);
                    return unitTemplate;
                case "Artillery":
                    unitTemplate.BehaviourTemplates.Add(new NormalMoveBehaviourTemplate() { Speed = 5, MovementType = MovementType.Threads });
                    unitTemplate.BehaviourTemplates.Add(new RangedCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.Artillery, MinRange = 2, MaxRange = 3 });
                    unitTemplate.BehaviourTemplates.Add(new RepairBehaviourTemplate() { FullRepairCost = 6000 });
                    LoadStandardResourcesAndBehaviour(unitTemplate, name);
                    return unitTemplate;
                case "Rockets":
                    unitTemplate.BehaviourTemplates.Add(new NormalMoveBehaviourTemplate() { Speed = 5, MovementType = MovementType.Tires });
                    unitTemplate.BehaviourTemplates.Add(new RangedCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.Rockets, MinRange = 3, MaxRange = 5 });
                    unitTemplate.BehaviourTemplates.Add(new RepairBehaviourTemplate() { FullRepairCost = 15000 });
                    LoadStandardResourcesAndBehaviour(unitTemplate, name);
                    return unitTemplate;
                case "Missiles":
                    unitTemplate.BehaviourTemplates.Add(new NormalMoveBehaviourTemplate() { Speed = 5, MovementType = MovementType.Tires });
                    unitTemplate.BehaviourTemplates.Add(new RangedCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.Missiles, MinRange = 3, MaxRange = 5 });
                    unitTemplate.BehaviourTemplates.Add(new RepairBehaviourTemplate() { FullRepairCost = 12000 });
                    LoadStandardResourcesAndBehaviour(unitTemplate, name);
                    return unitTemplate;
                case "APC":
                    unitTemplate.BehaviourTemplates.Add(new NormalMoveBehaviourTemplate() { Speed = 6, MovementType = MovementType.Threads });
                    unitTemplate.BehaviourTemplates.Add(new CannotAttackCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.APC });
                    unitTemplate.BehaviourTemplates.Add(new RepairBehaviourTemplate() { FullRepairCost = 5000 });
                    unitTemplate.BehaviourTemplates.Add(new TransportBehaviourTemplate());
                    LoadStandardResourcesAndBehaviour(unitTemplate, name);
                    return unitTemplate;
                case "Fighter":
                    unitTemplate.BehaviourTemplates.Add(new NormalMoveBehaviourTemplate() { Speed = 9, MovementType = MovementType.Air });
                    unitTemplate.BehaviourTemplates.Add(new NormalCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.Fighter });
                    unitTemplate.BehaviourTemplates.Add(new RepairBehaviourTemplate() { FullRepairCost = 20000 });
                    LoadStandardResourcesAndBehaviour(unitTemplate, name);
                    return unitTemplate;
                case "Bomber":
                    unitTemplate.BehaviourTemplates.Add(new NormalMoveBehaviourTemplate() { Speed = 7, MovementType = MovementType.Air });
                    unitTemplate.BehaviourTemplates.Add(new NormalCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.Bomber });
                    unitTemplate.BehaviourTemplates.Add(new RepairBehaviourTemplate() { FullRepairCost = 22000 });
                    LoadStandardResourcesAndBehaviour(unitTemplate, name);
                    return unitTemplate;
                case "Copter":
                    unitTemplate.BehaviourTemplates.Add(new NormalMoveBehaviourTemplate() { Speed = 12, MovementType = MovementType.Air });
                    unitTemplate.BehaviourTemplates.Add(new NormalCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.Copter });
                    unitTemplate.BehaviourTemplates.Add(new RepairBehaviourTemplate() { FullRepairCost = 9000 });
                    LoadStandardResourcesAndBehaviour(unitTemplate, name);
                    return unitTemplate;
                case "TransportCopter":
                    unitTemplate.BehaviourTemplates.Add(new NormalMoveBehaviourTemplate() { Speed = 6, MovementType = MovementType.Air });
                    unitTemplate.BehaviourTemplates.Add(new CannotAttackCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.TransportCopter });
                    unitTemplate.BehaviourTemplates.Add(new RepairBehaviourTemplate() { FullRepairCost = 5000 });
                    unitTemplate.BehaviourTemplates.Add(new TransportBehaviourTemplate());
                    LoadStandardResourcesAndBehaviour(unitTemplate, name);
                    return unitTemplate;
                case "Infantry":
                    return GetInfantryTemplate();
                case "Mech":
                    return GetMechTemplate();
                case "Recon":
                    return GetReconTemplate();
                case "Battleship":
                    unitTemplate.BehaviourTemplates.Add(new NormalMoveBehaviourTemplate() { Speed = 5, MovementType = MovementType.Sea });
                    unitTemplate.BehaviourTemplates.Add(new RangedCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.Battleship, MinRange = 2, MaxRange = 6 });
                    unitTemplate.BehaviourTemplates.Add(new RepairBehaviourTemplate() { FullRepairCost = 28000 });
                    LoadStandardResourcesAndBehaviour(unitTemplate, name);
                    return unitTemplate;
                case "Cruiser":
                    unitTemplate.BehaviourTemplates.Add(new NormalMoveBehaviourTemplate() { Speed = 6, MovementType = MovementType.Sea });
                    unitTemplate.BehaviourTemplates.Add(new NormalCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.Cruiser });
                    unitTemplate.BehaviourTemplates.Add(new RepairBehaviourTemplate() { FullRepairCost = 18000 });
                    LoadStandardResourcesAndBehaviour(unitTemplate, name);
                    return unitTemplate;
                case "Lander":
                    unitTemplate.BehaviourTemplates.Add(new NormalMoveBehaviourTemplate() { Speed = 6, MovementType = MovementType.Sea });
                    unitTemplate.BehaviourTemplates.Add(new CannotAttackCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.Lander });
                    unitTemplate.BehaviourTemplates.Add(new RepairBehaviourTemplate() { FullRepairCost = 7000 });
                    unitTemplate.BehaviourTemplates.Add(new TransportBehaviourTemplate());
                    LoadStandardResourcesAndBehaviour(unitTemplate, name);
                    return unitTemplate;
                case "Sub":
                    unitTemplate.BehaviourTemplates.Add(new NormalMoveBehaviourTemplate() { Speed = 5, MovementType = MovementType.Sea });
                    unitTemplate.BehaviourTemplates.Add(new NormalCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.Sub });
                    unitTemplate.BehaviourTemplates.Add(new RepairBehaviourTemplate() { FullRepairCost = 14000 });
                    LoadStandardResourcesAndBehaviour(unitTemplate, name);
                    return unitTemplate;
                case "VerticalDestructablePipe":
                    unitTemplate.BehaviourTemplates.Add(new CannotAttackCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.DestructablePipe });
                    unitTemplate.Resources.Add("idle", "terrain.VerticalDestructablePipe");
                    return unitTemplate;
                case "HorizontalDestructablePipe":
                    unitTemplate.BehaviourTemplates.Add(new CannotAttackCombatBehaviourTemplate() { MaxHealth = 100, UnitType = UnitType.DestructablePipe });
                    unitTemplate.Resources.Add("idle", "terrain.HorizontalDestructablePipe");
                    return unitTemplate;
            }

            return null;
        }

        private void LoadStandardResourcesAndBehaviour(UnitTemplate unitTemplate, string name)
        {
            unitTemplate.Resources.Add("idle", string.Format("units.{0}.Idle", name));
            unitTemplate.Resources.Add("up", string.Format("units.{0}.MoveUp", name));
            unitTemplate.Resources.Add("down", string.Format("units.{0}.MoveDown", name));
            unitTemplate.Resources.Add("left", string.Format("units.{0}.MoveLeft", name));
            unitTemplate.Resources.Add("right", string.Format("units.{0}.MoveRight", name));
        }
    }
}
