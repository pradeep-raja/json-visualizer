$(function () {
    $('body').on('click', '[idx="id-local-convert"]', function () {
        var obj = $(this).siblings('span').text();
        var dataElement = $(this).parent();
        var htmlData = ProcessInteractive(JSON.parse(obj));
        dataElement.html(htmlData);
    });

    function ProcessInteractive(obj) {
        var htmlValue = "<table class='table table-bordered'><tbody>";
        $.each(obj, function (key, value) {
            if (value instanceof Array || value instanceof Object) {
                htmlValue += "<tr><td>" + key + "</td><td><span idx='id-data'>" + JSON.stringify(
                        value) +
                    "</span>&nbsp;<button idx='id-local-convert' class='btn btn-link btn-sm'>Convert</button></td></tr>"
            } else {
                htmlValue += "<tr><td>" + key + "</td><td><b>" + value + "</b></td></tr>"
            }
        });
        return htmlValue + "</tbody></table>";
    }

    function ProcessObject(obj) {
        var htmlValue = "<table class='table table-bordered'><tbody>";
        $.each(obj, function (key, value) {
            if (value instanceof Array || value instanceof Object) {
                htmlValue += "<tr><td>" + key + "</td><td>" + ProcessObject(value) +
                    "</td></tr>"
            } else {
                htmlValue += "<tr><td>" + key + "</td><td><b>" + value + "</b></td></tr>"
            }
        });
        return htmlValue + "</tbody></table>";
    }

    function Process(jsonstring, interactive) {
        try {
            var obj = $.parseJSON(jsonstring);
            if (obj instanceof Array || obj instanceof Object) {
                var result = ""
                if (interactive) {
                    result = ProcessInteractive(obj);
                } else {
                    result = ProcessObject(obj);
                }
                $("#id-jbody").html(result);
            } else {
                $("#id-jbody").html(obj);
            }

            $("#id-result").show();
            $("#id-clear,#id-convert-i").show();
            $("#id-alert").hide().text("");
        } catch (err) {
            $("#id-alert").show().text(err);
            $("#id-input").focus().select();
            setTimeout(function () {
                $("#id-alert").hide().text("");
            }, 8000);
        }
    }

    $('#id-input').focus().on('paste', function (data) {
        setTimeout(function () {
            var jsontext = $('#id-input').val();
            Process(jsontext, false);
        }, 100);

    }).keydown(function () {
        setTimeout(function () {
            if ($('#id-input').val() == "") {
                $('#id-convert,#id-clear,#id-convert-i').hide();
                $("#id-jbody").html("");
                $("#id-result").hide();
                $("#id-alert").hide().text("");
            } else {
                $('#id-convert,#id-clear,#id-convert-i').show();
            }
        }, 100);
    });

    $('#id-convert').click(function () {
        var jsontext = $('#id-input').val();
        Process(jsontext, false);
    });

    $('#id-convert-i').click(function () {
        var jsontext = $('#id-input').val();
        Process(jsontext, true);
    });

    $("#id-clear").click(function () {
        $("#id-jbody").html("");
        $("#id-result").hide();
        $('#id-input').val("").focus();
        $('#id-convert,#id-clear', "#id-convert-i").hide();
        $("#id-alert").hide().text("");
    });
});