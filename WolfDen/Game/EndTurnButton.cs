using System;

namespace WolfDen.Game
{
    public class EndTurnButton : Piece
    {
        public string Class { get { return GetType().Name; } }
        public TurnResolver TurnResolver { get; set; }

        public EndTurnButton(Game game, TurnResolver turnResolver, AdvanceWarsPlayer owner) : base(game)
        {
            Id = "EndTurnButton" + owner.Id;
            TurnResolver = turnResolver;
            Owner = owner;
        }

        public override bool ExecuteMove(dynamic data)
        {
            return TurnResolver.EndTurn(Owner);
        }
    }
}