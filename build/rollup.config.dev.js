import baseConf from './rollup.config.base'
import serve from 'rollup-plugin-serve'

export default {
  ...baseConf,
  plugins: baseConf.plugins.concat([
    serve({
      port: 3000,
      contentBase: '',
      openPage: '/example/index.html',
      open: true,
    }),
  ]),
}
