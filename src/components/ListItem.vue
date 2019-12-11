<template>
  <div :class="{'listItem ':true, '-playing':(playing === true)}">
    <div class="listItemImage" @click="playPauseItem">
      <img :src="audiobook.coverImageSrc" alt=""/>
      <div class="listItemImageControls">
        <IconPlay class="listItemImageControlsPlay" />
        <IconPause class="listItemImageControlsPause" />
      </div>
    </div>
    <div class="listItemContent">
      <h6 class="listItemTitle">{{audiobook.title}}</h6>
      <div class="listItemAuthor">By {{audiobook.creator}}</div>
      <p class="listItemTeaser">{{audiobook.description.substring(0, 265)}}...</p>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../main'
import IconPlay from 'vue-material-design-icons/Play.vue'
import IconPause from 'vue-material-design-icons/Pause.vue'

export default {
  name: 'ListItem',
  components: {
    IconPause,
    IconPlay,
  },
  created() {
    eventBus.$on('playAudio', (audiobook) => {
      if (this.audiobook === audiobook) {
        this.playing = true
      }
    })
    eventBus.$on('pauseAudio', (audiobook) => {
      if (this.audiobook === audiobook) {
        this.playing = false
      }
    })
  },
  data() {
    return {
      playing: false,
    }
  },
  props: {
    audiobook: Object
  },
  methods: {
    playPauseItem: function() {
      if (this.playing) {
        eventBus.$emit('pauseAudio', this.audiobook)
      } else {
        eventBus.$emit('playAudio', this.audiobook)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.listItem
  border-bottom: 1px solid $color_grey_100
  padding: 20px 0
  @media (min-width: $breakpoint_1)
    align-items: flex-start
    display: flex
  @media (min-width: $breakpoint_2)
    padding: 20px 0
  @media (prefers-color-scheme: dark)
    border-bottom: 1px solid $color_grey_800
  &:last-child
    border-bottom: none

.listItemImage
  background: $color_grey_100
  cursor: pointer
  display: block
  height: auto
  margin-bottom: 15px
  margin-right: 20px
  position: relative
  width: 100%
  @media (min-width: $breakpoint_1)
    height: 140px
    margin-bottom: 0
    width: 140px
  @media (prefers-color-scheme: dark)
    background: $color_grey_800
  img
    display: block
    height: auto
    max-width: none !important
    object-fit: cover
    width: 100%
    @media (min-width: $breakpoint_1)
      height: 140px
      width: 140px

.listItemImageControls

.listItemImageControlsPlay, .listItemImageControlsPause
  align-items: center
  background: rgba(black, 0.5)
  display: flex
  height: 100%
  justify-content: center
  left: 0
  opacity: 0
  position: absolute
  top: 0
  transition: opacity 0.3s
  width: 100%
  &:hover
    opacity: 1
  > svg
    height: 50px
    width: 50px

.listItemImageControlsPlay
  .-playing &
    display: none

.listItemImageControlsPause
  display: none
  .-playing &
    display: flex

.listItemContent
  user-select: text

.listItemTitle
  margin-bottom: 5px

.listItemAuthor
  +body2
  color: $color_grey_600
  margin-bottom: 10px
  @media (prefers-color-scheme: dark)
    color: $color_grey_400

.listItemTeaser
  +body2
  margin-bottom: 0
</style>
