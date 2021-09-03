(function () {
    'use strict';

    function* enumerate(it) {
        let i = 0;
        for (const x of it)
            yield [i++, x];
    }

    function* range(max) {
        let i = -1;
        while (++i < max)
            yield i;
    }

    function* pixelgrid(p5) {
        const d = p5.pixelDensity();
        const [w, h] = [p5.width * d, p5.height * d];
        for (const [ix, x] of enumerate(range(w))) {
            for (const [iy, y] of enumerate(range(h))) {
                const idx = ix + iy * w;
                yield [idx, x / d, y / d];
            }
        }
    }

    function setPixel(p5, idx, col) {
        // default alpha = 255
        p5.pixels[idx * 4 + 3] = 255;

        // handle grayscale
        if (!(col instanceof Array))
            col = [col, col, col];

        // do the setting
        col.forEach((c, i) => p5.pixels[4 * idx + i] = c);
    }

    function donothing() { }

    const staticgrid = (f, setup = donothing) => {
        return new p5((p5) => {
            let seed = 0;
            let paused = false;

            p5.setup = function () {
                seed++;
                paused = false;
                console.log(`Seed: ${seed}`);
                p5.noiseSeed(seed); p5.randomSeed(seed);
                p5.createCanvas(p5.windowWidth, p5.windowHeight);
                // p5.pixelDensity(1)
                setup(p5);
            };

            p5.draw = function () {
                if (paused) return

                p5.loadPixels();
                const tick = performance.now();
                for (const [idx, x, y] of pixelgrid(p5)) {
                    const val = f(x, y, p5);
                    setPixel(p5, idx, val);
                }
                const tock = performance.now();
                p5.updatePixels();

                const duration = tock - tick;
                const calculations = p5.width * p5.height * p5.pixelDensity() ** 2;
                console.log("Pixels per ms:", (calculations / duration).toFixed(0));
                paused = true;
            };

            p5.keyPressed = function () {
                if (p5.key == "s")
                    p5.saveCanvas("sketch.png");
                if (p5.key == " ")
                    p5.setup();
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

    const detail = 4;
    const falloff = 0.6;
    const scale = 0.01;
    const rapidity = 40;


    function setup(p5) {
        p5.noiseDetail(detail, falloff);
    }

    const colours = pallettes.coffee;

    function color(val) {
        // return val * 255
        return colours[Math.floor(val * 4)]
    }

    function f(x, y, p5) {
        const noise = p5.noise(scale * x, scale * y);
        const noiseofnoise = p5.noise(noise * rapidity);
        return color(noiseofnoise)
    }

    staticgrid(f, setup);

}());
//# sourceMappingURL=bundle.perlin.js.map
