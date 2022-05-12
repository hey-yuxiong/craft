<template>
  <div id="app">
    <Editor component='div' :resolverMap="resolverMap" :import="demoData" >
      <!-- <p @click="packaging">打包</p> -->
      <Navbar />
      <ElementSidebar />
      <Preview ref="preview"/>
      <SettingSidebar />
    </Editor>
  </div>
</template>

<script>
import { Editor, Canvas } from '@';
import SettingSidebar from './components/SettingSidebar.vue';
import ElementSidebar from './components/ElementSidebar.vue';
import Navbar from './components/Navbar.vue';
import Preview from './components/Preview.vue';
import Container from './components/elements/Container.vue';
import Paragraph from './components/elements/Paragraph.vue';
import Heading from './components/elements/Heading.vue';
import Picture from './components/elements/Picture.vue';
import Carousel from './components/elements/Carousel.vue';
import Video from './components/elements/Video.vue';
import demoData from './demoData';
// const webpack = require('webpack');
// const htmlWebpackPlugin = require('html-webpack-plugin')
// const VueLoadPlugin = require('vue-loader/lib/plugin')

export default {
  name: 'App',
  components: {
    Editor, SettingSidebar, ElementSidebar, Navbar, Preview,
  },
  data() {
    return {
      resolverMap: {
        Canvas, Container, Paragraph, Heading, Picture, Carousel, Video
      },
      demoData,
    };
  },
  methods: {
    packaging () {
      webpack({
        entry: './components/Preview.vue',
        output: {
          filename: 'preview.html' // 打包后的文件名
        },
        plugins:[
          new htmlWebpackPlugin({
              template:'./preview.html'
          }),
          new VueLoadPlugin(),
        ],
        externals:{
          vue:'Vue'
        },
        module: {
          rules: [
            {
              test: /\.vue$/,
              loader: 'vue-loader',
            }
          ]
        }
      }, (err, stats) => { // [Stats Object](#stats-object)
        if (err || stats.hasErrors()) {
          console.error(err)
          // [在这里处理错误](#error-handling)
        }
        console.log('ok')
        // 处理完成
      });
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

html {
  overflow: hidden;
}

body {
  background: #eee;
  margin: 0;
}
</style>
