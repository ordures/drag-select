import typescript from 'rollup-plugin-typescript2'
import sourceMaps from 'rollup-plugin-sourcemaps'

export default {
  input: './src/index.ts',
  plugins: [
    typescript({
      exclude: 'node_modules/**',
      typescript: require('typescript'),
    }),
    sourceMaps(),
  ],
  output: [
    {
      format: 'es',
      file: 'lib/index.js',
      sourcemap: true,
    },
    {
      format: 'es',
      file: 'example/drag.js',
      sourcemap: true,
    },
  ],
}
