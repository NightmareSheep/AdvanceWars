using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using WolfDen.Data;
using Microsoft.EntityFrameworkCore;
using WolfDen.Models;
using WolfDen.Models.SaveAndLoad;
using WolfDen.Services;
using WolfDen.Hubs;
using WolfDen.Game;
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Configuration;

namespace WolfDen.Pages
{
    public class SaveModel : PageModel
    {
        private const byte maxNumberOfSaves = 13;
        public class SavePost
        {
            public string Id { get; set; }
            [Required]
            public string Name { get; set; }
        }

        private readonly UserManager<ApplicationUser> userManager;
        private readonly ApplicationDbContext context;
        private readonly ISavingService savingService;
        private readonly IConfiguration configuration;

        public List<Save> Saves { get; set; }
        public string Id { get; set; }

        public SaveModel(UserManager<ApplicationUser> userManager, ApplicationDbContext context, ISavingService savingService, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.context = context;
            this.savingService = savingService;
            this.configuration = configuration;
        }

        public async Task<ActionResult> OnGetAsync(string id)
        {          
            Id = id;

            var user = await userManager.GetUserAsync(User);
            var userWithSaves = await context.Users.Where(u => u.Id == user.Id).Include(u => u.Saves).ThenInclude(s => s.Players).FirstOrDefaultAsync();
            Saves = userWithSaves.Saves;

            return Page();
        }
        
        [BindProperty]
        public SavePost Post { get; set; }

        public async Task<ActionResult> OnPostAsync(string id)
        {
            var user = await userManager.GetUserAsync(User);
            var userWithSaves = await context.Users.Where(u => u.Id == user.Id).Include(u => u.Saves).ThenInclude(s => s.Players).FirstOrDefaultAsync();
            Saves = userWithSaves.Saves;

            if (!ModelState.IsValid)
            {
                return Page();
            }

            // Don't allow to many saves
            var adminUserId = configuration.GetValue<string>("AdminUserId");
            if (user.Id != adminUserId && Saves.Count >= maxNumberOfSaves && Saves.Where(s => s.Name == Post.Name).Count() == 0)
            {
                ModelState.AddModelError(string.Empty, "Maximum number of saves reached.");
                return Page();
            }

            Id = id;
            Guid gameId;
            if (!Guid.TryParse(id, out gameId))
                return RedirectToPage("./SaveFailed");

            Save save = null;
            GameHub.GameOperation(gameId, (WolfDen.Game.Game game) => {
                save = savingService.GetSave(Post.Name, game as AdvanceWarsGame);
            });

            if (save == null)
                return RedirectToPage("./SaveFailed");

            await savingService.Save(user.Id, save);

            return RedirectToPage("./SaveSuccesfull");
        }
    }
}