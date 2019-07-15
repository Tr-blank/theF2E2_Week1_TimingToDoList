<template lang="pug">
  main(id='app')
    nav
      div
        font-awesome-icon.nav__icon.nav__icon-user(icon="user-circle")
        |user
      div.nav__list
        font-awesome-icon.nav__icon(icon="list-ul")
        font-awesome-icon.nav__icon(icon="chart-bar")
        font-awesome-icon.nav__icon(icon="cog")
    .main-container
      .list(v-if="nowPage === 'todolist'")
        .list__container
          CreateToDoItem(:listData="list")
          ToDoList(:listData="list" :changeItem="changeNowItem" :isMobile="isMobileSize" :page="changePage")
      .detail(v-if="!isMobileSize || nowPage === 'timer'")
        .detail__container
          Timer(:time="nowItemInfo.remaining_time" :isStart="isTimerStart" :start="timerStart" :pause="timerPause" :stepBackward="timerStepBackward")
          .detail__title {{nowItemInfo.work_title}}
          .detail__content {{nowItemInfo.work_content}}
    .item-button(v-if="!isTimerStart && !isMobileSize")
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

import { testData } from './datas/to-do-list'

export default {
  name: 'app',
  components: {
    CreateToDoItem,
    ToDoList,
    Timer
  },
  data() {
    return {
      fullWidth: 0,
      nowPage: 'todolist',
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

    this.fullWidth = window.innerWidth
    window.onresize = () => {
      this.fullWidth = window.innerWidth
      if (!this.isMobileSize && this.nowPage === 'timer') {
        this.changePage('todolist')
      }
    }
  },
  computed: {
    isMobileSize() {
      return this.fullWidth < 1024
    }
  },
  methods: {
    changePage(page) {
      this.nowPage = page
      console.log(this.nowPage)
    },
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
  color #333
  font-size 16px
  height 100vh
  position relative
nav
  position fixed
  width 100%
  top 0
  left 0
  display flex
  justify-content space-between
  padding 20px 20px 20px 80px
  font-size 30px
.nav
  &__list
    color #fcfcfc
  &__list &__icon
    cursor pointer
  &__icon
    margin 0 10px
    &-user
      margin-left 0
.main-container
  display flex
  height 100vh
.list
  width 35%
  background-color #e6c65c
  &__container
    padding 80px
    height 100%
    overflow hidden auto
  &__title
    margin 40px 0 10px
    font-size 20px
    font-weight bold
.detail
  width 65%
  background-color #333
  color #fcfcfc
  text-align center
  &__container
    padding 60px
    height 100%
    overflow hidden auto
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
@media screen and (max-width: 1440px)
  nav
    padding-left 40px
  .list__container
    padding 80px 40px
@media screen and (max-width: 1024px)
  .list,
  .detail
    width 100%
  .detail__container
    padding: 40px 10px;

</style>
