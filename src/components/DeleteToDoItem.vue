<template lang="pug">
  div.item-button
    div.item-button__done(@click="doneItem()")
      font-awesome-icon.item-button__done-icon(icon="ban")
      |Done
    div.item-button__delete(@click="deleteItem()")
      font-awesome-icon.item-button__delete-icon(icon="trash")
      |Delete
</template>

<script>
export default {
  name: 'DeleteToDoList',
  data() {
    return {
    }
  },
  props: {
    nowItemData: {
      type: Number,
      required: true
    },
    deleteItem: {
      type: Function,
      required: true
    }
  },
  mounted() {
    // console.log('listData', this.listData)
  },
  methods: {
    doneItem() {
      console.log('done')
    },
    delete(rowNumber) {
      this.deleteItem()
      console.log('delete')
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
