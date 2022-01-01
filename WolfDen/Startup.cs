using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using WolfDen.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WolfDen.Hubs;
using WolfDen.Models;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using WolfDen.Game;
using WolfDen.Game.Factories;
using Microsoft.Extensions.FileProviders;
using System.IO;
using WolfDen.Services;

namespace WolfDen
{
    public class Startup
    {
        public static IHubContext<LobbyHub, ILobbyClient> LobbyHub { get; set; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }        

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection")));
            services.AddDefaultIdentity<ApplicationUser>(options => {
                options.SignIn.RequireConfirmedAccount = false;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 3;
                options.Password.RequiredUniqueChars = 1;
            })
                .AddEntityFrameworkStores<ApplicationDbContext>();
            services.AddRazorPages();
            services.AddControllersWithViews().AddRazorRuntimeCompilation();
            services.AddSignalR(o =>
            {
                o.EnableDetailedErrors = true;
            }).AddNewtonsoftJsonProtocol(options => 
            { 
                options.PayloadSerializerSettings.PreserveReferencesHandling = PreserveReferencesHandling.Objects;
                options.PayloadSerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Serialize;
                options.PayloadSerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver();
                options.PayloadSerializerSettings.TypeNameHandling = TypeNameHandling.None;
                options.PayloadSerializerSettings.Formatting = Formatting.Indented;
            });
            services.AddScoped<IAccountService, AccountService>();
            services.AddHostedService<AccountRemovalService>();
            services.AddTransient<ISerializationService, CompressedSerializationService>();
            services.AddTransient<ISavingService, SavingService>();
            services.AddSingleton<IAutosaveService, AutosaveService>();
            services.AddTransient<LoadService>();
            services.AddTransient<SanityService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ApplicationDbContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapRazorPages();
                endpoints.MapHub<AdvanceWarsLobbyHub>("/advanceWarsLobbyHub");
                endpoints.MapHub<GameHub>("/gameHub");
            });

            LobbyHub = app.ApplicationServices.GetService<IHubContext<LobbyHub, ILobbyClient>>();
            AddTestGame(context);
        }

        private void AddTestGame(ApplicationDbContext context)
        {
            var player1 = new AdvanceWarsPlayer() { Id = "0f80bf6a-d00e-475f-873b-a9729eaed354", Name = "Frank", Team = 1, Color = "Red", CoName = "Andy" };
            var player2 = new AdvanceWarsPlayer() { Id = "6763fb05-8683-4844-8073-3fbedf9523dd", Name = "Evert", Team = 2, Color = "Yellow", CoName = "Andy" };
            var players = new List<AdvanceWarsPlayer>() { player1, player2 };
            var map = context.Maps.Include(m => m.Tiles).FirstOrDefault();

            var gameFactory = new GameFactory();
            var game = gameFactory.GetGame(map, players);
            game.Id = new Guid("90199eeb-49e8-46f5-9cce-b49898d1bd7a");
            GameHub.Locks.TryAdd(game.Id, new object());
            GameHub.Games.TryAdd(game.Id, game);
        }
    }
}
