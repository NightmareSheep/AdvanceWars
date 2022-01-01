$(document).ready((u: JQueryStatic) => {
    if (!document.getElementById("save"))
        return;

    let saveSelect = <HTMLInputElement>document.getElementById("saves");
    let nameInput = <HTMLInputElement>document.getElementById("nameInput");
    saveSelect.onchange = (event) => {
        nameInput.value = (<HTMLInputElement>event.target).value;
    }

});