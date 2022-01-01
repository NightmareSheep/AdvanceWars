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