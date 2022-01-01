namespace TurnBasedBoardGame {
    export class CancelButton {
        ClickEvent: any = {};

        constructor() {
            let self = this;
            let cancelButton = $("#Cancel");
            cancelButton.click(() => {
                for (let key in self.ClickEvent)
                    self.ClickEvent[key]();
            })
        }
    }
}