import { pixelgrid, setPixel } from "./util";
import { donothing } from "../fns";

const pausablesketch = (setup, draw) => {
    return new p5((p5) => {
        let paused = false;

        p5.setup = function () { setup(p5) }

        p5.draw = function () {
            if (paused)
                p5.frameCount--
            else
                draw(p5)
        }

        p5.keyPressed = function () {
            if (p5.key == " ")
                paused = !paused
            if (p5.key == "s")
                p5.saveCanvas("sketch.png")
        }
    })
}

const staticgrid = (generatef, setup = donothing) => {
    return new p5((p5) => {
        const f = generatef(p5)

        let seed = 0;
        let paused = false;

        p5.setup = function () {
            seed++
            paused = false;
            console.log(`Seed: ${seed}`)
            p5.noiseSeed(seed); p5.randomSeed(seed);
            p5.createCanvas(p5.windowWidth, p5.windowHeight);
            p5.pixelDensity(1)
            setup(p5)
        }

        p5.draw = function () {
            if (paused) return

            p5.loadPixels()
            const tick = performance.now()
            for (const [idx, x, y] of pixelgrid(p5)) {
                const val = f({ x, y })
                setPixel(p5, idx, val)
            }
            const tock = performance.now()
            p5.updatePixels()

            const duration = tock - tick
            const calculations = p5.width * p5.height * p5.pixelDensity() ** 2
            console.log("Pixels per ms:", (calculations / duration).toFixed(0));
            paused = true
        }

        p5.keyPressed = function () {
            if (p5.key == "s")
                p5.saveCanvas("sketch.png")
            if (p5.key == " ")
                p5.setup()
        }
    })

}

export { pausablesketch, staticgrid }