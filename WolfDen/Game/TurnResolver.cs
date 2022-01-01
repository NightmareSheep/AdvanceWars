using System;
using System.Collections.Generic;
using System.Linq;
using WolfDen.Game.EventArguments;
using WolfDen.Game.Interfaces;
using WolfDen.Game.Other;

namespace WolfDen.Game
{
    public class TurnResolver
    {
        public Game Game { get; set; }
        public string Class { get { return GetType().Name; } }
        public int ActiveGroupIndex { get; set; }
        public AdvanceWarsPlayer[][] TurnOrder { get; set; }
        public List<AdvanceWarsPlayer> ActivePlayers { get; set; }
        public event ListOfPlayersEventHandler StartTurnEvent;
        public IncomeCoordinator IncomeCoordinator { get; set; }

        public TurnResolver(List<AdvanceWarsPlayer> players, Game game)
        {
            Game = game;
            var playersGroupedByTeam = players.GroupBy(player => player.Team, player => player);
            TurnOrder = new AdvanceWarsPlayer[playersGroupedByTeam.Count()][];
            var i = 0;
            foreach (var playerGroup in playersGroupedByTeam)
            {
                TurnOrder[i] = playerGroup.ToArray();
                i++;
            }
            IncomeCoordinator = new IncomeCoordinator(this);
            foreach (var player in players)
                player.RepairCoordinator.Initialize(IncomeCoordinator);
        }

        public bool EndTurn(AdvanceWarsPlayer player)
        {
            if (!ActivePlayers.Contains(player))
                return false;
            ActivePlayers.Remove(player);
            var activePieces = player.Pieces.OfType<IActive>();
            foreach (var activePiece in activePieces)
                activePiece.Active = false;
            if (ActivePlayers.Count == 0)
            {
                while (true)
                {
                    ActiveGroupIndex = (ActiveGroupIndex + 1) % TurnOrder.Length;
                    if (TurnOrder[ActiveGroupIndex].Where(p => !p.Defeated).Count() > 0)
                        break;
                }
                StartTurn();
            }
            return true;
        }

        public void StartTurn()
        {
            Game.History.Turn++;
            ActivePlayers = TurnOrder[ActiveGroupIndex].ToList();
            foreach (var player in Game.Players)
                foreach (var piece in player.Pieces)
                {
                    var activatablePiece = piece as IActive;
                    if (activatablePiece != null)
                        activatablePiece.Active = true;
                }
            RaiseStartTurnEvent();
        }

        public virtual void RaiseStartTurnEvent()
        {
            if (StartTurnEvent != null)
                StartTurnEvent(this, new ListOfPlayersEventArgs(TurnOrder[ActiveGroupIndex].ToList()));
        }

        public bool PlayerIsActive(AdvanceWarsPlayer player)
        {
            return ActivePlayers.Contains(player);
        }
    }
}