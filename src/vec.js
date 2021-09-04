import { random } from "./maths/random";

const _sanitize = (v) => v instanceof Vector ? v.copy() : vector(v, v, v)

class Vector {
    constructor(x, y, z = 0) {
        this.x = x; this.y = y; this.z = z
    }

    get mag() { return Math.hypot(this.x, this.y, this.z) }
    copy() { return new Vector(this.x, this.y, this.z) }

    add(other) {
        const { x, y, z } = _sanitize(other)
        this.x += x; this.y += y; this.z += z;
        return this
    }
    mul(other) {
        const { x, y, z } = _sanitize(other);
        this.x *= x; this.y *= y; this.z *= z;
        return this
    }
    sub(other) {
        const { x, y, z } = _sanitize(other)
        this.x -= x; this.y -= y; this.z -= z;
        return this
    }
    div(other) { // TODO think about /0
        const { x, y, z } = _sanitize(other)
        this.x /= x; this.y /= y; this.z /= z;
        return this
    }

    plus(other) { return this.copy().add(other) }
    minus(other) { return this.copy().sub(other) }
    times(other) { return this.copy().mul(other) }
    over(other) { return this.copy().div(other) }

    rot(theta) {
        const { x, y } = this
        const c = Math.cos(theta), s = Math.sin(theta)
        this.x = x * c - y * s
        this.y = s * x + y * c
        return this
    }

    rotatedby(theta) {
        return this.copy().rot(theta)
    }

    get perp() {
        return this.copy().rot(Math.PI / 2)
    }

    static random2D(randfn) {
        const theta = (randfn == undefined ? random() : randfn()) * Math.PI * 2
        return new Vector(Math.cos(theta), Math.sin(theta))
    }
}

const vector = (...args) => new Vector(...args)

export { vector, Vector }
