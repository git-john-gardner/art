(function () {
    'use strict';

    function random(x, y) {
        const r = Math.random();

        if (x === undefined)
            return r
        if (y === undefined)
            [y, x] = [x, 0];

        return r * (y - x) + x
    }

    function randint(x, y) {
        return Math.floor(random(x, y))
    }

    function randchoice(arr) {
        const idx = randint(arr.length);
        return arr[idx]
    }

    const pausablesketch = (setup, draw) => {
        return new p5((p5) => {
            let paused = false;

            p5.setup = function () {
                setup(p5);
            };

            p5.draw = function () {
                if (paused)
                    p5.frameCount--;
                else
                    draw(p5);
            };

            p5.keyPressed = function () {
                if (p5.key == " ")
                    paused = !paused;
                if (p5.key == "s")
                    p5.saveCanvas("sketch.png");
            };
        })
    };

    const _pallettes = {
        sea: "#E7E0C9 #C1CFC0 #6B7AA1 #11324D",
        grass: "#C3BA85 #DAD5AB #F0F0CB #FEFFE2",
        sunset: "#93B5C6 #C9CCD5 #E4D8DC #FFE3E3",
        coffee: "#F5E8C7 #DEBA9D #9E7777 #6F4C5B",
        white: "#FFFFFF",
        default: "#000000 #888888 #FFFFFF",
    };

    const torgb = (hex) => {
        return [0, 1, 2].map(i => parseInt(hex.slice(i * 2 + 1, i * 2 + 3), 16))
    };

    const pallettes = {};
    for (const [name, colors] of Object.entries(_pallettes))
        pallettes[name] = colors.split(" ").map(torgb);

    let colors = pallettes.coffee;
    let bg = randchoice(colors);
    const randcolor = () => randchoice(colors.filter(c => c != bg));

    function setup(p5) {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.rectMode(p5.CENTER);

        p5.background(bg);
        p5.noStroke();
        p5.frameRate(15);
    }

    function draw(p5) {
        p5.fill(...randcolor(), 200);
        p5.translate(random(p5.width), random(p5.height));
        p5.rect(0, 0, random(50, 100));
    }

    pausablesketch(setup, draw);

}());
//# sourceMappingURL=main.js.map
