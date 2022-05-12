<template>
  <video-player  
    class="video-player-box"
    ref="videoPlayer"
    :options="playerOptions"
    :playsinline="true"
    @play="onPlayerPlay($event)"
    @pause="onPlayerPause($event)"
    @statechanged="playerStateChanged($event)"
    @ready="playerReadied">
  </video-player>
</template>

<script>
import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'
import VideoSetting from './VideoSetting.vue';
import elementStyleMixin from './elementStyleMixin';
import defaultImageUrl from './assets/default_picture_image.jpg';

export default {
  mixins: [elementStyleMixin],
  components: { videoPlayer },
  props: {
    playerOptions: Object
  },
  craft: {
    defaultProps: {
      playerOptions: {
        width: 300,
        height: 100,
        muted: true,
        language: 'en',
        playbackRates: [],
        sources: [{
          type: "video/mp4",
          src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        }],
        poster: defaultImageUrl,
      },
    },
    settings: {
      Properties: VideoSetting
    },
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    onPlayerPlay(player) {
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied(player) {
      console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    }
  },
};
</script>

<style lang="scss" scoped>
.image {
  max-width: 100%;
}
</style>
