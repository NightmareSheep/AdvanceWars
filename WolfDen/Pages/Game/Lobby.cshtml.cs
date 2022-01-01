using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using WolfDen.Lobbies.AdvanceWarsLobbies;
using WolfDen.Other;

namespace WolfDen
{
    [Authorize]
    public class LobbyModel : PageModel
    {
        public AdvanceWarsLobby Lobby;
        public string UserId;
        public int Team;
        public IActionResult OnGet(string id)
        {
            object lobbyObject;
            if (string.IsNullOrEmpty(id) || !ConcurrencyObjects.Objects.TryGetValue(new Guid(id), out lobbyObject))
                return RedirectToPage("./../Index"); ;
            Lobby = (AdvanceWarsLobby)lobbyObject;
            UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return Page();
        }

        [BindProperty]
        public string GameId { get; set; }

        public IActionResult OnPost()
        {
            return RedirectToPage("./Game", new { id = GameId });
        }
    }
}