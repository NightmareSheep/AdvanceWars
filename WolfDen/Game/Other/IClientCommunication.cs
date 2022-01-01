using System;

namespace WolfDen.Game.Other
{
    interface IClientCommunication
    {
        void UpdateGuild(string id, Guid guid);
    }
}
