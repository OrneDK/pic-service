const path = require('path')// 引入path模块
function resolve (dir) {
  return path.join(__dirname, dir)// path.join(__dirname)设置绝对路径
}
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const debug = process.env.NODE_ENV !== 'production'
module.exports = {
  publicPath: '/', // 根域上下文目录
  outputDir: 'prod', // 构建输出目录
  assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  lintOnSave: true, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  runtimeCompiler: true, // 运行时版本是否需要编译
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          // require('postcss-plugin-px2rem')({
          //   rootValue: 75, // 新版本的是这个值
          //   mediaQuery: false, // （布尔值）允许在媒体查询中转换px。
          //   minPixelValue: 0, // 设置要替换的最小像素值(3px会被转rem)。 默认 0
          // }),
          // eslint-disable-next-line global-require
          require('postcss-px2rem-exclude')({
            remUnit: 75,
            exclude: /node_modules|floder_name/i
          }),
          // eslint-disable-next-line global-require
          require('autoprefixer')({
            overrideBrowserslist: [
              '> 1%',
              'last 5 versions',
              'not ie <= 8'
            ]
          })
        ]
      },
      less: {
        javascriptEnabled: true
      }
    }
  },
  // configureWebpack: (config) => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
  //   if (debug) { // 开发环境配置
  //     config.devtool = 'cheap-module-eval-source-map'
  //   } else { // 生产环境配置
  //   }
  //   Object.assign(config, { // 开发生产共同配置
  //     resolve: {
  //       alias: {
  //         '@': path.resolve(__dirname, './src'),
  //         '@c': path.resolve(__dirname, './src/components'),
  //         '@api': path.resolve(__dirname, './src/api')
  //       }
  //     }
  //   })
  // },
  chainWebpack: (config) => { // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    config.plugin('html')
      .tap((args) => {
        // eslint-disable-next-line no-param-reassign
        args[0].title = 'vue'
        return args
      })
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('@c', resolve('./src/components'))
      .set('@ast', resolve('./src/assets'))
      .set('@api', resolve('./src/api/api'))
      .set('@util', resolve('./src/utils'))
    // set第一个参数：设置的别名，第二个参数：设置的路径
    if (debug) {
      // 本地开发配置
      config.resolve.symlinks(true)
    } else {
      // 生产开发配置
    }
  },
  // eslint-disable-next-line global-require
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  pluginOptions: { // 第三方插件配置
  },
  pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  },
  devServer: {
    open: true,
    // host: '127.0.0.1',
    // port: 80,
    https: false,
    hotOnly: false,
    // 配置关闭host检查:
    disableHostCheck: true,
    proxy: { // 配置跨域
      '/api': {
        // target: 'http://api.kanhn.com', // 线上地址
        target: 'http://localhost:3000',
        // ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    },
    before: (app) => { }
  }
}
