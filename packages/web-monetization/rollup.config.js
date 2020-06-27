import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'

const bundleName = 'main'

const build = (outFile, format) => ({
  input: 'src/index.ts',
  external: ['isomorphic-fetch'],
  output: [
    {
      file: `./lib/${outFile}`,
      format,
      sourcemap: false,
      globals: {
        'isomorphic-fetch': 'fetch',
      },
    },
  ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
    resolve(),
    commonjs(),
    terser(),
  ],
})

export default [build(`${bundleName}.js`, 'cjs')]
