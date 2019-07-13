<template lang="pug">
  main(id='app')
    div.list
      .user
        img
        span user ID
      CreateToDoList(:listData="list")
      .list_title To Do
      ToDoList(:listData="list")
    div.timer-container
      div {{nowItem.work_title}}
      div {{nowItem.work_content}}
      div {{nowItem.remaining_time}}
    div.item-button
      div.item-button__done 
        font-awesome-icon(icon="ban")
        |Done
      div.item-button__delete 
        font-awesome-icon(icon="trash")
        |Delete
</template>

<script>
import CreateToDoList from './components/CreateToDoList.vue'
import ToDoList from './components/ToDoList.vue'

const testData = [{
  order: 1,
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
    CreateToDoList,
    ToDoList
  },
  data() {
    return {
      list: [],
      nowItem: {}
    }
  },
  mounted() {
    this.login()
  },
  methods: {
    login() {
      this.$getGapiClient()
        .then(gapi => {
          const params = {
            spreadsheetId: '1fLEQHVFlidjjbqeKwuhE5_H0L7JnAtKRtGUyKLE5kPI',
            range: 'A1:I100',
            valueRenderOption: 'FORMATTED_VALUE',
            dateTimeRenderOption: 'FORMATTED_STRING'
          }
          gapi.client.sheets.spreadsheets.values.get(params)
            .then(response => {
              response.result.values.map((item, index) => {
                if (index > 0) {
                  const itemObject = {}
                  item.map((value, n) => {
                    const property = response.result.values[0][n]
                    itemObject[property] = value
                  })
                  itemObject.order = index
                  this.list.push(itemObject)
                }
              })
              this.nowItem = this.list[0]
              console.log('list', this.list)
            })
            .catch(function(error) {
              if (error.response) {
                // 服务器返回正常的异常对象
                console.log(error.config)
                this.list = testData
                this.nowItem = this.list[0]
                console.log(this.list)
              } else {
                // 服务器发生未处理的异常
                console.log('Error', error.message)
              }
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
</style>
