using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WolfDen.Game;
using WolfDen.Game.Tiles;

namespace WolfDen.Game.Templates
{
    public class UnitTemplate
    {
        public string Name { get; set; }
        public string Class { get { return GetType().Name; } }
        public int GenerateIncrement { get; set; }
        public Dictionary<string, string> Resources { get; set; } = new Dictionary<string, string>();
        public List<IBehaviourTemplate> BehaviourTemplates { get; set; } = new List<IBehaviourTemplate>();



        /// <summary>
        /// Adds unit to the game
        /// </summary>
        /// <param name="game"></param>
        /// <param name="tile"></param>
        /// <param name="owner"></param>
        public void GenerateUnit(Game game, Tile tile, AdvanceWarsPlayer owner)
        {
            var unit = new Unit(game);
            unit.Resources = Resources;
            unit.Owner = owner;

            game.UnitGenerationNumber++;
            unit.Id = "Unit" + game.UnitGenerationNumber;

            foreach (IBehaviourTemplate behaviourTemplate in BehaviourTemplates)
                behaviourTemplate.AddBehaviour(unit);

            
            
            owner?.Pieces?.Add(unit);
            unit.Node = tile;
            game.Pieces.Add(unit.Id, unit);
            tile.Piece = unit;
        }
    }
}