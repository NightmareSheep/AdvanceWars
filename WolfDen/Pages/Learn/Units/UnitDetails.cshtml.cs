using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using WolfDen.Game.Behaviours.CombatBehaviour;
using WolfDen.Game.Factories;
using WolfDen.Game.Templates;

namespace WolfDen.Pages.Learn
{
    public class UnitDetailModel : PageModel
    {
        public UnitTemplate Unit { get; set; }
        public string Name { get; set; }
        public NormalCombatBehaviourTemplate NormalCombatBehaviourTemplate { get; set; }
        public NormalMoveBehaviourTemplate NormalMoveBehaviourTemplate { get; set; }

        public void OnGet(string name)
        {
            Name = name;
            var factory = new UnitTemplateFactory();
            Unit = factory.GetUnitTemplate(name);
            NormalCombatBehaviourTemplate = Unit.BehaviourTemplates.OfType<NormalCombatBehaviourTemplate>().FirstOrDefault();
            NormalMoveBehaviourTemplate = Unit.BehaviourTemplates.OfType<NormalMoveBehaviourTemplate>().FirstOrDefault();
        }
    }
}