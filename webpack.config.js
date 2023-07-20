const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "[name][chunkhash:8].js",
    chunkFilename: '[id].[chunkhash].js',
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  devtool: "source-map",
  devServer: {
    hot: true,
    open: true,
    port: 9999
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "public": path.resolve(__dirname, "public")
    }
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx|ts|tsx)$/i,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-typescript",
                  [
                    "@babel/preset-react",
                    {
                      "runtime": "automatic"
                    }
                  ],
                  "@babel/preset-env"]
              }
            }
          },
          {
            test: /\.(less|css)$/i,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: {
                    localIdentName: "[path][name]_[local]_[hash:base64:5]",
                  }
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [
                      "postcss-preset-env"
                    ]
                  }
                }
              },
              "less-loader"
            ]
          },
          {
            test: /\.(png|jpg|gif)$/i,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 5 * 1024, // 5KB
              }
            }
          },
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html"
    })
  ]
}