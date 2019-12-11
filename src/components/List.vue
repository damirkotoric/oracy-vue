<template>
  <div class="list">
    <ListItem v-for="audiobook in audiobooks" :key="audiobook.id" :audiobook=audiobook />
  </div>
</template>

<script>
import ListItem from '@/components/ListItem.vue'

export default {
  name: 'List',
  components: {
    ListItem
  },
  props: {
    audiobooks: Array
  }
}
</script>

<style lang="sass" scoped>
.list

</style>
