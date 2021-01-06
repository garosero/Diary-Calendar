const path = require("path");
const HtmlWebpackPlugIn = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const webpack = require("webpack");
const port = process.env.PORT || 3000;
const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode: mode,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.[hash].js",
  },
  module: {
    rules: [
      {
        //1. es6 바벨 관련 로더.
        //.js, .jsx 확장자도 같이 번들. node_modules 안에 있는 파일은 번들에 제외
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/react",
              [
                "@babel/preset-env",
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              // option - class properties를 사용할 경우에만 추가
              "babel-plugin-styled-components",
              // option - styled-components를 사용할 경우에만 추가
              // class명에 컴포넌트 이름을 prefix 해줌, 디버그할 때 좋음
            ],
          },
        },
      },

      {
        //2. html loader
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              //코드 최적화 옵션
              minimize: true,
            },
          },
        ],
      },

      {
        //3. css loader
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugIn({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new HotModuleReplacementPlugin(),
  ],

  devServer: {
    host: "http://diarycalendar.herokuapp.com", //개발 서버 url
    port: port,
    open: true, //서버가 실행될 때 브라우저를 자동으로 열어줄 지 결정
    historyApiFallback: true,
    proxy: {
      // "/api/*": {
      //   target: "https://localhost:4000/",
      //   changeOrigin: true,
      //   secure : false,
      // },
      "**": "http://diarycalendar.herokuapp.com",
    },
  },
};