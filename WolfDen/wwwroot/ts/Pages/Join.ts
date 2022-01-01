
function LobbyListViewModel() {
    var self = this;
    self.lobbies = ko.observableArray([]);

    self.GetLobbies = function () {
        $.ajax({
            url: "/Game/Join?handler=Lobbies",
            success: function (data) {
                self.lobbies(data);
            }
        });
    };

    self.GetLobbies();
}

if (document.getElementById("join"))
    ko.applyBindings(new LobbyListViewModel());