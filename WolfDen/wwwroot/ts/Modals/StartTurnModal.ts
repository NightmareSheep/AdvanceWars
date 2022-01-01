namespace TurnBasedBoardGame {
    export class StartTurnModal {
        ModalText: KnockoutObservable<string>;

        constructor(private turnResolver: TurnResolver) {
            this.ModalText = ko.observable<string>();

            if (document.getElementById('startTurn'))
                ko.applyBindings(this, document.getElementById('startTurn'));
        }

        StartTurn(activePlayers: AdvanceWarsPlayer[]) {
            let gameSpeed = this.turnResolver.Game.GameSpeed;
            let modalText = "";
            for (let i = 0; i < activePlayers.length; i++)
                modalText += activePlayers[i].Name + " ";
            modalText += "Turn";
            this.ModalText(modalText);
            $('#startTurnModal').modal();
            window.setTimeout(function () { $('#startTurnModal').modal('hide'); }, 1200 / gameSpeed);
        }
    }
}