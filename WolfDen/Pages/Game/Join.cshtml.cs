using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using WolfDen.Lobbies;
using WolfDen.Other;

namespace WolfDen.Pages
{
    [Authorize]
    public class JoinModel : PageModel
    {
        public JoinModel()
        {
        }

        public void OnGet()
        {
        }

        public JsonResult OnGetLobbies()
        {
            var lobbies = ConcurrencyObjects.Objects.Values.OfType<Lobby>().ToList();
            return new JsonResult(lobbies);
        }
    }
}