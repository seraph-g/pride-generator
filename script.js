function draw_thing(flags) {
    clearInterval(tId);

    var canvas = Processing.getInstanceById("main");
    canvas.newFlags();
    var canvasFlags = canvas.getFlags();
    for (var item in flags) {
        canvasFlags.add(new canvas.Flag(flags[item].name, flags[item].mode));
    }
    canvas.redraw();
    document.getElementById("flag").setAttribute("src", canvas.getDataURL());
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

$(function() {
    const modeList = ["DISABLED", "BASE", "ADD", "SUBTRACT", "DARKEST", "LIGHTEST", "DIFFERENCE", "EXCLUSION", "MULTIPLY", "SCREEN", "OVERLAY", "HARD_LIGHT", "SOFT_LIGHT", "DODGE", "BURN"]
    const flagList = {
        "Lesbian": "lesbian.png",
        "Gay": "gay.png",
        "Bi": "bi.png",
        "Trans": "trans.png",
        "Genderqueer": "genderqueer.png",
        "Pan": "pan.png",
        "Nonbinary": "nonbinary.png",
        "Genderfluid": "genderfluid.png",
        "8-Stripe": "8stripe.png",
        "Agender": "agender.png",
    }
    for (var item in flagList) {
        element = `<div><p>${item}</p><img src='flags/${flagList[item]}'>`
            + `<input id='${item}Name' name='${item}' value='flags/${flagList[item]}'></input>`
            + `<div class='drops'><select id='${item}Mode' class='mode ${item}' name='${item}Mode'>`;
        for (var mode in modeList) {
            element += `<option value='${modeList[mode]}'>` +
                `${toTitleCase(modeList[mode].replace('_', ' '))}</option>`;
        }
        element += `</select><select id='${item}Order 'class='order ${item}' name='${item}Order'>` +
            "<option value='None'>None</option>"
        for (i=1; i<Object.keys(flagList).length; i++) {
            order = i;
            if (i==0) {
                order = "Base";
            }
            element += `<option value='${order}'>${order}</option>`;
        }
        element += "</select></div></div>";
        $("form").append(element);
    }

    var modes = $(".mode");
    var selects = $("select");

    function onUpdate() {
        $.each(selects, function(index, value) {
            $(value).prop("disabled", false);
        });
        var flags = []
        var formArray = $("form").serializeArray();
        var newArray = [];
        flags = [];
        for (i=0; i<formArray.length/3; i++) {
            newArray.push({file: formArray[i*3+0].value,
                mode: formArray[i*3+1].value,
                order: formArray[i*3+2].value});
        }
        console.log(newArray);
        for (i=0; i<newArray.length; i++) {
            for (var flag in newArray) {
                if ((i==0 && newArray[flag].mode=="BASE") ||
                    (i==newArray[flag].order)) {
                        flags.push({name: newArray[flag].file,
                            mode: newArray[flag].mode});
                        break;
                }
            }
        }
        draw_thing(flags);
        $.each(modes, function(index, value) {
            checkMode(value);
        });
        /*
        $.each(formArray, function(index, value) {
            if (value.value == "Base") {
                flags.push
            }
        });*/
    }

    function checkMode(element) {
        val = $(element).val();
        elemClass = $(element).attr("class").replace('mode ', '');
        if (val == "DISABLED" || val == "BASE") {
            $orderElem = $(".order." + elemClass);
            $orderElem.prop("disabled", true);
            $orderElem.val("None");
        }
    }

    $.each(modes, function(index, value) {
        value.addEventListener("input", function() { checkMode(value) });
    });
    $.each(selects, function(index, value) {
        value.addEventListener("input", onUpdate);
    });
});

tId = setInterval(draw_thing, 1000);
