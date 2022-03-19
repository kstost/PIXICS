const webpack = require('webpack');
module.exports = {
  devtool: 'source-map',
  entry: './src/pixics.js',
  output: {
    filename: "bundle.js",
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     warnings: false,
    //   },
    // })
  ],
  module: {
    rules: [
      {
        // test: /\.jsx?/,
        // include: 'YOUR_APP_SRC_DIR',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]


    // loaders: [{
    //   test: /\.js$/,
    //   loader: 'babel',
    //   exclude: /(node_modules|bower_components)/
    // }]
  }
};

/*
https://www.npmjs.com/package/@babel/preset-env
https://www.npmjs.com/package/@babel/preset-env
npm install --save-dev @babel/preset-env


*/