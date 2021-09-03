import { randchoice } from "./maths"
import { collect, range } from "./util"

const _pallettes = {
    sea: "#E7E0C9 #C1CFC0 #6B7AA1 #11324D",
    grass: "#C3BA85 #DAD5AB #F0F0CB #FEFFE2",
    sunset: "#93B5C6 #C9CCD5 #E4D8DC #FFE3E3",
    coffee: "#F5E8C7 #DEBA9D #9E7777 #6F4C5B",
    lavender: "#CCF0C3 #BCA3CA #7C4789 #4A0E5C",
    sailor: "#FA163F #12CAD6 #0FABBC #E4F9FF",
    phouse: "#F1F1F1 #FDB827 #21209C #23120B",
    ranger: "#cb997e #ddbea9 #ffe8d6 #b7b7a4 #a5a58d #6b705c",
    nyan: "#9ba2ff #a499be #9e8576 #7a542e #2a2e45 #1d1e2c",
    seasalt: "#818479 #b5cbb7 #d2e4c4 #e4e9b2 #e7e08b #235789",
    child: "#264653 #2a9d8f #e9c46a #f4a261 #e76f51",
    default: "#000000 #888888 #FFFFFF",
}

const torgb = (hex) => {
    return [0, 1, 2].map(i => parseInt(hex.slice(i * 2 + 1, i * 2 + 3), 16))
}

const pallettes = {}
for (const [name, colors] of Object.entries(_pallettes))
    pallettes[name] = colors.split(" ").map(torgb)

const randpallette = () => pallettes[randchoice(Object.keys(pallettes))]

const grayscale = (n) => collect(range(n)).map(i => i / (n - 1) * 255)

export { pallettes, randpallette, grayscale }