<template>
  <div class="main">
    <div class="mainHeader">
      <h1><img src="@/assets/logo_wordmark.svg" class="mainHeaderLogo" alt="Oracy" /></h1>
      <div>
        Enjoy 50K+ public domain audiobooks, completely free and without ads.
      </div>
    </div>
    <div class="mainContent">
      <div v-if="this.loading == false">
        <h2>
          Featured Audiobooks
        </h2>
        <List :audiobooks=featuredAudiobooks />
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
    <div class="mainFooter">
      Built by <a href="https://twitter.com/damirkotoric" target="_blank">@damirkotoric</a>
    </div>
  </div>
</template>

<script>
import List from '@/components/List.vue'

export default {
  name: 'Main',
  components: {
    List
  },
  data() {
    return {
      featuredAudiobooks: [],
      loading: true
    }
  },
  mounted() {
    // Grab featuredAudiobooks from Oracy API via AJAX call.
    fetch('/featured')
      .then(res => res.json())
      .then(
        (response) => {
          this.featuredAudiobooks = response
          this.loading = false
        },
        (error) => {
          console.log(error)
        }
      )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.main
  margin: 0 auto
  max-width: 620px
  padding: 80px 0
.mainHeader
  +body1
  font-weight: 600
  div
    user-select: all
.mainHeaderLogo
  height: 50px
  margin-bottom: 10px
.mainContent
  margin-top: 50px
  h2
    margin-bottom: 5px
    +overline
.mainFooter
  +subtitle
  color: $color_grey_500
  padding: 140px 0 20px
  text-align: center
  a
    color: $color_grey_800
</style>
