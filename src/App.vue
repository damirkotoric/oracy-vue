<template>
  <div id="app">
    <Main />
  </div>
</template>

<script>
import Main from '@/components/Main.vue'

export default {
  name: 'app',
  components: {
    Main
  }
}
</script>

<style lang="sass">
@import "sass/reset"

*, *:before, *:after
  -moz-box-sizing: border-box
  box-sizing: border-box

html
  background-color: $color_grey_50
  +body1
  font-family: -apple-system, BlinkMacSystemFont, sans-serif
  user-select: none

  // @media screen and (prefers-color-scheme: dark)
  //   &
  //     background-color: $color_grey_900
  //     color: $color_grey_50

body

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
