using System;
using WolfDen.Game.EventArguments;

namespace WolfDen.Game.Other
{
    public class IncomeCoordinator
    {
        public string Class { get { return GetType().Name; } }
        public event ListOfPlayersEventHandler IncomeEvent;
        public event ListOfPlayersEventHandler PostIncomeEvent;

        public IncomeCoordinator(TurnResolver turnResolver)
        {
            turnResolver.StartTurnEvent += RaiseEvents;
        }

        private void RaiseEvents(object e, ListOfPlayersEventArgs args) {
            RaiseIncomeEvent(args);
            RaisePostIncomeEvent(args);
        }

        private void RaiseIncomeEvent(ListOfPlayersEventArgs args) => IncomeEvent?.Invoke(this, new ListOfPlayersEventArgs(args.Players));
        private void RaisePostIncomeEvent(ListOfPlayersEventArgs args) => PostIncomeEvent?.Invoke(this, new ListOfPlayersEventArgs(args.Players));
    }
}
