<template lang="pug">
  draggable.to-do-list(
    v-model="listData"
    group="todolist"
    @start="drag=true"
    @end="drag=false"
    :move="checkMove"
  )
    div(
      :class="{ 'to-do-list__item--foucs': nowNumber === index, 'to-do-list__item': true}"
      v-for='(item, index) in listData'
      :key='index'
      @click="clickItem(index)"
      v-if="item.status"
    )
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
      list: [],
      nowNumber: 0
    }
  },
  props: {
    listData: {
      type: Array,
      required: true
    },
    changeItem: {
      type: Function,
      required: true
    }
  },
  computed: {
  },
  methods: {
    checkMove() {
      // console.log('listData', this.listData)
      this.listData.map((item, index) => {
        item.order = index
      })
    },
    clickItem(index, event) {
      this.nowNumber = index
      this.changeItem(index)
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
    width 100%
    transition width .2s ease
    &-dragIcon
      opacity 0
      font-size 14px
      transition opacity 0.2s ease
      transition color 0.35s ease .2s
    &:hover &-dragIcon
      opacity 1
    &-playIcon
      font-size 14px
      color #ffd95c
      transition color 0.35s ease .2s
    &--foucs
      width: 110%
    &--foucs &-playIcon
      color #70afff
  &__title
    font-size 18px
    padding-left 10px
</style>
