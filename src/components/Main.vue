<template>
  <div class="main">
    <div class="mainHeader">
      <h1>
        <img class="mainHeaderLogo -light" src="@/assets/logo_wordmark.svg" alt="Oracy" />
        <img class="mainHeaderLogo -dark" src="@/assets/logo_wordmark_white.svg" alt="Oracy" />
      </h1>
      <div>
        Enjoy <!--over 10K -->public domain audiobooks, completely free and without ads.
      </div>
    </div>
    <div class="mainContent">
      <template v-if="this.loading">
        <div class="mainContentLoader">
          <b-spinner type="grow" label="Loading..."></b-spinner>
        </div>
      </template>
      <template v-else-if="this.error">
        <div class="mainContentError">
          Error loading audiobooks.
          <b-button variant="outline-primary" pill @click="retryLoadingAudiobooks">
            Try again
          </b-button>
        </div>
      </template>
      <template v-else>
        <h2 class="mainContentListTitle">
          Featured Audiobooks
        </h2>
        <List :audiobooks=featuredAudiobooks />
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
  methods: {
    loadAudiobooks: function() {
      this.loading = true
      // Grab featuredAudiobooks from Oracy API via AJAX call.
      fetch(process.env.VUE_APP_API_ENDPOINT + '/featured')
        .then(res => res.json())
        .then(
          (response) => {
            this.featuredAudiobooks = response
            this.loading = false
          },
          (error) => {
            console.log(error)
            this.loading = false
            this.error = true
          }
        )
    },
    retryLoadingAudiobooks: function() {
      this.loadAudiobooks()
    }
  },
  mounted() {
    this.loadAudiobooks()
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
  padding: 80px 15px 30px
  @media (min-width: $breakpoint_2)
    padding-bottom: 120px
    padding-left: 0
    padding-right: 0
.mainHeader
  +body1
  font-weight: 600
  div
    user-select: text
.mainHeaderLogo
  height: 50px
  margin-bottom: 10px
  &.-light
    @media (prefers-color-scheme: dark)
      display: none
  &.-dark
    display: none
    @media (prefers-color-scheme: dark)
      display: block
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
    color: $color_grey_800
    @media (prefers-color-scheme: dark)
      color: $color_grey_400
</style>
