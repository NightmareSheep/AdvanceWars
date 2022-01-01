namespace TurnBasedBoardGame {
    export interface IShopOption {
        Cost: number;
        Name: string;
        ShopImage: string;
        Click(self: any): void;
        HaveEnoughGold: boolean;
    }
}