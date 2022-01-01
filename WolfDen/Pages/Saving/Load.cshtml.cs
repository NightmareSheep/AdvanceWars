using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using WolfDen.Data;
using WolfDen.Models;
using WolfDen.Models.SaveAndLoad;
using WolfDen.Services;

namespace WolfDen.Pages
{
    [Authorize]
    public class LoadModel : PageModel
    {
        private readonly ApplicationDbContext context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly LoadService loadService;
        private readonly ISavingService savingService;
        public List<Save> Saves;

        public LoadModel(ApplicationDbContext context, UserManager<ApplicationUser> userManager, LoadService loadService, ISavingService savingService)
        {
            this.context = context;
            this.userManager = userManager;
            this.loadService = loadService;
            this.savingService = savingService;
        }

        public async Task OnGetAsync()
        {
            Saves = await GetSaves();
        }

        public async Task<ActionResult> OnPostLoad()
        {
            Saves = await GetSaves();
            int saveId;
            if (!int.TryParse(Request.Form["saveId"][0], out saveId))
                return Page();
            var save = Saves.Where(s => s.SaveId == saveId).FirstOrDefault();
            if (save == null)
                return Page();

            var gameId = await loadService.Load(save);

            return RedirectToPage("/Game/Game", new { id = gameId });
        }

        public async Task<ActionResult> OnPostReplay()
        {
            Saves = await GetSaves();
            int saveId;
            if (!int.TryParse(Request.Form["saveId"][0], out saveId))
                return Page();
            var save = Saves.Where(s => s.SaveId == saveId).FirstOrDefault();
            if (save == null)
                return Page();

            var gameId = await loadService.LoadReplay(save);

            return RedirectToPage("/Game/Game", new { id = gameId });
        }

        public async Task<ActionResult> OnPostDelete()
        {
            int saveId;
            if (int.TryParse(Request.Form["saveId"][0], out saveId))
            {
                var user = await userManager.GetUserAsync(User);
                await savingService.DeleteSave(user.Id, saveId);
            }

            Saves = await GetSaves();
            return Page();
        }

        private async Task<List<Save>> GetSaves()
        {
            var user = await userManager.GetUserAsync(User);
            var userWithSaves = await context.Users.Where(u => u.Id == user.Id).Include(u => u.Saves).ThenInclude(s => s.Players).FirstOrDefaultAsync();
            return userWithSaves.Saves;
        }
    }
}