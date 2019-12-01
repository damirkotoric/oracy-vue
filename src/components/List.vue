<template>
  <div class="list">
    <div class="listItem" v-for="audiobook in audiobooks" :key="audiobook.id">
      <div class="listItemImage">
        <img :src="audiobook.imageSrc" alt=""/>
      </div>
      <div class="listItemContent">
        <h6 class="listItemTitle">{{audiobook.title}}</h6>
        <div class="listItemAuthor">By {{audiobook.authors[0].first_name}} {{audiobook.authors[0].last_name}}</div>
        <p class="listItemTeaser">{{audiobook.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    audiobooks: Array
  }
}
</script>

<style lang="sass" scoped>
.list

.listItem
  align-items: flex-start
  border-bottom: 1px solid $color_grey_100
  display: flex
  padding: 20px 0
  &:last-child
    border-bottom: none

.listItemImage
  background: $color_grey_100
  margin-right: 20px
  img
    height: 140px
    object-fit: cover
    width: 140px

.listItemContent
  user-select: all

.listItemTitle
  margin-bottom: 5px

.listItemAuthor
  +body2
  margin-bottom: 10px

.listItemTeaser
  +body2
  margin-bottom: 0
</style>
