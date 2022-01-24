const modeList = ["BASE", "ADD", "SUBTRACT", "DARKEST", "LIGHTEST", "DIFFERENCE", "EXCLUSION", "MULTIPLY", "SCREEN", "OVERLAY", "HARD_LIGHT", "SOFT_LIGHT", "DODGE", "BURN"];
const flagList = {
    "Lesbian": "lesbian.png",
    "Gay": "gay.png",
    "Bi": "bi.png",
    "Trans": "trans.png",
    "Genderqueer": "genderqueer.png",
    "Pan": "pan.png",
    "Nonbinary": "nonbinary.png",
    "Genderfluid": "genderfluid.png",
    "8 Stripe": "8stripe.png",
    "Agender": "agender.png",
    "Asexual": "asexual.png",
    "Aromantic": "aromantic.png",
    "Trixic": "trixic.png",
    "Toric": "toric.png",
};

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

function lockBase() {
    $($("#result form div select option[value='BASE']")[0]).prop("selected", true);
    $($("#result form div select")[0]).prop('disabled', true);
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

function removeFromList(value) {
    $(value).parent().remove();
    onUpdate();
}

function addToList(item) {

    element = `<div><p>${item}</p><img src='flags/${flagList[item]}'>`
        + `<input id='${item}Name' name='${item}' value='flags/${flagList[item]}'></input>`
        + `<select id='${item}Mode' class='mode ${item}' name='${item}Mode'>`
        for (var mode in modeList) {
            extra = ''
            if (modeList[mode] == 'BASE') {
                extra += ' hidden';
            }
            else if (modeList[mode] == 'OVERLAY') {
                extra += ' selected'
            }
            element += `<option ${extra} value='${modeList[mode]}'>` +
                `${toTitleCase(modeList[mode].replace('_', ' '))}</option>`;
        }
    element += "</select>";
    element += `<button type="button" id='${item}Off' class='mode ${item}' name='${item}On'>-</button>`;
    element += "</div>"
    $("#result form").append(element);

    $.each($("select"), function(index, value) {
        value.addEventListener("input", onUpdate);
    });

    $.each($("#result form button"), function(index, value) {
        value.addEventListener("click", function () {
            removeFromList(value);
        });
    });

    onUpdate();
    lockBase();
}

function onUpdate() {
    $.each($("select"), function(index, value) {
        $(value).prop("disabled", false);
    });
    var flags = []
    var formArray = $("#result form").serializeArray();
    flags = [];
    for (i=0; i<formArray.length/2; i++) {
        flags.push({name: formArray[i*2+0].value,
            mode: formArray[i*2+1].value});
    }
    console.log(flags);
    lockBase();
    draw_thing(flags);
    // $.each($(".mode"), function(index, value) {
    //     checkMode(value);
    // });
    /*
    $.each(formArray, function(index, value) {
        if (value.value == "Base") {
            flags.push
        }
    });*/
}

$(function() {

    for (var item in flagList) {
        element = `<div><p>${item}</p><img src='flags/${flagList[item]}'>`
            + `<input id='${item}Name' name='${item}' value='flags/${flagList[item]}'></input>`
            + `<button type="button" id='${item}On' class='mode ${item}' name='${item}'>+</button>`;
        // for (var mode in modeList) {
        //     element += `<option value='${modeList[mode]}'>` +
        //         `${toTitleCase(modeList[mode].replace('_', ' '))}</option>`;
        // }
        // element += `</select><select id='${item}Order 'class='order ${item}' name='${item}Order'>` +
        //     "<option value='None'>None</option>"
        // for (i=1; i<Object.keys(flagList).length; i++) {
        //     order = i;
        //     if (i==0) {
        //         order = "Base";
        //     }
        //     element += `<option value='${order}'>${order}</option>`;
        // }
        element += "</div>";
        $("#library form").append(element);
    }

    $.each($("#library form button"), function(index, value) {
        value.addEventListener("click", function () {
            addToList(value.name);
        });
    });




});

tId = setInterval(draw_thing, 2000);
