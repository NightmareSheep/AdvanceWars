namespace TurnBasedBoardGame {
    export class Replay {
        CurrentMove: number = 0;
        History: History;
        Game: Game;
        CurrentSetTimeOut: string;

        constructor() {
            let self = this;
            $("#replay").show();
            $("#replayNext").click(function () { self.Next(); });
            $("#replayGoto").change(function () {
                let m = $("#replayGoto").val();
                let n = parseInt(m);
                self.Goto(n);
            });
        }

        Initialize() {
            $("#replayMax").html(this.History.Moves.length.toString());
        }

        Next() {
            this.Game.Hub.invoke("next");
            this.CurrentMove++;
        }

        Goto(move: number) {
            let self = this;
            let currentSetTimeOut = guid();
            self.CurrentSetTimeOut = currentSetTimeOut;
            if (move > this.CurrentMove) {
                this.Next();
                setTimeout(function () {
                    if (self.CurrentSetTimeOut == currentSetTimeOut)
                        self.Goto(move);
                }, 100);
            }
        }
    }
}