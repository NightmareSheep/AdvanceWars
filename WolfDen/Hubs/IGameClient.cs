using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WolfDen.Models;

namespace WolfDen.Hubs
{
    public interface IGameClient
    {
        Task ExecuteMove(dynamic data, SanityResult sanityId);
        Task Start(Game.Game game);
    }
}
