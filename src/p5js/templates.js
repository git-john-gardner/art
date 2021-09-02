const pausablesketch = (setup, draw) => {
    return new p5((p5) => {
        let paused = false;

        p5.setup = function () {
            setup(p5)
        }

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

const staticgrid = () => {

}

export { pausablesketch }