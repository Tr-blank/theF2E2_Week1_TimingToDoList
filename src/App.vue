<template lang="pug">
  main(id='app')
    div.list
      .user
        img
        span user ID
      CreateToDoItem(:listData="list")
      .list_title To Do
      ToDoList(:listData="list" :changeItem="changeNowItem")
    div.timer-container
      div {{nowItemInfo.work_title}}
      div {{nowItemInfo.work_content}}
      div {{nowItemInfo.remaining_time}}
    div.item-button
      div.item-button__done(v-if="nowItemInfo.status" @click="doneToDoItem()")
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
  status: true,
  remaining_time: '30',
  user_Identity: 'test',
  user_id: '1',
  user_name: 'Tomato man',
  user_password: '',
  work_content: '手臂左右伸展',
  work_id: '1',
  work_title: '熱身'
},
{
  order: 1,
  status: true,
  remaining_time: '30',
  user_Identity: 'test',
  user_id: '1',
  user_name: 'Tomato man',
  user_password: '',
  work_content: '手臂左右伸展',
  work_id: '1',
  work_title: '熱身'
},
{
  order: 1,
  status: true,
  remaining_time: '30',
  user_Identity: 'test',
  user_id: '1',
  user_name: 'Tomato man',
  user_password: '',
  work_content: '手臂左右伸展',
  work_id: '1',
  work_title: '熱身'
},
{
  order: 1,
  status: true,
  remaining_time: '30',
  user_Identity: 'test',
  user_id: '1',
  user_name: 'Tomato man',
  user_password: '',
  work_content: '手臂左右伸展',
  work_id: '1',
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
      nowItem: 2,
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
            range: 'A1:J100',
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
                  itemObject.status = itemObject.status === 'ture'
                  itemObject.order = index
                  this.list.push(itemObject)
                }
              })
              this.nowItem = 2
              this.nowItemInfo = this.list[0]
              console.log('list', this.list)
            })
            .catch(function(error) {
              if (error.response) {
                // 服务器返回正常的异常对象
                console.log(error.config)
                this.list = testData
                this.nowItem = this.list[0]
                this.nowItemInfo = this.list[0]
                console.log(this.list)
              } else {
                // 服务器发生未处理的异常
                console.log('Error', error.message)
              }
            })
        })
    },
    changeNowItem(index) {
      this.nowItem = index
      this.nowItemInfo = this.list[index]
    },
    restartToDoItem() {
      this.list[this.nowItem].status = true
    },
    doneToDoItem(index) {
      this.list[this.nowItem].status = false
      this.nowItem++
      this.nowItemInfo = this.list[this.nowItem]
    },
    deleteToDoItem(index) {
      this.$getGapiClient()
        .then(gapi => {
          const rowNumber = this.nowItem + 2
          console.log(`A${rowNumber}:I${rowNumber}`)
          const params = {
            spreadsheetId: '1fLEQHVFlidjjbqeKwuhE5_H0L7JnAtKRtGUyKLE5kPI',
            range: `A${rowNumber}:J${rowNumber}`,
            valueRenderOption: 'FORMATTED_VALUE',
            dateTimeRenderOption: 'FORMATTED_STRING'
          }
          gapi.client.sheets.spreadsheets.values.clear(params)
            .then(res => {
              console.log('delete', `A${rowNumber}:I${rowNumber}`)
            })
            .catch(error => {
              console.log(error)
              this.list.splice(this.nowItem, 1)
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
