<template>
  <div :class="{'listItem ':true, '-playing':isPlaying}">
    <div class="listItemImage">
      <img :src="audiobook.coverImageSrc" alt=""/>
      <div class="listItemImageControls">
        <IconPlay class="listItemImageControlsPlay" title="Play" @click="playItem" />
        <IconPause class="listItemImageControlsPause" title="Pause" @click="pauseItem" />
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
import IconPlay from 'vue-material-design-icons/Play.vue'
import IconPause from 'vue-material-design-icons/Pause.vue'

export default {
  name: 'ListItem',
  components: {
    IconPause,
    IconPlay,
  },
  computed: {
    isPlaying() {
      if (this.$store.state.playerStatus === 'play' && this.$store.state.activeAudiobook === this.audiobook) {
        return true
      } else {
        return false
      }
    },
    activeAudiobook() {
      return this.$store.state.activeAudiobook
    },
    playerStatus() {
      return this.$store.state.playerStatus
    }
  },
  props: {
    audiobook: Object
  },
  methods: {
    playItem: function() {
      if(this.activeAudiobook != this.audiobook) {
        this.$store.commit('setPlayerStatus', 'pause')
        this.$store.commit('setActiveAudiobook', this.audiobook)
      }
      console.log(this.playerStatus)
      this.$store.commit('setPlayerStatus', 'play')
    },
    pauseItem: function() {
      this.$store.commit('setPlayerStatus', 'pause')
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
  @media (prefers-color-scheme: dark)
    background: rgba(white, 0.5)
  &:hover
    opacity: 1
  > svg
    fill: white
    height: 50px
    width: 50px
    @media (prefers-color-scheme: dark)
      fill: black

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
