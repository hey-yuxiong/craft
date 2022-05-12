/*
 * @Author: yuxiong
 * @Desc:    
 * @Date:   2022-05-11 14:33:48
 */
const express = require("express");
const app = express();

var path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const vuePlugin = new VueLoaderPlugin()
const config = require('../vue.config.js');

app.get("/build", (req, res) => {
  webpack({
    entry: '/Users/yuxiong/Git/longping/craft/src/example/Preview.vue',
    output: {
      // 输出文件
      filename: 'bundle.js',
      // 文件存放路径
      path: path.resolve(__dirname, './dist')
    }
  }, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.error(err)
    }
    // 处理完成
    res.json('success')
  });
})
webpack({
  entry: '/Users/yuxiong/Git/longping/craft/src/example/Preview.vue',
  output: {
    // 输出文件
    filename: 'bundle.js',
    // 文件存放路径
    path: path.resolve(__dirname, './dist')
  }
}, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err)
  }
});
app.listen("3000", () => {
  console.log("=========service start , port 3000=========");
});
