using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Newtonsoft.Json;
using WolfDen.Models;
using Microsoft.AspNetCore.SignalR;
using WolfDen.Hubs;
using WolfDen.Other;
using Microsoft.Extensions.DependencyInjection;
using WolfDen.Game;
using WolfDen.Game.Factories;
using WolfDen.Lobbies.AdvanceWarsLobbies;

namespace WolfDen.Lobbies
{
    public class Lobby
    {
        public string Class { get { return GetType().Name; } }
        public List<Slot> Slots { get; set; }        
        public Guid Id { get; set; } = Guid.NewGuid();
        [JsonIgnore] private readonly IHubContext<LobbyHub, ILobbyClient> _lobbyHub;
        [JsonIgnore] private Map _map;
        [JsonIgnore] private Timer _timer { get; set; }
        [JsonIgnore] private int _countDown { get; set; }

        public event EventHandler StateHasChangedEvent;
        public string Name { get; set; }

        public Slot GetSlot(Guid id) => Slots.FirstOrDefault(s => s.Id == id);

        public bool IsEmpty() => Slots.All(slot => slot.LobbyPlayer == null);

        public void RaiseStateHasChangedEvent() => StateHasChangedEvent?.Invoke(this, new EventArgs());

        private void StateHasChanged()
        {
            StopCountDown();
            foreach (var slot in Slots.Where(slot => slot.LobbyPlayer != null)) {
                slot.LobbyPlayer.Ready = false;
            }
            RaiseStateHasChangedEvent();
        }

        public Lobby(string name, List<Slot> slots, Map map, IHubContext<LobbyHub, ILobbyClient> hub)
        {
            Name = name;
            Slots = slots;
            _map = map;
            _lobbyHub = hub;
        }

        public bool Join(LobbyPlayer lobbyPlayer, out int index)
        {
            index = -1;

            if (Slots.Any(s => s?.LobbyPlayer?.Id == lobbyPlayer.Id))
                return false;

            for (int i = 0; i < Slots.Count(); i++)
            {
                var slot = Slots[i];
                if (slot.LobbyPlayer == null)
                {
                    index = i;
                    slot.LobbyPlayer = lobbyPlayer;
                    StateHasChanged();
                    return true;
                }
            }
            return false;
        }

        public void Leave(string connectionId)
        {
            var playerSlot = Slots.FirstOrDefault(slot => slot.LobbyPlayer?.ConnectionId == connectionId);
            if (playerSlot != null)
            {
                playerSlot.LobbyPlayer = null;
                StateHasChanged();
            }            
        }

        public bool Ready(string connectionId, bool ready)
        {
            var positionSlot = Slots.FirstOrDefault(slot => slot.LobbyPlayer?.ConnectionId?.Equals(connectionId) ?? false);
            if (positionSlot?.LobbyPlayer == null) return false;
            positionSlot.LobbyPlayer.Ready = ready;

            if (Slots.All(slot => slot.LobbyPlayer == null || slot.LobbyPlayer.Ready) && Slots.Where(slot => slot.LobbyPlayer != null).Select(slot => slot.Team).Distinct().Count() > 1)
            {
                StartGame();
                return true;
            }
            return false;
        }

        public bool Switch(string connectionId, Guid positionId, Guid destinationId)
        {
            var positionSlot = GetSlot(positionId);
            var destinationSlot = GetSlot(destinationId);
            if (positionSlot != null && destinationSlot != null && positionSlot.LobbyPlayer != null && positionSlot.LobbyPlayer.ConnectionId == connectionId)
            {
                var player = positionSlot.LobbyPlayer;
                positionSlot.LobbyPlayer = null;
                destinationSlot.LobbyPlayer = player;
                RaiseStateHasChangedEvent();
                return true;
            }
            return false;
        }

        private void StartCountDown()
        {
            if (_timer != null)
                return;
            StopCountDown();
            _countDown = 1;
            _timer = new Timer(BroadCastTimerToClients, null, 0, 1000);
        }

        private void StopCountDown() 
        {
            _lobbyHub.Clients.Group(Statics.LobbyPrefix + Id).GetMessage("Countdown stopped");
            _timer?.Dispose();
            _timer = null;
        }

        private void BroadCastTimerToClients(object state)
        {
            _countDown--;
            if (_countDown > 0)
                _lobbyHub.Clients.Group(Statics.LobbyPrefix + Id).GetMessage("Countdown: " + _countDown);
            else
            {
                _lobbyHub.Clients.Group(Statics.LobbyPrefix + Id).GetMessage("Game starting");
                _timer?.Dispose();
                StartGame();
            }
        }

        private void StartGame()
        {

            var players = new List<AdvanceWarsPlayer>();
            foreach (var slot in Slots.Where(slot => slot.LobbyPlayer != null))
            {
                var advanceWarsSlot = slot as AdvanceWarsSlot;
                var color = advanceWarsSlot.Color.Color.Name;
                var co = advanceWarsSlot.Commander.Commander;
                var player = new AdvanceWarsPlayer() { Id = slot.LobbyPlayer.Id, Name = slot.LobbyPlayer.Name, Team = (byte)slot.Team, Color = color, CoName = co };
                players.Add(player);
            }

            var gameFactory = new GameFactory();
            var game = gameFactory.GetGame(_map, players);
            game.Id = Id;
            ConcurrencyObjects.RemoveObject(Id);
            GameHub.Locks.TryAdd(Id, new object());
            GameHub.Games.TryAdd(Id, game);
        }
    }
}