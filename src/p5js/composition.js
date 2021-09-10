import { allkeys } from "../util";

function compose(...props) {
    const allp5fns = allkeys(...props)

    return new p5((p5) => {
        allp5fns.forEach(fn => {
            p5[fn] = function () {
                for (const p of props) {
                    const _break = p[fn] == undefined ? false : p[fn](p5);
                    if (_break == true)
                        break;
                }
            };
        });
    });
}

const sketch = { compose }
export { sketch }

