/// <reference path="Tile.ts" />

namespace TurnBasedBoardGame {
    export class ProducingBuilding extends Building implements IExecuteMove {
        
        Game: Game;
        BuildingType: BuildingType;

        get Listings(): any {
            return this.Owner != null ? this.Owner.Listings[BuildingType[this.BuildingType]] : null;
        }

        constructor() {
            super();
        }

        Initialize() {
            let self = this;
            super.Initialize();

            this.Sprite.interactive = true;
            this.Sprite.buttonMode = true;
            this.Sprite.on("pointertap", function (e) {
                if (self.Owner === null || self.Game.CurrentPlayer !== self.Owner || !self.TurnResolver.IsActive(self.Game.CurrentPlayer))
                    return;

                let shopOptions: IShopOption[] = [];
                for (let key in self.Listings) {
                    var shopOption = self.Listings[key] as ProducingBuildingListing;
                    shopOption.ProducingBuilding = self;
                    shopOptions.push(shopOption);
                }
                self.Game.HUD.ShopModal.ShopOptions = shopOptions;
                $('#shopModal').modal();
            });
        }

        BuyFirstListing() {
            
            let listing = this.Listings[Object.keys(this.Listings)[0]] as ProducingBuildingListing;
            let command = { "id": this.Id, "data": { "id": guid(), "listing": listing.Id } };
            this.Game.GiveCommand(command);
        }

        BuyListing(listing: ProducingBuildingListing) {
            let command = { "id": this.Id, "data": { "listing": listing.Id } };
            this.Game.GiveCommand(command);
        }

        ExecuteMove(move: any): boolean {
            let id = move.id as string;
            let listing = this.Listings != null ? this.Listings[move.listing] as ProducingBuildingListing : null;
            if (this.Listings != null && this.Piece == null && this.Owner.Gold >= listing.Cost) {
                this.Owner.Gold -= listing.Cost;
                let unit = listing.UnitTemplate.GenerateUnit(this.Game, this.Owner);
                unit.Node = this;
                this.Piece = unit;
                unit.Owner = this.Owner;
                this.Game.Pieces[unit.Id] = unit;
                unit.Initialize();
                unit.Active = false;
                this.Owner.Pieces.push(unit);
            }
            this.Game.HUD.ShopModal.ShopOptions = [];
            return true;
            
        }
    }
}