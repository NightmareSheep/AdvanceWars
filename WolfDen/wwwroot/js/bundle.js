$(document).ready((u) => {
    if (!document.getElementById("save"))
        return;
    let saveSelect = document.getElementById("saves");
    let nameInput = document.getElementById("nameInput");
    saveSelect.onchange = (event) => {
        nameInput.value = event.target.value;
    };
});
window.onerror = function myErrorHandler(errorMsg, url, lineNumber, colno, error) {
    $.ajax({
        url: "/Error?handler=JsError",
        headers: { "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val() },
        method: "POST",
        data: { Message: errorMsg, Url: url, LineNumber: lineNumber, Stack: error.stack },
        success: function () {
            console.log("Error send to server");
        }
    });
};
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}
function setCookie(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = name + "=" + value + ";path=/;" + (days > 0 ? "expires=" + d.toDateString() : "");
}
function deleteCookie(name) { setCookie(name, '', -1); }
function GetPropertyFromPrefix(input, prefixes) {
    var result = input;
    for (var i = 0; i < prefixes.length; i++) {
        var prefix = prefixes[i];
        result = result[prefix];
    }
    return result;
}
var isInFullscreen = false;
function goFullscreen() {
    document.getElementById('fullscreen').requestFullscreen();
}
function colourNameToHex(colour) {
    var colours = {
        "aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff",
        "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887",
        "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff",
        "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f",
        "darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1",
        "darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff",
        "firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff",
        "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520", "gray": "#808080", "green": "#008000", "greenyellow": "#adff2f",
        "honeydew": "#f0fff0", "hotpink": "#ff69b4",
        "indianred ": "#cd5c5c", "indigo": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c",
        "lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2",
        "lightgrey": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightsteelblue": "#b0c4de",
        "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6",
        "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee",
        "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5",
        "navajowhite": "#ffdead", "navy": "#000080",
        "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6",
        "palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080",
        "rebeccapurple": "#663399", "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1",
        "saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4",
        "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0",
        "violet": "#ee82ee",
        "wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5",
        "yellow": "#ffff00", "yellowgreen": "#9acd32"
    };
    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];
    return false;
}
var hotkeyEvents = {};
hotkeyEvents.space = {};
window.onkeydown = function (event) {
    if (event.keyCode === 32) {
        for (var handler in hotkeyEvents.space)
            hotkeyEvents.space[handler]();
    }
};
var instantiatedClasses = [];
var instantiatedClassesRefMap = {};
function InstantiateClasses(myObject) {
    var container = { "result": myObject };
    InstantiateLoop(container);
    CleanupArtifacts(myObject);
    instantiatedClasses.forEach(function (instance) {
        if (instance.Initialize)
            instance.Initialize();
    });
    return container.result;
}
function InstantiateLoop(myObject) {
    for (var propertyName in myObject) {
        let property = myObject[propertyName];
        if (typeof property !== "object" || property === null || property.$visited)
            continue;
        if (property.Class && TurnBasedBoardGame[property.Class]) {
            if (instantiatedClassesRefMap[property.$id])
                myObject[propertyName] = instantiatedClassesRefMap[property.$id];
            else {
                myObject[propertyName] = Object.assign(new TurnBasedBoardGame[property.Class](), property);
                instantiatedClassesRefMap[property.$id] = myObject[propertyName];
                instantiatedClasses.push(myObject[propertyName]);
            }
        }
        property = myObject[propertyName];
        property.$visited = true;
        InstantiateLoop(property);
    }
}
function CleanupArtifacts(myObject) {
    for (let propertyName in myObject) {
        var property = myObject[propertyName];
        if (typeof property !== "object" || property === null || !property.$visited)
            continue;
        delete property.$visited;
        delete property.$id;
        CleanupArtifacts(property);
    }
}
var gameResources = {};
gameResources.terrain = {};
gameResources.indicators = {};
gameResources.units = {};
gameResources.units.infantry = {};
gameResources.units.orangestar = {};
gameResources.units.orangestar.infantry = {};
gameResources.units.orangestar.mech = {};
gameResources.units.OrangeStar = {};
var terrainWidth = 48;
var terrainHeight = 48;
function LoadUnit(name, animations, reverse = false) {
    gameResources.units[name] = {};
    animations.forEach(function (anim) {
        gameResources.units[name][anim.name] = function () {
            var frames = [];
            var animIsSideMove = anim.name === "MoveLeft" || anim.name === "MoveRight";
            var resourceName = animIsSideMove ? "MoveSide" : anim.name;
            if (anim.frames === 1)
                frames.push(PIXI.Texture.fromFrame(name + resourceName + '.png'));
            else
                for (var i = 1; i <= anim.frames; i++) {
                    frames.push(PIXI.Texture.fromFrame(name + resourceName + i + '.png'));
                }
            if (reverse) {
                for (var i = anim.frames - 1; i > 1; i--) {
                    frames.push(PIXI.Texture.fromFrame(name + resourceName + i + '.png'));
                }
            }
            let animation = new PIXI.extras.AnimatedSprite(frames);
            animation.width = terrainWidth;
            animation.height = terrainHeight;
            animation.animationSpeed = 0.1;
            if (anim.name === "MoveRight") {
                animation.anchor.set(1, 0);
                animation.scale.x = -animation.scale.x;
            }
            animation.play();
            return animation;
        };
    });
}
function loadStandardUnit(name, frames, reverse = false) {
    LoadUnit(name, [
        { "name": "Idle", "frames": frames[0] },
        { "name": "MoveDown", "frames": frames[1] },
        { "name": "MoveUp", "frames": frames[2] },
        { "name": "MoveLeft", "frames": frames[3] },
        { "name": "MoveRight", "frames": frames[3] }
    ], reverse);
}
function loadTerrain(name, image, tileType = null, loadTileType = false) {
    gameResources.terrain[name] = function () {
        var terrain = PIXI.Sprite.from(image);
        terrain.width = terrainWidth;
        terrain.height = terrainHeight;
        return terrain;
    };
    if (loadTileType)
        gameResources.terrain[tileType] = gameResources.terrain[name];
}
function loadAnimatedTerrain(name, image, numberOfFrames, animationSpeed, revert) {
    gameResources.terrain[name] = function () {
        let frames = [];
        var i;
        for (i = 1; i <= numberOfFrames; i++) {
            frames.push(PIXI.Texture.fromFrame(image + i + '.png'));
        }
        if (revert) {
            for (i = numberOfFrames - 1; i >= 2; i--) {
                frames.push(PIXI.Texture.fromFrame(image + i + '.png'));
            }
        }
        let sprite = new PIXI.extras.AnimatedSprite(frames);
        sprite.width = terrainWidth;
        sprite.height = terrainHeight;
        sprite.animationSpeed = animationSpeed;
        sprite.play();
        return sprite;
    };
}
function loadResource(path, file, width, height, mirror = false) {
    let resourceFinalPath = gameResources;
    for (var i = 0; i < path.length - 1; i++) {
        var subPath = path[i];
        if (!resourceFinalPath[subPath])
            resourceFinalPath[subPath] = {};
        resourceFinalPath = resourceFinalPath[subPath];
    }
    resourceFinalPath[path[path.length - 1]] = function () {
        var sprite = PIXI.Sprite.fromImage(file);
        sprite.width = width;
        sprite.height = height;
        if (mirror) {
            sprite.anchor.set(1, 0);
            sprite.scale.x = -sprite.scale.x;
        }
        return sprite;
    };
}
function setup(loader, resources) {
    for (var i = 0; i < 16; i++) {
        // Road
        var name = "Road" + i.toString(2).padStart(4, '0');
        loadTerrain(name, name + ".png");
        // Pipe
        name = "pipe" + i.toString(2).padStart(4, '0');
        loadTerrain(name, name + ".png");
    }
    loadTerrain("BridgeHorizontal", "BridgeHorizontal.png");
    loadTerrain("BridgeVertical", "BridgeVertical.png");
    loadTerrain("VerticalDestructablePipe", "VerticalDestructablePipe.png");
    loadTerrain("HorizontalDestructablePipe", "HorizontalDestructablePipe.png");
    loadTerrain("destroyedPipe0101", "destroyedPipe0101.png");
    loadTerrain("destroyedPipe1010", "destroyedPipe1010.png");
    for (var SeaIndex in SeaIndices) {
        loadAnimatedTerrain("Sea" + SeaIndex, "Sea" + SeaIndices[SeaIndex], 4, 0.05, true);
    }
    loadAnimatedTerrain("Sea000000000", "Sea" + SeaIndices["000000000"], 4, 0.05, true);
    for (var beachString of beachStrings) {
        if (beachString !== "none")
            loadAnimatedTerrain(beachString + "Beach", beachString + "Beach", 3, 0.05, true);
    }
    for (var riverString of riverStrings) {
        loadAnimatedTerrain("River" + riverString, riverString + "River", 8, 0.05, false);
    }
    loadAnimatedTerrain("River0000", "1111River", 8, 0.05, false);
    loadStandardUnit("OrangeStarInfantry", [3, 3, 3, 3]);
    loadStandardUnit("OrangeStarMech", [3, 3, 3, 3]);
    loadStandardUnit("Recon", [3, 3, 3, 3]);
    loadStandardUnit("AntiAir", [3, 3, 3, 3]);
    loadStandardUnit("MediumTank", [3, 3, 3, 3]);
    loadStandardUnit("Tank", [3, 3, 3, 3]);
    loadStandardUnit("Artillery", [3, 3, 3, 3]);
    loadStandardUnit("Rockets", [3, 3, 3, 3]);
    loadStandardUnit("APC", [3, 3, 3, 3]);
    loadStandardUnit("NeoTank", [3, 3, 3, 3]);
    loadStandardUnit("Fighter", [3, 3, 3, 3]);
    loadStandardUnit("Bomber", [3, 3, 3, 3]);
    loadStandardUnit("Copter", [3, 2, 2, 2]);
    loadStandardUnit("TransportCopter", [3, 2, 2, 2]);
    loadStandardUnit("Lander", [3, 2, 2, 2]);
    loadStandardUnit("Sub", [3, 2, 2, 2], true);
    loadStandardUnit("Battleship", [3, 2, 2, 2]);
    loadStandardUnit("Cruiser", [3, 2, 2, 2]);
    // Terrain
    loadTerrain("Plain", "grass.png", 0, true);
    loadTerrain("Forest", "forest.png", 11, true);
    loadTerrain("Mountain", "Mountain.png", 12, true);
    loadTerrain("Road", "Road.png", 1, true);
    loadTerrain("Sea", "Sea.png", 9, true);
    gameResources.terrain.City = function () {
        let frames = [];
        for (var i = 1; i <= 2; i++) {
            frames.push(PIXI.Texture.fromFrame('city' + i + '.png'));
        }
        let sprite = new PIXI.extras.AnimatedSprite(frames);
        sprite.width = terrainWidth;
        sprite.height = terrainHeight + terrainHeight * (4 / 16);
        sprite.animationSpeed = 0.01;
        sprite.anchor.set(0, 4 / 20);
        sprite.play();
        return sprite;
    };
    gameResources.terrain[4] = gameResources.terrain.City;
    gameResources.terrain.Hq = function () {
        let frames = [];
        for (var i = 1; i <= 2; i++) {
            frames.push(PIXI.Texture.fromFrame('hq' + i + '.png'));
        }
        let sprite = new PIXI.extras.AnimatedSprite(frames);
        sprite.width = terrainWidth;
        sprite.height = terrainHeight + terrainHeight * (15 / 16);
        sprite.animationSpeed = 0.01;
        sprite.anchor.set(0, 15 / 31);
        sprite.play();
        return sprite;
    };
    gameResources.terrain[14] = gameResources.terrain.Hq;
    gameResources.terrain.Factory = function () {
        let frames = [];
        for (var i = 1; i <= 2; i++) {
            frames.push(PIXI.Texture.fromFrame('Factory' + i + '.png'));
        }
        let sprite = new PIXI.extras.AnimatedSprite(frames);
        sprite.width = terrainWidth;
        sprite.height = terrainHeight;
        sprite.animationSpeed = 0.01;
        sprite.play();
        return sprite;
    };
    gameResources.terrain[5] = gameResources.terrain.Factory;
    gameResources.terrain.Airfield = function () {
        let frames = [];
        for (var i = 1; i <= 2; i++) {
            frames.push(PIXI.Texture.fromFrame('Airfield' + i + '.png'));
        }
        let sprite = new PIXI.extras.AnimatedSprite(frames);
        sprite.width = terrainWidth;
        sprite.height = terrainHeight * 2;
        sprite.anchor.set(0, 0.5);
        sprite.animationSpeed = 0.01;
        let points = new PIXI.Polygon(0, 0, 0, 16, 16, 16, 16, 0);
        sprite.hitArea = points;
        sprite.play();
        return sprite;
    };
    gameResources.terrain[6] = gameResources.terrain.Airfield;
    gameResources.terrain.Shipyard = function () {
        let frames = [];
        for (var i = 1; i <= 2; i++) {
            frames.push(PIXI.Texture.fromFrame('Shipyard' + i + '.png'));
        }
        let sprite = new PIXI.extras.AnimatedSprite(frames);
        sprite.width = terrainWidth;
        sprite.height = terrainHeight * 2;
        sprite.anchor.set(0, 0.5);
        sprite.animationSpeed = 0.01;
        let points = new PIXI.Polygon(0, 0, 0, 16, 16, 16, 16, 0);
        sprite.hitArea = points;
        sprite.play();
        return sprite;
    };
    gameResources.terrain[7] = gameResources.terrain.Shipyard;
    // Indicators
    loadResource(["indicators", "moveIndicator"], "MoveIndicator.png", terrainWidth, terrainHeight);
    loadResource(["indicators", "captureIndicator"], "CaptureIndicator.png", terrainWidth, terrainHeight);
    loadResource(["indicators", "attackIndicator"], "AttackIndicator.png", terrainWidth, terrainHeight);
    loadResource(["indicators", "unloadIndicator"], "UnloadIndicator.png", terrainWidth / 2, terrainHeight / 2);
    loadResource(["indicators", "unloadAtIndicator"], "UnloadAtIndicator.png", terrainWidth, terrainHeight);
    gameResources.indicators.attackIndicatorUp = function () {
        let sprite = PIXI.Sprite.fromImage('AttackIndicatorUp.png');
        sprite.width = terrainWidth;
        sprite.height = terrainHeight;
        let points = new PIXI.Polygon(0, 16, 16, 16, 7, 9, 8, 9);
        sprite.hitArea = points;
        return sprite;
    };
    gameResources.indicators.attackIndicatorDown = function () {
        let sprite = PIXI.Sprite.fromImage('AttackIndicatorDown.png');
        sprite.width = terrainWidth;
        sprite.height = terrainHeight;
        let points = new PIXI.Polygon(0, 0, 16, 0, 7, 6, 8, 6);
        sprite.hitArea = points;
        return sprite;
    };
    gameResources.indicators.attackIndicatorLeft = function () {
        let sprite = PIXI.Sprite.fromImage('AttackIndicatorLeft.png');
        sprite.width = terrainWidth;
        sprite.height = terrainHeight;
        let points = new PIXI.Polygon(16, 0, 16, 16, 9, 7, 9, 8);
        sprite.hitArea = points;
        return sprite;
    };
    gameResources.indicators.attackIndicatorRight = function () {
        let sprite = PIXI.Sprite.fromImage('AttackIndicatorRight.png');
        sprite.width = terrainWidth;
        sprite.height = terrainHeight;
        let points = new PIXI.Polygon(0, 0, 0, 16, 6, 7, 6, 8);
        sprite.hitArea = points;
        return sprite;
    };
    // Units
    gameResources.units.OrangeStarInfantry.Capture = function () {
        var frames = [];
        for (var i = 1; i <= 4; i++) {
            frames.push(PIXI.Texture.fromFrame('OrangeStarInfantryCapture' + i + '.png'));
        }
        var animation = new PIXI.extras.AnimatedSprite(frames);
        animation.width = terrainWidth;
        animation.height = terrainHeight;
        animation.animationSpeed = 0.1;
        animation.play();
        return animation;
    };
    // Commanders
    var commanders = JSON.parse($("#commanders").attr("data"));
    commanders.forEach(function (value) {
        loadResource(["commanders", value], value + ".png", terrainWidth, terrainHeight);
        loadResource(["commanders", value + "Mirror"], value + ".png", terrainWidth, terrainHeight, true);
    });
    // Icons
    loadResource(["icons", "repair"], "repair.png", 12, 12);
    resourcesLoadedEvent();
}
let pixiApp = null;
var gameInstance;
var viewport;
var mainContainer;
var connection;
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
    });
    ;
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
function parseAndResolve(json) {
    var refMap = {};
    return JSON.parse(json, function (key, value) {
        if (key === '$id') {
            refMap[value] = this;
            // return undefined so that the property is deleted
            return value;
        }
        if (value && value.$ref) {
            return refMap[value.$ref];
        }
        return value;
    });
}
function propogate(func, obj) {
    if (!obj)
        return;
    func(obj);
    if (typeof obj === "string")
        return;
    for (var key of Object.keys(obj)) {
        propogate(func, obj[key]);
    }
}
function setRefMap(refMap, object) {
    if (object && object.$id && object.$values)
        refMap[object.$id] = object.$values;
    else if (object && object.$id)
        refMap[object.$id] = object;
}
function setLists(refMap, object) {
    for (var key in object) {
        if (object[key].$id && object[key].$values)
            object[key] = refMap[object[key].$id];
    }
}
function setReferences(refMap, object) {
    if (!object || typeof (object) === "string")
        return;
    for (var key in object) {
        if (object[key].$ref)
            object[key] = refMap[object[key].$ref];
    }
}
function parseAndResolve2(json) {
    var refMap = {};
    var parsed = JSON.parse(json);
    propogate(function (obj) { setRefMap(refMap, obj); }, parsed);
    propogate(function (obj) { setLists(refMap, obj); }, parsed);
    propogate(function (obj) { setReferences(refMap, obj); }, parsed);
    return parsed.value;
}
function parseAndResolve3(json) {
    var refMap = {};
    var references = [];
    var lists = [];
    var parsed = JSON.parse(json, function (key, value) {
        if (!value)
            return;
        if (value.$id) {
            if (value.$values) {
                refMap[value.$id] = value.$values;
                lists.push({ "parent": this, "key": key });
            }
            else
                refMap[value.$id] = value;
        }
        if (value.$ref)
            references.push({ "parent": this, "key": key });
        return value;
    });
    var parent;
    var key;
    for (var ref of references) {
        parent = ref["parent"];
        key = ref["key"];
        parent[key] = refMap[parent[key]["$ref"]];
    }
    for (var list of lists) {
        parent = list["parent"];
        key = list["key"];
        parent[key] = refMap[parent[key]["$id"]];
    }
    return parsed;
}
var filters = {};
$(document).ready(function () {
    if (!document.getElementById("game"))
        return;
    filters.OrangeTeam = new PIXI.filters.MultiColorReplaceFilter([
        [0xf8b878, 0xf8b878],
        [0xf89868, 0xf89868],
        [0xf85800, 0xf85800],
        [0xf00008, 0xf00008],
        [0xc00000, 0xc00000],
        [0x800010, 0x800010]
    ], 0.001);
    var basicColors = [0xf8b878, 0xf89868, 0xf85800, 0xf00008, 0xc00000, 0x800010];
    var colors = JSON.parse($("#teamColors").attr("data"));
    for (var i = 0; i < colors.length; i++) {
        var color = colors[i];
        var colorValues = [];
        var subColors = color.colors.split(',');
        for (var j = 0; j < subColors.length; j++) {
            colorValues.push([basicColors[j], parseInt(subColors[j], 16)]);
        }
        filters[color.name + "Team"] = new PIXI.filters.MultiColorReplaceFilter(colorValues, 0.001);
    }
    filters.YellowTeam = new PIXI.filters.MultiColorReplaceFilter([
        [0xf8b878, 0xf8f898],
        [0xf89868, 0xf8f840],
        [0xf85800, 0xf8c000],
        [0xf00008, 0xd08000],
        [0xc00000, 0xb88000]
    ], 0.001);
    filters.Neutral = new PIXI.filters.MultiColorReplaceFilter([
        [0xf8b878, 0xf8f898],
        [0xf89868, 0xdedede],
        [0xf85800, 0xf8c000],
        [0xf00008, 0xa5a5a5],
        [0xc00000, 0xb88000]
    ], 0.001);
    filters.Inactive = new PIXI.filters.AdjustmentFilter();
    filters.Inactive.saturation = 0.1;
});
//var lastPos = null;
//$("#game")
//    .on("pointerdown",function (e) {
//        lastPos = { x: e.offsetX, y: e.offsetY };
//    }).on("pointerup",function (event) {
//        lastPos = null;
//    }).on("pointermove",function (e) {
//        if (lastPos) {
//            mainContainer.x += (e.offsetX - lastPos.x);
//            mainContainer.y += (e.offsetY - lastPos.y);
//            lastPos = { x: e.offsetX, y: e.offsetY };
//        }
//    });
//.mousewheel(function (e) {
//    zoom(e.deltaY, e.offsetX, e.offsetY)
//})
var beachStrings = [
    "none",
    "none",
    "none",
    "0110",
    "0011",
    "1101",
    "1011",
    "1110",
    "0010",
    "none",
    "none",
    "1221",
    "1202",
    "1122",
    "1100",
    "1001",
    "0111",
    "0100",
    "0001",
    "1000",
    "none",
    "none",
    "2021",
    "none",
    "2120",
    "0120",
    "0021",
    "0210",
    "0012",
    "1021",
    "1120",
    "1201",
    "1102",
    "2211",
    "0212",
    "2112",
    "2100",
    "2001",
    "1200",
    "1002",
    "2011",
    "2110",
    "0211",
    "0112",
];
var riverStrings = [
    "0110",
    "0111",
    "0011",
    "1110",
    "1111",
    "1011",
    "1100",
    "1101",
    "1001",
    "1000",
    "1010",
    "0010",
    "0100",
    "0101",
    "0001"
];
var SeaIndices = {
    "010100000": "01",
    "010000000": "02",
    "010001000": "03",
    "010101000": "04",
    "000000001": "05",
    "000000100": "06",
    "010000001": "07",
    "010000100": "08",
    "101000000": "09",
    "001000001": 10,
    "101000100": 11,
    "101000001": 12,
    "000100000": 13,
    "000000000": 14,
    "000001000": 15,
    "000101000": 16,
    "001000000": 17,
    "100000000": 18,
    "001000010": 19,
    "100000010": 20,
    "100000100": 21,
    "000000101": 22,
    "100000101": 23,
    "001000101": 24,
    "000100010": 25,
    "000000010": 26,
    "000001010": 27,
    "000101010": 28,
    "010100001": 29,
    "010001100": 30,
    "000100001": 31,
    "000001100": 32,
    "010000101": 33,
    "100001100": 34,
    "101000101": 35,
    "111111111": 36,
    "010100010": 37,
    "010000010": 38,
    "010001010": 39,
    "010101010": 40,
    "001100010": 41,
    "100001010": 42,
    "001100000": 43,
    "100001000": 44,
    "001100001": 45,
    "101000010": 46,
    "001000100": 47,
    "100000001": 48
};
var publicLobbyInstance;
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    var lobbyInstance;
    var connection;
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
        });
        ;
    });
    function Initialize(lobby) {
        lobbyInstance = parseAndResolve3(lobby);
        lobbyInstance = InstantiateClasses(lobbyInstance);
        lobbyInstance.Connection = connection;
        publicLobbyInstance = lobbyInstance;
    }
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class AdvanceWarsPlayer {
        constructor() {
            this._gold = 0;
        }
        get Gold() {
            return this._gold;
        }
        set Gold(value) {
            this._gold = value;
        }
    }
    TurnBasedBoardGame.AdvanceWarsPlayer = AdvanceWarsPlayer;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class Board {
        constructor() {
        }
    }
    TurnBasedBoardGame.Board = Board;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="Board.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class AdvanceWarsBoard extends TurnBasedBoardGame.Board {
    }
    TurnBasedBoardGame.AdvanceWarsBoard = AdvanceWarsBoard;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="Interfaces/IExecuteMove.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class Game {
        constructor() {
            this.GameSpeed = 1;
            this.CommandEvent = {};
            this.Indicators = [];
            this.TerrainContainers = [];
            this.UnitGenerationNumber = 0;
            Game.Instance = this;
            this.Mouse = new TurnBasedBoardGame.Mouse();
            this.Mouse.RightClickEvent["game"] = this.ClearIndicators;
            this.CancelButton = new TurnBasedBoardGame.CancelButton();
            this.CancelButton.ClickEvent["game"] = this.ClearIndicators;
        }
        Initialize() {
            this.MainContainer = new PIXI.Container();
            mainContainer = this.MainContainer;
            var viewport = pixiApp.stage.children[0];
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
            self.HUD = new TurnBasedBoardGame.HUD(this);
        }
        GiveCommand(command) {
            this.ClearIndicators();
            for (let key in this.CommandEvent) {
                if (typeof this.CommandEvent[key] === "function")
                    this.CommandEvent[key]();
            }
            this.Hub.invoke("executeMove", command);
        }
        ExecuteMove(move, sanityResult) {
            this.MoveResolver.ExecuteMove(move, sanityResult);
        }
        GetRandom(id, callback) {
            this.Hub.invoke("getRandom", id).then(function (responseRandom) {
                callback(responseRandom);
            });
        }
        ClearIndicators() {
            for (let indicator of Game.Instance.Indicators)
                indicator.Clear();
            Game.Instance.Indicators = [];
        }
    }
    TurnBasedBoardGame.Game = Game;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="Game.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class AdvanceWarsGame extends TurnBasedBoardGame.Game {
    }
    TurnBasedBoardGame.AdvanceWarsGame = AdvanceWarsGame;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    let BuildingType;
    (function (BuildingType) {
        BuildingType[BuildingType["factory"] = 0] = "factory";
        BuildingType[BuildingType["shipyard"] = 1] = "shipyard";
        BuildingType[BuildingType["airfield"] = 2] = "airfield";
    })(BuildingType = TurnBasedBoardGame.BuildingType || (TurnBasedBoardGame.BuildingType = {}));
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class CO {
    }
    TurnBasedBoardGame.CO = CO;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class DamageChart {
        BaseDamage(attacker, defender) {
            if (this.DmgChart[TurnBasedBoardGame.UnitType[attacker]] && this.DmgChart[TurnBasedBoardGame.UnitType[attacker]][TurnBasedBoardGame.UnitType[defender]])
                return this.DmgChart[TurnBasedBoardGame.UnitType[attacker]][TurnBasedBoardGame.UnitType[defender]];
            return 0;
        }
    }
    TurnBasedBoardGame.DamageChart = DamageChart;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
//declare var gameResources: any;
//declare var filters: any;
//declare var terrainWidth: number;
//declare var terrainHeight: number;
//declare var imageResources: any;
//declare var hotkeyEvents: any;
//declare var viewport: any;
//declare var mainContainer: PIXI.Container;
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class MoveResolver {
        constructor() {
            this.CommandCompletedEvent = {};
            this.MoveInProgress = false;
            this.MoveQueue = [];
            this.SanityQueue = [];
        }
        SetMoveInProgress() {
            this.MoveInProgress = true;
        }
        MoveCompleted() {
            if (!TurnBasedBoardGame.SanityCheck(this.Game, this.CurrentSanity)) {
                this.Game.Hub.invoke("sanityCheckFailed");
            }
            this.MoveInProgress = false;
            if (this.MoveQueue.length > 0) {
                let move = this.MoveQueue.shift();
                let sanityResult = this.SanityQueue.shift();
                this.ExecuteMove(move, sanityResult);
            }
        }
        ExecuteMove(move, sanityResult) {
            // Check if a move is already in progress
            if (this.MoveInProgress) {
                this.MoveQueue.push(move);
                this.SanityQueue.push(sanityResult);
                return false;
            }
            console.log("Execute move" + sanityResult.MoveNumber + ": " + JSON.stringify(move));
            this.CurrentSanity = sanityResult;
            let succes = false;
            //  Check if move is for a piece
            if (this.Game.Pieces[move.id]) {
                let piece = this.Game.Pieces[move.id];
                succes = piece.ExecuteMove(move.data);
            }
            // Check if move is for a tile
            if (this.Game.Board.Nodes[move.id]) {
                let node = this.Game.Board.Nodes[move.id];
                succes = node.ExecuteMove(move.data);
            }
            // Call command completed event if move was succesfull
            if (succes) {
                for (let key in this.CommandCompletedEvent) {
                    if (typeof this.CommandCompletedEvent[key] === "function")
                        this.CommandCompletedEvent[key]();
                }
                if (!this.MoveInProgress)
                    this.MoveCompleted();
            }
            return false;
        }
    }
    TurnBasedBoardGame.MoveResolver = MoveResolver;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    let MovementType;
    (function (MovementType) {
        MovementType[MovementType["Foot"] = 0] = "Foot";
        MovementType[MovementType["Mech"] = 1] = "Mech";
        MovementType[MovementType["Tires"] = 2] = "Tires";
        MovementType[MovementType["Threads"] = 3] = "Threads";
        MovementType[MovementType["Air"] = 4] = "Air";
        MovementType[MovementType["Sea"] = 5] = "Sea";
        MovementType[MovementType["Lander"] = 6] = "Lander";
    })(MovementType = TurnBasedBoardGame.MovementType || (TurnBasedBoardGame.MovementType = {}));
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class Node {
        constructor() {
        }
    }
    TurnBasedBoardGame.Node = Node;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class Piece {
        constructor() {
            this.Behaviours = {};
        }
        get BehaviourList() {
            return Object.values(this.Behaviours);
            ;
        }
        ExecuteMove(move) {
            var behaviour = this.Behaviours[move.id];
            return behaviour.ExecuteMove(move.data);
        }
        Destroy() {
            delete this.Game.Pieces[this.Id];
            this.Owner.Pieces.splice(this.Owner.Pieces.indexOf(this), 1);
            this.Node.Piece = null;
        }
    }
    TurnBasedBoardGame.Piece = Piece;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class ShopModal {
        constructor() {
            this._shopOptions = ko.observableArray([]);
            if (document.getElementById('shop'))
                ko.applyBindings(this, document.getElementById('shop'));
        }
        get ShopOptions() {
            return this._shopOptions();
        }
        ;
        set ShopOptions(value) {
            this._shopOptions(value);
        }
        ;
    }
    TurnBasedBoardGame.ShopModal = ShopModal;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class TurnResolver {
        constructor() {
            this.StartTurnEvent = {};
            this.PlayerEndTurnEvent = [];
            this.StartTurnModal = new TurnBasedBoardGame.StartTurnModal(this);
        }
        SubscribeToPlayerEndTurnEvent(funct) {
            this.PlayerEndTurnEvent.push(funct);
        }
        UnsubscribeToPlayerEndTurnEvent(funct) {
            this.PlayerEndTurnEvent.splice(this.PlayerEndTurnEvent.indexOf(funct), 1);
        }
        RaisePlayerEndTurnEvent(player) {
            for (let f of this.PlayerEndTurnEvent)
                f(player);
        }
        IsActive(player) {
            return this.ActivePlayers.indexOf(player) != -1;
        }
        EndTurn(player) {
            this.RaisePlayerEndTurnEvent(player);
            this.ActivePlayers.splice(this.ActivePlayers.indexOf(player), 1);
            if (player.Id === this.Game.CurrentPlayer.Id)
                $(".endTurnButton").first().prop("disabled", true);
            for (let piece of player.Pieces) {
                if ("Active" in piece) {
                    var activatable = piece;
                    activatable.Active = false;
                }
            }
            if (this.ActivePlayers.length === 0) {
                while (true) {
                    this.ActiveGroupIndex = (this.ActiveGroupIndex + 1) % this.TurnOrder.length;
                    if (this.TurnOrder[this.ActiveGroupIndex].map(p => p.Defeated).indexOf(false) != -1)
                        break;
                }
                for (let player of this.TurnOrder[this.ActiveGroupIndex]) {
                    this.ActivePlayers.push(player);
                }
                for (let player of this.Game.Players)
                    for (let piece of player.Pieces)
                        if ("Active" in piece) {
                            var activatable = piece;
                            activatable.Active = true;
                        }
                if (this.ActivePlayers.indexOf(this.Game.CurrentPlayer) != -1)
                    $(".endTurnButton").first().prop("disabled", false);
                this.RaiseStartTurnEvent();
                this.StartTurnModal.StartTurn(this.ActivePlayers);
            }
        }
        RaiseStartTurnEvent() {
            for (let key in this.StartTurnEvent) {
                if (typeof this.StartTurnEvent[key] === "function")
                    this.StartTurnEvent[key](this.ActivePlayers);
            }
        }
    }
    TurnBasedBoardGame.TurnResolver = TurnResolver;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="Piece.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class Unit extends TurnBasedBoardGame.Piece {
        constructor() {
            super();
            this.ActiveClickEvent = {};
            this.Container = new PIXI.Container();
            this.Animations = {};
            this._active = false;
            this.NonOwnerClickEvent = {};
        }
        get Active() {
            return this._active;
        }
        set Active(value) {
            this._active = value;
            let unitFilters = [];
            if (this.Container.filters !== null)
                unitFilters = this.Container.filters;
            if (this.Owner && !value && unitFilters.indexOf(filters.Inactive) === -1)
                unitFilters.push(filters.Inactive);
            else if (value && unitFilters.indexOf(filters.Inactive) !== -1)
                unitFilters.splice(this.Container.filters.indexOf(filters.Inactive), 1);
            this.Container.filters = unitFilters;
        }
        GetResource(name, path) {
            let subPaths = path.split(".");
            let resource = gameResources;
            for (let subPath of subPaths) {
                resource = resource[subPath];
            }
            return resource;
        }
        Initialize() {
            let self = this;
            for (let key in this.Resources) {
                self.Animations[key] = self.GetResource(key, self.Resources[key])();
            }
            Object.keys(self.Animations).forEach(function (key) { self.Animations[key].visible = false; });
            self.Animations.idle.visible = true;
            self.Animations.idle.interactive = true;
            self.Animations.idle.buttonMode = true;
            if (self.Container.filters === null)
                self.Container.filters = [];
            let unitFilters = self.Container.filters;
            var advanceWarsOwner = self.Owner;
            if (advanceWarsOwner !== null && filters[advanceWarsOwner.Color + "Team"])
                unitFilters.push(filters[advanceWarsOwner.Color + "Team"]);
            self.Container.filters = unitFilters;
            Object.keys(self.Animations).forEach(function (key) {
                self.Container.addChildAt(self.Animations[key], 0);
            });
            if (this.Node === null)
                return;
            self.Game.UnitContainer.addChild(self.Container);
            let tile = this.Node;
            let x = tile.X ? tile.X : 0;
            let y = tile.Y ? tile.Y : 0;
            self.Container.x = x * self.Animations.idle.width;
            self.Container.y = y * self.Animations.idle.height;
            self.Animations.idle.on("pointertap", function (e) {
                if (self.Owner != self.Game.CurrentPlayer)
                    for (let funct in self.NonOwnerClickEvent) {
                        self.NonOwnerClickEvent[funct](e);
                    }
                if (self.Owner != self.Game.CurrentPlayer || !self.Game.TurnResolver.IsActive(self.Owner) || !self.Active)
                    return;
                self.Game.ClearIndicators();
                for (let key in self.ActiveClickEvent) {
                    if (typeof self.ActiveClickEvent[key] === "function")
                        self.ActiveClickEvent[key](e);
                }
            });
            self.Game.TurnResolver.StartTurnEvent[self.Id] = function (activePlayers) {
                if (unitFilters.indexOf(filters.Inactive) !== -1)
                    unitFilters.splice(self.Container.filters.indexOf(filters.Inactive), 1);
            };
        }
        Destroy() {
            super.Destroy();
            this.Game.UnitContainer.removeChild(this.Container);
            let self = this;
            for (let key in this.Behaviours) {
                if (typeof self.Behaviours[key] === "object" && "Destroy" in self.Behaviours[key]) {
                    self.Behaviours[key].Destroy();
                }
            }
            delete self.Game.TurnResolver[self.Id];
        }
        ExecuteMove(move) {
            if (this.Active && super.ExecuteMove(move)) {
                this.Active = false;
                return true;
            }
            return false;
        }
    }
    TurnBasedBoardGame.Unit = Unit;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class AttackAnimation {
        constructor(attacker, attackerTile, defender, defenderTile, callback) {
            let self = this;
            self.AttackerContainer = new PIXI.Container();
            self.DefenderContainer = new PIXI.Container();
            attacker.Container.visible = false;
            defender.Container.visible = false;
            self.AttackerContainer.x = attackerTile.XCoord;
            self.AttackerContainer.y = attackerTile.YCoord;
            self.DefenderContainer.x = defenderTile.XCoord;
            self.DefenderContainer.y = defenderTile.YCoord;
            let attackerAnimation = attacker.Animations["idle"];
            let defenderAnimation = defender.Animations["idle"];
            attackerAnimation.visible = true;
            defenderAnimation.visible = true;
            let attackerOwner = attacker.Owner;
            let defenderOwner = defender.Owner;
            self.AttackerContainer.filters = [filters[attackerOwner.Color + "Team"]];
            self.DefenderContainer.filters = filters[defenderOwner.Color + "Team"] ? [filters[defenderOwner.Color + "Team"]] : [];
            self.AttackerContainer.addChild(attackerAnimation);
            self.DefenderContainer.addChild(defenderAnimation);
            mainContainer.addChild(self.AttackerContainer);
            mainContainer.addChild(self.DefenderContainer);
            let attackXDirection = defenderTile.X - attackerTile.X;
            attackXDirection = attackXDirection == 0 ? 0 : attackXDirection / Math.abs(attackXDirection);
            let attackYDirection = defenderTile.Y - attackerTile.Y;
            attackYDirection = attackYDirection == 0 ? 0 : attackYDirection / Math.abs(attackYDirection);
            let attackDuration = 100;
            let attackLength = terrainWidth * 0.3;
            let flashDuration = 100;
            let whiteFilter = new PIXI.filters.ColorMatrixFilter();
            whiteFilter.matrix = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            var attackFunction = (delta) => {
                let deltaTime = delta * (1000 / 60);
                self.AttackerContainer.x += attackXDirection * attackLength * (deltaTime / attackDuration);
                self.AttackerContainer.y += attackYDirection * attackLength * (deltaTime / attackDuration);
            };
            pixiApp.ticker.add(attackFunction);
            setTimeout(() => {
                pixiApp.ticker.remove(attackFunction);
                self.AttackerContainer.x = attackerTile.XCoord;
                self.AttackerContainer.y = attackerTile.YCoord;
                let filters = self.DefenderContainer.filters;
                filters.push(whiteFilter);
                self.DefenderContainer.filters = filters;
            }, attackDuration);
            setTimeout(() => {
                self.DefenderContainer.filters.splice(self.DefenderContainer.filters.indexOf(whiteFilter), 1);
                attacker.Container.visible = true;
                defender.Container.visible = true;
                attacker.Container.addChildAt(attackerAnimation, 0);
                defender.Container.addChildAt(defenderAnimation, 0);
                self.AttackerContainer.destroy();
                self.DefenderContainer.destroy();
                callback();
            }, attackDuration + flashDuration);
        }
    }
    TurnBasedBoardGame.AttackAnimation = AttackAnimation;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class CaptureAnimation {
        constructor(Unit, tile, startingPercentage, endingPercentage, callback) {
            this.Unit = Unit;
            this.Runtime = 2000;
            var self = this;
            var gameSpeed = Unit.Game.GameSpeed;
            self.Runtime /= gameSpeed;
            let style = new PIXI.TextStyle({
                fill: '#3afeda',
                fontFamily: "Times New Roman",
                strokeThickness: 5,
                fontSize: 15
            });
            self.PixiText = new PIXI.Text(startingPercentage + "%", style);
            self.PixiText.x = 18;
            self.PixiText.y = 31;
            self.Unit.Container.visible = false;
            let animation = self.Unit.Animations["capture"];
            self.Container = new PIXI.Container();
            var advanceWarsOwner = Unit.Owner;
            self.Container.filters = [filters[advanceWarsOwner.Color + "Team"]];
            self.Container.x = tile.X * terrainWidth;
            self.Container.y = tile.Y * terrainHeight;
            self.Container.addChild(animation);
            self.Container.addChild(self.PixiText);
            mainContainer.addChild(self.Container);
            animation.visible = true;
            let startingTime = Date.now();
            let tickerFunction = () => {
                let currentPercentage = Math.min(endingPercentage, Math.round(startingPercentage + (endingPercentage - startingPercentage) * (Date.now() - startingTime) / (self.Runtime - 800)));
                self.PixiText.text = currentPercentage + "%";
            };
            pixiApp.ticker.add(tickerFunction);
            setTimeout(() => {
                pixiApp.ticker.remove(tickerFunction);
                animation.visible = false;
                self.Container.destroy();
                self.PixiText.destroy();
                self.Unit.Container.visible = true;
                callback();
            }, self.Runtime);
        }
    }
    TurnBasedBoardGame.CaptureAnimation = CaptureAnimation;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class PathAnimation {
        constructor(path, unit, callback) {
            this.Tiles = [];
            this.Speed = 0.2;
            var self = this;
            let gameSpeed = unit.Game.GameSpeed;
            this.Speed /= gameSpeed;
            this.container = new PIXI.Container();
            this.container.filters = unit.Container.filters;
            this.Unit = unit;
            path.forEach(function (tileId) {
                self.Tiles.push(TurnBasedBoardGame.Game.Instance.Board.Nodes[tileId]);
            });
            let tiles = this.Tiles;
            let x = tiles[0].X ? tiles[0].X : 0;
            let y = tiles[0].Y ? tiles[0].Y : 0;
            let animations = this.Unit.Animations;
            let usedAnimations = ["up", "down", "left", "right"];
            usedAnimations.forEach(a => self.container.addChild(animations[a]));
            this.container.x = x;
            this.container.y = y;
            mainContainer.addChild(this.container);
            let time = 0;
            let speed = this.Speed;
            let tileWidth = animations.up.width;
            let tileHeight = animations.up.height;
            let lastIndex = -1;
            let tickerFunction = function (delta) {
                time += delta;
                let progress = time / 100 / speed;
                let index = Math.floor(progress);
                if (index >= tiles.length - 1) {
                    pixiApp.ticker.remove(tickerFunction);
                    mainContainer.removeChild(self.container);
                    usedAnimations.forEach(a => animations[a].visible = false);
                    if (callback)
                        callback();
                }
                else {
                    let xPos = (tiles[index].X * (1 - progress % 1) + tiles[Math.min(index + 1, tiles.length - 1)].X * (progress % 1)) * tileWidth;
                    let yPos = (tiles[index].Y * (1 - progress % 1) + tiles[Math.min(index + 1, tiles.length - 1)].Y * (progress % 1)) * tileHeight;
                    if (lastIndex != index) {
                        usedAnimations.forEach(a => animations[a].visible = false);
                        if (tiles[index].X < tiles[Math.min(tiles.length - 1, index + 1)].X) {
                            animations.right.visible = true;
                        }
                        if (tiles[index].X > tiles[Math.min(tiles.length - 1, index + 1)].X) {
                            animations.left.visible = true;
                        }
                        if (tiles[index].Y < tiles[Math.min(tiles.length - 1, index + 1)].Y) {
                            animations.down.visible = true;
                        }
                        if (tiles[index].Y > tiles[Math.min(tiles.length - 1, index + 1)].Y) {
                            animations.up.visible = true;
                        }
                    }
                    lastIndex = index;
                    self.container.x = xPos;
                    self.container.y = yPos;
                }
            };
            pixiApp.ticker.add(tickerFunction);
        }
    }
    TurnBasedBoardGame.PathAnimation = PathAnimation;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    function SpriteDisappearAnimation(sprite, callback, duration = 3000) {
        let elapsedTime = 0;
        let startingY = sprite.y;
        let tickerFunction = function (deltaTime) {
            elapsedTime += PIXI.ticker.shared.elapsedMS;
            if (elapsedTime >= duration) {
                sprite.y = startingY - (elapsedTime - duration) * 0.01;
                sprite.alpha = 1 - (elapsedTime - duration) * 0.005;
            }
            if (elapsedTime >= duration + 1000) {
                pixiApp.ticker.remove(tickerFunction);
                callback();
            }
        };
        pixiApp.ticker.add(tickerFunction);
    }
    TurnBasedBoardGame.SpriteDisappearAnimation = SpriteDisappearAnimation;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class TextDisappearAnimation {
        constructor(text, style, x, y, container) {
            this.Duration = 3000;
            var self = this;
            this.Text = new PIXI.Text(text, style);
            this.Text.x = x;
            this.Text.y = y;
            container.addChild(self.Text);
            let elapsedTime = 0;
            let tickerFunction = function (deltaTime) {
                elapsedTime += PIXI.ticker.shared.elapsedMS;
                if (elapsedTime >= self.Duration) {
                    self.Text.y = y - (elapsedTime - self.Duration) * 0.01;
                    self.Text.alpha = 1 - (elapsedTime - self.Duration) * 0.005;
                }
                if (elapsedTime >= self.Duration + 1000) {
                    pixiApp.ticker.remove(tickerFunction);
                    container.removeChild(self.Text);
                    self.Text.destroy();
                }
            };
            pixiApp.ticker.add(tickerFunction);
        }
    }
    TurnBasedBoardGame.TextDisappearAnimation = TextDisappearAnimation;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class Preview {
        constructor(attackPreview, defendPreview) {
            this.attackPreview = attackPreview;
            this.defendPreview = defendPreview;
        }
    }
    TurnBasedBoardGame.Preview = Preview;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class CaptureIndicator {
        constructor(captureBehaviour, building) {
            this.building = building;
            let self = this;
            this.Sprite = gameResources.indicators.captureIndicator();
            this.Sprite.x = building.X * this.Sprite.width;
            this.Sprite.y = building.Y * this.Sprite.height;
            self.Sprite.alpha = 0.5;
            this.Sprite.interactive = true;
            this.Sprite.buttonMode = true;
            self.ClickAction = () => {
                let captureCommand = captureBehaviour.GetMoveCommand(building);
                TurnBasedBoardGame.Game.Instance.GiveCommand(captureCommand);
            };
            this.Sprite.on("pointertap", function (e) {
                self.ClickAction();
            });
            this.Sprite.on("mouseover", function (e) {
                self.Sprite.tint = 0xa83232;
            });
            this.Sprite.on("mouseout", function (e) {
                self.Sprite.tint = 0xFFFFFF;
            });
            mainContainer.addChild(this.Sprite);
        }
        Click() {
            this.ClickAction();
        }
        Clear() {
            mainContainer.removeChild(this.Sprite);
        }
        CoversTile(tile) {
            if (this.building === tile)
                return true;
            return false;
        }
    }
    TurnBasedBoardGame.CaptureIndicator = CaptureIndicator;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class NormalCaptureBehaviour {
        constructor() {
            this._captureProgress = 0;
        }
        get CurrentCaptureStrength() {
            return this.HealthStats.CurrentHealth / this.HealthStats.MaxHealth * this.BaseCaptureStrength;
        }
        ;
        get CaptureProgress() {
            return this._captureProgress;
        }
        set CaptureProgress(value) {
            this._captureProgress = value;
            let progress = this.CapturePercentage;
            let progressText = progress > 0 && progress < 100 ? progress + "%" : "";
            if (this.PixiText)
                this.PixiText.text = progressText;
        }
        get CapturePercentage() {
            return Math.round(this.CaptureProgress / this.CaptureCompletion * 100);
        }
        Initialize() {
            let self = this;
            let style = new PIXI.TextStyle({
                fill: '#3afeda',
                fontFamily: "Times New Roman",
                strokeThickness: 5,
                fontSize: 13
            });
            let progress = Math.round(self.CaptureProgress / self.CaptureCompletion * 100);
            let progressText = progress > 0 && progress < 100 ? progress + "%" : "";
            self.PixiText = new PIXI.Text(progressText, style);
            self.PixiText.x = 0;
            self.PixiText.y = 31;
            self.Unit.Container.addChild(self.PixiText);
            self.MoveBehaviour.ClickEvent[this.Id] = function (tile) {
                if (tile instanceof TurnBasedBoardGame.Building && tile.Owner !== self.Unit.Owner)
                    self.Game.Indicators.push(new TurnBasedBoardGame.CaptureIndicator(self, tile));
            };
            self.Unit.ActiveClickEvent[this.Id] = function (e) {
                // Check if were standing on a building
                if (self.Unit.Node instanceof TurnBasedBoardGame.Building && self.Unit.Node.Owner !== self.Unit.Owner) {
                    // If there is already an indicator on our unit, we remove it.
                    let indicator = self.Game.Indicators.find(i => i.CoversTile(self.Unit.Node));
                    if (indicator) {
                        let index = self.Game.Indicators.indexOf(indicator);
                        self.Game.Indicators.splice(index, 1);
                        indicator.Clear();
                    }
                    self.Game.Indicators.push(new TurnBasedBoardGame.CaptureIndicator(self, self.Unit.Node));
                }
            };
            this.MoveBehaviour.MoveEvent[this.Id + this.Unit.Id] = function () {
                self.CaptureProgress = 0;
            };
        }
        GetMoveCommand(tile) {
            let moveCommand = this.MoveBehaviour.GetMoveCommand(tile);
            return { "id": this.Unit.Id, "data": { "id": this.Id, "data": { "moveCommand": moveCommand.data.data, "placeholder": "placeholder" } } };
        }
        ExecuteMove(move) {
            let self = this;
            self.MoveBehaviour.ExecuteMoveAndCallback(move.moveCommand, (moveEnd) => {
                let building = this.Unit.Node;
                let startingProgress = self.CapturePercentage;
                self.CaptureProgress += Math.floor(self.HealthStats.CurrentHealth / self.HealthStats.MaxHealth * self.BaseCaptureStrength);
                let endingProgress = self.CapturePercentage;
                if (self.CaptureProgress >= self.CaptureCompletion) {
                    let previousOwner = building.Owner;
                    building.Owner = self.Unit.Owner;
                    building.TriggerCaptureEvent(previousOwner, self.Unit.Owner);
                }
                let captureAnimation = new TurnBasedBoardGame.CaptureAnimation(self.Unit, self.Unit.Node, startingProgress, endingProgress, () => { moveEnd(); });
            });
            return true;
        }
        Destroy() {
            delete this.Game.CommandEvent[this.Id + this.Unit.Id];
            delete this.MoveBehaviour.MoveEvent[this.Id + this.Unit.Id];
        }
    }
    TurnBasedBoardGame.NormalCaptureBehaviour = NormalCaptureBehaviour;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="../../Unit.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class NormalCaptureBehaviourTemplate {
        constructor() {
            this.BaseCaptureStrength = 0;
            this.CaptureCompletion = 0;
        }
        AddBehaviour(unit) {
            let self = this;
            let captureBehaviour = new TurnBasedBoardGame.NormalCaptureBehaviour();
            Object.assign(captureBehaviour, self);
            let moveBehaviour = null;
            for (let key in unit.Behaviours)
                if (TurnBasedBoardGame.IsIMoveBehaviour(unit.Behaviours[key]))
                    moveBehaviour = unit.Behaviours[key];
            let combatBehaviour = null;
            for (let key in unit.Behaviours)
                if (TurnBasedBoardGame.IsIHealth(unit.Behaviours[key]))
                    combatBehaviour = unit.Behaviours[key];
            captureBehaviour.MoveBehaviour = moveBehaviour;
            captureBehaviour.HealthStats = combatBehaviour;
            captureBehaviour.Unit = unit;
            captureBehaviour.Game = unit.Game;
            captureBehaviour.Id = unit.Id + self.Class;
            captureBehaviour.Initialize();
            unit.Behaviours[captureBehaviour.Id] = captureBehaviour;
        }
    }
    TurnBasedBoardGame.NormalCaptureBehaviourTemplate = NormalCaptureBehaviourTemplate;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class AttackIndicator {
        constructor(game, primaryIndicator, combatBehaviour, from, target) {
            let self = this;
            let attackedTile = target.Node;
            let attackingTile = combatBehaviour.Unit.Node;
            self.TileThatIsAttacked = attackedTile;
            self.DefendingUnit = target;
            // Find enemy combat behaviour.
            let enemyCombatBehaviour;
            for (let key in target.Behaviours)
                if (TurnBasedBoardGame.IsICombatBehaviour(target.Behaviours[key]))
                    enemyCombatBehaviour = target.Behaviours[key];
            // Show previews.
            let preview = combatBehaviour.GetPreview(enemyCombatBehaviour);
            let attackPreview = preview.attackPreview;
            let defendPreview = preview.defendPreview;
            let style = new PIXI.TextStyle({
                fill: 'yellow',
                fontFamily: "Times New Roman",
                strokeThickness: 5,
                fontSize: 16
            });
            this.AttackText = new PIXI.Text(Math.max(0, Math.ceil(attackPreview)).toString(), style);
            this.DefendText = new PIXI.Text(Math.min(100, Math.max(0, Math.ceil(defendPreview))).toString(), style);
            this.AttackText.x = attackedTile.X * terrainWidth;
            this.AttackText.y = attackedTile.Y * terrainHeight - 5;
            this.DefendText.x = attackingTile.X * terrainWidth;
            this.DefendText.y = attackingTile.Y * terrainHeight - 5;
            this.AttackText.alpha = 0;
            this.DefendText.alpha = 0;
            self.AttackingUnit = combatBehaviour.Unit;
            this.Sprite = gameResources.indicators.attackIndicator();
            //if (Tile.X < attackTile.X)
            //    this.Sprite = gameResources.indicators.attackIndicatorRight();
            //if (Tile.X > attackTile.X)
            //    this.Sprite = gameResources.indicators.attackIndicatorLeft();
            //if (Tile.Y < attackTile.Y)
            //    this.Sprite = gameResources.indicators.attackIndicatorDown();
            //if (Tile.Y > attackTile.Y)
            //    this.Sprite = gameResources.indicators.attackIndicatorUp();
            self.Sprite.alpha = 0.5;
            this.Sprite.interactive = true;
            this.Sprite.buttonMode = true;
            // If this is a secondary indicator we need to spawn it on the tile its attack from instead of the tile its attacking.
            if (primaryIndicator) {
                self.Sprite.x = self.TileThatIsAttacked.X * terrainWidth;
                self.Sprite.y = self.TileThatIsAttacked.Y * terrainHeight;
            }
            else {
                self.Sprite.x = from[0].X * terrainWidth;
                self.Sprite.y = from[0].Y * terrainHeight;
            }
            // If we click the indidicator:
            self.ClickAction = () => {
                // If we can only attack from one side, we attack.
                if (from.length == 1) {
                    let attackCommand = combatBehaviour.GetAttackCommand(from[0], target);
                    TurnBasedBoardGame.Game.Instance.GiveCommand(attackCommand);
                }
                // Otherwise we spawn new attack indicators for each side.
                else {
                    game.ClearIndicators();
                    from.forEach((tile) => {
                        game.Indicators.push(new AttackIndicator(game, false, combatBehaviour, [tile], attackedTile.Piece));
                    });
                }
            };
            // Mobile
            this.Sprite.on("pointertap", function (e) {
                self.ClickAction();
            });
            // Hover effects
            this.Sprite.on("mouseover", function (e) {
                self.Sprite.tint = 0xa83232;
                self.AttackText.alpha = 1;
                self.DefendText.alpha = 1;
            });
            this.Sprite.on("mouseout", function (e) {
                self.Sprite.tint = 0xFFFFFF;
                self.AttackText.alpha = 0;
                self.DefendText.alpha = 0;
            });
            mainContainer.addChild(self.Sprite);
            mainContainer.addChild(self.AttackText);
            mainContainer.addChild(self.DefendText);
        }
        Click() {
            this.ClickAction();
        }
        Clear() {
            mainContainer.removeChild(this.Sprite);
            mainContainer.removeChild(this.DefendText);
            mainContainer.removeChild(this.AttackText);
        }
        CoversTile(tile) {
            if (this.TileThatIsAttacked === tile)
                return true;
            return false;
        }
    }
    TurnBasedBoardGame.AttackIndicator = AttackIndicator;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class NormalCombatBehaviour {
        constructor() {
            this.AttackNumber = 0;
        }
        GetPreview(defender) {
            var attackPreview = this.AttackPreview(defender);
            return new TurnBasedBoardGame.Preview(attackPreview, defender.DefendPreview(this, attackPreview));
        }
        Initialize() {
            let self = this;
            let style = new PIXI.TextStyle({
                fill: "white",
                fontFamily: "Times New Roman",
                strokeThickness: 5,
                fontSize: 15
            });
            let health = Math.ceil(this.CurrentHealth);
            let healthText = health < 100 ? health.toString() : "";
            this.PixiText = new PIXI.Text(healthText, style);
            this.PixiText.x = 0;
            this.PixiText.y = -5;
            this.Unit.Container.addChild(this.PixiText);
            this.Unit.ActiveClickEvent[this.Id] = function (e) {
                self.SpawnAttackIndicators();
                self.SpawnDamageIndicators();
            };
        }
        SpawnAttackIndicators() {
            let self = this;
            let reachableTiles = self.MoveBehaviour.GetReachableTiles();
            // We need to spawn attack indicators. 
            // For each attack indicator there are 1-4 neighbouring tiles from which the attack can come.
            // In this object we store a list of these 1-4 neighbouring tiles for each attack indicator.
            // We use these lists later to instantiate the attack indicators.
            let attackIndicators = {};
            // Loop over reachable tiles
            reachableTiles.forEach((tile) => {
                // Check all adjacent tiles for enemies
                if (tile.Piece == self.Unit || tile.Piece == null) {
                    tile.Neighbours.forEach((neighbour) => {
                        let enemyUnit = neighbour.Piece;
                        // Check if there is an enemy unit on the tile
                        if (neighbour.Piece != null && neighbour.Piece.Owner.Team != self.Unit.Owner.Team && self.IsValidTarget(enemyUnit)) {
                            // Check if this unit was encountered from a different tile already.
                            if (!attackIndicators[neighbour.X])
                                attackIndicators[neighbour.X] = {};
                            if (!attackIndicators[neighbour.X][neighbour.Y])
                                attackIndicators[neighbour.X][neighbour.Y] = { target: enemyUnit, from: [] };
                            // Add tile to list.
                            let list = attackIndicators[neighbour.X][neighbour.Y]["from"];
                            list.push(tile);
                        }
                    });
                }
            });
            // Instantiate attack indicators.
            for (let x in attackIndicators) {
                for (let y in attackIndicators[x]) {
                    self.Game.Indicators.push(new TurnBasedBoardGame.AttackIndicator(self.Game, true, self, attackIndicators[x][y]["from"], attackIndicators[x][y]["target"]));
                }
            }
        }
        SpawnDamageIndicators() {
            let self = this;
            let owner = self.Unit.Owner;
            this.Game.Players.forEach(ap => {
                if (ap.Team != owner.Team || (owner.Team === -1 && ap != owner)) {
                    ap.Pieces.forEach(p => {
                        let enemy = p;
                        let enemyTile = enemy.Node;
                        if (enemyTile == null)
                            return;
                        let enemyCombatBehaviour = enemy.BehaviourList.find(TurnBasedBoardGame.IsICombatBehaviour);
                        let preview = self.DamagePreview(enemyCombatBehaviour);
                        self.Game.Indicators.push(new TurnBasedBoardGame.DamageIndicator(preview, enemyTile.XCoord, enemyTile.YCoord));
                    });
                }
            });
        }
        GetAttackMultiplier(defenderUnitType, callback) {
            let self = this;
            let owner = this.Unit.Owner;
            let co = owner.CO;
            this.AttackNumber++;
            let baseDamage = self.DamageChart.BaseDamage(self.UnitType, defenderUnitType);
            this.Game.GetRandom(this.Unit.Id + this.Id + this.AttackNumber, function (random) {
                let randomBonus = baseDamage === 0 ? 0 : random;
                let attackMultieplier = Math.floor((Math.floor(baseDamage * co.Attack / 100) + randomBonus) * self.CurrentHealth / self.MaxHealth);
                callback(Math.max(0, attackMultieplier));
            });
        }
        DamagePreview(defender) {
            let self = this;
            let owner = this.Unit.Owner;
            let co = owner.CO;
            let baseDamage = self.DamageChart.BaseDamage(self.UnitType, defender.UnitType);
            let damage = (baseDamage * co.Attack / 100) * self.CurrentHealth / self.MaxHealth;
            let preview = Math.floor(damage * defender.GetDefenceMultiplier());
            return preview;
        }
        AttackPreview(defender) {
            return defender.CurrentHealth - this.DamagePreview(defender);
        }
        DefendPreview(attacker, attackPreview) {
            let self = this;
            let owner = this.Unit.Owner;
            let co = owner.CO;
            let baseDamage = self.DamageChart.BaseDamage(self.UnitType, attacker.UnitType);
            let damage = (baseDamage * co.Attack / 100) * attackPreview / self.MaxHealth;
            let preview = attacker.CurrentHealth - Math.floor(damage * attacker.GetDefenceMultiplier());
            return preview;
        }
        GetDefenceMultiplier() {
            let coDefence = 100;
            if (this.Unit.Owner)
                coDefence = this.Unit.Owner.CO.Defence;
            let tile = this.Unit.Node;
            if (tile == null || tile == undefined)
                throw { "message": "Tile of this unit is null when loading damage indicators", "Unit": this.Unit };
            return (200 - (coDefence + Math.floor(tile.Stars * 10 * this.CurrentHealth / this.MaxHealth))) / 100;
        }
        SetCurrentHealth(value) {
            var self = this;
            self.CurrentHealth = value;
            let health = Math.ceil(this.CurrentHealth);
            let healthText = health < 100 ? health.toString() : "";
            self.PixiText.text = healthText;
            if (self.CurrentHealth <= 0)
                self.Unit.Destroy();
        }
        ExecuteMove(move) {
            let self = this;
            let enemy = this.Game.Pieces[move.target];
            this.MoveBehaviour.ExecuteMoveAndCallback(move.moveCommand, function (moveEnd) {
                let attackAnimation = new TurnBasedBoardGame.AttackAnimation(self.Unit, self.Unit.Node, enemy, enemy.Node, () => { moveEnd(); });
                self.AttackUnit(enemy);
            });
            return true;
        }
        GetAttackCommand(from, target) {
            let moveCommand = this.MoveBehaviour.GetMoveCommand(from);
            return { "id": this.Unit.Id, "data": { "id": this.Id, "data": { "moveCommand": moveCommand.data.data, "target": target.Id } } };
        }
        AttackUnit(unit) {
            let self = this;
            let enemyCombatBehaviour;
            for (let key in unit.Behaviours) {
                if (typeof unit.Behaviours[key] === "object" && "DefendAndCounter" in unit.Behaviours[key]) {
                    enemyCombatBehaviour = unit.Behaviours[key];
                    break;
                }
            }
            this.GetAttackMultiplier(enemyCombatBehaviour.UnitType, function (attackMultiplier) { enemyCombatBehaviour.DefendAndCounter(self, attackMultiplier); });
        }
        DefendAndCounter(damageSource, attackMultiplier) {
            this.SetCurrentHealth(this.CurrentHealth - Math.floor(attackMultiplier * this.GetDefenceMultiplier()));
            this.GetAttackMultiplier(damageSource.UnitType, function (attackMultiplier) { damageSource.Defend(this, attackMultiplier); });
        }
        Defend(damageSource, attackMultiplier) {
            this.SetCurrentHealth(this.CurrentHealth - Math.floor(attackMultiplier * this.GetDefenceMultiplier()));
        }
        IsValidTarget(unit) {
            let enemyCombatBehaviour = unit.BehaviourList.find(TurnBasedBoardGame.IsICombatBehaviour);
            return ((this.DamageChart.BaseDamage(this.UnitType, enemyCombatBehaviour.UnitType)) != 0);
        }
        Destroy() {
            delete this.Game.CommandEvent[this.Id + this.Unit.Id];
        }
    }
    TurnBasedBoardGame.NormalCombatBehaviour = NormalCombatBehaviour;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="NormalCombatBehaviour.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class RangedCombatBehaviour extends TurnBasedBoardGame.NormalCombatBehaviour {
        Initialize() {
            super.Initialize();
            if (this.MoveBehaviour)
                delete this.MoveBehaviour.ClickEvent[this.Id];
        }
        SpawnAttackIndicators() {
            let self = this;
            let tile = self.Unit.Node;
            var nodesInRange = Graph.BreadFirstSearch(tile, this.MaxRange);
            nodesInRange.forEach((node) => {
                let tileInRange = node;
                var range = Math.abs(tile.X - tileInRange.X) + Math.abs(tile.Y - tileInRange.Y);
                if (range >= self.MinRange && tileInRange.Piece != null && tileInRange.Piece.Owner != self.Unit.Owner)
                    self.Game.Indicators.push(new TurnBasedBoardGame.AttackIndicator(self.Game, true, self, [tile], tileInRange.Piece));
            });
        }
        AttackUnit(unit) {
            let self = this;
            let enemyCombatBehaviour;
            for (let key in unit.Behaviours) {
                if (typeof unit.Behaviours[key] === "object" && "DefendAndCounter" in unit.Behaviours[key]) {
                    enemyCombatBehaviour = unit.Behaviours[key];
                    break;
                }
            }
            this.GetAttackMultiplier(enemyCombatBehaviour.UnitType, function (attackMultiplier) { enemyCombatBehaviour.Defend(self, attackMultiplier); });
        }
        DefendAndCounter(damageSource, attackMultiplier) {
            this.Defend(damageSource, attackMultiplier);
        }
        GetPreview(defender) {
            var attackPreview = this.AttackPreview(defender);
            return new TurnBasedBoardGame.Preview(attackPreview, this.CurrentHealth);
        }
        DefendPreview(attacker, attackPreview) {
            return attacker.CurrentHealth;
        }
    }
    TurnBasedBoardGame.RangedCombatBehaviour = RangedCombatBehaviour;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="RangedCombatBehaviour.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class CannotAttackCombatBehaviour extends TurnBasedBoardGame.RangedCombatBehaviour {
        Initialize() {
            super.Initialize();
            delete this.Unit.ActiveClickEvent[this.Id];
        }
    }
    TurnBasedBoardGame.CannotAttackCombatBehaviour = CannotAttackCombatBehaviour;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="../../Unit.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class NormalCombatBehaviourTemplate {
        constructor() {
            this.MaxHealth = 0;
            this.UnitType = TurnBasedBoardGame.UnitType.Infantry;
        }
        AddBehaviour(unit) {
            let self = this;
            let combatBehaviour = new TurnBasedBoardGame.NormalCombatBehaviour();
            Object.assign(combatBehaviour, self);
            let moveBehaviour = null;
            for (let key in unit.Behaviours)
                if (TurnBasedBoardGame.IsIMoveBehaviour(unit.Behaviours[key]))
                    moveBehaviour = unit.Behaviours[key];
            combatBehaviour.MoveBehaviour = moveBehaviour;
            combatBehaviour.Unit = unit;
            combatBehaviour.Game = unit.Game;
            combatBehaviour.CurrentHealth = self.MaxHealth;
            combatBehaviour.Id = unit.Id + self.Class;
            combatBehaviour.Initialize();
            unit.Behaviours[combatBehaviour.Id] = combatBehaviour;
        }
    }
    TurnBasedBoardGame.NormalCombatBehaviourTemplate = NormalCombatBehaviourTemplate;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="../../Unit.ts" />
/// <reference path="NormalCombatBehaviourTemplate.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class CannotAttackCombatBehaviourTemplate extends TurnBasedBoardGame.NormalCombatBehaviourTemplate {
        AddBehaviour(unit) {
            let self = this;
            let combatBehaviour = new TurnBasedBoardGame.CannotAttackCombatBehaviour();
            Object.assign(combatBehaviour, self);
            combatBehaviour.Unit = unit;
            combatBehaviour.Game = unit.Game;
            combatBehaviour.CurrentHealth = self.MaxHealth;
            combatBehaviour.Id = unit.Id + self.Class;
            combatBehaviour.Initialize();
            unit.Behaviours[combatBehaviour.Id] = combatBehaviour;
        }
    }
    TurnBasedBoardGame.CannotAttackCombatBehaviourTemplate = CannotAttackCombatBehaviourTemplate;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class DamageIndicator {
        constructor(damage, x, y) {
            let style = new PIXI.TextStyle({
                fill: 'red',
                fontFamily: "Times New Roman",
                strokeThickness: 5,
                fontSize: 15
            });
            this.PixiText = new PIXI.Text(damage.toString(), style);
            this.PixiText.x = x;
            this.PixiText.y = y + 11;
            mainContainer.addChild(this.PixiText);
        }
        CoversTile(tile) {
            return false;
        }
        Click() {
            throw new Error("Method not implemented.");
        }
        Clear() {
            mainContainer.removeChild(this.PixiText);
        }
    }
    TurnBasedBoardGame.DamageIndicator = DamageIndicator;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="../../Unit.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class RangedCombatBehaviourTemplate extends TurnBasedBoardGame.NormalCombatBehaviourTemplate {
        AddBehaviour(unit) {
            let self = this;
            let combatBehaviour = new TurnBasedBoardGame.RangedCombatBehaviour();
            Object.assign(combatBehaviour, self);
            let moveBehaviour = null;
            for (let key in unit.Behaviours)
                if (TurnBasedBoardGame.IsIMoveBehaviour(unit.Behaviours[key]))
                    moveBehaviour = unit.Behaviours[key];
            combatBehaviour.MoveBehaviour = moveBehaviour;
            combatBehaviour.Unit = unit;
            combatBehaviour.Game = unit.Game;
            combatBehaviour.CurrentHealth = self.MaxHealth;
            combatBehaviour.Id = unit.Id + self.Class;
            combatBehaviour.Initialize();
            unit.Behaviours[combatBehaviour.Id] = combatBehaviour;
        }
    }
    TurnBasedBoardGame.RangedCombatBehaviourTemplate = RangedCombatBehaviourTemplate;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    let UnitType;
    (function (UnitType) {
        UnitType[UnitType["Infantry"] = 0] = "Infantry";
        UnitType[UnitType["Mech"] = 1] = "Mech";
        UnitType[UnitType["Recon"] = 2] = "Recon";
        UnitType[UnitType["APC"] = 3] = "APC";
        UnitType[UnitType["Tank"] = 4] = "Tank";
        UnitType[UnitType["MediumTank"] = 5] = "MediumTank";
        UnitType[UnitType["NeoTank"] = 6] = "NeoTank";
        UnitType[UnitType["Artillery"] = 7] = "Artillery";
        UnitType[UnitType["Rockets"] = 8] = "Rockets";
        UnitType[UnitType["AntiAir"] = 9] = "AntiAir";
        UnitType[UnitType["Missiles"] = 10] = "Missiles";
        UnitType[UnitType["Copter"] = 11] = "Copter";
        UnitType[UnitType["TransportCopter"] = 12] = "TransportCopter";
        UnitType[UnitType["Bomber"] = 13] = "Bomber";
        UnitType[UnitType["Fighter"] = 14] = "Fighter";
        UnitType[UnitType["Battleship"] = 15] = "Battleship";
        UnitType[UnitType["Cruiser"] = 16] = "Cruiser";
        UnitType[UnitType["Sub"] = 17] = "Sub";
        UnitType[UnitType["Lander"] = 18] = "Lander";
        UnitType[UnitType["DestructablePipe"] = 19] = "DestructablePipe";
        UnitType[UnitType["None"] = 20] = "None";
    })(UnitType = TurnBasedBoardGame.UnitType || (TurnBasedBoardGame.UnitType = {}));
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class MoveCommand {
    }
    TurnBasedBoardGame.MoveCommand = MoveCommand;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class MoveIndicator {
        constructor(NormalMoveBehaviour, Tile, action, Color = 0xFFFFFF, HoverColor = 0xa83232) {
            this.NormalMoveBehaviour = NormalMoveBehaviour;
            this.Tile = Tile;
            this.Color = Color;
            this.HoverColor = HoverColor;
            let self = this;
            this.Action = action;
            this.Graphics = new PIXI.Graphics();
            this.Graphics.x = Tile.XCoord;
            this.Graphics.y = Tile.YCoord;
            this.Graphics.width = terrainWidth;
            this.Graphics.height = terrainHeight;
            this.Graphics.beginFill(self.Color);
            this.Graphics.drawRect(0, 0, terrainWidth, terrainHeight);
            this.Graphics.endFill();
            this.Graphics.alpha = 0.5;
            this.Graphics.interactive = true;
            this.Graphics.buttonMode = true;
            this.Graphics.on("pointertap", function (e) {
                action();
            });
            this.Graphics.on("mouseover", function (e) {
                self.Graphics.tint = self.HoverColor;
            });
            this.Graphics.on("mouseout", function (e) {
                self.Graphics.tint = 0xFFFFFF;
            });
            mainContainer.addChild(this.Graphics);
        }
        CoversTile(tile) {
            if (this.Tile === tile)
                return true;
            return false;
        }
        Click() {
            this.Action();
        }
        Clear() {
            mainContainer.removeChild(this.Graphics);
            this.Graphics.destroy();
        }
    }
    TurnBasedBoardGame.MoveIndicator = MoveIndicator;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class NormalMoveBehaviour {
        constructor() {
            this.ClickEvent = {};
            this.MoveEvent = {};
            this.MovementType = 0;
        }
        RaiseClickEvent(tile, path) {
            var self = this;
            self.Game.ClearIndicators();
            for (let key in self.ClickEvent)
                self.ClickEvent[key](tile);
            if (self.Game.Indicators.length == 0)
                self.Game.GiveCommand(self.GetMoveCommand(tile));
            else if (self.Game.Indicators.length == 1 && self.Game.Indicators.some(indicator => indicator.CoversTile(tile)))
                self.Game.Indicators[0].Click();
            else if (!self.Game.Indicators.some(indicator => indicator.CoversTile(tile)))
                self.Game.Indicators.push(new TurnBasedBoardGame.MoveIndicator(this, tile, function () {
                    TurnBasedBoardGame.Game.Instance.GiveCommand(self.GetMoveCommand(tile));
                }));
        }
        TriggerMoveEvent() {
            for (let key in this.MoveEvent) {
                if (typeof this.MoveEvent[key] === "function")
                    this.MoveEvent[key]();
            }
        }
        DistanceFunction(tile, unit) {
            var owner = unit.Owner;
            if (tile.Piece != null && (!tile.Piece.Owner || tile.Piece.Owner.Team != owner.Team))
                return 9999;
            if (tile.MovementCosts[TurnBasedBoardGame.MovementType[this.MovementType]])
                return tile.MovementCosts[TurnBasedBoardGame.MovementType[this.MovementType]];
            return tile.BaseMovementCost;
        }
        ;
        Initialize() {
            let self = this;
            this.Unit.ActiveClickEvent[this.Id] = function (e) {
                let reachableTileAndPaths = self.GetReachableTilesAndPaths();
                reachableTileAndPaths.reachableNodes.forEach(function (tile) {
                    if (tile.Id != self.Unit.Node.Id && tile.Piece == null)
                        TurnBasedBoardGame.Game.Instance.Indicators.push(new TurnBasedBoardGame.MoveIndicator(self, tile, function () { self.RaiseClickEvent(tile, reachableTileAndPaths.GetIdPath(tile)); }));
                });
                // If there is no indicator at our position, we create a cancel indicator.
                var position = self.Unit.Node;
                if (!self.Game.Indicators.some(indicator => indicator.CoversTile(position)))
                    TurnBasedBoardGame.Game.Instance.Indicators.push(new TurnBasedBoardGame.MoveIndicator(self, position, function () { self.Game.ClearIndicators(); }));
            };
            this.Unit.NonOwnerClickEvent[this.Id] = function () {
                let reachableTileAndPaths = self.GetReachableTilesAndPaths();
                for (let tile of reachableTileAndPaths.reachableNodes)
                    TurnBasedBoardGame.Game.Instance.Indicators.push(new TurnBasedBoardGame.MoveIndicator(self, tile, function () { self.Game.ClearIndicators(); }));
            };
        }
        GetReachableTilesAndPaths() {
            let self = this;
            let reachableTilesAndPaths = Graph.GetReachableNodesAndPaths(this.Unit.Node, function (a, b) { return self.DistanceFunction(b, self.Unit); }, this.Speed);
            return reachableTilesAndPaths;
        }
        GetReachableTiles() {
            return this.GetReachableTilesAndPaths().reachableNodes;
        }
        GetMoveCommand(tile) {
            let reachableTilesAndPaths = this.GetReachableTilesAndPaths();
            let path = reachableTilesAndPaths.GetIdPath(tile);
            return { "id": this.Unit.Id, "data": { "id": this.Id, "data": { "path": path } } };
        }
        ExecuteMove(move) {
            return this.ExecuteMoveAndCallback(move, null);
        }
        ExecuteMoveAndCallback(move, callback) {
            let self = this;
            this.Unit.Node.Piece = null;
            let path = move.path;
            var destination = this.Game.Board.Nodes[path[path.length - 1]];
            if (this.Unit.Node.Id != destination.Id)
                this.TriggerMoveEvent();
            // If unit moves to the right, make him face the right side.
            var tile = this.Unit.Node;
            if (tile.X < destination.X) {
                this.Unit.Animations.idle.anchor.set(1, 0);
                this.Unit.Animations.idle.scale.x = -Math.abs(this.Unit.Animations.idle.scale.x);
            }
            else {
                this.Unit.Animations.idle.anchor.set(0, 0);
                this.Unit.Animations.idle.scale.x = Math.abs(this.Unit.Animations.idle.scale.x);
            }
            this.Unit.Node = destination;
            destination.Piece = this.Unit;
            self.Unit.Container.visible = false;
            self.Game.MoveResolver.SetMoveInProgress();
            let moveAnimation = new TurnBasedBoardGame.PathAnimation(path, self.Unit, () => {
                self.Unit.Container.visible = true;
                self.Unit.Container.x = destination.X * terrainWidth;
                self.Unit.Container.y = destination.Y * terrainHeight;
                if (callback != null)
                    callback(() => { self.Game.MoveResolver.MoveCompleted(); });
                else
                    self.Game.MoveResolver.MoveCompleted();
            });
            return true;
        }
        Destroy() {
            delete this.Game.CommandEvent[this.Id + this.Unit.Id];
        }
    }
    TurnBasedBoardGame.NormalMoveBehaviour = NormalMoveBehaviour;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="../../Unit.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class NormalMoveBehaviourTemplate {
        constructor() {
            this.Speed = 0;
            this.MovementType = TurnBasedBoardGame.MovementType.Foot;
        }
        AddBehaviour(unit) {
            let self = this;
            let movebehaviour = new TurnBasedBoardGame.NormalMoveBehaviour();
            movebehaviour.Unit = unit;
            movebehaviour.Speed = self.Speed;
            movebehaviour.Game = unit.Game;
            movebehaviour.MovementType = self.MovementType;
            movebehaviour.Id = unit.Id + self.Class;
            movebehaviour.Initialize();
            unit.Behaviours[movebehaviour.Id] = movebehaviour;
        }
    }
    TurnBasedBoardGame.NormalMoveBehaviourTemplate = NormalMoveBehaviourTemplate;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class RepairBehaviour {
        Initialize() {
            let self = this;
            this.RepairCoordinator = this.Unit.Owner.RepairCoordinator;
            this.RepairCoordinator.CalcRepairCostsEvent[this.Unit.Id + " " + this.Id] = () => { self.CalcRepairCosts(); };
            this.RepairCoordinator.ExecuteRepairsEvent[this.Unit.Id + " " + this.Id] = () => { self.RepairUnit(); };
        }
        CalcRepairCosts() {
            let repairCosts = this.GetRepairCosts();
            this.RepairCoordinator.TurnRepairCosts += repairCosts.goldNeeded;
        }
        GetRepairCosts() {
            if (this.Unit.Node && TurnBasedBoardGame.IsBuilding(this.Unit.Node) && this.Unit.Node.Owner == this.Unit.Owner && this.UnitHealth.CurrentHealth < this.UnitHealth.MaxHealth) {
                // Check how much to repair.
                let missingHealth = this.UnitHealth.MaxHealth - this.UnitHealth.CurrentHealth;
                // Max repair is 20%.
                let percentageToRepair = Math.floor(Math.min(20, missingHealth * 100 / this.UnitHealth.MaxHealth));
                // Check if owner has enough gold.
                let goldNeeded = Math.floor(percentageToRepair * this.FullRepairCost / 100);
                return { goldNeeded: goldNeeded, percentageToRepair: percentageToRepair };
            }
            return { goldNeeded: 0, percentageToRepair: 0 };
        }
        RepairUnit() {
            let awOwner = this.Unit.Owner;
            let repairCosts = this.GetRepairCosts();
            if (repairCosts.goldNeeded == 0 && repairCosts.percentageToRepair == 0)
                return;
            // Substract gold and repair the unit.
            awOwner.Gold -= repairCosts.goldNeeded;
            this.UnitHealth.SetCurrentHealth(this.UnitHealth.CurrentHealth + Math.floor(this.UnitHealth.MaxHealth * repairCosts.percentageToRepair / 100));
            // Update HUD
            var tile = this.Unit.Node;
            var textStyle = TurnBasedBoardGame.PixiTextStyle1();
            textStyle.fill = "#46eb34";
            this.Animation = new TurnBasedBoardGame.TextDisappearAnimation("+" + repairCosts.percentageToRepair.toString(), textStyle, tile.X * terrainWidth + 20, tile.Y * terrainHeight - 5, mainContainer);
        }
        Destroy() {
            delete this.RepairCoordinator.CalcRepairCostsEvent[this.Unit.Id + " " + this.Id];
            delete this.RepairCoordinator.ExecuteRepairsEvent[this.Unit.Id + " " + this.Id];
        }
    }
    TurnBasedBoardGame.RepairBehaviour = RepairBehaviour;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="../../Unit.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class RepairBehaviourTemplate {
        AddBehaviour(unit) {
            let self = this;
            let repairBehaviour = new TurnBasedBoardGame.RepairBehaviour();
            Object.assign(repairBehaviour, self);
            let unitHealth = null;
            for (let key in unit.Behaviours)
                if (TurnBasedBoardGame.IsICombatBehaviour(unit.Behaviours[key]))
                    unitHealth = unit.Behaviours[key];
            repairBehaviour.UnitHealth = unitHealth;
            repairBehaviour.Unit = unit;
            repairBehaviour.Game = unit.Game;
            repairBehaviour.Id = unit.Id + self.Class;
            repairBehaviour.Initialize();
            unit.Behaviours[repairBehaviour.Id] = repairBehaviour;
        }
    }
    TurnBasedBoardGame.RepairBehaviourTemplate = RepairBehaviourTemplate;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    function IsITransportBehaviour(object) {
        if (object["LoadUnit"])
            return true;
        return false;
    }
    TurnBasedBoardGame.IsITransportBehaviour = IsITransportBehaviour;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class LoadTransportIndicator {
        constructor(unit, transportableBehaviour, transportBehaviour, tile, path) {
            this.unit = unit;
            this.transportableBehaviour = transportableBehaviour;
            this.tile = tile;
            this.path = path;
            let self = this;
            this.sprite = gameResources.indicators.unloadAtIndicator();
            this.sprite.x = this.tile.X * terrainWidth;
            this.sprite.y = this.tile.Y * terrainHeight;
            this.sprite.alpha = 0.5;
            this.sprite.interactive = true;
            this.sprite.buttonMode = true;
            this.sprite.on("pointertap", function (e) {
                let move = { "id": self.unit.Id, "data": { "id": self.transportableBehaviour.Id, "data": { "type": 0, "unitId": transportBehaviour.Unit.Id, "path": path } } };
                TurnBasedBoardGame.Game.Instance.GiveCommand(move);
            });
            this.sprite.on("mouseover", function (e) {
                self.sprite.tint = 0xa83232;
            });
            this.sprite.on("mouseout", function (e) {
                self.sprite.tint = 0xFFFFFF;
            });
            mainContainer.addChild(this.sprite);
        }
        CoversTile(tile) {
            return tile === this.tile;
        }
        Click() {
            throw new Error("Method not implemented.");
        }
        Clear() {
            mainContainer.removeChild(this.sprite);
            this.sprite.destroy();
        }
    }
    TurnBasedBoardGame.LoadTransportIndicator = LoadTransportIndicator;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class TransportBehaviour {
        Initialize() {
            let self = this;
            self.UnloadIndicator = gameResources.indicators.unloadIndicator();
            self.UnloadIndicator.visible = self.TransportedUnit ? true : false;
            self.Unit.Container.addChild(self.UnloadIndicator);
            if (this.MoveBehaviour)
                this.MoveBehaviour.ClickEvent[this.Id] = function (tile) {
                    if (self.TransportedUnit)
                        self.SpawnTransportIndicatorsAroundTile(tile);
                };
        }
        ExecuteMove(move) {
            let self = this;
            let tile = this.Game.Board.Nodes[move.nodeId];
            this.MoveBehaviour.ExecuteMoveAndCallback(move.moveCommand, function (moveEnd) {
                self.UnloadUnit(tile);
                moveEnd();
            });
            return true;
        }
        Destroy() {
            this.Unit.Container.removeChild(this.UnloadIndicator);
            this.UnloadIndicator.destroy();
        }
        SpawnTransportIndicatorsAroundTile(tile) {
            let self = this;
            if (!self.TransportedUnit)
                return;
            let transportedUnitMoveBehaviour = self.TransportedUnit.BehaviourList.find(TurnBasedBoardGame.IsIMoveBehaviour);
            if (!transportedUnitMoveBehaviour)
                return;
            tile.Neighbours.forEach(function (neighbourNode) {
                let neighbour = neighbourNode;
                if (neighbour.Piece == null && transportedUnitMoveBehaviour.DistanceFunction(neighbour, self.TransportedUnit) < 10)
                    self.Game.Indicators.push(new TurnBasedBoardGame.UnloadTransportIndicator(self, neighbour, tile));
            });
        }
        LoadUnit(Unit) {
            this.TransportedUnit = Unit;
            Unit.Node.Piece = null;
            Unit.Node = null;
            Unit.Container.visible = false;
            this.UnloadIndicator.visible = true;
            return true;
        }
        UnloadUnit(tile) {
            tile.Piece = this.TransportedUnit;
            this.TransportedUnit.Container.x = tile.X * terrainWidth;
            this.TransportedUnit.Container.y = tile.Y * terrainHeight;
            this.TransportedUnit.Active = false;
            this.TransportedUnit.Node = tile;
            this.TransportedUnit.Container.visible = true;
            this.TransportedUnit = null;
            this.UnloadIndicator.visible = false;
            return true;
        }
    }
    TurnBasedBoardGame.TransportBehaviour = TransportBehaviour;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    let TransportBehaviourMoveType;
    (function (TransportBehaviourMoveType) {
        TransportBehaviourMoveType[TransportBehaviourMoveType["Load"] = 0] = "Load";
        TransportBehaviourMoveType[TransportBehaviourMoveType["Unload"] = 1] = "Unload";
    })(TransportBehaviourMoveType = TurnBasedBoardGame.TransportBehaviourMoveType || (TurnBasedBoardGame.TransportBehaviourMoveType = {}));
    class TransportBehaviourMove {
        constructor(type, nodeId, unitId, moveCommand) {
            this.type = type;
            this.nodeId = nodeId;
            this.unitId = unitId;
            this.moveCommand = moveCommand;
        }
    }
    TurnBasedBoardGame.TransportBehaviourMove = TransportBehaviourMove;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="../../Unit.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class TransportBehaviourTemplate {
        AddBehaviour(unit) {
            let self = this;
            let Behaviour = new TurnBasedBoardGame.TransportBehaviour();
            Object.assign(Behaviour, self);
            let moveBehaviour = unit.BehaviourList.find(TurnBasedBoardGame.IsIMoveBehaviour);
            Behaviour.MoveBehaviour = moveBehaviour;
            Behaviour.Unit = unit;
            Behaviour.Game = unit.Game;
            Behaviour.Id = unit.Id + self.Class;
            Behaviour.Initialize();
            unit.Behaviours[Behaviour.Id] = Behaviour;
        }
    }
    TurnBasedBoardGame.TransportBehaviourTemplate = TransportBehaviourTemplate;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class TransportableBehaviour {
        Initialize() {
            let self = this;
            this.Unit.ActiveClickEvent[this.Id] = function (e) {
                var reachableTiles = self.MoveBehaviour.GetReachableTilesAndPaths();
                reachableTiles.reachableNodes.forEach((tile) => {
                    if (tile.Piece != null && tile.Piece.Owner == self.Unit.Owner) {
                        let unit = tile.Piece;
                        let transportBehaviour = unit.BehaviourList.find(TurnBasedBoardGame.IsITransportBehaviour);
                        if (transportBehaviour && !transportBehaviour.TransportedUnit) {
                            self.Game.Indicators.push(new TurnBasedBoardGame.LoadTransportIndicator(self.Unit, self, transportBehaviour, tile, reachableTiles.GetIdPath(tile)));
                        }
                    }
                });
            };
        }
        Destroy() {
        }
        ExecuteMove(move) {
            var self = this;
            let transportBehaviourUnit = TurnBasedBoardGame.Game.Instance.Pieces[move.unitId];
            let transportBehaviour = transportBehaviourUnit.BehaviourList.find(TurnBasedBoardGame.IsITransportBehaviour);
            let animation = new TurnBasedBoardGame.PathAnimation(move.path, self.Unit, null);
            return transportBehaviour.LoadUnit(self.Unit);
        }
    }
    TurnBasedBoardGame.TransportableBehaviour = TransportableBehaviour;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="../../Unit.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class TransportableBehaviourTemplate {
        AddBehaviour(unit) {
            let self = this;
            let Behaviour = new TurnBasedBoardGame.TransportableBehaviour();
            Object.assign(Behaviour, self);
            let moveBehaviour = unit.BehaviourList.find(TurnBasedBoardGame.IsIMoveBehaviour);
            Behaviour.MoveBehaviour = moveBehaviour;
            Behaviour.Unit = unit;
            Behaviour.Game = unit.Game;
            Behaviour.Id = unit.Id + self.Class;
            Behaviour.Initialize();
            unit.Behaviours[Behaviour.Id] = Behaviour;
        }
    }
    TurnBasedBoardGame.TransportableBehaviourTemplate = TransportableBehaviourTemplate;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class UnloadTransportIndicator {
        constructor(transportBehaviour, tile, from) {
            this.transportBehaviour = transportBehaviour;
            this.tile = tile;
            this.from = from;
            let self = this;
            this.Sprite = gameResources.indicators.unloadAtIndicator();
            this.Sprite.x = this.tile.X * terrainWidth;
            this.Sprite.y = this.tile.Y * terrainHeight;
            this.Sprite.interactive = true;
            this.Sprite.buttonMode = true;
            mainContainer.addChild(this.Sprite);
            this.Sprite.on("pointertap", function (e) {
                let move = { "id": self.transportBehaviour.Unit.Id, "data": { "id": self.transportBehaviour.Id, "data": { "type": 1, "nodeId": tile.Id, "moveCommand": transportBehaviour.MoveBehaviour.GetMoveCommand(from).data.data } } };
                TurnBasedBoardGame.Game.Instance.GiveCommand(move);
            });
            this.Sprite.on("mouseover", function (e) {
                self.Sprite.tint = 0xa83232;
            });
            this.Sprite.on("mouseout", function (e) {
                self.Sprite.tint = 0xFFFFFF;
            });
        }
        CoversTile(tile) {
            return (tile === this.tile);
        }
        Click() {
            throw new Error("Method not implemented.");
        }
        Clear() {
            mainContainer.removeChild(this.Sprite);
            this.Sprite.destroy();
        }
    }
    TurnBasedBoardGame.UnloadTransportIndicator = UnloadTransportIndicator;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class CancelButton {
        constructor() {
            this.ClickEvent = {};
            let self = this;
            let cancelButton = $("#Cancel");
            cancelButton.click(() => {
                for (let key in self.ClickEvent)
                    self.ClickEvent[key]();
            });
        }
    }
    TurnBasedBoardGame.CancelButton = CancelButton;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class EndTurnButton {
        ExecuteMove(move) {
            this.TurnResolver.EndTurn(this.Owner);
            $("#EndTurn" + this.Owner.Id).removeClass("btn-warning");
            return true;
        }
        Initialize() {
            let self = this;
            if (document.getElementById("EndTurn" + self.Owner.Id))
                $("#EndTurn" + self.Owner.Id).click(function () {
                    TurnBasedBoardGame.Game.Instance.GiveCommand({ "id": self.Id, "data": null });
                });
            hotkeyEvents.space[this.Id] = () => {
                TurnBasedBoardGame.Game.Instance.GiveCommand({ "id": self.Id, "data": null });
            };
            TurnBasedBoardGame.Game.Instance.TurnResolver.StartTurnEvent[this.Id] = (activePlayers) => {
                if (activePlayers.indexOf(self.Owner) !== -1)
                    $("#EndTurn" + self.Owner.Id).addClass("btn-warning");
                else
                    $("#EndTurn" + self.Owner.Id).removeClass("btn-warning");
            };
        }
    }
    TurnBasedBoardGame.EndTurnButton = EndTurnButton;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class Mouse {
        constructor() {
            this.RightClickEvent = {};
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
    TurnBasedBoardGame.Mouse = Mouse;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="../Piece.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class WinCondition extends TurnBasedBoardGame.Piece {
        constructor() {
            super();
        }
        Initialize() {
            let self = this;
            for (let hq of self.HQs) {
                hq.captureEvent[self.Id] = (previousOwner, futureOwner) => {
                    self.RemainingPlayers.splice(self.RemainingPlayers.indexOf(previousOwner), 1);
                    let remainingTeams = [];
                    for (let player of self.RemainingPlayers)
                        if (remainingTeams.indexOf(player.Team) == -1)
                            remainingTeams.push(player.Team);
                    if (remainingTeams.length == 1) {
                        $('#gameOverModal').modal();
                    }
                    delete hq.captureEvent[self.Id];
                };
            }
        }
    }
    TurnBasedBoardGame.WinCondition = WinCondition;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var Graph;
(function (Graph) {
    function BreadFirstSearch(root, depth = 999) {
        let q = new Queue();
        let visitedIds = {};
        let visited = [];
        q.push(new NodeDistance(root, 0));
        while (q._store.length > 0) {
            let nodeInfo = q.pop();
            if (nodeInfo.distance < depth)
                nodeInfo.node.Neighbours.forEach(function (neighbour) {
                    if (!visitedIds[neighbour.Id]) {
                        visitedIds[neighbour.Id] = true;
                        q.push(new NodeDistance(neighbour, nodeInfo.distance + 1));
                        visited.push(neighbour);
                    }
                });
        }
        return visited;
    }
    Graph.BreadFirstSearch = BreadFirstSearch;
    function GetReachableNodesAndPaths(root, getDistance, maxDistance = Infinity) {
        let previous = new Map();
        let visitedNodes = [root];
        let visitedIds = {};
        visitedIds[root.Id] = true;
        let q = new PriorityQueue({ comparator: function (a, b) { return -(b.value() - a.value()); } });
        q.queue(new NodeDistance(root, 0));
        while (q.length > 0) {
            let nodeDistance = q.dequeue();
            let node = nodeDistance.node;
            if (node.Neighbours)
                node.Neighbours.forEach(function (neighbour) {
                    var distance = nodeDistance.distance + getDistance(node, neighbour);
                    if (!visitedIds[neighbour.Id] && distance <= maxDistance) {
                        visitedIds[neighbour.Id] = true;
                        visitedNodes.push(neighbour);
                        previous.set(neighbour.Id, node.Id);
                        q.queue(new NodeDistance(neighbour, distance));
                    }
                });
        }
        return new Graph.ReachableNodesAndPaths(visitedNodes, previous);
    }
    Graph.GetReachableNodesAndPaths = GetReachableNodesAndPaths;
    class NodeDistance {
        constructor(node, distance) {
            this.node = node;
            this.distance = distance;
        }
        value() { return this.distance; }
        ;
    }
    class Queue {
        constructor() {
            this._store = [];
        }
        push(val) {
            this._store.push(val);
        }
        pop() {
            return this._store.shift();
        }
    }
    Graph.Queue = Queue;
})(Graph || (Graph = {}));
var Graph;
(function (Graph) {
    class ReachableNodesAndPaths {
        constructor(reachableNodes, pathInfo) {
            this.reachableNodes = reachableNodes;
            this.pathInfo = pathInfo;
        }
        GetPath(destination) {
            let idPath = this.GetIdPath(destination);
            let path = [];
            for (let i = 0; i < idPath.length; i++) {
                let tileId = idPath[i];
                let tile = this.reachableNodes.find(t => t.Id == tileId);
                path.push(tile);
            }
            return path;
        }
        GetIdPath(destination) {
            if (!this.reachableNodes || this.reachableNodes.indexOf(destination) === -1)
                throw new Error("Path not found");
            let path = [destination.Id];
            let currentTile = destination.Id;
            while (this.pathInfo.get(currentTile)) {
                path.push(this.pathInfo.get(currentTile));
                currentTile = this.pathInfo.get(currentTile);
            }
            path.reverse();
            return path;
        }
    }
    Graph.ReachableNodesAndPaths = ReachableNodesAndPaths;
})(Graph || (Graph = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class EnemyInfo {
        constructor(enemies, game) {
            this.EnemyCommanderImage = [];
            this.Id = guid();
            var self = this;
            this.Enemies = enemies;
            this.Enemies.sort(function (a, b) { return a.Team - b.Team; });
            self.Enemies.forEach(function (player, index) {
                // Display commander
                let commanderImage = gameResources.commanders[player.CO.Name + "Mirror"]();
                self.EnemyCommanderImage.push(commanderImage);
                pixiApp.stage.width - 10 - terrainWidth;
                commanderImage.x = screen.width - 10 - terrainWidth - index * 60;
                commanderImage.y = 10;
                if (game.TurnResolver.ActivePlayers.indexOf(player) == -1)
                    commanderImage.alpha = 0.5;
                pixiApp.stage.addChild(commanderImage);
                // Display color
                const rectangle = PIXI.Sprite.from(PIXI.Texture.WHITE);
                rectangle.x = commanderImage.x;
                rectangle.y = 62;
                rectangle.width = 50;
                rectangle.height = 3;
                rectangle.tint = parseInt(colourNameToHex(player.Color).replace(/^#/, ''), 16);
                pixiApp.stage.addChild(rectangle);
            });
            game.TurnResolver.StartTurnEvent[this.Id] = function (activePlayers) {
                self.Enemies.forEach(function (player, index) {
                    if (activePlayers.indexOf(player) != -1) {
                        self.EnemyCommanderImage[index].alpha = 1;
                    }
                    else {
                        self.EnemyCommanderImage[index].alpha = 0.5;
                    }
                });
            };
            game.TurnResolver.SubscribeToPlayerEndTurnEvent((player) => {
                let index = self.Enemies.indexOf(player);
                if (index != -1) {
                    let sprite = self.EnemyCommanderImage[index];
                    sprite.alpha = 0.5;
                }
            });
        }
    }
    TurnBasedBoardGame.EnemyInfo = EnemyInfo;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class GoldDisplay {
        constructor(player, game) {
            this.Id = guid();
            this.GoldBeforeIncome = 0;
            this.PauseUpdates = false;
            var self = this;
            this.Player = player;
            let style = TurnBasedBoardGame.PixiTextStyle1();
            style.fill = "yellow";
            this.GoldText = new PIXI.Text("Gold: " + player.Gold, style);
            this.GoldText.x = 10;
            this.GoldText.y = 70;
            pixiApp.stage.addChild(this.GoldText);
            let incomeStyle = TurnBasedBoardGame.PixiTextStyle1();
            incomeStyle.fill = "lightgreen";
            this.IncomeText = new PIXI.Text("", incomeStyle);
            pixiApp.stage.addChild(this.IncomeText);
            game.TurnResolver.IncomeCoordinator.PreIncomeEvent[this.Id] = function (players) {
                if (players.indexOf(self.Player) == -1)
                    return;
                self.GoldBeforeIncome = self.Player.Gold;
                self.PauseUpdates = true;
                self.IncomeText.x = self.GoldText.x + self.GoldText.width + 3;
                self.IncomeText.y = self.GoldText.y;
                self.IncomeText.alpha = 1;
            };
            game.TurnResolver.IncomeCoordinator.PostIncomeEvent[this.Id] = function (players) {
                if (players.indexOf(self.Player) == -1)
                    return;
                let income = self.Player.Gold - self.GoldBeforeIncome;
                self.IncomeText.text = "+" + income.toString();
                TurnBasedBoardGame.SpriteDisappearAnimation(self.IncomeText, () => { });
                setTimeout(function () {
                    self.PauseUpdates = false;
                    self.GoldText.text = "Gold: " + player.Gold;
                }, 3000);
            };
            game.MoveResolver.CommandCompletedEvent[this.Id] = function () {
                if (!self.PauseUpdates)
                    self.GoldText.text = "Gold: " + player.Gold;
            };
        }
    }
    TurnBasedBoardGame.GoldDisplay = GoldDisplay;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class HUD {
        constructor(game) {
            if (game.CurrentPlayer) {
                let currentAwPlayer = game.CurrentPlayer;
                this.PlayerInfo = new TurnBasedBoardGame.PlayerInfo(currentAwPlayer, game);
                this.GoldDisplay = new TurnBasedBoardGame.GoldDisplay(currentAwPlayer, game);
                this.TeamInfo = new TurnBasedBoardGame.TeamInfo(this.GetTeamMates(game), game);
                this.EnemyInfo = new TurnBasedBoardGame.EnemyInfo(this.GetEnemies(game), game);
                this.RepairCost = new TurnBasedBoardGame.TotalRepairCosts(game);
                this.ShopModal = new TurnBasedBoardGame.ShopModal();
            }
        }
        GetTeamMates(game) {
            let currentAwPlayer = game.CurrentPlayer;
            let teammates = game.Players.filter(function (player) {
                var awPlayer = player;
                if (awPlayer.Team == currentAwPlayer.Team && awPlayer != currentAwPlayer)
                    return true;
                return false;
            });
            return teammates;
        }
        GetEnemies(game) {
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
    TurnBasedBoardGame.HUD = HUD;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class PlayerInfo {
        constructor(player, game) {
            var self = this;
            this.Player = player;
            this.Id = guid();
            // Display commander
            this.CommanderImage = gameResources.commanders[self.Player.CO.Name]();
            this.CommanderImage.x = 10;
            this.CommanderImage.y = 10;
            if (game.TurnResolver.ActivePlayers.indexOf(player) == -1)
                this.CommanderImage.alpha = 0.5;
            pixiApp.stage.addChild(this.CommanderImage);
            // Display color
            const rectangle = PIXI.Sprite.from(PIXI.Texture.WHITE);
            rectangle.x = 10;
            rectangle.y = 62;
            rectangle.width = 50;
            rectangle.height = 3;
            rectangle.tint = parseInt(colourNameToHex(player.Color).replace(/^#/, ''), 16);
            pixiApp.stage.addChild(rectangle);
            game.TurnResolver.StartTurnEvent[this.Id] = function (activePlayers) {
                if (activePlayers.indexOf(self.Player) != -1) {
                    self.CommanderImage.alpha = 1;
                }
                else {
                    self.CommanderImage.alpha = 0.5;
                }
            };
            game.TurnResolver.SubscribeToPlayerEndTurnEvent((player) => {
                if (player == self.Player) {
                    self.CommanderImage.alpha = 0.5;
                }
            });
        }
    }
    TurnBasedBoardGame.PlayerInfo = PlayerInfo;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class TeamInfo {
        constructor(teammates, game) {
            this.TeammateCommanderImage = [];
            this.Id = guid();
            var self = this;
            this.TeamMates = teammates;
            self.TeamMates.forEach(function (player, index) {
                let commanderImage = gameResources.commanders[player.CO.Name]();
                self.TeammateCommanderImage.push(commanderImage);
                commanderImage.x = 80 + index * 60;
                commanderImage.y = 10;
                if (game.TurnResolver.ActivePlayers.indexOf(player) == -1)
                    commanderImage.alpha = 0.5;
                pixiApp.stage.addChild(commanderImage);
                const rectangle = PIXI.Sprite.from(PIXI.Texture.WHITE);
                rectangle.x = commanderImage.x;
                rectangle.y = 62;
                rectangle.width = 50;
                rectangle.height = 3;
                rectangle.tint = parseInt(colourNameToHex(player.Color).replace(/^#/, ''), 16);
                pixiApp.stage.addChild(rectangle);
            });
            game.TurnResolver.StartTurnEvent[this.Id] = function (activePlayers) {
                self.TeamMates.forEach(function (player, index) {
                    if (activePlayers.indexOf(player) != -1) {
                        self.TeammateCommanderImage[index].alpha = 1;
                    }
                    else {
                        self.TeammateCommanderImage[index].alpha = 0.5;
                    }
                });
            };
            game.TurnResolver.SubscribeToPlayerEndTurnEvent((player) => {
                let index = self.TeamMates.indexOf(player);
                if (index != -1) {
                    let sprite = self.TeammateCommanderImage[index];
                    sprite.alpha = 0.5;
                }
            });
        }
    }
    TurnBasedBoardGame.TeamInfo = TeamInfo;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class TotalRepairCosts {
        constructor(game) {
            this.Id = guid();
            this.Game = game;
            let self = this;
            this.RepairCoordinator = this.Game.CurrentPlayer.RepairCoordinator;
            let style = TurnBasedBoardGame.PixiTextStyle1();
            this.RepairText = new PIXI.Text("", style);
            pixiApp.stage.addChild(this.RepairText);
            this.RepairSprite = gameResources.icons.repair();
            this.RepairSprite.alpha = 0;
            pixiApp.stage.addChild(this.RepairSprite);
            this.RepairCoordinator.ExecuteRepairsEvent[this.Id] = function () {
                if (self.RepairCoordinator.TurnRepairCosts <= 0)
                    return;
                let pos = self.GetTextPosition();
                self.RepairText.x = pos.x;
                self.RepairText.y = pos.y;
                self.RepairText.alpha = 1;
                self.RepairText.text = "-" + self.RepairCoordinator.TurnRepairCosts.toString();
                TurnBasedBoardGame.SpriteDisappearAnimation(self.RepairText, () => { });
                self.RepairSprite.x = self.RepairText.x + self.RepairText.width;
                self.RepairSprite.y = self.RepairText.y + 5;
                self.RepairSprite.alpha = 1;
                TurnBasedBoardGame.SpriteDisappearAnimation(self.RepairSprite, () => { });
            };
        }
        GetTextPosition() {
            let incomeText = this.Game.HUD.GoldDisplay.IncomeText;
            let x = incomeText.x + incomeText.width + 3;
            let y = incomeText.y;
            return new PIXI.Point(x, y);
        }
    }
    TurnBasedBoardGame.TotalRepairCosts = TotalRepairCosts;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    function IsICombatBehaviour(object) {
        if (object["IsValidTarget"]
            && object["AttackUnit"]
            && object["DefendAndCounter"]
            && object["Defend"]
            && object["DefendAndCounter"]
            && object["GetAttackCommand"]
            && object["CurrentHealth"]
            && object["GetDefenceMultiplier"]
            && object["GetPreview"])
            return true;
        return false;
    }
    TurnBasedBoardGame.IsICombatBehaviour = IsICombatBehaviour;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    function IsIHealth(object) {
        if (object["MaxHealth"] && object["CurrentHealth"])
            return true;
        return false;
    }
    TurnBasedBoardGame.IsIHealth = IsIHealth;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    function IsIIndicator(object) {
        if (object["CoversTile"] && object["Clear"])
            return true;
        return false;
    }
    TurnBasedBoardGame.IsIIndicator = IsIIndicator;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    function IsIMoveBehaviour(object) {
        if (object["GetReachableTiles"]
            && object["ExecuteMoveAndCallback"]
            && object["GetMoveCommand"]
            && object["MoveEvent"]
            && object["DistanceFunction"])
            return true;
        return false;
    }
    TurnBasedBoardGame.IsIMoveBehaviour = IsIMoveBehaviour;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class Lobby {
        constructor() {
            Lobby.Instance = this;
            this.UserId = $("#lobby").attr("userid");
        }
        GetCurrentSlot() {
            let self = this;
            return this.Slots.find((s) => { return s.LobbyPlayer != null && s.LobbyPlayer.Id == self.UserId; });
        }
        GetCurrentPlayer() {
            return this.GetCurrentSlot().LobbyPlayer;
        }
        Initialize() {
        }
        StateHasChanged() {
            this.Slots.forEach(function (slot) {
                if (slot.LobbyPlayer != null)
                    slot.LobbyPlayer.Ready = false;
            });
        }
        Join(lobbyPlayer, index) {
            let player = Object.assign(new TurnBasedBoardGame.LobbyPlayer, lobbyPlayer);
            this.Slots[index].LobbyPlayer = player;
            this.StateHasChanged();
        }
        Leave(connectionId) {
            let slot = this.Slots.find((s) => { return s.LobbyPlayer != null && s.LobbyPlayer.ConnectionId == connectionId; });
            // This is needed to change html
            slot.LobbyPlayer.Ready = false;
            slot.LobbyPlayer = null;
            this.StateHasChanged();
        }
        Ready(connectionId, ready) {
            this.Slots.find((s) => { return s.LobbyPlayer != null && s.LobbyPlayer.ConnectionId == connectionId; }).LobbyPlayer.Ready = true;
        }
        Switch(positionId, destinationId) {
            let positionSlot = this.Slots.find((s) => { return s.Id == positionId; });
            let destinationSlot = this.Slots.find((s) => { return s.Id == destinationId; });
            destinationSlot.LobbyPlayer = positionSlot.LobbyPlayer;
            positionSlot.LobbyPlayer = null;
            this.StateHasChanged();
        }
    }
    TurnBasedBoardGame.Lobby = Lobby;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class LobbyPlayer {
        constructor() {
        }
        get Ready() {
            return this._ready;
        }
        set Ready(value) {
            let slot = TurnBasedBoardGame.Lobby.Instance.Slots.find(s => s.LobbyPlayer == this);
            let element = $("#slot" + slot?.Index + " .slotStatus h3");
            let button = $("#ready-button");
            this._ready = value;
            if (value) {
                element.html("Ready");
                element.addClass("text-success");
                element.removeClass("text-danger");
                if (this == TurnBasedBoardGame.Lobby.Instance.GetCurrentPlayer()) {
                    button.html("Ready!");
                    button.addClass("btn-success");
                    button.removeClass("btn-warning");
                }
            }
            else {
                element.html("Not ready");
                element.addClass("text-danger");
                element.removeClass("text-success");
                if (this == TurnBasedBoardGame.Lobby.Instance.GetCurrentPlayer()) {
                    button.html("Click here to ready up!");
                    button.addClass("btn-warning");
                    button.removeClass("btn-success");
                }
            }
        }
    }
    TurnBasedBoardGame.LobbyPlayer = LobbyPlayer;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class Slot {
        constructor() {
        }
        set LobbyPlayer(value) {
            this._lobbyPlayer = value;
            if (value != null) {
                $("#slot" + this.Index + " .slotName h3").html(value.Name);
            }
            else {
                $("#slot" + this.Index + " .slotName h3").html("--Empty--");
            }
        }
        get LobbyPlayer() {
            return this._lobbyPlayer;
        }
        get Index() {
            return TurnBasedBoardGame.Lobby.Instance.Slots.findIndex(slot => slot.Id == this.Id) ?? -1;
        }
        get IsCurrentPlayer() {
            return TurnBasedBoardGame.Lobby.Instance.GetCurrentSlot() === this;
        }
        Initialize() {
            var self = this;
            if (this.IsCurrentPlayer) {
                $("#positionNumber b").html(self.Team + "#");
            }
            $("#slot" + self.Index + " .slotTeam").html(self.Team + "#");
        }
    }
    TurnBasedBoardGame.Slot = Slot;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="../Lobby.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class AdvanceWarsLobby extends TurnBasedBoardGame.Lobby {
        constructor() {
            super();
            let self = this;
            $("#ready-button").click(function () {
                self.Connection.invoke("Ready", self.Id, true);
            });
        }
    }
    TurnBasedBoardGame.AdvanceWarsLobby = AdvanceWarsLobby;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="../Slot.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class AdvanceWarsSlot extends TurnBasedBoardGame.Slot {
    }
    TurnBasedBoardGame.AdvanceWarsSlot = AdvanceWarsSlot;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class PlayerColor {
    }
    TurnBasedBoardGame.PlayerColor = PlayerColor;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class SlotColor {
        constructor() {
            let self = this;
            $(".grid-color-option").click(function () {
                if (self.Slot.IsCurrentPlayer)
                    self.SelectColor($(this).attr("color"));
            });
        }
        set AvailableColors(value) {
            SlotColor.AvailableColors = value;
        }
        get AvailableColors() {
            return SlotColor.AvailableColors;
        }
        get Color() {
            return this._color;
        }
        set Color(value) {
            this._color = value;
            $("#slot" + this.Slot?.Index + " .slotColor").css("background-color", value.Name);
            if (TurnBasedBoardGame.Lobby.Instance.GetCurrentSlot() == this.Slot)
                $("#color").css("background-color", value.Name);
        }
        Initialize() {
            // This is needed to set the html because this.Slot is not available when color is first set.
            this.Color = this.Color;
        }
        SelectColor(colorId) {
            $('#colorModal').modal('hide');
            var lobby = TurnBasedBoardGame.Lobby.Instance;
            lobby.Connection.invoke("ChangeColor", lobby.Id, this.Slot.Id, parseInt(colorId));
        }
        ChangeColor(colorId) {
            var indexOfNewColor = SlotColor.AvailableColors.findIndex(c => c.ID == colorId);
            var newColor = SlotColor.AvailableColors[indexOfNewColor];
            SlotColor.AvailableColors[indexOfNewColor] = this.Color;
            this.Color = newColor;
        }
    }
    TurnBasedBoardGame.SlotColor = SlotColor;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class SlotCommander {
        constructor() {
            let self = this;
            $(".select-commander").click(function () {
                if (self.Slot.IsCurrentPlayer)
                    self.SelectCommander($(this).attr("co"));
            });
        }
        Initialize() {
            // This is needed to set the html when loading the page because this.Slot is not available when commander is first set.
            this.Commander = this.Commander;
        }
        get Commander() {
            return this._commander;
        }
        set Commander(value) {
            this._commander = value;
            $("#slot" + this.Slot?.Index + " .slotCommander img").attr("src", "/Images/CO/" + value + ".png");
            if (TurnBasedBoardGame.Lobby.Instance.GetCurrentSlot() == this.Slot)
                $("#selected-commander").attr("src", "/Images/CO/" + value + "big.png");
        }
        SelectCommander(commander) {
            $('#coModal').modal('hide');
            var lobby = TurnBasedBoardGame.Lobby.Instance;
            lobby.Connection.invoke("ChangeCommander", lobby.Id, this.Slot.Id, commander);
        }
        ChangeCommander(commander) {
            this.Commander = commander;
        }
    }
    TurnBasedBoardGame.SlotCommander = SlotCommander;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class StartTurnModal {
        constructor(turnResolver) {
            this.turnResolver = turnResolver;
            this.ModalText = ko.observable();
            if (document.getElementById('startTurn'))
                ko.applyBindings(this, document.getElementById('startTurn'));
        }
        StartTurn(activePlayers) {
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
    TurnBasedBoardGame.StartTurnModal = StartTurnModal;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class IncomeCoordinator {
        constructor() {
            this.Id = guid();
            this.PreIncomeEvent = {};
            this.IncomeEvent = {};
            this.PostIncomeEvent = {};
        }
        Initialize() {
            var self = this;
            TurnBasedBoardGame.Game.Instance.TurnResolver.StartTurnEvent[this.Id] = (activePlayers) => {
                self.RaisePreIncomeEvent(activePlayers);
                self.RaiseIncomeEvent(activePlayers);
                self.RaisePostIncomeEvent(activePlayers);
            };
        }
        RaisePreIncomeEvent(players) {
            for (let key in this.PreIncomeEvent) {
                if (typeof this.PreIncomeEvent[key] === "function")
                    this.PreIncomeEvent[key](players);
            }
        }
        RaiseIncomeEvent(players) {
            for (let key in this.IncomeEvent) {
                if (typeof this.IncomeEvent[key] === "function")
                    this.IncomeEvent[key](players);
            }
        }
        RaisePostIncomeEvent(players) {
            for (let key in this.PostIncomeEvent) {
                if (typeof this.PostIncomeEvent[key] === "function")
                    this.PostIncomeEvent[key](players);
            }
        }
    }
    TurnBasedBoardGame.IncomeCoordinator = IncomeCoordinator;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    function PixiTextStyle1() {
        return new PIXI.TextStyle({
            fill: "white",
            fontFamily: "Times New Roman",
            strokeThickness: 5,
            fontSize: 15
        });
    }
    TurnBasedBoardGame.PixiTextStyle1 = PixiTextStyle1;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class RepairCoordinator {
        constructor() {
            this.TurnRepairCosts = 0;
            this.CalcRepairCostsEvent = {};
            this.ExecuteRepairsEvent = {};
            this.Id = guid();
        }
        Initialize() {
            this.IncomeCoordinator.PostIncomeEvent[this.Id] = (players) => { this.CoordinateRepairs(players); };
        }
        CoordinateRepairs(activePlayers) {
            if (activePlayers.indexOf(this.Player) == -1)
                return;
            this.TurnRepairCosts = 0;
            this.RaiseCalcRepairCostsEvent();
            if (this.TurnRepairCosts <= this.Player.Gold)
                this.RaiseExecuteRepairsEvent();
            this.TurnRepairCosts = 0;
        }
        RaiseCalcRepairCostsEvent() {
            for (let key in this.CalcRepairCostsEvent) {
                if (typeof this.CalcRepairCostsEvent[key] === "function")
                    this.CalcRepairCostsEvent[key]();
            }
        }
        RaiseExecuteRepairsEvent() {
            for (let key in this.ExecuteRepairsEvent) {
                if (typeof this.ExecuteRepairsEvent[key] === "function")
                    this.ExecuteRepairsEvent[key]();
            }
        }
    }
    TurnBasedBoardGame.RepairCoordinator = RepairCoordinator;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    function SanityCheck(game, sanityResult) {
        let id = 0;
        let calculation = "";
        game.Players.forEach((player) => {
            id += player.Gold;
            calculation += player.Gold + " ";
        });
        let units = [];
        for (let prop in game.Pieces) {
            let obj = game.Pieces[prop];
            if ((obj instanceof TurnBasedBoardGame.Unit))
                units.push(obj);
        }
        units.sort((a, b) => (a.Id > b.Id) ? 1 : -1);
        units.forEach((unit) => {
            var tile = unit.Node;
            var health = unit.BehaviourList.find((b) => { return TurnBasedBoardGame.IsIHealth(b); });
            if (tile) {
                id += tile.X * tile.Y * health.CurrentHealth;
                calculation += health.CurrentHealth + "x" + tile.X + "x" + tile.Y + " ";
            }
        });
        for (let x = 0; x < game.Board.Tiles.length; x++) {
            for (let y = 0; y < game.Board.Tiles[0].length; y++) {
                let tile = game.Board.Tiles[x][y];
                if (tile.Piece) {
                    var unit = tile.Piece;
                    var health = unit.BehaviourList.find((b) => { return TurnBasedBoardGame.IsIHealth(b); });
                    id += tile.X * tile.Y * health.CurrentHealth;
                    calculation += health.CurrentHealth + "x" + tile.X + "x" + tile.Y + " ";
                }
            }
        }
        for (let x = 0; x < game.Board.Tiles.length; x++) {
            for (let y = 0; y < game.Board.Tiles[0].length; y++) {
                let tile = game.Board.Tiles[x][y];
                if (!TurnBasedBoardGame.IsBuilding(tile))
                    continue;
                var building = tile;
                if (building.Owner != null) {
                    id += building.X * building.Y * building.Owner.Team;
                    calculation += building.X + "x" + building.Y + "x" + building.Owner.Team + " ";
                }
            }
        }
        console.log("Server: " + sanityResult.Calculation);
        console.log("Server move: " + sanityResult.MoveNumber);
        console.log("Client: " + calculation);
        if (game.History && game.History.Replay)
            console.log("Client move: " + (game.History.Replay.CurrentMove - 1));
        if (id != sanityResult.Id) {
            console.log("sanity check failed");
            return false;
        }
        return true;
    }
    TurnBasedBoardGame.SanityCheck = SanityCheck;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class SanityResult {
    }
    TurnBasedBoardGame.SanityResult = SanityResult;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    // Get the sprite for the current tile.
    // The input is the tiletypes of all surrounding tiles in order:
    // Top left, top, top right, left, current tile, right, bottom left, bottom, bottom right
    function GetTerrain(tiles) {
        if (!tiles || tiles.length != 9)
            throw new Error("Input invalid while getting terrain sprite.");
        let currentTiletype = tiles[4];
        switch (currentTiletype) {
            case 15:
                return LoadPipe(tiles);
            case 16:
                return LoadDestroyedPipe(tiles);
        }
        return null;
    }
    TurnBasedBoardGame.GetTerrain = GetTerrain;
    function LoadPipe(tiles) {
        let bitString = "";
        // Tiles in order: top, right, bottom, left
        let relevantTiles = [tiles[1], tiles[5], tiles[7], tiles[3]];
        for (let n = 0; n < relevantTiles.length; n++) {
            if (relevantTiles[n] == 15 || relevantTiles[n] == 16)
                bitString += "1";
            else
                bitString += "0";
        }
        let sprite = gameResources.terrain["pipe" + bitString]();
        return sprite;
    }
    function LoadDestroyedPipe(tiles) {
        let bitString = "";
        if ((tiles[1] == 15 || tiles[1] == 16) && (tiles[7] == 15 || tiles[7] == 16))
            bitString = "1010";
        else
            bitString = "0101";
        let sprite = gameResources.terrain["destroyedPipe" + bitString]();
        return sprite;
    }
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class History {
    }
    TurnBasedBoardGame.History = History;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class Move {
    }
    TurnBasedBoardGame.Move = Move;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class Replay {
        constructor() {
            this.CurrentMove = 0;
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
        Goto(move) {
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
    TurnBasedBoardGame.Replay = Replay;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
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
/// <reference path="../Unit.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class UnitTemplate {
        constructor() {
            this.GenerateIncrement = 0;
        }
        GenerateUnit(game, owner) {
            var self = this;
            var unit = new TurnBasedBoardGame.Unit();
            unit.Game = game;
            unit.Resources = self.Resources;
            unit.Owner = owner;
            game.UnitGenerationNumber++;
            unit.Id = "Unit" + game.UnitGenerationNumber;
            for (let key in self.BehaviourTemplates) {
                let behaviourTemplate = self.BehaviourTemplates[key];
                behaviourTemplate.AddBehaviour(unit);
            }
            return unit;
        }
        GetGuid(i) {
            var guidString = "-0000-0000-0000-000000000000";
            var hex = i.toString(16);
            hex = hex.padStart(8, "0");
            return hex + guidString;
        }
    }
    TurnBasedBoardGame.UnitTemplate = UnitTemplate;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="../Node.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class Tile extends TurnBasedBoardGame.Node {
        constructor() {
            super();
            this.X = 0;
            this.Y = 0;
            this.Container = new PIXI.Container();
            this.SpecialTileTypes = [1, 9, 8, 2, 3, 15, 16];
        }
        Initialize() {
            if (this.SpecialTileTypes.indexOf(this.TileType) != -1)
                this.LoadSpecialTileTypes(this.TileType);
            else
                this.Sprite = gameResources.terrain[this.TileType]();
            this.Container.x = this.X * terrainWidth;
            this.Container.y = this.Y * terrainHeight;
            this.Container.addChild(this.Sprite);
            TurnBasedBoardGame.Game.Instance.TerrainContainers[this.Y].addChildAt(this.Container, 0);
        }
        get XCoord() {
            return this.X * terrainWidth;
        }
        get YCoord() {
            return this.Y * terrainHeight;
        }
        LoadSpecialTileTypes(tileType) {
            let tileTypes = [];
            var map = TurnBasedBoardGame.Game.Instance.Board;
            for (let y = this.Y - 1; y <= this.Y + 1; y++) {
                for (let x = this.X - 1; x <= this.X + 1; x++) {
                    if (map.Tiles[x] && map.Tiles[x][y])
                        tileTypes.push(map.Tiles[x][y].TileType);
                    else
                        tileTypes.push(-1);
                }
            }
            if (tileType == 9)
                this.LoadSea();
            if (tileType == 1)
                this.LoadRoad();
            if (tileType == 3)
                this.LoadBridge();
            if (tileType == 2)
                this.LoadRiver();
            if (tileType == 8)
                this.LoadBeach();
            if (tileType == 15 || tileType == 16) {
                this.Sprite = TurnBasedBoardGame.GetTerrain(tileTypes);
            }
        }
        LoadSea() {
            var map = TurnBasedBoardGame.Game.Instance.Board;
            var bits = [1, 1, 1, 1, 0, 1, 1, 1, 1];
            for (let x = -1; x < 2; x++) {
                for (let y = -1; y < 2; y++) {
                    if (map.Tiles[this.X + x] === undefined || map.Tiles[this.X + x][this.Y + y] === undefined) {
                        bits[x + 1 + (y + 1) * 3] = 0;
                        continue;
                    }
                    var tile = map.Tiles[this.X + x][this.Y + y];
                    if (tile.TileType === 9 || tile.TileType === 10 || tile.TileType === 8)
                        bits[x + 1 + (y + 1) * 3] = 0;
                }
            }
            if (bits[1]) {
                bits[0] = 0;
                bits[2] = 0;
            }
            if (bits[3]) {
                bits[0] = 0;
                bits[6] = 0;
            }
            if (bits[5]) {
                bits[2] = 0;
                bits[8] = 0;
            }
            if (bits[7]) {
                bits[6] = 0;
                bits[8] = 0;
            }
            let bitString = "";
            for (let bit of bits)
                bitString += bit;
            this.Sprite = gameResources.terrain["Sea" + bitString]();
        }
        LoadRoad() {
            let map = TurnBasedBoardGame.Game.Instance.Board;
            let leftTile = map.Tiles[this.X - 1] ? map.Tiles[this.X - 1][this.Y] : null;
            let topTile = map.Tiles[this.X][this.Y - 1];
            let rightTile = map.Tiles[this.X + 1] ? map.Tiles[this.X + 1][this.Y] : null;
            let bottomTile = map.Tiles[this.X][this.Y + 1];
            var tiles = [topTile, rightTile, bottomTile, leftTile];
            var bitString = "";
            for (let tile of tiles) {
                bitString += tile && tile.TileType === 1 ? 1 : 0;
            }
            this.Sprite = gameResources.terrain["Road" + bitString]();
        }
        LoadBridge() {
            let map = TurnBasedBoardGame.Game.Instance.Board;
            let leftTile = map.Tiles[this.X - 1] ? map.Tiles[this.X - 1][this.Y] : null;
            let topTile = map.Tiles[this.X][this.Y - 1];
            let rightTile = map.Tiles[this.X + 1] ? map.Tiles[this.X + 1][this.Y] : null;
            let bottomTile = map.Tiles[this.X][this.Y + 1];
            if (leftTile && ([2, 8, 9].indexOf(leftTile.TileType) !== -1) && rightTile && ([2, 8, 9].indexOf(rightTile.TileType) !== -1)) {
                this.Sprite = gameResources.terrain["BridgeVertical"]();
                return;
            }
            if (topTile && ([2, 8, 9].indexOf(topTile.TileType) !== -1) && bottomTile && ([2, 8, 9].indexOf(bottomTile.TileType) !== -1)) {
                this.Sprite = gameResources.terrain["BridgeHorizontal"]();
                return;
            }
        }
        LoadBeach() {
            let map = TurnBasedBoardGame.Game.Instance.Board;
            let leftTile = map.Tiles[this.X - 1] ? map.Tiles[this.X - 1][this.Y] : null;
            let topTile = map.Tiles[this.X][this.Y - 1];
            let rightTile = map.Tiles[this.X + 1] ? map.Tiles[this.X + 1][this.Y] : null;
            let bottomTile = map.Tiles[this.X][this.Y + 1];
            var tiles = [topTile, rightTile, bottomTile, leftTile];
            var bitString = "";
            for (let tile of tiles) {
                if (!tile) {
                    bitString += 2;
                    continue;
                }
                let tileType = tile.TileType;
                if (tileType === 9 || tileType === 10 || tileType === 3)
                    bitString += 0;
                else if (tileType === 8)
                    bitString += 2;
                else
                    bitString += 1;
            }
            let bitstring2 = [];
            for (let i = 0; i < 4; i++) {
                bitstring2.push(bitString[i]);
            }
            for (let i = 0; i < 4; i++) {
                if (bitString[i] === '1' && bitString[(i + 2) % 4] === '2')
                    bitstring2[(i + 2) % 4] = '0';
            }
            bitString = "";
            for (let i = 0; i < 4; i++) {
                bitString += bitstring2[i];
            }
            this.Sprite = gameResources.terrain[bitString + "Beach"]();
        }
        LoadRiver() {
            let map = TurnBasedBoardGame.Game.Instance.Board;
            let leftTile = map.Tiles[this.X - 1] ? map.Tiles[this.X - 1][this.Y] : null;
            let topTile = map.Tiles[this.X][this.Y - 1];
            let rightTile = map.Tiles[this.X + 1] ? map.Tiles[this.X + 1][this.Y] : null;
            let bottomTile = map.Tiles[this.X][this.Y + 1];
            var tiles = [topTile, rightTile, bottomTile, leftTile];
            var bitString = "";
            for (let tile of tiles) {
                if (!tile) {
                    bitString += 1;
                    continue;
                }
                let tileType = tile.TileType;
                if (tileType === 2 || tileType === 3)
                    bitString += 1;
                else
                    bitString += 0;
            }
            this.Sprite = gameResources.terrain["River" + bitString]();
        }
    }
    TurnBasedBoardGame.Tile = Tile;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="Tile.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class Building extends TurnBasedBoardGame.Tile {
        constructor() {
            super();
            this.captureEvent = {};
        }
        get Owner() {
            return this._owner;
        }
        set Owner(value) {
            this._owner = value;
            if (value != null)
                this.Container.filters = [filters[value.Color + "Team"]];
            else
                this.Container.filters = [filters["Neutral"]];
            // TODO: add grey colors if owner is null
        }
        Initialize() {
            super.Initialize();
            var self = this;
            self.TurnResolver.IncomeCoordinator.IncomeEvent[self.Id] = function (players) {
                if (self.Owner != null && players.indexOf(self.Owner) != -1)
                    self.Owner.Gold += self.Income;
            };
        }
        TriggerCaptureEvent(previousOwner, newOwner) {
            for (let key in this.captureEvent) {
                let captureFunction = this.captureEvent[key];
                captureFunction(previousOwner, newOwner);
            }
        }
    }
    TurnBasedBoardGame.Building = Building;
    function IsBuilding(object) {
        if (object["Income"]
            && object["Owner"]
            && object["captureEvent"])
            return true;
        return false;
    }
    TurnBasedBoardGame.IsBuilding = IsBuilding;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="Tile.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class HQ extends TurnBasedBoardGame.Building {
        constructor() {
            super();
        }
        Initialize() {
            super.Initialize();
            var self = this;
            this.captureEvent[this.Id] = (previousOwner, futureOwner) => {
                previousOwner.Defeated = true;
                for (let i = previousOwner.Pieces.length - 1; i >= 0; i--)
                    previousOwner.Pieces[i].Destroy();
                for (let key in self.Game.Board.Nodes) {
                    let building = self.Game.Board.Nodes[key];
                    if (building && building.Owner === previousOwner)
                        building.Owner = null;
                }
                self.Container.removeChild(self.Sprite);
                self.Sprite = gameResources.terrain.City();
                this.Container.addChild(this.Sprite);
                delete self.captureEvent[self.Id];
            };
        }
    }
    TurnBasedBoardGame.HQ = HQ;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="Tile.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class ProducingBuilding extends TurnBasedBoardGame.Building {
        constructor() {
            super();
        }
        get Listings() {
            return this.Owner != null ? this.Owner.Listings[TurnBasedBoardGame.BuildingType[this.BuildingType]] : null;
        }
        Initialize() {
            let self = this;
            super.Initialize();
            this.Sprite.interactive = true;
            this.Sprite.buttonMode = true;
            this.Sprite.on("pointertap", function (e) {
                if (self.Owner === null || self.Game.CurrentPlayer !== self.Owner || !self.TurnResolver.IsActive(self.Game.CurrentPlayer))
                    return;
                let shopOptions = [];
                for (let key in self.Listings) {
                    var shopOption = self.Listings[key];
                    shopOption.ProducingBuilding = self;
                    shopOptions.push(shopOption);
                }
                self.Game.HUD.ShopModal.ShopOptions = shopOptions;
                $('#shopModal').modal();
            });
        }
        BuyFirstListing() {
            let listing = this.Listings[Object.keys(this.Listings)[0]];
            let command = { "id": this.Id, "data": { "id": guid(), "listing": listing.Id } };
            this.Game.GiveCommand(command);
        }
        BuyListing(listing) {
            let command = { "id": this.Id, "data": { "listing": listing.Id } };
            this.Game.GiveCommand(command);
        }
        ExecuteMove(move) {
            let id = move.id;
            let listing = this.Listings != null ? this.Listings[move.listing] : null;
            if (this.Listings != null && this.Piece == null && this.Owner.Gold >= listing.Cost) {
                this.Owner.Gold -= listing.Cost;
                let unit = listing.UnitTemplate.GenerateUnit(this.Game, this.Owner);
                unit.Node = this;
                this.Piece = unit;
                unit.Owner = this.Owner;
                this.Game.Pieces[unit.Id] = unit;
                unit.Initialize();
                unit.Active = false;
                this.Owner.Pieces.push(unit);
            }
            this.Game.HUD.ShopModal.ShopOptions = [];
            return true;
        }
    }
    TurnBasedBoardGame.ProducingBuilding = ProducingBuilding;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
/// <reference path="Tile.ts" />
var TurnBasedBoardGame;
(function (TurnBasedBoardGame) {
    class ProducingBuildingListing {
        constructor() {
        }
        get HaveEnoughGold() {
            return TurnBasedBoardGame.Game.Instance.CurrentPlayer.Gold >= this.Cost;
        }
        Initialize() {
        }
        Click(self) {
            var myself = self;
            myself.ProducingBuilding.BuyListing(myself);
            $('#shopModal').modal('hide');
        }
    }
    TurnBasedBoardGame.ProducingBuildingListing = ProducingBuildingListing;
})(TurnBasedBoardGame || (TurnBasedBoardGame = {}));
//# sourceMappingURL=bundle.js.map