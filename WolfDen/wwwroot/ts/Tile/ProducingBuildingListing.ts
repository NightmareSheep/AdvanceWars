/// <reference path="Tile.ts" />

namespace TurnBasedBoardGame  {
    export class ProducingBuildingListing implements IShopOption {
        Id: string;
        UnitTemplate: UnitTemplate;
        Cost: number;
        Name: string;
        ShopImage: string;

        get HaveEnoughGold() {
            return Game.Instance.CurrentPlayer.Gold >= this.Cost;
        }

        ProducingBuilding: ProducingBuilding;

        constructor() {
        }

        Initialize() {
        }

        Click(self: any) {
            var myself = self as ProducingBuildingListing;
            myself.ProducingBuilding.BuyListing(myself);
            $('#shopModal').modal('hide')
        }
    }
}