using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using WolfDen.Models;
using System.Security.Claims;
using WolfDen.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace WolfDen.Pages
{
    [Authorize]
    public class GameModel : PageModel
    {
        private readonly ApplicationDbContext _context;
        public string GameId { get; set; }
        public string UserId { get; set; }
        public List<PlayerColor> TeamColors { get; set; }

        public GameModel(ApplicationDbContext context)
        {
            _context = context;
            
        }

        public async Task<ActionResult> OnGetAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
                return RedirectToPage("./Index"); ;
            TeamColors = await _context.PlayerColor.ToListAsync();
            UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            GameId = id;
            return Page();
        }
    }
}