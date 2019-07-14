<template lang="pug">
  main(id='app')
    .list
      .user
        img
        span user ID
      CreateToDoItem(:listData="list")
      ToDoList(:listData="list" :changeItem="changeNowItem")
    .detail
      Timer(:time="nowItemInfo.remaining_time" :isStart="isTimerStart" :start="timerStart" :pause="timerPause" :stepBackward="timerStepBackward")
      .detail__title {{nowItemInfo.work_title}}
      .detail__content {{nowItemInfo.work_content}}
    .item-button(v-if="!isTimerStart")
      .item-button__done(v-if="!nowItemInfo.is_done" @click="doneToDoItem()")
        font-awesome-icon.item-button__done-icon(icon="check")
        |Done
      .item-button__done(v-else @click="restartToDoItem()")
        font-awesome-icon.item-button__done-icon(icon="power-off")
        |Restart
      .item-button__delete(@click="deleteToDoItem()")
        font-awesome-icon.item-button__delete-icon(icon="trash")
        |Delete
</template>

<script>
import CreateToDoItem from './components/CreateToDoItem.vue'
import ToDoList from './components/ToDoList.vue'
import Timer from './components/Timer.vue'

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
    ToDoList,
    Timer
  },
  data() {
    return {
      list: [],
      nowItem: 0,
      nowItemInfo: {},
      timer: null,
      isTimerStart: false
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
                  itemObject.remaining_time = Number(itemObject.remaining_time)
                  itemObject.is_done = itemObject.is_done === 'TRUE'
                  itemObject.order = Number(itemObject.order)
                  itemObject.sheetsOrder = index
                  this.list.push(itemObject)
                }
              })
              this.nowItem = this.list.filter(item => !item.is_done)[0].work_id
              this.nowItemInfo = this.list.filter(item => item.work_id === this.nowItem)[0]
              console.log('list', this.list)
            })
            .catch(function(error) {
              if (error.response) {
                // 服务器返回正常的异常对象
                console.log(error.config)
                this.list = testData
                this.nowItem = this.list[0].work_id
                this.nowItemInfo = this.list[0]
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
    },
    timerStart() {
      this.isTimerStart = true
      this.timer = setInterval(() => {
        this.nowItemInfo.remaining_time > 0 ? this.nowItemInfo.remaining_time-- : this.timerPause()
      }, 1000)
    },
    timerPause() {
      this.isTimerStart = false
      clearInterval(this.timer)
    },
    timerStepBackward() {
      this.nowItemInfo.remaining_time = 1800
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
  width 40%
  background-color #e6c65c
  padding 3%
  &_title
    margin 40px 0 10px
    font-size 20px
    font-weight bold
.detail
  width 60%
  background-color #333
  color #fcfcfc
  padding 3%
  text-align center
  &__title
    font-size 40px
  &__content
    margin 30px 0
    font-size 20px
    color #bdbdbd
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
