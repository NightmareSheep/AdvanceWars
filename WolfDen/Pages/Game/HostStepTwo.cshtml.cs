using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using WolfDen.Data;
using WolfDen.Hubs;
using WolfDen.Lobbies.AdvanceWarsLobbies;
using WolfDen.Models;
using WolfDen.Other;

namespace WolfDen
{
    [Authorize]
    public class HostStepTwoModel : PageModel
    {
        private readonly ApplicationDbContext _context;
        private readonly IHubContext<LobbyHub, ILobbyClient> _hubContext;

        public HostStepTwoModel(ApplicationDbContext context, IHubContext<LobbyHub, ILobbyClient> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        public Map Map { get; set; }

        public async Task<IActionResult> OnGetAsync(string name, int id)
        {
            Map = await _context.Maps.FirstOrDefaultAsync(m => m.ID == id);

            if (Map == null || name == null)
            {
                return RedirectToPage("./Index");
            }
            Name = name;

            return Page();
        }

        [BindProperty]
        public int[] Teams { get; set; }
        [BindProperty]
        public int MapId { get; set; }
        [BindProperty]
        public string Name { get; set; }

        public async Task<IActionResult> OnPostAsync()
        {
            Map = await _context.Maps.Include(m => m.Tiles).FirstOrDefaultAsync(m => m.ID == MapId);
            if (Map == null || Name == null)
            {
                return RedirectToPage("./Index");
            }

            var colors = await _context.PlayerColor.ToListAsync();
            var lobby = AdvanceWarsLobby.CreateLobby(Name, Map, _hubContext, Teams, colors, Statics.Commanders);
            ConcurrencyObjects.Objects.TryAdd(lobby.Id, lobby);
            ConcurrencyObjects.Locks.TryAdd(lobby.Id, new object());
            return RedirectToPage("./Lobby", new { id = lobby.Id });
        }
    }
}