/// <reference path="Interfaces/IExecuteMove.ts" />

namespace TurnBasedBoardGame {
    export class Game {        
        static Instance: Game;
        GameSpeed: number = 1;
        Board: Board;
        Pieces: any;
        Hub: GameHubProxy;
        MoveResolver: MoveResolver;
        Players: AdvanceWarsPlayer[];
        CommandEvent: any = {};
        CurrentPlayer: AdvanceWarsPlayer;
        TurnResolver: TurnResolver;
        Indicators: IIndicator[] = [];
        Mouse: Mouse;
        CancelButton: CancelButton;
        MainContainer: PIXI.Container;
        UnitContainer: PIXI.Container;
        TerrainContainers: PIXI.Container[] = [];
        HUD: HUD;
        UnitGenerationNumber: number = 0;
        History: History;

        constructor() {
            Game.Instance = this;
            
            this.Mouse = new Mouse();
            this.Mouse.RightClickEvent["game"] = this.ClearIndicators;
            this.CancelButton = new CancelButton();
            this.CancelButton.ClickEvent["game"] = this.ClearIndicators;
        }

        Initialize() {
            this.MainContainer = new PIXI.Container();
            mainContainer = this.MainContainer;
            var viewport = pixiApp.stage.children[0] as any;
            viewport.addChild(this.MainContainer);
            this.UnitContainer = new PIXI.Container();
            

            for (let i = 0; i < this.Board.Tiles.length; i++) {
                let container = new PIXI.Container();
                this.TerrainContainers.push(container);
                this.MainContainer.addChild(container);
            }

            this.MainContainer.addChild(this.UnitContainer);

            var self = this;
            let userId = $("#game").attr("userId");
            for (let player of self.Players) {
                if (player.Id === userId)
                    this.CurrentPlayer = player;
            }
            self.HUD = new HUD(this);
        }

        public GiveCommand(command: any) {
            this.ClearIndicators();
            for (let key in this.CommandEvent) {
                if (typeof this.CommandEvent[key] === "function")
                    this.CommandEvent[key]();
            }
            this.Hub.invoke("executeMove",command);
        }

        ExecuteMove(move: any, sanityResult: SanityResult) {
            this.MoveResolver.ExecuteMove(move, sanityResult);
        }

        GetRandom(id: string, callback: (random: number) => void) {
            this.Hub.invoke("getRandom",id).then(function (responseRandom: number) {
                callback(responseRandom);
            });
        }

        ClearIndicators() {
            for (let indicator of Game.Instance.Indicators)
                indicator.Clear();
            Game.Instance.Indicators = [];
        }
    }
}