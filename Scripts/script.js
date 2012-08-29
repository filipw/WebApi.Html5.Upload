function dragEnter(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    $(evt.target).addClass('over');
}

function dragLeave(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    $(evt.target).removeClass('over');
}

function drop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    $(evt.target).removeClass('over');

    var files = evt.originalEvent.dataTransfer.files;

    if (files.length > 0) {
        if (window.FormData !== undefined) {
            var data = new FormData();
            for (i = 0; i < files.length; i++) {
                //console.log(files[i]);
                data.append("file"+i,files[i]);
            }

            $.ajax({
                type: "POST",
                url: "/api/uploading",
                contentType: false,
                processData: false,
                data: data,
                success: function (res) {
                    $.each(res, function (i, item) {
                        viewModel.uploads.push(item);
                    });
                }
            });
        } else {
            alert("your browser sucks!");
        }
    }
}

$(document).ready(function () {
    var $box = $("#ulbox");

    $box.bind("dragenter", dragEnter);
    $box.bind("dragleave", dragLeave);
    $box.bind("drop", drop);
});

var viewModel = {uploads: ko.observableArray([])}
ko.applyBindings(viewModel);