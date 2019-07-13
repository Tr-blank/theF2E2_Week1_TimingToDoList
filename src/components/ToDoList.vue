<template lang="pug">
  draggable.to-do-list(v-model="listData" group="todolist" @start="drag=true" @end="drag=false" :move="checkMove")
    div.to-do-list__item(v-for='item in listData' :key='item.work_id')
      div
        font-awesome-icon.to-do-list__item-dragIcon(icon="ellipsis-v")
        span.to-do-list__title {{item.work_title}}
      font-awesome-icon.to-do-list__item-playIcon(icon="play")
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'ToDoList',
  components: {
    draggable
  },
  data() {
    return {
      list: []
    }
  },
  props: {
    listData: Array
  },
  methods: {
    checkMove() {
      // console.log('listData', this.listData)
      this.listData.map((item, index) => {
        item.order = index
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.to-do-list
  margin 10px 0
  &__item
    padding 10px
    background-color #fcfcfc
    margin 10px 0
    border-radius 10px
    cursor pointer
    display flex
    align-items center
    justify-content space-between
    &-dragIcon
      opacity 0
      font-size 14px
      transition opacity 0.2s ease
    &:hover &-dragIcon
      opacity 1
    &-playIcon
      font-size 14px
      color #ffd95c
  &__title
    font-size 18px
    padding-left 10px
</style>
