import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'

const bundleName = 'main'

const build = (outFile, format) => ({
  input: 'src/index.ts',
  output: [
    {
      file: `./lib/${outFile}`,
      format,
      sourcemap: false,
      name: undefined,
    },
  ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    json(),
    typescript(),
    resolve(),
    commonjs(),
    terser({
      module: true,
      toplevel: true,
      mangle:{
        toplevel: true
      },
      output: {
        beautify: false,
      },
    }),
  ],
})

export default [build(`${bundleName}.min.js`, 'cjs')]
