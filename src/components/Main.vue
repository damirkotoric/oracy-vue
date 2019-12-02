<template>
  <div class="main">
    <div class="mainHeader">
      <h1><img src="@/assets/logo_wordmark.svg" class="mainHeaderLogo" alt="Oracy" /></h1>
      <div>
        Enjoy 50K+ public domain audiobooks, completely free and without ads.
      </div>
    </div>
    <div class="mainContent">
      <template v-if="this.error">
        <div class="mainContentError">
          Error loading audiobooks.
          Try again
        </div>
      </template>
      <template v-else>
        <template v-if="this.loading">
          <div class="mainContentLoader">
            Loading...
          </div>
        </template>
        <template v-else>
          <h2>
            Featured Audiobooks
          </h2>
          <List :audiobooks=featuredAudiobooks />
        </template>
      </template>
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
      loading: true,
      error: false
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
          this.error = true
        }
      )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.main
  display: flex
  flex-direction: column
  margin: 0 auto
  max-width: 620px
  min-height: 100vh
  padding: 80px 0
.mainHeader
  +body1
  font-weight: 600
  div
    user-select: text
.mainHeaderLogo
  height: 50px
  margin-bottom: 10px
.mainContent
  margin-top: 50px
  h2
    margin-bottom: 5px
    +overline
.mainContentLoader
  display: flex
  justify-content: center
  padding: 100px 0
.mainContentError
  text-align: center
  button
    display: block
    margin: 20px auto 0
.mainFooter
  +subtitle
  margin-top: auto
  color: $color_grey_500
  padding: 140px 0 20px
  text-align: center
  a
    color: $color_grey_800 !important
</style>
