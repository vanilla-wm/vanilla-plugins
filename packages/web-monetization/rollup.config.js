import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'

const bundleName = 'main'

const typescriptConfig = {
  useTsconfigDeclarationDir: true,
  tsconfigDefaults: {
    compilerOptions: {
      declarationDir: 'lib/types',
    },
  },
}

const build = (outFile, format) => ({
  input: 'src/index.ts',
  external: ['isomorphic-fetch'],
  output: [
    {
      file: `./lib/${outFile}`,
      format,
      sourcemap: false,
      name: undefined,
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
    typescript(typescriptConfig),
    resolve(),
    commonjs(),
    terser({
      module: true,
      toplevel: true,
      mangle: {
        toplevel: true,
      },
      output: {
        beautify: false,
      },
    }),
  ],
})

export default [build(`${bundleName}.min.js`, 'cjs')]
