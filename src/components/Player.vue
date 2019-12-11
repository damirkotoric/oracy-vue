<template>
  <div :class="{'player':true, '-mini':(view === 'mini'), '-full':(view === 'full'), '-playing':(playerStatus === 'play'), '-paused':(playerStatus === 'pause')}" @click="openFullView">
    <div class="playerMain">
      <img class="playerCoverImage" :src="activeAudiobook.coverImageSrc" alt="">
      <div class="playerInfoControls">
        <div class="playerInfo">
          <div class="playerTitle">{{activeAudiobook.title}}</div>
          <div class="playerAuthor">{{activeAudiobook.creator}}</div>
        </div>
        <div class="playerControls">
          <div class="playerControlsRewind">
            <IconRewind title="Rewind 10 seconds" />
          </div>
          <div class="playerControlsPlayPause">
            <div class="playerControlsPlay" @click="triggerPlay">
              <IconPlay title="Play" />
            </div>
            <div class="playerControlsPause" @click="triggerPause">
              <IconPause title="Pause" />
            </div>
          </div>
          <div class="playerControlsForward">
            <IconForward title="Forward 10 seconds" />
          </div>
        </div>
      </div>
    </div>
    <div class="playerCollapse" @click="collapseFullView">
      <IconChevronDown title="Collapse" />
    </div>
  </div>
</template>

<script>
import {Howl} from 'howler'
import IconChevronDown from 'vue-material-design-icons/ChevronDown.vue'
import IconForward from 'vue-material-design-icons/FastForward10.vue'
import IconPlay from 'vue-material-design-icons/Play.vue'
import IconPause from 'vue-material-design-icons/Pause.vue'
import IconRewind from 'vue-material-design-icons/Rewind10.vue'

export default {
  name: 'Player',
  components: {
    IconChevronDown,
    IconForward,
    IconPlay,
    IconPause,
    IconRewind,
  },
  data() {
    return {
      activeSound: undefined,
      playHistory: [],
      view: 'hidden'
    }
  },
  computed: {
    activeAudiobook() {
      return this.$store.state.activeAudiobook
    },
    playerStatus() {
      return this.$store.state.playerStatus
    }
  },
  methods: {
    collapseFullView: function(e) {
      e.stopPropagation()
      this.view = 'mini'
    },
    openFullView: function(e) {
      e.stopPropagation()
      this.view = 'full'
    },
    triggerPause: function(e) {
      e.stopPropagation()
      this.$store.commit('setPlayerStatus', 'pause')
    },
    pause: function() {
      this.activeSound.pause()
    },
    triggerPlay: function(e) {
      e.stopPropagation()
      this.$store.commit('setPlayerStatus', 'play')
    },
    play: function() {
      if (this.activeSound) {
        this.activeSound.pause()
      }
      function getAudiobookFromPlayHistory(obj, arr) {
        var i
        for (i = 0; i < arr.length; i++) {
          if (arr[i].audiobook === obj) {
            return i
          }
        }
        return -1
      }
      let historyIndex = getAudiobookFromPlayHistory(this.activeAudiobook, this.playHistory)
      if (historyIndex == -1) { 
        // Not found in history. Play from the start.
        if (this.view == 'hidden') {
          this.view = 'mini'
        }
        let sound = new Howl({
          html5: true,
          src: [this.activeAudiobook.audioTracks[0]]
        })
        this.activeSound = sound
        this.playHistory.push({
          'audiobook': this.activeAudiobook,
          'sound': sound
        })
        sound.play()
      } else {
        // Continue playing last played sound.
        // Todo: be able to continue playing sounds from playHistory.
        this.activeSound.play()
      }
    }
  },
  watch: {
    activeAudiobook() {
    },
    playerStatus(newStatus) {
      if (newStatus == 'play') {
        this.play()
      }
      if (newStatus == 'pause') {
        this.pause()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.player
  background: white
  color: $color_grey_900
  position: fixed
  &.-mini
    background: rgba(white, 0.7)
    backdrop-filter: blur(10px)
    border-radius: 10px
    box-shadow: 0 4px 20px rgba(black, 0.2)
    bottom: 10px
    cursor: pointer
    left: 0
    height: 70px
    margin: 0 10px
    max-width: 700px
    padding: 10px 0 10px 10px
    width: calc(100% - 20px)
    @media (min-width: $breakpoint_2)
      bottom: 20px
      height: 80px
      left: 50%
      margin: 0
      transform: translateX(-50%)
      width: 100%
  &.-full
    align-items: center
    display: flex
    flex-direction: column
    left: 0
    height: 100vh
    padding: 15px
    top: 0
    width: 100vw
    @media (prefers-color-scheme: dark)
      background-color: $color_grey_900
      color: $color_grey_100

.playerMain
  height: 100%
  margin: 0 auto
  .-mini &
    align-items: center
    display: flex
    justify-content: space-between
    width: 100%
  .-full &
    max-width: 900px
    align-items: center
    display: flex
    flex-direction: column
    justify-content: center
    @media (min-width: $breakpoint_2)
      flex-direction: row
      justify-content: space-between

.playerCoverImage
  box-shadow: 0 0 60px rgba(black, 0.4)
  max-height: 100%
  width: auto
  @media (prefers-color-scheme: dark)
    box-shadow: 0 0 60px rgba(white, 0.1)
  .-mini &
    height: 60px
    margin-right: 15px
  .-full &
    height: auto
    margin-bottom: 20px
    max-width: 100%
    @media (min-width: $breakpoint_2)
      margin-bottom: 0
      margin-right: 60px

.playerInfoControls
  text-align: center
  width: 100%
  @media (min-width: $breakpoint_2)
    text-align: left
  .-mini &
    align-items: center
    display: flex
    justify-content: center

.playerInfo
  user-select: text
  .-mini &
    user-select: none
    width: 100%

.playerTitle
  .-mini &
    +h6
    display: none
    margin-right: 40px
    text-align: left
    @media (min-width: $breakpoint_1)
      display: block
  .-full &
    +h6
    @media (min-width: $breakpoint_2)
      +h2

.playerAuthor
  margin-top: 15px
  .-mini &
    display: none
  .-full &
    +caption
    @media (min-width: $breakpoint_2)
      +body1

.playerControls
  align-items: center
  display: flex
  justify-content: center
  .-full &
    justify-content: center
    padding-top: 40px
    @media (min-width: $breakpoint_2)
      justify-content: flex-start

.playerControlsPlayPause, .playerControlsRewind, .playerControlsForward
  cursor: pointer
  opacity: 0.93
  &:hover
    opacity: 1
  &:active
    opacity: 0.8
    svg
      transform: scale(0.97)

.playerControlsPlay, .playerControlsPause
  height: 70px
  padding: 10px
  @media (min-width: $breakpoint_1)
    padding: 10px
  .-full &
    background: black
    border-radius: 50%
    height: 90px
    margin: 0 40px
    width: 90px
    @media (prefers-color-scheme: dark)
      background: $color_grey_100
  svg
    height: 100%
    width: 70px
    @media (prefers-color-scheme: dark)
      fill: $color_grey_900
    .-mini &
      fill: black
    .-full &
      fill: white
      @media (prefers-color-scheme: dark)
        fill: black


.playerControlsPlay
  .-playing &
    display: none

.playerControlsPause
  display: none
  .-playing &
    display: block
  .-full &
    svg
      padding: 6px

.playerControlsRewind, .playerControlsForward
  height: 46px
  padding: 10px
  width: 46px
  @media (min-width: $breakpoint_2)
    height: 56px
    width: 56px
  svg
    height: 100%
    width: 100%

.playerControlsRewind
  .-mini &
    @media (min-width: $breakpoint_2)
      height: 46px
      width: 46px

.playerControlsForward
  .-mini &
    display: none

.playerCollapse
  cursor: pointer
  height: 140px
  opacity: 0.5
  padding: 20px 20px 60px
  transition: opacity 0.3s
  width: 100px
  &:hover
    opacity: 1
  &:active
    svg
      transform: translateY(1px)
  .-mini &
    display: none
  svg
    height: 100%
    width: 100%

</style>
