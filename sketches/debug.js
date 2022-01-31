import { LineSegment } from "../src/lines";
import { vector } from "../src/vec";

const a = vector(0, 0)
const b = vector(1, 0)

const c = vector(2, 0)
const d = vector(4, 0)

const ab = new LineSegment(a, b)
const cd = new LineSegment(c, d)

ab.distanceto(cd)