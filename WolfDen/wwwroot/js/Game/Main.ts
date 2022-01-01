let pixiApp: PIXI.Application = null;
var gameInstance;
var viewport;
var mainContainer: PIXI.Container;
var connection: any;
declare var signalR: any;
declare var Viewport: any;

$(window).resize(function () {
    if (pixiApp && pixiApp.renderer) {
        pixiApp.renderer.resize($("#game").width(), $("#game").height());
    }
});

$(document).ready(function () {
    if (!document.getElementById("game"))
        return;

    let type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
        type = "canvas";
    }

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH;
    //Aliases
    let loader = PIXI.loader;

    //Create a Pixi Application
    pixiApp = new PIXI.Application({ width: 256, height: 256 });

    var renderer = pixiApp.renderer;
    //app.renderer.view.style.position = "absolute";
    pixiApp.renderer.view.style.display = "block";
    pixiApp.renderer.autoResize = true;
    var contentDiv = $("#game");
    pixiApp.renderer.resize($(window).width(), $(window).height());
    contentDiv.append(pixiApp.view);

    


    //load an image and run the `setup` function when it's done
    loader.add("spritesheet", "../../../Images/sprites.json").load(setup);
});

function resourcesLoadedEvent() {
    
    var gameId = $("#game").attr("gameid");
    connection = new signalR.HubConnectionBuilder().withUrl("/gameHub?gameId=" + gameId).configureLogging(signalR.LogLevel.Debug).build();
    connection.on("Start", Initialize);
    connection.on("ExecuteMove", function (data, sanityResult) {
        gameInstance.ExecuteMove(data, sanityResult);
    });
    connection.start().catch(function (err) {
        return console.error(err);
    });;
}

function Initialize(game) {
    gameInstance = parseAndResolve(JSON.stringify(game));

    // create viewport
    var viewport = new Viewport.Viewport({
        screenWidth: $("#game").innerWidth(),
        screenHeight: $("#game").innerHeight(),
        worldWidth: gameInstance.Board.Tiles.length * terrainWidth,
        worldHeight: gameInstance.Board.Tiles[0].length * terrainHeight,

        interaction: pixiApp.renderer.interaction
    });

    pixiApp.stage.addChild(viewport);

    // activate plugins
    viewport
        .drag()
        .pinch()
        .wheel().bounce();


    gameInstance = InstantiateClasses(gameInstance);
    gameInstance.Hub = connection;
}


