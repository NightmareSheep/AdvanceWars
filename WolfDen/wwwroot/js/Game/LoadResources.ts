var gameResources: any = {};
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

function LoadUnit(name, animations, reverse: boolean = false) {
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
        { "name": "MoveRight", "frames": frames[3] }], reverse);
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


    resourceFinalPath[path[path.length-1]] = function () {
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
        var name = "Road" + i.toString(2).padStart(4,'0');
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
        sprite.anchor.set(0, 4/20);
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

    loadResource(["indicators","moveIndicator"], "MoveIndicator.png", terrainWidth, terrainHeight);
    loadResource(["indicators","captureIndicator"], "CaptureIndicator.png", terrainWidth, terrainHeight);
    loadResource(["indicators","attackIndicator"], "AttackIndicator.png", terrainWidth, terrainHeight);
    loadResource(["indicators","unloadIndicator"], "UnloadIndicator.png", terrainWidth / 2, terrainHeight / 2);
    loadResource(["indicators","unloadAtIndicator"], "UnloadAtIndicator.png", terrainWidth, terrainHeight);

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

