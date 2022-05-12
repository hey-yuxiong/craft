<template>
  <el-form label-position="top" size="mini" :model="elementProps">
    <el-form-item label="Sources">
      <el-input :value="getStyle('sources[0].src')" @input="setStyle('sources[0].src', $event)" />
    </el-form-item>
    <el-form-item label="Poster">
      <el-input :value="getStyle('poster')" @input="setStyle('poster', $event)" />
    </el-form-item>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Width" v-if="styleExist('width')">
          <el-slider :min="200" :max="800" :value="getStyle('width')" @input="setStyle('width', $event)" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Height" v-if="styleExist('height')">
          <el-slider :min="200" :max="800" :value="getStyle('height')" @input="setStyle('height', $event)" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { settingMixin } from '@';

export default {
  mixins: [settingMixin],
  methods: {
    styleExist(name) {
      return this.elementProps.playerOptions[name] !== undefined;
    },
    getStyle(name) {
      if (name.includes('sources')) {
        return this.elementProps.playerOptions['sources'][0].src
      }
      return this.elementProps.playerOptions[name];
    },
    setStyle(name, value) {
      if (name.includes('sources')) {
        const sources = [{
          src: value
        }]
        this.elementPropsSetter({
          playerOptions: {
            ...this.elementProps.playerOptions,
            sources,
          },
        });
        return
      }
      this.elementPropsSetter({
        playerOptions: {
          ...this.elementProps.playerOptions,
          [name]: value,
        },
      });
    }
  },
};
</script>
