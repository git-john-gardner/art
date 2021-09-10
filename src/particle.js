import { vector } from "./vec";

export class Particle {
    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity || vector(0, 0);
    }

    move(dt) {
        this.position.add(this.velocity.times(dt))
    }
}