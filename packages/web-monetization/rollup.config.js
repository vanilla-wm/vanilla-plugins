import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'

const bundleName = 'main'

const build = (outFile, format, mode) => ({
  input: 'src/index.ts',
  output: [
    {
      file: `./lib/${outFile}`,
      format,
      sourcemap: true,
      name: ['umd', 'iife'].includes(format) ? bundleName : undefined,
    },
  ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    json(),
    typescript(),
    commonjs(),
    resolve(),
    terser(),
    sourceMaps(),
  ],
})

export default [
  build(`${bundleName}.js`, 'cjs', 'development'),
  build(`${bundleName}.min.js`, 'cjs', 'production'),
  build(`${bundleName}.umd.js`, 'umd', 'development'),
  build(`${bundleName}.umd.min.js`, 'umd', 'production'),
  build(`${bundleName}.module.js`, 'es', 'development'),
]
