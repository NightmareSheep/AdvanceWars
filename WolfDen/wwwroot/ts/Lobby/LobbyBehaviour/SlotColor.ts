namespace TurnBasedBoardGame {
    export class SlotColor {
        Slot: Slot;
        _color: PlayerColor;
        static Colors: PlayerColor[];
        static AvailableColors: PlayerColor[];

        set AvailableColors(value: PlayerColor[]) {
            SlotColor.AvailableColors = value;
        }

        get AvailableColors(): PlayerColor[] {
            return SlotColor.AvailableColors;
        }

        get Color(): PlayerColor {
            return this._color;
        }

        set Color(value: PlayerColor) {
            this._color = value;
            $("#slot" + this.Slot?.Index + " .slotColor").css("background-color", value.Name);
            if (Lobby.Instance.GetCurrentSlot() == this.Slot)
                $("#color").css("background-color", value.Name);
        }

        constructor() {
            let self = this;
            $(".grid-color-option").click(function () {
                if (self.Slot.IsCurrentPlayer)
                    self.SelectColor($(this).attr("color"));
            });
        }

        Initialize() {
            // This is needed to set the html because this.Slot is not available when color is first set.
            this.Color = this.Color;
        }

        SelectColor(colorId: string) {
            $('#colorModal').modal('hide');
            var lobby = Lobby.Instance;
            lobby.Connection.invoke("ChangeColor", lobby.Id, this.Slot.Id, parseInt(colorId));
        }        

        ChangeColor(colorId: string) {
            var indexOfNewColor = SlotColor.AvailableColors.findIndex(c => c.ID == colorId);
            var newColor = SlotColor.AvailableColors[indexOfNewColor];
            SlotColor.AvailableColors[indexOfNewColor] = this.Color;
            this.Color = newColor;
        }
    }
}