var publicLobbyInstance;

namespace TurnBasedBoardGame {
    declare var signalR: any;
    var lobbyInstance: AdvanceWarsLobby;
    var connection: any;

    $(document).ready(function () {
        if (!document.getElementById("lobby"))
            return;

        var lobbyId = $("#lobby").attr("lobbyid");
        connection = new signalR.HubConnectionBuilder().withUrl("/advanceWarsLobbyHub?lobbyId=" + lobbyId).configureLogging(signalR.LogLevel.Debug).build();
        connection.on("Start", Initialize);
        connection.on("Join", function (lobbyPlayer, index) { lobbyInstance.Join(lobbyPlayer, index); });
        connection.on("Leave", function (connectionId) { lobbyInstance.Leave(connectionId); });
        connection.on("Ready", function (connectionId, ready) {
            lobbyInstance.Ready(connectionId, ready);
        });
        connection.on("StartGame", function () {
            document.getElementById('submit').click();
        });
        connection.on("getMessage", function (message) {
            $("#chat").append(message + "<br\>");
            $("#chat").scrollTop($("#chat").height());
        });
        connection.on("ChangeColor", function (slotId, colorId) {
            lobbyInstance.AdvanceWarsSlots.find(slot => slot.Id == slotId).Color.ChangeColor(colorId);
        });
        connection.on("ChangeCommander", function (slotId, commander) {
            lobbyInstance.AdvanceWarsSlots.find(slot => slot.Id == slotId).Commander.ChangeCommander(commander);
        });

        $("#sendMessage").keyup(function (event) {
            if (event.keyCode === 13) {
                var element = $("#sendMessage");
                var value = element.val();
                if (value !== "") {
                    connection.invoke("sendMessage", value);
                    element.val("");
                }
            }
        });
        connection.start().catch(function (err) {
            return console.error(err.toString());
        });;
    });

    function Initialize(lobby) {
        lobbyInstance = parseAndResolve3(lobby);
        lobbyInstance = InstantiateClasses(lobbyInstance);
        lobbyInstance.Connection = connection;
        publicLobbyInstance = lobbyInstance;
    }
}

