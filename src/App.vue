<template>
  <div id="app">
    <Main />
    <Player />
    <ConnectivityChecker />
  </div>
</template>

<script>
import Main from '@/components/Main.vue'
import ConnectivityChecker from '@/components/ConnectivityChecker.vue'
import Player from '@/components/Player.vue'

export default {
  name: 'app',
  components: {
    Main,
    ConnectivityChecker,
    Player
  }
}
</script>

<style lang="sass">
@import "sass/bootstrapTheme"
@import "~bootstrap/scss/bootstrap.scss"
@import "~bootstrap-vue/src/index.scss"

html
  +body1
  user-select: none

body
  @media (prefers-color-scheme: dark)
    background-color: $color_grey_900
    color: $color_grey_100

h1
  +h1

h2
  +h2

h3
  +h3

h4
  +h4

h5
  +h5

h6
  +h6

p
  +body1
  margin: 15px 0

small
  display: block
  font-size: 0.7rem
  line-height: 1.5

a
  color: $color_primary_500
  text-decoration: none

abbr
  border-bottom: 1px dotted rgba(black, 0.3)
  text-decoration: none

strong
  font-weight: 800
  a
    font-weight: 800

ul, ol
  +body1
  list-style: none
  margin: 0

ul
  list-style: disc
  margin-left: 1em

em
  font-style: italic

br
  line-height: 2rem

hr
  background: $color_grey_100
  border: none
  height: 2px
  margin: 50px auto
  width: 100px
</style>
