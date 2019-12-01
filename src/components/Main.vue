<template>
  <div class="main">
    <div class="mainHeader">
      <h1><img src="@/assets/logo_wordmark.svg" class="mainHeaderLogo" alt="Oracy" /></h1>
      <div>
        Enjoy 50K+ public domain audiobooks, completely free and without ads.
      </div>
    </div>
    <div class="mainContent">
      <h2>
        Featured Audiobooks
      </h2>
      <List :audiobooks=featuredAudiobooks />
      
    </div>
  </div>
</template>

<script>
import featuredAudiobookIds from '@/data/featuredAudiobookIds.json'
import List from '@/components/List.vue'

export default {
  name: 'Main',
  components: {
    List
  },
  data() {
    return {
      featuredAudiobooks: []
    }
  },
  mounted() {
    featuredAudiobookIds.forEach(function(value) {
      fetch('/api/feed/audiobooks/?id='+value+'&format=json&extended=1')
        .then(res => res.json())
        .then(
          (result) => {
            this.featuredAudiobooks.push(result.books[Object.keys(result.books)[0]])
          },
          (error) => {
            console.log(error)
          }
        )
    }.bind(this))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.main
  margin: 0 auto
  max-width: 620px
  padding: 80px 0 160px
.mainHeader
  +body1
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
</style>
