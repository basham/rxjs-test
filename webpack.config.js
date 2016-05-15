var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var pkg = require('./package.json');

var paths = {
  node: path.join(__dirname, 'node_modules'),
  source: path.join(__dirname, 'src'),
  output: path.join(__dirname, 'build')
};

function makeUrl(address, port) {
  return 'http://' + address + ':' + port;
}

var address = 'localhost';
var port = 8000;
var url = makeUrl(address, port);

var config = {
  context: paths.source,
  entry: {
    app: [
      // WebpackDevServer host and port.
      //'webpack-dev-server/client?' + url,
      // Hot module reloading behavior. Ignores automatic browser refreshes.
      //'webpack/hot/dev-server',
      // Main entry point.
      './index.js'
    ]
  },
  output: {
    filename: '[name].js',
    path: paths.output,
    pathInfo: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  resolveLoader: {
    // Ensure dependencies in external packages will use this projects's loaders,
    // instead of resolving to its loaders.
    //root: paths.node
  },
  // WebpackDevServer config.
  devServer: {
    address: address,
    hot: true,
    noInfo: true,
    port: port,
    url: url
  },
  // Set loaders to debug mode.
  debug: false,
  // Generate source maps, so its easier to find errors in code.
  //devtool: 'cheap-module-eval-source-map',
  plugins: [
    // Enable hot module replacement.
    //new webpack.HotModuleReplacementPlugin(),
    // Ignore injecting code with errors.
    //new webpack.NoErrorsPlugin(),
    // Create `index.html` with appropriate references to generated files.
    new HtmlWebpackPlugin({
      title: pkg.name,
      inject: true,
      template: paths.source + '/index.html'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        //exclude: /node_modules/,
        include: [
          paths.source
        ],
        loaders: [
          'babel'
        ]
      }
    ]
  }
};

module.exports = config;
