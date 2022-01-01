namespace TurnBasedBoardGame {
    export class SlotCommander {
        Slot: Slot;
        _commander: string;
        AvailableCommanders: string[];

        constructor() {
            let self = this;
            $(".select-commander").click(function () {
                if (self.Slot.IsCurrentPlayer)
                    self.SelectCommander($(this).attr("co"));
            })
        }

        Initialize() {
            // This is needed to set the html when loading the page because this.Slot is not available when commander is first set.
            this.Commander = this.Commander;
        }

        get Commander(): string {
            return this._commander;
        }

        set Commander(value: string) {
            this._commander = value;
            $("#slot" + this.Slot?.Index + " .slotCommander img").attr("src", "/Images/CO/" + value + ".png");
            if (Lobby.Instance.GetCurrentSlot() == this.Slot)
                $("#selected-commander").attr("src", "/Images/CO/" + value + "big.png");
        }

        SelectCommander(commander: string) {
            $('#coModal').modal('hide');
            var lobby = Lobby.Instance;
            lobby.Connection.invoke("ChangeCommander", lobby.Id, this.Slot.Id, commander);
        }

        ChangeCommander(commander: string) {
            this.Commander = commander;
        }
    }
}