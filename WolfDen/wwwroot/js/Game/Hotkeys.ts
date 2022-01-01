var hotkeyEvents: any = {};
hotkeyEvents.space = {};

window.onkeydown = function (event) {

    
    if (event.keyCode === 32) {
        for (var handler in hotkeyEvents.space)
            hotkeyEvents.space[handler]();
    }
};