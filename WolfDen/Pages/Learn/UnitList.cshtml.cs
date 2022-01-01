using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using WolfDen.Game;

namespace WolfDen.Pages.Learn
{
    public class UnitListModel : PageModel
    {
        public string[] Units;

        public void OnGet()
        {
            Units = Enum.GetValues(typeof(UnitType)).Cast<UnitType>().Where(u => u != UnitType.None).Select(u => u.ToString()).ToArray();
        }
    }
}