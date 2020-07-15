/* @pjs preload="flags/bi.png, flags/trans.png", "flags/genderqueer.png",
"flags/lesbian.png", "flags/pan.png", "flags/gay.png", "flags/nonbinary.png",
"flags/genderfluid.png", "flags/8stripe.png", "flags/agender.png",
"flags/asexual.png", "flags/aromantic.png"; */


ArrayList flags;
ArrayList images;
PImage img;

void newFlags() {
    flags = new ArrayList();
}

ArrayList getFlags() {
    return flags;
}

String getDataURL() {
    return document.getElementsByTagName("canvas")[0].toDataURL();
}

void setup() {
    size(1400, 840);
    flags = new ArrayList();
    images = new ArrayList();
    noLoop();
}

void draw() {
    boolean firstRun = true;
    img = createImage(1400, 840);
    for (Flag flag : flags) {
        if (firstRun) {
            img = loadImage(flag.name);
            firstRun = false;
        }
        else {
            PImage blending = loadImage(flag.name);
            img.blend(blending, 0, 0, 1400, 840, 0, 0, 1400, 840, flag.mode);
        }
    }
    image(img, 0, 0);
    /*
    PImage img = loadImage("bi.jpg");
    PImage img2 = loadImage("trans.jpg");
    PImage img3 = loadImage("genderqueer.jpg");
    PImage img4 = loadImage("lesbian.png");
    img.blend(img2, 0, 0, 655, 395, 0, 0, 655, 395, MULTIPLY);
    img.blend(img3, 0, 0, 655, 395, 0, 0, 655, 395, OVERLAY);
    img.blend(img4, 0, 0, 655, 395, 300, 0, 655, 395, ADD);
    image(img, 0, 0);
    */
}

class Flag {
    String name, mode;
    Flag(String name, String mode) {
        this.name = name;
        this.mode = getMode(mode);
    }

    PConstants getMode(mode) {
        switch(mode) {
            case "BLEND":
                return BLEND;
            case "ADD":
                return ADD;
            case "SUBTRACT":
                return SUBTRACT;
            case "DARKEST":
                return DARKEST;
            case "LIGHTEST":
                return LIGHTEST;
            case "DIFFERENCE":
                return DIFFERENCE;
            case "EXCLUSION":
                return EXCLUSION;
            case "MULTIPLY":
                return MULTIPLY;
            case "SCREEN":
                return SCREEN;
            case "OVERLAY":
                return OVERLAY;
            case "HARD_LIGHT":
                return HARD_LIGHT;
            case "SOFT_LIGHT":
                return SOFT_LIGHT;
            case "DODGE":
                return DODGE;
            case "BURN":
                return BURN;
        }
    }
}
