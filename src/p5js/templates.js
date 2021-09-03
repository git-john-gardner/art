import { pixelgrid, setPixel } from "./util";
import { donothing } from "../fns";

const staticgrid = (f, reset = donothing) => {
    return new p5((p5) => {
        let seed = 0;
        let paused = false;

        const _reset = () => {
            seed++
            console.log(`Seed: ${seed}`)
            reset({ seed })
        }

        p5.setup = function () {
            paused = false;
            p5.createCanvas(p5.windowWidth, p5.windowHeight);
            p5.pixelDensity(1)
            _reset()
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
            if (p5.key == "s") p5.saveCanvas("sketch.png")
            if (p5.key == " ") p5.setup()
        }
    })
}


const pausable = (() => {
    let paused = false
    return {
        setup: () => { paused = false },
        draw: (p5) => {
            if (paused) {
                p5.frameCount--
                return true
            }
        },
        keyPressed: (p5) => { if (p5.key == " ") paused = !paused }
    }
})()

const fullscreen = {
    setup: (p5) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight)
    }
}

const onkey = (key, callback) => {
    return {
        keyPressed: (p5) => {
            if (p5.key == key) callback(p5)
        }
    }
}
const saveable = onkey("s", p5 => p5.saveCanvas("sketch.png"))

const mapfunction = (fn) => {
    return (() => {
        return {
            setup: (p5) => { p5.pixelDensity(1) },
            draw: (p5) => {
                p5.loadPixels()
                const tick = performance.now()
                for (const [idx, x, y] of pixelgrid(p5)) {
                    const val = fn({ x, y })
                    setPixel(p5, idx, val)
                }
                const tock = performance.now()
                p5.updatePixels()

                const duration = tock - tick
                const calculations = p5.width * p5.height * p5.pixelDensity() ** 2
                console.log("Pixels per ms:", (calculations / duration).toFixed(0));
            }
        }
    })()
}

const staticseeded = (cb) => {
    return (() => {
        let seed = 0;
        const reset = (p5) => {
            cb(++seed)
            p5.frameCount--
        }
        return {
            draw: (p5) => {
                if (p5.frameCount > 1) {
                    p5.frameCount--
                    return true
                }
            },
            ...onkey(" ", reset)
        }
    })()
}

export { staticgrid, pausable, fullscreen, saveable, mapfunction, onkey, staticseeded }