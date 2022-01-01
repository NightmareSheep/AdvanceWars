using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WolfDen.Game;
using WolfDen.Game.EventArguments;

namespace WolfDen.Services
{
    public class AutosaveService : IAutosaveService
    {
        private const byte numberOfAutosaves = 3;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public AutosaveService(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
        }

        public void RegisterGame(Game.Game game)
        {
            if (game == null || game.TurnResolver == null)
                return;

            game.TurnResolver.StartTurnEvent += Autosave;
        }

        private async void Autosave(object sender, ListOfPlayersEventArgs args)
        {
            await AutosaveAsync(sender);            
        }

        private async Task AutosaveAsync(object sender)
        {
            Game.Game game;
            if (!(sender is TurnResolver turnResolver) || (game = turnResolver.Game) == null || game.History == null || game.Players == null)
                return;
            var saveName = "Autosave " + game.History.Turn % numberOfAutosaves;
            using (var scope = _serviceScopeFactory.CreateScope())
            {
                var savingService = scope.ServiceProvider.GetService<ISavingService>();
                foreach (var player in game.Players)
                {
                    await savingService.Save(player.Id, saveName, game as AdvanceWarsGame);
                }
            }
        }
    }
}
