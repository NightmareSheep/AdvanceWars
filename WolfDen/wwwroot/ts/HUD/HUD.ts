namespace TurnBasedBoardGame {
    export class HUD {
        PlayerInfo: PlayerInfo;
        TeamInfo: TeamInfo;
        EnemyInfo: EnemyInfo;
        RepairCost: TotalRepairCosts;
        GoldDisplay: GoldDisplay;
        ShopModal: ShopModal;

        constructor(game: Game) {
            if (game.CurrentPlayer) {
                let currentAwPlayer = game.CurrentPlayer;
                this.PlayerInfo = new PlayerInfo(currentAwPlayer, game);
                this.GoldDisplay = new GoldDisplay(currentAwPlayer, game);
                this.TeamInfo = new TeamInfo(this.GetTeamMates(game), game);
                this.EnemyInfo = new EnemyInfo(this.GetEnemies(game), game);
                this.RepairCost = new TotalRepairCosts(game);
                this.ShopModal = new ShopModal();
            }

        }

        GetTeamMates(game: Game): AdvanceWarsPlayer[] {
            let currentAwPlayer = game.CurrentPlayer;
            let teammates = game.Players.filter(function (player) {
                var awPlayer = player;
                if (awPlayer.Team == currentAwPlayer.Team && awPlayer != currentAwPlayer)
                    return true;
                return false;
            });
            return teammates;
        }

        GetEnemies(game: Game): AdvanceWarsPlayer[] {
            let currentAwPlayer = game.CurrentPlayer;
            let enemies = game.Players.filter(function (player) {
                var awPlayer = player;
                if (awPlayer.Team != currentAwPlayer.Team)
                    return true;
                return false;
            });
            return enemies;
        }
    }
}