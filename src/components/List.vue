<template>
  <div class="list">
    <div class="listItem" v-for="(audiobook, index) in audiobooks" :key="audiobook.id">
      <div class="listItemImage">
        <img :src="audiobooksImageSrc[index]" alt=""/>
      </div>
      <div class="listItemContent">
        <h6 class="listItemTitle">{{audiobook.metadata.title}}</h6>
        <div class="listItemAuthor">By {{audiobook.metadata.creator}}</div>
        <p class="listItemTeaser">{{audiobook.metadata.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    audiobooks: Array
  },
  data() {
    return {
      audiobooksImageSrc: Array
    }
  },
  created() {
    this.audiobooksImageSrc = this.audiobooks.map(function(audiobook) {
      let imageName = audiobook.files[audiobook.files.findIndex(file => file.format === "JPEG")].name
      return ("https://" + audiobook.d1 + audiobook.dir + "/" + imageName)
    })
  }
}
</script>

<style lang="sass" scoped>
.list
  overflow: hidden

.listItem
  align-items: flex-start
  border-bottom: 1px solid $color_grey_100
  display: flex
  padding: 20px 0
  @media (prefers-color-scheme: dark)
    border-bottom: 1px solid $color_grey_800
  &:last-child
    border-bottom: none

.listItemImage
  background: $color_grey_100
  display: block
  height: 140px
  margin-right: 20px
  width: 140px
  @media (prefers-color-scheme: dark)
    background: $color_grey_800
  img
    display: block
    height: 140px
    max-width: none !important
    object-fit: cover
    width: 140px

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
