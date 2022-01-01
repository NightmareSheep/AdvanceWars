namespace TurnBasedBoardGame {
    export class NormalCaptureBehaviour implements IExecuteMove, IDestroy {


        Unit: Unit;
        Id: string;
        Game: Game;
        BaseCaptureStrength: number;
        get CurrentCaptureStrength(): number {
            return this.HealthStats.CurrentHealth / this.HealthStats.MaxHealth * this.BaseCaptureStrength;
        };
        _captureProgress: number = 0;        
        CaptureCompletion: number;
        HealthStats: IHealth;
        MoveBehaviour: IMoveBehaviour;
        PixiText: PIXI.Text;

        get CaptureProgress(): number {
            return this._captureProgress;
        }
        set CaptureProgress(value: number) {
            this._captureProgress = value;
            let progress = this.CapturePercentage;
            let progressText = progress > 0 && progress < 100 ? progress + "%" : "";
            if (this.PixiText)
                this.PixiText.text = progressText;
        }

        get CapturePercentage(): number {
            return Math.round(this.CaptureProgress / this.CaptureCompletion * 100);
        }

        constructor() {
        }

        Initialize() {
            let self = this;
            let style = new PIXI.TextStyle({
                fill: '#3afeda',
                fontFamily: "Times New Roman",
                strokeThickness: 5,
                fontSize:13
            });
            let progress = Math.round(self.CaptureProgress / self.CaptureCompletion * 100);
            let progressText = progress > 0 && progress < 100 ? progress + "%" : "";

            self.PixiText = new PIXI.Text(progressText, style);
            self.PixiText.x = 0;
            self.PixiText.y = 31;
            self.Unit.Container.addChild(self.PixiText);
            self.MoveBehaviour.ClickEvent[this.Id] = function (tile: Tile) {
                if (tile instanceof Building && tile.Owner !== self.Unit.Owner)
                    self.Game.Indicators.push(new CaptureIndicator(self, tile as Building));
            }
            self.Unit.ActiveClickEvent[this.Id] = function (e) {
                // Check if were standing on a building
                if (self.Unit.Node instanceof Building && self.Unit.Node.Owner !== self.Unit.Owner) {
                    // If there is already an indicator on our unit, we remove it.
                    let indicator = self.Game.Indicators.find(i => i.CoversTile(self.Unit.Node as Tile));
                    if (indicator) {
                        let index = self.Game.Indicators.indexOf(indicator);
                        self.Game.Indicators.splice(index, 1);
                        indicator.Clear();
                    }

                    self.Game.Indicators.push(new CaptureIndicator(self, self.Unit.Node as Building));
                }
            };

            this.MoveBehaviour.MoveEvent[this.Id + this.Unit.Id] = function () {
                self.CaptureProgress = 0;
            }
        }

        GetMoveCommand(tile: Tile): any {
            let moveCommand = this.MoveBehaviour.GetMoveCommand(tile);
            return { "id": this.Unit.Id, "data": { "id": this.Id, "data": { "moveCommand": moveCommand.data.data, "placeholder":"placeholder" } } };
        }

        ExecuteMove(move: any): boolean {
            let self = this;
            self.MoveBehaviour.ExecuteMoveAndCallback(move.moveCommand, (moveEnd) => {
                let building = this.Unit.Node as Building;
                let startingProgress = self.CapturePercentage;
                self.CaptureProgress += Math.floor(self.HealthStats.CurrentHealth / self.HealthStats.MaxHealth * self.BaseCaptureStrength);
                let endingProgress = self.CapturePercentage;
                if (self.CaptureProgress >= self.CaptureCompletion) {
                    let previousOwner = building.Owner;
                    building.Owner = self.Unit.Owner;
                    building.TriggerCaptureEvent(previousOwner, self.Unit.Owner);
                }
                let captureAnimation = new CaptureAnimation(self.Unit, self.Unit.Node as Tile, startingProgress, endingProgress, () => { moveEnd(); });
            });
            return true;
        }

        Destroy(): void {
            delete this.Game.CommandEvent[this.Id + this.Unit.Id];
            delete this.MoveBehaviour.MoveEvent[this.Id + this.Unit.Id];
        }
    }
}