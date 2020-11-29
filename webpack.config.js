// подключаем пакет из node.js для работы с путями
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// определяем в каком режиме сборки мы находимся с помощью системной js переменной NODE_ENV
const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

console.log('isProd', isProd)
console.log('isDev', isDev)

// функция изменения названия бандлов для режима Production
const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  ]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}

// конфигурация webpack'a
module.exports = {
  // путь к исходникам приложения
  context: path.resolve(__dirname, 'src'),
  // webpack в режиме разработки
  mode: 'development',
  // входной файл для приложения
  entry: ['@babel/polyfill', './index.js'],
  output: {
    // имя файла сборки
    filename: filename('js'),
    // куда складывать все скрипты
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js'],
    // вместо относитетельных путей
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core')
    }
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 3000,
    hot: isDev
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      //шаблон для html
      template: "index.html",
      // настройка минификации
      minify: {
        // удалять комментарии в режиме production
        removeComments: isProd,
        // удалять пробелы в режиме production
        collapseWhitespace: isProd
      }
    }),
    // плагин для переноса favicon
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
    // вынос css из js в отдельный файл
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ],
  }
}