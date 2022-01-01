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

