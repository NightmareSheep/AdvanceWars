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
    public class HostModel : PageModel
    {
        private readonly ApplicationDbContext _context;
        private readonly IHubContext<LobbyHub, ILobbyClient> _hubContext;

        public HostModel(ApplicationDbContext context, IHubContext<LobbyHub, ILobbyClient> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        public IList<Map> Maps { get; set; }

        public async Task OnGetAsync()
        {
            Maps = await _context.Maps.ToListAsync();
        }

        [BindProperty]
        public Host Host { get; set; }

        public async Task<ActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                Maps = await _context.Maps.ToListAsync();
                return Page();
            }

            if (Host.FFA)
            {
                var map = await _context.Maps.Include(m => m.Tiles).FirstOrDefaultAsync(m => m.ID == Host.MapId);
                if (map == null)
                    map = await _context.Maps.Include(m => m.Tiles).FirstOrDefaultAsync();
                if (map == null)
                    return RedirectToPage("./Index");
                var colors = await _context.PlayerColor.ToListAsync();
                var teams = new int[map.NumberOfPlayers];
                for (int i = 0; i < teams.Length; i++)
                    teams[i] = i + 1;
                var lobby = AdvanceWarsLobby.CreateLobby(Host.Name, map, _hubContext, teams, colors, Statics.Commanders);
                ConcurrencyObjects.Objects.TryAdd(lobby.Id, lobby);
                ConcurrencyObjects.Locks.TryAdd(lobby.Id, new object());
                return RedirectToPage("./Lobby", new { id = lobby.Id });
            }

            return RedirectToPage("./HostStepTwo", new { name = Host.Name, id = Host.MapId });
        }
    }
}