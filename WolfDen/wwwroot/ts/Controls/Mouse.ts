namespace TurnBasedBoardGame {
    export class Mouse {
        RightClickEvent: any = {};

        constructor() {
            let self = this;
            let canvas = $("canvas")[0];
            canvas.addEventListener('contextmenu', function (ev) {
                ev.preventDefault();
                for (let key in self.RightClickEvent)
                    self.RightClickEvent[key]();
                return false;
            }, false);

            canvas.addEventListener('mousedown', function (ev) {
                if (ev.which === 3) {
                    ev.preventDefault();
                    for (let key in self.RightClickEvent)
                        self.RightClickEvent[key]();
                }
                return false;
            }, false);
        }
    }
}