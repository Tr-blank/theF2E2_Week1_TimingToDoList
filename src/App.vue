<template lang="pug">
  main(id='app')
    div.list
      .user
        img
        span user ID
      CreateToDoItem(:listData="list")
      ToDoList(:listData="list" :changeItem="changeNowItem")

    div.timer-container
      div {{nowItemInfo.work_title}}
      div {{nowItemInfo.work_content}}
      div {{nowItemInfo.remaining_time}}
    div.item-button
      div.item-button__done(v-if="!nowItemInfo.is_done" @click="doneToDoItem()")
        font-awesome-icon.item-button__done-icon(icon="check")
        |Done
      div.item-button__done(v-else @click="restartToDoItem()")
        font-awesome-icon.item-button__done-icon(icon="power-off")
        |Restart
      div.item-button__delete(@click="deleteToDoItem()")
        font-awesome-icon.item-button__delete-icon(icon="trash")
        |Delete
</template>

<script>
import CreateToDoItem from './components/CreateToDoItem.vue'
import ToDoList from './components/ToDoList.vue'
// import DeleteToDoItem from './components/DeleteToDoItem.vue'

const testData = [{
  order: 1,
  is_done: false,
  remaining_time: '30',
  user_Identity: 'test',
  user_id: '1',
  user_name: 'Tomato man',
  user_password: '',
  work_content: '手臂左右伸展',
  work_id: 1,
  work_title: '熱身'
},
{
  order: 1,
  is_done: false,
  remaining_time: '30',
  user_Identity: 'test',
  user_id: '1',
  user_name: 'Tomato man',
  user_password: '',
  work_content: '手臂左右伸展',
  work_id: 2,
  work_title: '熱身'
},
{
  order: 1,
  is_done: false,
  remaining_time: '30',
  user_Identity: 'test',
  user_id: '1',
  user_name: 'Tomato man',
  user_password: '',
  work_content: '手臂左右伸展',
  work_id: 3,
  work_title: '熱身'
},
{
  order: 1,
  is_done: false,
  remaining_time: '30',
  user_Identity: 'test',
  user_id: '1',
  user_name: 'Tomato man',
  user_password: '',
  work_content: '手臂左右伸展',
  work_id: 4,
  work_title: '熱身'
}]

export default {
  name: 'app',
  components: {
    CreateToDoItem,
    ToDoList
    // DeleteToDoItem
  },
  data() {
    return {
      list: [],
      nowItem: 0,
      nowItemInfo: {}
    }
  },
  mounted() {
    this.login()
    this.list = testData
  },
  methods: {
    login() {
      this.$getGapiClient()
        .then(gapi => {
          const params = {
            spreadsheetId: '1fLEQHVFlidjjbqeKwuhE5_H0L7JnAtKRtGUyKLE5kPI',
            range: 'A1:K100',
            valueRenderOption: 'FORMATTED_VALUE',
            dateTimeRenderOption: 'FORMATTED_STRING'
          }
          gapi.client.sheets.spreadsheets.values.get(params)
            .then(response => {
              this.list = []
              response.result.values.map((item, index) => {
                if (index > 0) {
                  const itemObject = {}
                  item.map((value, n) => {
                    const property = response.result.values[0][n]
                    itemObject[property] = value
                  })
                  itemObject.work_id = Number(itemObject.work_id)
                  itemObject.is_done = itemObject.is_done === 'TRUE'
                  itemObject.order = Number(itemObject.order)
                  itemObject.sheetsOrder = index
                  this.list.push(itemObject)
                }
              })
              console.log('list', this.list)
            })
            .catch(function(error) {
              if (error.response) {
                // 服务器返回正常的异常对象
                console.log(error.config)
                this.list = testData
                console.log(this.list)
              } else {
                // 服务器发生未处理的异常
                console.log('Error', error.message)
              }
            })
        })
    },
    changeNowItem(id) {
      this.nowItem = id
      this.nowItemInfo = this.list.filter(item => item.work_id === id)[0]
      console.log(this.nowItem)
      console.log(this.nowItemInfo)
    },
    restartToDoItem() {
      this.list.filter(item => item.work_id === this.nowItem)[0].is_done = false
    },
    doneToDoItem(index) {
      this.list.filter(item => item.work_id === this.nowItem)[0].is_done = true
    },
    deleteToDoItem(index) {
      this.$getGapiClient()
        .then(gapi => {
          const params = {
            spreadsheetId: '1fLEQHVFlidjjbqeKwuhE5_H0L7JnAtKRtGUyKLE5kPI',
            resource: {
              requests: [
                {
                  deleteDimension: {
                    range: {
                      sheetId: 0,
                      dimension: 'ROWS',
                      startIndex: this.nowItemInfo.sheetsOrder,
                      endIndex: this.nowItemInfo.sheetsOrder + 1
                    }
                  }
                }
              ]
            }
          }
          gapi.client.sheets.spreadsheets.batchUpdate(params)
            .then(res => {
              console.log(`刪除第${this.nowItemInfo.sheetsOrder}列成功`)
            })
            .catch(error => {
              console.log(error)
              const listOrder = this.list.indexOf(this.nowItemInfo)
              console.log(listOrder)
              this.list.splice(listOrder, 1)
            })
        })
    }
  }
}
</script>

<style lang="stylus">
*
  box-sizing border-box
body
  padding 0
  margin 0
#app
  font-family 'Avenir', Microsoft JhengHei UI, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  display flex
  color #333
  font-size 16px
  height 100vh
  position relative
.list
  width 30%
  background-color #ffd95c
  padding 3%
  &_title
    margin 40px 0 10px
    font-size 20px
    font-weight bold
.timer-container
  width 70%
  background-color #333
  color #fcfcfc
  padding 3%
.item-button
  position absolute
  bottom 40px
  right 0
  width 200px
  overflow hidden
  &__done,
  &__delete
    padding 10px
    font-size 20px
    border 1px solid #fcfcfc
    border-radius 10px 0 0 10px
    color #fcfcfc
    margin 10px 0
    border-right 0
    cursor pointer
    left 80%
    position relative
    transition left .2s ease
    &-icon
      margin-right 10px
    &:hover
      left 30%
</style>
