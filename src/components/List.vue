<template>
  <div className="list">
    <div className="listItem" v-for="audiobook in audiobooks" :key="audiobook.id">
      <div className="listItemImage">
        <img :src="audiobook.imageSrc" alt=""/>
      </div>
      <div className="listItemContent">
        <h3 className="listItemTitle">{{audiobook.title}}</h3>
        <div className="listItemAuthor">By {{audiobook.authors[0].first_name}} {{audiobook.authors[0].last_name}}</div>
        <p className="listItemTeaser">{{audiobook.description}}</p>
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
  padding: 15px 0

.listItemImage
  background: $color_grey_100
  margin-right: 20px
  img
    height: 140px
    object-fit: cover
    width: 140px

.listItemContent

.listItemTitle
  +body1
  margin-bottom: 5px

.listItemAuthor
  +subtitle
  margin-bottom: 10px

.listItemTeaser
  +subtitle
</style>
