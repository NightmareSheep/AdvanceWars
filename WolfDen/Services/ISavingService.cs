using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WolfDen.Game;
using WolfDen.Models.SaveAndLoad;

namespace WolfDen.Services
{
    public interface ISavingService
    {
        Save GetSave(string name, AdvanceWarsGame game);
        Task Save(string userId, string name, AdvanceWarsGame game);
        Task Save(string userId, Save save);
        Task DeleteSave(string userId, int saveId);
    }
}
