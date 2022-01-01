using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using WolfDen.Game.Other.History;
using WolfDen.Hubs;

namespace WolfDen.Game
{
    public class Game
    {
        public Guid Id { get; set; }
        public string Class { get { return GetType().Name; } }
        public MoveResolver MoveResolver { get; set; }
        public Dictionary<string, Piece> Pieces = new Dictionary<string, Piece>();
        public Board Board { get; set; }
        public List<AdvanceWarsPlayer> Players { get; set; } = new List<AdvanceWarsPlayer>();
        private Dictionary<string, int> _randomNumbers { get; set; } = new Dictionary<string, int>();
        public Dictionary<string, Guid> Guids { get; set; } = new Dictionary<string, Guid>();
        [JsonIgnore]
        private Random _random = new Random();
        [JsonIgnore]
        public int Seed { get; set; }
        public TurnResolver TurnResolver { get; set; }
        public History History { get; set; } = new History();
        public int UnitGenerationNumber { get; set; }

        public Game()
        {
            var random = new Random();
            Seed = random.Next();
            _random = new Random(Seed);

            MoveResolver = new MoveResolver(this);
            Board = new Board();
        }

        public int GetRandom(string id, int max = int.MaxValue)
        {
            if (_randomNumbers.ContainsKey(id))
                return _randomNumbers[id];
            var random = _random.Next(max);
            _randomNumbers.Add(id, random);
            return random;
        }

        public Guid GetGuid(string id)
        {
            if (Guids.ContainsKey(id))
                return Guids[id];
            var guid = ToGuid(UnitGenerationNumber);
            UnitGenerationNumber++;
            Guids.Add(id, guid);
            return guid;
        }

        public Guid ToGuid(int value)
        {
            byte[] bytes = new byte[16];
            BitConverter.GetBytes(value).CopyTo(bytes, 0);
            return new Guid(bytes);
        }

        public void SetRandom(int seed) => _random = new Random(seed);

        public bool ExecuteMove(string userId, dynamic data) 
        {
            if (MoveResolver.ExecuteMove(userId, data))
            {
                History.Moves.Add(new Move() { UserId = userId, Data = data });
                return true;
            }
            return false;
        }
    }
}