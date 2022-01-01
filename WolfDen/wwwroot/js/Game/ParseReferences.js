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
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var key = _a[_i];
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
    for (var _i = 0, references_1 = references; _i < references_1.length; _i++) {
        var ref = references_1[_i];
        parent = ref["parent"];
        key = ref["key"];
        parent[key] = refMap[parent[key]["$ref"]];
    }
    for (var _a = 0, lists_1 = lists; _a < lists_1.length; _a++) {
        var list = lists_1[_a];
        parent = list["parent"];
        key = list["key"];
        parent[key] = refMap[parent[key]["$id"]];
    }
    return parsed;
}
//# sourceMappingURL=ParseReferences.js.map