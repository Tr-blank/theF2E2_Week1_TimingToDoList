<template lang="pug">
  main(id='app')
    nav(:class="{ 'nav--timer-page': nowPage === 'analytics' || nowPage === 'timer' && isMobileSize }")
      div(v-if="nowPage === 'todolist'")
        font-awesome-icon.nav__icon.nav__icon-user(icon="user-circle")
        |user
      div(v-else)
        font-awesome-icon.nav__icon.nav__icon-goBack(icon="angle-left" @click="changePage('todolist')")
      div.nav__list
        font-awesome-icon.nav__icon(icon="list-ul" @click="changePage('todolist')")
        font-awesome-icon.nav__icon(icon="chart-bar" @click="changePage('analytics')")
        font-awesome-icon.nav__icon(icon="cog" @click="changePage('setting')")
    .main-container
      .list(v-if="nowPage === 'todolist' || nowPage === 'analytics' && !isMobileSize")
        .list__container
          CreateToDoItem(:listData="list" :loading="isLoading")
          ToDoList(:listData="list" :changeItem="changeNowItem")
      .setting(v-if="nowPage === 'setting'")
        .setting__container
          .setting__title Ringtones
          .setting__subtitle Work
          label.setting__item(for="work_none")
            input.setting__radio(type="radio" name="ringtones_work" id="work_none")
            |None
          label.setting__item(for="work_music")
            input.setting__radio(type="radio" name="ringtones_work" id="work_music")
            |music
          .setting__subtitle Break
          label.setting__item(for="break_none")
            input.setting__radio(type="radio" name="ringtones_break" id="break_none")
            |None
          label.setting__item(for="break_music")
            input.setting__radio(type="radio" name="ringtones_break" id="break_music")
            |music
      .detail(v-if="showDetail")
        .detail__container
          Timer(:time="nowItemInfo.remaining_time" :isStart="isTimerStart" :start="timerStart" :pause="timerPause" :stepBackward="timerStepBackward")
          .detail__title {{nowItemInfo.work_title}}
          .detail__content {{nowItemInfo.work_content}}
          .item-button(v-if="showItemButton")
            .item-button__done(v-if="!nowItemInfo.is_done" @click="doneToDoItem()")
              font-awesome-icon.item-button__done-icon(icon="check")
              |Done
            .item-button__done(v-else @click="restartToDoItem()")
              font-awesome-icon.item-button__done-icon(icon="power-off")
              |Restart
            .item-button__delete(@click="deleteToDoItem()")
              font-awesome-icon.item-button__delete-icon(icon="trash")
              |Delete
      .analytics(v-if="nowPage === 'analytics'")
        .analytics__container
          .analytics__title Analytics
          .analytics__result
            .analytics__today
              span.analytics__subtitle Today
              span.analytics__number 02
            .analytics__week
              span.analytics__subtitle Week
              span.analytics__number 10
    .loading(v-if="isLoading")
      .loading-container Loading ...
</template>

<script>
import WaveSurfer from 'wavesurfer.js'

import CreateToDoItem from './components/CreateToDoItem.vue'
import ToDoList from './components/ToDoList.vue'
import Timer from './components/Timer.vue'

import { testData, musicData } from './datas/to-do-list'

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
      isTimerStart: false,
      isLoading: false
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

    this.$nextTick(() => {
      this.wavesurfer = WaveSurfer.create({
        container: '.timer__waveform',
        waveColor: '#666766',
        progressColor: '#fcfcfc',
        barWidth: 2,
        hideScrollbar: true,
        scrollParent: true
        // fillParent: false
      })
      this.wavesurfer.load('music/kv-ocean.mp3')
      this.wavesurfer.on('finish', () => {
        this.wavesurfer.play(0)
      })
    })
  },
  computed: {
    isMobileSize() {
      return this.fullWidth < 768
    },
    showItemButton() {
      if (this.isMobileSize) {
        return !this.isTimerStart && this.nowPage === 'timer'
      } else {
        return !this.isTimerStart && this.nowPage === 'todolist'
      }
    },
    showDetail() {
      if (this.isMobileSize) {
        return this.nowPage === 'timer'
      } else {
        return this.nowPage === 'todolist' || this.nowPage === 'setting'
      }
    }
  },
  methods: {
    track() {
      this.$ga.page({
        page: '/thef2e2_week1_timing-to-do-list',
        title: '蕃茄鐘 - 第二屆前端修煉時光屋 第一週',
        location: window.location.href
      })
    },
    changePage(page) {
      this.timerPause()
      this.nowPage = page
      console.log(this.nowPage)
      if (page === 'setting') {
        this.nowItemInfo = musicData[0]
        this.wavesurfer.load('music/kv-ocean.mp3')
      }
    },
    login() {
      this.isLoading = true
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
              this.isLoading = false
            })
            .catch(error => {
              this.list = testData
              this.nowItem = this.list[0].work_id
              this.nowItemInfo = this.list[0]
              console.log(this.list)
              console.log('Error', error.message)
              this.isLoading = false
            })
        })
    },
    // initialWavesurfer() {
    //   this.$nextTick(() => {
    //     this.wavesurfer = WaveSurfer.create({
    //       container: '.timer__waveform',
    //       waveColor: '#666766',
    //       progressColor: '#fcfcfc',
    //       barWidth: 2,
    //       hideScrollbar: true,
    //       scrollParent: true
    //       // fillParent: false
    //     })
    //     this.wavesurfer.load('music/kv-ocean.mp3')
    //     this.wavesurfer.on('finish', () => {
    //       this.wavesurfer.play(0)
    //     })
    //   })
    // },
    changeNowItem(id) {
      this.nowItem = id
      this.nowItemInfo = this.list.filter(item => item.work_id === id)[0]
      this.wavesurfer.load('music/kv-ocean.mp3')
      // console.log()
      if (this.isMobileSize) {
        this.changePage('timer')
      } else {
        this.changePage('todolist')
      }
    },
    restartToDoItem() {
      this.list.filter(item => item.work_id === this.nowItem)[0].is_done = false
    },
    doneToDoItem(index) {
      this.list.filter(item => item.work_id === this.nowItem)[0].is_done = true
    },
    deleteToDoItem(index) {
      this.isLoading = true
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
              this.isLoading = false
            })
            .catch(error => {
              console.log(error)
              const listOrder = this.list.indexOf(this.nowItemInfo)
              console.log(listOrder)
              this.list.splice(listOrder, 1)
              this.isLoading = false
            })
        })
    },
    timerStart() {
      this.isTimerStart = true
      this.timer = setInterval(() => {
        this.nowItemInfo.remaining_time > 0 ? this.nowItemInfo.remaining_time-- : this.timerPause()
      }, 1000)
      this.wavesurfer.play()
    },
    timerPause() {
      this.isTimerStart = false
      clearInterval(this.timer)
      this.wavesurfer.pause()
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
  color #333
  z-index 10
.nav
  &__list
    color #fcfcfc
  &__list &__icon
    cursor pointer
  &__icon
    margin 0 0 0 20px
    &-user,
    &-goBack
      margin 0 10px 0 0
.main-container
  display flex
  height 100vh
.list,
.setting
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
.setting
  &__title
    font-size 40px
    margin-top 20px
    border-bottom 1px solid #fcfcfc
    padding-bottom 10px
  &__subtitle
    font-size 30px
    margin 30px 0 10px
  &__item
    padding 0.625rem
    background-color #fcfcfc
    margin 0.625rem 0
    border-radius 0.625rem
    cursor pointer
    display block
    font-size 18px
    width 100%
    transition width 0.2s ease
  &__radio
    margin-right 10px
.detail,
.analytics
  width 65%
  background-color #333
  color #fcfcfc
  position relative
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
.analytics
  &__title
    margin-top 40px
  &__result
    display flex
    width 300px
    margin 20px auto
    justify-content space-around
    padding 40px 0
    border-top 1px solid #eee
  &__subtitle
    font-size 20px
    display block
  &__number
    font-size 40px
    color #e6c65c
.item-button
  position absolute
  bottom 40px
  right 0
  width 200px
  overflow hidden
  text-align left
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
.loading
  position absolute
  z-index 100
  width 100%
  top 0
  left 0
  height 100%
  display flex
  justify-content center
  align-items center
  background-color rgba(0,0,0,.2)
  &-container
    padding 20px 40px
    background-color #fcfcfc
    border-radius 10px
    font-weight bold
@media screen and (max-width: 1440px)
  nav
    padding 20px 40px
  .list__container
    padding 80px 40px
@media screen and (max-width: 1024px)
  nav
    padding 20px
  .list
    width 40%
  .detail
    width 60%
  .list__container
    padding 80px 20px
@media screen and (max-width: 768px)
  nav
    background-color #e6c65c
  .nav
    &__list
      color #333
    &--timer-page
      background-color transparent
      color #fcfcfc
      padding 20px
    &--timer-page &__list
      color #fcfcfc
  .list,
  .detail,
  .setting,
  .analytics
    width 100%
  .detail
    &__container
      padding 40px
    &__title
      font-size 30px
  .item-button
    position relative
    bottom 0
    width 100%
    text-align center
    &__done,
    &__delete
      left 0
      width 80%
      margin 10px auto
      border 0.0625rem solid #fcfcfc
      border-radius 0.625rem
</style>
