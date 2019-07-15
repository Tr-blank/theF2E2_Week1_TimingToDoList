<template lang="pug">
  div.create
    input.create_text(type='text' v-model="inputData.work_title" placeholder="新增代辦事項 ...")
    button.create_button(type='submit' @click='createItem()')
      font-awesome-icon.create_plusIcon(icon="plus")
</template>

<script>
import axios from 'axios'

const newItem = {
  work_id: '',
  work_title: '',
  work_content: '',
  remaining_time: 30,
  order: '',
  status: true,
  user_id: '',
  user_name: '',
  user_password: '',
  user_Identity: ''
}

export default {
  name: 'CreateToDoItem',
  data() {
    return {
      inputData: {
        ...newItem
      }
    }
  },
  props: {
    listData: {
      type: Array
    },
    loading: {
      type: Boolean
    }
  },
  mounted() {
    // console.log('listData', this.listData)
  },
  methods: {
    createItem() {
      this.loading = true
      this.inputData.work_id = this.listData.length + 1
      this.inputData.order = this.listData.length + 1
      console.log('create', this.inputData)
      const api = `https://script.google.com/macros/s/AKfycby19dIv0Dq8KeeJQNPxWAAfcBEMZymvcOMNFh5W_5xG4v27hdIs/exec`
      axios.get(api, {
        ...this.inputData
      }).then(res => {
        console.log(res)
        this.inputData = { ...newItem }
        this.loading = false
      })
        .catch(err => {
          console.log(err)
          this.listData.push({ ...this.inputData })
          this.inputData = { ...newItem }
          this.loading = false
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.create
  position relative
  margin 10px 0
  &_text
    background-color #fcfcfc
    border-radius 0.625rem
    border 0
    width 100%
    padding 10px 20px
    font-size 18px
    font-family 'Avenir', Microsoft JhengHei UI, Helvetica, Arial, sans-serif
  &_button
    position absolute
    top 0
    right 0
    background-color transparent
    border 0
    height 100%
    display block
    width 40px
    color #333
    cursor pointer
</style>
