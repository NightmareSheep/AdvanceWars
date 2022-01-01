namespace TurnBasedBoardGame {
    export class ShopModal {
        public _shopOptions: KnockoutObservableArray<IShopOption>;
        get ShopOptions(): IShopOption[] {
            return this._shopOptions();
        };

        set ShopOptions(value: IShopOption[]) {
            this._shopOptions(value);
        };

        constructor() {
            this._shopOptions = ko.observableArray([]);
            if (document.getElementById('shop'))
                ko.applyBindings(this, document.getElementById('shop'));
        }        
    }
}