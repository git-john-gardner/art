import { readdirSync } from "fs";

const sketches = readdirSync('sketches');
console.log(sketches);

const bundle = (file) => {
    return {
        input: `sketches/${file}`,
        output: {
            file: `dist/js/bundle.${file}`,
            format: 'iife',
            sourcemap: true,
        },
        sourcemap: true
    }
}

export default sketches.map(bundle);