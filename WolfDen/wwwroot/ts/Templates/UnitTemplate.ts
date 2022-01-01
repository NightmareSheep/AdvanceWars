/// <reference path="../Unit.ts" />

namespace TurnBasedBoardGame {
    export class UnitTemplate {
        Id: string;
        GenerateIncrement: number = 0;
        Resources: any;
        BehaviourTemplates: any;

        constructor() {
        }

        GenerateUnit(game: Game, owner: AdvanceWarsPlayer) {
            var self = this;
            var unit = new Unit();
            unit.Game = game;
            unit.Resources = self.Resources;
            unit.Owner = owner;
            game.UnitGenerationNumber++;
            unit.Id = "Unit" + game.UnitGenerationNumber;
            for (let key in self.BehaviourTemplates) {
                let behaviourTemplate = self.BehaviourTemplates[key] as IBehaviourTemplate;
                behaviourTemplate.AddBehaviour(unit);
            }

            return unit;
        }

        GetGuid(i: number) {
            var guidString = "-0000-0000-0000-000000000000";
            var hex = i.toString(16);
            hex = hex.padStart(8, "0");
            return hex + guidString;
        }
    }
}