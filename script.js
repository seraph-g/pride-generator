const modeList = ["BASE", "ADD", "SUBTRACT", "DARKEST", "LIGHTEST", "DIFFERENCE", "EXCLUSION", "MULTIPLY", "SCREEN", "OVERLAY", "HARD_LIGHT", "SOFT_LIGHT", "DODGE", "BURN"];
const flagList = {
    "Lesbian": "lesbian.png",
    "Lesbian 2": "lesbian2.png",
    "MLM": "mlm.png",
    "MLM 2": "mlm2.png",
    "Gay": "gay.png",
    "Bi": "bi.png",
    "Trans": "trans.png",
    "Genderqueer": "genderqueer.png",
    "Pan": "pan.png",
    "Nonbinary": "nonbinary.png",
    "Genderfluid": "genderfluid.png",
    "Original": "original.png",
    "8 Stripe": "8stripe.png",
    "Agender": "agender.png",
    "Asexual": "asexual.png",
    "Aromantic": "aromantic.png",
    "Trixic": "trixic.png",
    "Toric": "toric.png",
    "Demiboy": "demiboy.png",
    "Demigirl": "demigirl.png",
};
var index = 0;

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
    $($("#active form div select option[value='BASE']")[0]).prop("selected", true);
    $($("#active form div select")[0]).prop('disabled', true);
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
    $(value).remove();
    onUpdate();
}

function moveDown(value) {
    itemDiv = $(value);
    prevDiv = $(value).prev();
    itemDiv.insertBefore(itemDiv.prev());
    if ($(`#${prevDiv.attr('id')} select option[value='BASE']`).prop("selected")) {
        $(`#${prevDiv.attr('id')} select option[value='OVERLAY']`).prop("selected", true);
    }
    onUpdate();
}

function moveUp(value) {
    itemDiv = $(value);
    itemDiv.insertAfter(itemDiv.next());
    if ($(`${value} select option[value='BASE']`).prop("selected")) {
        $(`${value} select option[value='OVERLAY']`).prop("selected", true);
    }
    onUpdate();
}

function addToList(item) {

    element = `<div id='a${index}'><div>`
        + `<button class="up_button" type="button"><i class="fas fa-arrow-up"></i></button>`
        + `<button class="down_button" type="button"><i class="fas fa-arrow-down"></i></button></div>`
        + `<p>${item}</p><img src='flags/${flagList[item]}'>`
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
    element += `<button type="button" id='${item}Off' class='remove_button ${item}' name='${item}On'><i class="fas fa-minus"></i></button>`;
    element += "</div>"

    $("#active form").append(element);

    $.each($("select"), function(index, value) {
        value.addEventListener("input", onUpdate);
    });

    item = `#a${index}`
    $(`${item} .remove_button`).click(function(i) {
        removeFromList(item);
    });

    $(`${item} .up_button`).click(function() {
        moveUp(item);
    });

    $(`${item} .down_button`).click(function() {
        moveDown(item);
    });

    onUpdate();
    lockBase();
    index += 1;
}

function onUpdate() {
    $.each($("select"), function(index, value) {
        $(value).prop("disabled", false);
    });
    var flags = []
    var formArray = $("#active form").serializeArray();
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
        element = `<div class='${item}'><p>${item}</p><img src='flags/${flagList[item]}'>`
            + `<input id='${item}Name' name='${item}' value='flags/${flagList[item]}'></input>`
            + `<button type="button" id='${item}On' class='mode ${item}' name='${item}'><i class="fas fa-plus"></i></button>`;
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

    $.each($("#library form > div"), function(index, value) {
        value.addEventListener("click", function () {
            console.log($(value).attr('class'));
            addToList($(value).attr('class'));
        });
    });




});

tId = setInterval(draw_thing, 2000);
